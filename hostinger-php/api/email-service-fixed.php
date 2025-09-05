<?php
/**
 * Email Service PHP - Versão Corrigida
 * Sistema de envio de emails para notificação de novos leads
 * Usa configurações do config.php para evitar conflitos
 */

/**
 * Configurações de email
 * Usando constantes definidas no config.php
 */

// Constantes complementares para email (sem conflito com config.php)
if (!defined('EMAIL_FROM')) {
    define('EMAIL_FROM', SMTP_USER);
}
if (!defined('EMAIL_FROM_NAME')) {
    define('EMAIL_FROM_NAME', 'ELEV - Sistema de Leads');
}

/**
 * Enviar email usando PHP mail() 
 * Equivalente à função do emailService.ts
 */
function sendNewLeadNotification($leadData) {
    try {
        $subject = "🏠 Novo Lead - ELEV Sacoma II - " . $leadData['name'];
        
        $htmlContent = generateEmailTemplate($leadData);
        
        // Headers do email
        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM . '>',
            'Reply-To: ' . EMAIL_FROM,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        // Enviar para o email de notificação
        $toEmail = NOTIFICATION_EMAIL;
        $mailSent = mail(
            $toEmail,
            $subject,
            $htmlContent,
            implode("\r\n", $headers)
        );
        
        if ($mailSent) {
            error_log("✅ Email enviado para: $toEmail");
            return true;
        } else {
            error_log("❌ Falha ao enviar email para: $toEmail");
            return false;
        }
        
    } catch (Exception $e) {
        error_log("❌ Erro no envio de email: " . $e->getMessage());
        return false;
    }
}

/**
 * Gerar template HTML do email
 * Equivalente ao template do emailService.ts
 */
function generateEmailTemplate($leadData) {
    $name = htmlspecialchars($leadData['name']);
    $email = htmlspecialchars($leadData['email']);
    $phone = htmlspecialchars($leadData['phone'] ?? 'Não informado');
    $interest = htmlspecialchars($leadData['interest_type'] ?? 'Não especificado');
    $leadId = $leadData['id'] ?? 'N/A';
    $timestamp = $leadData['created_at'] ?? date('Y-m-d H:i:s');
    
    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Novo Lead - ELEV Sacoma II</title>
    </head>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;'>
            
            <!-- Header -->
            <div style='background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;'>
                <h1 style='margin: 0; font-size: 24px;'>🏠 Novo Lead Captado!</h1>
                <p style='margin: 10px 0 0 0; opacity: 0.9;'>ELEV Park Sacomã II - Landing Page</p>
            </div>
            
            <!-- Content -->
            <div style='background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
                
                <h2 style='color: #1e3c72; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px;'>
                    📋 Dados do Lead
                </h2>
                
                <div style='background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #1e3c72;'>
                    <p><strong>👤 Nome:</strong> $name</p>
                    <p><strong>📧 Email:</strong> <a href='mailto:$email' style='color: #1e3c72;'>$email</a></p>
                    <p><strong>📱 Telefone:</strong> <a href='tel:$phone' style='color: #1e3c72;'>$phone</a></p>
                    <p><strong>🏠 Interesse:</strong> $interest</p>
                </div>
                
                <h3 style='color: #1e3c72; margin-top: 30px;'>📊 Informações Técnicas</h3>
                <div style='background: #fff; padding: 15px; border: 1px solid #eee; border-radius: 4px;'>
                    <p style='margin: 5px 0;'><strong>🆔 Lead ID:</strong> $leadId</p>
                    <p style='margin: 5px 0;'><strong>🕐 Data/Hora:</strong> $timestamp</p>
                    <p style='margin: 5px 0;'><strong>🌐 Origem:</strong> Landing Page ELEV Sacoma II</p>
                </div>
                
                <!-- CTA Button -->
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='mailto:$email' style='display: inline-block; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; box-shadow: 0 3px 10px rgba(30, 60, 114, 0.3);'>
                        📧 Responder Lead
                    </a>
                </div>
                
                <div style='border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 12px;'>
                    <p>Este email foi gerado automaticamente pelo sistema de leads da Landing Page.</p>
                    <p><strong>ELEV Park Sacomã II</strong> | Sistema de Captação de Leads</p>
                </div>
                
            </div>
        </div>
    </body>
    </html>";
}

/**
 * Validar endereço de email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Enviar email de boas-vindas para o lead (futuro)
 */
function sendWelcomeEmail($leadData) {
    // Implementar futuramente se necessário
    return true;
}

/**
 * Enviar email de confirmação (futuro)
 */
function sendConfirmationEmail($leadData) {
    // Implementar futuramente se necessário  
    return true;
}

?>
