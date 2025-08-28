// components/ImageManager.tsx
// Gerenciamento otimizado de todas as imagens do projeto

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Utilitário para lazy loading mais eficiente
const createBlurDataURL = (width: number, height: number) => {
  const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="20%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#f3f4f6" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" opacity="0.5" />
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
    </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

// 1. HERO - Fachada Principal
export const HeroBuilding = ({ className = "", priority = true }: { className?: string, priority?: boolean }) => {
  return (
    <Image
      src="/images/hero/FACHADA_P2.webp"
      alt="ELEV Park Sacomã II - Fachada do Empreendimento"
      width={1200}
      height={800}
      className={`object-cover ${className}`}
      priority={priority}
      placeholder="blur"
      blurDataURL={createBlurDataURL(1200, 800)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    />
  );
};

// 2. HERO BACKGROUND
export const HeroBackground = ({ className = "" }: { className?: string }) => {
  return (
    <Image
      src="/images/hero/hero-background.jpg"
      alt="Vista aérea do bairro Sacomã"
      fill
      className={`object-cover ${className}`}
      priority
      placeholder="blur"
      blurDataURL={createBlurDataURL(1920, 1080)}
      sizes="100vw"
    />
  );
};

// 3. LOGOS
export const LogoElev = ({ className = "", width = 150, height = 60 }: { className?: string, width?: number, height?: number }) => {
  return (
    <Image
      src="/images/hero/logo_elev_sacoma_3.webp"
      alt="ELEV - Desenvolvimento Imobiliário"
      width={width}
      height={height}
      className={`h-auto ${className}`}
      priority
    />
  );
};

export const LogoTrisul = ({ className = "", width = 120, height = 40 }: { className?: string, width?: number, height?: number }) => {
  return (
    <Image
      src="/images/hero/logo-trisul.svg"
      alt="Trisul - Construtora"
      width={width}
      height={height}
      className={`h-auto ${className}`}
      priority
    />
  );
};

// 4. VÍDEO HERO - Placeholder melhorado
export const HeroVideo = ({ onPlay, className = "" }: { onPlay?: () => void, className?: string }) => {
  return (
    <div className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Poster do vídeo - usando fachada como background */}
      <div className="relative w-full h-64 md:h-80">
        <HeroBuilding 
          className="rounded-2xl" 
          priority={true}
        />
        
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Botão de play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={onPlay}
            className="bg-red-600 hover:bg-red-700 rounded-full p-6 transition-all duration-300 hover:scale-110 shadow-2xl group"
            aria-label="Reproduzir vídeo do empreendimento"
          >
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24" className="ml-1">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        
        {/* Badge do vídeo */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
          ▶️ Conheça o Empreendimento
        </div>
      </div>
    </div>
  );
};

// 5. PLANTAS DOS APARTAMENTOS
export const FloorPlan = ({ type = "37m2", className = "", showTitle = true }: { type?: string, className?: string, showTitle?: boolean }) => {
  const getFloorPlanData = (type: string) => {
    const plans: Record<string, { src: string, alt: string, title: string }> = {
      "25m2": {
        src: "/images/floorplans/planta-1-dorm-25m2.jpg",
        alt: "Planta apartamento 1 dormitório - 25m²",
        title: "1 Dormitório - 25m²"
      },
      "34m2": {
        src: "/images/floorplans/planta-2-dorm-34m2.jpg",
        alt: "Planta apartamento 2 dormitórios - 34m²",
        title: "2 Dormitórios - 34m²"
      },
      "37m2": {
        src: "/images/floorplans/planta-2-dorm-suite-37m2.jpg",
        alt: "Planta apartamento 2 dormitórios com suíte - 37m²", 
        title: "2 Dormitórios + Suíte - 37m²"
      }
    };
    return plans[type] || plans["37m2"];
  };

  const planData = getFloorPlanData(type);

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {showTitle && (
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {planData.title}
          </h3>
        )}
        <Image
          src={planData.src}
          alt={planData.alt}
          width={600}
          height={450}
          className="w-full rounded-xl"
          placeholder="blur"
          blurDataURL={createBlurDataURL(600, 450)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>
    </div>
  );
};

// 6. CARROSSEL DE PLANTAS - MCMV
export const FloorPlanCarousel = ({ className = "" }: { className?: string }) => {
  const [currentPlan, setCurrentPlan] = useState(0);

  const floorPlans = [
    {
      src: "/images/floorplans/planta-1-dorm-25m2.jpg",
      alt: "Planta apartamento 1 dormitório - 25m²",
      title: "25m² com varanda",
      legend: "25m² com varanda dentro da faixa 3 MCMV"
    },
    {
      src: "/images/floorplans/planta-2-dorm-34m2.jpg", 
      alt: "Planta apartamento 2 dormitórios - 34m²",
      title: "34m² com varanda",
      legend: "Unidade 34m² com varanda dentro da faixa 3 do MCMV"
    },
    {
      src: "/images/floorplans/planta-2-dorm-suite-37m2.jpg",
      alt: "Planta apartamento 2 dormitórios com suíte - 37m²",
      title: "37m² com suíte",
      legend: "37m² com suíte e varanda - unidade R2V dentro da faixa 4 do MCMV"
    }
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlan((prev) => (prev + 1) % floorPlans.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [floorPlans.length]);

  const currentFloorPlan = floorPlans[currentPlan];

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="relative">
          <Image
            src={currentFloorPlan.src}
            alt={currentFloorPlan.alt}
            width={600}
            height={450}
            className="w-full rounded-xl transition-opacity duration-500"
            placeholder="blur"
            blurDataURL={createBlurDataURL(600, 450)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
          
          {/* Legend Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-1">{currentFloorPlan.title}</h3>
            <p className="text-sm opacity-90">{currentFloorPlan.legend}</p>
          </div>

          {/* Dots Indicator */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {floorPlans.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPlan(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPlan 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-white/70 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. IMPLANTAÇÃO DO TERRENO
export const SitePlan = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Implantação do Terreno
        </h3>
        <Image
          src="/images/floorplans/implantacao-terreno.jpg"
          alt="Implantação do terreno - ELEV Park Sacomã II"
          width={800}
          height={600}
          className="w-full rounded-xl"
          placeholder="blur"
          blurDataURL={createBlurDataURL(800, 600)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
        />
      </div>
    </div>
  );
};

// 7. GALERIA DE APARTAMENTOS DECORADOS
export const ApartmentGallery = ({ className = "" }: { className?: string }) => {
  const galleryImages = [
    {
      src: "/images/gallery/apartamento-decorado-1.jpg",
      alt: "Apartamento decorado 1 dormitório",
      title: "Apartamento Decorado 1"
    },
    {
      src: "/images/gallery/apartamento-decorado-2.jpg", 
      alt: "Apartamento decorado 2 dormitórios",
      title: "Apartamento Decorado 2"
    },
    {
      src: "/images/gallery/apartamento-suite.jpg",
      alt: "Apartamento com suíte",
      title: "Suíte Master"
    },
    {
      src: "/images/gallery/cozinha-americana.jpg",
      alt: "Cozinha americana integrada",
      title: "Cozinha Americana"
    },
    {
      src: "/images/gallery/banheiro-suite.jpg",
      alt: "Banheiro da suíte",
      title: "Banheiro Suíte"
    },
    {
      src: "/images/gallery/varanda-churrasqueira.jpg",
      alt: "Varanda com churrasqueira",
      title: "Varanda Gourmet"
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {galleryImages.map((image, index) => (
        <div key={index} className="relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={createBlurDataURL(400, 300)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="text-white font-semibold text-lg">{image.title}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 8. ÁREA DE LAZER E AMENIDADES
export const AmenitiesGallery = ({ className = "" }: { className?: string }) => {
  const amenities = [
    {
      src: "/images/amenities/piscina-adulto.jpg",
      alt: "Piscina adulto com deck",
      title: "Piscina Adulto",
      icon: "🏊‍♀️"
    },
    {
      src: "/images/amenities/piscina-infantil.jpg",
      alt: "Piscina infantil segura", 
      title: "Piscina Infantil",
      icon: "🧒"
    },
    {
      src: "/images/amenities/academia-fitness.jpg",
      alt: "Academia completa e equipada",
      title: "Academia Fitness",
      icon: "💪"
    },
    {
      src: "/images/amenities/playground.jpg",
      alt: "Playground para crianças", 
      title: "Playground",
      icon: "🎮"
    },
    {
      src: "/images/amenities/churrasqueira-gourmet.jpg",
      alt: "Espaço gourmet com churrasqueira",
      title: "Espaço Gourmet",
      icon: "🔥"
    },
    {
      src: "/images/amenities/salao-festas.jpg",
      alt: "Salão de festas amplo",
      title: "Salão de Festas",
      icon: "🎉"
    },
    {
      src: "/images/amenities/coworking.jpg",
      alt: "Espaço coworking moderno",
      title: "Coworking",
      icon: "💻"
    },
    {
      src: "/images/amenities/entrada-lobby.jpg",
      alt: "Lobby de entrada elegante",
      title: "Lobby",
      icon: "🏢"
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {amenities.map((amenity, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="relative">
            <Image
              src={amenity.src}
              alt={amenity.alt}
              width={300}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              placeholder="blur"
              blurDataURL={createBlurDataURL(300, 200)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 text-xl">
              {amenity.icon}
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-gray-800 text-center">{amenity.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

// 9. LOCALIZAÇÃO
export const LocationImage = ({ type = "street", className = "" }: { type?: "street" | "station", className?: string }) => {
  const locationData = {
    street: {
      src: "/images/location/rua-do-empreendimento.jpeg",
      alt: "Rua do empreendimento ELEV Park Sacomã II",
      title: "Localização do Empreendimento"
    },
    station: {
      src: "/images/location/estacao-sacoma.jpg", 
      alt: "Estação Sacomã do Metrô",
      title: "Estação Sacomã - 3 min a pé"
    }
  };

  const data = locationData[type] || locationData.street;

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={data.src}
          alt={data.alt}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          placeholder="blur"
          blurDataURL={createBlurDataURL(600, 400)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 600px"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{data.title}</h3>
        </div>
      </div>
    </div>
  );
};

// 10. COMPONENTE DE LOGOS COMBINADO
export const BrandLogos = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center space-x-8 ${className}`}>
      <LogoElev width={150} height={60} />
      <div className="w-px h-12 bg-white/30" />
      <LogoTrisul width={120} height={40} />
    </div>
  );
};

// 11. LOGO MINHA CASA MINHA VIDA
export const LogoMinhaCasa = ({ className = "", size = 80 }: { className?: string, size?: number }) => {
  return (
    <Image
      src="/images/hero/logo_minha_casa_minha_vida.png"
      alt="Minha Casa Minha Vida - Financiamento Facilitado"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      placeholder="blur"
      blurDataURL={createBlurDataURL(size, size)}
      sizes="(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px"
    />
  );
};

// 12. FAIXA 4 MINHA CASA MINHA VIDA
export const LogoFaixa4MCMV = ({ className = "", size = 120 }: { className?: string, size?: number }) => {
  return (
    <Image
      src="/images/hero/faixa-4-do-minha-casa-minha-vida-capa.png"
      alt="Faixa 4 do Minha Casa Minha Vida - Apartamentos com Suíte"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      placeholder="blur"
      blurDataURL={createBlurDataURL(size, size)}
      sizes="(max-width: 768px) 100px, (max-width: 1200px) 120px, 140px"
    />
  );
};

// Objeto principal para exportação
const ImageManager = {
  HeroBuilding,
  HeroBackground,
  HeroVideo,
  LogoElev,
  LogoTrisul,
  LogoMinhaCasa,
  LogoFaixa4MCMV,
  BrandLogos,
  FloorPlan,
  FloorPlanCarousel,
  SitePlan,
  ApartmentGallery,
  AmenitiesGallery,
  LocationImage
};

export default ImageManager;
