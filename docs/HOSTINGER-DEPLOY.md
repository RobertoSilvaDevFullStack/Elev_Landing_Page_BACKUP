# Deploy no Hostinger - ELEV Park Sacomã II

## ✅ Sim, você pode enviar o projeto para a Hostinger!

### Verificação de Compatibilidade
- ✅ **Next.js 14.2.32**: Totalmente compatível com Hostinger
- ✅ **Node.js Runtime**: Suportado nos planos Premium/Business
- ✅ **Build Otimizado**: 104kB - tamanho excelente para hosting

---

## 🎯 Opções de Deploy no Hostinger

### **Opção 1: Deploy Estático (Recomendado para Landing Pages)**
**Melhor para**: Landing pages simples, carregamento ultra-rápido
**Planos compatíveis**: Todos (inclusive Shared Hosting)

#### Configuração:
1. **Modifique o `next.config.js`** (adicione as linhas comentadas):
```javascript
const nextConfig = {
  // ... configurações existentes ...
  
  // Configuração para export estático
  trailingSlash: true,
  output: 'export',
  
  // Desabilitar recursos que precisam de servidor
  images: {
    unoptimized: true, // Necessário para export estático
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
};
```

2. **Gere o build estático**:
```bash
npm run build
```

3. **Upload do conteúdo da pasta `out/`** para o Hostinger

### **Opção 2: Deploy Node.js (Funcionalidade Completa)**
**Melhor para**: Funcionalidades completas (API RD Station)
**Planos compatíveis**: Premium, Business (Node.js hosting)

---

## 📋 Passo a Passo - Deploy Estático (RECOMENDADO)

### **1. Preparação do Projeto**
```bash
# Instalar dependências
npm install

# Verificar se está tudo funcionando
npm run dev
```

### **2. Configurar para Export Estático**
- Edite o `next.config.js` (adicione `output: 'export'` e `trailingSlash: true`)
- Edite a configuração de imagens (adicione `unoptimized: true`)

### **3. Configurar Variáveis de Ambiente**
Crie `.env.production`:
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093
NEXT_PUBLIC_RDSTATION_TOKEN=68b11b29dd35dd0017eea0b3
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

### **4. Gerar Build Estático**
```bash
npm run build
```
Isso criará uma pasta `out/` com todos os arquivos estáticos.

### **5. Upload para Hostinger**

#### **Via File Manager (Hostinger)**:
1. Acesse o **hPanel** da Hostinger
2. Vá em **File Manager**
3. Navegue até `public_html/`
4. **Delete** todos os arquivos existentes
5. **Upload** todo o conteúdo da pasta `out/`
6. Certifique-se que `index.html` está na raiz de `public_html/`

#### **Via FTP**:
1. Use as credenciais FTP do Hostinger
2. Conecte na pasta `public_html/`
3. Upload todo o conteúdo de `out/`

---

## 📋 Passo a Passo - Deploy Node.js (FUNCIONALIDADE COMPLETA)

### **1. Verificar Plano Hostinger**
- **Necessário**: Premium ou Business (suporte Node.js)
- **Verificar**: Node.js está habilitado no hPanel

### **2. Preparar Arquivos para Upload**
```bash
# Fazer build de produção
npm run build

# Criar arquivo de configuração para Node.js
```

### **3. Criar `package.json` otimizado**:
```json
{
  "name": "elev-sacoma-landing",
  "version": "1.0.0",
  "scripts": {
    "start": "next start",
    "build": "next build"
  },
  "dependencies": {
    "next": "14.2.32",
    "react": "^18",
    "react-dom": "^18"
  }
}
```

### **4. Upload Completo**
- Upload de **TODOS** os arquivos do projeto
- Configurar Node.js no hPanel
- Definir arquivo de entrada: `server.js` ou usar `npm start`

---

## ⚙️ Configurações de Produção

### **Variáveis de Ambiente (Importante!)**
No Hostinger, configure:
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093
NEXT_PUBLIC_RDSTATION_TOKEN=68b11b29dd35dd0017eea0b3
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NODE_ENV=production
```

### **Domínio Personalizado**
1. No hPanel, vá em **Domínios**
2. Adicione seu domínio personalizado
3. Configure DNS (se necessário)
4. Aguarde propagação (até 24h)

---

## 🔧 Troubleshooting

### **Problema: Página não carrega**
- ✅ Verificar se `index.html` está em `public_html/`
- ✅ Verificar permissões de arquivo (644 para arquivos, 755 para pastas)

### **Problema: Imagens não aparecem**
- ✅ Verificar se pasta `images/` foi uploaded
- ✅ Verificar paths das imagens (case-sensitive no Linux)

### **Problema: Facebook Pixel não funciona**
- ✅ Verificar variáveis de ambiente
- ✅ Testar com Facebook Pixel Helper (extensão Chrome)

### **Problema: Formulário RD Station não funciona**
- ✅ Para deploy estático: Formulário redirecionará para WhatsApp
- ✅ Para deploy Node.js: Verificar API endpoint `/api/rdstation-lead`

---

## 📊 Performance Esperada

### **Deploy Estático**:
- ⚡ **Carregamento**: < 2 segundos
- 🎯 **Core Web Vitals**: Excelente
- 💰 **Custo**: Menor (qualquer plano)

### **Deploy Node.js**:
- ⚡ **Carregamento**: < 3 segundos
- 🔄 **Funcionalidades**: Completas (RD Station API)
- 💰 **Custo**: Maior (Premium/Business)

---

## 🚀 Recomendação Final

**Para Landing Page ELEV Park Sacomã II**: Use **Deploy Estático**
- ✅ Performance máxima
- ✅ Compatível com qualquer plano Hostinger
- ✅ Custo menor
- ✅ Facebook Pixel funciona perfeitamente
- ⚠️ RD Station via redirecionamento (ainda funciona!)

Quer que eu prepare os arquivos específicos para o deploy estático?
