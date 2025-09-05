/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuração para exportação estática (Hostinger)
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Desabilitar otimizações que requerem servidor
  images: {
    unoptimized: true
  },
  
  // Configurações de build para hospedagem estática
  generateEtags: false,
  poweredByHeader: false,
  
  // Headers básicos (aplicados pelo servidor web da Hostinger)
  compress: true,
  
  // Variáveis de ambiente para build
  env: {
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  },
  
  // Configurações específicas para hospedagem estática
  basePath: '',
  assetPrefix: '',
  
  // Otimizações para Hostinger
  experimental: {
    esmExternals: false
  }
};

module.exports = nextConfig;
