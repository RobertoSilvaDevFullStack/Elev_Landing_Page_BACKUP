# 🚀 Como Implementar Imagens e Vídeos no Projeto

## 📋 **Passo a Passo para Adicionar Assets**

### **1. Organização dos Arquivos**

Coloque seus arquivos na estrutura criada:

```
📁 public/
├── 📁 images/
│   ├── 📁 hero/
│   │   ├── hero-background.jpg     (Fundo da seção principal)
│   │   ├── hero-building.jpg       (Fachada do prédio)
│   │   ├── logo-elev.png          (Logo ELEV)
│   │   └── logo-trisul.png        (Logo Trisul)
│   ├── 📁 gallery/
│   │   ├── apartamento-decorado-1.jpg
│   │   ├── apartamento-decorado-2.jpg
│   │   ├── apartamento-suite.jpg
│   │   └── varanda-churrasqueira.jpg
│   ├── 📁 floorplans/
│   │   ├── planta-1-dorm-25m2.jpg
│   │   ├── planta-2-dorm-32m2.jpg
│   │   ├── planta-2-dorm-varanda-34m2.jpg
│   │   └── planta-2-dorm-suite-37m2.jpg
│   ├── 📁 amenities/
│   │   ├── piscina-adulto.jpg
│   │   ├── academia-fitness.jpg
│   │   ├── playground.jpg
│   │   └── churrasqueira-gourmet.jpg
│   └── 📁 location/
│       ├── mapa-localizacao.jpg
│       ├── estacao-sacoma.jpg
│       └── vista-aerea.jpg
├── 📁 videos/
│   ├── apresentacao-empreendimento.mp4
│   ├── tour-virtual-apartamento.mp4
│   └── area-lazer-completa.mp4
├── favicon.ico
├── apple-touch-icon.png
└── og-image.jpg
```

### **2. Substituir SVGs Placeholder por Imagens Reais**

#### **🎬 Vídeo Hero (Linha ~307 do elev_sacoma_landing.tsx)**

**ANTES:**
```jsx
<img 
  src="data:image/svg+xml;base64,PHN2ZyB3aWR0..."
  alt="ELEV Park Sacomã II"
  className="w-full h-64 object-cover"
/>
```

**DEPOIS:**
```jsx
<img 
  src="/images/hero/hero-building.jpg"
  alt="ELEV Park Sacomã II - Fachada do Empreendimento"
  className="w-full h-64 object-cover"
/>
```

#### **📐 Planta do Apartamento (Seção Suite)**

**ANTES:**
```jsx
<img 
  src="data:image/svg+xml;base64,PHN2ZyB3aWR0..."
  alt="Planta apartamento 37m² com suíte"
  className="w-full rounded-xl"
/>
```

**DEPOIS:**
```jsx
<img 
  src="/images/floorplans/planta-2-dorm-suite-37m2.jpg"
  alt="Planta apartamento 37m² com suíte - ELEV Park Sacomã II"
  className="w-full rounded-xl"
/>
```

### **3. Adicionar Vídeo Real**

#### **Substituir o iframe do YouTube por vídeo local:**

```jsx
{showVideo ? (
  <video 
    src="/videos/apresentacao-empreendimento.mp4"
    controls
    autoPlay
    poster="/images/hero/hero-building.jpg"
    className="w-full h-64 rounded-xl"
  >
    Seu navegador não suporta vídeo HTML5.
  </video>
) : (
  // Poster do vídeo...
)}
```

### **4. Otimizar com Next.js Image**

Para melhor performance, use o componente Image do Next.js:

```jsx
import Image from 'next/image';

// Substituir img por Image
<Image
  src="/images/hero/hero-building.jpg"
  alt="ELEV Park Sacomã II"
  width={600}
  height={400}
  className="w-full h-64 object-cover"
  priority  // Para imagens above-the-fold
/>
```

### **5. Adicionar Galeria de Imagens**

Adicione uma nova seção com galeria:

```jsx
{/* Nova seção - Galeria de Apartamentos */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-16">
      Apartamentos Decorados
    </h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { src: "/images/gallery/apartamento-decorado-1.jpg", title: "1 Dormitório" },
        { src: "/images/gallery/apartamento-decorado-2.jpg", title: "2 Dormitórios" },
        { src: "/images/gallery/apartamento-suite.jpg", title: "Suíte Master" },
        { src: "/images/gallery/varanda-churrasqueira.jpg", title: "Varanda Gourmet" },
        { src: "/images/gallery/cozinha-americana.jpg", title: "Cozinha Americana" },
        { src: "/images/gallery/banheiro-suite.jpg", title: "Banheiro da Suíte" }
      ].map((item, index) => (
        <div key={index} className="relative group cursor-pointer">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
            <h3 className="text-white font-semibold">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### **6. Background Hero com Imagem Real**

Adicione background na seção hero:

```jsx
{/* Hero Section com background real */}
<section 
  className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
  style={{
    backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.8), rgba(30, 64, 175, 0.8)), url('/images/hero/hero-background.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}
>
```

### **7. Configurar next.config.js para Otimização**

Já está configurado, mas certifique-se de que tem:

```javascript
images: {
  domains: ['localhost'],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
```

### **8. SEO e Meta Tags**

Atualize as meta tags com as imagens reais:

```jsx
{/* No componente Head */}
<meta property="og:image" content="/og-image.jpg" />
<meta property="twitter:image" content="/og-image.jpg" />
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## 🎯 **Dicas de Implementação**

### **Tamanhos Recomendados:**
- **Hero Background**: 1920x1080px
- **Galeria**: 800x600px 
- **Plantas**: 1000x800px
- **Logos**: 300x100px (PNG transparente)
- **OG Image**: 1200x630px

### **Formatos:**
- **Fotos**: JPEG (qualidade 80-85%)
- **Logos**: PNG (transparente)
- **Vídeos**: MP4 (H.264, máx 50MB)

### **Performance:**
- Use `priority` para imagens above-the-fold
- Use `loading="lazy"` para imagens abaixo da dobra
- Comprima imagens antes de usar
- Considere usar WebP para navegadores modernos

## ✅ **Checklist de Implementação**

- [ ] Criar estrutura de pastas em `/public`
- [ ] Adicionar todas as imagens nas pastas corretas
- [ ] Substituir SVGs placeholder por imagens reais
- [ ] Implementar vídeo local
- [ ] Adicionar galeria de apartamentos
- [ ] Configurar background hero
- [ ] Atualizar meta tags
- [ ] Testar carregamento das imagens
- [ ] Verificar responsividade
- [ ] Otimizar performance
