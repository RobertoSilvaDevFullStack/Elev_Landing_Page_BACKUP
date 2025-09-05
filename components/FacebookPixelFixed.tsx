// components/FacebookPixel.tsx
// Versão OTIMIZADA - Sem erros de rede

import { useEffect } from 'react';
import Script from 'next/script';

interface FacebookPixelProps {
  pixelId: string;
}

// Declaração global otimizada
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    fbqInitialized?: boolean;
  }
}

const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    // Evitar múltiplas inicializações
    if (typeof window !== 'undefined' && window.fbq && !window.fbqInitialized) {
      try {
        window.fbq('init', pixelId);
        window.fbq('track', 'PageView');
        window.fbqInitialized = true;
        console.log('✅ Facebook Pixel inicializado:', pixelId);
      } catch (error) {
        console.warn('⚠️ Facebook Pixel erro (ignorado):', error);
      }
    }
  }, [pixelId]); // Incluir pixelId mas com controle de inicialização

  return (
    <>
      {/* Script otimizado com tratamento de erro */}
      <Script
        id="facebook-pixel-optimized"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Facebook Pixel script carregado');
        }}
        onError={(error) => {
          console.warn('⚠️ Facebook Pixel script erro (ignorado):', error);
        }}
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                
                // Marcar como carregado
                window.fbqScriptLoaded = true;
              } catch (error) {
                console.warn('Facebook Pixel initialization failed:', error);
                // Criar fallback
                window.fbq = window.fbq || function() {
                  console.warn('Facebook Pixel offline mode');
                };
              }
            })();
          `,
        }}
      />
      
      {/* No-script fallback SEM imagem (evita erro) */}
      <noscript>
        <div style={{ display: 'none' }} data-pixel-id="${pixelId}">
          Facebook Pixel NoScript Fallback
        </div>
      </noscript>
    </>
  );
};

export default FacebookPixel;

// Hook OTIMIZADO com controle de erro
export const useFacebookPixel = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
    if (typeof window === 'undefined') return;
    
    try {
      if (window.fbq) {
        window.fbq('track', eventName, parameters || {});
        console.log(`📊 Facebook Event: ${eventName}`, parameters);
      } else {
        console.warn(`⚠️ Facebook Pixel não disponível para evento: ${eventName}`);
      }
    } catch (error) {
      console.warn(`⚠️ Erro ao enviar evento ${eventName}:`, error);
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
    if (typeof window === 'undefined') return;
    
    try {
      if (window.fbq) {
        window.fbq('trackCustom', eventName, parameters || {});
        console.log(`🎯 Facebook Custom Event: ${eventName}`, parameters);
      } else {
        console.warn(`⚠️ Facebook Pixel não disponível para evento customizado: ${eventName}`);
      }
    } catch (error) {
      console.warn(`⚠️ Erro ao enviar evento customizado ${eventName}:`, error);
    }
  };

  return {
    trackEvent,
    trackCustomEvent
  };
};

// Eventos otimizados
export const FacebookPixelEvents = {
  // Eventos padrão
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  VIEW_CONTENT: 'ViewContent',
  
  // Eventos customizados
  FLOOR_PLAN_VIEW: 'FloorPlanView',
  GALLERY_VIEW: 'GalleryView',
  WHATSAPP_CLICK: 'WhatsAppClick',
  FORM_SUBMIT: 'FormSubmit'
};
