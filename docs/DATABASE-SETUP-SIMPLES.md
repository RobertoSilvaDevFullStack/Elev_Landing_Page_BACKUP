# 🗄️ **Setup do Banco de Dados MySQL - Versão Simplificada**

## 📋 **Visão Geral**
Este guia configura um banco MySQL na Hostinger para armazenar leads da landing page diretamente no banco de dados, sem integrações externas.

## 🎯 **Fluxo Simplificado**
```
Formulário → MySQL (Salvamento direto)
```

**RESULTADO**: **Sistema simples e confiável**

---

## 🛠️ **1. Criar Banco MySQL na Hostinger**

### **1.1. Acesse o Painel Hostinger**
- Login no painel da Hostinger
- Vá para **"Bancos de Dados"** → **"Bancos de Dados MySQL"**

### **1.2. Criar Nova Base de Dados**
```
Nome do Banco: elev_leads_db
Username: elev_user
Senha: [GERAR SENHA FORTE]
```

### **1.3. Anotar Credenciais**
```
Host: localhost (ou IP específico da Hostinger)
Banco: elev_leads_db
Usuário: elev_user
Senha: [SUA_SENHA_GERADA]
Porta: 3306
```

---

## 📊 **2. Estrutura da Tabela de Leads**

### **2.1. Acessar phpMyAdmin**
- No painel Hostinger → **"phpMyAdmin"**
- Selecionar banco `elev_leads_db`

### **2.2. Executar SQL de Criação**
```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    interest_type VARCHAR(100) NOT NULL,
    source VARCHAR(100) DEFAULT 'Landing Page',
    campaign VARCHAR(100) DEFAULT 'ELEV Sacoma II',
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);
```

### **2.3. Criar Tabela de Log de Erros**
```sql
CREATE TABLE error_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NULL,
    error_type VARCHAR(100) NOT NULL,
    error_message TEXT NOT NULL,
    error_details JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
    INDEX idx_error_type (error_type),
    INDEX idx_created_at (created_at)
);
```

---

## 🔐 **3. Variáveis de Ambiente**

Adicionar no arquivo `.env.local`:
```bash
# MySQL Database Configuration
DB_HOST=localhost
DB_NAME=elev_leads_db
DB_USER=elev_user
DB_PASSWORD=[SUA_SENHA_AQUI]
DB_PORT=3306

# Facebook Pixel (manter)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093
```

---

## 📈 **4. Vantagens da Arquitetura Simplificada**

### **✅ Benefícios**
1. **Simplicidade**: Sistema direto, sem dependências externas
2. **Confiabilidade**: Não depende de APIs de terceiros
3. **Controle total**: Todos os dados no seu banco
4. **Relatórios**: Analytics completo no phpMyAdmin
5. **LGPD Compliance**: Dados armazenados no Brasil

### **📊 Métricas Disponíveis**
- Total de leads por período
- Origem dos leads (mobile/desktop)
- Tipos de interesse mais procurados
- Horários de maior conversão

---

## 🔍 **5. Queries Úteis para Relatórios**

### **Total de Leads por Dia**
```sql
SELECT DATE(created_at) as data, COUNT(*) as total_leads
FROM leads 
GROUP BY DATE(created_at) 
ORDER BY data DESC;
```

### **Leads por Tipo de Interesse**
```sql
SELECT interest_type, COUNT(*) as total
FROM leads 
GROUP BY interest_type 
ORDER BY total DESC;
```

### **Leads por Horário**
```sql
SELECT HOUR(created_at) as hora, COUNT(*) as total
FROM leads 
GROUP BY HOUR(created_at) 
ORDER BY hora;
```

---

## 🚀 **6. APIs Disponíveis**

### **Salvar Lead**
- **Endpoint**: `/api/lead-backup`
- **Método**: POST
- **Função**: Salva lead diretamente no MySQL

### **Dashboard**
- **Endpoint**: `/api/leads-dashboard`
- **Método**: GET
- **Função**: Retorna estatísticas e leads recentes

---

**⚡ Sistema simplificado e direto ao ponto: leads salvos com segurança no MySQL!**
