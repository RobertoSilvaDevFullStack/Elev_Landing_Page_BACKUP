<?php
/**
 * API Test Email - Equivalente ao test-email.ts
 * Endpoint para testar o sistema de email
 */

require_once '../config.php';
require_once 'email-service.php';

// =============================================
// PROCESSAMENTO PRINCIPAL DA API
// =============================================

try {
    // Verificar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Method not allowed', null, 405);
    }
    
    logMessage("🧪 Iniciando teste de email...");
    
    // Dados de teste do lead
    $testLeadData = [
        'id' => 'TEST_' . time(),
        'name' => 'João Silva (TESTE)',
        'email' => 'teste@elevlive.com.br',
        'phone' => '(11) 99999-9999',
        'interest_type' => 'Apartamento 2 quartos - TESTE',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    logMessage("📧 Enviando email de teste com os dados: " . json_encode($testLeadData));
    
    // Tentar enviar o email de teste
    $emailSent = sendNewLeadNotification($testLeadData);
    
    if ($emailSent) {
        logMessage("✅ Teste de email concluído com sucesso!");
        
        jsonResponse(true, 'Email de teste enviado com sucesso', [
            'test_completed' => true,
            'email_sent' => true,
            'recipients' => NOTIFICATION_EMAILS,
            'test_lead_id' => $testLeadData['id'],
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
    } else {
        logMessage("❌ Falha no teste de email");
        
        jsonResponse(false, 'Falha ao enviar email de teste', [
            'test_completed' => true,
            'email_sent' => false,
            'error' => 'Email service returned false',
            'recipients' => NOTIFICATION_EMAILS,
            'test_lead_id' => $testLeadData['id'],
            'timestamp' => date('Y-m-d H:i:s')
        ], 500);
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
