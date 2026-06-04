import HeroSection from "./components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import CompanyIntro from "./components/CompanyIntro";
import FactoryVideoSection from "./components/FactoryVideoSection";
import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import MaterialsSection from "./components/MaterialsSection";
import ReadyToWorkTogether from "./components/ReadyToWorkTogether";
export default function HomeContainer() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CompanyIntro />
      <FactoryVideoSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyChooseUs />
      <MaterialsSection />
      <ReadyToWorkTogether />
    </>
  );
}
