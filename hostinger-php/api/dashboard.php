<?php
/**
 * Dashboard API - Equivalente ao leads-dashboard.ts
 * API para visualização e gerenciamento de leads
 */

require_once '../config.php';

/**
 * Buscar todos os leads com paginação
 */
function getAllLeads($page = 1, $limit = 50, $search = '') {
    try {
        $pdo = createDatabaseConnection();
        $offset = ($page - 1) * $limit;
        
        // Query base
        $whereClause = '';
        $params = [];
        
        // Adicionar busca se fornecida
        if (!empty($search)) {
            $whereClause = "WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?";
            $searchTerm = "%$search%";
            $params = [$searchTerm, $searchTerm, $searchTerm];
        }
        
        // Contar total de registros
        $countQuery = "SELECT COUNT(*) as total FROM leads $whereClause";
        $countStmt = $pdo->prepare($countQuery);
        $countStmt->execute($params);
        $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Buscar leads com paginação
        $query = "
            SELECT 
                id, name, email, phone, interest_type, source, campaign,
                ip_address, user_agent, created_at
            FROM leads 
            $whereClause
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        ";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return [
            'leads' => $leads,
            'total' => (int)$total,
            'page' => (int)$page,
            'limit' => (int)$limit,
            'total_pages' => ceil($total / $limit)
        ];
        
    } catch (Exception $e) {
        logMessage("❌ Erro ao buscar leads: " . $e->getMessage(), 'ERROR');
        throw $e;
    }
}

/**
 * Obter estatísticas dos leads
 */
function getLeadsStats() {
    try {
        $pdo = createDatabaseConnection();
        
        // Total de leads
        $totalQuery = "SELECT COUNT(*) as total FROM leads";
        $totalStmt = $pdo->query($totalQuery);
        $total = $totalStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Leads hoje
        $todayQuery = "SELECT COUNT(*) as today FROM leads WHERE DATE(created_at) = CURDATE()";
        $todayStmt = $pdo->query($todayQuery);
        $today = $todayStmt->fetch(PDO::FETCH_ASSOC)['today'];
        
        // Leads esta semana
        $weekQuery = "SELECT COUNT(*) as week FROM leads WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        $weekStmt = $pdo->query($weekQuery);
        $week = $weekStmt->fetch(PDO::FETCH_ASSOC)['week'];
        
        // Leads este mês
        $monthQuery = "SELECT COUNT(*) as month FROM leads WHERE MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())";
        $monthStmt = $pdo->query($monthQuery);
        $month = $monthStmt->fetch(PDO::FETCH_ASSOC)['month'];
        
        // Leads por interesse
        $interestQuery = "
            SELECT interest_type, COUNT(*) as count 
            FROM leads 
            WHERE interest_type != '' 
            GROUP BY interest_type 
            ORDER BY count DESC
        ";
        $interestStmt = $pdo->query($interestQuery);
        $byInterest = $interestStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Leads por fonte
        $sourceQuery = "
            SELECT source, COUNT(*) as count 
            FROM leads 
            GROUP BY source 
            ORDER BY count DESC
        ";
        $sourceStmt = $pdo->query($sourceQuery);
        $bySource = $sourceStmt->fetchAll(PDO::FETCH_ASSOC);
        
        return [
            'total' => (int)$total,
            'today' => (int)$today,
            'week' => (int)$week,
            'month' => (int)$month,
            'by_interest' => $byInterest,
            'by_source' => $bySource
        ];
        
    } catch (Exception $e) {
        logMessage("❌ Erro ao obter estatísticas: " . $e->getMessage(), 'ERROR');
        throw $e;
    }
}

/**
 * Buscar lead por ID
 */
function getLeadById($id) {
    try {
        $pdo = createDatabaseConnection();
        
        $query = "SELECT * FROM leads WHERE id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$id]);
        $lead = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$lead) {
            throw new Exception("Lead não encontrado");
        }
        
        return $lead;
        
    } catch (Exception $e) {
        logMessage("❌ Erro ao buscar lead por ID: " . $e->getMessage(), 'ERROR');
        throw $e;
    }
}

/**
 * Deletar lead por ID
 */
function deleteLeadById($id) {
    try {
        $pdo = createDatabaseConnection();
        
        // Verificar se o lead existe
        $checkQuery = "SELECT id FROM leads WHERE id = ?";
        $checkStmt = $pdo->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            throw new Exception("Lead não encontrado");
        }
        
        // Deletar o lead
        $deleteQuery = "DELETE FROM leads WHERE id = ?";
        $deleteStmt = $pdo->prepare($deleteQuery);
        $result = $deleteStmt->execute([$id]);
        
        if ($result) {
            logMessage("✅ Lead $id deletado com sucesso");
            return true;
        } else {
            throw new Exception("Falha ao deletar lead");
        }
        
    } catch (Exception $e) {
        logMessage("❌ Erro ao deletar lead: " . $e->getMessage(), 'ERROR');
        throw $e;
    }
}

// =============================================
// PROCESSAMENTO PRINCIPAL DA API
// =============================================

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_SERVER['REQUEST_URI'];
    
    // Parse da query string
    $query = $_GET;
    
    switch ($method) {
        case 'GET':
            // GET /dashboard - Listar leads com paginação
            if (isset($query['action']) && $query['action'] === 'stats') {
                // GET /dashboard?action=stats - Estatísticas
                $stats = getLeadsStats();
                jsonResponse(true, 'Estatísticas obtidas com sucesso', $stats);
                
            } elseif (isset($query['id'])) {
                // GET /dashboard?id=123 - Lead específico
                $leadId = (int)$query['id'];
                $lead = getLeadById($leadId);
                jsonResponse(true, 'Lead encontrado', $lead);
                
            } else {
                // GET /dashboard - Formato compatível com React Dashboard
                $page = (int)($query['page'] ?? 1);
                $limit = (int)($query['limit'] ?? 50);
                $search = $query['search'] ?? '';
                
                $leadsResult = getAllLeads($page, $limit, $search);
                $statsResult = getLeadsStats();
                
                // Formato esperado pelo React Dashboard
                $dashboardData = [
                    'leads' => $leadsResult['leads'],
                    'statistics' => [
                        'total_leads' => $statsResult['total'],
                        'last_lead_date' => $leadsResult['leads'][0]['created_at'] ?? null
                    ],
                    'daily_leads' => [], // Pode ser implementado depois
                    'interest_types' => array_map(function($item) {
                        return [
                            'interest_type' => $item['interest_type'],
                            'total' => $item['count']
                        ];
                    }, $statsResult['by_interest'])
                ];
                
                jsonResponse(true, 'Dashboard carregado com sucesso', ['data' => $dashboardData]);
            }
            break;
            
        case 'DELETE':
            // DELETE /dashboard?id=123 - Deletar lead
            if (!isset($query['id'])) {
                jsonResponse(false, 'ID do lead é obrigatório', null, 400);
            }
            
            $leadId = (int)$query['id'];
            $deleted = deleteLeadById($leadId);
            
            if ($deleted) {
                jsonResponse(true, 'Lead deletado com sucesso', ['id' => $leadId]);
            } else {
                jsonResponse(false, 'Falha ao deletar lead', null, 500);
            }
            break;
            
        default:
            jsonResponse(false, 'Método não permitido', null, 405);
    }
    
} catch (Exception $error) {
    logMessage("❌ Erro na API Dashboard: " . $error->getMessage(), 'ERROR');
    
    jsonResponse(false, 'Erro interno do servidor', [
        'error' => $error->getMessage()
    ], 500);
}

?>
