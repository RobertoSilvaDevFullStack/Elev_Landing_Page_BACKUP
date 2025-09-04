// test-leads.js
// Script para testar o sistema de leads

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testLeadSystem() {
  console.log('🧪 INICIANDO TESTES DO SISTEMA DE LEADS\n');

  // Teste 1: Verificar Dashboard (sem banco ainda)
  console.log('📊 Teste 1: Verificando Dashboard...');
  try {
    const dashboardResponse = await fetch(`${BASE_URL}/api/leads-dashboard`);
    const dashboardData = await dashboardResponse.json();
    
    console.log('✅ Dashboard Response:', dashboardResponse.status);
    console.log('📋 Data:', JSON.stringify(dashboardData, null, 2));
  } catch (error) {
    console.log('❌ Dashboard Error:', error.message);
    console.log('ℹ️ Isso é esperado se o MySQL não estiver configurado ainda\n');
  }

  // Teste 2: Simular envio de lead
  console.log('\n📝 Teste 2: Simulando envio de lead...');
  
  const testLead = {
    email: 'teste@gmail.com',
    name: 'João da Silva Teste',
    mobile_phone: '11987654321',
    cf_interest_type: '2 dormitórios',
    cf_source: 'Landing Page Teste'
  };

  try {
    const leadResponse = await fetch(`${BASE_URL}/api/rdstation-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLead)
    });

    const leadData = await leadResponse.json();
    
    console.log('✅ Lead Response:', leadResponse.status);
    console.log('📋 Data:', JSON.stringify(leadData, null, 2));

    // Verificar se foi salvo no backup
    if (leadData.backup_saved) {
      console.log('🛡️ SUCESSO: Lead salvo no backup MySQL!');
      console.log('🆔 Lead ID:', leadData.lead_id);
    } else {
      console.log('⚠️ ATENÇÃO: Lead não foi salvo no backup');
    }

    // Verificar RD Station
    if (leadData.success && !leadData.warning) {
      console.log('🚀 SUCESSO: Lead enviado para RD Station!');
    } else if (leadData.warning) {
      console.log('⚠️ RD Station indisponível, mas lead está seguro no backup');
    } else {
      console.log('❌ Falha no RD Station, mas backup deve ter funcionado');
    }

  } catch (error) {
    console.log('❌ Lead Error:', error.message);
  }

  // Teste 3: Verificar dashboard após envio
  console.log('\n📈 Teste 3: Verificando dashboard após envio...');
  try {
    const finalDashboard = await fetch(`${BASE_URL}/api/leads-dashboard`);
    const finalData = await finalDashboard.json();
    
    console.log('✅ Final Dashboard Response:', finalDashboard.status);
    console.log('📊 Estatísticas finais:', JSON.stringify(finalData.data?.statistics, null, 2));
    
    if (finalData.data?.statistics?.total_leads > 0) {
      console.log('🎉 SUCESSO TOTAL: Lead foi persistido no sistema!');
    }
  } catch (error) {
    console.log('❌ Final Dashboard Error:', error.message);
  }

  console.log('\n🏁 TESTES CONCLUÍDOS');
}

// Executar testes
testLeadSystem().catch(console.error);
