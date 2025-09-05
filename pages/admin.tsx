// pages/admin.tsx
// Dashboard Administrativo para Visualização de Leads

import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { API_ENDPOINTS } from '../lib/apiConfig';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest_type: string;
  source: string;
  created_at: string;
  ip_address: string;
}

interface DashboardData {
  leads: Lead[];
  statistics: {
    total_leads: number;
    last_lead_date: string;
  };
  daily_leads: Array<{
    data: string;
    total: number;
  }>;
  interest_types: Array<{
    interest_type: string;
    total: number;
  }>;
}

const AdminDashboard: NextPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'email'>('dashboard');
  const [testEmail, setTestEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });

  // Senha de acesso (em produção, usar algo mais seguro)
  const ADMIN_PASSWORD = 'elev2025@admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      loadDashboardData();
    } else {
      setError('Senha incorreta!');
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.DASHBOARD);
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      } else {
        setError('Erro ao carregar dados');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const testEmailConfiguration = async () => {
    setEmailStatus({ type: 'info', message: 'Testando configuração de email...' });
    
    try {
      const response = await fetch(API_ENDPOINTS.TEST_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEmailStatus({ type: 'success', message: 'Configuração de email válida!' });
      } else {
        setEmailStatus({ type: 'error', message: 'Erro na configuração. Verifique as variáveis de ambiente.' });
      }
    } catch {
      setEmailStatus({ type: 'error', message: 'Erro ao testar configuração.' });
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setEmailStatus({ type: 'error', message: 'Digite um email válido.' });
      return;
    }

    setEmailStatus({ type: 'info', message: 'Enviando email de teste...' });

    try {
      const response = await fetch(API_ENDPOINTS.TEST_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-test', testEmail })
      });

      const data = await response.json();

      if (data.success) {
        setEmailStatus({ 
          type: 'success', 
          message: `Email de teste enviado para ${testEmail}! Verifique a caixa de entrada.` 
        });
      } else {
        setEmailStatus({ 
          type: 'error', 
          message: data.error || 'Erro ao enviar email de teste.' 
        });
      }
    } catch {
      setEmailStatus({ type: 'error', message: 'Erro de conexão ao enviar email.' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin - ELEV Park Sacomã II</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-gray-600 mt-2">ELEV Park Sacomã II</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite a senha"
                  required
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - ELEV Park Sacomã II</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard de Leads</h1>
                <p className="text-sm text-gray-600">ELEV Park Sacomã II</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={loadDashboardData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : 'Atualizar'}
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Sair
                </button>
              </div>
            </div>
            
            {/* Abas de navegação */}
            <div className="border-t border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📊 Leads & Estatísticas
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'email'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📧 Notificações Email
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Conteúdo da aba Dashboard */}
          {activeTab === 'dashboard' && (
            <>
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Carregando dados...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {dashboardData && (
                <>
                  {/* Estatísticas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Total de Leads</h3>
                      <p className="text-3xl font-bold text-blue-600">{dashboardData.statistics.total_leads}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Último Lead</h3>
                      <p className="text-lg text-gray-700">
                        {dashboardData.statistics.last_lead_date 
                          ? formatDate(dashboardData.statistics.last_lead_date)
                          : 'Nenhum lead ainda'
                        }
                      </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Status do Sistema</h3>
                      <p className="text-lg text-green-600 font-medium">✅ Funcionando</p>
                    </div>
                  </div>

                  {/* Interesse mais procurado */}
                  {dashboardData.interest_types.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Tipos de Apartamento Mais Procurados</h3>
                      <div className="space-y-3">
                        {dashboardData.interest_types.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700">{item.interest_type}</span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {item.total} leads
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lista de Leads */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Leads Recentes</h3>
                      <p className="text-sm text-gray-600 mt-1">Últimos 50 leads recebidos</p>
                    </div>
                    
                    {dashboardData.leads.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Nenhum lead encontrado</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nome
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contato
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Interesse
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Data
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {dashboardData.leads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                    <div className="text-sm text-gray-500">ID: {lead.id}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm text-gray-900">{lead.email}</div>
                                    <div className="text-sm text-gray-500">{formatPhone(lead.phone)}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {lead.interest_type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(lead.created_at)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* Conteúdo da aba Email */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              {/* Status do Email */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">📧 Sistema de Notificações por Email</h3>
                <p className="text-gray-600 mb-6">
                  Configure e teste o sistema que envia notificações automáticas sempre que um novo lead chegar.
                </p>
                
                {emailStatus.type && (
                  <div className={`p-4 rounded-md mb-4 ${
                    emailStatus.type === 'success' ? 'bg-green-50 border border-green-200' :
                    emailStatus.type === 'error' ? 'bg-red-50 border border-red-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <p className={`text-sm ${
                      emailStatus.type === 'success' ? 'text-green-700' :
                      emailStatus.type === 'error' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {emailStatus.message}
                    </p>
                  </div>
                )}

                {/* Teste de Configuração */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">1. Testar Configuração</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Verificar se as configurações de email estão corretas.
                  </p>
                  <button
                    onClick={testEmailConfiguration}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    🔍 Verificar Configuração
                  </button>
                </div>

                {/* Enviar Email de Teste */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">2. Enviar Email de Teste</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Envie um email de teste para verificar se tudo está funcionando.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="seu-email@exemplo.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendTestEmail}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      📤 Enviar Teste
                    </button>
                  </div>
                </div>
              </div>

              {/* Configuração Manual */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">⚙️ Configuração Manual</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Variáveis de Ambiente Necessárias:</h4>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
{`# No arquivo .env.local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-app-password-do-gmail
NOTIFICATION_EMAIL=fernanda@fernandaimobiliaria.com`}
                  </pre>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Dica:</strong> Para Gmail, use uma &quot;App Password&quot; em vez da senha normal.
                  </p>
                </div>
              </div>

              {/* Como Funciona */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">ℹ️ Como Funciona</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">1.</span>
                    <span>Novo lead preenche formulário no site</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">2.</span>
                    <span>Lead é salvo automaticamente no MySQL</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">3.</span>
                    <span>Sistema envia email automático para Fernanda</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">4.</span>
                    <span>Email contém todos os dados e links para ação rápida</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">5.</span>
                    <span>Fernanda pode ligar, enviar WhatsApp ou acessar dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
