import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Factory,
  Layers,
  Armchair,
  Box,
  Ship,
  Globe2,
  CalendarCheck,
  ShieldCheck,
  HardHat,
  FileText,
  Package,
  ClipboardList,
  Calendar,
  Info,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import mapData from "../../public/data/vietnam-map.json";
import type {
  RegionalFacilityBlock,
  ExportRegionTableRow,
  ExportGatewayCardItem,
  GlobalMarketRegionItem,
} from "@/types/dht.types";

const REGIONAL_FACILITY_BLOCKS: RegionalFacilityBlock[] = [
  {
    id: "quynhon",
    regionLabel: "CENTRAL VIETNAM",
    clusterName: "Quy Nhon",
    facilityCountLabel: "01 Facility",
    totalFootprint: "30,000 m²",
    bannerImage: "/img/pdf-guide/manufacturing/region-quynhon.jpg",
    clusterCardImage: "/img/pdf-guide/manufacturing/cluster-quynhon.jpg?v=2",
    clusterCardSummary: "Wooden outdoor furniture and mixed materials.",
    facilities: [
      {
        id: "01",
        name: "Facility 01",
        footprint: "30,000 m²",
        focus:
          "Wooden outdoor furniture, aluminium furniture, and mixed-material products incorporating wicker or rattan.",
      },
    ],
  },
  {
    id: "hcmc",
    regionLabel: "SOUTHERN VIETNAM",
    clusterName: "Ho Chi Minh City & Southern Corridor",
    facilityCountLabel: "04 Facilities",
    totalFootprint: "143,080 m²",
    bannerImage: "/img/pdf-guide/manufacturing/region-hcmc.jpg",
    clusterCardImage: "/img/pdf-guide/manufacturing/cluster-hcmc.jpg?v=2",
    clusterCardSummary: "Indoor, outdoor and mixed-material furniture.",
    facilities: [
      {
        id: "02",
        name: "Facility 02",
        footprint: "30,000 m²",
        focus:
          "High-end indoor and project furniture, including manufacturing, installation and turnkey interior completion.",
      },
      {
        id: "03",
        name: "Facility 03",
        footprint: "51,360 m²",
        focus: "Wood and aluminium furniture manufacturing.",
      },
      {
        id: "04",
        name: "Facility 04",
        footprint: "30,720 m²",
        focus: "Wood and aluminium furniture manufacturing.",
      },
      {
        id: "05",
        name: "Facility 05",
        footprint: "31,000 m²",
        focus: "Wood, aluminium and mixed-material furniture manufacturing.",
      },
    ],
  },
  {
    id: "hungyen",
    regionLabel: "NORTHERN VIETNAM",
    clusterName: "Hung Yen",
    facilityCountLabel: "04 Facilities",
    totalFootprint: "98,300 m²",
    bannerImage: "/img/pdf-guide/manufacturing/region-hungyen.jpg",
    clusterCardImage: "/img/pdf-guide/manufacturing/cluster-hungyen.jpg?v=2",
    clusterCardSummary: "Metal furniture, indoor and outdoor projects.",
    facilities: [
      {
        id: "06",
        name: "Facility 06",
        footprint: "24,800 m²",
        focus: "Wood furniture manufacturing.",
      },
      {
        id: "07",
        name: "Facility 07",
        footprint: "35,000 m²",
        focus: "Mechanical fabrication and metal furniture manufacturing.",
      },
      {
        id: "08",
        name: "Facility 08",
        footprint: "25,000 m²",
        focus: "Office chairs, sofas and upholstered furniture manufacturing.",
      },
      {
        id: "09",
        name: "Facility 09",
        footprint: "13,500 m²",
        focus: "Steel cabinets, safes, racks and metal furniture manufacturing.",
      },
    ],
  },
  {
    id: "phutho",
    regionLabel: "NORTHERN VIETNAM",
    clusterName: "Phu Tho & Vinh Phuc",
    facilityCountLabel: "02 Facilities",
    totalFootprint: "272,000 m²",
    bannerImage: "/img/pdf-guide/manufacturing/region-phutho.jpg",
    clusterCardImage: "/img/pdf-guide/manufacturing/cluster-phutho.jpg?v=2",
    clusterCardSummary:
      "Including 12,000 m² furniture and 260,000 m² panel & primary processing.",
    facilities: [
      {
        id: "10",
        name: "Facility 10",
        footprint: "12,000 m²",
        focus:
          "Indoor and contract furniture for office, education, healthcare, hospitality and residential projects.",
      },
      {
        id: "11",
        name: "Facility 11",
        footprint: "260,000 m²",
        focus: "Engineered-wood panels and primary timber processing.",
      },
    ],
  },
];

const EXPORT_REGION_ROWS: ExportRegionTableRow[] = [
  {
    id: "quynhon",
    regionName: "Quy Nhon",
    facilitiesRange: "01",
    count: 1,
    primaryGateway: "Quy Nhon Port",
    portId: "quynhon_port",
  },
  {
    id: "hcmc",
    regionName: "Ho Chi Minh City & Southern Corridor",
    facilitiesRange: "02 – 05",
    count: 4,
    primaryGateway: "Cat Lai / Cai Mep – Thi Vai",
    portId: "south_ports",
  },
  {
    id: "hungyen",
    regionName: "Hung Yen",
    facilitiesRange: "06 – 09",
    count: 4,
    primaryGateway: "Hai Phong Port",
    portId: "haiphong_port",
  },
  {
    id: "phutho",
    regionName: "Phu Tho & Vinh Phuc",
    facilitiesRange: "10",
    count: 1,
    primaryGateway: "Hai Phong Port",
    portId: "haiphong_port",
  },
];

const EXPORT_GATEWAY_CARDS: ExportGatewayCardItem[] = [
  {
    id: "haiphong_port",
    name: "Hai Phong Port",
    roleLabel: "Northern Export Gateway",
    servedFrom: "Serving: Hung Yen and Phu Tho & Vinh Phuc.",
    image: "/img/pdf-guide/manufacturing/port-haiphong.jpg",
  },
  {
    id: "south_ports",
    name: "Cat Lai / Cai Mep – Thi Vai",
    roleLabel: "Southern Export Gateway",
    servedFrom: "Serving: Ho Chi Minh City & Southern Corridor.",
    image: "/img/pdf-guide/manufacturing/port-catlai.jpg",
  },
  {
    id: "quynhon_port",
    name: "Quy Nhon Port",
    roleLabel: "Central Export Gateway",
    servedFrom: "Serving: Quy Nhon.",
    image: "/img/pdf-guide/manufacturing/port-quynhon.jpg",
  },
];

const GLOBAL_MARKET_REGIONS: GlobalMarketRegionItem[] = [
  {
    id: "na",
    name: "NORTH AMERICA",
    count: 2,
    countries: ["United States", "Canada"],
  },
  {
    id: "eu",
    name: "EUROPE",
    count: 14,
    countries: [
      "United Kingdom",
      "Austria",
      "Denmark",
      "Estonia",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Italy",
      "Netherlands",
      "Poland",
      "Slovakia",
      "Slovenia",
      "Spain",
    ],
  },
  {
    id: "mea",
    name: "MIDDLE EAST & EURASIA",
    count: 8,
    countries: [
      "Türkiye",
      "Israel",
      "Lebanon",
      "Georgia",
      "Russia",
      "United Arab Emirates",
      "Saudi Arabia",
      "Qatar",
    ],
  },
  {
    id: "apac",
    name: "ASIA-PACIFIC & AFRICA",
    count: 5,
    countries: ["China", "India", "Australia", "Mauritius", "South Africa"],
  },
];

function CountUpNumber({ target, durationMs = 1400 }: { target: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let animId = 0;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [inView, target, durationMs]);

  return <span ref={ref}>{val}</span>;
}

export default function ManufacturingPage() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [hoveredExportRegion, setHoveredExportRegion] = useState<string | null>(null);
  const [hoveredPortId, setHoveredPortId] = useState<string | null>(null);
  const [hoveredMarketCountry, setHoveredMarketCountry] = useState<string | null>(null);

  const isExportClusterActive = (clusterId: string, portId: string) => {
    if (!hoveredExportRegion && !hoveredPortId) return true;
    if (hoveredExportRegion === clusterId) return true;
    if (hoveredPortId === portId) return true;
    return false;
  };

  const isPortActive = (portId: string) => {
    if (!hoveredExportRegion && !hoveredPortId) return true;
    if (hoveredPortId === portId) return true;
    const matchedRow = EXPORT_REGION_ROWS.find((r) => r.id === hoveredExportRegion);
    return matchedRow?.portId === portId;
  };

  return (
    <>
      <SEO
        title="Manufacturing Footprint | 11 Facilities Across Vietnam | DHT Furniture"
        description="Our family-owned manufacturing group operates 10 furniture production facilities and one wood panel and primary-processing facility across four regional clusters in Vietnam, with a combined footprint of 543,380 m²."
        canonical="https://dhtcompany.com/manufacturing"
        image="/img/pdf-guide/manufacturing/hero-factory-exterior.jpg?v=2"
      />
      <Schema
        id="schema-breadcrumbs-manufacturing"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Manufacturing",
              item: "https://dhtcompany.com/manufacturing",
            },
          ],
        }}
      />

      <main className="bg-[#F7F4ED] text-[#132A1F] pt-16 lg:pt-[72px]">
        {/* ── PART 18A: FOOTPRINT HERO BANNER + 4 KPIS (Hình 33 Top + Clip THE ONE — Page 3 PDF) ── */}
        <section className="relative bg-[#052419] text-white overflow-hidden">
          {/* Right Factory Video: Clip THE ONE (seamlessly faded into emerald left) */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[64%] pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/pdf-guide/manufacturing/hero-factory-exterior.jpg?v=2"
              className="w-full h-full object-cover object-center opacity-45 lg:opacity-90"
            >
              <source src="/video/theone-factory.mp4" type="video/mp4" />
            </video>
            {/* Left-to-right emerald studio fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #052419 0%, rgba(5, 36, 25, 0.94) 22%, rgba(5, 36, 25, 0.62) 44%, rgba(5, 36, 25, 0.10) 74%, rgba(5, 36, 25, 0.04) 100%)",
              }}
            />
            {/* Bottom subtle darkening under KPI strip */}
            <div
              className="absolute inset-x-0 bottom-0 h-[120px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5, 36, 25, 0) 0%, rgba(5, 34, 24, 0.78) 45%, rgba(5, 34, 24, 0.96) 100%)",
              }}
            />
          </div>

          {/* Subtle architectural curved wave accent behind left headline (Hình 33) */}
          <svg
            viewBox="0 0 1432 260"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 w-full h-[260px] pointer-events-none opacity-35"
            aria-hidden="true"
          >
            <path
              d="M 0,185 C 210,165 390,95 620,0"
              fill="none"
              stroke="rgba(196, 162, 101, 0.28)"
              strokeWidth="1.2"
            />
          </svg>

          {/* Upper Hero Copy Area — exact Hình 33 proportions (~245px on 1432px) */}
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 pt-9 pb-7 lg:pt-[38px] lg:pb-[26px] relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-[820px]"
            >
              <div className="flex items-center gap-3 mb-2.5 lg:mb-3">
                <span className="h-[1.5px] w-7 bg-[#C99B52]" />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C99B52]">
                  OUR MANUFACTURING FOOTPRINT
                </span>
              </div>

              <h1 className="font-display font-bold text-white leading-[1.16] tracking-[-0.01em] mb-3 text-[26px] sm:text-[32px] lg:text-[38px] xl:text-[41px]">
                11 Production Facilities.
                <br />
                One Family-Owned Manufacturing Group.
              </h1>

              <p className="font-body text-[13.5px] sm:text-[14.5px] text-white/85 leading-[1.55] max-w-[760px]">
                Our family-owned manufacturing group operates 10 furniture production facilities and
                one wood panel and primary-processing facility across four regional clusters in
                Vietnam, with a combined footprint of 543,380 m².
              </p>
            </motion.div>
          </div>

          {/* Lower 4-KPI Strip with Signature Curved Golden Arc Wave (Hình 33 — height ~100px) */}
          <div className="relative z-10">
            {/* Full-bleed Curved Golden Arc + Translucent Emerald Ribbon Backdrop */}
            <svg
              viewBox="0 0 1432 106"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="kpi-strip-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#05261B" stopOpacity="0.92" />
                  <stop offset="50%" stopColor="#062319" stopOpacity="0.86" />
                  <stop offset="100%" stopColor="#0B2E21" stopOpacity="0.90" />
                </linearGradient>
                <linearGradient id="hero-gold-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C6333" stopOpacity="0.35" />
                  <stop offset="8%" stopColor="#C8A35F" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#9A7E46" stopOpacity="0.72" />
                  <stop offset="90%" stopColor="#D4B26E" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#856A36" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="hero-gold-glow" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8A35F" stopOpacity="0" />
                  <stop offset="100%" stopColor="#D4B26E" stopOpacity="0.22" />
                </linearGradient>
              </defs>
              {/* Soft emerald veil under the curved arc */}
              <path
                d="M 0,106 L 0,92 Q 30,8 106,4 L 1326,4 Q 1402,8 1432,92 L 1432,106 Z"
                fill="url(#kpi-strip-fill)"
              />
              {/* Bottom-right soft golden wave sheen */}
              <path
                d="M 1180,106 Q 1345,98 1432,36 L 1432,106 Z"
                fill="url(#hero-gold-glow)"
              />
              {/* Crisp thin curved golden arc stroke */}
              <path
                d="M 0,92 Q 30,8 106,4 L 1326,4 Q 1402,8 1432,92"
                fill="none"
                stroke="url(#hero-gold-arc)"
                strokeWidth="1.4"
              />
              {/* Delicate bottom-right counter-curve accent */}
              <path
                d="M 1240,105 Q 1368,98 1432,48"
                fill="none"
                stroke="rgba(212, 178, 110, 0.42)"
                strokeWidth="1"
              />
            </svg>

            <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 py-5 lg:py-[22px] relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 sm:gap-x-6 lg:gap-0 items-center">
                {/* KPI 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="flex items-center gap-3.5 lg:pr-6"
                >
                  <Factory size={36} className="text-[#C89F58] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[26px] lg:text-[31px] text-white leading-none tracking-[-0.01em] tabular-nums">
                      11
                    </p>
                    <p className="font-body text-[12px] lg:text-[12.5px] text-white/80 mt-1.5 leading-snug">
                      Production Facilities
                    </p>
                  </div>
                </motion.div>

                {/* KPI 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                  className="relative flex items-center gap-3.5 lg:px-7 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-[44px] lg:before:w-px lg:before:bg-[#D2B478]/25"
                >
                  <Layers size={36} className="text-[#C89F58] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[26px] lg:text-[31px] text-white leading-none tracking-[-0.01em] whitespace-nowrap tabular-nums">
                      543,380
                      <span className="text-[17px] lg:text-[19px] font-semibold ml-1 text-white/95">
                        m²
                      </span>
                    </p>
                    <p className="font-body text-[12px] lg:text-[12.5px] text-white/80 mt-1.5 leading-snug">
                      Combined Footprint
                    </p>
                  </div>
                </motion.div>

                {/* KPI 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.26 }}
                  className="relative flex items-center gap-3.5 lg:px-7 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-[44px] lg:before:w-px lg:before:bg-[#D2B478]/25"
                >
                  <Armchair size={36} className="text-[#C89F58] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[26px] lg:text-[31px] text-white leading-none tracking-[-0.01em] whitespace-nowrap tabular-nums">
                      283,380
                      <span className="text-[17px] lg:text-[19px] font-semibold ml-1 text-white/95">
                        m²
                      </span>
                    </p>
                    <p className="font-body text-[12px] lg:text-[12.5px] text-white/80 mt-1.5 leading-snug">
                      Furniture Production
                    </p>
                  </div>
                </motion.div>

                {/* KPI 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.34 }}
                  className="relative flex items-center gap-3.5 lg:pl-7 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-[44px] lg:before:w-px lg:before:bg-[#D2B478]/25"
                >
                  <Layers size={36} className="text-[#C89F58] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[26px] lg:text-[31px] text-white leading-none tracking-[-0.01em] whitespace-nowrap tabular-nums">
                      260,000
                      <span className="text-[17px] lg:text-[19px] font-semibold ml-1 text-white/95">
                        m²
                      </span>
                    </p>
                    <p className="font-body text-[12px] lg:text-[12.5px] text-white/80 mt-1.5 leading-snug">
                      Panel &amp; Primary Processing
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PART 18B: GEOGRAPHIC DISTRIBUTION — FOUR SPECIALISED CLUSTERS (Hình 33 Bottom) ── */}
        <section className="relative pt-8 pb-14 lg:pt-[34px] lg:pb-[58px] bg-[#F7F1EB] border-b border-[#E5DCCE] overflow-hidden">
          {/* Subtle luxury diagonal silk waves across champagne-ivory canvas (Hình 33) */}
          <svg
            viewBox="0 0 1432 610"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="clusters-sheen-1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EFE4D6" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#FFFDF9" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#F5ECE1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="clusters-sheen-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.52" />
                <stop offset="100%" stopColor="#EDE2D3" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 0,480 C 420,440 940,210 1310,0 L 1432,0 L 1432,120 C 1020,330 480,530 0,610 Z"
              fill="url(#clusters-sheen-1)"
            />
            <path
              d="M 110,610 C 560,515 1060,310 1432,70 L 1432,610 Z"
              fill="url(#clusters-sheen-2)"
              opacity="0.48"
            />
          </svg>

          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
            {/* Header Block — exact spacing to Hình 33 */}
            <div className="mb-6 lg:mb-[22px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[1.5px] w-8 bg-[#A87544]" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A693A]">
                  GEOGRAPHIC DISTRIBUTION
                </span>
              </div>
              <h2 className="font-display font-bold text-[#0C2319] leading-[1.12] tracking-[-0.01em] mb-1.5 text-[28px] sm:text-[36px] lg:text-[42px]">
                Four Specialised Manufacturing Clusters.
              </h2>
              <p className="font-body text-[14px] sm:text-[15px] text-[#2F3B36] leading-relaxed">
                Specialised production capabilities across Northern, Central and Southern Vietnam.
              </p>
            </div>

            {/* 2-Column Split: 33.5% Map | 1px Vertical Divider | 64% 2×2 Cards (exact Hình 33 geometry) */}
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-0">
              {/* Left Column: 3D-Embossed Sand-Beige Vietnam Cluster Map */}
              <div className="lg:w-[33.5%] shrink-0 lg:pr-7 flex items-center justify-center">
                <div className="relative w-full max-w-[380px] lg:max-w-none">
                  <svg
                    viewBox="10 72 478 596"
                    className="w-full h-auto max-h-[398px] select-none overflow-visible"
                    aria-label="Four Specialised Manufacturing Clusters in Vietnam"
                  >
                    <defs>
                      {/* Warm tactile sand-stone relief gradient */}
                      <linearGradient id="vn-sand-relief" x1="15%" y1="5%" x2="85%" y2="95%">
                        <stop offset="0%" stopColor="#F5E7D6" />
                        <stop offset="52%" stopColor="#E6D4BC" />
                        <stop offset="100%" stopColor="#D7C2A6" />
                      </linearGradient>
                      {/* Highlight gradient for active/cluster province */}
                      <linearGradient id="vn-sand-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EED6B8" />
                        <stop offset="100%" stopColor="#D9B78E" />
                      </linearGradient>
                      {/* 3D Soft Embossed Drop Shadow */}
                      <filter id="vn-map-3d-shadow" x="-15%" y="-10%" width="135%" height="125%">
                        <feDropShadow
                          dx="-5"
                          dy="9"
                          stdDeviation="6"
                          floodColor="#A69072"
                          floodOpacity="0.45"
                        />
                      </filter>
                      {/* Soft Pill Elevation Shadow */}
                      <filter id="vn-pill-shadow" x="-15%" y="-20%" width="135%" height="160%">
                        <feDropShadow
                          dx="0"
                          dy="4"
                          stdDeviation="3.5"
                          floodColor="#07241A"
                          floodOpacity="0.28"
                        />
                      </filter>
                      {/* Pin Ring Shadow */}
                      <filter id="vn-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow
                          dx="0"
                          dy="2"
                          stdDeviation="1.8"
                          floodColor="#3F2D1D"
                          floodOpacity="0.35"
                        />
                      </filter>
                    </defs>

                    {/* Extruded 3D thickness underlayer */}
                    <g transform="translate(-3.5, 4.5)" opacity="0.72" filter="url(#vn-map-3d-shadow)">
                      {mapData.provinces.map(
                        (prov: { id: string; name: string; path: string }) => (
                          <path
                            key={`extrude-${prov.id}`}
                            d={prov.path}
                            fill="#CBB597"
                            stroke="#CBB597"
                            strokeWidth="1.2"
                          />
                        )
                      )}
                    </g>

                    {/* Top Sculpted Sand-Beige Landmass */}
                    <g>
                      {mapData.provinces.map(
                        (prov: { id: string; name: string; path: string }) => {
                          const isClusterProv = [
                            "Binh Dinh",
                            "Ho Chi Minh city",
                            "Binh Duong",
                            "Dong Nai",
                            "Ba Ria - Vung Tau",
                            "Hung Yen",
                            "Phu Tho",
                            "Vinh Phuc",
                          ].includes(prov.name);
                          return (
                            <path
                              key={prov.id}
                              d={prov.path}
                              fill={
                                isClusterProv
                                  ? "url(#vn-sand-highlight)"
                                  : "url(#vn-sand-relief)"
                              }
                              stroke="#E6D6C0"
                              strokeWidth="0.55"
                            />
                          );
                        }
                      )}
                    </g>

                    {/* Sovereign Archipelagos (Hoang Sa & Truong Sa) */}
                    <g transform="translate(342, 326)" opacity="0.75">
                      <circle cx="14" cy="6" r="2.2" fill="#B58352" />
                      <circle cx="20" cy="9" r="1.4" fill="#B58352" />
                      <text
                        x="17"
                        y="21"
                        textAnchor="middle"
                        fill="#7B6753"
                        fontSize="7.5"
                        fontWeight="700"
                        letterSpacing="0.06em"
                      >
                        HOANG SA
                      </text>
                    </g>
                    <g transform="translate(356, 496)" opacity="0.75">
                      <circle cx="14" cy="6" r="2.2" fill="#B58352" />
                      <circle cx="21" cy="10" r="1.4" fill="#B58352" />
                      <text
                        x="17"
                        y="21"
                        textAnchor="middle"
                        fill="#7B6753"
                        fontSize="7.5"
                        fontWeight="700"
                        letterSpacing="0.06em"
                      >
                        TRUONG SA
                      </text>
                    </g>

                    {/* 1. Hung Yen Pin + Leader + Slanted Dark-Green Pill */}
                    <g
                      className="cursor-pointer transition-opacity"
                      onClick={() => setActiveCluster("hungyen")}
                      onMouseEnter={() => setActiveCluster("hungyen")}
                      onMouseLeave={() => setActiveCluster(null)}
                    >
                      <polyline
                        points="174,190 226,133 258,133"
                        fill="none"
                        stroke={activeCluster === "hungyen" ? "#AB7446" : "#183328"}
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="174"
                        cy="190"
                        r={activeCluster === "hungyen" ? "8" : "6.5"}
                        fill="#AB7446"
                        stroke="#FFFFFF"
                        strokeWidth="2.4"
                        filter="url(#vn-pin-shadow)"
                      />
                      <g transform="translate(260, 118)" filter="url(#vn-pill-shadow)">
                        <rect
                          x="0"
                          y="0"
                          width="126"
                          height="30"
                          rx="6"
                          transform="skewX(-14)"
                          fill={activeCluster === "hungyen" ? "#AB7446" : "#072B1F"}
                        />
                        <text
                          x="60"
                          y="19.5"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="12.5"
                          fontWeight="600"
                        >
                          Hung Yen
                        </text>
                      </g>
                    </g>

                    {/* 2. Phu Tho & Vinh Phuc Pin + Leader + Slanted Dark-Green Pill */}
                    <g
                      className="cursor-pointer transition-opacity"
                      onClick={() => setActiveCluster("phutho")}
                      onMouseEnter={() => setActiveCluster("phutho")}
                      onMouseLeave={() => setActiveCluster(null)}
                    >
                      <polyline
                        points="149,170 212,188 242,188"
                        fill="none"
                        stroke={activeCluster === "phutho" ? "#AB7446" : "#183328"}
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="149"
                        cy="170"
                        r={activeCluster === "phutho" ? "8" : "6.5"}
                        fill="#AB7446"
                        stroke="#FFFFFF"
                        strokeWidth="2.4"
                        filter="url(#vn-pin-shadow)"
                      />
                      <g transform="translate(244, 173)" filter="url(#vn-pill-shadow)">
                        <rect
                          x="0"
                          y="0"
                          width="224"
                          height="30"
                          rx="6"
                          transform="skewX(-14)"
                          fill={activeCluster === "phutho" ? "#AB7446" : "#072B1F"}
                        />
                        <text
                          x="108"
                          y="19.5"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="12.5"
                          fontWeight="600"
                        >
                          Phu Tho &amp; Vinh Phuc
                        </text>
                      </g>
                    </g>

                    {/* 3. Quy Nhon Pin + Leader + Slanted Dark-Green Pill */}
                    <g
                      className="cursor-pointer transition-opacity"
                      onClick={() => setActiveCluster("quynhon")}
                      onMouseEnter={() => setActiveCluster("quynhon")}
                      onMouseLeave={() => setActiveCluster(null)}
                    >
                      <polyline
                        points="279,446 308,425 326,425"
                        fill="none"
                        stroke={activeCluster === "quynhon" ? "#AB7446" : "#183328"}
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="279"
                        cy="446"
                        r={activeCluster === "quynhon" ? "8" : "6.5"}
                        fill="#AB7446"
                        stroke="#FFFFFF"
                        strokeWidth="2.4"
                        filter="url(#vn-pin-shadow)"
                      />
                      <g transform="translate(328, 410)" filter="url(#vn-pill-shadow)">
                        <rect
                          x="0"
                          y="0"
                          width="134"
                          height="30"
                          rx="6"
                          transform="skewX(-14)"
                          fill={activeCluster === "quynhon" ? "#AB7446" : "#072B1F"}
                        />
                        <text
                          x="63"
                          y="19.5"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="12.5"
                          fontWeight="600"
                        >
                          Quy Nhon
                        </text>
                      </g>
                    </g>

                    {/* 4. Ho Chi Minh City Pin + Leader + Slanted Dark-Green Pill */}
                    <g
                      className="cursor-pointer transition-opacity"
                      onClick={() => setActiveCluster("hcmc")}
                      onMouseEnter={() => setActiveCluster("hcmc")}
                      onMouseLeave={() => setActiveCluster(null)}
                    >
                      <polyline
                        points="196,572 292,572"
                        fill="none"
                        stroke={activeCluster === "hcmc" ? "#AB7446" : "#183328"}
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="196"
                        cy="572"
                        r={activeCluster === "hcmc" ? "8" : "6.5"}
                        fill="#AB7446"
                        stroke="#FFFFFF"
                        strokeWidth="2.4"
                        filter="url(#vn-pin-shadow)"
                      />
                      <g transform="translate(294, 557)" filter="url(#vn-pill-shadow)">
                        <rect
                          x="0"
                          y="0"
                          width="174"
                          height="30"
                          rx="6"
                          transform="skewX(-14)"
                          fill={activeCluster === "hcmc" ? "#AB7446" : "#072B1F"}
                        />
                        <text
                          x="83"
                          y="19.5"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="12.5"
                          fontWeight="600"
                        >
                          Ho Chi Minh City
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Crisp 1px Vertical Divider matching height of 2×2 Cards (x=510 in Hình 33) */}
              <div className="hidden lg:block w-px bg-[#DDD3C4] self-stretch shrink-0" />

              {/* Right Column: 2×2 Regional Cluster Cards (exact Hình 33 dimensions ~188px height) */}
              <div className="flex-1 lg:pl-8 grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-[22px] gap-y-4 lg:gap-y-[18px]">
                {REGIONAL_FACILITY_BLOCKS.map((block, index) => {
                  const isHighlighted = activeCluster === block.id;
                  const shortTitle =
                    block.id === "hcmc" ? "Ho Chi Minh City" : block.clusterName;
                  return (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      onMouseEnter={() => setActiveCluster(block.id)}
                      onMouseLeave={() => setActiveCluster(null)}
                      className={`group relative rounded-[14px] min-h-[184px] lg:h-[188px] overflow-hidden border transition-all duration-300 bg-gradient-to-br from-[#FFF9F4] via-[#FAF3EA] to-[#F5EADF] ${
                        isHighlighted
                          ? "border-[#AB7446] ring-1 ring-[#AB7446]/35 shadow-[0_10px_24px_-6px_rgba(14,36,27,0.14)] -translate-y-0.5"
                          : "border-[#E3D7C7] shadow-[0_4px_12px_-3px_rgba(110,88,64,0.10),0_1px_2px_rgba(110,88,64,0.06)]"
                      }`}
                    >
                      {/* Right-side Seamless Product Cutout + Diagonal Studio Lighting */}
                      <div className="absolute inset-y-0 right-0 w-[44%] sm:w-[45%] pointer-events-none select-none overflow-hidden">
                        <img
                          src={block.clusterCardImage}
                          alt={shortTitle}
                          className="w-full h-full object-cover object-right transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {/* Soft seamless blend fade on left edge into card ivory */}
                        <div
                          className="absolute inset-y-0 left-0 w-10"
                          style={{
                            background:
                              "linear-gradient(90deg, #FAF3EA 0%, rgba(250, 243, 234, 0.72) 40%, rgba(250, 243, 234, 0) 100%)",
                          }}
                        />
                      </div>

                      {/* Left-side Content Hierarchy */}
                      <div className="relative z-10 w-[64%] sm:w-[63%] h-full px-5 py-4 lg:px-[22px] lg:py-[19px] flex flex-col justify-between">
                        <div>
                          <span className="font-body text-[10px] lg:text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#4E5A54] block">
                            {block.regionLabel}
                          </span>
                          <h3 className="font-display font-bold text-[18px] sm:text-[19px] xl:text-[21px] text-[#0C2319] leading-[1.18] mt-1 whitespace-nowrap">
                            {shortTitle}
                          </h3>
                          <p className="font-display font-bold text-[23px] lg:text-[27px] text-[#AB7446] leading-[1.15] mt-1.5 whitespace-nowrap tracking-[-0.01em] tabular-nums">
                            {block.totalFootprint}
                          </p>
                          <div className="w-7 h-[1.5px] bg-[#AB7446]/80 mt-2.5" />
                        </div>

                        <p className="font-body text-[12px] lg:text-[12.5px] text-[#2B3732] leading-[1.45] mt-2 max-w-[235px]">
                          {block.clusterCardSummary}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── PART 19: 11 FACILITIES GROUPED BY 4 REGIONAL BLOCKS (Hình 35) ── */}
        <section className="py-16 lg:py-20 bg-[#F7F4ED] border-b border-black/5">
          <div className="container mx-auto px-6 lg:px-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="h-[1.5px] w-7 bg-[#B97846]" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#B97846]">
                  OUR PRODUCTION FACILITIES
                </span>
              </div>

              <h2
                className="font-display font-bold text-[#0E241B] leading-[1.12] mb-3"
                style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)" }}
              >
                11 Facilities. Specialised
                <br />
                Manufacturing Expertise.
              </h2>

              <p className="font-body text-sm sm:text-base text-[#37413D] mb-6">
                Explore the production capabilities of our family-owned manufacturing group across
                four regional clusters in Vietnam.
              </p>

              {/* 2 Classification Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE0] border border-[#D8CBB8] font-body text-xs font-bold text-[#0E241B]">
                  <Armchair size={15} className="text-[#B97846]" />
                  <span>10 Furniture Facilities</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE0] border border-[#D8CBB8] font-body text-xs font-bold text-[#0E241B]">
                  <Layers size={15} className="text-[#B97846]" />
                  <span>1 Wood Panel &amp; Primary Processing Facility</span>
                </span>
              </div>
            </div>

            {/* 4 Horizontal Regional Facility Blocks */}
            <div className="space-y-5">
              {REGIONAL_FACILITY_BLOCKS.map((block) => (
                <div
                  key={block.id}
                  className="rounded-2xl overflow-hidden bg-[#FBF9F5] border border-[#E2DACB] shadow-xs grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Left Regional Header Banner */}
                  <div className="lg:col-span-3 relative bg-[#0E261C] text-white p-6 flex flex-col justify-between overflow-hidden min-h-[140px]">
                    <img
                      src={block.bannerImage}
                      alt={block.clusterName}
                      className="absolute inset-0 w-full h-full object-cover opacity-35"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(12, 34, 24, 0.92) 0%, rgba(12, 34, 24, 0.65) 100%)",
                      }}
                    />
                    <div className="relative z-10">
                      <span className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-[#E5B869] block mb-1.5">
                        {block.regionLabel}
                      </span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug mb-2">
                        {block.clusterName}
                      </h3>
                      <span className="font-body text-xs text-white/85 font-medium">
                        {block.facilityCountLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right Facility Breakdown Table */}
                  <div className="lg:col-span-9 p-5 sm:p-6 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-[#E6DFD1]">
                      <div className="grid grid-cols-12 w-full items-center text-[11px] font-body font-bold uppercase tracking-wider text-[#4A5550]">
                        <div className="col-span-3 sm:col-span-2">FACILITY</div>
                        <div className="col-span-4 sm:col-span-3">OPERATING FOOTPRINT</div>
                        <div className="col-span-5 sm:col-span-4">CORE MANUFACTURING FOCUS</div>
                        <div className="col-span-12 sm:col-span-3 flex sm:justify-end mt-2 sm:mt-0">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F2E9D8] text-[#B97846] font-display font-bold text-sm normal-case">
                            <Factory size={14} />
                            <span>{block.totalFootprint}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-[#ECE6DA]">
                      {block.facilities.map((fac) => (
                        <div
                          key={fac.id}
                          className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center font-body text-sm"
                        >
                          <div className="sm:col-span-2 font-bold text-[#0E241B]">{fac.name}</div>
                          <div className="sm:col-span-3 font-bold text-[#B97846]">
                            {fac.footprint}
                          </div>
                          <div className="sm:col-span-7 text-xs sm:text-sm text-[#2D3732] leading-relaxed">
                            {fac.focus}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Combined Manufacturing Footprint Dark Green Bar */}
            <div className="mt-8 rounded-2xl bg-[#0E261C] text-white px-6 sm:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#C88A36]/30">
              <div className="flex items-center gap-4">
                <Layers size={32} className="text-[#D89B3C] shrink-0" strokeWidth={1.6} />
                <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-white">
                  COMBINED
                  <br />
                  MANUFACTURING FOOTPRINT
                </span>
              </div>

              <div className="hidden md:block h-10 w-px bg-white/20" />

              <div className="font-display font-bold text-3xl sm:text-4xl text-[#E5B869] whitespace-nowrap">
                543,380 <span className="text-2xl font-normal">m²</span>
              </div>

              <div className="hidden md:block h-10 w-px bg-white/20" />

              <p className="font-body text-xs sm:text-sm text-white/90 text-center md:text-left max-w-md">
                <strong>10</strong> furniture production facilities and <strong>1</strong> wood
                panel &amp; primary-processing facility.
              </p>
            </div>
          </div>
        </section>

        {/* ── PART 21: EXPORT CAPACITY & LOGISTICS (600 Containers / Month — Hình 38 + Strict Rules) ── */}
        <section className="py-16 lg:py-20 bg-[#FAF8F3] border-b border-black/5">
          <div className="container mx-auto px-6 lg:px-10">
            {/* Top Export Banner with Port Crane & Container Ship */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0E261C] text-white p-6 sm:p-10 mb-8 shadow-lg border border-[#C88A36]/30">
              <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none">
                <img
                  src="/img/pdf-guide/manufacturing/export-port-hero.jpg"
                  alt="Container Ship at Vietnam Export Gateway"
                  className="w-full h-full object-cover opacity-35 lg:opacity-85"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #0E261C 0%, rgba(14, 38, 28, 0.88) 40%, rgba(14, 38, 28, 0.15) 100%)",
                  }}
                />
              </div>

              <div className="relative z-10 max-w-2xl mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-[1.5px] w-7 bg-[#D89B3C]" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                    EXPORT CAPACITY &amp; LOGISTICS
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-white leading-[1.1] mb-3"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  600 Containers (40HQ)
                  <br />
                  per Month
                </h2>

                <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed">
                  Reference monthly export capacity across our 10 furniture production facilities
                  (Facilities 01–10), with access to major international ports in Vietnam.
                </p>
              </div>

              {/* 3-Metric Count-Up Bar */}
              <div className="relative z-10 rounded-xl bg-[#0A1D15]/95 border border-[#D89B3C]/40 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
                <div className="flex items-center gap-4 md:pr-6">
                  <Box size={34} className="text-[#D89B3C] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-bold text-3xl sm:text-4xl text-white leading-none">
                      <CountUpNumber target={600} />
                    </p>
                    <p className="font-body text-xs sm:text-sm font-bold text-white mt-1">
                      Containers (40HQ) / Month
                    </p>
                    <p className="font-body text-[11px] text-white/70">
                      Total from 10 Furniture Facilities
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:px-6 md:border-l md:border-white/15">
                  <Factory size={34} className="text-[#D89B3C] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-bold text-3xl sm:text-4xl text-white leading-none">
                      <CountUpNumber target={10} />
                    </p>
                    <p className="font-body text-xs sm:text-sm font-bold text-white mt-1">
                      Furniture Facilities
                    </p>
                    <p className="font-body text-[11px] text-white/70">(Facilities 01–10)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:pl-6 md:border-l md:border-white/15">
                  <Ship size={34} className="text-[#D89B3C] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-bold text-3xl sm:text-4xl text-white leading-none">
                      <CountUpNumber target={3} />
                    </p>
                    <p className="font-body text-xs sm:text-sm font-bold text-white mt-1">
                      Primary Export Gateway Areas
                    </p>
                    <p className="font-body text-[11px] text-white/70">
                      Hai Phong · Cat Lai / Cai Mep – Thi Vai · Quy Nhon
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main 2-Column Logistics Map + Region Table & Port Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column (44%): Vietnam Logistics & Export Gateways Map (4-Stage Animation per Page 36) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 rounded-2xl bg-[#FBF9F5] border border-[#E2DACB] p-6 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="h-[1.5px] w-6 bg-[#B97846]" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#9E3B24]">
                    LOGISTICS &amp; EXPORT GATEWAYS
                  </span>
                </div>

                <div className="relative w-full max-w-[360px] mx-auto my-auto">
                  <svg
                    viewBox="55 75 335 565"
                    className="w-full h-auto select-none"
                    aria-label="Vietnam Logistics and Export Gateways Map"
                  >
                    {/* Stage 1: Accurate Vietnam Map Silhouette */}
                    <g>
                      {mapData.provinces.map(
                        (prov: { id: string; name: string; path: string }) => {
                          const isClusterProv = [
                            "Binh Dinh",
                            "Ho Chi Minh city",
                            "Binh Duong",
                            "Dong Nai",
                            "Ba Ria - Vung Tau",
                            "Hung Yen",
                            "Phu Tho",
                            "Vinh Phuc",
                          ].includes(prov.name);
                          return (
                            <path
                              key={prov.id}
                              d={prov.path}
                              fill={isClusterProv ? "#DFC39D" : "#EFE6D5"}
                              stroke="#D5C5AA"
                              strokeWidth="0.6"
                            />
                          );
                        }
                      )}
                    </g>

                    {/* Stage 3: 4 Independent Short Curved Dashed Port Connection Lines (700-900ms draw) */}
                    {/* 1. Hung Yen -> Hai Phong Port */}
                    <motion.path
                      d="M 176 184 Q 192 178 205 190"
                      fill="none"
                      stroke="#173C2C"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("hungyen", "haiphong_port") ? 1 : 0.25,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.75 }}
                    />
                    {/* 2. Phu Tho & Vinh Phuc -> Hai Phong Port */}
                    <motion.path
                      d="M 150 172 Q 178 164 205 190"
                      fill="none"
                      stroke="#173C2C"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("phutho", "haiphong_port") ? 1 : 0.25,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    />
                    {/* 3. Quy Nhon -> Quy Nhon Port */}
                    <motion.path
                      d="M 243 426 Q 254 428 264 434"
                      fill="none"
                      stroke="#173C2C"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("quynhon", "quynhon_port") ? 1 : 0.25,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.05 }}
                    />
                    {/* 4. HCMC & Southern Corridor -> Cat Lai / Cai Mep - Thi Vai */}
                    <motion.path
                      d="M 192 536 Q 204 544 214 552"
                      fill="none"
                      stroke="#173C2C"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("hcmc", "south_ports") ? 1 : 0.25,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />

                    {/* Stage 2: 10 Dark-Green Facility Dots (4 - 1 - 1 - 4, sequential North to South) */}
                    {/* Cluster B (North-West): Phu Tho & Vinh Phuc (1 dot: Facility 10) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{
                        opacity: isExportClusterActive("phutho", "haiphong_port") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      onMouseEnter={() => setHoveredExportRegion("phutho")}
                      onMouseLeave={() => setHoveredExportRegion(null)}
                      onClick={() =>
                        setHoveredExportRegion(hoveredExportRegion === "phutho" ? null : "phutho")
                      }
                    >
                      <line x1="138" y1="186" x2="150" y2="172" stroke="#173C2C" strokeWidth="1.2" />
                      <rect
                        x="58"
                        y="168"
                        width="82"
                        height="44"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#173C2C"
                        strokeWidth="1"
                      />
                      <text x="65" y="182" fill="#0E241B" fontSize="9" fontWeight="800">
                        Phu Tho &amp;
                      </text>
                      <text x="65" y="193" fill="#0E241B" fontSize="9" fontWeight="800">
                        Vinh Phuc
                      </text>
                      <text x="65" y="205" fill="#37413D" fontSize="8" fontWeight="600">
                        (Facility 10)
                      </text>
                      <circle cx="150" cy="172" r="4.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1.2" />
                    </motion.g>

                    {/* Cluster A (North): Hung Yen (4 dots: Facilities 06-09) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{
                        opacity: isExportClusterActive("hungyen", "haiphong_port") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.34 }}
                      onMouseEnter={() => setHoveredExportRegion("hungyen")}
                      onMouseLeave={() => setHoveredExportRegion(null)}
                      onClick={() =>
                        setHoveredExportRegion(hoveredExportRegion === "hungyen" ? null : "hungyen")
                      }
                    >
                      <line x1="158" y1="128" x2="167" y2="174" stroke="#173C2C" strokeWidth="1.2" />
                      <rect
                        x="95"
                        y="94"
                        width="112"
                        height="34"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#173C2C"
                        strokeWidth="1"
                      />
                      <text x="103" y="109" fill="#0E241B" fontSize="9.5" fontWeight="800">
                        Hung Yen
                      </text>
                      <text x="103" y="121" fill="#37413D" fontSize="8.5" fontWeight="600">
                        (Facilities 06–09)
                      </text>
                      <circle cx="166" cy="179" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                      <circle cx="176" cy="179" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                      <circle cx="166" cy="189" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                      <circle cx="176" cy="189" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                    </motion.g>

                    {/* Cluster C (Central): Quy Nhon (1 dot: Facility 01) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{
                        opacity: isExportClusterActive("quynhon", "quynhon_port") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.48 }}
                      onMouseEnter={() => setHoveredExportRegion("quynhon")}
                      onMouseLeave={() => setHoveredExportRegion(null)}
                      onClick={() =>
                        setHoveredExportRegion(hoveredExportRegion === "quynhon" ? null : "quynhon")
                      }
                    >
                      <line x1="210" y1="402" x2="243" y2="426" stroke="#173C2C" strokeWidth="1.2" />
                      <rect
                        x="148"
                        y="368"
                        width="82"
                        height="34"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#173C2C"
                        strokeWidth="1"
                      />
                      <text x="156" y="383" fill="#0E241B" fontSize="9.5" fontWeight="800">
                        Quy Nhon
                      </text>
                      <text x="156" y="395" fill="#37413D" fontSize="8.5" fontWeight="600">
                        (Facility 01)
                      </text>
                      <circle cx="243" cy="426" r="4.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1.2" />
                    </motion.g>

                    {/* Cluster D (South): Ho Chi Minh City & Southern Corridor (4 dots: Facilities 02-05) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{
                        opacity: isExportClusterActive("hcmc", "south_ports") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.62 }}
                      onMouseEnter={() => setHoveredExportRegion("hcmc")}
                      onMouseLeave={() => setHoveredExportRegion(null)}
                      onClick={() =>
                        setHoveredExportRegion(hoveredExportRegion === "hcmc" ? null : "hcmc")
                      }
                    >
                      <line x1="155" y1="505" x2="180" y2="528" stroke="#173C2C" strokeWidth="1.2" />
                      <rect
                        x="58"
                        y="460"
                        width="115"
                        height="44"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#173C2C"
                        strokeWidth="1"
                      />
                      <text x="65" y="474" fill="#0E241B" fontSize="9" fontWeight="800">
                        Ho Chi Minh City
                      </text>
                      <text x="65" y="485" fill="#0E241B" fontSize="9" fontWeight="800">
                        &amp; Southern Corridor
                      </text>
                      <text x="65" y="497" fill="#37413D" fontSize="8" fontWeight="600">
                        (Facilities 02–05)
                      </text>
                      <circle cx="182" cy="530" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                      <circle cx="192" cy="530" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                      <circle cx="182" cy="540" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                      <circle cx="192" cy="540" r="4.2" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
                    </motion.g>

                    {/* Stage 4: 3 Bronze Anchor Export Port Gateways (scale 0.95 -> 1 after lines finish) */}
                    {/* Port 1: Hai Phong Port */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: isPortActive("haiphong_port") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.45 }}
                      onMouseEnter={() => setHoveredPortId("haiphong_port")}
                      onMouseLeave={() => setHoveredPortId(null)}
                      onClick={() =>
                        setHoveredPortId(hoveredPortId === "haiphong_port" ? null : "haiphong_port")
                      }
                    >
                      <circle cx="205" cy="192" r="9" fill="#C57B35" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="205" y="196" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
                        ⚓
                      </text>
                      <rect
                        x="220"
                        y="176"
                        width="128"
                        height="34"
                        rx="6"
                        fill="#FBF8F1"
                        stroke="#C57B35"
                        strokeWidth="1"
                      />
                      <text x="230" y="191" fill="#0E241B" fontSize="9.5" fontWeight="800">
                        Hai Phong Port
                      </text>
                      <text x="230" y="203" fill="#4A5550" fontSize="8" fontWeight="600">
                        (Northern Gateway)
                      </text>
                    </motion.g>

                    {/* Port 2: Quy Nhon Port */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: isPortActive("quynhon_port") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.55 }}
                      onMouseEnter={() => setHoveredPortId("quynhon_port")}
                      onMouseLeave={() => setHoveredPortId(null)}
                      onClick={() =>
                        setHoveredPortId(hoveredPortId === "quynhon_port" ? null : "quynhon_port")
                      }
                    >
                      <circle cx="264" cy="436" r="9" fill="#C57B35" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="264" y="440" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
                        ⚓
                      </text>
                      <rect
                        x="278"
                        y="420"
                        width="108"
                        height="34"
                        rx="6"
                        fill="#FBF8F1"
                        stroke="#C57B35"
                        strokeWidth="1"
                      />
                      <text x="286" y="435" fill="#0E241B" fontSize="9.5" fontWeight="800">
                        Quy Nhon Port
                      </text>
                      <text x="286" y="447" fill="#4A5550" fontSize="8" fontWeight="600">
                        (Central Gateway)
                      </text>
                    </motion.g>

                    {/* Port 3: Cat Lai / Cai Mep - Thi Vai */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: isPortActive("south_ports") ? 1 : 0.3,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.65 }}
                      onMouseEnter={() => setHoveredPortId("south_ports")}
                      onMouseLeave={() => setHoveredPortId(null)}
                      onClick={() =>
                        setHoveredPortId(hoveredPortId === "south_ports" ? null : "south_ports")
                      }
                    >
                      <circle cx="214" cy="554" r="9" fill="#C57B35" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="214" y="558" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
                        ⚓
                      </text>
                      <rect
                        x="228"
                        y="534"
                        width="142"
                        height="44"
                        rx="6"
                        fill="#FBF8F1"
                        stroke="#C57B35"
                        strokeWidth="1"
                      />
                      <text x="236" y="548" fill="#0E241B" fontSize="9" fontWeight="800">
                        Cat Lai /
                      </text>
                      <text x="236" y="559" fill="#0E241B" fontSize="9" fontWeight="800">
                        Cai Mep – Thi Vai
                      </text>
                      <text x="236" y="571" fill="#4A5550" fontSize="8" fontWeight="600">
                        (Southern Gateway)
                      </text>
                    </motion.g>
                  </svg>
                </div>

                {/* Map Legend */}
                <div className="pt-4 border-t border-[#E6DFD1] flex flex-wrap items-center justify-center gap-4 text-xs font-body text-[#2D3732]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#173C2C] inline-block" />
                    <span>Furniture facility (01–10)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#C57B35] text-white text-[10px] inline-flex items-center justify-center font-bold">
                      ⚓
                    </span>
                    <span>Export gateway</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-5 border-t-2 border-dashed border-[#173C2C] inline-block" />
                    <span>Logistics connection</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Column (56%): Region Breakdown Table (without unverified container numbers) + 3 Port Gateway Cards */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                {/* Right Top: Manufacturing Regions Table (Page 42 strict specification) */}
                <div className="rounded-2xl bg-[#FBF9F5] border border-[#E2DACB] p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="h-[1.5px] w-6 bg-[#B97846]" />
                    <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#9E3B24]">
                      MANUFACTURING REGIONS &amp; PRIMARY GATEWAYS (FACILITIES 01–10)
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-[#E2DACB]">
                    <table className="w-full text-left font-body text-sm">
                      <thead className="bg-[#0E261C] text-white text-xs uppercase tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 font-bold">Manufacturing Region</th>
                          <th className="py-3.5 px-4 font-bold text-center">Facilities</th>
                          <th className="py-3.5 px-4 font-bold text-center">Count</th>
                          <th className="py-3.5 px-4 font-bold">Primary Gateway</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E1D3] bg-white">
                        {EXPORT_REGION_ROWS.map((row) => {
                          const isHovered = hoveredExportRegion === row.id;
                          return (
                            <tr
                              key={row.id}
                              onMouseEnter={() => setHoveredExportRegion(row.id)}
                              onMouseLeave={() => setHoveredExportRegion(null)}
                              className={`transition-colors cursor-pointer ${isHovered ? "bg-[#F4EFE4]" : "hover:bg-[#FAF7F0]"
                                }`}
                            >
                              <td className="py-3.5 px-4 font-bold text-[#0E241B] flex items-center gap-2.5">
                                <Factory size={16} className="text-[#B97846] shrink-0" />
                                <span>{row.regionName}</span>
                              </td>
                              <td className="py-3.5 px-4 text-center font-semibold text-[#2D3732] whitespace-nowrap">
                                {row.facilitiesRange}
                              </td>
                              <td className="py-3.5 px-4 text-center font-display font-bold text-lg text-[#B97846]">
                                {row.count}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-[#173C2C] whitespace-nowrap">
                                {row.primaryGateway}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-[#F3EADF] border-t border-[#DECZBA] font-body">
                        <tr>
                          <td className="py-3.5 px-4 font-bold text-[#9E3B24]">
                            Total – Furniture Facilities (01 – 10)
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-[#0E241B]">
                            01 – 10
                          </td>
                          <td className="py-3.5 px-4 text-center font-display font-bold text-xl text-[#9E3B24]">
                            10
                          </td>
                          <td className="py-3.5 px-4 text-xs font-bold text-[#0E241B]">
                            3 Primary Export Gateway Areas
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Right Bottom: 3 Export Gateway Cards with Port Photos */}
                <div className="rounded-2xl bg-[#FBF9F5] border border-[#E2DACB] p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="h-[1.5px] w-6 bg-[#B97846]" />
                    <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#9E3B24]">
                      EXPORT GATEWAYS
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {EXPORT_GATEWAY_CARDS.map((port) => {
                      const isHovered = hoveredPortId === port.id;
                      return (
                        <div
                          key={port.id}
                          onMouseEnter={() => setHoveredPortId(port.id)}
                          onMouseLeave={() => setHoveredPortId(null)}
                          className={`rounded-xl border transition-all overflow-hidden flex items-stretch justify-between bg-[#F6F3EC] ${isHovered
                            ? "border-[#C57B35] ring-2 ring-[#C57B35]/25"
                            : "border-[#E3D9C6]"
                            }`}
                        >
                          <div className="p-4 sm:p-5 flex items-center gap-4 flex-1">
                            <div className="w-11 h-11 rounded-xl bg-[#EFE6D5] border border-[#D8CBB8] flex items-center justify-center shrink-0">
                              <Ship size={22} className="text-[#B97846]" strokeWidth={1.75} />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-base sm:text-lg text-[#0E241B]">
                                {port.name}
                              </h3>
                              <span className="inline-block px-2.5 py-0.5 rounded bg-[#EFE5D4] text-[#9E3B24] font-body text-xs font-bold my-1">
                                {port.roleLabel}
                              </span>
                              <p className="font-body text-xs text-[#2D3732]">{port.servedFrom}</p>
                            </div>
                          </div>

                          <div className="hidden sm:block w-44 shrink-0 overflow-hidden">
                            <img
                              src={port.image}
                              alt={port.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Dark-Green Reference Capacity Note Bar */}
            <div className="mt-6 rounded-xl bg-[#122E22] text-white px-6 py-4 flex items-start gap-3.5 border border-[#C88A36]/30 shadow-sm">
              <Info size={18} className="text-[#E5B869] shrink-0 mt-0.5" />
              <p className="font-body text-xs sm:text-sm text-white/90 leading-relaxed">
                <strong className="text-[#E5B869]">Reference Capacity Note:</strong> The stated
                monthly capacity of approximately 600 × 40HQ containers represents an indicative
                combined planning capacity across 10 furniture production facilities (Facilities
                01–10). Actual output varies by product specifications, production mix and order
                scheduling. Facility 11, dedicated to wood panels and primary processing, is
                excluded.
              </p>
            </div>
          </div>
        </section>

        {/* ── PART 22A: OUR GLOBAL MARKETS (29 Countries — Hình 40) ── */}
        <section className="py-16 lg:py-20 bg-[#F7F4ED] border-b border-black/5">
          <div className="container mx-auto px-6 lg:px-10">
            {/* Header with Port Ship Image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#FBF9F5] border border-[#E2DACB] p-6 sm:p-10 mb-8 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="h-[1.5px] w-7 bg-[#B97846]" />
                    <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#B97846]">
                      INTERNATIONAL REACH
                    </span>
                  </div>
                  <h2
                    className="font-display font-bold text-[#0E241B] leading-tight mb-3"
                    style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
                  >
                    Our Global Markets
                  </h2>
                  <p className="font-body text-sm sm:text-base text-[#2D3732] leading-relaxed max-w-xl">
                    Exporting to 29 countries across North America, Europe, Middle East &amp;
                    Eurasia, and Asia-Pacific &amp; Africa, with long-term partnerships worldwide.
                  </p>
                </div>

                <div className="lg:col-span-5 rounded-xl overflow-hidden max-h-[160px]">
                  <img
                    src="/img/pdf-guide/manufacturing/global-markets-ship.jpg"
                    alt="DHT Global Export Shipping"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 3-Stat Dark-Green Bar */}
              <div className="mt-8 rounded-xl bg-[#0E261C] text-white p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 border border-[#C88A36]/35">
                <div className="flex items-center gap-4 md:pr-6">
                  <Globe2 size={32} className="text-[#D89B3C] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-none">
                      29
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/85 mt-1">
                      Export Countries
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:px-6 md:border-l md:border-white/15">
                  <Ship size={32} className="text-[#D89B3C] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-none">
                      4
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/85 mt-1">
                      Global Regions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:pl-6 md:border-l md:border-white/15">
                  <Box size={32} className="text-[#D89B3C] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-none">
                      10+
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/85 mt-1">
                      Years of Export Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* World Map + 4 Regional Country Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left (62%): Dark-Green World Map + 6 Bottom Capability Icons */}
              <div className="lg:col-span-7 rounded-2xl bg-[#0B2017] text-white p-5 sm:p-6 border border-[#C88A36]/25 flex flex-col justify-between shadow-md">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0E281D] border border-white/10">
                  <svg
                    viewBox="60 50 860 400"
                    className="w-full h-full select-none"
                    aria-label="DHT 29 Global Export Markets Map"
                  >
                    {/* Continents */}
                    <g fill="#194230" stroke="#285E46" strokeWidth="1">
                      {/* North America */}
                      <path d="M100,90 L280,85 L300,165 L240,235 L165,225 L110,165 Z" />
                      {/* South America */}
                      <path d="M245,250 L330,275 L315,410 L265,420 L235,325 Z" />
                      {/* Europe */}
                      <path d="M445,95 L560,90 L570,180 L515,192 L450,185 Z" />
                      {/* Africa */}
                      <path d="M450,205 L570,210 L600,305 L550,395 L500,390 L470,300 Z" />
                      {/* Eurasia & Asia */}
                      <path d="M565,85 L865,90 L880,240 L760,290 L660,270 L570,240 L550,180 Z" />
                      {/* Australia */}
                      <path d="M760,330 L865,330 L875,400 L770,400 Z" />
                    </g>

                    {/* Subtle Europe Callout Circle */}
                    <circle
                      cx="495"
                      cy="150"
                      r="36"
                      fill="rgba(216, 155, 60, 0.12)"
                      stroke="#D89B3C"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="460"
                      y1="162"
                      x2="310"
                      y2="225"
                      stroke="#D89B3C"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />

                    {/* Europe Inset Circle (Bottom-Left of Map) */}
                    <g transform="translate(215, 305)">
                      <circle
                        cx="0"
                        cy="0"
                        r="95"
                        fill="#0E261C"
                        stroke="#D89B3C"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-70"
                        textAnchor="middle"
                        fill="#E5B869"
                        fontSize="10"
                        fontWeight="800"
                      >
                        EUROPE (14 MARKETS)
                      </text>
                      {[
                        { name: "UK", x: -55, y: -25 },
                        { name: "DENMARK", x: -18, y: -48 },
                        { name: "ESTONIA", x: 35, y: -48 },
                        { name: "NETHERLANDS", x: -22, y: -22 },
                        { name: "POLAND", x: 38, y: -20 },
                        { name: "FRANCE", x: -48, y: 5 },
                        { name: "GERMANY", x: -5, y: 0 },
                        { name: "SLOVAKIA", x: 42, y: 5 },
                        { name: "AUSTRIA", x: 0, y: 22 },
                        { name: "HUNGARY", x: 42, y: 26 },
                        { name: "SPAIN", x: -52, y: 42 },
                        { name: "ITALY", x: -18, y: 44 },
                        { name: "SLOVENIA", x: 18, y: 48 },
                        { name: "GREECE", x: 32, y: 68 },
                      ].map((eu) => (
                        <g key={eu.name} transform={`translate(${eu.x}, ${eu.y})`}>
                          <circle cx="0" cy="0" r="3.5" fill="#E5B869" />
                          <text x="6" y="3" fill="#FFFFFF" fontSize="7.5" fontWeight="700">
                            {eu.name}
                          </text>
                        </g>
                      ))}
                    </g>

                    {/* Vietnam Origin Star */}
                    <g transform="translate(735, 245)">
                      <circle cx="0" cy="0" r="9" fill="#D89B3C" fillOpacity="0.3" />
                      <circle cx="0" cy="0" r="4.5" fill="#E5B869" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="12" y="4" fill="#E5B869" fontSize="12" fontWeight="800">
                        VIETNAM
                      </text>
                    </g>

                    {/* Global Country Pins */}
                    {[
                      { name: "CANADA", x: 165, y: 125 },
                      { name: "UNITED STATES", x: 185, y: 168 },
                      { name: "RUSSIA", x: 645, y: 118 },
                      { name: "GEORGIA", x: 585, y: 158 },
                      { name: "TÜRKIYE", x: 562, y: 178 },
                      { name: "ISRAEL", x: 558, y: 202 },
                      { name: "LEBANON", x: 558, y: 220 },
                      { name: "SAUDI ARABIA", x: 590, y: 245 },
                      { name: "UAE / QATAR", x: 618, y: 225 },
                      { name: "INDIA", x: 678, y: 220 },
                      { name: "CHINA", x: 740, y: 190 },
                      { name: "MAURITIUS", x: 615, y: 335 },
                      { name: "SOUTH AFRICA", x: 530, y: 375 },
                      { name: "AUSTRALIA", x: 800, y: 355 },
                    ].map((pin) => (
                      <g key={pin.name} transform={`translate(${pin.x}, ${pin.y})`}>
                        <circle
                          cx="0"
                          cy="0"
                          r="4"
                          fill="#E5B869"
                          stroke="#0B2017"
                          strokeWidth="1.2"
                        />
                        <text x="7" y="3.5" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
                          {pin.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Bottom 6 Logistics Capability Icons */}
                <div className="pt-5 mt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs text-white/90 font-body">
                  <div className="flex items-center gap-2">
                    <Ship size={18} className="text-[#D89B3C] shrink-0" />
                    <span className="font-semibold">FCL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box size={18} className="text-[#D89B3C] shrink-0" />
                    <span className="font-semibold">LCL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-[#D89B3C] shrink-0" />
                    <span className="leading-tight">Commercial documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-[#D89B3C] shrink-0" />
                    <span className="leading-tight">Packing information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardList size={18} className="text-[#D89B3C] shrink-0" />
                    <span className="leading-tight">Loading plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-[#D89B3C] shrink-0" />
                    <span className="leading-tight">Shipment schedules</span>
                  </div>
                </div>
              </div>

              {/* Right (38%): 4 Regional Cards Listing 29 Countries */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {GLOBAL_MARKET_REGIONS.map((region) => (
                  <div
                    key={region.id}
                    className="rounded-xl bg-[#FBF9F5] border border-[#E2DACB] p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <Globe2 size={18} className="text-[#B97846]" />
                        <h3 className="font-body text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0E241B]">
                          {region.name}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#173C2C] text-white font-body text-xs font-bold">
                        {region.count}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-xs sm:text-sm text-[#2D3732] leading-relaxed">
                      {region.countries.map((country, idx) => (
                        <span
                          key={country}
                          onMouseEnter={() => setHoveredMarketCountry(country)}
                          onMouseLeave={() => setHoveredMarketCountry(null)}
                          className={`transition-colors ${hoveredMarketCountry === country
                            ? "text-[#B97846] font-bold"
                            : "text-[#2D3732]"
                            }`}
                        >
                          {country}
                          {idx < region.countries.length - 1 && (
                            <span className="text-[#B97846] ml-2">•</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PART 22B: FACTORY VISIT CTA BANNER (Planning an On-Site Factory Inspection? — Hình 42) ── */}
        <section className="py-14 lg:py-18 bg-[#FAF8F3]">
          <div className="container mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl bg-gradient-to-br from-[#153527] via-[#0F281D] to-[#0B1E15] text-white p-8 sm:p-12 shadow-xl border border-[#C88A36]/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-[1.5px] w-7 bg-[#D89B3C]" />
                    <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                      FACTORY VISIT
                    </span>
                  </div>

                  <h2
                    className="font-display font-bold text-white leading-tight mb-4"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                  >
                    Planning an On-Site Factory Inspection?
                  </h2>

                  <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl mb-7">
                    To protect client proprietary designs and maintain operational safety, factory
                    visits are arranged by appointment following an initial review of your product
                    scope and requirements.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/contact?inquiry=factory-visit#smart-contact-form"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#B97846] hover:bg-[#C88550] text-white font-body text-sm font-semibold transition-all shadow-md"
                    >
                      <span>Arrange Factory Visit</span>
                      <ArrowRight size={16} />
                    </Link>

                    <a
                      href="/DHT_Company_Profile_2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/30 font-body text-sm font-semibold transition-all"
                    >
                      <FileText size={16} className="text-[#E5B869]" />
                      <span>View Company Profile (PDF)</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: 3 Inspection Pillars */}
                <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-white/15 grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#D89B3C]/15 border border-[#D89B3C]/40 flex items-center justify-center mb-2.5">
                      <CalendarCheck size={22} className="text-[#E5B869]" />
                    </div>
                    <span className="font-body text-xs font-semibold text-white/90 leading-snug">
                      By
                      <br />
                      Appointment
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#D89B3C]/15 border border-[#D89B3C]/40 flex items-center justify-center mb-2.5">
                      <ShieldCheck size={22} className="text-[#E5B869]" />
                    </div>
                    <span className="font-body text-xs font-semibold text-white/90 leading-snug">
                      Design
                      <br />
                      Confidentiality
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#D89B3C]/15 border border-[#D89B3C]/40 flex items-center justify-center mb-2.5">
                      <HardHat size={22} className="text-[#E5B869]" />
                    </div>
                    <span className="font-body text-xs font-semibold text-white/90 leading-snug">
                      Operational
                      <br />
                      Safety
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
