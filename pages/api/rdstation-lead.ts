// pages/api/rdstation-lead.ts
// API Route para integração com RD Station CRM + Backup MySQL

import { NextApiRequest, NextApiResponse } from 'next';
import { saveLeadToMySQL, updateRDStationStatus, saveErrorLog } from './save-lead-backup';

interface RDStationLeadData {
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
    const leadData: RDStationLeadData = req.body;

    // Validar dados obrigatórios
    if (!leadData.email || !leadData.name) {
      return res.status(400).json({ error: 'Email e nome são obrigatórios' });
    }

    // ✅ PASSO 1: SALVAR NO MySQL PRIMEIRO (GARANTIA TOTAL)
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
      console.log(`✅ Lead ${leadId} salvo no MySQL como backup`);

    } catch (mysqlError) {
      console.error('❌ CRÍTICO: Falha ao salvar no MySQL:', mysqlError);
      
      // Se nem o MySQL funcionar, pelo menos loggar o erro
      await saveErrorLog(
        null,
        'mysql_critical_failure',
        mysqlError instanceof Error ? mysqlError.message : 'MySQL não disponível',
        { leadData, error: String(mysqlError) }
      );

      // Continuar tentando RD Station mesmo com falha no MySQL
    }

    // ✅ PASSO 2: TENTAR ENVIAR PARA RD STATION
    const RD_STATION_TOKEN = process.env.RD_STATION_TOKEN;
    const RD_STATION_IDENTIFIER = process.env.RD_STATION_IDENTIFIER || 'elev-sacoma-landing';

    if (!RD_STATION_TOKEN) {
      console.error('RD_STATION_TOKEN não configurado');
      
      if (leadId) {
        await updateRDStationStatus(leadId, 'failed', { error: 'Token não configurado' });
      }
      
      return res.status(200).json({ 
        success: true,
        message: 'Lead salvo no backup MySQL, mas RD Station não configurado',
        backup_saved: leadId !== null,
        lead_id: leadId
      });
    }

    // Preparar dados para RD Station
    const rdPayload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: RD_STATION_IDENTIFIER,
        email: leadData.email,
        name: leadData.name,
        mobile_phone: leadData.mobile_phone,
        personal_phone: leadData.mobile_phone,
        cf_interest_type: leadData.cf_interest_type,
        cf_source: leadData.cf_source,
        cf_medium: 'landing-page',
        cf_campaign: 'elev-sacoma-ii',
        cf_content: 'lead-form',
        tags: ['lead', 'elev-sacoma', 'landing-page']
      }
    };

    // Enviar para RD Station
    const rdResponse = await fetch('https://api.rd.services/platform/conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RD_STATION_TOKEN}`
      },
      body: JSON.stringify(rdPayload)
    });

    if (rdResponse.ok) {
      const rdResult = await rdResponse.json();
      console.log('✅ Lead enviado para RD Station:', rdResult);
      
      // Atualizar status no MySQL
      if (leadId) {
        await updateRDStationStatus(leadId, 'success', rdResult);
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Lead enviado com sucesso para RD Station e salvo no backup',
        rd_response: rdResult,
        backup_saved: leadId !== null,
        lead_id: leadId
      });
    } else {
      const errorText = await rdResponse.text();
      console.error('❌ Erro RD Station:', errorText);
      
      // Atualizar status de falha no MySQL
      if (leadId) {
        await updateRDStationStatus(leadId, 'failed', { 
          status_code: rdResponse.status, 
          error: errorText 
        });
      }
      
      // Se for erro 502 (servidor temporariamente indisponível)
      if (rdResponse.status === 502) {
        console.log('RD Station temporariamente indisponível - lead seguro no MySQL');
        return res.status(200).json({ 
          success: true, 
          message: 'Lead salvo no backup. RD Station será processado quando disponível',
          warning: 'RD Station temporariamente indisponível',
          backup_saved: leadId !== null,
          lead_id: leadId
        });
      }
      
      return res.status(200).json({ 
        success: true,
        message: 'Lead salvo no backup, mas falha no RD Station',
        error: 'Erro ao enviar lead para RD Station',
        details: errorText,
        status_code: rdResponse.status,
        backup_saved: leadId !== null,
        lead_id: leadId
      });
    }

  } catch (error) {
    console.error('❌ Erro geral na API:', error);
    
    // Salvar log do erro
    if (leadId) {
      await updateRDStationStatus(leadId, 'failed', { 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      });
    }

    await saveErrorLog(
      leadId,
      'api_general_error',
      error instanceof Error ? error.message : 'Erro desconhecido',
      { body: req.body, error: String(error) }
    );
    
    return res.status(200).json({ 
      success: leadId !== null, // Sucesso se pelo menos salvou no MySQL
      message: leadId ? 'Lead salvo no backup apesar do erro' : 'Erro total - lead pode ter sido perdido',
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      backup_saved: leadId !== null,
      lead_id: leadId
    });
  }
}
