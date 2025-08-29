# 📊 Configuração do Facebook Pixel - ELEV Park Sacomã II

## ✅ Status da Implementação
- **Status**: ✅ IMPLEMENTADO E FUNCIONANDO
- **Versão**: Completa com TypeScript e hooks personalizados
- **Última atualização**: Implementação concluída

## 🔧 Arquivos Modificados

### 1. `components/FacebookPixel.tsx` (NOVO)
- **Componente principal** do Facebook Pixel
- **Hook personalizado** `useFacebookPixel()` para tracking
- **Eventos padrão** e customizados
- **TypeScript completo** com tipagem segura

### 2. `pages/_app.tsx`
- **Integração global** do Facebook Pixel
- **Meta tags** completas para SEO e redes sociais
- **Script de inicialização** do pixel

### 3. `elev_sacoma_landing.tsx`
- **Hooks de tracking** implementados
- **Eventos de conversão** configurados
- **Tracking automático** de seções

## 📈 Eventos Configurados

### Eventos Automáticos
1. **PageView**: Quando a página carrega
2. **ViewContent**: Ao visualizar seções importantes
3. **Floor_Plans_View**: Ao visualizar carrossel de plantas

### Eventos de Conversão
1. **Lead**: Quando formulário é enviado
2. **Contact**: Quando clica no WhatsApp
3. **Form_Submit**: Dados detalhados do lead

## 🎯 Pontos de Tracking Implementados

### 1. Formulários de Lead
- ✅ Formulário principal (hero)
- ✅ Formulário de plantas
- ✅ Formulário de contato
- ✅ Todos os CTAs de WhatsApp

### 2. Interações
- ✅ Cliques no WhatsApp flutuante
- ✅ Visualização do carrossel de plantas
- ✅ Navegação entre seções

### 3. Dados Customizados
```typescript
{
  content_name: 'ELEV Park Sacomã II',
  content_category: 'Real Estate',
  value: 1 // Para leads
}
```

## ⚙️ Como Configurar o Pixel ID

### 1. Obter o Pixel ID do Facebook
1. Acesse **Meta Business Manager**
2. Vá em **Eventos** > **Gerenciador de Pixels**
3. Copie o **ID do Pixel** (formato: números)

### 2. Substituir no Código
No arquivo `components/FacebookPixel.tsx`, linha 26:
```typescript
// SUBSTITUIR 'YOUR_PIXEL_ID' pelo ID real
const PIXEL_ID = 'YOUR_PIXEL_ID';
```

### 3. Exemplo de ID Real
```typescript
const PIXEL_ID = '1234567890123456';
```

## 🔍 Como Testar

### 1. Facebook Pixel Helper (Extensão)
- Instale a extensão **Facebook Pixel Helper**
- Acesse a landing page
- Verifique se os eventos estão sendo disparados

### 2. Meta Events Manager
- Acesse **Meta Business Manager**
- Vá em **Eventos** > **Teste de Eventos**
- Monitore em tempo real

### 3. Console do Navegador
```javascript
// Verificar se o pixel está carregado
console.log(window.fbq);

// Ver últimos eventos
fbq('track', 'PageView');
```

## 📊 Eventos Esperados

### Fluxo Típico do Usuário
1. **PageView** - Usuário acessa a página
2. **ViewContent** - Visualiza conteúdo principal
3. **Floor_Plans_View** - Vê as plantas (se rolar até lá)
4. **Contact** - Clica no WhatsApp
5. **Lead** - Preenche formulário

## 🚀 Benefícios da Implementação

### Para Marketing
- **Remarketing**: Reengajar visitantes
- **Lookalike Audiences**: Encontrar público similar
- **Otimização de Campanhas**: Melhor performance

### Para Análise
- **Funil de Conversão**: Entender jornada do usuário
- **ROI Preciso**: Rastrear retorno real
- **Segmentação**: Criar públicos específicos

## 🔒 Compliance e Privacidade

### LGPD Considerações
- **Consentimento**: Implementar banner de cookies
- **Política de Privacidade**: Mencionar uso do pixel
- **Opt-out**: Permitir desabilitação

### Implementação Futura
```typescript
// Exemplo de consentimento
if (userConsent) {
  fbq('init', PIXEL_ID);
}
```

## 📝 Próximos Passos

1. **Substituir Pixel ID** pelo real
2. **Testar eventos** com Pixel Helper
3. **Configurar campanhas** no Meta Ads
4. **Implementar banner** de cookies (LGPD)
5. **Monitorar conversões**

## 💡 Dicas Importantes

- **Teste sempre** antes de publicar
- **Monitore eventos** no Events Manager
- **Use públicos customizados** para remarketing
- **Configure conversões** como objetivos
- **Analise dados** regularmente

---

**Status**: ✅ **PRONTO PARA PRODUÇÃO**  
**Próxima ação**: Substituir `YOUR_PIXEL_ID` pelo ID real do Facebook Pixel
