# 📁 Organização de Assets - ELEV Park Sacomã II

## 🖼️ **Estrutura de Imagens**

### `/public/images/hero/`
**Imagens principais da landing page**
- `hero-background.jpg` - Imagem de fundo da seção hero (1920x1080px)
- `hero-building.jpg` - Fachada do prédio para destaque (1200x800px)
- `logo-elev.png` - Logo da ELEV (300x100px, fundo transparente)
- `logo-trisul.png` - Logo da Trisul (300x100px, fundo transparente)

### `/public/images/gallery/`
**Galeria de fotos do empreendimento**
- `apartamento-decorado-1.jpg` - Apartamento decorado 1 dormitório
- `apartamento-decorado-2.jpg` - Apartamento decorado 2 dormitórios
- `apartamento-suite.jpg` - Apartamento com suíte
- `varanda-churrasqueira.jpg` - Varanda com churrasqueira
- `cozinha-americana.jpg` - Cozinha americana
- `banheiro-suite.jpg` - Banheiro da suíte

### `/public/images/floorplans/`
**Plantas dos apartamentos**
- `planta-1-dorm-25m2.jpg` - Planta 1 dormitório 25m²
- `planta-2-dorm-32m2.jpg` - Planta 2 dormitórios 32m²
- `planta-2-dorm-varanda-34m2.jpg` - Planta 2 dorm + varanda 34m²
- `planta-2-dorm-suite-37m2.jpg` - Planta 2 dorm + suíte 37m²
- `implantacao-terreno.jpg` - Implantação no terreno

### `/public/images/amenities/`
**Área de lazer e comodidades**
- `piscina-adulto.jpg` - Piscina adulto
- `piscina-infantil.jpg` - Piscina infantil
- `academia-fitness.jpg` - Academia
- `playground.jpg` - Playground
- `churrasqueira-gourmet.jpg` - Área gourmet
- `salao-festas.jpg` - Salão de festas
- `coworking.jpg` - Espaço coworking
- `pet-place.jpg` - Pet place
- `entrada-lobby.jpg` - Entrada/lobby

### `/public/images/location/`
**Localização e entorno**
- `mapa-localizacao.jpg` - Mapa da localização
- `estacao-sacoma.jpg` - Estação Sacomã do metrô
- `rua-do-empreendimento.jpg` - Rua onde fica o empreendimento
- `vista-aerea.jpg` - Vista aérea da região
- `comercio-local.jpg` - Comércio local
- `escolas-proximas.jpg` - Escolas próximas

## 🎬 **Estrutura de Vídeos**

### `/public/videos/`
- `apresentacao-empreendimento.mp4` - Vídeo principal de apresentação (máx 50MB)
- `tour-virtual-apartamento.mp4` - Tour virtual do apartamento decorado
- `area-lazer-completa.mp4` - Vídeo da área de lazer
- `localizacao-privilegiada.mp4` - Vídeo da localização

**Formatos recomendados:**
- **Vídeo**: MP4 (H.264)
- **Resolução**: 1920x1080 (Full HD)
- **Taxa de bits**: 5-8 Mbps
- **Duração**: 30-60 segundos para web

## 📱 **Ícones e Assets Menores**

### `/public/`
- `favicon.ico` - Ícone do site (32x32px)
- `apple-touch-icon.png` - Ícone para dispositivos Apple (180x180px)
- `og-image.jpg` - Imagem para Open Graph/redes sociais (1200x630px)
- `manifest.json` - Manifesto para PWA

## 🔧 **Como Usar no Código**

### Imagens com Next.js Image:
```jsx
import Image from 'next/image'

<Image
  src="/images/hero/hero-building.jpg"
  alt="ELEV Park Sacomã II"
  width={1200}
  height={800}
  priority
/>
```

### Imagens normais:
```jsx
<img 
  src="/images/gallery/apartamento-decorado-1.jpg" 
  alt="Apartamento decorado" 
  className="w-full h-auto"
/>
```

### Vídeos:
```jsx
<video 
  src="/videos/apresentacao-empreendimento.mp4"
  controls
  poster="/images/hero/hero-building.jpg"
  className="w-full h-auto"
>
  Seu navegador não suporta vídeo.
</video>
```

## 📝 **Dicas de Otimização**

1. **Compressão de Imagens:**
   - JPEG para fotos: qualidade 80-85%
   - PNG para logos/transparência
   - WebP para navegadores modernos

2. **Tamanhos Responsivos:**
   - Desktop: 1920px largura máxima
   - Tablet: 1024px largura máxima  
   - Mobile: 640px largura máxima

3. **Carregamento Lazy:**
   - Use `loading="lazy"` para imagens fora da viewport
   - Use `priority` para imagens above-the-fold

4. **Alt Text:**
   - Sempre inclua texto alternativo descritivo
   - Importante para SEO e acessibilidade
