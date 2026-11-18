import HeroSection from "./components/HeroSection";
import CompanyIntro from "./components/CompanyIntro";
import CategoryShowcase from "./components/CategoryShowcase";
import WhyChooseUs from "./components/WhyChooseUs";
import ReadyToWorkTogether from "./components/ReadyToWorkTogether";
import HomeContactSection from "./components/HomeContactSection";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";

export default function HomePage() {
  return (
    <>
      <SEO
        title="DHT Furniture Vietnam | Your Direct Manufacturing Partner in Vietnam"
        description="DHT Furniture Vietnam provides direct access to our family-owned manufacturing group of 11 facilities in Vietnam, specialising in outdoor, indoor, office and project furniture, and wood panels."
        image="/img/pdf-guide/home/brand-dht-factory.jpg"
      />
      <Schema
        id="schema-breadcrumbs-home"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dhtcompany.com",
            },
          ],
        }}
      />
      <HeroSection />
      <CompanyIntro />
      <CategoryShowcase />
      <WhyChooseUs />
      <ReadyToWorkTogether />
      <HomeContactSection />
    </>
  );
}
