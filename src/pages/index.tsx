import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { useTranslation } from "react-i18next";
import HomeContainer from "@/features/home";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t("home.seo.title")} description={t("home.seo.description")} />
      <Schema 
        type="LocalBusiness"
        data={{
          name: "DHT Company (nemark)",
          image: "https://dhtcompany.com/img/logo-no-text.png",
          telephone: "+84 902 907 399",
          address: {
            "@type": "PostalAddress",
            streetAddress: "19 National Highway, Nguyen Hue Ward, Phuoc Loc",
            addressLocality: "Tuy Phuoc District",
            addressRegion: "Binh Dinh Province",
            addressCountry: "VN"
          },
          url: "https://dhtcompany.com",
          priceRange: "$$$"
        }}
      />
      <HomeContainer />
    </>
  );
}
