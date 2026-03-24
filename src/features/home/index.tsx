import HeroSection from "./components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import CompanyIntro from "./components/CompanyIntro";
import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import MaterialsSection from "./components/MaterialsSection";
import BlogPreview from "./components/BlogPreview";
import Testimonials from "./components/Testimonials";
import CtaBanner from "./components/CtaBanner";

export default function HomeContainer() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CompanyIntro />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyChooseUs />
      <MaterialsSection />
      <BlogPreview />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
