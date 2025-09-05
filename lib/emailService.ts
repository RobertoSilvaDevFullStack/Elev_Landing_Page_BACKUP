// lib/emailService.ts
import nodemailer from 'nodemailer';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest_type: string;
  created_at: string;
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Configuração do email (Gmail como exemplo, mas pode usar outros provedores)
const createEmailTransporter = () => {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true para 465, false para outros ports
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '', // App Password do Gmail
    },
  };

  return nodemailer.createTransport(config);
};

// Função para enviar notificação de novo lead
export const sendNewLeadNotification = async (lead: Lead): Promise<boolean> => {
  try {
    const transporter = createEmailTransporter();
    
    // Email da Fernanda (destinatário)
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'fernanda@fernandaimobiliaria.com';
    
    // Formatação da data brasileira
    const leadDate = new Date(lead.created_at).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Template do email
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .lead-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
            .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #111827; }
            .urgent { background: #fef2f2; border-left-color: #ef4444; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .urgent-text { color: #dc2626; font-weight: bold; }
            .action-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 10px 0 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .interest-badge { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚨 NOVO LEAD RECEBIDO!</h1>
                <p>ELEV Park Sacomã II</p>
            </div>
            
            <div class="content">
                <div class="urgent">
                    <p class="urgent-text">⚡ AÇÃO IMEDIATA RECOMENDADA</p>
                    <p>Contatar em até 5 minutos aumenta as chances de conversão em 400%!</p>
                </div>

                <div class="lead-info">
                    <h2 style="margin-top: 0; color: #1f2937;">📋 Informações do Lead</h2>
                    
                    <div class="info-row">
                        <span class="label">👤 Nome:</span>
                        <span class="value">${lead.name}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">📧 Email:</span>
                        <span class="value">${lead.email}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">📱 Telefone:</span>
                        <span class="value">${lead.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">🏠 Interesse:</span>
                        <span class="value">
                            <span class="interest-badge">${lead.interest_type}</span>
                        </span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">⏰ Data/Hora:</span>
                        <span class="value">${leadDate}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">🆔 ID do Lead:</span>
                        <span class="value">#${lead.id}</span>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <h3 style="color: #1f2937;">🎯 Ações Recomendadas</h3>
                    
                    <a href="tel:${lead.phone}" class="action-button">📞 Ligar Agora</a>
                    
                    <a href="https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Olá ${lead.name}! Vi que você se interessou pelo ${lead.interest_type} no ELEV Park Sacomã II. Posso te ajudar com mais informações?" 
                       class="action-button" target="_blank">💬 WhatsApp</a>
                    
                    <a href="https://fernandaimobiliaria.com/admin" class="action-button" target="_blank">📊 Ver Dashboard</a>
                </div>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #374151;">💡 Dicas para Primeira Abordagem</h4>
                    <ul style="color: #6b7280; line-height: 1.8;">
                        <li><strong>Ligue primeiro:</strong> Maior taxa de conversão</li>
                        <li><strong>Mencione o tipo:</strong> "Vi seu interesse no ${lead.interest_type}"</li>
                        <li><strong>Seja rápido:</strong> Lead ainda está "quente"</li>
                        <li><strong>WhatsApp backup:</strong> Se não atender a ligação</li>
                        <li><strong>Agende visita:</strong> Foco na experiência presencial</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <p>📊 Dashboard: <a href="https://fernandaimobiliaria.com/admin">fernandaimobiliaria.com/admin</a></p>
                <p>Este é um email automático do sistema de leads ELEV Park Sacomã II</p>
                <p>Desenvolvido por Roberto Silva - Suporte: WhatsApp</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Versão texto simples para clientes de email básicos
    const emailText = `
🚨 NOVO LEAD RECEBIDO - ELEV Park Sacomã II

⚡ AÇÃO IMEDIATA RECOMENDADA
Contatar em até 5 minutos aumenta conversão em 400%!

📋 INFORMAÇÕES DO LEAD:
👤 Nome: ${lead.name}
📧 Email: ${lead.email}  
📱 Telefone: ${lead.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
🏠 Interesse: ${lead.interest_type}
⏰ Data/Hora: ${leadDate}
🆔 ID: #${lead.id}

🎯 AÇÕES RECOMENDADAS:
1. Ligar: ${lead.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
2. WhatsApp: https://wa.me/55${lead.phone.replace(/\D/g, '')}
3. Dashboard: https://fernandaimobiliaria.com/admin

💡 DICAS:
- Ligue primeiro (maior conversão)
- Mencione: "Vi seu interesse no ${lead.interest_type}"
- Seja rápido, lead ainda está quente!
- WhatsApp se não atender
- Foque em agendar visita

Dashboard: fernandaimobiliaria.com/admin
Sistema automático ELEV Park Sacomã II
    `;

    // Configuração do email
    const mailOptions = {
      from: {
        name: 'ELEV Park Sacomã II - Sistema de Leads',
        address: process.env.SMTP_USER || 'sistema@fernandaimobiliaria.com'
      },
      to: recipientEmail,
      subject: `🚨 NOVO LEAD: ${lead.name} - ${lead.interest_type} (ID: #${lead.id})`,
      text: emailText,
      html: emailHtml,
      priority: 'high' as const, // Email de alta prioridade
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de notificação enviado:', info.messageId);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return false;
  }
};

// Função para testar configuração de email
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    const transporter = createEmailTransporter();
    
    // Verificar conectividade
    await transporter.verify();
    console.log('✅ Configuração de email válida');
    
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração de email:', error);
    return false;
  }
};

// Função para enviar email de teste
export const sendTestEmail = async (testEmail: string): Promise<boolean> => {
  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: {
        name: 'ELEV Park Sacomã II - TESTE',
        address: process.env.SMTP_USER || 'sistema@fernandaimobiliaria.com'
      },
      to: testEmail,
      subject: '🧪 TESTE - Sistema de Notificações por Email',
      html: `
        <h2>✅ Teste de Configuração de Email</h2>
        <p>Se você recebeu este email, o sistema de notificações está funcionando perfeitamente!</p>
        <p><strong>Dashboard:</strong> <a href="https://fernandaimobiliaria.com/admin">fernandaimobiliaria.com/admin</a></p>
        <p>Agora você receberá notificações automáticas sempre que um novo lead chegar.</p>
      `,
      text: `
✅ TESTE - Sistema de Notificações

Se você recebeu este email, o sistema está funcionando!
Dashboard: fernandaimobiliaria.com/admin

Agora você receberá notificações automáticas de novos leads.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de teste enviado para:', testEmail);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email de teste:', error);
    return false;
  }
};
