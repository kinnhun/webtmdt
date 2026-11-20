import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Factory,
  Handshake,
  Layers,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import type { EvolutionMilestone, BusinessModelPillar } from "@/types/dht.types";

type BuyerValueItem = {
  number: string;
  title: string;
  description: string;
};

const BUYER_VALUES: BuyerValueItem[] = [
  {
    number: "01",
    title: "Family-Owned Manufacturing",
    description: "Direct access to 11 production facilities in Vietnam.",
  },
  {
    number: "02",
    title: "OEM & Product Development",
    description:
      "From your ideas to production, with practical engineering and material solutions.",
  },
  {
    number: "03",
    title: "Quality & Export Management",
    description:
      "Consistent quality, reliable lead time and full export support to global markets.",
  },
];

const EVOLUTION_MILESTONES: EvolutionMilestone[] = [
  {
    year: "2016",
    logoSrc: "/img/pdf-guide/logos/evo-2016.png?v=2",
    title: "DHT Investment\nand Commercial",
    description: "Our foundation in investment\nand commercial activities.",
  },
  {
    year: "2022",
    logoSrc: "/img/pdf-guide/logos/evo-2022.png?v=2",
    title: "DHT Outdoor Furniture",
    description: "A dedicated focus on outdoor\nfurniture manufacturing\nand export.",
  },
  {
    year: "2025 – Present",
    logoSrc: "/img/logo.png",
    title: "DHT Furniture Vietnam",
    description:
      "A broader manufacturing and export\nidentity, representing our family-owned\ngroup of 11 production facilities.",
  },
];

const BUSINESS_MODEL_PILLARS: BusinessModelPillar[] = [
  {
    id: "commercial",
    title: "Commercial Partnership",
    description:
      "A dedicated point of contact for international buyers and long-term business relationships.",
    iconName: "handshake",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Access",
    description:
      "Direct access to specialised furniture production within our family-owned group.",
    iconName: "factory",
  },
  {
    id: "programme",
    title: "Programme Management",
    description:
      "Support across product development, quality assurance and export execution.",
    iconName: "layers",
  },
];

function PillarIcon({ name }: { name: BusinessModelPillar["iconName"] }) {
  if (name === "handshake") {
    return <Handshake size={46} className="text-[#DBA340] shrink-0" strokeWidth={1.6} />;
  }
  if (name === "factory") {
    return <Factory size={46} className="text-[#DBA340] shrink-0" strokeWidth={1.6} />;
  }
  return <Layers size={46} className="text-[#DBA340] shrink-0" strokeWidth={1.6} />;
}

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About DHT Furniture Vietnam | Family-Owned Manufacturing Group"
        description="DHT is a Vietnamese furniture manufacturer and exporter, operating as part of a family-owned furniture group with 11 production facilities across Vietnam."
        canonical="https://dhtcompany.com/about"
        image="/img/pdf-guide/about/about-hero-poster.jpg"
      />
      <Schema
        id="schema-breadcrumbs-about"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dhtcompany.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About DHT",
              item: "https://dhtcompany.com/about",
            },
          ],
        }}
      />

      <main className="bg-[#FAF8F3] text-[#132A1F]">
        {/* ── PART 11: HERO VIDEO (Clip JAGER — Page 3 & Page 18 PDF, NO GIANT PLAY BUTTON) ── */}
        <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0C2118] pt-20">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/img/pdf-guide/home/brand-jager-factory.jpg?v=2"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/jager-factory.mp4" type="video/mp4" />
          </video>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10, 26, 18, 0.45) 0%, rgba(10, 26, 18, 0.55) 55%, rgba(8, 20, 14, 0.88) 100%)",
            }}
          />

          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl py-16">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#E5B869] block mb-4"
            >
              VIETNAMESE FURNITURE MANUFACTURING &amp; EXPORT
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-white leading-[1.12] mb-5"
              style={{ fontSize: "clamp(2.25rem, 4.8vw, 4.25rem)" }}
            >
              About DHT Furniture
              <br />
              Vietnam
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              DHT is a Vietnamese furniture manufacturer and exporter, operating as part of a
              family-owned furniture group with 11 production facilities across Vietnam.
            </motion.p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/65 animate-bounce">
            <ArrowDown size={22} strokeWidth={1.5} />
          </div>
        </section>

        {/* ── PART 12: WHY CHOOSE DHT (Built for Global Furniture Buyers. — Hình 23) ── */}
        <section className="relative w-full bg-[#0C2016] text-white overflow-hidden">
          {/* Full-Canvas Seamless Photographic Bokeh + Woven-Rope & Teak Armchair Background */}
          <img
            src="/img/pdf-guide/about/why-choose-rope-chair.jpg?v=2"
            alt="DHT Woven Rope and Teak Outdoor Armchair"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-bottom"
          />

          <div className="container mx-auto px-6 lg:px-14 max-w-[1380px] relative z-10 pt-16 sm:pt-20 lg:pt-[92px] pb-56 sm:pb-64 lg:pb-[255px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
              {/* Left Column (51% -> 6 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 lg:pr-12 xl:pr-16"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <span className="h-[1.5px] w-11 bg-[#D89F45]" />
                  <span className="font-body text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-[#D89F45]">
                    WHY CHOOSE DHT
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-[#F5F4EE] leading-[1.08] tracking-tight mb-6"
                  style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.85rem)" }}
                >
                  Built for Global
                  <br />
                  Furniture Buyers.
                </h2>

                <p className="font-body text-sm sm:text-[16.5px] text-[#D9E0DC] leading-[1.6] max-w-[490px]">
                  Our furniture export business is built on real manufacturing strength, technical
                  know-how and a commitment to long-term partnership with international buyers.
                </p>
              </motion.div>

              {/* Right Column (49% -> 6 cols): Vertical Gold Divider + 01, 02, 03 */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="lg:col-span-6 lg:pl-12 xl:pl-16 lg:mt-2 lg:border-l lg:border-[#8C743B]/85"
              >
                {BUYER_VALUES.map((item, idx) => {
                  const isLast = idx === BUYER_VALUES.length - 1;
                  return (
                    <div key={item.number} className="flex items-start gap-6 sm:gap-9">
                      {/* Prominent Gold Display Serif Number (No horizontal line underneath) */}
                      <span className="font-display font-bold text-4xl sm:text-[50px] text-[#D89F45] leading-none shrink-0 w-16 sm:w-20 pt-0.5 select-none">
                        {item.number}
                      </span>

                      {/* Right Text Column (Horizontal divider ONLY under text, NOT under number) */}
                      <div
                        className={`flex-1 ${!isLast ? "pb-6 mb-6 border-b border-white/22" : "pb-0"
                          }`}
                      >
                        <h3 className="font-display font-bold text-lg sm:text-[21px] text-white leading-snug mb-1.5">
                          {item.title}
                        </h3>
                        <p className="font-body text-xs sm:text-[15px] text-[#D7DFDA] leading-[1.52]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PART 13: THE EVOLUTION OF DHT (2016 -> 2022 -> 2025 - Present — Hình 25) ── */}
        <section className="relative py-16 sm:py-20 lg:py-20 bg-[#FDFDFC] border-b border-black/5 overflow-hidden">
          {/* Top-Right Sunlit Leafy Branch & Soft Botanical Shadows */}
          <img
            src="/img/pdf-guide/about/evo-leaves-tr.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-0 right-0 w-[280px] sm:w-[430px] lg:w-[530px] h-auto mix-blend-multiply opacity-95"
          />

          {/* Bottom-Right Slatted Teak Furniture Corner */}
          <img
            src="/img/pdf-guide/about/evo-wood-br.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none hidden sm:block absolute bottom-0 right-0 w-[76px] lg:w-[96px] h-auto mix-blend-multiply"
          />

          <div className="container mx-auto px-6 lg:px-14 max-w-[1380px] relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-10 lg:mb-11"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <span className="h-[2.5px] w-10 bg-[#B3662A]" />
                <span className="font-body text-xs sm:text-[14px] font-bold uppercase tracking-[0.06em] text-[#9E5422]">
                  OUR DEVELOPMENT
                </span>
              </div>

              <h2
                className="font-display font-bold text-[#0F2C1E] leading-[1.08] tracking-tight mb-3.5"
                style={{ fontSize: "clamp(2.25rem, 4.1vw, 3.6rem)" }}
              >
                The Evolution of DHT.
              </h2>

              <p className="font-body text-sm sm:text-[16.5px] text-[#1D2421] leading-[1.55] max-w-3xl">
                From investment and commercial operations to outdoor furniture and a broader
                <br className="hidden md:inline" /> manufacturing and export business, DHT has
                evolved to serve international furniture buyers.
              </p>
            </motion.div>

            {/* 3 Equal Horizontal Milestone Columns with Thin Bronze Chevrons */}
            <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2">
              {EVOLUTION_MILESTONES.map((milestone, idx) => {
                const isLongYear = milestone.year.length > 6;
                return (
                  <div
                    key={milestone.year}
                    className="flex-1 flex flex-col lg:flex-row items-center gap-2 lg:gap-2.5"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative w-full h-full rounded-[18px] bg-[#F8F6F1]/95 px-6 sm:px-8 pt-6 pb-8 text-center flex flex-col items-center justify-between overflow-hidden"
                      style={{
                        boxShadow: "0 2px 14px rgba(15, 44, 30, 0.03)",
                      }}
                    >
                      {/* Subtle Organic Diagonal Ribbon Corner Sheen (Matching Hình 25) */}
                      <div
                        className="pointer-events-none absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-60"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(235, 228, 215, 0.85) 0%, transparent 70%)",
                        }}
                      />
                      <div
                        className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-55"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(235, 228, 215, 0.8) 0%, transparent 70%)",
                        }}
                      />

                      {/* Year Header with Flanking Bronze Lines */}
                      <div className="relative z-10 w-full flex items-center justify-center gap-3.5 mb-5">
                        <span
                          className={`h-[1px] bg-[#C28652]/75 ${isLongYear ? "w-7 sm:w-9" : "w-14 sm:w-16"
                            }`}
                        />
                        <span className="font-display font-bold text-2xl sm:text-[32px] text-[#9D5421] leading-none whitespace-nowrap">
                          {milestone.year}
                        </span>
                        <span
                          className={`h-[1px] bg-[#C28652]/75 ${isLongYear ? "w-7 sm:w-9" : "w-14 sm:w-16"
                            }`}
                        />
                      </div>

                      {/* Official Historical Logo */}
                      <div className="relative z-10 h-36 sm:h-[148px] flex items-center justify-center my-1">
                        <img
                          src={milestone.logoSrc}
                          alt={milestone.title}
                          className={
                            idx === 0
                              ? "max-h-[124px] max-w-[180px] object-contain"
                              : "max-h-[138px] max-w-[235px] object-contain"
                          }
                        />
                      </div>

                      {/* Title, Short Bronze Dash & Description */}
                      <div className="relative z-10 mt-3 w-full">
                        <h3 className="font-display font-bold text-xl sm:text-[23px] text-[#0F2C1E] whitespace-pre-line leading-[1.2] min-h-[54px] flex items-center justify-center">
                          {milestone.title}
                        </h3>
                        <div className="w-14 h-[2px] bg-[#B87338] mx-auto my-3" />
                        <p className="font-body text-sm sm:text-[15px] text-[#222926] whitespace-pre-line leading-[1.48] max-w-[300px] mx-auto">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Thin Bronze Arrow Between Columns */}
                    {idx < EVOLUTION_MILESTONES.length - 1 && (
                      <div className="shrink-0 text-[#9D5421] py-1 lg:py-0">
                        <ChevronRight size={22} strokeWidth={2} className="hidden lg:block" />
                        <ChevronDown size={22} strokeWidth={2} className="block lg:hidden" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary Bar (Bare Factory Icon + Vertical Bronze Divider + Sentence) */}
            <div className="mt-6 rounded-[14px] bg-[#F5F4EE] px-6 sm:px-8 py-4 flex items-center gap-5">
              <Factory size={28} className="text-[#142F22] shrink-0" strokeWidth={1.6} />
              <div className="h-7 w-[1px] bg-[#D6B89A] shrink-0 hidden sm:block" />
              <p className="font-body text-sm sm:text-[15.5px] font-medium text-[#112B1E] leading-snug">
                Today, DHT Furniture Vietnam serves as the international commercial and export arm
                of our family-owned manufacturing group.
              </p>
            </div>
          </div>
        </section>

        {/* ── PARTS 14, 15, 16: OUR BUSINESS MODEL (Hình 28 — 57% / 43% Split, Bare Gold Icons) ── */}
        <section className="py-12 sm:py-16 bg-[#FDFCFC]">
          <div className="container mx-auto px-6 lg:px-14 max-w-[1380px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="rounded-[24px] bg-gradient-to-b from-[#042618] via-[#06281A] to-[#082B1D] text-white px-7 sm:px-12 lg:px-16 py-11 sm:py-14 lg:py-[58px] shadow-[0_10px_30px_rgba(4,38,24,0.12)]"
            >
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-10 lg:gap-0">
                {/* Left Column (57% width matching x=815/1431) */}
                <div className="w-full lg:w-[57%] lg:pr-12 xl:pr-16">
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="h-[2.5px] w-10 bg-[#D9A23E]" />
                    <span className="font-body text-xs sm:text-[14px] font-bold uppercase tracking-[0.06em] text-[#D9A23E]">
                      OUR BUSINESS MODEL
                    </span>
                  </div>

                  <h2
                    className="font-display font-bold text-[#F5F5F0] leading-[1.12] tracking-tight mb-6"
                    style={{ fontSize: "clamp(1.95rem, 3.3vw, 3.1rem)" }}
                  >
                    One Commercial Partner.
                    <br />
                    Direct Manufacturing Access.
                  </h2>

                  <p className="font-body text-sm sm:text-[16.5px] text-[#DCE3DF] leading-[1.58] max-w-[590px]">
                    DHT Furniture Vietnam serves as the international commercial and export arm of
                    our family-owned manufacturing group. International buyers work with one
                    dedicated DHT team while accessing specialised production capabilities across
                    our facilities in Vietnam.
                  </p>
                </div>

                {/* Right Column (43% width): Vertical Gold Divider + 3 Bare Gold Icons + Text-Only Dividers */}
                <div className="w-full lg:w-[43%] lg:pl-10 xl:pl-14 lg:border-l lg:border-[#9F854A]/85">
                  {BUSINESS_MODEL_PILLARS.map((pillar, idx) => {
                    const isLast = idx === BUSINESS_MODEL_PILLARS.length - 1;
                    return (
                      <div key={pillar.id} className="flex items-start gap-6 sm:gap-8">
                        {/* Bare Large Gold Outline Icon (No Box, No Horizontal Line Underneath) */}
                        <div className="w-12 sm:w-14 shrink-0 flex items-center justify-center pt-1">
                          <PillarIcon name={pillar.iconName} />
                        </div>

                        {/* Text Column (Horizontal Divider ONLY under text) */}
                        <div
                          className={`flex-1 ${!isLast ? "pb-6 mb-6 border-b border-white/22" : "pb-0"
                            }`}
                        >
                          <h3 className="font-display font-bold text-lg sm:text-[21px] text-white leading-snug mb-1.5">
                            {pillar.title}
                          </h3>
                          <p className="font-body text-xs sm:text-[14.5px] text-[#D7DFDA] leading-[1.5]">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PART 17: BOTTOM CTA BANNER (Contact DHT. — Hình 31 Full-Bleed Cinematic Photo) ── */}
        <section className="relative w-full bg-[#0B1C0A] text-white overflow-hidden min-h-[380px] sm:min-h-[430px] lg:min-h-[470px] flex items-center">
          {/* Full-Bleed Seamless Photograph (Dark Garden Bokeh Left + Sunlit Teak Armchair Right) */}
          <img
            src="/img/pdf-guide/about/contact-armchair-right.jpg?v=2"
            alt="DHT Wooden Outdoor Armchair with Cushion"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-right"
          />

          {/* Subtle mobile-only left scrim so text stays readable on narrow screens */}
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(11, 28, 10, 0.88) 0%, rgba(11, 28, 10, 0.65) 55%, rgba(11, 28, 10, 0.15) 100%)",
            }}
          />

          <div className="container mx-auto px-6 lg:px-14 max-w-[1380px] relative z-10 py-14 sm:py-16 lg:py-[72px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="max-w-[500px]"
            >
              {/* Eyebrow: — LET'S WORK TOGETHER */}
              <div className="flex items-center gap-3.5 mb-5">
                <span className="h-[1.5px] w-10 bg-[#C88E46]" />
                <span className="font-body text-xs sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#C88E46]">
                  LET&apos;S WORK TOGETHER
                </span>
              </div>

              {/* Headline: Contact DHT. */}
              <h2
                className="font-display font-bold text-[#F5F4EE] leading-[1.06] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.5rem, 4.4vw, 4rem)" }}
              >
                Contact DHT.
              </h2>

              {/* 3-Line Description Matching Hình 31 */}
              <p className="font-body text-sm sm:text-[16.5px] text-[#E1E6E0] leading-[1.56] mb-8">
                Tell us about your next furniture programme.
                <br className="hidden sm:inline" /> Our team is ready to support you from
                development
                <br className="hidden sm:inline" /> to export execution.
              </p>

              {/* CTA Button (#B57A38) */}
              <Link
                href="/contact"
                className="min-w-[235px] h-[58px] px-8 rounded-[8px] bg-[#B57A38] hover:bg-[#C68944] text-white font-body text-base sm:text-[17px] font-bold inline-flex items-center justify-center gap-3.5 transition-all shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
              >
                <span>Contact DHT</span>
                <ArrowRight size={20} strokeWidth={1.6} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
