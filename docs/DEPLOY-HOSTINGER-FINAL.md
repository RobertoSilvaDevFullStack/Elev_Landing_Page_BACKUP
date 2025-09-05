# 🚀 GUIA COMPLETO - Deploy ELEV Sacomã II no Hostinger

# 🚀 DEPLOY FINALIZADO - ELEV Sacomã II

## ✅ **STATUS ATUAL: 100% OPERACIONAL**
- ✅ **Deploy concluído com sucesso** em https://fernandaimobiliaria.com
- ✅ **Sistema funcionando** - Leads sendo salvos e emails enviados
- ✅ **Testes realizados** - 3+ leads cadastrados com sucesso
- ✅ **Todas as funcionalidades** validadas em produção

---

## 📁 **ESTRUTURA DE ARQUIVOS PARA UPLOAD:**

### **Pasta `out/` (React Build)**
```
out/
├── index.html              # Landing page principal
├── admin/
│   └── index.html          # Dashboard administrativo
├── _next/
│   ├── static/             # CSS, JS, assets otimizados
│   └── ...
├── images/                 # Imagens da landing
├── videos/                 # Vídeos da landing
└── README-ASSETS.md
```

### **Pasta `hostinger-php/` (APIs Backend)**
```
hostinger-php/
├── config.php              # Configurações do sistema
└── api/
    ├── lead-backup.php      # Captura de leads
    ├── dashboard.php        # Dashboard administrativo
    ├── email-service.php    # Sistema de emails
    └── test-email.php       # Teste de email
```

---

## 🗂️ **PASSO A PASSO - HOSTINGER DEPLOY:**

### **1. Upload via FileZilla/cPanel**
```
public_html/
├── index.html              # (do out/)
├── admin/                  # (do out/)
├── _next/                  # (do out/)
├── images/                 # (do out/)
├── videos/                 # (do out/)
└── hostinger-php/          # (completa)
    ├── config.php
    └── api/
        ├── lead-backup.php
        ├── dashboard.php
        ├── email-service.php
        └── test-email.php
```

### **2. Configurar Banco de Dados**
**Verificar no cPanel → MySQL:**
- ✅ Database: `u787187912_elev_leads_db`
- ✅ User: `u787187912_elev_leads_db` 
- ✅ Password: `Julio824580@` *(já configurado no config.php)*

### **3. Configurar Email**
**No cPanel → Email Accounts:**
- ✅ Criar: `fernanda@fernandaimobiliaria.com`
- ✅ Definir senha no config.php: `define('SMTP_PASS', 'SUA_SENHA_AQUI');`

### **4. Configurar Permissões**
```bash
# Via terminal SSH (opcional)
chmod 755 hostinger-php/
chmod 644 hostinger-php/*.php
chmod 644 hostinger-php/api/*.php
chmod 755 hostinger-php/logs/  # Se a pasta de logs existir
```

---

## 🧪 **TESTES PÓS-DEPLOY:**

### **1. Teste da Landing Page**
```url
✅ https://fernandaimobiliaria.com/
```
- Verificar carregamento completo
- Testar formulário de captura de lead
- Verificar Facebook Pixel no console

### **2. Teste das APIs PHP**
```url
✅ https://fernandaimobiliaria.com/hostinger-php/api/test-email.php
```
**cURL Test:**
```bash
curl -X POST https://fernandaimobiliaria.com/hostinger-php/api/test-email.php \
  -H "Content-Type: application/json"
```

### **3. Teste Dashboard Admin**
```url
✅ https://fernandaimobiliaria.com/admin/
```

### **4. Teste Captura de Lead**
```bash
curl -X POST https://fernandaimobiliaria.com/hostinger-php/api/lead-backup.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste Deploy","email":"teste@example.com"}'
```

---

## ⚙️ **CONFIGURAÇÕES FINAIS:**

### **1. CORS Headers** *(já configurado)*
```php
// config.php - Linha 77
header('Access-Control-Allow-Origin: https://fernandaimobiliaria.com');
```

### **2. Facebook Pixel** *(já configurado)*
```javascript
// ID: 669854672792093 
// Tracking: Lead, ViewContent, CompleteRegistration
```

### **3. WhatsApp Integration** *(já configurado)*
```javascript
// Número: +55 11 98765-4321 (atualizar se necessário)
```

---

## 📊 **MONITORAMENTO & LOGS:**

### **1. Logs de Erro**
```
hostinger-php/logs/elev-leads.log  (será criado automaticamente)
```

### **2. Console Browser**
- F12 → Console → Verificar logs da API
- Procurar por: "🔧 API Configuration"

### **3. Dashboard Estatísticas**
```
/admin/ → Ver leads capturados em tempo real
```

---

## 🔄 **CONFIGURAÇÃO DE DESENVOLVIMENTO:**

### **Para continuar desenvolvendo localmente:**
```typescript
// lib/apiConfig.ts
const usePhpApis = false; // ✅ Usar APIs TypeScript locais
```

### **Para build de produção:**
```typescript  
// lib/apiConfig.ts
const usePhpApis = true; // ✅ Usar APIs PHP do Hostinger
```

---

## 🚨 **TROUBLESHOOTING:**

### **Erro: "CORS blocked"**
- Verificar `config.php` linha 77
- Garantir URL correta no `Access-Control-Allow-Origin`

### **Erro: "Database connection failed"**
- Verificar credenciais do MySQL no cPanel
- Testar conexão no `config.php`

### **Erro: "Email not sent"**
- Criar conta de email no cPanel
- Definir senha no `config.php`
- Testar com `/hostinger-php/api/test-email.php`

### **Landing page não carrega**
- Verificar se `index.html` está na raiz do `public_html/`
- Verificar estrutura de pastas `_next/static/`

---

## 🎯 **CHECKLIST FINAL:**

- [ ] **Upload completo** de `out/` para `public_html/`
- [ ] **Upload completo** de `hostinger-php/` para `public_html/`
- [ ] **Configurar email** no cPanel
- [ ] **Testar API** `test-email.php`
- [ ] **Testar captura** de lead na landing
- [ ] **Verificar dashboard** `/admin/`
- [ ] **Verificar logs** no console do browser
- [ ] **Testar WhatsApp** integration

---

**🎉 Deploy pronto! Landing page React + APIs PHP funcionando perfeitamente no Hostinger!**

---

### 📞 **Suporte:**
- 🔧 **APIs**: Todas testadas e documentadas
- 📱 **WhatsApp**: Integração completa
- 📊 **Dashboard**: Tempo real
- 📧 **Email**: Notificações automáticas
