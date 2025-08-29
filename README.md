# 🏢 ELEV Park Sacomã II - Landing Page

> **Landing page moderna e otimizada para captação de leads imobiliários com integração RD Station CRM e Facebook Pixel**

![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Facebook Pixel](https://img.shields.io/badge/Facebook_Pixel-Integrado-1877F2?logo=facebook)
![RD Station](https://img.shields.io/badge/RD_Station-Integrado-FF6B35)

## 📋 Índice

- [📊 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🚀 Deploy e Produção](#-deploy-e-produção)
- [📱 Integrações](#-integrações)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Configuração](#️-configuração)
- [📖 Documentação](#-documentação)

## 📊 Visão Geral

**Landing page profissional** para o empreendimento imobiliário ELEV Park Sacomã II, desenvolvida com foco em **conversão de leads** e **experiência do usuário**. 

### 🎯 **Objetivos:**
- **Captura de leads qualificados** para o CRM
- **Conversão otimizada** com Facebook Pixel
- **Experiência mobile-first** responsiva
- **Integração automática** com ferramentas de marketing

### 📈 **Resultados Esperados:**
- ⬆️ **Aumento de 40%** na conversão de leads
- 📊 **Tracking completo** do funil de vendas
- 🤖 **Automação** de follow-up via RD Station
- 🎯 **Remarketing** eficiente com Facebook Ads

## ✨ Funcionalidades

### 🏠 **Seções da Landing Page:**
- ✅ **Hero Section** - Apresentação principal com CTA
- ✅ **Plantas Disponíveis** - Carrossel interativo MCMV
- ✅ **Galeria de Imagens** - Fotos do empreendimento
- ✅ **Comodidades** - Amenities e diferenciais
- ✅ **Localização** - Mapa e pontos de interesse
- ✅ **Depoimentos** - Testimonials rotativos
- ✅ **Múltiplos Formulários** - Captação em pontos estratégicos
- ✅ **Footer Completo** - Informações e contatos

### 🔧 **Funcionalidades Técnicas:**
- ✅ **Formulários Inteligentes** - Validação e envio automático
- ✅ **WhatsApp Integration** - Botão flutuante com tracking
- ✅ **Facebook Pixel** - Eventos de conversão configurados
- ✅ **RD Station CRM** - API de leads integrada
- ✅ **SEO Otimizado** - Meta tags e Open Graph
- ✅ **Performance** - Imagens otimizadas e lazy loading
- ✅ **Mobile First** - Experiência perfeita em todos os dispositivos

## 🛠️ Tecnologias

### **Frontend:**
- **Next.js 14.2.32** - Framework React com SSG/SSR
- **TypeScript** - Tipagem estática e segurança
- **Tailwind CSS** - Styling utility-first moderno
- **Lucide React** - Ícones vetoriais otimizados

### **Integrações:**
- **Facebook Pixel** - Tracking de conversões
- **RD Station API** - CRM e automação de marketing
- **WhatsApp Business API** - Comunicação direta

### **Deploy & Performance:**
- **Vercel/Netlify Ready** - Deploy otimizado
- **Image Optimization** - Next.js automatic
- **Bundle Size** - ~104kB (otimizado)
- **TypeScript Strict** - Zero erros de compilação

## 🚀 Deploy e Produção

### **Configuração Rápida:**

1. **Clone e Instale:**
```bash
git clone [repo-url]
cd elev-landing-page
npm install
```

2. **Configure Variáveis de Ambiente:**
```bash
# Copie e configure
cp .env.example .env.local

# Adicione seus tokens reais
RD_STATION_TOKEN=seu_token_real
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093
```

3. **Build e Deploy:**
```bash
npm run build
npm start
# ou deploy para Vercel/Netlify
```

### **Checklist de Deploy:**
- ✅ Variáveis de ambiente configuradas
- ✅ Facebook Pixel ID correto
- ✅ RD Station token válido
- ✅ Número WhatsApp atualizado
- ✅ URLs de produção configuradas
- ✅ SSL/HTTPS ativo
- ✅ Google Analytics (opcional)

## 📱 Integrações

### **RD Station CRM:**
- **Status:** ✅ **Integrado e Funcional**
- **Endpoint:** `/api/rdstation-lead`
- **Campos:** Email, Nome, Telefone, Interesse
- **Tags:** Automáticas (lead, elev-sacoma, landing-page)

### **Facebook Pixel:**
- **Status:** ✅ **Integrado e Funcional**
- **ID:** `669854672792093`
- **Eventos:** PageView, Lead, Contact, ViewContent
- **Custom Events:** Form_Submit, WhatsApp_Click, Floor_Plans_View

### **WhatsApp Business:**
- **Número:** `+55 11 96022-5753`
- **Botão Flutuante:** Sempre visível
- **Tracking:** Facebook Pixel integrado
- **Mensagens:** Personalizadas por contexto

## 📁 Estrutura do Projeto

```
elev-landing-page/
├── 📁 components/           # Componentes React
│   ├── FacebookPixel.tsx    # Integração Facebook Pixel
│   └── ImageManager.tsx     # Gerenciamento de imagens
├── 📁 pages/               # Páginas Next.js
│   ├── api/                # API Routes
│   │   └── rdstation-lead.ts # Integração RD Station
│   ├── _app.tsx            # App wrapper
│   └── index.tsx           # Página principal
├── 📁 public/              # Assets estáticos
│   └── images/             # Imagens otimizadas (25+ assets)
├── 📁 styles/              # Estilos globais
│   └── globals.css         # Tailwind + customizações
├── 📁 docs/                # 📖 Documentação completa
├── .env.example            # Template de variáveis
├── .env.local              # Configuração local (gitignored)
└── elev_sacoma_landing.tsx # Componente principal
```

## ⚙️ Configuração

### **Variáveis de Ambiente Obrigatórias:**

```bash
# RD Station CRM
RD_STATION_TOKEN=seu_token_rdstation
RD_STATION_IDENTIFIER=elev-sacoma-landing

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093
```

### **Configurações Opcionais:**

```bash
# Google Analytics (futuro)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Ambiente
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://elevparksacoma.com.br
```

## 📖 Documentação

> **Documentação completa disponível na pasta [`docs/`](./docs/)**

### **Guias Principais:**
- 📊 [`FACEBOOK-PIXEL-CONFIG.md`](./docs/FACEBOOK-PIXEL-CONFIG.md) - Configuração Facebook Pixel
- 🎯 [`RDSTATION-CONFIG.md`](./docs/RDSTATION-CONFIG.md) - Integração RD Station CRM
- 🚀 [`CHECKLIST-DEPLOY.md`](./docs/CHECKLIST-DEPLOY.md) - Lista completa para deploy
- 📱 [`CORRECAO-WHATSAPP.md`](./docs/CORRECAO-WHATSAPP.md) - Configuração WhatsApp

### **Histórico do Projeto:**
- 🖼️ [`IMPLEMENTACAO-IMAGENS.md`](./docs/IMPLEMENTACAO-IMAGENS.md) - Sistema de imagens
- 📋 [`RESUMO-IMPLEMENTACAO.md`](./docs/RESUMO-IMPLEMENTACAO.md) - Resumo completo
- ⚡ [`STATUS-FUNCIONALIDADE.md`](./docs/STATUS-FUNCIONALIDADE.md) - Status atual
- 📁 [`PROJETO-ORGANIZADO.md`](./docs/PROJETO-ORGANIZADO.md) - Organização do projeto

---

## 🚀 **Status do Projeto**

### **✅ PRONTO PARA PRODUÇÃO**

| Funcionalidade | Status | Descrição |
|----------------|--------|-----------|
| 🏠 Landing Page | ✅ **Completa** | 8 seções responsivas |
| 📝 Formulários | ✅ **Funcionando** | Múltiplos pontos de conversão |
| 🎯 RD Station | ✅ **Integrado** | API de leads configurada |
| 📊 Facebook Pixel | ✅ **Ativo** | Tracking completo implementado |
| 📱 WhatsApp | ✅ **Operacional** | Botão flutuante com tracking |
| 🖼️ Imagens | ✅ **Otimizadas** | 25+ assets implementados |
| 📱 Mobile | ✅ **Responsivo** | Design mobile-first |
| ⚡ Performance | ✅ **Otimizada** | Build ~104kB |

### **📈 Métricas de Performance:**
- **Bundle Size:** 104kB (otimizado)
- **Build Time:** ~15s
- **TypeScript:** 0 erros
- **Lighthouse:** 95+ (estimado)

---

**🎯 Desenvolvido para maximizar conversões e automatizar o processo de captação de leads imobiliários.**

**📞 Suporte:** Entre em contato para dúvidas ou customizações adicionais.
