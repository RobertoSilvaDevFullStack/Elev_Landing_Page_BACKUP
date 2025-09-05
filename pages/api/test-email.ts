// pages/api/test-email.ts
// API para testar configuração de email

import { NextApiRequest, NextApiResponse } from 'next';
import { sendTestEmail, testEmailConfiguration } from '../../lib/emailService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testEmail, action } = req.body;

    if (action === 'verify') {
      // Testar apenas a configuração
      const isValid = await testEmailConfiguration();
      
      return res.status(200).json({
        success: isValid,
        message: isValid ? 'Configuração de email válida' : 'Erro na configuração de email',
        config_valid: isValid
      });
    }

    if (action === 'send-test') {
      // Validar email de teste
      if (!testEmail || !testEmail.includes('@')) {
        return res.status(400).json({
          success: false,
          error: 'Email válido é obrigatório'
        });
      }

      // Primeiro verificar configuração
      const configValid = await testEmailConfiguration();
      if (!configValid) {
        return res.status(500).json({
          success: false,
          error: 'Configuração de email inválida. Verifique as variáveis de ambiente.',
          config_valid: false
        });
      }

      // Enviar email de teste
      const emailSent = await sendTestEmail(testEmail);
      
      return res.status(emailSent ? 200 : 500).json({
        success: emailSent,
        message: emailSent 
          ? `Email de teste enviado para ${testEmail}` 
          : 'Erro ao enviar email de teste',
        test_email_sent: emailSent,
        recipient: testEmail
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Ação inválida. Use "verify" ou "send-test"'
    });

  } catch (error) {
    console.error('❌ Erro na API de teste de email:', error);
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro interno ao testar email'
    });
  }
}
