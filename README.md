# 🏢 ELEV Park Sacomã II - Landing Page

Uma landing page moderna e otimizada para o empreendimento imobiliário ELEV Park Sacomã II, desenvolvida com Next.js e TypeScript.

## 🚀 **Tecnologias Utilizadas**

- **Next.js 14** - React Framework com SSG/SSR
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos e otimizados
- **Next.js Image** - Otimização automática de imagens

## 📱 **Funcionalidades**

### 🏠 **Apresentação do Empreendimento**
- Hero section com vídeo/imagem da fachada
- Galeria de apartamentos decorados
- Plantas dos apartamentos (1 e 2 dormitórios)
- Implantação do terreno

### 🏊‍♀️ **Área de Lazer**
- Galeria de amenidades com imagens reais
- Espaços: piscinas, academia, playground, coworking
- Layout responsivo com hover effects

### 📍 **Localização**
- Proximidade com transporte público (3 min da Estação Sacomã)
- Imagens da região e pontos de interesse
- Benefícios da localização

### 📋 **Formulários de Contato**
- Múltiplos pontos de conversão
- Integração com WhatsApp
- Validação de campos
- Rastreamento de eventos

## 🖼️ **Sistema de Imagens Otimizado**

### **Componente ImageManager**
Sistema centralizado para gerenciar todas as imagens do projeto:

```typescript
// Componentes disponíveis
- HeroBuilding: Fachada principal
- HeroBackground: Background da hero section
- HeroVideo: Player de vídeo otimizado
- FloorPlan: Plantas dos apartamentos
- ApartmentGallery: Galeria de decorados
- AmenitiesGallery: Espaços de lazer
- LocationImage: Imagens de localização
```

### **Otimizações Implementadas**
- ✅ Lazy loading automático
- ✅ Blur placeholders dinâmicos
- ✅ Responsive images com breakpoints
- ✅ Formatos WebP/AVIF automáticos
- ✅ Priority loading para imagens críticas

## 📊 **Performance**

### **Bundle Size**
- Página principal: **22.1kB**
- First Load JS: **102kB**
- Build otimizado para produção

### **Otimizações**
- ✅ Static Site Generation (SSG)
- ✅ Image Optimization automática
- ✅ Code Splitting
- ✅ Tree Shaking
- ✅ Minification

## 🛠️ **Instalação e Uso**

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/elev-sacoma-landing.git

# Entre no diretório
cd elev-sacoma-landing

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### **Scripts Disponíveis**
```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run lint       # Verificação de código
```

## 📱 **Responsividade**

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### **Layouts Adaptativos**
- Grid responsivo para galerias
- Navigation otimizada para mobile
- Formulários adaptáveis
- Imagens com sizes otimizados

## 🎨 **Design System**

### **Cores**
- **Primária**: Azul (`blue-600` a `blue-900`)
- **Secundária**: Laranja (`orange-500`)
- **Acentos**: Roxo (`purple-600`), Verde (`green-600`)

### **Tipografia**
- **Títulos**: Font weights 600-800
- **Corpo**: Font weight 400-500
- **Destaque**: Font weight 700

### **Componentes**
- Cards com sombras elevadas
- Botões com hover effects
- Transições suaves (300ms)
- Bordas arredondadas modernas

## 📁 **Estrutura do Projeto**

```
├── components/
│   └── ImageManager.tsx    # Sistema de imagens
├── pages/
│   ├── _app.tsx           # App wrapper
│   └── index.tsx          # Página principal
├── public/
│   ├── images/            # Assets de imagens
│   │   ├── hero/         # Imagens da hero section
│   │   ├── gallery/      # Apartamentos decorados
│   │   ├── amenities/    # Espaços de lazer
│   │   ├── floorplans/   # Plantas
│   │   └── location/     # Localização
│   └── videos/           # Vídeos do empreendimento
├── styles/
│   └── globals.css       # Estilos globais
└── elev_sacoma_landing.tsx # Componente principal
```

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Outras Opções**
- **Netlify**: Drag & drop da pasta `out/`
- **GitHub Pages**: Com GitHub Actions
- **AWS S3**: Upload manual ou CI/CD

## 📈 **SEO e Performance**

### **Meta Tags**
- Open Graph completo
- Twitter Cards
- Structured Data (JSON-LD)
- Meta description otimizada

### **Performance**
- Lighthouse Score: 90+
- Core Web Vitals otimizados
- Cache headers configurados
- Compressão ativa

## 🔧 **Configurações**

### **Next.js Config**
- Image domains configurados
- Headers de segurança
- Cache otimizado
- Compressão habilitada

### **TypeScript**
- Strict mode ativo
- Paths configurados
- ESLint integrado

## 📞 **Integração WhatsApp**

Formulários configurados para envio direto ao WhatsApp com:
- Mensagem pré-formatada
- Dados do lead incluídos
- Tracking de conversão

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 **Contato**

Para dúvidas sobre o projeto ou empreendimento:
- **WhatsApp**: [Clique aqui](https://wa.me/5511999999999)
- **Email**: contato@elevparksacoma.com.br

---

**Desenvolvido com ❤️ para ELEV Park Sacomã II**

### Funcionalidades
- ✅ **3 CTAs diferenciados** para cada público-alvo
- ✅ **Calculadora de investimento** interativa
- ✅ **Countdown timer** para criar urgência
- ✅ **Seção primeira casa própria** com simulações reais
- ✅ **Design mobile-first** responsivo
- ✅ **Integração WhatsApp** com mensagens pré-definidas
- ✅ **Facebook Pixel** para tracking de conversões
- ✅ **Meta tags otimizadas** para SEO

### Integrações Configuradas
- 🔗 **Facebook Pixel** (configurar YOUR_PIXEL_ID)
- 🔗 **RD Station** (endpoint para captura de leads)
- 🔗 **WhatsApp Business** (link direto com mensagem)
- 🔗 **Hostinger** (otimizado para hospedagem)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para executar

1. **Instalar dependências**
```bash
npm install
# ou
yarn install
```

2. **Executar em modo desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

3. **Acessar no navegador**
```
http://localhost:3000
```

4. **Build para produção**
```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## ⚙️ Configurações Necessárias

### Facebook Pixel
Substituir `YOUR_PIXEL_ID` no arquivo `elev_sacoma_landing.tsx` pelo ID real do pixel:
```javascript
window.fbq('init', 'SEU_PIXEL_ID_AQUI');
```

### RD Station
Configurar endpoint da API no método `handleSubmit`:
```javascript
// Substituir pela URL real da API do RD Station
const rdEndpoint = 'https://api.rd.services/platform/conversions';
```

### WhatsApp
Atualizar número do WhatsApp nos links:
```javascript
// Substituir pelo número real
const whatsappNumber = '5511999999999';
```

## 📱 Responsividade

A landing page foi desenvolvida com abordagem **mobile-first**:
- Breakpoints otimizados para todos os dispositivos
- Componentes adaptáveis para telas pequenas
- Navegação touch-friendly
- Carregamento otimizado de imagens

## 🎨 Design System

### Cores de Alta Conversão
- **Azul**: Confiança e profissionalismo (#1e40af)
- **Verde**: Sucesso e aprovação (#059669)
- **Laranja**: Urgência e ação (#ea580c)
- **Vermelho**: Urgência crítica (#dc2626)

### Tipografia
- Fonte principal: Inter (sistema)
- Hierarquia clara de títulos
- Legibilidade otimizada

## 📊 Métricas e Conversão

### Eventos Trackados
- Visualização de página
- Cliques nos CTAs principais
- Submissão de formulários
- Interação com calculadora
- Cliques no WhatsApp

### Pontos de Conversão
- Formulário principal (hero)
- Formulário primeira casa própria
- Formulário final da página
- Botão WhatsApp flutuante
- CTAs da calculadora de investimento

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework principal
- **Next.js 14** - Framework full-stack
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones otimizados
- **TypeScript** - Tipagem estática

## 📈 Otimizações de Performance

- Lazy loading de componentes
- Otimização de imagens
- Minificação de CSS/JS
- Compressão gzip
- Cache de assets estáticos

## 🚀 Deploy

Para deploy na Hostinger ou outros provedores:

1. **Build do projeto**
```bash
npm run build
```

2. **Upload dos arquivos**
- Fazer upload da pasta `out/` (se usando export estático)
- Ou configurar deploy automático via Git

3. **Configurar domínio**
- Apontar domínio para a pasta do projeto
- Configurar SSL/HTTPS

## 📞 Suporte

Para dúvidas sobre implementação ou customizações, entre em contato com a equipe de desenvolvimento.

---

**ELEV Park Sacomã II** - Sua nova vida começa aqui! 🏠✨