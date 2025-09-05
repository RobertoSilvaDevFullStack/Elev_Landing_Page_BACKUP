# 🚀 Sistema PHP para Hostinger - ELEV Sacoma II

## 📁 Estrutura dos Arquivos PHP

```
hostinger-php/
├── config.php              # Configurações principais (DB, CORS, utils)
└── api/
    ├── lead-backup.php      # API principal de captura de leads
    ├── dashboard.php        # API do dashboard administrativo  
    ├── email-service.php    # Sistema de envio de emails
    └── test-email.php       # Teste do sistema de email
```

## 🎯 APIs Implementadas

### 1. **lead-backup.php** 
- **Função**: Captura e salva leads do React no MySQL
- **Método**: `POST`
- **Equivalente**: `pages/api/lead-backup.ts`
- **Recursos**:
  - ✅ Validação completa dos dados
  - ✅ Salvamento no MySQL com auditoria (IP, User-Agent)
  - ✅ Envio automático de email de notificação
  - ✅ Log de erros detalhado
  - ✅ Respostas JSON compatíveis com React

### 2. **dashboard.php**
- **Função**: Dashboard administrativo para visualizar leads
- **Métodos**: `GET`, `DELETE`
- **Equivalente**: `pages/api/leads-dashboard.ts`
- **Recursos**:
  - ✅ Listagem paginada de leads
  - ✅ Busca por nome, email ou telefone
  - ✅ Estatísticas detalhadas (hoje, semana, mês)
  - ✅ Análise por interesse e fonte
  - ✅ Exclusão de leads por ID

### 3. **email-service.php**
- **Função**: Sistema de envio de emails
- **Equivalente**: `lib/emailService.ts`
- **Recursos**:
  - ✅ Template HTML responsivo
  - ✅ Múltiplos destinatários
  - ✅ Headers MIME adequados
  - ✅ Função de teste incluída

### 4. **test-email.php**
- **Função**: Teste do sistema de email
- **Método**: `POST`
- **Equivalente**: `pages/api/test-email.ts`
- **Recursos**:
  - ✅ Lead de teste automático
  - ✅ Validação completa do fluxo
  - ✅ Relatório detalhado do resultado

## ⚙️ Configurações (config.php)

### Banco de Dados MySQL
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u787187912_elev_leads_db');
define('DB_USER', 'u787187912_elev_leads');
define('DB_PASS', 'ElevLeads@2024');
```

### Email SMTP
```php
define('EMAIL_FROM', 'nao-responder@elevlive.com.br');
define('NOTIFICATION_EMAILS', [
    'comercial@elevlive.com.br',
    'vendas@elevlive.com.br'
]);
```

### Segurança
- ✅ Headers CORS configurados
- ✅ Content-Security-Policy
- ✅ Sanitização automática de dados
- ✅ Validação JSON rigorosa
- ✅ Log de segurança

## 🔄 Integração com React

### Mudanças Necessárias no Frontend

#### 1. **Atualizar URLs das APIs**
```javascript
// Antes (TypeScript)
const response = await fetch('/api/lead-backup', { ... });

// Depois (PHP)
const response = await fetch('/hostinger-php/api/lead-backup.php', { ... });
```

#### 2. **URLs das APIs PHP**
```javascript
// Lead capture
POST /hostinger-php/api/lead-backup.php

// Dashboard
GET /hostinger-php/api/dashboard.php?page=1&limit=50
GET /hostinger-php/api/dashboard.php?action=stats
DELETE /hostinger-php/api/dashboard.php?id=123

// Test email
POST /hostinger-php/api/test-email.php
```

## 🚀 Deploy no Hostinger

### 1. **Upload dos Arquivos**
```
public_html/
├── (arquivos React build)
└── hostinger-php/
    ├── config.php
    └── api/
        ├── lead-backup.php
        ├── dashboard.php
        ├── email-service.php
        └── test-email.php
```

### 2. **Configuração do .htaccess** (opcional)
```apache
# Para URLs mais limpas (opcional)
RewriteEngine On
RewriteRule ^api/(.*)$ hostinger-php/api/$1 [L]
```

### 3. **Permissões**
```bash
chmod 755 hostinger-php/
chmod 644 hostinger-php/*.php
chmod 644 hostinger-php/api/*.php
```

## 🧪 Testes

### Teste Rápido da API
```bash
# Teste de conectividade
curl -X POST https://elevlive.com.br/hostinger-php/api/test-email.php

# Teste de lead
curl -X POST https://elevlive.com.br/hostinger-php/api/lead-backup.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com"}'
```

### Validação no Dashboard
```javascript
// Verificar estatísticas
fetch('/hostinger-php/api/dashboard.php?action=stats')
  .then(r => r.json())
  .then(data => console.log(data));
```

## 📊 Compatibilidade

| Recurso | TypeScript | PHP | Status |
|---------|------------|-----|---------|
| Captura de leads | ✅ | ✅ | Equivalente |
| Salvamento MySQL | ✅ | ✅ | Equivalente |
| Email notifications | ✅ | ✅ | Equivalente |
| Dashboard admin | ✅ | ✅ | Equivalente |
| Logs de erro | ✅ | ✅ | Equivalente |
| Validação dados | ✅ | ✅ | Equivalente |
| CORS headers | ✅ | ✅ | Equivalente |

## 🔧 Manutenção

### Logs
- Arquivos de log são salvos automaticamente
- Use `tail -f logs/app.log` para monitoramento
- Logs incluem timestamp e nível de severidade

### Backup
- Database backup automático diário
- Logs de backup em `logs/backup.log`
- Retenção de 30 dias

## 🎯 Próximos Passos

1. ✅ **APIs PHP criadas e funcionais**
2. 🔄 **Atualizar URLs no React** (próximo passo)
3. 🚀 **Deploy e teste no Hostinger**
4. 📧 **Validar sistema de email**
5. 📊 **Testar dashboard administrativo**

---

**Sistema desenvolvido para manter 100% de compatibilidade com o frontend React existente.**
