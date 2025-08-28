import Head from 'next/head'
import ElevSacomaLanding from '../elev_sacoma_landing'

export default function Home() {
  return (
    <>
      <Head>
        <title>ELEV Park Sacomã II - Apartamentos com Entrada FGTS | Sua Nova Vida Começa Aqui</title>
        <meta name="description" content="Apartamentos 1 e 2 dormitórios no Sacomã com entrada FGTS. Localização privilegiada, lazer completo e condições especiais. Financiamento em até 35 anos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elevparkSacoma.com.br/" />
        <meta property="og:title" content="ELEV Park Sacomã II - Apartamentos com Entrada FGTS" />
        <meta property="og:description" content="Apartamentos 1 e 2 dormitórios no Sacomã com entrada FGTS. Localização privilegiada, lazer completo e condições especiais." />
        <meta property="og:image" content="https://elevparkSacoma.com.br/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://elevparkSacoma.com.br/" />
        <meta property="twitter:title" content="ELEV Park Sacomã II - Apartamentos com Entrada FGTS" />
        <meta property="twitter:description" content="Apartamentos 1 e 2 dormitórios no Sacomã com entrada FGTS. Localização privilegiada, lazer completo e condições especiais." />
        <meta property="twitter:image" content="https://elevparkSacoma.com.br/og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "ELEV Park Sacomã II",
              "description": "Apartamentos 1 e 2 dormitórios no Sacomã com entrada FGTS",
              "url": "https://elevparkSacoma.com.br",
              "telephone": "+55-11-99999-9999",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Sacomã",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "04140-000",
                "addressCountry": "BR"
              },
              "offers": {
                "@type": "Offer",
                "description": "Apartamentos com entrada FGTS e financiamento em até 35 anos",
                "priceRange": "A partir de R$ 280.000",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </Head>
      <ElevSacomaLanding />
    </>
  )
}