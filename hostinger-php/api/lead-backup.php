<?php
/**
 * API Lead Backup - Equivalente ao lead-backup.ts
 * Recebe dados do React e salva no MySQL + envia email
 */

require_once '../config.php';
require_once 'email-service.php';

/**
 * Função para salvar lead no MySQL
 * Equivalente ao saveLeadToMySQL() do TypeScript
 */
function saveLeadToMySQL($leadData) {
    try {
        $pdo = createDatabaseConnection();
        
        $query = "
            INSERT INTO leads (
                name, email, phone, interest_type, source, campaign, 
                ip_address, user_agent, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ";
        
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute([
            $leadData['name'],
            $leadData['email'],
            $leadData['phone'],
            $leadData['interest_type'],
            $leadData['source'] ?? 'Landing Page',
            $leadData['campaign'] ?? CAMPAIGN_DEFAULT,
            $leadData['ip_address'],
            $leadData['user_agent']
        ]);
        
        if ($result) {
            $leadId = $pdo->lastInsertId();
            logMessage("✅ Lead {$leadId} salvo no MySQL com sucesso: {$leadData['email']}");
            return $leadId;
        } else {
            throw new Exception("Falha ao inserir lead no banco de dados");
        }
        
    } catch (Exception $e) {
        logMessage("❌ Erro ao salvar lead no MySQL: " . $e->getMessage(), 'ERROR');
        throw $e;
    }
}

/**
 * Função para salvar log de erro
 * Equivalente ao saveErrorLog() do TypeScript
 */
function saveErrorLog($leadId, $errorType, $errorMessage, $errorDetails = null) {
    try {
        $pdo = createDatabaseConnection();
        
        $query = "
            INSERT INTO error_logs (lead_id, error_type, error_message, error_details, created_at)
            VALUES (?, ?, ?, ?, NOW())
        ";
        
        $details = $errorDetails ? json_encode($errorDetails, JSON_UNESCAPED_UNICODE) : null;
        $stmt = $pdo->prepare($query);
        $stmt->execute([$leadId, $errorType, $errorMessage, $details]);
        
        logMessage("Log de erro salvo: $errorType");
        
    } catch (Exception $e) {
        logMessage("Erro ao salvar log: " . $e->getMessage(), 'ERROR');
    }
}

/**
 * Função para capturar IP real do cliente
 */
function getRealClientIP() {
    $headers = [
        'HTTP_CF_CONNECTING_IP',     // Cloudflare
        'HTTP_X_REAL_IP',            // Nginx proxy
        'HTTP_X_FORWARDED_FOR',      // Proxy padrão
        'HTTP_X_FORWARDED',          
        'HTTP_X_CLUSTER_CLIENT_IP',  
        'HTTP_CLIENT_IP',
        'REMOTE_ADDR'
    ];
    
    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ips = explode(',', $_SERVER[$header]);
            $ip = trim($ips[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// =============================================
// PROCESSAMENTO PRINCIPAL DA API
// =============================================

try {
    // Verificar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Method not allowed', null, 405);
    }
    
    // Ler dados JSON do React
    $inputJSON = file_get_contents('php://input');
    $leadData = json_decode($inputJSON, true);
    
    // Validar JSON
    if (json_last_error() !== JSON_ERROR_NONE) {
        jsonResponse(false, 'Invalid JSON data', null, 400);
    }
    
    // Sanitizar dados de entrada
    $leadData = sanitizeInput($leadData);
    
    // Validar campos obrigatórios
    $requiredFields = ['email', 'name'];
    foreach ($requiredFields as $field) {
        if (empty($leadData[$field])) {
            jsonResponse(false, 'Email e nome são obrigatórios', [
                'missing_field' => $field
            ], 400);
        }
    }
    
    // Validar email
    if (!filter_var($leadData['email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(false, 'Email inválido', null, 400);
    }
    
    // Capturar informações de auditoria
    $leadData['ip_address'] = getRealClientIP();
    $leadData['user_agent'] = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    // Mapear campos do React para o formato do MySQL
    $mysqlData = [
        'name' => $leadData['name'],
        'email' => $leadData['email'],
        'phone' => $leadData['mobile_phone'] ?? '',
        'interest_type' => $leadData['cf_interest_type'] ?? '',
        'source' => $leadData['cf_source'] ?? 'Landing Page',
        'campaign' => 'ELEV Sacoma II',
        'ip_address' => $leadData['ip_address'],
        'user_agent' => $leadData['user_agent']
    ];
    
    // ✅ SALVAR NO MySQL (PRINCIPAL)
    $leadId = null;
    try {
        $leadId = saveLeadToMySQL($mysqlData);
        
        // ✅ ENVIAR NOTIFICAÇÃO POR EMAIL (OPCIONAL)
        $emailSent = false;
        try {
            $leadForEmail = [
                'id' => $leadId,
                'name' => $mysqlData['name'],
                'email' => $mysqlData['email'],
                'phone' => $mysqlData['phone'],
                'interest_type' => $mysqlData['interest_type'],
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            $emailSent = sendNewLeadNotification($leadForEmail);
            logMessage($emailSent ? "✅ Email enviado para lead $leadId" : "❌ Falha no email para lead $leadId");
            
        } catch (Exception $emailError) {
            logMessage("⚠️ Erro ao enviar email (não crítico): " . $emailError->getMessage(), 'WARNING');
            // Não falha a requisição se o email não funcionar
        }
        
        // Resposta de sucesso (igual ao TypeScript)
        jsonResponse(true, 'Lead salvo com sucesso no banco de dados', [
            'backup_saved' => true,
            'lead_id' => $leadId,
            'email_notification' => $emailSent ? 'sent' : 'attempted'
        ], 200);
        
    } catch (Exception $mysqlError) {
        // Salvar log do erro MySQL
        saveErrorLog(null, 'mysql_save_error', $mysqlError->getMessage(), [
            'leadData' => $mysqlData,
            'error' => $mysqlError->getMessage()
        ]);
        
        jsonResponse(false, 'Erro ao salvar lead no banco de dados', [
            'error' => $mysqlError->getMessage(),
            'backup_saved' => false
        ], 500);
    }
    
} catch (Exception $error) {
    // Log erro geral
    logMessage("❌ Erro geral na API: " . $error->getMessage(), 'ERROR');
    
    // Salvar log do erro
    saveErrorLog($leadId ?? null, 'api_general_error', $error->getMessage(), [
        'body' => $leadData ?? null,
        'error' => $error->getMessage()
    ]);
    
    jsonResponse(false, 'Erro interno do servidor', [
        'error' => $error->getMessage(),
        'backup_saved' => false,
        'lead_id' => $leadId
    ], 500);
}

?>
