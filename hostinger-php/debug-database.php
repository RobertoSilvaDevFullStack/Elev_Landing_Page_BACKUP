<?php
/**
 * Script de Debug para Conexão MySQL
 * Verificar se o banco está configurado corretamente
 */

require_once 'config.php';

echo "<h2>🔧 Debug - Conexão MySQL</h2>";

try {
    echo "<p><strong>1. Testando conexão...</strong></p>";
    $pdo = createDatabaseConnection();
    echo "<p style='color: green;'>✅ Conexão com MySQL: SUCESSO</p>";
    
    echo "<p><strong>2. Verificando tabela 'leads'...</strong></p>";
    
    // Verificar se tabela existe
    $checkTable = $pdo->query("SHOW TABLES LIKE 'leads'");
    if ($checkTable->rowCount() > 0) {
        echo "<p style='color: green;'>✅ Tabela 'leads': EXISTE</p>";
        
        // Verificar estrutura da tabela
        echo "<p><strong>3. Estrutura da tabela:</strong></p>";
        $structure = $pdo->query("DESCRIBE leads");
        echo "<table border='1' style='border-collapse: collapse; margin: 10px 0;'>";
        echo "<tr><th>Campo</th><th>Tipo</th><th>Null</th><th>Key</th><th>Default</th></tr>";
        while ($row = $structure->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>";
            echo "<td>{$row['Field']}</td>";
            echo "<td>{$row['Type']}</td>";
            echo "<td>{$row['Null']}</td>";
            echo "<td>{$row['Key']}</td>";
            echo "<td>{$row['Default']}</td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Contar registros
        echo "<p><strong>4. Contando registros...</strong></p>";
        $count = $pdo->query("SELECT COUNT(*) as total FROM leads")->fetch();
        echo "<p style='color: blue;'>📊 Total de leads: <strong>{$count['total']}</strong></p>";
        
        if ($count['total'] > 0) {
            echo "<p><strong>5. Últimos 5 leads:</strong></p>";
            $recent = $pdo->query("SELECT id, name, email, created_at FROM leads ORDER BY created_at DESC LIMIT 5");
            echo "<table border='1' style='border-collapse: collapse; margin: 10px 0;'>";
            echo "<tr><th>ID</th><th>Nome</th><th>Email</th><th>Data</th></tr>";
            while ($lead = $recent->fetch(PDO::FETCH_ASSOC)) {
                echo "<tr>";
                echo "<td>{$lead['id']}</td>";
                echo "<td>{$lead['name']}</td>";
                echo "<td>{$lead['email']}</td>";
                echo "<td>{$lead['created_at']}</td>";
                echo "</tr>";
            }
            echo "</table>";
        }
        
    } else {
        echo "<p style='color: red;'>❌ Tabela 'leads': NÃO EXISTE</p>";
        echo "<p><strong>Criando tabela...</strong></p>";
        
        $createTable = "
        CREATE TABLE leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            interest_type VARCHAR(100),
            source VARCHAR(100) DEFAULT 'website',
            campaign VARCHAR(100) DEFAULT 'ELEV Sacoma II',
            ip_address VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ";
        
        $pdo->exec($createTable);
        echo "<p style='color: green;'>✅ Tabela 'leads' criada com sucesso!</p>";
    }
    
    echo "<p><strong>6. Configurações do MySQL:</strong></p>";
    echo "<ul>";
    echo "<li>Host: " . DB_HOST . "</li>";
    echo "<li>Database: " . DB_NAME . "</li>";
    echo "<li>User: " . DB_USER . "</li>";
    echo "<li>Charset: " . DB_CHARSET . "</li>";
    echo "</ul>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ ERRO: " . $e->getMessage() . "</p>";
    
    echo "<p><strong>Detalhes do erro:</strong></p>";
    echo "<ul>";
    echo "<li>Arquivo: " . $e->getFile() . "</li>";
    echo "<li>Linha: " . $e->getLine() . "</li>";
    echo "</ul>";
}

?>
