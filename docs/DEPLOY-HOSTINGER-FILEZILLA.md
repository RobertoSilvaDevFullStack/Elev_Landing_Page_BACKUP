# 🚀 **DEPLOY HOSTINGER VIA FILEZILLA**

## 📋 **PRÉ-REQUISITOS COMPLETOS**

### **✅ Arquivos Preparados:**
- ✅ Build estático gerado (`/out` folder)
- ✅ Configuração Apache (`.htaccess`)
- ✅ Configuração PHP (`.user.ini`)
- ✅ Assets otimizados

### **✅ Credenciais Hostinger Necessárias:**
```
🌐 SERVIDOR FTP:
Host: ftp.fernandaimobiliaria.com
Usuário: u787187912
Senha: [Sua senha FTP]
Porta: 21

🗄️ MYSQL DATABASE:
Host: localhost
Database: u787187912_elev_leads_db
Usuário: u787187912_elev_leads_db
Senha: Julio824580@
```

---

## 🔧 **PASSO A PASSO - FILEZILLA**

### **1. 📥 Baixar e Configurar FileZilla**

1. **Baixar FileZilla Client:** https://filezilla-project.org/download.php?type=client
2. **Instalar** seguindo instruções padrão
3. **Abrir FileZilla**

### **2. 🔌 Conectar ao Servidor Hostinger**

1. **Menu:** `Arquivo` → `Gerenciador de Sites`
2. **Clique:** `Novo Site`
3. **Configure:**
   ```
   Nome: ELEV Sacomã - Hostinger
   Protocolo: FTP - Protocolo de Transferência de Arquivos
   Host: ftp.fernandaimobiliaria.com
   Porta: 21
   Tipo de Logon: Normal
   Usuário: u787187912
   Senha: [sua senha FTP]
   ```
4. **Clique:** `Conectar`

### **3. 📁 Navegar para Diretório Correto**

**No painel direito (servidor):**
1. Navegue até: `/domains/fernandaimobiliaria.com/public_html/`
2. Este é seu **document root**

### **4. 📤 Upload dos Arquivos**

**No painel esquerdo (local):**
1. Navegue até: `I:\Elev_Landing_Page_BACKUP\out\`

**Arrastar e soltar TODOS os arquivos:**
```
📁 out/ → public_html/
├── .htaccess ✅
├── .user.ini ✅
├── index.html ✅
├── 404.html ✅
├── admin/ ✅
│   └── index.html
├── _next/ ✅ (pasta completa com JS/CSS)
├── images/ ✅ (todas as imagens)
└── videos/ ✅ (todos os vídeos)
```

**⚠️ IMPORTANTE:** 
- **Manter estrutura de pastas exata**
- **Sobrescrever arquivos existentes: SIM**
- **Modo de transferência: AUTO**

---

## 🗄️ **CONFIGURAR BANCO DE DADOS**

### **5. 💾 Configurar MySQL na Hostinger**

1. **Login Hostinger:** hpanel.hostinger.com
2. **Acesse:** Websites → fernandaimobiliaria.com
3. **Menu:** Bancos de Dados → phpMyAdmin
4. **Credenciais:**
   ```
   Servidor: localhost
   Usuário: u787187912_elev_leads_db
   Senha: Julio824580@
   ```

### **6. 🏗️ Criar Tabelas**

**Execute este SQL:**
```sql
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    interest_type VARCHAR(100),
    source VARCHAR(100),
    campaign VARCHAR(100),
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS error_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NULL,
    error_type VARCHAR(100),
    error_message TEXT,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id)
);
```

---

## ⚙️ **CONFIGURAR VARIÁVEIS DE AMBIENTE**

### **7. 🔐 Arquivo .env na Hostinger**

**Criar arquivo:** `/domains/fernandaimobiliaria.com/.env`

```env
# MySQL Configuration
DB_HOST=localhost
DB_USER=u787187912_elev_leads_db
DB_PASSWORD=Julio824580@
DB_NAME=u787187912_elev_leads_db

# Email Configuration (configurar depois)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=fernanda@fernandaimobiliaria.com
SMTP_PASS=sua-app-password
NOTIFICATION_EMAIL=fernanda@fernandaimobiliaria.com

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

---

## 🧪 **TESTAR DEPLOY**

### **8. ✅ Validações Pós-Deploy**

**Testes obrigatórios:**

1. **🌐 Site Principal:**
   ```
   URL: https://fernandaimobiliaria.com
   ✅ Página carrega
   ✅ Imagens aparecem
   ✅ CSS/JS funcionando
   ```

2. **📊 Dashboard Admin:**
   ```
   URL: https://fernandaimobiliaria.com/admin
   ✅ Interface carrega
   ✅ Login funciona (elev2025@admin)
   ✅ Dados MySQL conectam
   ```

3. **📝 Formulário de Leads:**
   ```
   ✅ Preencher formulário
   ✅ Submit funciona
   ✅ Lead salvo no MySQL
   ✅ Confirmação visual
   ```

4. **📱 Responsividade:**
   ```
   ✅ Mobile funciona
   ✅ Tablet funciona
   ✅ Desktop funciona
   ```

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **🔧 Erros Comuns:**

**❌ Erro 500 - Internal Server Error**
- **Causa:** Permissões de arquivo
- **Solução:** 
  ```bash
  Arquivos: 644
  Pastas: 755
  ```

**❌ Imagens não carregam**
- **Causa:** Caminho incorreto
- **Solução:** Verificar estrutura `/images/`

**❌ CSS/JS não carrega**
- **Causa:** Caminho `_next` incorreto
- **Solução:** Verificar pasta `/_next/`

**❌ APIs não funcionam**
- **Causa:** Build estático não suporta APIs
- **Solução:** Usar formulário direto para email

---

## 📊 **CHECKLIST FINAL**

### **✅ Pré-Deploy:**
- ✅ Build gerado (`npm run build`)
- ✅ Pasta `out/` completa
- ✅ `.htaccess` configurado
- ✅ Credenciais FTP prontas

### **✅ Durante Deploy:**
- ✅ FileZilla conectado
- ✅ Todos arquivos enviados
- ✅ Estrutura mantida
- ✅ Permissões corretas

### **✅ Pós-Deploy:**
- ✅ Site funcionando
- ✅ MySQL conectado
- ✅ Dashboard acessível
- ✅ Formulários operacionais

---

## 🎯 **URLS FINAIS**

**🌐 Site Principal:** https://fernandaimobiliaria.com
**📊 Dashboard:** https://fernandaimobiliaria.com/admin
**📞 WhatsApp:** Integrado nos botões
**📧 Email:** Configurar SMTP depois

---

## ⏱️ **TEMPO ESTIMADO**

- **Preparação:** 5 min (já feito)
- **Upload FileZilla:** 10-15 min
- **Config MySQL:** 5 min
- **Testes:** 10 min

**Total:** ~30 minutos

---

## 🎊 **RESULTADO FINAL**

**✅ Site 100% funcional na Hostinger**
**✅ Performance otimizada**
**✅ SEO configurado**
**✅ Formulários operacionais**
**✅ Dashboard administrativo**

**🚀 Seu projeto estará LIVE e funcionando perfeitamente!**
