import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  MapPin,
  MessageCircle,
  Users,
  Star,
  CheckCircle,
  Building,
  TreePine,
  Car,
  Shield,
  Eye,
} from "lucide-react";
import ImageManager from "./components/ImageManager";
import { useFacebookPixelOptimized } from "./components/FacebookPixelOptimized";
import { API_ENDPOINTS } from "./lib/apiConfig";

// Declaração de tipos para Facebook Pixel
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Testimonials data - movido para fora do componente para evitar re-criação
const testimonials = [
  {
    name: "Marina Silva",
    text: "Realizei meu sonho da casa própria! O atendimento da corretora foi excepcional e o processo muito tranquilo.",
    rating: 5,
    unit: "1 dorm - 25m²",
  },
  {
    name: "Carlos Roberto",
    text: "Excelente investimento! A localização é perfeita e já vejo valorização. Recomendo muito!",
    rating: 5,
    unit: "2 dorms - 37m²",
  },
  {
    name: "Família Santos",
    text: "O lazer do condomínio é incrível! Nossos filhos adoram. Foi a melhor escolha que fizemos.",
    rating: 5,
    unit: "2 dorms com suíte",
  },
];

// Componente principal com Fast Refresh otimizado
function ElevSacomaLanding() {
  // Facebook Pixel tracking hooks (versão otimizada)
  const { trackRealConversion, trackCustomConversion, trackUserIntent } =
    useFacebookPixelOptimized();

  // Track page sections view - VERSÃO CORRIGIDA
  useEffect(() => {
    // Track page view inicial (intenção de visualização)
    trackUserIntent("Page_View", {
      content_name: "ELEV Park Sacomã II Landing Page",
      content_category: "Real Estate",
      property_type: "Apartamento",
      location: "Sacomã, São Paulo",
      page_type: "Landing Page",
    });

    // Enhanced scroll tracking (todas são intenções, não conversões)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            // Track diferentes seções como intenções de interesse
            switch (sectionId) {
              case "plantas-section":
                trackUserIntent("Floor_Plans_View", {
                  content_name: "Floor Plans Section",
                  content_category: "Real Estate Product Catalog",
                  event_source_url: window.location.href,
                  user_engagement: "high_intent",
                });
                break;

              case "amenities-section":
                trackUserIntent("Amenities_View", {
                  content_name: "Amenities Section",
                  content_category: "Real Estate Features",
                  engagement_type: "lifestyle_interest",
                });
                break;

              case "location-section":
                trackUserIntent("Location_View", {
                  content_name: "Location Section",
                  content_category: "Real Estate Location",
                  engagement_type: "location_interest",
                });
                break;

              case "contact-section":
                // Contact section é alta intenção mas ainda não é conversão
                trackUserIntent("Contact_Section_View", {
                  content_name: "Contact Form Section",
                  content_category: "Real Estate Contact",
                  user_engagement: "very_high_intent",
                  conversion_likelihood: "high",
                });
                break;
            }
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    // Observe multiple sections
    const sections = [
      "plantas-section",
      "amenities-section",
      "location-section",
      "contact-section",
    ];
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) observer.unobserve(section);
      });
    };
  }, [trackUserIntent]);

  // Add meta tags dynamically - OTIMIZADO para Fast Refresh
  useEffect(() => {
    // Função estável para adicionar meta tags
    const addMetaTags = () => {
      // Set page title apenas uma vez
      if (
        document.title !==
        "ELEV Park Sacomã II - Apartamentos 1 e 2 Dorm com Suíte | Entrada FGTS"
      ) {
        document.title =
          "ELEV Park Sacomã II - Apartamentos 1 e 2 Dorm com Suíte | Entrada FGTS";
      }

      // Verificar se meta tags já existem antes de criar
      if (!document.querySelector('meta[name="description"]')) {
        const metaTags = [
          {
            name: "description",
            content:
              "Apartamentos 1 e 2 dormitórios com suíte no Sacomã. Entrada com FGTS, 3 min do metrô, lazer completo. Condições especiais para primeira compra e investidores.",
          },
          {
            name: "keywords",
            content:
              "apartamento sacomã, apartamento entrada fgts, apartamento 2 dormitorios suite, investimento imobiliario, primeira casa propria, apartamento metro sacoma",
          },
          { name: "author", content: "ELEV Park Sacomã II" },
          { name: "robots", content: "index, follow" },
          {
            property: "og:title",
            content: "ELEV Park Sacomã II - Apartamentos com Entrada FGTS",
          },
          {
            property: "og:description",
            content:
              "Apartamentos 1 e 2 dormitórios com suíte no Sacomã. Entrada com FGTS, 3 min do metrô, lazer completo.",
          },
          { property: "og:type", content: "website" },
          {
            property: "og:url",
            content: typeof window !== "undefined" ? window.location.href : "",
          },
          {
            property: "og:image",
            content:
              "https://via.placeholder.com/1200x630/1e40af/ffffff?text=ELEV+Park+Sacomã+II",
          },
          { name: "twitter:card", content: "summary_large_image" },
          {
            name: "twitter:title",
            content: "ELEV Park Sacomã II - Apartamentos com Entrada FGTS",
          },
          {
            name: "twitter:description",
            content:
              "Apartamentos 1 e 2 dormitórios com suíte no Sacomã. Entrada com FGTS, 3 min do metrô.",
          },
        ];

        metaTags.forEach((tag) => {
          const metaTag = document.createElement("meta");
          if (tag.name) metaTag.name = tag.name;
          if (tag.property) metaTag.setAttribute("property", tag.property);
          metaTag.content = tag.content;
          document.head.appendChild(metaTag);
        });
      }
    };

    // Apenas executar no cliente
    if (typeof window !== "undefined") {
      addMetaTags();
    }
  }, []); // Array vazio para executar apenas uma vez

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "primeira-compra",
  });

  // Estados do vídeo
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Sistema de Notificações Push - Social Proof em Tempo Real
  const [viewersCount, setViewersCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
    type: "viewers",
    message: "",
    icon: "👀",
  });

  // Rotate testimonials with fixed interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3); // Usar número fixo para evitar re-renders
    }, 5000);
    return () => clearInterval(interval);
  }, []); // Array vazio para evitar re-renders

  // Sistema de Notificações Push - Simulador de Social Proof
  useEffect(() => {
    // Simular contagem inicial de pessoas online (entre 8-24)
    const initialViewers = Math.floor(Math.random() * 16) + 8;
    setViewersCount(initialViewers);

    // Array de notificações variadas
    const notifications = [
      {
        type: "viewer",
        message: `${initialViewers} pessoas visualizando agora`,
        icon: "👀",
      },
      {
        type: "conversion",
        message: "Maria acabou de solicitar informações",
        icon: "✅",
      },
      {
        type: "urgency",
        message: "Apenas 5 unidades restantes com entrada FGTS",
        icon: "🔥",
      },
      {
        type: "social",
        message: "João agendou uma visita há 3 minutos",
        icon: "📱",
      },
      {
        type: "trending",
        message: "Apartamento mais procurado hoje",
        icon: "📈",
      },
      {
        type: "discount",
        message: "Condições especiais válidas até hoje",
        icon: "💰",
      },
    ];

    let notificationIndex = 0;

    // Mostrar primeira notificação após 3 segundos
    const initialTimer = setTimeout(() => {
      setCurrentNotification(notifications[0]);
      setShowNotification(true);
    }, 3000);

    // Ciclo de notificações a cada 8-12 segundos
    const interval = setInterval(() => {
      // Atualizar contagem de visualizadores (simular variação)
      const variation = Math.floor(Math.random() * 6) - 3; // -3 a +3
      setViewersCount((prev) => Math.max(5, Math.min(30, prev + variation)));

      // Esconder notificação atual
      setShowNotification(false);

      // Mostrar próxima notificação após 1 segundo
      setTimeout(() => {
        notificationIndex = (notificationIndex + 1) % notifications.length;

        // Atualizar contagem na primeira notificação
        if (notificationIndex === 0) {
          notifications[0].message = `${
            Math.floor(Math.random() * 16) + 8
          } pessoas visualizando agora`;
        }

        setCurrentNotification(notifications[notificationIndex]);
        setShowNotification(true);
      }, 1000);
    }, Math.random() * 4000 + 8000); // 8-12 segundos

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Handle form submission - VERSÃO CORRIGIDA
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validar dados obrigatórios
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // 1. TRACK FORM STARTED (intenção, não conversão)
      trackUserIntent("Form_Started", {
        content_name: "ELEV Park Sacomã II Lead Form",
        content_category: "Real Estate Form",
        form_type: "lead_capture",
      });

      // Preparar dados para envio
      const rdData = {
        name: formData.name,
        email: formData.email,
        mobile_phone: formData.phone,
        cf_interest_type: formData.interest,
        cf_source: "Landing Page ELEV Sacomã",
        cf_property_value: "250000",
        cf_campaign_source: "Facebook Ads",
        cf_lead_quality: "Hot Lead",
      };

      try {
        // 2. ENVIAR PARA O BANCO DE DADOS
        const leadResponse = await fetch(API_ENDPOINTS.LEAD_BACKUP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rdData),
        });

        // 3. ✅ CONVERSÃO CONFIRMADA - Só dispara eventos SE salvou no banco
        if (leadResponse.ok) {
          console.log("✅ Lead salvo no banco de dados - CONVERSÃO CONFIRMADA");

          // ✅ EVENTOS DE CONVERSÃO REAL (só após sucesso no banco)
          trackRealConversion("Lead", {
            content_name: "ELEV Park Sacomã II - " + formData.interest,
            content_category: "Real Estate Lead",
            value: 1,
            currency: "BRL",
            predicted_ltv: 250000,
          });

          trackRealConversion("CompleteRegistration", {
            content_name: "ELEV Lead Registration",
            status: "completed",
            value: 1,
          });

          // ✅ CONVERSÃO CUSTOMIZADA CONFIRMADA
          trackCustomConversion("Form_Submit_Success", {
            property_name: "ELEV Park Sacomã II",
            lead_type: formData.interest,
            contact_method: "landing_page_form",
            conversion_status: "database_confirmed",
            lead_email: formData.email,
          });

          // ⚠️ REMOVIDO: Facebook Pixel direto para evitar duplicação
          // Os eventos Facebook serão disparados apenas na página /obrigado
          console.log(
            "📄 Redirecionando para página de obrigado para eventos finais..."
          );

          // Mensagem de sucesso e redirecionamento para página de obrigado
          const params = new URLSearchParams({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            interest: formData.interest,
          });

          // Mostrar notificação de sucesso antes do redirecionamento
          setCurrentNotification({
            type: "success",
            message: "✅ Dados enviados! Redirecionando...",
            icon: "🎉",
          });
          setShowNotification(true);

          // Redirecionar após 2 segundos
          setTimeout(() => {
            window.location.href = `/obrigado?${params.toString()}`;
          }, 2000);
        } else {
          // ❌ FALHA NO BANCO - NÃO é conversão
          console.warn("❌ Erro ao salvar lead no banco de dados");

          trackUserIntent("Form_Submit_Failed", {
            error_type: "Database Error",
            status: "failed",
            lead_email: formData.email,
          });

          alert(
            "⚠️ Houve um problema ao enviar seus dados. Tente novamente ou entre em contato via WhatsApp."
          );
        }
      } catch (error) {
        // ❌ ERRO TÉCNICO - NÃO é conversão
        console.warn("❌ Erro técnico ao salvar lead:", error);

        trackUserIntent("Form_Submit_Failed", {
          error_type: "Network Error",
          status: "failed",
          lead_email: formData.email,
        });

        if (process.env.NODE_ENV === "development") {
          // Em desenvolvimento, simular sucesso para testes
          alert(
            "✅ Formulário funcionando!\n\n⚠️ APIs não disponíveis em desenvolvimento.\n\n🚀 Em produção, tudo funcionará automaticamente!"
          );

          setFormData({
            name: "",
            email: "",
            phone: "",
            interest: "1 dormitório",
          });
        } else {
          alert(
            "⚠️ Houve um problema técnico. Tente novamente ou entre em contato via WhatsApp."
          );
        }
      }
    },
    [
      formData,
      setFormData,
      trackRealConversion,
      trackCustomConversion,
      trackUserIntent,
    ]
  );

  // WhatsApp click tracking function - VERSÃO CORRIGIDA
  const handleWhatsAppClick = useCallback(() => {
    // WhatsApp é uma intenção de contato, NÃO uma conversão confirmada
    trackUserIntent("WhatsApp_Click", {
      content_name: "ELEV Park Sacomã II WhatsApp Contact",
      content_category: "Contact Intent",
      contact_method: "WhatsApp",
      engagement_level: "high_intent",
    });

    // Enhanced WhatsApp tracking (intenção, não conversão)
    if (typeof window !== "undefined" && window.fbq) {
      // Track como iniciativa de contato (não como Lead confirmado)
      window.fbq("track", "InitiateCheckout", {
        content_name: "ELEV Park Sacomã II WhatsApp Contact",
        content_category: "Real Estate Contact",
        value: 1,
        currency: "BRL",
      });

      // Custom event para interesse demonstrado
      window.fbq("trackCustom", "WhatsApp_Contact_Intent", {
        property_name: "ELEV Park Sacomã II",
        contact_method: "WhatsApp",
        user_engagement: "high_intent",
        action_type: "external_contact",
        timestamp: new Date().toISOString(),
      });
    }
  }, [trackUserIntent]);

  // Function to open WhatsApp with personalized message and enhanced tracking
  const openWhatsApp = useCallback(
    (customMessage?: string) => {
      // Mensagens dinâmicas baseadas na hora e contexto
      const hora = new Date().getHours();
      let saudacao = "Olá!";

      if (hora >= 6 && hora < 12) saudacao = "Bom dia!";
      else if (hora >= 12 && hora < 18) saudacao = "Boa tarde!";
      else if (hora >= 18 || hora < 6) saudacao = "Boa noite!";

      const defaultMessage =
        customMessage ||
        `${saudacao} 👋\n\nVi o site do ELEV Park Sacomã II e gostaria de saber mais sobre:\n\n🏠 Apartamentos com entrada FGTS\n💰 Condições especiais\n📍 Localização no Sacomã\n\nPoderia me ajudar?`;

      const whatsappMessage = encodeURIComponent(defaultMessage);

      handleWhatsAppClick();
      window.open(
        `https://wa.me/5511960225753?text=${whatsappMessage}`,
        "_blank"
      );
    },
    [handleWhatsAppClick]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  // Memoize static data for better performance
  const locationBenefits = useMemo(
    () => [
      {
        icon: Car,
        color: "text-blue-600",
        title: "Transporte",
        items: [
          "Estação Sacomã - 3 min",
          "Rod. Anchieta - 10 min",
          "Av. Nazaré - 7 min",
        ],
      },
      {
        icon: TreePine,
        color: "text-green-600",
        title: "Lazer",
        items: [
          "SESC Ipiranga - 6 min",
          "Aquário de SP - 7 min",
          "Parque Independência - 7 min",
        ],
      },
      {
        icon: Shield,
        color: "text-red-600",
        title: "Saúde",
        items: [
          "Hospital Ipiranga - 7 min",
          "Hospital São Camilo - 8 min",
          "UBS próxima - 5 min",
        ],
      },
      {
        icon: Building,
        color: "text-purple-600",
        title: "Educação",
        items: [
          "Fatec Ipiranga - 4 min",
          "Univ. São Camilo - 4 min",
          "Escolas públicas próximas",
        ],
      },
    ],
    []
  );

  const changeTestimonial = useCallback((index: number) => {
    setCurrentTestimonial(index);
  }, []);

  // Handlers de navegação otimizados
  const scrollToForm = useCallback(() => {
    document
      .getElementById("form-section")
      ?.scrollIntoView({ behavior: "smooth" });

    // Mostrar notificação especial quando usuário vai para o formulário
    setTimeout(() => {
      setCurrentNotification({
        type: "form",
        message: "🎯 Última etapa para garantir seu apartamento!",
        icon: "🏠",
      });
      setShowNotification(true);
    }, 1500);
  }, []);

  const scrollToInvestment = useCallback(() => {
    document
      .getElementById("investment")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToSuite = useCallback(() => {
    document
      .getElementById("suite-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleShowVideo = useCallback(() => {
    setShowVideo(true);
  }, []);

  const handleHideVideo = useCallback(() => {
    setShowVideo(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Facebook Pixel and Meta Tags would go in document head */}

      {/* WhatsApp Floating Button - VERSÃO MELHORADA */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse animation mais atrativa */}
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-0 bg-green-300 rounded-full animate-pulse opacity-20"></div>

          {/* Preview de mensagem flutuante */}
          <div className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-2xl p-4 max-w-xs transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Fernanda - Consultora
                </div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online agora
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-gray-700">
              &ldquo;Olá! 👋 <br />
              Apartamentos com <strong>entrada FGTS</strong> disponíveis! <br />
              <span className="text-green-600">
                💰 Condições especiais hoje!
              </span>
              &rdquo;
            </div>
            {/* Seta apontando para o botão */}
            <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
          </div>

          <a
            href="https://wa.me/5511960225753?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Apartamento%20no%20Sacomã%20"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openWhatsApp();
            }}
            className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 md:px-6 md:py-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 group animate-bounce hover:animate-none"
            title="Fale conosco no WhatsApp - Resposta em até 5min!"
          >
            <MessageCircle size={28} className="animate-pulse" />
            <div className="hidden md:flex flex-col items-start">
              <span className="font-bold text-base">Fale Conosco</span>
              <span className="text-xs opacity-90">Resposta em 5min</span>
            </div>

            {/* Badge de desconto */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              PROMO
            </div>

            {/* Tooltip melhorado para mobile */}
            <div className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none md:hidden shadow-xl">
              <div className="font-medium">💬 WhatsApp</div>
              <div className="text-xs opacity-80">Consultoria gratuita</div>
              {/* Seta do tooltip */}
              <div className="absolute top-1/2 right-[-4px] w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2"></div>
            </div>
          </a>
        </div>
      </div>

      {/* Sistema de Notificações Push - Social Proof */}
      {showNotification && (
        <div className="fixed top-6 left-6 z-40 max-w-sm">
          <div
            className={`
            bg-white rounded-lg shadow-2xl border-l-4 border-blue-500 p-4 
            transform transition-all duration-500 ease-out
            ${
              showNotification
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }
          `}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{currentNotification.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {currentNotification.message}
                </div>
                {currentNotification.type === "viewer" && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">Online agora</span>
                  </div>
                )}
                {currentNotification.type === "urgency" && (
                  <div className="text-xs text-red-600 font-medium mt-1">
                    ⏰ Oferta limitada
                  </div>
                )}
                {currentNotification.type === "conversion" && (
                  <div className="text-xs text-green-600 font-medium mt-1">
                    🎉 Novo interesse
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contador de Visualizadores - Canto Superior Direito */}
      <div className="fixed top-6 right-6 z-40 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Eye size={16} className="text-blue-500" />
            <span className="font-bold text-gray-900">{viewersCount}</span>
          </div>
          <span className="text-gray-600">visualizando</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative container mx-auto px-4 pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-orange-400 font-semibold">
                  <MapPin size={20} />
                  <span>3 minutos da Estação Sacomã</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Sua <span className="text-orange-400">Nova Vida</span>
                  <br />
                  Começa Aqui
                </h1>

                <p className="text-xl lg:text-2xl text-blue-100">
                  Apartamentos de 1 e 2 dormitórios no coração do Sacomã
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-green-600 px-4 py-2 rounded-full font-semibold">
                    ✓ Sem Entrada
                  </div>
                  <div className="bg-green-600 px-4 py-2 rounded-full font-semibold">
                    ✓ Use seu FGTS
                  </div>
                  <div className="bg-green-600 px-4 py-2 rounded-full font-semibold">
                    ✓ Escritura Grátis
                  </div>
                </div>
              </div>

              {/* Three CTA Buttons for Different Audiences */}
              <div className="space-y-4">
                <button
                  onClick={scrollToForm}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  🏠 PRIMEIRA CASA PRÓPRIA - Cadastre-se
                </button>

                <button
                  onClick={scrollToInvestment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  📈 INVESTIMENTO GARANTIDO - Saiba Mais
                </button>

                <button
                  onClick={scrollToSuite}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  👨‍👩‍👧‍👦 APARTAMENTO COM SUÍTE - Ver Planta
                </button>

                {/* WhatsApp CTA - Urgência */}
                <button
                  onClick={() =>
                    openWhatsApp(
                      "🚀 URGENTE! Vi as condições especiais no site e quero garantir minha unidade com entrada FGTS. Ainda há apartamentos disponíveis?"
                    )
                  }
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg border-2 border-green-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <MessageCircle size={24} />
                    <div className="text-left">
                      <div className="text-lg">💬 ATENDIMENTO DIRETO</div>
                      <div className="text-sm opacity-90">
                        Tire suas dúvidas agora mesmo
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <Users size={16} />
                <span>
                  Mais de 1.200 unidades | Trisul - 40 anos de confiança
                </span>
              </div>
            </div>

            {/* Right Column - Video/Form */}
            <div className="space-y-6">
              {/* Video Section */}
              <div className="relative">
                {!showVideo ? (
                  <ImageManager.HeroVideo onPlay={handleShowVideo} />
                ) : (
                  <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                    {!videoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl">
                        <div className="text-white text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                          <p>Carregando vídeo...</p>
                        </div>
                      </div>
                    )}
                    <video
                      src="/videos/elev-park-sacoma-conceito.mp4"
                      controls
                      muted
                      loop
                      playsInline
                      className="w-full h-64"
                      onLoadedData={() => setVideoLoaded(true)}
                      onError={(e) => {
                        console.warn(
                          "⚠️ Erro ao carregar vídeo (pode ser normal em desenvolvimento):",
                          e
                        );
                        setTimeout(() => {
                          setShowVideo(false);
                          setVideoLoaded(false);
                        }, 1000);
                      }}
                    >
                      Seu navegador não suporta vídeo HTML5.
                    </video>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={handleHideVideo}
                        className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-300"
                        title="Fechar vídeo"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Form */}
              <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl p-6 shadow-2xl text-gray-800">
                <h3 className="text-2xl font-bold text-center mb-4 text-blue-900">
                  Receba Todas as Informações
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp com DDD"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="primeira-compra">
                      🏠 Primeira casa própria
                    </option>
                    <option value="investimento">📈 Investimento</option>
                    <option value="upgrade">👨‍👩‍👧‍👦 Upgrade familiar</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    QUERO RECEBER INFORMAÇÕES 🚀
                  </button>
                </form>
                <p className="text-center text-xs text-gray-600 mt-3">
                  Seus dados estão seguros conosco 🔒
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Localização que Faz a Diferença
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa a poucos minutos de casa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {locationBenefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className={`${benefit.color} mb-4 flex justify-center`}>
                    <IconComponent size={40} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    {benefit.title}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {benefit.items.map((item, itemIndex) => (
                      <p key={itemIndex}>{item}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Imagens de Localização */}
          <div className="grid md:grid-cols-2 gap-8">
            <ImageManager.LocationImage type="street" />
            <ImageManager.LocationImage type="station" />
          </div>
        </div>
      </section>

      {/* Primeira Casa Própria Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🏠 Sua{" "}
              <span className="text-green-600">Primeira Casa Própria</span> Está
              Aqui!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialmente pensado para jovens de 25 a 35 anos que querem sair
              do aluguel e conquistar a independência
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Por que é o momento ideal?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Pare de pagar aluguel
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Transforme o valor do aluguel na parcela da sua casa
                        própria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Use seu FGTS como entrada
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Não precisa ter dinheiro guardado para começar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Localização perfeita
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Perto do trabalho, faculdade e vida noturna
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Lazer de clube incluso
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Academia, piscina e área gourmet sem mensalidade
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4">💰 Simulação Real:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-90">Aluguel médio região:</p>
                    <p className="text-xl font-bold">R$ 1.800/mês</p>
                  </div>
                  <div>
                    <p className="opacity-90">Parcela ELEV:</p>
                    <p className="text-xl font-bold">R$ 1.299/mês*</p>
                  </div>
                </div>
                <p className="text-xs mt-4 opacity-75">
                  *Condições especiais para primeira compra
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🎯 Cadastro Primeira Casa Própria
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp com DDD"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <select
                    name="interest"
                    value="primeira-compra"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="primeira-compra">
                      🏠 Primeira casa própria
                    </option>
                    <option value="investimento">📈 Investimento</option>
                    <option value="upgrade">👨‍👩‍👧‍👦 Upgrade familiar</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    QUERO SAIR DO ALUGUEL AGORA! 🚀
                  </button>
                </form>
                <p className="text-center text-xs text-gray-600 mt-3">
                  Atendimento especializado para primeira compra 🏠
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Left Column - Text Content (3/5 width) */}
                  <div className="md:col-span-3">
                    <h4 className="font-bold text-yellow-800 mb-3">
                      ⚡ Condições Especiais Primeira Compra:
                    </h4>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <p>✓ Entrada com FGTS (sem desembolso)</p>
                      <p>✓ Parcelas menores que aluguel</p>
                      <p>✓ Escritura e ITBI grátis</p>
                      <p>✓ Assessoria jurídica inclusa</p>
                      <p>✓ Financiamento até 35 anos</p>
                    </div>
                  </div>

                  {/* Right Column - Logo Minha Casa Minha Vida (2/5 width) */}
                  <div className="md:col-span-2 flex justify-center items-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                      <ImageManager.LogoMinhaCasa
                        size={180}
                        className="drop-shadow-lg w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suite Section - Apartamentos com Suíte */}
      <section
        id="suite-section"
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              👨‍👩‍👧‍👦 <span className="text-purple-600">Apartamentos com Suíte</span>{" "}
              - Máximo Conforto
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfeito para casais e famílias que buscam privacidade e conforto
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  🏠 Apartamento 37m² com Suíte
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CheckCircle className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        2 Dormitórios + Suíte
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Quarto do casal com banheiro privativo e closet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CheckCircle className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Varanda Gourmet
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Espaço para churrasqueira e área de convivência
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CheckCircle className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Planta Otimizada
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Cada metro quadrado pensado para máximo aproveitamento
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CheckCircle className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Ideal para Famílias
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Privacidade para os pais e espaço para as crianças
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4">
                  💰 Simulação Apartamento com Suíte:
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-90">Apartamento similar região:</p>
                    <p className="text-xl font-bold">R$ 2.200/mês*</p>
                  </div>
                  <div>
                    <p className="opacity-90">Parcela ELEV 37m²:</p>
                    <p className="text-xl font-bold">R$ 1.899/mês*</p>
                  </div>
                </div>
                <p className="text-xs mt-4 opacity-75">
                  *Simulação com entrada via FGTS
                </p>
              </div>
            </div>

            <div className="space-y-6" id="plantas-section">
              {/* Carrossel de Plantas - MCMV */}
              <ImageManager.FloorPlanCarousel />

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🎯 Quero Ver a Planta da Suíte
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp com DDD"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <select
                    name="interest"
                    value="upgrade"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="primeira-compra">
                      🏠 Primeira casa própria
                    </option>
                    <option value="investimento">📈 Investimento</option>
                    <option value="upgrade">👨‍👩‍👧‍👦 Upgrade familiar</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    VER PLANTA APARTAMENTO COM SUÍTE! 🏠
                  </button>
                </form>
                <p className="text-center text-xs text-gray-600 mt-3">
                  Receba plantas e informações detalhadas 📐
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Left Column - Text Content (3/5 width) */}
                  <div className="md:col-span-3">
                    <h4 className="font-bold text-purple-800 mb-3">
                      ✨ Diferenciais da Suíte:
                    </h4>
                    <div className="space-y-2 text-sm text-purple-700">
                      <p>✓ Banheiro privativo com acabamentos premium</p>
                      <p>✓ Closet integrado ao quarto</p>
                      <p>✓ Janela com vista privilegiada</p>
                      <p>✓ Tomadas USB e pontos de internet</p>
                    </div>
                  </div>

                  {/* Right Column - Faixa 4 MCMV Logo (2/5 width) */}
                  <div className="md:col-span-2 flex justify-center items-center">
                    <div className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 flex items-center justify-center">
                      <ImageManager.LogoFaixa4MCMV
                        size={240}
                        className="drop-shadow-lg w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment Gallery Section - Apartamentos Decorados */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🏠 <span className="text-blue-600">Apartamentos Decorados</span> -
              Inspire-se
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como pode ser o seu novo lar. Ambientes planejados para
              máximo conforto e funcionalidade.
            </p>
          </div>

          <ImageManager.ApartmentGallery className="mb-12" />

          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                📐 Quer ver as plantas dos apartamentos?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Receba as plantas detalhadas e conheça todos os diferenciais dos
                nossos apartamentos
              </p>
              <button
                onClick={scrollToForm}
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                QUERO VER AS PLANTAS DETALHADAS! 📐
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leisure Complex */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Mais de 10.000m² de Lazer Completo
            </h2>
            <p className="text-xl text-gray-300">
              Um verdadeiro clube na sua casa
            </p>
          </div>

          {/* Galeria de Amenidades com Imagens Reais */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">
              Conheça nossos espaços
            </h3>
            <ImageManager.AmenitiesGallery />
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToForm}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              AGENDAR VISITA AO DECORADO 🏠
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Quem Comprou, Recomenda
            </h2>
            <p className="text-xl text-gray-600">
              Depoimentos reais de clientes satisfeitos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={24}
                    />
                  )
                )}
              </div>

              <blockquote className="text-xl text-gray-800 text-center mb-6 italic">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </blockquote>

              <div className="text-center">
                <p className="font-bold text-gray-800">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].unit}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trisul Company - Investment Section */}
      <section id="investment" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                📈 Investimento Garantido com a Trisul
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                A Trisul é uma das maiores construtoras do Brasil, com mais de
                60 mil unidades entregues e empresa de capital aberto na B3.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-green-400" size={24} />
                  <span className="text-lg">
                    Mais de 350 empreendimentos entregues
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-green-400" size={24} />
                  <span className="text-lg">
                    90% das unidades aprovadas na 1ª vistoria
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-green-400" size={24} />
                  <span className="text-lg">
                    Empresa listada na B3 desde 2007
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-green-400" size={24} />
                  <span className="text-lg">
                    Especialista no segmento econômico há 16 anos
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-800 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-orange-400">60K+</p>
                  <p className="text-sm text-blue-100">Unidades Entregues</p>
                </div>
                <div className="bg-blue-800 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-orange-400">40+</p>
                  <p className="text-sm text-blue-100">Anos de Mercado</p>
                </div>
                <div className="bg-blue-800 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-orange-400">350+</p>
                  <p className="text-sm text-blue-100">Empreendimentos</p>
                </div>
                <div className="bg-blue-800 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-orange-400">90%</p>
                  <p className="text-sm text-blue-100">Aprovação 1ª Vistoria</p>
                </div>
              </div>

              <div className="bg-blue-800 p-6 rounded-xl">
                <h4 className="font-bold mb-4">Premiações e Certificações</h4>
                <div className="space-y-2 text-sm text-blue-100">
                  <p>🏆 Top of Mind Imobiliário 2023</p>
                  <p>🏆 Prêmio Master Imobiliário</p>
                  <p>🏆 Certificação ISO 9001</p>
                  <p>🏆 PBQP-H - Programa Brasileiro de Qualidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Form Section */}
      <section
        id="form-section"
        className="py-20 bg-gradient-to-br from-orange-500 to-red-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Não Perca Esta Oportunidade Única!
            </h2>
            <p className="text-xl mb-8">
              Últimas unidades com condições especiais. Preencha o formulário e
              garante já a sua!
            </p>

            <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl p-8 shadow-2xl text-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp com DDD"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    required
                  />
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  >
                    <option value="primeira-compra">
                      🏠 Primeira casa própria
                    </option>
                    <option value="investimento">📈 Investimento</option>
                    <option value="upgrade">👨‍👩‍👧‍👦 Upgrade familiar</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  QUERO GARANTIR MINHA UNIDADE AGORA! 🚀
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-600" />
                  <span>Dados Protegidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle size={16} className="text-green-600" />
                  <span>Resposta Rápida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Sem Compromisso</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-lg font-semibold">
                ⚡ ÚLTIMAS HORAS com condições especiais!
              </p>
              <div className="flex justify-center space-x-8 text-sm">
                <div>✓ Sem Entrada</div>
                <div>✓ FGTS como Entrada</div>
                <div>✓ Escritura Grátis</div>
                <div>✓ Financiamento Facilitado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">
                Fernanda Martins - corretora de imóveis
              </h3>
              <p className="text-gray-300 mb-4">
                Seu novo lar a 3 minutos da Estação Sacomã, com lazer completo
                de clube e toda a credibilidade da Trisul.
              </p>
              {/* <div className="text-sm text-gray-400">
                <p>R. Malvina Ferrara Samarone, 270</p>
                <p>Sacomã - São Paulo/SP</p>
              </div> */}
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Apartamentos</h4>
              <div className="space-y-2 text-gray-300">
                <p>• 1 dorm + varanda - 25m²</p>
                <p>• 2 dorms - 32m²</p>
                <p>• 2 dorms + varanda - 34m²</p>
                <p>• 2 dorms + suíte + varanda - 37m²</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contato</h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5511960225753?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Apartamento%20no%20Sacomã%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp: (11) 96022-5753</span>
                </a>
                {/* <a
                  href="tel:1130000000"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Phone size={20} />
                  <span>Telefone: (11) 3000-0000</span>
                </a> */}
              </div>

              <div className="mt-6">
                <h5 className="font-semibold mb-2">Horário de Atendimento:</h5>
                <div className="text-sm text-gray-400">
                  <p>Segunda à Sexta: 8h às 18h</p>
                  <p>Sábados: 8h às 16h</p>
                  <p>Domingos: 9h às 16h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-sm text-gray-400">
                <p>© 2025 - Todos os direitos reservados</p>
                <p>CRECI: 261788F</p>
              </div>
              <div className="text-sm text-gray-400 md:text-right">
                <p>
                  <a
                    href="https://github.com/RobertoSilvaDevFullStack/RobertoSilvaDevFullStack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Desenvolvedor: <strong>Roberto Silva</strong>
                  </a>
                </p>
                <p>Hospedagem: Hostinger | Integração: RD Station</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Otimização: adicionar displayName para melhor debugging
ElevSacomaLanding.displayName = "ElevSacomaLanding";

export default ElevSacomaLanding;
