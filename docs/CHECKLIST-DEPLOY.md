# ✅ Checklist de Deploy - ELEV Park Sacomã II

> **Lista de verificação completa antes do deploy em produção**

## 🔍 **Pré-Deploy - Verificações Essenciais**

### **📋 Código e Build**
- ✅ **Build sem erros**: `npm run build` executado com sucesso
- ✅ **TypeScript limpo**: Zero erros de compilação
- ✅ **ESLint**: Código validado sem warnings críticos
- ✅ **Arquivos organizados**: Documentação em `docs/`
- ✅ **Arquivos redundantes removidos**: `.venv/`, `globals_backup.css`, `test-rdstation.js`

### **🌐 Variáveis de Ambiente**
- ✅ **Facebook Pixel ID**: `669854672792093` configurado
- ✅ **RD Station Token**: `68b11b29dd35dd0017eea0b3` configurado
- ⚠️ **Arquivo .env.local**: NÃO incluir no Git (já no .gitignore)
- ✅ **Arquivo .env.example**: Template atualizado

### **📱 Integrações**
- ✅ **Facebook Pixel**: Código integrado e testado
- ✅ **RD Station API**: Endpoint `/api/rdstation-lead` funcionando
- ✅ **WhatsApp**: Número `+55 11 96022-5753` configurado
- ✅ **Tracking Events**: PageView, Lead, Contact implementados

## 🚀 **Deploy - Configurações por Plataforma**

### **Vercel (Recomendado)**
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Configurar variáveis de ambiente no dashboard:
# - RD_STATION_TOKEN
# - NEXT_PUBLIC_FACEBOOK_PIXEL_ID
```

### **Netlify**
```bash
# 1. Build
npm run build

# 2. Deploy via CLI ou drag & drop
# 3. Configurar variáveis no dashboard
```

### **Hostinger/cPanel**
```bash
# 1. Build estático
npm run build && npm run export

# 2. Upload da pasta 'out/'
# 3. Configurar redirecionamentos
```

## ⚙️ **Configurações de Produção**

### **Variáveis de Ambiente (Obrigatórias)**
```bash
# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093

# RD Station
RD_STATION_TOKEN=68b11b29dd35dd0017eea0b3
RD_STATION_IDENTIFIER=elev-sacoma-landing

# Opcional - Ambiente
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://elevparksacoma.com.br
```

### **DNS e Domínio**
- ⏳ **Domínio configurado**: `elevparksacoma.com.br`
- ⏳ **SSL/HTTPS ativo**
- ⏳ **WWW redirecionamento** configurado
- ⏳ **CDN** configurado (se necessário)

## 🧪 **Testes Pós-Deploy**

### **Funcionalidades Críticas**
- ⏳ **Carregamento da página**: < 3 segundos
- ⏳ **Formulários funcionando**: Envio para RD Station
- ⏳ **WhatsApp**: Botão flutuante operacional
- ⏳ **Responsividade**: Mobile, tablet, desktop
- ⏳ **Facebook Pixel**: Eventos sendo disparados

### **Ferramentas de Teste**
- **Facebook Pixel Helper**: Extensão Chrome
- **RD Station Dashboard**: Verificar leads recebidos
- **PageSpeed Insights**: Performance
- **Mobile-Friendly Test**: Google
- **SSL Labs**: Verificar certificado

## 📊 **Monitoramento**

### **Facebook Pixel**
- Acessar Meta Events Manager
- Verificar eventos em tempo real
- Configurar públicos customizados

### **RD Station**
- Monitorar leads em "Leads > Todos os Leads"
- Filtrar por fonte: "Landing Page ELEV Sacomã"
- Configurar automações de follow-up

### **Analytics (Opcional)**
- Google Analytics 4
- Google Search Console
- Hotjar/Microsoft Clarity

## 🔒 **Segurança**

### **Headers de Segurança**
- ✅ **HTTPS Redirect**: Automático
- ✅ **X-Frame-Options**: Configurado
- ✅ **CSP**: Content Security Policy
- ✅ **HSTS**: HTTP Strict Transport Security

### **Dados Sensíveis**
- ✅ **Tokens**: Apenas server-side
- ✅ **API Keys**: Em variáveis de ambiente
- ✅ **Logs**: Sem dados sensíveis expostos

## 📈 **SEO e Performance**

### **Meta Tags**
- ✅ **Title otimizado**: "ELEV Park Sacomã II - Apartamentos MCMV"
- ✅ **Description**: 160 caracteres otimizados
- ✅ **Open Graph**: Facebook/WhatsApp
- ✅ **Twitter Cards**: Compartilhamento social

### **Performance**
- ✅ **Images**: Lazy loading ativo
- ✅ **Bundle Size**: ~104kB otimizado
- ✅ **Core Web Vitals**: LCP, FID, CLS
- ✅ **Compression**: Gzip/Brotli

## 📞 **Contatos e Suporte**

### **Números de Emergência**
- **WhatsApp Principal**: +55 11 96022-5753
- **Suporte Técnico**: Definir contato
- **RD Station**: Support via plataforma

### **Documentação de Apoio**
- **Facebook Pixel**: [`docs/FACEBOOK-PIXEL-CONFIG.md`](./FACEBOOK-PIXEL-CONFIG.md)
- **RD Station**: [`docs/RDSTATION-CONFIG.md`](./RDSTATION-CONFIG.md)
- **Correções**: [`docs/CORRECAO-WHATSAPP.md`](./CORRECAO-WHATSAPP.md)

## 🎯 **Checklist Final**

**Antes de ir ao ar:**
- [ ] Build executado sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio e SSL ativos
- [ ] Testes de formulário realizados
- [ ] Facebook Pixel validado
- [ ] RD Station recebendo leads
- [ ] WhatsApp operacional
- [ ] Performance validada
- [ ] Backup do código realizado

**Após deploy:**
- [ ] Monitoramento ativo por 24h
- [ ] Primeiros leads validados
- [ ] Métricas de performance coletadas
- [ ] Equipe de vendas informada
- [ ] Documentação atualizada

---

## 🚀 **STATUS: PRONTO PARA DEPLOY**

✅ **Todas as verificações técnicas aprovadas**  
✅ **Integrações funcionando**  
✅ **Documentação completa**  
✅ **Código otimizado**

**Próxima ação**: Configurar ambiente de produção e realizar deploy!
