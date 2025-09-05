<?php
/**
 * Email Service PHP - Equivalente ao emailService.ts
 * Sistema de envio de emails para notificação de novos leads
 */

/**
 * Configurações de email
 * Usando constantes definidas no config.php
 */

// Usar constantes do config.php (não redefinir)
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS já definidas em config.php

// Constantes complementares para email
if (!defined('EMAIL_FROM')) {
    define('EMAIL_FROM', SMTP_USER);
}
if (!defined('EMAIL_FROM_NAME')) {
    define('EMAIL_FROM_NAME', 'ELEV - Sistema de Leads');
}

// Destinatários das notificações
if (!defined('NOTIFICATION_EMAILS')) {
    define('NOTIFICATION_EMAILS', [NOTIFICATION_EMAIL]);
}

/**
 * Enviar email usando PHP mail() ou SMTP
 * Equivalente à função do emailService.ts
 */
function sendNewLeadNotification($leadData) {
    try {
        $subject = "🏠 Novo Lead - ELEV Sacoma II - " . $leadData['name'];
        
        $htmlContent = generateEmailTemplate($leadData);
        
        // Headers para HTML
        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM . '>',
            'Reply-To: ' . EMAIL_FROM,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        $success = true;
        
        // Enviar para todos os emails de notificação
        foreach (NOTIFICATION_EMAILS as $toEmail) {
            $mailSent = mail(
                $toEmail,
                $subject,
                $htmlContent,
                implode("\r\n", $headers)
            );
            
            if (!$mailSent) {
                $success = false;
                logMessage("❌ Falha ao enviar email para: $toEmail", 'ERROR');
            } else {
                logMessage("✅ Email enviado para: $toEmail");
            }
        }
        
        return $success;
        
    } catch (Exception $e) {
        logMessage("❌ Erro no envio de email: " . $e->getMessage(), 'ERROR');
        return false;
    }
}

/**
 * Gerar template HTML do email
 * Baseado no template do TypeScript original
 */
function generateEmailTemplate($leadData) {
    $createdAt = $leadData['created_at'] ?? date('Y-m-d H:i:s');
    $leadId = $leadData['id'] ?? 'N/A';
    
    $html = <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Lead - ELEV Sacoma II</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .lead-info {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 20px;
            margin: 20px 0;
        }
        .info-row {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #2c3e50;
            display: inline-block;
            min-width: 120px;
        }
        .value {
            color: #34495e;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #ecf0f1;
            border-radius: 8px;
        }
        .highlight {
            background: #e8f4fd;
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Novo Lead Capturado!</h1>
            <p>ELEV Sacoma II - Landing Page</p>
        </div>
        
        <div class="lead-info">
            <h2 style="color: #2c3e50; margin-top: 0;">Informações do Lead</h2>
            
            <div class="info-row">
                <span class="label">ID do Lead:</span>
                <span class="value highlight">#{$leadId}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Nome:</span>
                <span class="value">{$leadData['name']}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:{$leadData['email']}">{$leadData['email']}</a></span>
            </div>
            
            <div class="info-row">
                <span class="label">Telefone:</span>
                <span class="value">{$leadData['phone']}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Interesse:</span>
                <span class="value">{$leadData['interest_type']}</span>
            </div>
            
            <div class="info-row">
                <span class="label">Data/Hora:</span>
                <span class="value">{$createdAt}</span>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Sistema de Leads - ELEV</strong></p>
            <p style="color: #7f8c8d; font-size: 12px;">
                Este email foi gerado automaticamente pelo sistema de captura de leads da Landing Page.
            </p>
        </div>
    </div>
</body>
</html>
HTML;

    return $html;
}

/**
 * Função alternativa usando SMTP (se disponível)
 * Para usar caso o mail() básico não funcione
 */
function sendSMTPEmail($to, $subject, $htmlContent) {
    // Esta seria a implementação SMTP mais robusta
    // Por enquanto usamos o mail() básico do PHP
    // Pode ser implementado com PHPMailer se necessário
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM . '>',
        'Reply-To: ' . EMAIL_FROM
    ];
    
    return mail($to, $subject, $htmlContent, implode("\r\n", $headers));
}

/**
 * Testar configuração de email
 */
function testEmailConfiguration() {
    $testLead = [
        'id' => 'TEST',
        'name' => 'Teste Sistema',
        'email' => 'teste@example.com',
        'phone' => '(11) 99999-9999',
        'interest_type' => 'Apartamento 2 quartos',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    logMessage("🧪 Testando configuração de email...");
    $result = sendNewLeadNotification($testLead);
    logMessage($result ? "✅ Teste de email bem-sucedido" : "❌ Teste de email falhou");
    
    return $result;
}

?>
