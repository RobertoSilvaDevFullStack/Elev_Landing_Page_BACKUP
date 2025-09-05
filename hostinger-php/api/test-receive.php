<?php
/**
 * Teste rápido de recebimento de dados POST
 */

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Log de debug
error_log("=== DEBUG LEAD BACKUP ===");
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("POST data: " . print_r($_POST, true));
error_log("Raw input: " . file_get_contents('php://input'));

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Verificar se recebeu dados
$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

echo json_encode([
    'success' => true,
    'message' => 'Teste de recebimento OK!',
    'received_data' => [
        'POST' => $_POST,
        'JSON' => $jsonData,
        'RAW' => $rawInput,
        'method' => $_SERVER['REQUEST_METHOD'],
        'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
        'timestamp' => date('Y-m-d H:i:s')
    ]
]);
?>
