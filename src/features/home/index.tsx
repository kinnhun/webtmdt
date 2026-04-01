import HeroSection from "./components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import CompanyIntro from "./components/CompanyIntro";
import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";

export default function HomeContainer() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CompanyIntro />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyChooseUs />
    </>
  );
}
