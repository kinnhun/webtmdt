import Head from "next/head";
import { useRouter } from "next/router";
import Schema from "./Schema";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const siteName = "DHT Company (nemark)";
const defaultImage = "https://dhtcompany.com/img/logo-no-text.png";

export default function SEO({ title, description, image, url }: SEOProps) {
  const router = useRouter();
  const locale = router.locale || "en-US";
  const isVi = locale === "vi-VN";

  const defaultDescriptionEn = "Premium Ecommerce Solutions - DHT Company brings you the best luxury furnitures and home decor elements.";
  const defaultDescriptionVi = "Giải pháp Thương mại điện tử Cao cấp - DHT Company mang đến cho bạn các sản phẩm nội thất sang trọng và tinh tế nhất.";

  const defaultTitle = isVi ? "DHT Company - Giải pháp toàn diện" : "DHT Company - Luxury Furniture";
  const defaultDesc = isVi ? defaultDescriptionVi : defaultDescriptionEn;

  const finalTitle = title ? `${title} | DHT Company` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalImage = image || defaultImage;
  const currentUrl = url || `https://dhtcompany.com${router.asPath}`;

  return (
    <>
    <Head>
      <title>{finalTitle}</title>
      <meta key="description" name="description" content={finalDesc} />

      {/* Open Graph */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:locale" property="og:locale" content={isVi ? "vi_VN" : "en_US"} />
      <meta key="og:url" property="og:url" content={currentUrl} />
      <meta key="og:site_name" property="og:site_name" content={siteName} />
      <meta key="og:title" property="og:title" content={finalTitle} />
      <meta key="og:description" property="og:description" content={finalDesc} />
      <meta key="og:image" property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@dhtcompany" />
      <meta key="twitter:title" name="twitter:title" content={finalTitle} />
      <meta key="twitter:description" name="twitter:description" content={finalDesc} />
      <meta key="twitter:image" name="twitter:image" content={finalImage} />

      {/* hreflang for multi-language SEO indexing */}
      <link key="alt-en" rel="alternate" hrefLang="en" href={`https://dhtcompany.com/en-US${router.asPath}`} />
      <link key="alt-vi" rel="alternate" hrefLang="vi" href={`https://dhtcompany.com/vi-VN${router.asPath}`} />
      <link key="alt-default" rel="alternate" hrefLang="x-default" href={`https://dhtcompany.com${router.asPath}`} />
      
      
      {/* Canonical URL */}
      <link key="canonical" rel="canonical" href={currentUrl} />
    </Head>
    <Schema 
      type="Organization" 
      data={{
        name: siteName,
        url: "https://dhtcompany.com",
        logo: "https://dhtcompany.com/img/logo-no-text.png",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+84-902-907-399",
            contactType: "customer service",
            areaServed: ["US", "GB", "VN"],
            availableLanguage: ["en", "vi"]
          }
        ],
        sameAs: [
          "https://www.facebook.com/dhtcompany",
          "https://www.linkedin.com/company/dhtcompany"
        ]
      }}
    />
    </>
  );
}
