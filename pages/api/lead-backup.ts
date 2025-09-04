// pages/api/lead-backup.ts
// API Route para salvar leads no MySQL

import { NextApiRequest, NextApiResponse } from 'next';
import { saveLeadToMySQL, saveErrorLog } from './save-lead-backup';

interface LeadData {
  email: string;
  name: string;
  mobile_phone: string;
  cf_interest_type: string;
  cf_source: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar se é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let leadId: number | null = null;

  try {
    const leadData: LeadData = req.body;

    // Validar dados obrigatórios
    if (!leadData.email || !leadData.name) {
      return res.status(400).json({ error: 'Email e nome são obrigatórios' });
    }

    // ✅ SALVAR NO MySQL
    try {
      // Capturar IP e User Agent
      const clientIP = req.headers['x-forwarded-for'] as string || 
                      req.headers['x-real-ip'] as string ||
                      req.connection.remoteAddress || 'unknown';
      
      const userAgent = req.headers['user-agent'] || 'unknown';

      const backupData = {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.mobile_phone,
        interest_type: leadData.cf_interest_type,
        source: leadData.cf_source,
        campaign: 'ELEV Sacoma II',
        ip_address: clientIP.split(',')[0].trim(),
        user_agent: userAgent
      };

      leadId = await saveLeadToMySQL(backupData);
      console.log(`✅ Lead ${leadId} salvo no MySQL com sucesso`);

      return res.status(200).json({ 
        success: true, 
        message: 'Lead salvo com sucesso no banco de dados',
        backup_saved: true,
        lead_id: leadId
      });

    } catch (mysqlError) {
      console.error('❌ Erro ao salvar no MySQL:', mysqlError);
      
      // Salvar log do erro
      await saveErrorLog(
        null,
        'mysql_save_error',
        mysqlError instanceof Error ? mysqlError.message : 'MySQL não disponível',
        { leadData, error: String(mysqlError) }
      );

      return res.status(500).json({
        success: false,
        message: 'Erro ao salvar lead no banco de dados',
        error: mysqlError instanceof Error ? mysqlError.message : 'Erro desconhecido',
        backup_saved: false
      });
    }

  } catch (error) {
    console.error('❌ Erro geral na API:', error);
    
    // Salvar log do erro
    await saveErrorLog(
      leadId,
      'api_general_error',
      error instanceof Error ? error.message : 'Erro desconhecido',
      { body: req.body, error: String(error) }
    );
    
    return res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      backup_saved: false,
      lead_id: leadId
    });
  }
}
