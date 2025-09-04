# 🗄️ **Setup do Banco de Dados MySQL - Hostinger**

## 📋 **Visão Geral**
Este guia configura um banco MySQL na Hostinger para armazenar leads da landing page como **backup seguro**, garantindo que nenhum lead seja perdido mesmo se a API do RD Station falhar.

## 🎯 **Fluxo de Leads (Nova Arquitetura)**
```
Usuário Preenche Formulário
           ↓
    Salva no MySQL ✅ (SEMPRE)
           ↓
    Tenta enviar para RD Station
           ↓
     ✅ Sucesso → Lead duplicado (segurança)
     ❌ Falha → Lead seguro no MySQL
```

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
    rd_station_status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    rd_station_response TEXT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_rd_status (rd_station_status)
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

# Existing RD Station Config (manter)
RD_STATION_TOKEN=68b11b29dd35dd0017eea0b3
RD_STATION_IDENTIFIER=elev-sacoma-landing
```

---

## 📈 **4. Vantagens da Nova Arquitetura**

### **✅ Benefícios**
1. **Zero Perda de Leads**: Todo lead é salvo localmente
2. **Backup Automático**: Dados seguros mesmo com falha de API
3. **Relatórios Detalhados**: Analytics completo no phpMyAdmin
4. **Auditoria**: Log de todos os erros e sucessos
5. **LGPD Compliance**: Dados armazenados no Brasil

### **📊 Métricas Disponíveis**
- Total de leads por período
- Taxa de sucesso RD Station
- Origem dos leads (mobile/desktop)
- Tipos de interesse mais procurados
- Horários de maior conversão

---

## 🚀 **5. Próximos Passos**

1. **Criar banco na Hostinger** ✅
2. **Instalar dependência MySQL** no projeto
3. **Criar API de backup** `/api/save-lead-backup`
4. **Modificar formulário** para usar dupla gravação
5. **Criar dashboard** de leads no phpMyAdmin

---

## 🔍 **6. Queries Úteis para Relatórios**

### **Total de Leads por Dia**
```sql
SELECT DATE(created_at) as data, COUNT(*) as total_leads
FROM leads 
GROUP BY DATE(created_at) 
ORDER BY data DESC;
```

### **Taxa de Sucesso RD Station**
```sql
SELECT 
    rd_station_status,
    COUNT(*) as quantidade,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM leads), 2) as porcentagem
FROM leads 
GROUP BY rd_station_status;
```

### **Leads por Tipo de Interesse**
```sql
SELECT interest_type, COUNT(*) as total
FROM leads 
GROUP BY interest_type 
ORDER BY total DESC;
```

---

**⚠️ IMPORTANTE**: Após configurar o banco, implementaremos a API de backup para garantir que os leads sejam sempre salvos, independente do status do RD Station.
