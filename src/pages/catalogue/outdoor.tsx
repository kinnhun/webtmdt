import dynamic from "next/dynamic";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { useTranslation } from "react-i18next";

const CatalogueContainer = dynamic(() => import("@/features/catalogue/components/CatalogueContainer"), { ssr: false });

export default function OutdoorCataloguePage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t("catalogue.outdoor.seo.title", "Outdoor Furniture Collection — Weatherproof Luxury | DHT Company")}
        description={t("catalogue.outdoor.seo.description", "Discover DHT Company's commercial outdoor furniture collection: weather-resistant teak, synthetic rattan, powder-coated aluminum loungers, and patio sets for luxury resorts and villas.")}
        image="/img/categories/outdoor.jpg"
      />
      <Schema 
        id="schema-breadcrumbs-outdoor"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dhtcompany.com"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Outdoor Furniture Collection",
              item: "https://dhtcompany.com/catalogue/outdoor"
            }
          ]
        }}
      />
      <CatalogueContainer forcedCollection="Outdoor" />
    </>
  );
}

