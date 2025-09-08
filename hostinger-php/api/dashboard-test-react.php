<?php
/**
 * Teste API Dashboard - Formato exato esperado pelo React
 */

require_once '../config.php';

// Headers CORS
setCORSHeaders();

try {
    // Testar conexão
    $pdo = createDatabaseConnection();
    
    // Buscar todos os leads (limitado a 50)
    $leadsQuery = "
        SELECT 
            id, name, email, phone, interest_type, source, campaign,
            ip_address, user_agent, created_at
        FROM leads 
        ORDER BY created_at DESC 
        LIMIT 50
    ";
    $leadsStmt = $pdo->query($leadsQuery);
    $leads = $leadsStmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Estatísticas
    $totalQuery = "SELECT COUNT(*) as total FROM leads";
    $totalStmt = $pdo->query($totalQuery);
    $total = $totalStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Último lead
    $lastLeadDate = null;
    if (!empty($leads)) {
        $lastLeadDate = $leads[0]['created_at'];
    }
    
    // Tipos de interesse
    $interestQuery = "
        SELECT interest_type, COUNT(*) as total 
        FROM leads 
        WHERE interest_type != '' AND interest_type IS NOT NULL
        GROUP BY interest_type 
        ORDER BY total DESC
    ";
    $interestStmt = $pdo->query($interestQuery);
    $interestTypes = $interestStmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Formato EXATO esperado pelo React
    $dashboardData = [
        'leads' => $leads,
        'statistics' => [
            'total_leads' => (int)$total,
            'last_lead_date' => $lastLeadDate
        ],
        'daily_leads' => [], // Implementar depois se necessário
        'interest_types' => array_map(function($item) {
            return [
                'interest_type' => $item['interest_type'],
                'total' => (int)$item['total']
            ];
        }, $interestTypes)
    ];
    
    // Retornar no formato esperado
    $response = [
        'success' => true,
        'message' => 'Dashboard carregado com sucesso',
        'data' => $dashboardData,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    $response = [
        'success' => false,
        'message' => 'Erro ao carregar dashboard: ' . $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(500);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}
?>
