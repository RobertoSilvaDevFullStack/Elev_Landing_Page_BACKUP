<?php
/**
 * API Lead Backup - Versão Corrigida
 * Recebe dados do React e salva no MySQL + envia email
 */

// Habilitar exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Headers CORS primeiro
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Log de debug inicial
error_log("=== LEAD BACKUP API START ===");
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Headers: " . print_r(getallheaders(), true));

// Tratar OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    // Incluir arquivos necessários
    if (!file_exists('../config.php')) {
        throw new Exception("Arquivo config.php não encontrado");
    }
    require_once '../config.php';
    
    if (!file_exists('email-service.php')) {
        throw new Exception("Arquivo email-service.php não encontrado");
    }
    require_once 'email-service.php';
    
    // Verificar método
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed', 'method' => $_SERVER['REQUEST_METHOD']]);
        exit;
    }
    
    // Pegar dados
    $rawInput = file_get_contents('php://input');
    error_log("Raw input: " . $rawInput);
    
    if (empty($rawInput)) {
        throw new Exception("Nenhum dado recebido no POST");
    }
    
    $leadData = json_decode($rawInput, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Erro ao decodificar JSON: " . json_last_error_msg());
    }
    
    error_log("Dados decodificados: " . print_r($leadData, true));
    
    // Validar dados obrigatórios
    if (empty($leadData['name']) || empty($leadData['email'])) {
        throw new Exception("Nome e email são obrigatórios");
    }
    
    // Preparar dados para MySQL
    $mysqlData = [
        'name' => $leadData['name'] ?? '',
        'email' => $leadData['email'] ?? '',
        'phone' => $leadData['mobile_phone'] ?? '',
        'interest_type' => $leadData['cf_interest_type'] ?? '',
        'source' => $leadData['cf_source'] ?? 'Landing Page',
        'campaign' => 'ELEV Sacoma II',
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    error_log("Dados para MySQL: " . print_r($mysqlData, true));
    
    // Salvar no banco
    try {
        $pdo = createDatabaseConnection();
        error_log("Conexão MySQL OK");
        
        $query = "
            INSERT INTO leads (
                name, email, phone, interest_type, source, campaign, 
                ip_address, user_agent, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ";
        
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute([
            $mysqlData['name'],
            $mysqlData['email'],
            $mysqlData['phone'],
            $mysqlData['interest_type'],
            $mysqlData['source'],
            $mysqlData['campaign'],
            $mysqlData['ip_address'],
            $mysqlData['user_agent']
        ]);
        
        if (!$result) {
            throw new Exception("Falha ao inserir no banco: " . print_r($stmt->errorInfo(), true));
        }
        
        $leadId = $pdo->lastInsertId();
        error_log("Lead salvo com ID: " . $leadId);
        
        // Tentar enviar email (não crítico)
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
            error_log("Email result: " . ($emailSent ? "OK" : "FALHOU"));
            
        } catch (Exception $emailError) {
            error_log("Erro no email (não crítico): " . $emailError->getMessage());
        }
        
        // Resposta de sucesso
        echo json_encode([
            'success' => true,
            'message' => 'Lead salvo com sucesso!',
            'backup_saved' => true,
            'lead_id' => $leadId,
            'email_notification' => $emailSent ? 'sent' : 'attempted',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
    } catch (Exception $dbError) {
        error_log("Erro no banco: " . $dbError->getMessage());
        throw new Exception("Erro ao salvar no banco: " . $dbError->getMessage());
    }
    
} catch (Exception $error) {
    error_log("Erro geral: " . $error->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro interno: ' . $error->getMessage(),
        'backup_saved' => false,
        'timestamp' => date('Y-m-d H:i:s'),
        'debug' => [
            'error' => $error->getMessage(),
            'file' => $error->getFile(),
            'line' => $error->getLine(),
            'trace' => $error->getTraceAsString()
        ]
    ]);
}

error_log("=== LEAD BACKUP API END ===");
?>
