import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";

const CatalogueContainer = dynamic(
  () => import("@/features/catalogue/components/CatalogueContainer"),
  { ssr: false }
);

export default function CataloguePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const tr = (key: string, defaultVal: string) =>
    t(key, { defaultValue: defaultVal, lng: router.locale });

  return (
    <>
      <SEO
        title={tr("catalogue.seo.title", "Furniture Collections | DHT Furniture Vietnam")}
        description={tr(
          "catalogue.seo.description",
          "Explore our diverse range of outdoor, indoor and project furniture, supported by a network of 11 specialised manufacturing facilities across Vietnam."
        )}
        image="/img/WhyDHT.png"
      />
      <Schema
        id="schema-breadcrumbs-catalogue"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: tr("nav.home", "Home"),
              item: "https://dhtcompany.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: tr("nav.collections", "Collections"),
              item: "https://dhtcompany.com/catalogue",
            },
          ],
        }}
      />
      <CatalogueContainer />
    </>
  );
}
