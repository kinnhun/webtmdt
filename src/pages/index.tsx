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
        id="schema-website"
        type="WebSite"
        data={{
          name: "DHT Furniture Vietnam",
          alternateName: "DHT Furniture Vietnam JSC",
          url: "https://dhtcompany.com",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://dhtcompany.com/catalogue?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Schema 
        id="schema-localbusiness"
        type="LocalBusiness"
        data={{
          name: "DHT Furniture Vietnam",
          image: "https://dhtcompany.com/img/logo.png",
          telephone: "+84 932 058 545",
          email: "sales@dhtcompany.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "72 Le Thanh Ton, Ben Nghe Ward, District 1",
            addressLocality: "Ho Chi Minh City",
            addressRegion: "Ho Chi Minh City",
            addressCountry: "VN",
          },
          url: "https://dhtcompany.com",
          priceRange: "$$$",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "08:00",
              closes: "17:30",
            },
          ],
        }}
      />
      <HomeContainer />
    </>
  );
}
