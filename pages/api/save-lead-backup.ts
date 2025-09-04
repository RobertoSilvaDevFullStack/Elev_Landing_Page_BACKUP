// pages/api/save-lead-backup.ts
// API para salvar leads no MySQL como backup seguro

import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

interface LeadBackupData {
  name: string;
  email: string;
  phone: string;
  interest_type: string;
  source?: string;
  campaign?: string;
  ip_address?: string;
  user_agent?: string;
}

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

// Função para salvar lead no MySQL
async function saveLeadToMySQL(leadData: LeadBackupData): Promise<number> {
  const connection = await createConnection();
  
  try {
    const query = `
      INSERT INTO leads (
        name, email, phone, interest_type, source, campaign, 
        ip_address, user_agent, rd_station_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;
    
    const values = [
      leadData.name,
      leadData.email,
      leadData.phone,
      leadData.interest_type,
      leadData.source || 'Landing Page',
      leadData.campaign || 'ELEV Sacoma II',
      leadData.ip_address,
      leadData.user_agent
    ];
    
    const [result] = await connection.execute(query, values) as [mysql.ResultSetHeader, mysql.FieldPacket[]];
    
    console.log('Lead salvo no MySQL:', result.insertId);
    return result.insertId;
    
  } finally {
    await connection.end();
  }
}

// Função para atualizar status do RD Station
export async function updateRDStationStatus(
  leadId: number, 
  status: 'success' | 'failed', 
  response?: unknown
): Promise<void> {
  const connection = await createConnection();
  
  try {
    const query = `
      UPDATE leads 
      SET rd_station_status = ?, rd_station_response = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    const responseText = response ? JSON.stringify(response) : null;
    await connection.execute(query, [status, responseText, leadId]);
    
    console.log(`Lead ${leadId} atualizado: status ${status}`);
    
  } finally {
    await connection.end();
  }
}

// Função para salvar log de erro
async function saveErrorLog(
  leadId: number | null, 
  errorType: string, 
  errorMessage: string, 
  errorDetails?: unknown
): Promise<void> {
  const connection = await createConnection();
  
  try {
    const query = `
      INSERT INTO error_logs (lead_id, error_type, error_message, error_details, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    const details = errorDetails ? JSON.stringify(errorDetails) : null;
    await connection.execute(query, [leadId, errorType, errorMessage, details]);
    
    console.log('Log de erro salvo:', errorType);
    
  } finally {
    await connection.end();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar se é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData: LeadBackupData = req.body;

    // Validar dados obrigatórios
    if (!leadData.email || !leadData.name || !leadData.phone) {
      return res.status(400).json({ 
        error: 'Email, nome e telefone são obrigatórios' 
      });
    }

    // Capturar IP e User Agent para auditoria
    const clientIP = req.headers['x-forwarded-for'] as string || 
                    req.headers['x-real-ip'] as string ||
                    req.connection.remoteAddress || 'unknown';
    
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Preparar dados com informações de auditoria
    const completeLeadData: LeadBackupData = {
      ...leadData,
      ip_address: clientIP.split(',')[0].trim(), // Pegar primeiro IP se houver proxy
      user_agent: userAgent
    };

    // Salvar lead no MySQL (SEMPRE salva, independente do RD Station)
    const leadId = await saveLeadToMySQL(completeLeadData);

    console.log(`✅ Lead ${leadId} salvo no MySQL com sucesso:`, {
      email: leadData.email,
      name: leadData.name,
      interest: leadData.interest_type
    });

    return res.status(200).json({
      success: true,
      message: 'Lead salvo no banco de dados com sucesso',
      lead_id: leadId,
      backup_status: 'saved'
    });

  } catch (error) {
    console.error('❌ Erro ao salvar lead no MySQL:', error);

    // Salvar log do erro (se possível)
    try {
      await saveErrorLog(
        null,
        'mysql_save_error',
        error instanceof Error ? error.message : 'Erro desconhecido',
        { body: req.body, error: String(error) }
      );
    } catch (logError) {
      console.error('Erro ao salvar log:', logError);
    }

    return res.status(500).json({
      error: 'Erro ao salvar lead no banco de dados',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      backup_status: 'failed'
    });
  }
}

// Exportar funções auxiliares para uso em outras APIs
export { saveLeadToMySQL, saveErrorLog };
