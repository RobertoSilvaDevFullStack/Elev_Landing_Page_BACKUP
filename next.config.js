/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Desabilitado para reduzir Fast Refresh issues
  swcMinify: true,
  
  // Otimizações de performance
  experimental: {
    // optimizeCss: true, // Removido temporariamente para evitar erro do critters
  },
  
  // Configurações de imagem (Vercel otimiza automaticamente)
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Configurações de desenvolvimento - FAST REFRESH DESABILITADO
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Configurações mais conservadoras para desenvolvimento
      config.watchOptions = {
        poll: 10000, // Polling muito conservador
        aggregateTimeout: 5000, // Timeout grande para evitar recompilações
        ignored: ['**/node_modules/**', '**/.git/**', '**/public/**', '**/.next/**'],
      }
      
      // Reduzir logs de infraestrutura
      config.infrastructureLogging = { level: 'warn' }
      
      // DESABILITAR FAST REFRESH - remove o plugin react-refresh
      config.plugins = config.plugins.filter(plugin => {
        return !plugin.constructor.name.includes('ReactRefreshWebpackPlugin');
      });
      
      // Configurações de módulos mais estáveis
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false, // Simplificar ao máximo
      }
      
      // Cache mais conservador
      config.cache = {
        type: 'memory', // Usar memória em vez de filesystem para mais estabilidade
      }
    }
    return config
  },
  
  // Headers de segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Compressão
  compress: true,
  
  // Configurações de build
  generateEtags: false,
  poweredByHeader: false,
  
  // Configuração para export estático (desabilitado para Vercel)
  // trailingSlash: true,
  // output: 'export',
};

module.exports = nextConfig;