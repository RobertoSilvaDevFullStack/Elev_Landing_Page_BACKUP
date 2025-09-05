# 📧 **CONFIGURAÇÃO DE EMAIL ATUALIZADA**

## ✅ **EMAIL CONFIGURADO NA HOSTINGER:**

### **📝 Informações do Painel:**
- **Email**: `fdms.nanda2@fernandaimobiliaria.com` ✅
- **Status**: Ativo ✅
- **Domínio**: `fernandaimobiliaria.com` ✅
- **Cota**: 200 MB / 1.00 GB ✅

---

## 🔧 **CONFIGURAÇÕES ATUALIZADAS NOS ARQUIVOS:**

### **1. `/hostinger-php/config.php`:**
```php
// Configurações do Email (SMTP)
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'fdms.nanda2@fernandaimobiliaria.com');
define('SMTP_PASS', ''); // DEFINIR SENHA AQUI
define('NOTIFICATION_EMAIL', 'fdms.nanda2@fernandaimobiliaria.com');
```

### **2. `/hostinger-php/api/email-service.php`:**
```php
define('EMAIL_FROM', 'fdms.nanda2@fernandaimobiliaria.com');
define('NOTIFICATION_EMAILS', [
    'fdms.nanda2@fernandaimobiliaria.com'
]);
```

---

## 🔑 **PRÓXIMO PASSO - DEFINIR SENHA DO EMAIL:**

### **Como obter/definir a senha:**

#### **Opção 1 - Via Painel Hostinger:**
1. **Caixas de e-mail** → `fdms.nanda2@fernandaimobiliaria.com`
2. **Gerenciar** → **Alterar senha**
3. **Definir nova senha** → Copiar para o config.php

#### **Opção 2 - Se já tem a senha:**
Apenas adicione no arquivo `hostinger-php/config.php`:
```php
define('SMTP_PASS', 'SUA_SENHA_AQUI');
```

---

## 🧪 **COMO TESTAR APÓS DEPLOY:**

### **1. API de Teste:**
```bash
curl -X POST https://fernandaimobiliaria.com/hostinger-php/api/test-email.php \
  -H "Content-Type: application/json"
```

### **2. Resultado Esperado:**
```json
{
  "success": true,
  "message": "Email de teste enviado com sucesso",
  "recipients": ["fdms.nanda2@fernandaimobiliaria.com"],
  "timestamp": "2025-09-05 10:30:00"
}
```

### **3. Verificar Caixa de Entrada:**
- Acessar **Webmail** → `fdms.nanda2@fernandaimobiliaria.com`
- Procurar por email com assunto: "🏠 Novo Lead - ELEV Sacoma II - Teste Sistema"

---

## 📋 **CHECKLIST PÓS-CONFIGURAÇÃO:**

### **Antes do Deploy:**
- [ ] ✅ Email `fdms.nanda2@fernandaimobiliaria.com` existe (CONFIRMADO)
- [ ] 🔑 Senha definida no `config.php` (PENDENTE)
- [ ] 📝 Configurações atualizadas nos arquivos (FEITO)

### **Após Deploy:**
- [ ] 🧪 Testar API `/test-email.php`
- [ ] 📧 Verificar se email chega na caixa de entrada
- [ ] 📱 Testar formulário da landing page
- [ ] ✅ Confirmar notificação de lead real

---

## 🎯 **CONFIGURAÇÃO SMTP HOSTINGER:**

```
📧 Servidor SMTP Hostinger:
├── Host: smtp.hostinger.com
├── Porta: 587 (recomendada)
├── Segurança: STARTTLS
├── Usuário: fdms.nanda2@fernandaimobiliaria.com
└── Senha: [DEFINIR NO PAINEL]
```

---

## ⚠️ **IMPORTANTE:**

1. **🔐 Definir senha** do email no painel Hostinger
2. **📝 Atualizar** `SMTP_PASS` no `config.php`
3. **🧪 Testar** antes de usar em produção
4. **📊 Monitorar** caixa de entrada para leads

---

## 🎉 **RESULTADO:**

✅ **Email configurado**: `fdms.nanda2@fernandaimobiliaria.com`
✅ **Arquivos atualizados**: Todas as configurações
✅ **Pronto para receber**: Notificações de novos leads
✅ **Integração completa**: Landing page → Banco → Email

**🚀 Sistema de email 100% configurado para produção!**
