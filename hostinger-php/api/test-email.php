<?php
/**
 * API Test Email - Equivalente ao test-email.ts
 * Endpoint para testar o sistema de email
 */

require_once '../config.php';
require_once 'email-service-fixed.php';

// =============================================
// PROCESSAMENTO PRINCIPAL DA API
// =============================================

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? 'verify';
    
    logMessage("🧪 Teste de email iniciado - Ação: $action");
    
    if ($action === 'verify') {
        // Apenas verificar configurações
        logMessage("🔍 Verificando configurações de email...");
        
        $configs = [
            'SMTP_HOST' => SMTP_HOST,
            'SMTP_PORT' => SMTP_PORT,
            'SMTP_USER' => SMTP_USER,
            'NOTIFICATION_EMAIL' => NOTIFICATION_EMAIL,
            'mail_function' => function_exists('mail') ? 'Disponível' : 'Não disponível'
        ];
        
        jsonResponse(true, 'Configurações verificadas', [
            'configurations' => $configs,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
    } elseif ($action === 'send-test') {
        // Enviar email de teste
        $testEmail = $input['testEmail'] ?? NOTIFICATION_EMAIL;
        
        logMessage("📧 Enviando email de teste para: $testEmail");
        
        // Dados de teste do lead
        $testLeadData = [
            'id' => 'TEST_' . time(),
            'name' => 'João Silva (TESTE)',
            'email' => $testEmail,
            'phone' => '(11) 99999-9999',
            'interest_type' => 'Apartamento 2 quartos - TESTE',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        // Tentar enviar o email de teste
        $emailSent = sendNewLeadNotification($testLeadData);
        
        if ($emailSent) {
            logMessage("✅ Teste de email concluído com sucesso!");
            
            jsonResponse(true, 'Email de teste enviado com sucesso', [
                'test_completed' => true,
                'email_sent' => true,
                'recipient' => $testEmail,
                'test_lead_id' => $testLeadData['id'],
                'timestamp' => date('Y-m-d H:i:s')
            ]);
            
        } else {
            logMessage("❌ Falha no teste de email");
            
            jsonResponse(false, 'Falha ao enviar email de teste', [
                'test_completed' => true,
                'email_sent' => false,
                'error' => 'Email service returned false',
                'recipient' => $testEmail,
                'test_lead_id' => $testLeadData['id'],
                'timestamp' => date('Y-m-d H:i:s')
            ], 500);
        }
        
    } else {
        jsonResponse(false, 'Ação não reconhecida', null, 400);
    }
    
} catch (Exception $error) {
    logMessage("❌ Erro no teste de email: " . $error->getMessage(), 'ERROR');
    
    jsonResponse(false, 'Erro interno no teste de email', [
        'test_completed' => false,
        'email_sent' => false,
        'error' => $error->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ], 500);
}

?>
