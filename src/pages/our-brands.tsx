import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Armchair,
  Sofa,
  Briefcase,
  Building2,
  Layers,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { BrandLogo } from "@/components/ui/BrandLogos";
import type { BrandId } from "@/types/dht.types";

type OurBrandCardItem = {
  id: BrandId;
  specialty: string;
  description: string;
  image: string;
  ctaLabel: string;
};

type ProductCapabilityItem = {
  title: string;
  href: string;
  icon: "outdoor" | "indoor" | "office" | "project" | "panels";
};

const OUR_BRAND_CARDS: OurBrandCardItem[] = [
  {
    id: "DHT",
    specialty: "Outdoor Furniture",
    description:
      "Dining, lounge, sunloungers and mixed-material outdoor collections.",
    image: "/img/pdf-guide/brands/card-dht.jpg",
    ctaLabel: "Request DHT Catalogue",
  },
  {
    id: "JAGER",
    specialty: "Indoor Furniture",
    description:
      "Residential indoor furniture and custom product development.",
    image: "/img/pdf-guide/brands/card-jager.jpg",
    ctaLabel: "Request JAGER Catalogue",
  },
  {
    id: "THE ONE",
    specialty: "Project & Office Furniture",
    description:
      "Commercial, office and hospitality furniture for diverse projects.",
    image: "/img/pdf-guide/brands/card-theone.jpg",
    ctaLabel: "Request THE ONE Catalogue",
  },
  {
    id: "MEKONG",
    specialty: "Wood Panels & Processing",
    description:
      "Engineered wood panels and primary timber processing.",
    image: "/img/pdf-guide/brands/card-mekong.jpg",
    ctaLabel: "Request MEKONG Catalogue",
  },
];

const PRODUCT_CAPABILITIES: ProductCapabilityItem[] = [
  {
    title: "Outdoor\nFurniture",
    href: "/catalogue?brand=DHT",
    icon: "outdoor",
  },
  {
    title: "Indoor\nFurniture",
    href: "/catalogue?brand=JAGER",
    icon: "indoor",
  },
  {
    title: "Office\nFurniture",
    href: "/catalogue?brand=THE%20ONE",
    icon: "office",
  },
  {
    title: "Project\nSolutions",
    href: "/catalogue?brand=THE%20ONE",
    icon: "project",
  },
  {
    title: "Wood Panels\n& Components",
    href: "/catalogue?brand=MEKONG",
    icon: "panels",
  },
];

function CapabilityIcon({ name }: { name: ProductCapabilityItem["icon"] }) {
  if (name === "outdoor") return <Armchair size={34} className="text-[#C88A36]" strokeWidth={1.5} />;
  if (name === "indoor") return <Sofa size={34} className="text-[#C88A36]" strokeWidth={1.5} />;
  if (name === "office") return <Briefcase size={34} className="text-[#C88A36]" strokeWidth={1.5} />;
  if (name === "project") return <Building2 size={34} className="text-[#C88A36]" strokeWidth={1.5} />;
  return <Layers size={34} className="text-[#C88A36]" strokeWidth={1.5} />;
}

export default function OurBrandsPage() {
  return (
    <>
      <SEO
        title="Our Brands | DHT, JAGER, THE ONE & MEKONG | DHT Furniture Vietnam"
        description="Explore outdoor, indoor, office and project furniture, and wood panel capabilities from our family-owned manufacturing group in Vietnam: DHT, JAGER, THE ONE, and MEKONG."
        canonical="https://dhtcompany.com/our-brands"
        image="/img/pdf-guide/brands/hero-factory-theone.jpg"
      />
      <Schema
        id="schema-breadcrumbs-brands"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Our Brands",
              item: "https://dhtcompany.com/our-brands",
            },
          ],
        }}
      />

      <main className="bg-[#FAF8F3] text-[#0E241B] pt-16 lg:pt-[72px]">
        {/* ── 1. HERO VIDEO BANNER (Clip MEKONG — Page 3 PDF) ── */}
        <section className="relative min-h-[420px] lg:min-h-[470px] flex items-center bg-[#0C2118] text-white overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/pdf-guide/home/brand-mekong-factory.jpg?v=2"
              className="w-full h-full object-cover"
            >
              <source src="/video/mekong-factory.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #0C2118 0%, rgba(12, 33, 24, 0.85) 35%, rgba(12, 33, 24, 0.2) 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-6 lg:px-10 py-14 lg:py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[1.5px] w-7 bg-[#D89B3C]" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                  OUR BRANDS
                </span>
              </div>

              <h1
                className="font-display font-bold text-white leading-[1.12] mb-4"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
              >
                Four Specialised Brands.
                <br />
                One Manufacturing Group.
              </h1>

              <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed mb-8">
                Explore outdoor, indoor, office and project furniture, and wood panel capabilities
                from our family-owned manufacturing group in Vietnam.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#brands-showcase"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E2AA4F] to-[#C88A36] text-[#0E241B] font-body text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-md"
                >
                  <span>Explore Our Brands</span>
                  <ArrowDown size={15} />
                </a>

                <Link
                  href="/contact?inquiry=catalogue#smart-contact-form"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/35 hover:bg-black/55 text-white border border-white/45 font-body text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs"
                >
                  <span>Request Collection Access</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. FOUR COMPLEMENTARY BRANDS (4 Dark-Green Brand Cards) ── */}
        <section id="brands-showcase" className="py-16 lg:py-20 border-b border-black/5">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="h-[1.5px] w-7 bg-[#B97846]" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#B97846]">
                    OUR BRANDS
                  </span>
                </div>
                <h2
                  className="font-display font-bold text-[#0E241B] leading-[1.14]"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  Four Complementary Brands.
                  <br />
                  A Complete Furniture Offering.
                </h2>
              </div>

              <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[#D8D0C1]">
                <p className="font-body text-sm sm:text-base text-[#2D3732] leading-relaxed">
                  From outdoor and indoor furniture to office, project solutions and wood panels,
                  our four brands work together to serve diverse market needs worldwide.
                </p>
              </div>
            </div>

            {/* 4 Luxury Brand Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {OUR_BRAND_CARDS.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group rounded-2xl overflow-hidden bg-[#0E241B] text-white border border-[#C88A36]/25 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Top Product Image with Bottom Gradient into Card Body */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                      <img
                        src={card.image}
                        alt={`${card.id} — ${card.specialty}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(14, 36, 27, 0) 40%, rgba(14, 36, 27, 0.92) 90%, #0E241B 100%)",
                        }}
                      />
                      {/* Official Brand Logo Positioned Over Bottom-Left of Photo */}
                      <div className="absolute bottom-3 left-5">
                        <BrandLogo brand={card.id} variant="light" />
                      </div>
                    </div>

                    {/* Text Body */}
                    <div className="px-5 pt-2 pb-5">
                      <h3 className="font-body font-bold text-base sm:text-lg text-white mb-2">
                        {card.specialty}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="px-4 pb-4">
                    <Link
                      href={`/contact?inquiry=catalogue&brand=${encodeURIComponent(
                        card.id
                      )}#smart-contact-form`}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#0A1B14] hover:bg-[#C88A36] text-white hover:text-[#0E241B] border border-[#C88A36]/60 font-body text-xs font-bold flex items-center justify-between transition-all"
                    >
                      <span className="inline-flex items-center gap-2">
                        <BookOpen size={14} className="text-[#E5B869] group-hover:text-current" />
                        <span>{card.ctaLabel}</span>
                      </span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. PRODUCT CAPABILITIES (5 Spaces Icon Grid) ── */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="h-[1.5px] w-7 bg-[#B97846]" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#B97846]">
                    PRODUCT CAPABILITIES
                  </span>
                </div>
                <h2
                  className="font-display font-bold text-[#0E241B] leading-[1.14]"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  Furniture Solutions
                  <br />
                  for Multiple Spaces.
                </h2>
              </div>

              <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[#D8D0C1]">
                <p className="font-body text-sm sm:text-base text-[#2D3732] leading-relaxed">
                  A broad product scope, flexible materials and manufacturing capabilities to meet
                  the needs of global markets.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 py-4">
              {PRODUCT_CAPABILITIES.map((cap, idx) => (
                <Link
                  key={cap.title}
                  href={cap.href}
                  className={`group flex flex-col items-center text-center px-4 py-3 transition-transform hover:-translate-y-1 ${idx > 0 ? "lg:border-l lg:border-[#E2DACB]" : ""
                    }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#F3EDE0] border border-[#E2D6C1] group-hover:border-[#C88A36] flex items-center justify-center mb-3.5 shadow-xs transition-colors">
                    <CapabilityIcon name={cap.icon} />
                  </div>
                  <span className="font-body font-bold text-sm sm:text-base text-[#0E241B] group-hover:text-[#B97846] whitespace-pre-line leading-snug transition-colors">
                    {cap.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. PRIVATE COLLECTION ACCESS BANNER (Hình 45 Bottom) ── */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="rounded-2xl bg-gradient-to-r from-[#0E261C] via-[#133225] to-[#0E261C] text-white p-7 sm:p-10 shadow-xl border border-[#C88A36]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#D89B3C]/15 border border-[#D89B3C]/40 flex items-center justify-center shrink-0">
                  <Layers size={30} className="text-[#E5B869]" strokeWidth={1.6} />
                </div>
                <div>
                  <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#E5B869] block mb-1">
                    PRIVATE COLLECTION ACCESS
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Request Our Collections
                  </h3>
                </div>
              </div>

              <div className="hidden lg:block h-12 w-px bg-white/15" />

              <p className="font-body text-xs sm:text-sm text-white/85 max-w-md text-center lg:text-left leading-relaxed">
                Access selected catalogues and curated collections based on your market needs and
                project requirements.
              </p>

              <Link
                href="/contact?inquiry=catalogue#smart-contact-form"
                className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E2AA4F] to-[#C88A36] text-[#0E241B] font-body text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-md"
              >
                <span>Request Collection Access</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
