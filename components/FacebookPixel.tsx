// components/FacebookPixel.tsx
// Componente para integração completa do Facebook Pixel

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

interface FacebookPixelProps {
  pixelId: string;
}

// Estendemos a declaração global existente
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    // Garantir que o fbq está disponível
    if (typeof window !== 'undefined' && window.fbq) {
      // Inicializar o pixel
      window.fbq('init', pixelId);
      // Track page view inicial
      window.fbq('track', 'PageView');
    }
  }, [pixelId]);

  return (
    <>
      {/* Facebook Pixel Script */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* No-script fallback */}
      <noscript>
        <Image
          height={1}
          width={1}
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="Facebook Pixel"
          unoptimized
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;

// Hook para facilitar o tracking de eventos
export const useFacebookPixel = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
    }
  };

  return {
    trackEvent,
    trackCustomEvent
  };
};

// Eventos predefinidos para imobiliário
export const FacebookPixelEvents = {
  // Eventos padrão do Facebook
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  FIND_LOCATION: 'FindLocation',
  SCHEDULE: 'Schedule',
  
  // Eventos customizados para imobiliário
  VIEW_FLOOR_PLAN: 'ViewFloorPlan',
  VIEW_GALLERY: 'ViewGallery',
  CALCULATE_FINANCING: 'CalculateFinancing',
  WHATSAPP_CLICK: 'WhatsAppClick',
  FORM_START: 'FormStart',
  FORM_COMPLETE: 'FormComplete',
  VIEW_AMENITIES: 'ViewAmenities',
  LOCATION_INTEREST: 'LocationInterest'
};
