<?php
/**
 * Teste Simples da API Dashboard
 */

require_once '../config.php';

// Headers CORS
setCORSHeaders();

echo "📊 Teste API Dashboard - " . date('Y-m-d H:i:s') . "\n\n";

try {
    echo "1. Testando conexão...\n";
    $pdo = createDatabaseConnection();
    echo "✅ Conexão: OK\n\n";
    
    echo "2. Verificando tabela leads...\n";
    $checkTable = $pdo->query("SHOW TABLES LIKE 'leads'");
    
    if ($checkTable->rowCount() > 0) {
        echo "✅ Tabela existe\n\n";
        
        echo "3. Contando leads...\n";
        $countResult = $pdo->query("SELECT COUNT(*) as total FROM leads");
        $total = $countResult->fetch(PDO::FETCH_ASSOC)['total'];
        echo "📊 Total de leads: $total\n\n";
        
        if ($total > 0) {
            echo "4. Buscando últimos leads...\n";
            $leadsQuery = "SELECT id, name, email, created_at FROM leads ORDER BY created_at DESC LIMIT 3";
            $leadsResult = $pdo->query($leadsQuery);
            $leads = $leadsResult->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($leads as $lead) {
                echo "Lead ID {$lead['id']}: {$lead['name']} - {$lead['email']} - {$lead['created_at']}\n";
            }
        } else {
            echo "⚠️ Nenhum lead encontrado na tabela\n";
        }
        
    } else {
        echo "❌ Tabela 'leads' não existe!\n";
        echo "Criando tabela...\n";
        
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
        echo "✅ Tabela criada com sucesso!\n";
        
        // Inserir lead de teste
        echo "Inserindo lead de teste...\n";
        $insertTest = "
        INSERT INTO leads (name, email, phone, interest_type, source, ip_address) 
        VALUES ('Lead Teste', 'teste@exemplo.com', '11999999999', '2 dorm - 34m²', 'website', '127.0.0.1')
        ";
        $pdo->exec($insertTest);
        echo "✅ Lead de teste inserido!\n";
    }
    
    echo "\n5. Testando API Dashboard...\n";
    
    // Simular chamada da API
    $_GET['action'] = 'stats';
    $_SERVER['REQUEST_METHOD'] = 'GET';
    
    // Estatísticas
    $statsQuery = "
    SELECT 
        COUNT(*) as total,
        MAX(created_at) as last_lead_date
    FROM leads
    ";
    $statsResult = $pdo->query($statsQuery);
    $stats = $statsResult->fetch(PDO::FETCH_ASSOC);
    
    echo "Estatísticas:\n";
    echo "- Total: {$stats['total']}\n";
    echo "- Último lead: {$stats['last_lead_date']}\n";
    
    echo "\n✅ Teste concluído com sucesso!\n";
    
} catch (Exception $e) {
    echo "❌ ERRO: " . $e->getMessage() . "\n";
    echo "Arquivo: " . $e->getFile() . "\n";
    echo "Linha: " . $e->getLine() . "\n";
}
?>
