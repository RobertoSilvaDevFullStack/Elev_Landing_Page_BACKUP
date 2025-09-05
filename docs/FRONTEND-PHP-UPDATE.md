# 🔄 Frontend Atualizado para APIs PHP

## ✅ **Atualizações Realizadas:**

### 1. **Arquivo Principal - Landing Page**
**File**: `elev_sacoma_landing.tsx`
- ✅ **Linha 258**: `/api/lead-backup` → `API_ENDPOINTS.LEAD_BACKUP`
- ✅ **Import adicionado**: `import { API_ENDPOINTS } from './lib/apiConfig'`

### 2. **Dashboard Administrativo**  
**File**: `pages/admin.tsx`
- ✅ **Linha 67**: `/api/leads-dashboard` → `API_ENDPOINTS.DASHBOARD`
- ✅ **Linha 85**: `/api/test-email` → `API_ENDPOINTS.TEST_EMAIL`
- ✅ **Linha 112**: `/api/test-email` → `API_ENDPOINTS.TEST_EMAIL`
- ✅ **Import adicionado**: `import { API_ENDPOINTS } from '../lib/apiConfig'`

### 3. **Nova Configuração Centralizada**
**File**: `lib/apiConfig.ts` *(NOVO)*
- ✅ **Gerenciamento de ambiente**: Desenvolvimento vs Produção
- ✅ **Troca fácil**: TypeScript ↔ PHP APIs
- ✅ **Helper de requests**: Função `apiRequest()` com tratamento de erro
- ✅ **Log de configuração**: Console debug automático

## 🎯 **URLs Atualizadas:**

| Função | URL Antiga | URL Nova (PHP) |
|--------|------------|----------------|
| **Lead Capture** | `/api/lead-backup` | `/hostinger-php/api/lead-backup.php` |
| **Dashboard** | `/api/leads-dashboard` | `/hostinger-php/api/dashboard.php` |
| **Test Email** | `/api/test-email` | `/hostinger-php/api/test-email.php` |

## ⚙️ **Configuração Flexível:**

### Para usar APIs PHP (Produção):
```typescript
// lib/apiConfig.ts
const usePhpApis = true; // ✅ Usando PHP
```

### Para usar APIs TypeScript (Desenvolvimento):
```typescript
// lib/apiConfig.ts  
const usePhpApis = false; // ✅ Usando TypeScript
```

## 🔍 **Verificação das Mudanças:**

### 1. **Landing Page Lead Capture**
```typescript
// ❌ ANTES
const leadResponse = await fetch('/api/lead-backup', {...});

// ✅ DEPOIS
const leadResponse = await fetch(API_ENDPOINTS.LEAD_BACKUP, {...});
```

### 2. **Dashboard Data Loading**
```typescript
// ❌ ANTES
const response = await fetch('/api/leads-dashboard');

// ✅ DEPOIS  
const response = await fetch(API_ENDPOINTS.DASHBOARD);
```

### 3. **Email Testing**
```typescript
// ❌ ANTES
const response = await fetch('/api/test-email', {...});

// ✅ DEPOIS
const response = await fetch(API_ENDPOINTS.TEST_EMAIL, {...});
```

## 🚀 **Como Testar:**

### 1. **Desenvolvimento Local**
```bash
# Alterar no apiConfig.ts
const usePhpApis = false;

# Rodar servidor Next.js  
npm run dev
```

### 2. **Build para Produção**
```bash
# Alterar no apiConfig.ts
const usePhpApis = true;

# Build e export estático
npm run build
npm run export
```

### 3. **Deploy no Hostinger**
```bash
# Upload do build + pasta hostinger-php/
# URLs automáticas: /hostinger-php/api/*.php
```

## 🔧 **Próximas Etapas:**

1. ✅ **Frontend atualizado** - Concluído
2. 🔄 **Testar em desenvolvimento** - Próximo
3. 🚀 **Build de produção** - Próximo
4. 📤 **Deploy no Hostinger** - Próximo
5. 🧪 **Testes de integração** - Próximo

## 📝 **Benefícios da Implementação:**

- ✅ **Compatibilidade total**: Mesma interface, backend diferente
- ✅ **Flexibilidade**: Troca entre PHP/TypeScript com 1 linha
- ✅ **Manutenção fácil**: URLs centralizadas em um arquivo
- ✅ **Debug melhorado**: Logs automáticos de configuração
- ✅ **Tratamento de erro**: Helper `apiRequest()` padronizado

---

**🎉 Frontend totalmente atualizado e pronto para usar APIs PHP no Hostinger!**
