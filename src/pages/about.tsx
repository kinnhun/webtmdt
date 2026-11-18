import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Factory,
  Handshake,
  ClipboardCheck,
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
    logoSrc: "/img/pdf-guide/logos/evo-2016.png",
    title: "DHT Investment\nand Commercial",
    description: "Our foundation in investment and commercial activities.",
  },
  {
    year: "2022",
    logoSrc: "/img/pdf-guide/logos/evo-2022.png",
    title: "DHT Outdoor Furniture",
    description: "A dedicated focus on outdoor furniture manufacturing and export.",
  },
  {
    year: "2025 – Present",
    logoSrc: "/img/logo.png",
    title: "DHT Furniture Vietnam",
    description:
      "A broader manufacturing and export identity, representing our family-owned group of 11 production facilities.",
  },
];

const BUSINESS_MODEL_PILLARS: BusinessModelPillar[] = [
  {
    id: "commercial",
    title: "Commercial Partnership",
    description:
      "Sales, quotations, sampling, project coordination and customer support.",
    iconName: "handshake",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Access",
    description:
      "Direct access to 11 production facilities across outdoor, indoor, project furniture and wood panels.",
    iconName: "factory",
  },
  {
    id: "programme",
    title: "Programme Management",
    description:
      "Product development, production follow-up, quality inspection and export logistics.",
    iconName: "clipboard",
  },
];

function PillarIcon({ name }: { name: BusinessModelPillar["iconName"] }) {
  if (name === "handshake") {
    return <Handshake size={26} className="text-[#D89B3C] shrink-0" strokeWidth={1.6} />;
  }
  if (name === "factory") {
    return <Factory size={26} className="text-[#D89B3C] shrink-0" strokeWidth={1.6} />;
  }
  return <ClipboardCheck size={26} className="text-[#D89B3C] shrink-0" strokeWidth={1.6} />;
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
        {/* ── PART 11: HERO VIDEO (JAGER FACTORY VIDEO, NO GIANT PLAY BUTTON) ── */}
        <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0C2118] pt-20">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/img/pdf-guide/about/about-hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/hero-banner.mp4" type="video/mp4" />
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

        {/* ── PART 12: WHY CHOOSE DHT (Built for Global Furniture Buyers.) ── */}
        <section className="relative bg-[#0E261C] text-white overflow-hidden pt-20 lg:pt-24 pb-0">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 75% 30%, rgba(35, 82, 58, 0.35), transparent 55%), linear-gradient(180deg, #102B1F 0%, #0B1E16 100%)",
            }}
          />

          <div className="container mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start pb-14 lg:pb-16">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#D89B3C]" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                    WHY CHOOSE DHT
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-white leading-[1.12] mb-6"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
                >
                  Built for Global
                  <br />
                  Furniture Buyers.
                </h2>

                <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed max-w-lg">
                  Our furniture export business is built on real manufacturing strength, technical
                  know-how and a commitment to long-term partnership with international buyers.
                </p>
              </motion.div>

              {/* Right Column: 01, 02, 03 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-6 lg:pl-10 lg:border-l lg:border-[#D89B3C]/35 divide-y divide-white/15"
              >
                {BUYER_VALUES.map((item) => (
                  <div
                    key={item.number}
                    className="py-6 first:pt-0 last:pb-0 flex items-start gap-6"
                  >
                    <span className="font-display font-bold text-3xl sm:text-4xl text-[#D89B3C] leading-none shrink-0 w-12">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1.5">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-white/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Close-up Rope & Teak Armchair Foreground Detail (Hình 23) */}
            <div className="-mx-6 lg:-mx-10 mt-2 overflow-hidden max-h-[240px]">
              <img
                src="/img/pdf-guide/about/why-choose-rope-chair.jpg"
                alt="DHT Woven Rope and Teak Outdoor Armchair Detail"
                className="w-full h-[180px] sm:h-[230px] object-cover object-left-bottom"
              />
            </div>
          </div>
        </section>

        {/* ── PART 13: THE EVOLUTION OF DHT (2016 -> 2022 -> 2025 - Present) ── */}
        <section className="py-20 lg:py-24 bg-[#FAF9F5] border-b border-black/5">
          <div className="container mx-auto px-6 lg:px-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-8 bg-[#B97846]" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#B97846]">
                  OUR DEVELOPMENT
                </span>
              </div>

              <h2
                className="font-display font-bold text-[#0E241B] leading-tight mb-4"
                style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
              >
                The Evolution of DHT.
              </h2>

              <p className="font-body text-sm sm:text-base text-[#2B3430] leading-relaxed">
                From investment and commercial operations to outdoor furniture and a broader
                manufacturing and export business, DHT has evolved to serve international furniture
                buyers.
              </p>
            </motion.div>

            {/* 3 Equal Horizontal Milestone Columns with Arrows */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-3">
              {EVOLUTION_MILESTONES.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className="flex-1 flex flex-col lg:flex-row items-center gap-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="w-full h-full rounded-2xl bg-[#F4F1EA] border border-[#E6E0D2] px-6 sm:px-8 py-8 text-center flex flex-col items-center justify-between shadow-xs"
                  >
                    {/* Year with flanking lines */}
                    <div className="w-full flex items-center justify-center gap-3 mb-6">
                      <span className="h-px flex-1 max-w-[44px] bg-[#B97846]/50" />
                      <span className="font-display font-bold text-2xl sm:text-3xl text-[#A85D24]">
                        {milestone.year}
                      </span>
                      <span className="h-px flex-1 max-w-[44px] bg-[#B97846]/50" />
                    </div>

                    {/* Official Historical Logo */}
                    <div className="h-36 flex items-center justify-center my-2">
                      <img
                        src={milestone.logoSrc}
                        alt={milestone.title}
                        className="max-h-32 max-w-[200px] object-contain"
                      />
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#0E241B] whitespace-pre-line leading-snug mb-3">
                        {milestone.title}
                      </h3>
                      <div className="w-8 h-[2px] bg-[#B97846] mx-auto mb-3" />
                      <p className="font-body text-xs sm:text-sm text-[#39423E] leading-relaxed max-w-xs mx-auto">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Arrow between columns */}
                  {idx < EVOLUTION_MILESTONES.length - 1 && (
                    <div className="shrink-0 text-[#A85D24] py-1 lg:py-0">
                      <ChevronRight size={22} className="hidden lg:block" />
                      <ChevronDown size={22} className="block lg:hidden" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Summary Bar */}
            <div className="mt-8 rounded-xl bg-[#F2EFE7] border border-[#E4DECFE0] px-6 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white border border-black/10 flex items-center justify-center shrink-0">
                <Factory size={18} className="text-[#0E241B]" />
              </div>
              <div className="h-5 w-px bg-[#B97846]/40 shrink-0 hidden sm:block" />
              <p className="font-body text-xs sm:text-sm font-medium text-[#0E241B]">
                Today, DHT Furniture Vietnam serves as the international commercial and export arm
                of our family-owned manufacturing group.
              </p>
            </div>
          </div>
        </section>

        {/* ── PARTS 14, 15, 16: OUR BUSINESS MODEL (Replaces HR, Leadership, Locations) ── */}
        <section className="py-16 lg:py-20 bg-[#FAF9F5]">
          <div className="container mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-gradient-to-br from-[#163628] via-[#10291E] to-[#0C2017] text-white p-8 sm:p-12 lg:p-14 shadow-xl border border-[#C88A36]/25"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[2px] w-8 bg-[#D89B3C]" />
                    <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                      OUR BUSINESS MODEL
                    </span>
                  </div>

                  <h2
                    className="font-display font-bold text-white leading-[1.15] mb-5"
                    style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)" }}
                  >
                    One Commercial Partner.
                    <br />
                    Direct Manufacturing Access.
                  </h2>

                  <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed">
                    DHT Furniture Vietnam serves as the international commercial and export arm of
                    our family-owned manufacturing group. International buyers work with one
                    dedicated DHT team while accessing specialised production capabilities across
                    our facilities in Vietnam.
                  </p>
                </div>

                {/* Right Column: 3 Pillars */}
                <div className="lg:col-span-6 lg:pl-10 lg:border-l lg:border-white/15 divide-y divide-white/15">
                  {BUSINESS_MODEL_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="py-5 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#D89B3C]/15 border border-[#D89B3C]/35 flex items-center justify-center shrink-0 mt-0.5">
                        <PillarIcon name={pillar.iconName} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1">
                          {pillar.title}
                        </h3>
                        <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PART 17: BOTTOM CTA BANNER (Contact DHT. with Real Wooden Armchair) ── */}
        <section className="relative bg-[#0E241B] text-white overflow-hidden border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Text & Button */}
              <div className="lg:col-span-6 py-14 lg:py-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#D89B3C]" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                    LET&apos;S WORK TOGETHER
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-white leading-none mb-5"
                  style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)" }}
                >
                  Contact DHT.
                </h2>

                <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed max-w-md mb-8">
                  Tell us about your next furniture programme. Our team is ready to support you
                  from development to export execution.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#B97846] hover:bg-[#C88550] text-white font-body text-sm font-semibold transition-all shadow-md"
                >
                  <span>Contact DHT</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right Authentic Wooden Armchair Image (Hình 31) */}
              <div className="lg:col-span-6 h-full flex items-end justify-end -mx-6 lg:mx-0">
                <img
                  src="/img/pdf-guide/about/contact-armchair-right.jpg"
                  alt="DHT Wooden Outdoor Armchair with Cushion"
                  className="w-full max-h-[360px] object-cover object-right"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
