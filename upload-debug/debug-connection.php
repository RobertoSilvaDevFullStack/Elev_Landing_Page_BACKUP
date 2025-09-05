<?php
/**
 * Script de debug para testar conexões
 */
require_once 'config.php';

// Testar conexão com banco
echo "<h2>🔍 TESTE DE CONEXÃO - HOSTINGER</h2>";

echo "<h3>1. Configurações do Banco:</h3>";
echo "Host: " . DB_HOST . "<br>";
echo "User: " . DB_USER . "<br>";
echo "Database: " . DB_NAME . "<br>";
echo "Charset: " . DB_CHARSET . "<br>";

echo "<h3>2. Teste de Conexão MySQL:</h3>";
try {
    $pdo = createDatabaseConnection();
    echo "✅ <strong>Conexão MySQL OK!</strong><br>";
    
    // Testar se a tabela existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'leads'");
    if ($stmt->rowCount() > 0) {
        echo "✅ <strong>Tabela 'leads' existe!</strong><br>";
        
        // Contar registros
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM leads");
        $result = $stmt->fetch();
        echo "📊 <strong>Total de leads: " . $result['total'] . "</strong><br>";
        
        // Mostrar estrutura da tabela
        echo "<h4>Estrutura da tabela 'leads':</h4>";
        $stmt = $pdo->query("DESCRIBE leads");
        echo "<table border='1' style='border-collapse: collapse;'>";
        echo "<tr><th>Campo</th><th>Tipo</th><th>Nulo</th><th>Chave</th><th>Padrão</th></tr>";
        while ($row = $stmt->fetch()) {
            echo "<tr>";
            echo "<td>" . $row['Field'] . "</td>";
            echo "<td>" . $row['Type'] . "</td>";
            echo "<td>" . $row['Null'] . "</td>";
            echo "<td>" . $row['Key'] . "</td>";
            echo "<td>" . $row['Default'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        
    } else {
        echo "❌ <strong>Tabela 'leads' NÃO existe!</strong><br>";
        echo "💡 <strong>Precisa criar a tabela. SQL:</strong><br>";
        echo "<textarea style='width:100%; height:200px;'>
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    interest_type VARCHAR(100),
    source VARCHAR(100) DEFAULT 'landing-page',
    campaign VARCHAR(100) DEFAULT 'ELEV Sacoma II',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);
</textarea>";
    }
    
} catch (Exception $e) {
    echo "❌ <strong>Erro de conexão MySQL:</strong> " . $e->getMessage() . "<br>";
}

echo "<h3>3. Configurações de Email:</h3>";
echo "SMTP Host: " . SMTP_HOST . "<br>";
echo "SMTP Port: " . SMTP_PORT . "<br>";
echo "SMTP User: " . SMTP_USER . "<br>";
echo "Notification Email: " . NOTIFICATION_EMAIL . "<br>";

echo "<h3>4. Teste de Email (básico):</h3>";
try {
    // Verificar se as funções de email existem
    if (function_exists('mail')) {
        echo "✅ <strong>Função mail() disponível</strong><br>";
    } else {
        echo "❌ <strong>Função mail() NÃO disponível</strong><br>";
    }
    
    // Testar headers
    if (headers_sent()) {
        echo "⚠️ <strong>Headers já enviados</strong><br>";
    } else {
        echo "✅ <strong>Headers OK</strong><br>";
    }
    
} catch (Exception $e) {
    echo "❌ <strong>Erro no teste de email:</strong> " . $e->getMessage() . "<br>";
}

echo "<h3>5. Informações do Servidor:</h3>";
echo "PHP Version: " . PHP_VERSION . "<br>";
echo "Server: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Script Path: " . __FILE__ . "<br>";

echo "<h3>6. Teste POST para lead-backup.php:</h3>";
echo "<form method='POST' action='api/lead-backup.php' target='_blank'>";
echo "Nome: <input type='text' name='name' value='Teste Lead' required><br><br>";
echo "Email: <input type='email' name='email' value='teste@email.com' required><br><br>";
echo "Telefone: <input type='text' name='phone' value='11999999999'><br><br>";
echo "Interesse: <select name='interest_type'>";
echo "<option value='1-dormitorio'>1 Dormitório</option>";
echo "<option value='2-dormitorios'>2 Dormitórios</option>";
echo "</select><br><br>";
echo "<button type='submit'>🚀 Testar Envio de Lead</button>";
echo "</form>";

?>
