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
        title={t("catalogue.outdoor.seo.title", "Outdoor Furniture Collections | DHT Furniture Vietnam")}
        description={t("catalogue.outdoor.seo.description", "Explore outdoor furniture in FSC-certified wood, aluminium, steel, rope, wicker and mixed-material combinations. DHT supports dining, lounge, balcony, sunlounger and modular programmes.")}
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

