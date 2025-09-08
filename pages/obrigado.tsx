import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Home,
  ArrowLeft,
  Star,
  Users,
} from "lucide-react";
import { useFacebookPixelOptimized } from "../components/FacebookPixelOptimized";

// Declaração de tipos para window
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (
      command: string,
      action: string,
      parameters: Record<string, unknown>
    ) => void;
  }
}

export default function ThankYou() {
  const router = useRouter();
  const { trackRealConversion, trackCustomConversion } =
    useFacebookPixelOptimized();

  // Extrair dados da query da URL com useMemo para evitar re-renders
  const leadData = useMemo(
    () => ({
      name:
        typeof router.query.name === "string" ? router.query.name : undefined,
      email:
        typeof router.query.email === "string" ? router.query.email : undefined,
      phone:
        typeof router.query.phone === "string" ? router.query.phone : undefined,
      interest:
        typeof router.query.interest === "string"
          ? router.query.interest
          : undefined,
    }),
    [router.query]
  );

  // Enhanced Matching - Hash function para privacy compliance
  const hashData = async (data: string): Promise<string> => {
    if (!data || typeof window === "undefined" || !window.crypto?.subtle) {
      return "";
    }

    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data.toLowerCase().trim());
      const hashBuffer = await window.crypto.subtle.digest(
        "SHA-256",
        dataBuffer
      );
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (error) {
      console.warn("Hash generation failed:", error);
      return "";
    }
  };

  // Track conversão confirmada quando a página carrega - APENAS UMA VEZ
  useEffect(() => {
    const trackConversion = async () => {
      console.log(
        "🎯 PÁGINA DE OBRIGADO CARREGADA - Disparando eventos únicos de conversão"
      );

      // Preparar Enhanced Matching data se houver dados do lead
      let enhancedMatchData = {};
      if (leadData?.email || leadData?.phone || leadData?.name) {
        enhancedMatchData = {
          em: leadData?.email ? await hashData(leadData.email) : undefined,
          ph: leadData?.phone
            ? await hashData(leadData.phone.replace(/\D/g, ""))
            : undefined,
          fn: leadData?.name
            ? await hashData(leadData.name.split(" ")[0])
            : undefined,
        };

        // Remover campos undefined
        Object.keys(enhancedMatchData).forEach(
          (key) =>
            enhancedMatchData[key] === undefined &&
            delete enhancedMatchData[key]
        );
      }

      // 🎯 EVENTOS DE CONVERSÃO ÚNICOS - Só disparados na página de obrigado
      trackRealConversion("Lead", {
        content_name: `ELEV Park Sacomã II - ${
          leadData?.interest || "Cadastro"
        } Confirmado`,
        content_category: "Real Estate Lead Confirmed",
        value: 1,
        currency: "BRL",
        predicted_ltv: 250000,
        status: "thank_you_page_confirmed",
      });

      trackRealConversion("CompleteRegistration", {
        content_name: "ELEV Registration Complete - Thank You Page",
        content_category: "Real Estate Registration",
        value: 1,
        currency: "BRL",
        status: "confirmed",
      });

      // Conversão customizada com detalhes
      trackCustomConversion("Thank_You_Page_Conversion", {
        property_name: "ELEV Park Sacomã II",
        conversion_status: "thank_you_page_reached",
        lead_type: leadData?.interest || "unknown",
        page_type: "conversion_confirmation",
        timestamp: new Date().toISOString(),
      });

      // 🎯 Enhanced Facebook Pixel para página de conversão - EVENTO ÚNICO
      if (typeof window !== "undefined" && window.fbq) {
        // Lead event principal com Enhanced Matching
        window.fbq(
          "track",
          "Lead",
          {
            content_name: `ELEV Park Sacomã II - ${
              leadData?.interest || "Cadastro"
            } - Thank You Page`,
            content_category: "Real Estate Conversion Confirmed",
            value: 250000,
            currency: "BRL",
            predicted_ltv: 250000,
            conversion_type: "thank_you_page",
          },
          Object.keys(enhancedMatchData).length > 0
            ? enhancedMatchData
            : undefined
        );

        // Complete Registration com Enhanced Matching
        window.fbq(
          "track",
          "CompleteRegistration",
          {
            content_name: "ELEV Park Sacomã II Registration Complete",
            content_category: "Real Estate Registration",
            value: 1,
            currency: "BRL",
            status: "confirmed",
          },
          Object.keys(enhancedMatchData).length > 0
            ? enhancedMatchData
            : undefined
        );

        // Evento customizado de página de obrigado - ÚNICO
        window.fbq("trackCustom", "ThankYou_Page_Conversion", {
          property_name: "ELEV Park Sacomã II",
          property_type: "Apartamento",
          property_location: "Sacomã, São Paulo",
          conversion_stage: "thank_you_page",
          lead_quality: "high_intent_confirmed",
          page_reached: "conversion_success",
          lead_type: leadData?.interest || "unknown",
          timestamp: new Date().toISOString(),
        });
      }

      // Google Analytics (se houver)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Substituir pelos IDs reais
          value: 1.0,
          currency: "BRL",
          transaction_id: `elev_lead_${Date.now()}`,
        });
      }

      console.log("✅ EVENTOS DE CONVERSÃO ÚNICOS DISPARADOS - Thank You Page");
    };

    // Executar apenas uma vez quando a página carrega
    trackConversion();
  }, [trackRealConversion, trackCustomConversion, leadData]); // leadData como dependência

  const handleWhatsAppContact = () => {
    const phoneNumber = "5511989398765";
    const message = encodeURIComponent(
      `Olá! Acabei de me cadastrar no site do ELEV Park Sacomã II. ` +
        `${leadData?.name ? `Meu nome é ${leadData.name} e ` : ""}` +
        `tenho interesse em ${
          leadData?.interest || "conhecer os apartamentos"
        }. ` +
        `Gostaria de agendar uma visita!`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Track ação pós-conversão
    trackCustomConversion("Post_Conversion_WhatsApp", {
      action_type: "whatsapp_contact",
      conversion_stage: "post_thank_you",
      lead_quality: "high_engagement",
    });

    window.open(whatsappUrl, "_blank");
  };

  const handleCallContact = () => {
    // Track ação pós-conversão
    trackCustomConversion("Post_Conversion_Call", {
      action_type: "phone_call",
      conversion_stage: "post_thank_you",
      lead_quality: "very_high_engagement",
    });

    window.open("tel:+551196022575", "_self");
  };

  return (
    <>
      <Head>
        <title>Obrigado! - ELEV Park Sacomã II</title>
        <meta
          name="description"
          content="Seu cadastro foi realizado com sucesso! Nossa equipe entrará em contato em breve."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header simples */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  ELEV Park Sacomã II
                </span>
              </div>
              <Link
                href="/"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mensagem de sucesso */}
          <div className="text-center mb-12">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎉 Parabéns{leadData?.name ? `, ${leadData.name}` : ""}!
            </h1>

            <p className="text-xl text-gray-600 mb-2">
              Seu cadastro foi realizado com <strong>sucesso</strong>!
            </p>

            <p className="text-lg text-gray-500">
              Nossa equipe especializada entrará em contato em breve para
              agendar sua visita.
            </p>
          </div>

          {/* Informações do cadastro */}
          {leadData && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📋 Dados do seu cadastro:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leadData.name && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Nome: </span>
                    <span className="font-medium text-gray-900 ml-1">
                      {leadData.name}
                    </span>
                  </div>
                )}
                {leadData.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">E-mail: </span>
                    <span className="font-medium text-gray-900 ml-1">
                      {leadData.email}
                    </span>
                  </div>
                )}
                {leadData.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Telefone: </span>
                    <span className="font-medium text-gray-900 ml-1">
                      {leadData.phone}
                    </span>
                  </div>
                )}
                {leadData.interest && (
                  <div className="flex items-center">
                    <Home className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Interesse: </span>
                    <span className="font-medium text-gray-900 ml-1">
                      {leadData.interest}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Próximos passos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🚀 Próximos passos:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <p className="text-gray-700">
                  Nossa equipe analisará seu perfil e interesse
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <p className="text-gray-700">
                  Entraremos em contato em até <strong>2 horas úteis</strong>
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <p className="text-gray-700">
                  Agendaremos sua visita ao apartamento decorado
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-blue-600">4</span>
                </div>
                <p className="text-gray-700">
                  Apresentaremos as melhores condições de financiamento
                </p>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleWhatsAppContact}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Falar no WhatsApp Agora
            </button>

            <button
              onClick={handleCallContact}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Ligar Agora
            </button>
          </div>

          {/* Testimonial rápido */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 italic">
                  &ldquo;Processo super tranquilo e rápido! Em 1 semana consegui
                  meu financiamento aprovado. Recomendo para quem quer sair do
                  aluguel!&rdquo;
                </p>
                <p className="text-xs text-blue-600 mt-1 font-medium">
                  - Marina Silva, Apartamento 25m²
                </p>
              </div>
            </div>
          </div>

          {/* Footer da página */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Dúvidas? Entre em contato: <strong>(11) 96022-5753</strong>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              ELEV Park Sacomã II - A 3 minutos da Estação Sacomã
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
