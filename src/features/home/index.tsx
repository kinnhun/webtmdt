import HeroSection from "./components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import CompanyIntro from "./components/CompanyIntro";
import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import MaterialsSection from "./components/MaterialsSection";
import ReadyToWorkTogether from "./components/ReadyToWorkTogether";
import type { HomePageProps } from "@/types/product";

export default function HomeContainer({ initialFeaturedProducts }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CompanyIntro />
      <CategoryShowcase />
      <FeaturedProducts initialProducts={initialFeaturedProducts} />
      <WhyChooseUs />
      <MaterialsSection />
      <ReadyToWorkTogether />
    </>
  );
}
