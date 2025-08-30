# 🎯 Configuração Facebook Pixel para Lead Generation - ELEV Park Sacomã II

## ✅ **Eventos Configurados para Otimização de Conversões**

### **📊 Eventos Padrão do Facebook (Standard Events)**

#### **1. Lead Event (Principal)**
```javascript
window.fbq('track', 'Lead', {
  content_name: 'ELEV Park Sacomã II Lead Form',
  content_category: 'Real Estate',
  content_type: 'product',
  value: 250000, // Valor médio dos apartamentos
  currency: 'BRL',
  predicted_ltv: 250000,
  status: 'completed'
});
```

#### **2. CompleteRegistration Event**
```javascript
window.fbq('track', 'CompleteRegistration', {
  content_name: 'ELEV Park Sacomã II Registration',
  content_category: 'Real Estate Lead',
  value: 1,
  currency: 'BRL',
  status: 'completed'
});
```

#### **3. ViewContent Event (Seções importantes)**
```javascript
window.fbq('track', 'ViewContent', {
  content_name: 'Floor Plans Section',
  content_category: 'Real Estate Product Catalog',
  event_source_url: window.location.href,
  user_engagement: 'high_intent'
});
```

#### **4. InitiateCheckout Event (Seção de contato)**
```javascript
window.fbq('track', 'InitiateCheckout', {
  content_name: 'Contact Form Section',
  content_category: 'Real Estate Contact',
  user_engagement: 'very_high_intent',
  conversion_likelihood: 'high'
});
```

#### **5. Contact Event (WhatsApp)**
```javascript
window.fbq('track', 'Lead', {
  content_name: 'ELEV Park Sacomã II WhatsApp Contact',
  content_category: 'Real Estate Contact',
  value: 1,
  currency: 'BRL',
  predicted_ltv: 250000
});
```

---

### **🎯 Eventos Customizados (Custom Events)**

#### **1. RealEstate_LeadSubmission**
```javascript
window.fbq('trackCustom', 'RealEstate_LeadSubmission', {
  property_name: 'ELEV Park Sacomã II',
  property_type: 'Apartamento',
  property_location: 'Sacomã, São Paulo',
  interest_type: formData.interest,
  lead_source: 'Landing Page',
  campaign_type: 'Lead Generation',
  timestamp: new Date().toISOString()
});
```

#### **2. WhatsApp_Contact_Intent**
```javascript
window.fbq('trackCustom', 'WhatsApp_Contact_Intent', {
  property_name: 'ELEV Park Sacomã II',
  contact_method: 'WhatsApp',
  user_engagement: 'high_intent',
  conversion_likelihood: 'high',
  timestamp: new Date().toISOString()
});
```

#### **3. FloorPlan_DetailView**
```javascript
window.fbq('trackCustom', 'FloorPlan_DetailView', {
  apartment_type: planType,
  property_name: 'ELEV Park Sacomã II',
  engagement_type: 'detailed_view',
  conversion_likelihood: 'very_high',
  timestamp: new Date().toISOString()
});
```

#### **4. CRM_Integration_Success/Error**
```javascript
window.fbq('trackCustom', 'CRM_Integration_Success', {
  integration_type: 'RD Station',
  lead_email: formData.email,
  status: 'success'
});
```

---

### **📈 Eventos de Engajamento por Seção**

#### **Plantas dos Apartamentos**
- **Trigger**: Scroll para seção de plantas (30% visível)
- **Evento**: `ViewContent` + `Floor_Plans_View`
- **Intenção**: Alta (usuário interessado em detalhes)

#### **Área de Lazer**
- **Trigger**: Scroll para seção amenities
- **Evento**: `Amenities_View`
- **Intenção**: Média (interesse no estilo de vida)

#### **Localização**
- **Trigger**: Scroll para seção location
- **Evento**: `Location_View`
- **Intenção**: Média (interesse na localização)

#### **Formulário de Contato**
- **Trigger**: Scroll para seção contact (30% visível)
- **Evento**: `InitiateCheckout` + `Contact_Section_View`
- **Intenção**: Muito Alta (pronto para converter)

---

### **🎯 Configurações para Campanhas Facebook Ads**

#### **Evento de Conversão Principal**: `Lead`
- **Otimização**: Formulário preenchido + WhatsApp clicado
- **Valor**: R$ 250.000 (valor médio do imóvel)
- **Janela de Conversão**: 7 dias

#### **Eventos de Otimização Secundários**:
1. `CompleteRegistration` - Backup para Lead
2. `ViewContent` (plantas) - Lookalike audiences
3. `InitiateCheckout` (contato) - Retargeting

#### **Audiences Personalizadas**:
1. **Hot Leads**: `RealEstate_LeadSubmission` (últimos 30 dias)
2. **Plant Viewers**: `FloorPlan_DetailView` (últimos 15 dias)
3. **WhatsApp Clickers**: `WhatsApp_Contact_Intent` (últimos 7 dias)

---

### **📊 Dados Enviados para Otimização**

#### **Parâmetros de Valor**:
- **25m² (1 dorm)**: R$ 220.000
- **34m² (2 dorm)**: R$ 250.000
- **37m² (suíte)**: R$ 270.000

#### **Dados de Contexto**:
```javascript
{
  property_name: 'ELEV Park Sacomã II',
  property_type: 'Apartamento',
  property_location: 'Sacomã, São Paulo',
  financing: 'Minha Casa Minha Vida',
  entry_payment: 'FGTS'
}
```

---

### **🔧 Implementação Técnica**

#### **Pixel ID**: `669854672792093`

#### **Verificação de Funcionamento**:
1. **Facebook Pixel Helper** (extensão Chrome)
2. **Events Manager** no Facebook Business
3. **Test Events** - enviar evento de teste

#### **Variáveis de Ambiente**:
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=669854672792093
```

---

### **📈 Métricas para Acompanhar**

#### **No Facebook Ads Manager**:
- **CPL (Custo por Lead)**: Meta < R$ 50
- **Taxa de Conversão**: Meta > 5%
- **ROAS (Return on Ad Spend)**: Meta > 10x

#### **No RD Station**:
- **Leads Qualificados**: Taxa de qualificação > 70%
- **Conversão Lead → Venda**: Meta > 2%

#### **No Google Analytics** (se configurado):
- **Tempo na Página**: Meta > 2 minutos
- **Taxa de Rejeição**: Meta < 40%
- **Páginas por Sessão**: Meta > 3

---

### **🚀 Próximos Passos**

1. **Deploy no Vercel** ✅
2. **Teste do Pixel** com Facebook Pixel Helper
3. **Configurar Campanhas** no Facebook Ads
4. **Monitorar Conversões** nos primeiros 7 dias
5. **Otimizar Audiences** baseado nos dados

**✅ Configuração completa para máxima performance de conversão!**
