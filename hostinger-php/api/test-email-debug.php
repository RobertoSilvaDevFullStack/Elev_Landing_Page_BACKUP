<?php
/**
 * Teste Simples - Sistema de Email
 * Debug direto das funções de email
 */

echo "<h2>🧪 Teste Sistema de Email - ELEV Sacomã II</h2>";
echo "<p><strong>Data/Hora:</strong> " . date('Y-m-d H:i:s') . "</p><hr>";

try {
    // 1. Incluir arquivos
    echo "<h3>1. Carregando configurações...</h3>";
    require_once '../config.php';
    echo "✅ Config.php carregado<br>";
    
    require_once 'email-service-fixed.php';
    echo "✅ Email service carregado<br>";
    
    // 2. Verificar configurações
    echo "<h3>2. Verificando configurações de email:</h3>";
    echo "<strong>SMTP Host:</strong> " . SMTP_HOST . "<br>";
    echo "<strong>SMTP Port:</strong> " . SMTP_PORT . "<br>";
    echo "<strong>SMTP User:</strong> " . SMTP_USER . "<br>";
    echo "<strong>Notification Email:</strong> " . NOTIFICATION_EMAIL . "<br>";
    echo "<strong>Função mail():</strong> " . (function_exists('mail') ? '✅ Disponível' : '❌ Não disponível') . "<br>";
    
    // 3. Teste simples de mail()
    echo "<h3>3. Teste básico da função mail():</h3>";
    $testSubject = "Teste - Sistema ELEV - " . date('H:i:s');
    $testMessage = "Este é um email de teste do sistema ELEV Park Sacomã II enviado às " . date('Y-m-d H:i:s');
    $testHeaders = "From: " . SMTP_USER . "\r\n";
    $testHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $mailResult = mail(NOTIFICATION_EMAIL, $testSubject, $testMessage, $testHeaders);
    
    if ($mailResult) {
        echo "✅ <strong>Função mail() retornou TRUE</strong><br>";
        echo "📧 Email deveria ter sido enviado para: <strong>" . NOTIFICATION_EMAIL . "</strong><br>";
    } else {
        echo "❌ <strong>Função mail() retornou FALSE</strong><br>";
        echo "⚠️ Pode haver problema na configuração do servidor<br>";
    }
    
    // 4. Teste da função personalizada
    echo "<h3>4. Teste da função sendNewLeadNotification():</h3>";
    
    $testLeadData = [
        'id' => 'TESTE_' . time(),
        'name' => 'Roberto Silva (TESTE EMAIL)',
        'email' => 'roberto@teste.com',
        'phone' => '(11) 98765-4321',
        'interest_type' => '2 dormitórios - Teste',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    echo "<strong>Dados do lead teste:</strong><br>";
    echo "Nome: " . $testLeadData['name'] . "<br>";
    echo "Email: " . $testLeadData['email'] . "<br>";
    echo "Telefone: " . $testLeadData['phone'] . "<br>";
    echo "Interesse: " . $testLeadData['interest_type'] . "<br><br>";
    
    $notificationResult = sendNewLeadNotification($testLeadData);
    
    if ($notificationResult) {
        echo "✅ <strong>sendNewLeadNotification() retornou TRUE</strong><br>";
        echo "📧 Notificação deveria ter sido enviada!<br>";
    } else {
        echo "❌ <strong>sendNewLeadNotification() retornou FALSE</strong><br>";
        echo "⚠️ Verificar configurações ou logs de erro<br>";
    }
    
    echo "<hr>";
    echo "<h3>🔍 Próximos passos para debug:</h3>";
    echo "<ol>";
    echo "<li><strong>Verifique a caixa de entrada</strong> de " . NOTIFICATION_EMAIL . "</li>";
    echo "<li><strong>Verifique a caixa de SPAM/Lixeira</strong></li>";
    echo "<li><strong>Verifique os logs do servidor</strong> (cPanel → Error Logs)</li>";
    echo "<li><strong>Teste com outro provedor de email</strong> se necessário</li>";
    echo "</ol>";
    
} catch (Exception $e) {
    echo "<div style='color: red; background: #ffe6e6; padding: 10px; border: 1px solid red;'>";
    echo "<h3>❌ ERRO:</h3>";
    echo "<strong>Mensagem:</strong> " . $e->getMessage() . "<br>";
    echo "<strong>Arquivo:</strong> " . $e->getFile() . "<br>";
    echo "<strong>Linha:</strong> " . $e->getLine() . "<br>";
    echo "</div>";
}

echo "<hr>";
echo "<p><small>Teste concluído às " . date('Y-m-d H:i:s') . "</small></p>";
?>
