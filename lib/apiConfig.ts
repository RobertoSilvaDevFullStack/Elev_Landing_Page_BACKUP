/**
 * Configuração de APIs para diferentes ambientes
 * Facilita a troca entre desenvolvimento (TypeScript) e produção (PHP)
 */

// Configuração do ambiente
const isProduction = process.env.NODE_ENV === 'production' || typeof window !== 'undefined';
const usePhpApis = true; // Alterar para false para usar APIs TypeScript em desenvolvimento

// URLs base das APIs
const API_CONFIG = {
  // APIs TypeScript (desenvolvimento local)
  typescript: {
    leadBackup: '/api/lead-backup',
    dashboard: '/api/leads-dashboard',
    testEmail: '/api/test-email'
  },
  
  // APIs PHP (produção Hostinger)
  php: {
    leadBackup: '/hostinger-php/api/lead-backup-final.php',
    dashboard: '/hostinger-php/api/dashboard.php',
    testEmail: '/hostinger-php/api/test-email.php'
  }
};

// Selecionar APIs baseado no ambiente
const currentApis = usePhpApis ? API_CONFIG.php : API_CONFIG.typescript;

// Exportar URLs das APIs
export const API_ENDPOINTS = {
  LEAD_BACKUP: currentApis.leadBackup,
  DASHBOARD: currentApis.dashboard,
  TEST_EMAIL: currentApis.testEmail
};

// Função helper para fazer requests com tratamento de erro
export const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }
    
    return data;
    
  } catch (error) {
    console.error(`API Error [${url}]:`, error);
    throw error;
  }
};

// Log da configuração atual
if (typeof window !== 'undefined') {
  console.log('🔧 API Configuration:', {
    environment: isProduction ? 'production' : 'development',
    usePhpApis,
    endpoints: currentApis
  });
}

export default API_ENDPOINTS;
