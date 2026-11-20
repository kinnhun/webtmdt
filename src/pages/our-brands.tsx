import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { BrandLogo } from "@/components/ui/BrandLogos";
import type { OurBrandCardItem, ProductCapabilityItem } from "@/types/dht.types";

function formatVideoTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const OUR_BRAND_CARDS: OurBrandCardItem[] = [
  {
    id: "DHT",
    specialty: "Outdoor Furniture",
    description:
      "Dining, lounge, sunloungers and mixed-material outdoor collections.",
    image: "/img/pdf-guide/brands/card-dht.jpg?v=2",
    ctaLabel: "Request DHT Catalogue",
  },
  {
    id: "JAGER",
    specialty: "Indoor Furniture",
    description:
      "Residential indoor furniture and custom product development.",
    image: "/img/pdf-guide/brands/card-jager.jpg?v=2",
    ctaLabel: "Request JAGER Catalogue",
  },
  {
    id: "THE ONE",
    specialty: "Project & Office Furniture",
    description:
      "Commercial, office and hospitality furniture for diverse projects.",
    image: "/img/pdf-guide/brands/card-theone.jpg?v=2",
    ctaLabel: "Request THE ONE Catalogue",
  },
  {
    id: "MEKONG",
    specialty: "Wood Panels & Processing",
    description:
      "Engineered wood panels and primary timber processing.",
    image: "/img/pdf-guide/brands/card-mekong.jpg?v=2",
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

const CAPABILITY_ICON_SRC: Record<ProductCapabilityItem["icon"], string> = {
  outdoor: "/img/pdf-guide/brands/cap-outdoor.png?v=2",
  indoor: "/img/pdf-guide/brands/cap-indoor.png?v=2",
  office: "/img/pdf-guide/brands/cap-office.png?v=2",
  project: "/img/pdf-guide/brands/cap-project.png?v=2",
  panels: "/img/pdf-guide/brands/cap-panels.png?v=2",
};

function SculptedCapabilityIcon({
  name,
  label,
}: {
  name: ProductCapabilityItem["icon"];
  label: string;
}) {
  return (
    <img
      src={CAPABILITY_ICON_SRC[name]}
      alt={label.replace("\n", " ")}
      className="h-[64px] lg:h-[70px] w-auto object-contain select-none"
    />
  );
}

export default function OurBrandsPage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => { });
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = heroVideoRef.current;
    if (!vid || !duration) return;
    const nextTime = Number(e.target.value);
    vid.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleFullscreen = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (vid.requestFullscreen) {
      vid.requestFullscreen().catch(() => { });
    }
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

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

      <main className="bg-[#F8F4EE] text-[#0B231A] pt-16 lg:pt-[72px]">
        {/* ── 1. HERO VIDEO BANNER (Hình 45 Top + Live Controls Bar + Clip MEKONG — Page 3 PDF) ── */}
        <section className="relative min-h-[430px] lg:min-h-[475px] flex items-center bg-[#042317] text-white overflow-hidden">
          {/* Right Full-Bleed Factory Video: Clip MEKONG */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none">
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/pdf-guide/home/brand-mekong-factory.jpg?v=3"
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover object-center opacity-55 lg:opacity-100"
            >
              <source src="/video/mekong-factory.mp4" type="video/mp4" />
            </video>
            {/* Left-to-right deep emerald dissolve */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #042317 0%, rgba(4, 35, 23, 0.94) 16%, rgba(4, 35, 23, 0.46) 38%, rgba(4, 35, 23, 0.06) 66%, rgba(4, 35, 23, 0) 100%)",
              }}
            />
            {/* Bottom-right subtle dark scrim behind video control bar */}
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "linear-gradient(180deg, rgba(4, 24, 16, 0) 0%, rgba(4, 20, 14, 0.72) 100%)",
              }}
            />
          </div>

          <div className="max-w-[1320px] mx-auto w-full px-6 sm:px-8 lg:px-10 pt-12 pb-20 lg:py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[600px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[1.5px] w-8 bg-[#D8B460]" />
                <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#D8B460]">
                  OUR BRANDS
                </span>
              </div>

              <h1 className="font-display font-bold text-white leading-[1.12] tracking-[-0.01em] mb-4 text-[34px] sm:text-[42px] lg:text-[48px]">
                Four Specialised Brands.
                <br />
                One Manufacturing Group.
              </h1>

              <p className="font-body text-[14px] sm:text-[15.5px] text-white/90 leading-[1.58] max-w-[490px] mb-7 lg:mb-8">
                Explore outdoor, indoor, office and project furniture, and wood panel capabilities
                from our family-owned manufacturing group in Vietnam.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#brands-showcase"
                  className="inline-flex items-center justify-center gap-2 h-[50px] lg:h-[52px] px-7 sm:px-8 rounded-full text-[#082419] font-body text-[14px] font-bold border border-[#F9E3AE]/60 hover:brightness-105 hover:-translate-y-0.5 transition-all shadow-[0_8px_22px_-4px_rgba(222,168,89,0.5)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F8DC9F 0%, #E1AD5B 52%, #C98B3B 100%)",
                  }}
                >
                  <span>Explore Our Brands</span>
                  <ArrowDown size={16} strokeWidth={2.2} />
                </a>

                <Link
                  href="/contact?inquiry=catalogue#smart-contact-form"
                  className="inline-flex items-center justify-center gap-2 h-[50px] lg:h-[52px] px-7 sm:px-8 rounded-full bg-[#041E14]/55 hover:bg-[#073020]/85 text-white border border-white/75 font-body text-[14px] font-medium transition-all backdrop-blur-xs"
                >
                  <span>Request Collection Access</span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Interactive Bottom-Right Video Controls Bar (matching Hình 45 Hero Close-up) */}
          <div className="absolute bottom-4 inset-x-4 lg:left-auto lg:right-8 lg:bottom-5 lg:w-[46%] max-w-[590px] z-20 flex items-center gap-3 sm:gap-3.5 text-white select-none">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause factory video" : "Play factory video"}
              className="p-1.5 rounded-full text-white hover:text-[#F6D594] transition-colors cursor-pointer shrink-0"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" strokeWidth={1.5} />
              ) : (
                <Play size={18} fill="currentColor" strokeWidth={1.5} />
              )}
            </button>

            <span className="font-body text-[12px] sm:text-[12.5px] font-medium text-white/95 tabular-nums whitespace-nowrap shrink-0">
              {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
            </span>

            {/* Custom Scrubbable Progress Track with Crisp White Thumb */}
            <div className="relative flex-1 h-5 flex items-center group cursor-pointer">
              <div className="w-full h-[3.5px] rounded-full bg-white/30 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-[width] duration-100"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)] pointer-events-none transition-transform group-hover:scale-115"
                style={{ left: `${progressPct}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek factory video timeline"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute factory video" : "Mute factory video"}
              className="p-1.5 rounded-full text-white hover:text-[#F6D594] transition-colors cursor-pointer shrink-0"
            >
              {isMuted ? <VolumeX size={18} strokeWidth={1.9} /> : <Volume2 size={18} strokeWidth={1.9} />}
            </button>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Fullscreen factory video"
              className="p-1.5 rounded-full text-white hover:text-[#F6D594] transition-colors cursor-pointer shrink-0"
            >
              <Maximize size={17} strokeWidth={1.9} />
            </button>
          </div>
        </section>

        {/* ── 2. FOUR COMPLEMENTARY BRANDS (4 Tall Luxury Emerald Cards — Hình 45) ── */}
        <section id="brands-showcase" className="pt-12 pb-10 lg:pt-[52px] lg:pb-[44px]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10">
            {/* 2-Column Editorial Header with Mid-Height Vertical Divider */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 mb-9 lg:mb-10">
              <div className="lg:w-[53%]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[1.5px] w-8 bg-[#B07A46]" />
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#A67241]">
                    OUR BRANDS
                  </span>
                </div>
                <h2 className="font-display font-bold text-[#0B231A] leading-[1.14] tracking-[-0.01em] text-[28px] sm:text-[34px] lg:text-[38px]">
                  Four Complementary Brands.
                  <br />
                  A Complete Furniture Offering.
                </h2>
              </div>

              <div className="hidden lg:block w-px h-[62px] bg-[#D6CCBA] shrink-0" />

              <div className="lg:w-[43%]">
                <p className="font-body text-[13.5px] lg:text-[14.5px] text-[#2B3732] leading-[1.6]">
                  From outdoor and indoor furniture to office, project solutions and wood panels,
                  our four brands work together to serve diverse market needs worldwide.
                </p>
              </div>
            </div>

            {/* 4 Luxury Vertical Brand Cards (Exact close-up proportions: ~53% lush top photo, bold logo on seam, snug CTA) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[18px]">
              {OUR_BRAND_CARDS.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative rounded-[16px] overflow-hidden bg-gradient-to-b from-[#042418] via-[#031F14] to-[#01140C] text-white border border-[#C9A45A]/22 shadow-[0_12px_28px_-8px_rgba(3,28,19,0.36)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Clean Lifestyle Photo (53% visual weight) dissolving softly into deep emerald */}
                    <div className="relative h-[226px] lg:h-[238px] w-full overflow-hidden">
                      <img
                        src={card.image}
                        alt={`${card.id} — ${card.specialty}`}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(3, 31, 20, 0) 44%, rgba(3, 31, 20, 0.72) 78%, #031F14 100%)",
                        }}
                      />
                    </div>

                    {/* Official Brand Logo Positioned Boldly Over the Transition Seam + Compact Copy */}
                    <div className="relative z-10 px-5 -mt-12 pb-4">
                      <div className="h-[48px] flex items-center mb-2">
                        <BrandLogo brand={card.id} variant="light" />
                      </div>
                      <h3 className="font-body font-bold text-[15.5px] lg:text-[16.5px] text-white leading-snug mb-1.5">
                        {card.specialty}
                      </h3>
                      <p className="font-body text-[12.5px] lg:text-[13px] text-white/85 leading-[1.5] min-h-[58px]">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Gold-Outlined Button with Open-Book Catalogue Icon */}
                  <div className="px-4 pb-4 pt-1">
                    <Link
                      href={`/contact?inquiry=catalogue&brand=${encodeURIComponent(
                        card.id
                      )}#smart-contact-form`}
                      className="group/btn w-full h-[44px] px-3.5 rounded-[10px] bg-[#041B12]/90 hover:bg-[#DFA854] text-white hover:text-[#082419] border border-[#D6B062]/80 font-body text-[12.5px] lg:text-[13px] font-semibold flex items-center justify-between transition-all duration-300"
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <BookOpen
                          size={16}
                          strokeWidth={1.75}
                          className="text-[#E8BD68] group-hover/btn:text-[#082419] shrink-0 transition-colors"
                        />
                        <span className="truncate">{card.ctaLabel}</span>
                      </span>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#E8BD68] group-hover/btn:text-[#082419] shrink-0 transition-colors"
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. PRODUCT CAPABILITIES (5 Authentic 3D Sculpted Gold Icons — Exact Close-Up) ── */}
        <section className="py-10 lg:py-[44px]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10">
            {/* 2-Column Editorial Header with Centered Mid-Height Vertical Divider */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 mb-9 lg:mb-10">
              <div className="lg:w-[44%]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[1.5px] w-8 bg-[#C48B45]" />
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#9E5228]">
                    PRODUCT CAPABILITIES
                  </span>
                </div>
                <h2 className="font-display font-bold text-[#0B231A] leading-[1.13] tracking-[-0.01em] text-[28px] sm:text-[34px] lg:text-[39px]">
                  Furniture Solutions
                  <br />
                  for Multiple Spaces.
                </h2>
              </div>

              <div className="hidden lg:block w-px h-[56px] bg-[#C9C1B4] shrink-0" />

              <div className="lg:w-[48%]">
                <p className="font-body text-[14px] lg:text-[15px] text-[#2B3732] leading-[1.6] max-w-[540px]">
                  A broad product scope, flexible materials and manufacturing capabilities to meet
                  the needs of global markets.
                </p>
              </div>
            </div>

            {/* 5 Authentic 3D Sculpted Golden Icons separated by 4 Full-Height Vertical Dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 lg:gap-0 items-stretch py-2">
              {PRODUCT_CAPABILITIES.map((cap, idx) => (
                <Link
                  key={cap.title}
                  href={cap.href}
                  className={`group relative flex flex-col items-center justify-start text-center px-4 py-1.5 transition-transform duration-300 hover:-translate-y-1 ${idx > 0
                    ? "lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-2 lg:before:bottom-1 lg:before:w-px lg:before:bg-[#D6CDC0]"
                    : ""
                    }`}
                >
                  <div className="mb-2.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <SculptedCapabilityIcon name={cap.icon} label={cap.title} />
                  </div>
                  <span className="font-body font-bold text-[14.5px] lg:text-[15.5px] text-[#0B231A] group-hover:text-[#A67241] whitespace-pre-line leading-[1.3] transition-colors">
                    {cap.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. PRIVATE COLLECTION ACCESS BANNER (Compact Sleek Emerald + Gold Ribbon Curves — Exact Close-Up) ── */}
        <section className="pt-2 pb-14 lg:pt-4 lg:pb-[60px]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[16px] overflow-hidden bg-gradient-to-r from-[#032316] via-[#052C1D] to-[#032115] text-white px-7 py-6 sm:px-9 sm:py-6 lg:px-10 lg:py-[24px] shadow-[0_12px_30px_-8px_rgba(3,28,19,0.38)]"
            >
              {/* Signature Velvet Golden Silk Wave Accents (Bottom-Left & Bottom-Right like Close-Up) */}
              <svg
                viewBox="0 0 1200 130"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="pca-wave-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D8B460" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#D8B460" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                {/* Bottom-left diagonal gold silk fan */}
                <path
                  d="M 0,68 C 36,96 76,120 118,130 L 0,130 Z"
                  fill="url(#pca-wave-gold)"
                  opacity="0.38"
                />
                <path
                  d="M 0,76 C 34,102 72,122 110,130"
                  fill="none"
                  stroke="#E0BC6B"
                  strokeWidth="1.1"
                  opacity="0.45"
                />
                {/* Bottom-right soft emerald-gold wave */}
                <path
                  d="M 1020,130 C 1095,112 1158,76 1200,36 L 1200,130 Z"
                  fill="#0D4731"
                  opacity="0.55"
                />
                <path
                  d="M 1035,130 C 1108,112 1168,78 1200,44"
                  fill="none"
                  stroke="#5AA37E"
                  strokeWidth="1"
                  opacity="0.32"
                />
              </svg>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-7">
                {/* Left: Bare Gold Layers Icon + Title */}
                <div className="flex items-center gap-4 lg:gap-5 shrink-0">
                  <Layers size={44} strokeWidth={1.35} className="text-[#E6BF69] shrink-0" />
                  <div>
                    <span className="font-body text-[11px] lg:text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#E6BF69] block mb-0.5">
                      PRIVATE COLLECTION ACCESS
                    </span>
                    <h3 className="font-display font-bold text-[24px] sm:text-[27px] lg:text-[30px] text-white leading-tight whitespace-nowrap">
                      Request Our Collections
                    </h3>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden lg:block h-[56px] w-px bg-white/25 shrink-0" />

                {/* Middle 2-Line Copy */}
                <p className="font-body text-[13px] lg:text-[14px] text-white/90 text-center lg:text-left leading-[1.52] max-w-[400px]">
                  Access selected catalogues and curated collections based on your market needs and
                  project requirements.
                </p>

                {/* Right Gleaming 3D Beveled Metallic Champagne-Gold Pill CTA */}
                <Link
                  href="/contact?inquiry=catalogue#smart-contact-form"
                  className="shrink-0 inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full text-[#072318] font-body text-[13.5px] lg:text-[14px] font-bold border border-[#FAE5B3]/75 hover:brightness-105 hover:-translate-y-0.5 transition-all shadow-[0_6px_18px_-3px_rgba(222,168,89,0.5),inset_0_1px_1px_rgba(255,255,255,0.55)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F9DF9F 0%, #E2AF5B 52%, #C98B3B 100%)",
                  }}
                >
                  <span>Request Collection Access</span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
