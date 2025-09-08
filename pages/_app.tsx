import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import FacebookPixelOptimized from "../components/FacebookPixelOptimized";

export default function App({ Component, pageProps }: AppProps) {
  // ID do Pixel do Facebook - Código oficial Meta
  const FACEBOOK_PIXEL_ID =
    process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "669854672792093";

  return (
    <>
      <Head>
        <title>ELEV Park Sacomã II - Apartamentos MCMV</title>
        <meta
          name="description"
          content="Apartamentos a 3 min da Estação Sacomã com entrada via FGTS. Plantas de 25m² a 37m² com suíte. Financiamento facilitado Minha Casa Minha Vida."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elevparksacoma.com.br/" />
        <meta
          property="og:title"
          content="ELEV Park Sacomã II - Apartamentos MCMV"
        />
        <meta
          property="og:description"
          content="Apartamentos a 3 min da Estação Sacomã com entrada via FGTS. Plantas de 25m² a 37m² com suíte."
        />
        <meta property="og:image" content="/images/hero/FACHADA_P2.webp" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://elevparksacoma.com.br/" />
        <meta
          property="twitter:title"
          content="ELEV Park Sacomã II - Apartamentos MCMV"
        />
        <meta
          property="twitter:description"
          content="Apartamentos a 3 min da Estação Sacomã com entrada via FGTS."
        />
        <meta property="twitter:image" content="/images/hero/FACHADA_P2.webp" />
      </Head>

      {/* Facebook Pixel Otimizado - NOVA VERSÃO */}
      <FacebookPixelOptimized pixelId={FACEBOOK_PIXEL_ID} />

      <Component {...pageProps} />
    </>
  );
}
