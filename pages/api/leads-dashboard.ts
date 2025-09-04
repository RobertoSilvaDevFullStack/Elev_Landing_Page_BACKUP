// pages/api/leads-dashboard.ts
// API para visualizar leads salvos no MySQL (Dashboard administrativo)

import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

// Configuração do banco de dados
const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'elev_user',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'elev_leads_db',
  port: parseInt(process.env.DB_PORT || '3306')
};

// Função para criar conexão MySQL
async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Erro ao conectar MySQL:', error);
    throw new Error('Falha na conexão com banco de dados');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar se é GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const connection = await createConnection();

    // Query para buscar leads recentes
    const leadsQuery = `
      SELECT 
        id,
        name,
        email,
        phone,
        interest_type,
        source,
        rd_station_status,
        created_at,
        ip_address
      FROM leads 
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    // Query para estatísticas
    const statsQuery = `
      SELECT 
        COUNT(*) as total_leads,
        SUM(CASE WHEN rd_station_status = 'success' THEN 1 ELSE 0 END) as rd_success,
        SUM(CASE WHEN rd_station_status = 'failed' THEN 1 ELSE 0 END) as rd_failed,
        SUM(CASE WHEN rd_station_status = 'pending' THEN 1 ELSE 0 END) as rd_pending,
        DATE(MAX(created_at)) as last_lead_date
      FROM leads
    `;

    // Query para leads por dia (últimos 7 dias)
    const dailyQuery = `
      SELECT 
        DATE(created_at) as data,
        COUNT(*) as total,
        SUM(CASE WHEN rd_station_status = 'success' THEN 1 ELSE 0 END) as sucessos
      FROM leads 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY data DESC
    `;

    // Query para tipos de interesse mais procurados
    const interestQuery = `
      SELECT 
        interest_type,
        COUNT(*) as total
      FROM leads 
      GROUP BY interest_type 
      ORDER BY total DESC
    `;

    // Executar todas as queries
    const [leadsResult] = await connection.execute(leadsQuery);
    const [statsResult] = await connection.execute(statsQuery);
    const [dailyResult] = await connection.execute(dailyQuery);
    const [interestResult] = await connection.execute(interestQuery);

    await connection.end();

    const leads = leadsResult as unknown[];
    const stats = (statsResult as unknown[])[0] as {
      total_leads: number;
      rd_success: number;
      rd_failed: number;
      rd_pending: number;
      last_lead_date: string;
    };
    const daily = dailyResult as unknown[];
    const interests = interestResult as unknown[];

    // Calcular taxa de sucesso
    const successRate = stats.total_leads > 0 
      ? ((stats.rd_success / stats.total_leads) * 100).toFixed(1)
      : '0';

    const response = {
      success: true,
      message: 'Dashboard de leads carregado com sucesso',
      timestamp: new Date().toISOString(),
      data: {
        leads: leads,
        statistics: {
          total_leads: stats.total_leads,
          rd_station: {
            success: stats.rd_success,
            failed: stats.rd_failed,
            pending: stats.rd_pending,
            success_rate: `${successRate}%`
          },
          last_lead_date: stats.last_lead_date
        },
        daily_leads: daily,
        interest_types: interests
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ Erro ao carregar dashboard:', error);

    return res.status(500).json({
      error: 'Erro ao carregar dashboard de leads',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      database_configured: !!(process.env.DB_HOST && process.env.DB_PASSWORD)
    });
  }
}
