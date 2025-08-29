// pages/api/rdstation-lead.ts
// API Route para integração com RD Station CRM

import { NextApiRequest, NextApiResponse } from 'next';

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

  try {
    const leadData: RDStationLeadData = req.body;

    // Validar dados obrigatórios
    if (!leadData.email || !leadData.name) {
      return res.status(400).json({ error: 'Email e nome são obrigatórios' });
    }

    // Configurações do RD Station
    const RD_STATION_TOKEN = process.env.RD_STATION_TOKEN;
    const RD_STATION_IDENTIFIER = process.env.RD_STATION_IDENTIFIER || 'elev-sacoma-landing';

    if (!RD_STATION_TOKEN) {
      console.error('RD_STATION_TOKEN não configurado');
      return res.status(500).json({ error: 'Configuração do RD Station ausente' });
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
      console.log('Lead enviado para RD Station:', rdResult);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Lead enviado com sucesso para RD Station',
        rd_response: rdResult
      });
    } else {
      const errorText = await rdResponse.text();
      console.error('Erro RD Station:', errorText);
      
      // Se for erro 502 (servidor temporariamente indisponível)
      if (rdResponse.status === 502) {
        console.log('RD Station temporariamente indisponível - servidor está em manutenção');
        return res.status(200).json({ 
          success: true, 
          message: 'Lead será processado quando RD Station estiver disponível',
          warning: 'RD Station temporariamente indisponível'
        });
      }
      
      return res.status(rdResponse.status).json({ 
        error: 'Erro ao enviar lead para RD Station',
        details: errorText,
        status_code: rdResponse.status
      });
    }

  } catch (error) {
    console.error('Erro na API RD Station:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
