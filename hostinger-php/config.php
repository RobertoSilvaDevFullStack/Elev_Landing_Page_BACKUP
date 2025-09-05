<?php
/**
 * Configuração do Banco de Dados para Hostinger
 * Equivalente ao dbConfig do TypeScript
 */
// Configurações do MySQL na Hostinger
define('DB_HOST', 'localhost');
define('DB_USER', 'u787187912_elev_leads_db');
define('DB_PASS', 'Julio824580@');
define('DB_NAME', 'u787187912_elev_leads_db');
define('DB_CHARSET', 'utf8mb4');

// Configurações do Email (SMTP)
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'fdms.nanda2@fernandaimobiliaria.com');
define('SMTP_PASS', 'Julio824580@'); // Definir após configurar senha no painel Hostinger
define('NOTIFICATION_EMAIL', 'fdms.nanda2@fernandaimobiliaria.com');

// Configurações gerais
define('TIMEZONE', 'America/Sao_Paulo');
define('PROJECT_NAME', 'ELEV Park Sacomã II');
define('CAMPAIGN_DEFAULT', 'ELEV Sacoma II');

// Configurar timezone
date_default_timezone_set(TIMEZONE);

/**
 * Função para criar conexão PDO com o MySQL
 * Equivalente ao createConnection() do TypeScript
 */
function createDatabaseConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
        
    } catch (PDOException $e) {
        error_log("Erro de conexão MySQL: " . $e->getMessage());
        throw new Exception("Falha na conexão com banco de dados");
    }
}

/**
 * Função para validar e sanitizar dados de entrada
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return trim(htmlspecialchars($data, ENT_QUOTES, 'UTF-8'));
}

/**
 * Função para retornar resposta JSON padronizada
 */
function jsonResponse($success, $message, $data = null, $httpCode = 200) {
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=utf-8');
    
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    if ($data !== null) {
        $response = array_merge($response, $data);
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Função para logs de debug/erro
 */
function logMessage($message, $type = 'INFO') {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$type] $message" . PHP_EOL;
    error_log($logEntry, 3, __DIR__ . '/logs/elev-leads.log');
}

/**
 * Headers de CORS e segurança
 */
function setCORSHeaders() {
    // CORS para permitir requests do React
    header('Access-Control-Allow-Origin: https://fernandaimobiliaria.com');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    
    // Headers de segurança
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
}

/**
 * Tratar requisições OPTIONS (preflight)
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    setCORSHeaders();
    http_response_code(204);
    exit;
}

// Definir headers padrão para todas as requisições
setCORSHeaders();

?>
