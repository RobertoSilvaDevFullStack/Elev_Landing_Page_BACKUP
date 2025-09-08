// Facebook Pixel - VERSÃO CORRIGIDA 2.1
// Resolve problemas de disparos excessivos e otimiza funil de conversão

import { useEffect } from "react";
import Script from "next/script";

interface FacebookPixelProps {
  pixelId: string;
}

// Declaração global
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    fbqInitialized?: boolean;
  }
}

const FacebookPixelOptimized: React.FC<FacebookPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    // Verificar se já foi inicializado para evitar duplicação
    if (typeof window !== "undefined" && window.fbq && !window.fbqInitialized) {
      try {
        window.fbq("init", pixelId);
        window.fbq("track", "PageView");
        window.fbqInitialized = true;
        console.log(
          "✅ Facebook Pixel v2.1 inicializado (CORRIGIDO):",
          pixelId
        );
      } catch (error) {
        console.warn("⚠️ Facebook Pixel erro (ignorado):", error);
      }
    }
  }, [pixelId]);

  return (
    <>
      <Script
        id="facebook-pixel-optimized-v2"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Facebook Pixel v2.1 carregado - VERSÃO CORRIGIDA");
        }}
        onError={(error) => {
          console.warn("⚠️ Facebook Pixel erro (ignorado):", error);
        }}
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Verificar se já existe para evitar duplicação
                if (window.fbq) return;
                
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                
                window.fbqScriptLoaded = true;
                console.log('🔧 Facebook Pixel v2.1 - Otimizado para conversões precisas');
              } catch (error) {
                console.warn('Facebook Pixel falhou:', error);
                window.fbq = window.fbq || function() {
                  console.log('Facebook Pixel offline mode');
                };
              }
            })();
          `,
        }}
      />

      <noscript>
        <div
          style={{ display: "none" }}
          data-pixel-version="2.1"
          data-pixel-id={pixelId}
        >
          Facebook Pixel v2.1 Optimized NoScript
        </div>
      </noscript>
    </>
  );
};

export default FacebookPixelOptimized;

// Hook corrigido - separa intenções de conversões
export const useFacebookPixelOptimized = () => {
  // APENAS para conversões confirmadas (após sucesso no banco)
  const trackRealConversion = (
    eventName: string,
    parameters?: Record<string, string | number | boolean>
  ) => {
    if (typeof window === "undefined") return;

    try {
      if (window.fbq) {
        window.fbq("track", eventName, parameters || {});
        console.log(`🎯 CONVERSÃO REAL CONFIRMADA: ${eventName}`, parameters);
      }
    } catch (error) {
      console.warn(`⚠️ Erro ao confirmar conversão ${eventName}:`, error);
    }
  };

  // APENAS para conversões customizadas confirmadas
  const trackCustomConversion = (
    eventName: string,
    parameters?: Record<string, string | number | boolean>
  ) => {
    if (typeof window === "undefined") return;

    try {
      if (window.fbq) {
        window.fbq("trackCustom", eventName, parameters || {});
        console.log(
          `🏆 CONVERSÃO CUSTOMIZADA CONFIRMADA: ${eventName}`,
          parameters
        );
      }
    } catch (error) {
      console.warn(
        `⚠️ Erro ao confirmar conversão customizada ${eventName}:`,
        error
      );
    }
  };

  // Para tracking de intenção (não conta como conversão)
  const trackUserIntent = (
    eventName: string,
    parameters?: Record<string, string | number | boolean>
  ) => {
    if (typeof window === "undefined") return;

    try {
      if (window.fbq) {
        window.fbq("trackCustom", eventName, parameters || {});
        console.log(
          `👁️ INTENÇÃO RASTREADA (não conversão): ${eventName}`,
          parameters
        );
      }
    } catch (error) {
      console.warn(`⚠️ Erro ao rastrear intenção ${eventName}:`, error);
    }
  };

  return {
    trackRealConversion, // Só para conversões de verdade
    trackCustomConversion, // Conversões customizadas confirmadas
    trackUserIntent, // Intenções/interesses (não conversões)
  };
};

// Eventos reorganizados por tipo
export const FacebookConversionEvents = {
  // CONVERSÕES REAIS (só disparar após confirmação no banco)
  LEAD: "Lead", // Lead confirmado no banco
  COMPLETE_REGISTRATION: "CompleteRegistration", // Registro completado
  CONTACT: "Contact", // Contato confirmado

  // CONVERSÕES CUSTOMIZADAS (só após sucesso)
  FORM_SUCCESS: "Form_Submit_Success", // Formulário enviado COM SUCESSO
  LEAD_CONFIRMED: "Lead_Database_Saved", // Lead salvo no banco
  EMAIL_SENT: "Email_Notification_Sent", // Email de notificação enviado

  // INTENÇÕES (podem disparar antes da conversão)
  FORM_STARTED: "Form_Started", // Usuário começou a preencher
  FORM_PROGRESS: "Form_Progress", // Progresso no formulário
  WHATSAPP_INTENT: "WhatsApp_Intent", // Intenção de contato WhatsApp
  CONTENT_VIEW: "Content_Engagement", // Engajamento com conteúdo
};
