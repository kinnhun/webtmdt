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
  Handshake,
  Warehouse,
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
    bannerImage: "/img/pdf-guide/manufacturing/region-quynhon.jpg?v=2",
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
    bannerImage: "/img/pdf-guide/manufacturing/region-hcmc.jpg?v=2",
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
    bannerImage: "/img/pdf-guide/manufacturing/region-hungyen.jpg?v=2",
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
    bannerImage: "/img/pdf-guide/manufacturing/region-phutho.jpg?v=2",
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
    image: "/img/pdf-guide/manufacturing/port-haiphong.jpg?v=2",
  },
  {
    id: "south_ports",
    name: "Cat Lai / Cai Mep – Thi Vai",
    roleLabel: "Southern Export Gateway",
    servedFrom: "Serving: Ho Chi Minh City & Southern Corridor.",
    image: "/img/pdf-guide/manufacturing/port-catlai.jpg?v=2",
  },
  {
    id: "quynhon_port",
    name: "Quy Nhon Port",
    roleLabel: "Central Export Gateway",
    servedFrom: "Serving: Quy Nhon.",
    image: "/img/pdf-guide/manufacturing/port-quynhon.jpg?v=2",
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

const MARKET_PIN_COORDS: Record<string, { x: number; y: number; region: string }> = {
  Canada: { x: 117, y: 65, region: "na" },
  "United States": { x: 143, y: 117, region: "na" },
  "United Kingdom": { x: 103, y: 236, region: "eu" },
  Denmark: { x: 174, y: 200, region: "eu" },
  Estonia: { x: 252, y: 204, region: "eu" },
  Netherlands: { x: 195, y: 240, region: "eu" },
  Poland: { x: 289, y: 250, region: "eu" },
  France: { x: 131, y: 276, region: "eu" },
  Germany: { x: 215, y: 267, region: "eu" },
  Slovakia: { x: 289, y: 285, region: "eu" },
  Austria: { x: 220, y: 297, region: "eu" },
  Hungary: { x: 284, y: 314, region: "eu" },
  Spain: { x: 108, y: 349, region: "eu" },
  Italy: { x: 185, y: 325, region: "eu" },
  Slovenia: { x: 243, y: 338, region: "eu" },
  Greece: { x: 265, y: 369, region: "eu" },
  Russia: { x: 704, y: 52, region: "mea" },
  Georgia: { x: 563, y: 88, region: "mea" },
  Türkiye: { x: 549, y: 114, region: "mea" },
  Israel: { x: 535, y: 139, region: "mea" },
  Lebanon: { x: 534, y: 163, region: "mea" },
  "United Arab Emirates": { x: 596, y: 208, region: "mea" },
  Qatar: { x: 596, y: 208, region: "mea" },
  "Saudi Arabia": { x: 578, y: 240, region: "mea" },
  China: { x: 760, y: 143, region: "apac" },
  India: { x: 653, y: 173, region: "apac" },
  Mauritius: { x: 602, y: 313, region: "apac" },
  "South Africa": { x: 473, y: 362, region: "apac" },
  Australia: { x: 775, y: 326, region: "apac" },
};

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
  const [hoveredMarketRegion, setHoveredMarketRegion] = useState<string | null>(null);
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
                      className={`group relative rounded-[14px] min-h-[184px] lg:h-[188px] overflow-hidden border transition-all duration-300 bg-gradient-to-br from-[#FFF9F4] via-[#FAF3EA] to-[#F5EADF] ${isHighlighted
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

        {/* ── PART 19: 11 FACILITIES GROUPED BY 4 REGIONAL BLOCKS (Hình 35 — Exact Proportions) ── */}
        <section className="relative pt-10 pb-14 lg:pt-[42px] lg:pb-[64px] bg-[#F9F5F0] border-b border-[#E5DCCE] overflow-hidden">
          {/* Top-Right Curved DHT FURNITURE Factory Facade Sweep (Hình 35 Signature Header) */}
          <div className="hidden md:block absolute top-0 right-0 w-[56%] lg:w-[54%] xl:w-[52%] h-[300px] lg:h-[340px] pointer-events-none select-none overflow-hidden">
            <img
              src="/img/pdf-guide/manufacturing/hero-factory-exterior.jpg?v=2"
              alt="DHT Furniture Production Complex"
              className="w-full h-full object-cover object-right-top"
            />
            {/* Soft horizontal ivory dissolve on the left edge */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #F9F5F0 0%, rgba(249, 245, 240, 0.94) 10%, rgba(249, 245, 240, 0.36) 28%, rgba(249, 245, 240, 0) 48%)",
              }}
            />
            {/* Sculpted Ivory S-Curve Wave sweeping from top-left down-right above Card 1 */}
            <svg
              viewBox="0 0 700 340"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <filter id="fac-curve-blur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>
              {/* Feathered glow edge under the main curve */}
              <path
                d="M 0,0 L 145,0 C 165,135 280,255 510,285 C 590,295 655,295 700,292 L 700,340 L 0,340 Z"
                fill="#F9F5F0"
                filter="url(#fac-curve-blur)"
                opacity="0.72"
              />
              {/* Main clean curved ivory wave */}
              <path
                d="M 0,0 L 118,0 C 142,148 265,268 498,298 C 585,309 652,306 700,302 L 700,340 L 0,340 Z"
                fill="#F9F5F0"
              />
            </svg>
          </div>

          {/* Subtle bottom-right ivory silk wave accent */}
          <svg
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="absolute bottom-0 inset-x-0 w-full h-[160px] pointer-events-none"
            aria-hidden="true"
          >
            <path
              d="M 480,180 C 780,165 1010,115 1200,32 L 1200,180 Z"
              fill="#EFE6D9"
              opacity="0.55"
            />
          </svg>

          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
            {/* Section Header */}
            <div className="max-w-[660px] mb-8 lg:mb-[34px]">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="h-[1.5px] w-8 bg-[#B07A46]" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#A67241]">
                  OUR PRODUCTION FACILITIES
                </span>
              </div>

              <h2 className="font-display font-bold text-[#0B231A] leading-[1.12] tracking-[-0.01em] mb-3 text-[30px] sm:text-[38px] lg:text-[44px]">
                11 Facilities. Specialised
                <br />
                Manufacturing Expertise.
              </h2>

              <p className="font-body text-[14px] sm:text-[15px] text-[#2D3A34] leading-[1.55] max-w-[540px] mb-5">
                Explore the production capabilities of our family-owned manufacturing group across
                four regional clusters in Vietnam.
              </p>

              {/* 2 Classification Pills — exact Hình 35 height (40px) & cream-gold finish */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2.5 h-[40px] px-5 rounded-full bg-gradient-to-b from-[#FCF7F0] to-[#F5ECDF] border border-[#D8C2A4] shadow-[0_1px_2px_rgba(120,90,55,0.08)] font-body text-[13px] font-semibold text-[#0E241B]">
                  <Armchair size={17} strokeWidth={1.6} className="text-[#B07A46] shrink-0" />
                  <span>10 Furniture Facilities</span>
                </span>
                <span className="inline-flex items-center gap-2.5 h-[40px] px-5 rounded-full bg-gradient-to-b from-[#FCF7F0] to-[#F5ECDF] border border-[#D8C2A4] shadow-[0_1px_2px_rgba(120,90,55,0.08)] font-body text-[13px] font-semibold text-[#0E241B]">
                  <Layers size={17} strokeWidth={1.6} className="text-[#B07A46] shrink-0" />
                  <span>1 Wood Panel &amp; Primary Processing Facility</span>
                </span>
              </div>
            </div>

            {/* 4 Horizontal Regional Facility Blocks — Exact 26% Landmark / 74% Table Split */}
            <div className="space-y-5 lg:space-y-[22px]">
              {REGIONAL_FACILITY_BLOCKS.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[14px] overflow-hidden bg-[#FAF7F2] border border-[#E5DDD0] shadow-[0_4px_14px_-3px_rgba(95,78,58,0.10),0_1px_2px_rgba(95,78,58,0.06)] flex flex-col lg:flex-row"
                >
                  {/* Left Regional Landmark Banner (26% exact width) */}
                  <div className="lg:w-[26%] shrink-0 relative bg-[#072B1E] text-white px-6 py-5 lg:px-[26px] lg:py-[22px] flex flex-col justify-start overflow-hidden min-h-[132px]">
                    <img
                      src={block.bannerImage}
                      alt={block.clusterName}
                      className="absolute inset-0 w-full h-full object-cover object-right-bottom"
                    />
                    {/* Gentle upper-left vignette preserving crisp landmark & light rays */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(130deg, rgba(6, 36, 25, 0.42) 0%, rgba(6, 36, 25, 0.10) 52%, rgba(6, 36, 25, 0) 100%)",
                      }}
                    />
                    <div className="relative z-10">
                      <span className="font-body text-[10px] lg:text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#D7B36D] block">
                        {block.regionLabel}
                      </span>
                      <h3 className="font-display font-bold text-[21px] xl:text-[24px] text-white leading-[1.18] mt-1">
                        {block.clusterName}
                      </h3>
                      <span className="font-body text-[12.5px] lg:text-[13px] text-white/90 font-medium mt-1.5 block">
                        {block.facilityCountLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right Facility Breakdown Table (74% exact width, aligned across all 4 cards) */}
                  <div className="flex-1 bg-[#FAF7F2] px-5 sm:px-7 lg:px-8 py-3.5 lg:py-4 flex flex-col justify-center">
                    {/* Table Header Row */}
                    <div className="grid grid-cols-12 items-center gap-x-3 sm:gap-x-4 pb-2.5 lg:pb-3 border-b border-[#E7E0D4]">
                      <div className="col-span-4 sm:col-span-2 font-body text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.08em] text-[#45504B]">
                        FACILITY
                      </div>
                      <div className="col-span-8 sm:col-span-3 sm:text-center font-body text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.08em] text-[#45504B]">
                        OPERATING FOOTPRINT
                      </div>
                      <div className="col-span-12 sm:col-span-7 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mt-2 sm:mt-0">
                        <span className="font-body text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.08em] text-[#45504B]">
                          CORE MANUFACTURING FOCUS
                        </span>
                        <span className="inline-flex items-center justify-center gap-2 min-w-[158px] lg:min-w-[180px] h-[36px] px-3.5 rounded-[8px] bg-[#F5EADC] border border-[#EADBC7] text-[#B2733C] font-display font-bold text-[16.5px] lg:text-[18.5px] tabular-nums leading-none shrink-0">
                          <Factory size={17} strokeWidth={1.55} className="text-[#B2733C] shrink-0" />
                          <span>{block.totalFootprint}</span>
                        </span>
                      </div>
                    </div>

                    {/* Table Data Rows */}
                    <div className="divide-y divide-[#EAE4DA]">
                      {block.facilities.map((fac) => (
                        <div
                          key={fac.id}
                          className="py-2.5 lg:py-[11px] grid grid-cols-12 gap-x-3 sm:gap-x-4 gap-y-1 items-center font-body"
                        >
                          <div className="col-span-4 sm:col-span-2 font-bold text-[13px] lg:text-[13.5px] text-[#0E241B] whitespace-nowrap">
                            {fac.name}
                          </div>
                          <div className="col-span-8 sm:col-span-3 sm:text-center font-bold text-[13px] lg:text-[13.5px] text-[#B6733A] tabular-nums whitespace-nowrap">
                            {fac.footprint}
                          </div>
                          <div className="col-span-12 sm:col-span-7 text-[12.5px] lg:text-[13px] text-[#26322D] leading-[1.45]">
                            {fac.focus}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Combined Manufacturing Footprint Dark Green Bar (Hình 35 — 36.5% | 27% | 36.5%) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="relative mt-9 lg:mt-[42px] rounded-[14px] overflow-hidden bg-gradient-to-r from-[#052B1D] via-[#073222] to-[#06291C] text-white px-6 sm:px-8 lg:px-10 py-6 lg:py-[26px] shadow-[0_8px_24px_-6px_rgba(5,36,25,0.28)] border border-[#1B4936]"
            >
              {/* Subtle luxury emerald-gold light sheen inside bar */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 45% 120% at 88% 100%, rgba(212, 175, 90, 0.14) 0%, rgba(212, 175, 90, 0) 70%)",
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
                {/* Left Zone (36.5%) */}
                <div className="lg:w-[36.5%] flex items-center justify-center lg:justify-start gap-4 lg:pr-6">
                  <Layers size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.35} />
                  <span className="font-body text-[13.5px] lg:text-[15px] font-semibold uppercase tracking-[0.06em] text-white leading-[1.3]">
                    COMBINED
                    <br />
                    MANUFACTURING FOOTPRINT
                  </span>
                </div>

                {/* Vertical Divider 1 */}
                <div className="hidden lg:block h-[54px] w-px bg-[#D4AF5A]/38 shrink-0" />

                {/* Center Metric (27%) */}
                <div className="lg:w-[27%] flex items-center justify-center lg:px-6">
                  <p className="font-display font-bold text-[34px] lg:text-[42px] text-[#D7B55C] leading-none tracking-[-0.01em] whitespace-nowrap tabular-nums">
                    543,380
                    <span className="text-[22px] lg:text-[27px] font-semibold ml-1.5 text-[#D7B55C]">
                      m²
                    </span>
                  </p>
                </div>

                {/* Vertical Divider 2 */}
                <div className="hidden lg:block h-[54px] w-px bg-[#D4AF5A]/38 shrink-0" />

                {/* Right Description (36.5%) */}
                <div className="lg:w-[36.5%] lg:pl-8 text-center lg:text-left">
                  <p className="font-body text-[13.5px] lg:text-[14.5px] text-white/92 leading-[1.45]">
                    <span className="font-semibold text-white">10</span> furniture production
                    facilities and
                    <br className="hidden sm:inline" />{" "}
                    <span className="font-semibold text-white">1</span> wood panel &amp;
                    primary-processing facility.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PART 21: EXPORT CAPACITY & LOGISTICS (Hình 38 Exact Layout + Strict Pages 34–37 Rules) ── */}
        <section className="relative bg-[#F6F1EA] border-b border-[#E5DCCE] overflow-hidden">
          {/* Top Full-Bleed Port & Container Ship Banner (y = 0..248px in Hình 38) */}
          <div className="relative bg-[#042A1C] text-white overflow-hidden">
            {/* Right Sunset Port & Container Ship Photo with subtle 103% -> 100% zoom-in (Page 34) */}
            <motion.div
              initial={{ scale: 1.03 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-y-0 right-0 w-full lg:w-[62%] pointer-events-none"
            >
              <img
                src="/img/pdf-guide/manufacturing/export-port-hero.jpg?v=2"
                alt="Container Ship and Port Gantry Crane at Vietnam Export Gateway"
                className="w-full h-full object-cover object-right opacity-45 lg:opacity-95"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, #042A1C 0%, rgba(4, 42, 28, 0.94) 18%, rgba(4, 42, 28, 0.52) 40%, rgba(4, 42, 28, 0.08) 68%, rgba(4, 42, 28, 0) 100%)",
                }}
              />
            </motion.div>

            {/* Subtle curved silk highlight line in upper-left dark emerald sky (Hình 38) */}
            <svg
              viewBox="0 0 1200 260"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
              aria-hidden="true"
            >
              <path
                d="M 0,180 C 190,150 380,82 560,0"
                fill="none"
                stroke="rgba(212, 175, 90, 0.35)"
                strokeWidth="1.2"
              />
            </svg>

            {/* Banner Copy (padded at bottom for the overlapping floating 3-KPI bar) */}
            <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 pt-10 pb-14 lg:pt-[38px] lg:pb-[52px] relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-[600px]"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="h-[1.5px] w-8 bg-[#D4AF5A]" />
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF5A]">
                    EXPORT CAPACITY &amp; LOGISTICS
                  </span>
                </div>

                <h2 className="font-display font-bold text-white leading-[1.1] tracking-[-0.01em] mb-3 text-[30px] sm:text-[38px] lg:text-[46px]">
                  600 Containers (40HQ)
                  <br />
                  per Month
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                className="font-body text-[14px] sm:text-[15px] text-white/88 leading-[1.55] max-w-[540px]"
              >
                Reference export capacity from our 10 finished furniture facilities (Facilities
                01–10), with efficient access to major international ports across Vietnam.
              </motion.p>
            </div>
          </div>

          {/* Main Lower Body Container (with Floating 3-KPI Bar straddling banner bottom edge) */}
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 pb-14 lg:pb-[64px] relative z-20">
            {/* Floating 3-Metric Count-Up Bar (overlapping top banner by ~24px — exact Hình 38 geometry) */}
            <div className="-mt-7 lg:-mt-[26px] mb-6 lg:mb-[24px] rounded-[14px] bg-gradient-to-r from-[#052C1D] via-[#063222] to-[#052B1D] text-white border border-white/20 shadow-[0_10px_26px_-6px_rgba(4,34,23,0.35)] px-6 sm:px-8 lg:px-9 py-5 lg:py-[22px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center">
                {/* Stat 1: 600 */}
                <div className="flex items-center gap-4 lg:gap-5 md:pr-7">
                  <Box size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[34px] lg:text-[40px] text-white leading-none tabular-nums">
                      <CountUpNumber target={600} />
                    </p>
                    <p className="font-body text-[13.5px] lg:text-[14.5px] font-semibold text-white mt-1 leading-snug">
                      Containers (40HQ) / Month
                    </p>
                    <p className="font-body text-[11.5px] text-white/75 mt-0.5">
                      Total from 10 Furniture Facilities
                    </p>
                  </div>
                </div>

                {/* Stat 2: 10 */}
                <div className="relative flex items-center gap-4 lg:gap-5 md:px-7 md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-[58px] md:before:w-px md:before:bg-white/28">
                  <Factory size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[34px] lg:text-[40px] text-white leading-none tabular-nums">
                      <CountUpNumber target={10} />
                    </p>
                    <p className="font-body text-[13.5px] lg:text-[14.5px] font-semibold text-white mt-1 leading-snug">
                      Furniture Facilities
                    </p>
                    <p className="font-body text-[11.5px] text-white/75 mt-0.5">
                      (Facilities 01–10)
                    </p>
                  </div>
                </div>

                {/* Stat 3: 3 */}
                <div className="relative flex items-center gap-4 lg:gap-5 md:pl-7 md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-[58px] md:before:w-px md:before:bg-white/28">
                  <Ship size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[34px] lg:text-[40px] text-white leading-none tabular-nums">
                      <CountUpNumber target={3} />
                    </p>
                    <p className="font-body text-[13.5px] lg:text-[14.5px] font-semibold text-white mt-1 leading-snug">
                      Primary Export Gateway Areas
                    </p>
                    <p className="font-body text-[11.5px] text-white/75 mt-0.5">
                      Hai Phong · Cat Lai / Cai Mep – Thi Vai · Quy Nhon
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main 2-Column Split: 43.6% Logistics Map | 54.4% Region Table + 3 Port Cards (Exact Hình 38) */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-[24px] items-stretch">
              {/* Left Column (43.6%): Vietnam Logistics & Export Gateways Map (4-Stage Animation per Page 36) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="lg:w-[43.6%] shrink-0 rounded-[14px] bg-[#FBF9F6] border border-[#E5DDD0] px-5 py-5 lg:px-6 lg:py-6 flex flex-col justify-between shadow-[0_4px_14px_-3px_rgba(95,78,58,0.09),0_1px_2px_rgba(95,78,58,0.05)]"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="h-[1.5px] w-6 bg-[#B2733C]" />
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#9E6A3A]">
                    LOGISTICS &amp; EXPORT GATEWAYS
                  </span>
                </div>

                <div className="relative w-full max-w-[430px] mx-auto my-auto py-1">
                  <svg
                    viewBox="4 66 432 612"
                    className="w-full h-auto select-none overflow-visible"
                    aria-label="Vietnam Logistics and Export Gateways Map"
                  >
                    <defs>
                      <linearGradient id="log-vn-relief" x1="15%" y1="5%" x2="85%" y2="95%">
                        <stop offset="0%" stopColor="#F5E7D4" />
                        <stop offset="55%" stopColor="#E9D6BC" />
                        <stop offset="100%" stopColor="#DCC5A7" />
                      </linearGradient>
                      <linearGradient id="log-vn-cluster" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EED4B1" />
                        <stop offset="100%" stopColor="#DAB688" />
                      </linearGradient>
                      <filter id="log-vn-shadow" x="-15%" y="-10%" width="135%" height="125%">
                        <feDropShadow
                          dx="-4"
                          dy="7"
                          stdDeviation="5"
                          floodColor="#AD977A"
                          floodOpacity="0.40"
                        />
                      </filter>
                      <filter id="log-card-shadow" x="-15%" y="-20%" width="135%" height="150%">
                        <feDropShadow
                          dx="0"
                          dy="2.5"
                          stdDeviation="2.5"
                          floodColor="#1C2E25"
                          floodOpacity="0.14"
                        />
                      </filter>
                    </defs>

                    {/* Stage 1: Accurate 3D-Embossed Vietnam Map Silhouette (unclipped!) */}
                    <g filter="url(#log-vn-shadow)">
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
                              fill={isClusterProv ? "url(#log-vn-cluster)" : "url(#log-vn-relief)"}
                              stroke="#E5D5BE"
                              strokeWidth="0.55"
                            />
                          );
                        }
                      )}
                    </g>

                    {/* Soft Warm Amber Cluster Halos (Hình 38 visual cue beneath dots) */}
                    <circle cx="168" cy="186" r="29" fill="#DCAA6E" opacity="0.34" />
                    <circle cx="275" cy="446" r="21" fill="#DCAA6E" opacity="0.34" />
                    <circle cx="192" cy="572" r="29" fill="#DCAA6E" opacity="0.34" />

                    {/* Sovereign Archipelagos (Hoang Sa & Truong Sa) */}
                    <g transform="translate(335, 326)" opacity="0.72">
                      <circle cx="12" cy="6" r="2" fill="#B2733C" />
                      <text
                        x="12"
                        y="19"
                        textAnchor="middle"
                        fill="#7B6753"
                        fontSize="7"
                        fontWeight="700"
                        letterSpacing="0.06em"
                      >
                        HOANG SA
                      </text>
                    </g>
                    <g transform="translate(348, 514)" opacity="0.72">
                      <circle cx="12" cy="6" r="2" fill="#B2733C" />
                      <text
                        x="12"
                        y="19"
                        textAnchor="middle"
                        fill="#7B6753"
                        fontSize="7"
                        fontWeight="700"
                        letterSpacing="0.06em"
                      >
                        TRUONG SA
                      </text>
                    </g>

                    {/* Stage 3: 4 Independent Short Curved Dashed Port Connections (strictly per Page 35–36) */}
                    {/* 1. Hung Yen -> Hai Phong Port */}
                    <motion.path
                      d="M 181 189 Q 198 184 205 194"
                      fill="none"
                      stroke="#0D3B2A"
                      strokeWidth="2.1"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("hungyen", "haiphong_port") ? 1 : 0.22,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.75 }}
                    />
                    {/* 2. Phu Tho & Vinh Phuc -> Hai Phong Port */}
                    <motion.path
                      d="M 152 174 Q 186 164 207 188"
                      fill="none"
                      stroke="#0D3B2A"
                      strokeWidth="2.1"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("phutho", "haiphong_port") ? 1 : 0.22,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    />
                    {/* 3. Quy Nhon -> Quy Nhon Port */}
                    <motion.path
                      d="M 278 448 Q 287 451 290 455"
                      fill="none"
                      stroke="#0D3B2A"
                      strokeWidth="2.1"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("quynhon", "quynhon_port") ? 1 : 0.22,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.05 }}
                    />
                    {/* 4. HCMC & Southern Corridor -> Cat Lai / Cai Mep - Thi Vai */}
                    <motion.path
                      d="M 197 578 Q 208 588 214 592"
                      fill="none"
                      stroke="#0D3B2A"
                      strokeWidth="2.1"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{
                        pathLength: 1,
                        opacity: isExportClusterActive("hcmc", "south_ports") ? 1 : 0.22,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />

                    {/* Stage 2: Exact 10 Dark-Green Facility Dots (4 - 1 - 1 - 4, North to South) */}
                    {/* Cluster A: Hung Yen (4 dots: Facilities 06-09) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{
                        opacity: isExportClusterActive("hungyen", "haiphong_port") ? 1 : 0.28,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      onMouseEnter={() => setHoveredExportRegion("hungyen")}
                      onMouseLeave={() => setHoveredExportRegion(null)}
                      onClick={() =>
                        setHoveredExportRegion(hoveredExportRegion === "hungyen" ? null : "hungyen")
                      }
                    >
                      <line x1="148" y1="115" x2="171" y2="179" stroke="#183A2C" strokeWidth="1.25" />
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="84"
                          y="76"
                          width="124"
                          height="39"
                          rx="7"
                          fill="#FFFFFF"
                          stroke="#2A4A3B"
                          strokeWidth="1"
                        />
                      </g>
                      <text x="94" y="93" fill="#0B231A" fontSize="10.5" fontWeight="800">
                        Hung Yen
                      </text>
                      <text x="94" y="107" fill="#3A4741" fontSize="9" fontWeight="600">
                        (Facilities 06–09)
                      </text>
                      <circle cx="167" cy="184" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="177" cy="184" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="167" cy="194" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="177" cy="194" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                    </motion.g>

                    {/* Cluster B: Phu Tho & Vinh Phuc (1 dot: Facility 10) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{
                        opacity: isExportClusterActive("phutho", "haiphong_port") ? 1 : 0.28,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.34 }}
                      onMouseEnter={() => setHoveredExportRegion("phutho")}
                      onMouseLeave={() => setHoveredExportRegion(null)}
                      onClick={() =>
                        setHoveredExportRegion(hoveredExportRegion === "phutho" ? null : "phutho")
                      }
                    >
                      <line x1="108" y1="194" x2="148" y2="174" stroke="#183A2C" strokeWidth="1.25" />
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="10"
                          y="170"
                          width="98"
                          height="50"
                          rx="7"
                          fill="#FFFFFF"
                          stroke="#2A4A3B"
                          strokeWidth="1"
                        />
                      </g>
                      <text x="19" y="186" fill="#0B231A" fontSize="10" fontWeight="800">
                        Phu Tho &amp;
                      </text>
                      <text x="19" y="199" fill="#0B231A" fontSize="10" fontWeight="800">
                        Vinh Phuc
                      </text>
                      <text x="19" y="212" fill="#3A4741" fontSize="8.8" fontWeight="600">
                        (Facility 10)
                      </text>
                      <circle cx="148" cy="174" r="5" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.3" />
                    </motion.g>

                    {/* Cluster C: Quy Nhon (1 dot: Facility 01) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{
                        opacity: isExportClusterActive("quynhon", "quynhon_port") ? 1 : 0.28,
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
                      <line x1="226" y1="422" x2="275" y2="446" stroke="#183A2C" strokeWidth="1.25" />
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="152"
                          y="384"
                          width="96"
                          height="39"
                          rx="7"
                          fill="#FFFFFF"
                          stroke="#2A4A3B"
                          strokeWidth="1"
                        />
                      </g>
                      <text x="162" y="401" fill="#0B231A" fontSize="10.5" fontWeight="800">
                        Quy Nhon
                      </text>
                      <text x="162" y="415" fill="#3A4741" fontSize="9" fontWeight="600">
                        (Facility 01)
                      </text>
                      <circle cx="275" cy="446" r="5" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.3" />
                    </motion.g>

                    {/* Cluster D: Ho Chi Minh City & Southern Corridor (4 dots: Facilities 02-05) */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{
                        opacity: isExportClusterActive("hcmc", "south_ports") ? 1 : 0.28,
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
                      <line x1="138" y1="546" x2="184" y2="569" stroke="#183A2C" strokeWidth="1.25" />
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="10"
                          y="498"
                          width="138"
                          height="52"
                          rx="7"
                          fill="#FFFFFF"
                          stroke="#2A4A3B"
                          strokeWidth="1"
                        />
                      </g>
                      <text x="19" y="514" fill="#0B231A" fontSize="10" fontWeight="800">
                        Ho Chi Minh City
                      </text>
                      <text x="19" y="527" fill="#0B231A" fontSize="10" fontWeight="800">
                        &amp; Southern Corridor
                      </text>
                      <text x="19" y="541" fill="#3A4741" fontSize="8.8" fontWeight="600">
                        (Facilities 02–05)
                      </text>
                      <circle cx="185" cy="566" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="195" cy="566" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="185" cy="576" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="195" cy="576" r="4.6" fill="#0D3B2A" stroke="#FFFFFF" strokeWidth="1.2" />
                    </motion.g>

                    {/* Stage 4: 3 Bronze Anchor Export Port Gateways (scale 0.95 -> 1 after routes finish) */}
                    {/* Port 1: Hai Phong Port */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: isPortActive("haiphong_port") ? 1 : 0.28,
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
                      <circle cx="214" cy="196" r="10.5" fill="#C27834" stroke="#FFFFFF" strokeWidth="1.8" />
                      <text x="214" y="200.5" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
                        ⚓
                      </text>
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="232"
                          y="177"
                          width="136"
                          height="39"
                          rx="7"
                          fill="#FBF5EB"
                          stroke="#D8B992"
                          strokeWidth="1.1"
                        />
                      </g>
                      <text x="242" y="194" fill="#0B231A" fontSize="10.5" fontWeight="800">
                        Hai Phong Port
                      </text>
                      <text x="242" y="208" fill="#525E58" fontSize="8.8" fontWeight="600">
                        (Northern Gateway)
                      </text>
                    </motion.g>

                    {/* Port 2: Quy Nhon Port */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: isPortActive("quynhon_port") ? 1 : 0.28,
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
                      <circle cx="296" cy="456" r="10.5" fill="#C27834" stroke="#FFFFFF" strokeWidth="1.8" />
                      <text x="296" y="460.5" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
                        ⚓
                      </text>
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="312"
                          y="437"
                          width="118"
                          height="39"
                          rx="7"
                          fill="#FBF5EB"
                          stroke="#D8B992"
                          strokeWidth="1.1"
                        />
                      </g>
                      <text x="321" y="454" fill="#0B231A" fontSize="10.5" fontWeight="800">
                        Quy Nhon Port
                      </text>
                      <text x="321" y="468" fill="#525E58" fontSize="8.8" fontWeight="600">
                        (Central Gateway)
                      </text>
                    </motion.g>

                    {/* Port 3: Cat Lai / Cai Mep - Thi Vai */}
                    <motion.g
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: isPortActive("south_ports") ? 1 : 0.28,
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
                      <circle cx="222" cy="594" r="10.5" fill="#C27834" stroke="#FFFFFF" strokeWidth="1.8" />
                      <text x="222" y="598.5" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
                        ⚓
                      </text>
                      <g filter="url(#log-card-shadow)">
                        <rect
                          x="240"
                          y="572"
                          width="150"
                          height="50"
                          rx="7"
                          fill="#FBF5EB"
                          stroke="#D8B992"
                          strokeWidth="1.1"
                        />
                      </g>
                      <text x="250" y="588" fill="#0B231A" fontSize="10" fontWeight="800">
                        Cat Lai /
                      </text>
                      <text x="250" y="601" fill="#0B231A" fontSize="10" fontWeight="800">
                        Cai Mep – Thi Vai
                      </text>
                      <text x="250" y="614" fill="#525E58" fontSize="8.8" fontWeight="600">
                        (Southern Gateway)
                      </text>
                    </motion.g>
                  </svg>
                </div>

                {/* Map Legend Bar */}
                <div className="pt-3.5 border-t border-[#EAE2D4] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] font-body text-[#2C3732]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#0D3B2A] inline-block" />
                    <span>Furniture facility (01–10)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#C27834] text-white text-[9.5px] inline-flex items-center justify-center font-bold">
                      ⚓
                    </span>
                    <span>Export gateway</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-5 border-t-2 border-dashed border-[#0D3B2A] inline-block" />
                    <span>Logistics connection</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Column (54.4%): Region Table Card + 3 Export Gateway Cards */}
              <div className="flex-1 flex flex-col justify-between gap-6 lg:gap-[22px]">
                {/* Right Top Card: Export Capacity by Manufacturing Region (Page 37 Strict Columns) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[14px] bg-[#FBF9F6] border border-[#E5DDD0] px-5 py-5 lg:px-6 lg:py-5 shadow-[0_4px_14px_-3px_rgba(95,78,58,0.09),0_1px_2px_rgba(95,78,58,0.05)]"
                >
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span className="h-[1.5px] w-6 bg-[#B2733C]" />
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#9E6A3A]">
                      EXPORT CAPACITY BY MANUFACTURING REGION
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-[10px] border border-[#E4DACB]">
                    <table className="w-full text-left font-body text-[13px] border-collapse">
                      <thead className="bg-[#062E1F] text-white">
                        <tr className="divide-x divide-white/15">
                          <th className="py-3 px-4 font-semibold text-[12px]">
                            Manufacturing Region
                          </th>
                          <th className="py-3 px-3 font-semibold text-[12px] text-center whitespace-nowrap">
                            Facility References
                          </th>
                          <th className="py-3 px-3 font-semibold text-[12px] text-center leading-tight">
                            Furniture Facilities
                          </th>
                          <th className="py-3 px-4 font-semibold text-[12px] whitespace-nowrap">
                            Primary Export Gateway
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ECE5D9] bg-[#FDFCF9]">
                        {EXPORT_REGION_ROWS.map((row, idx) => {
                          const isHovered = hoveredExportRegion === row.id;
                          return (
                            <motion.tr
                              key={row.id}
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.35, delay: idx * 0.09 }}
                              onMouseEnter={() => setHoveredExportRegion(row.id)}
                              onMouseLeave={() => setHoveredExportRegion(null)}
                              className={`divide-x divide-[#EFE8DD] transition-colors cursor-pointer ${isHovered ? "bg-[#EDF3EF]" : "hover:bg-[#F1F6F3]"
                                }`}
                            >
                              <td className="py-3 px-4 font-bold text-[#0C2319]">
                                <div className="flex items-center gap-2.5">
                                  <Factory
                                    size={16}
                                    strokeWidth={1.6}
                                    className="text-[#B6733A] shrink-0"
                                  />
                                  <span className="leading-snug">{row.regionName}</span>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-center font-semibold text-[#2B3732] whitespace-nowrap">
                                {row.facilitiesRange}
                              </td>
                              <td className="py-3 px-3 text-center font-display font-bold text-[19px] text-[#B6733A] tabular-nums">
                                {row.count}
                              </td>
                              <td className="py-3 px-4 font-semibold text-[#153A2B] whitespace-nowrap">
                                {row.primaryGateway}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-[#F6E6CE] border-t border-[#E3C9A3]">
                        <tr className="divide-x divide-[#E7D0B0]">
                          <td className="py-3 px-4 font-bold text-[#9A5A24] text-[13px]">
                            Total – 10 Furniture Facilities (01 – 10)
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-[#0C2319] whitespace-nowrap">
                            01 – 10
                          </td>
                          <td className="py-3 px-3 text-center font-display font-bold text-[21px] text-[#9A5A24] tabular-nums">
                            10
                          </td>
                          <td className="py-3 px-4 font-bold text-[#0C2319] text-[12px]">
                            3 Primary Export Gateways
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </motion.div>

                {/* Right Bottom Card: 3 Export Gateways with Bare Bronze Ship Icon & Seamless Port Photos */}
                <div className="rounded-[14px] bg-[#FBF9F6] border border-[#E5DDD0] px-5 py-5 lg:px-6 lg:py-5 shadow-[0_4px_14px_-3px_rgba(95,78,58,0.09),0_1px_2px_rgba(95,78,58,0.05)] flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span className="h-[1.5px] w-6 bg-[#B2733C]" />
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#9E6A3A]">
                      EXPORT GATEWAYS
                    </span>
                  </div>

                  <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                    {EXPORT_GATEWAY_CARDS.map((port, idx) => {
                      const isHovered = hoveredPortId === port.id;
                      return (
                        <motion.div
                          key={port.id}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          onMouseEnter={() => setHoveredPortId(port.id)}
                          onMouseLeave={() => setHoveredPortId(null)}
                          className={`group relative rounded-[12px] min-h-[104px] overflow-hidden border transition-all duration-300 bg-[#FAF8F4] flex items-center cursor-pointer ${isHovered
                            ? "border-[#C27834] ring-1 ring-[#C27834]/30 -translate-y-[3px] shadow-[0_10px_22px_-6px_rgba(14,36,27,0.14)]"
                            : "border-[#E5DDD0] shadow-[0_2px_8px_-2px_rgba(95,78,58,0.08)]"
                            }`}
                        >
                          {/* Right Seamless Port Photo with Soft Ivory Left-Edge Fade */}
                          <div className="hidden sm:block absolute inset-y-0 right-0 w-[40%] lg:w-[42%] pointer-events-none select-none overflow-hidden">
                            <img
                              src={port.image}
                              alt={port.name}
                              className="w-full h-full object-cover object-right"
                            />
                            <div
                              className="absolute inset-y-0 left-0 w-16"
                              style={{
                                background:
                                  "linear-gradient(90deg, #FAF8F4 0%, rgba(250, 248, 244, 0.85) 35%, rgba(250, 248, 244, 0) 100%)",
                              }}
                            />
                          </div>

                          {/* Left Content: Bare Bronze Ship Icon + Port Hierarchy */}
                          <div className="relative z-10 w-full sm:w-[66%] px-5 py-3.5 flex items-center gap-4">
                            <Ship
                              size={36}
                              className="text-[#B6733A] shrink-0"
                              strokeWidth={1.35}
                            />
                            <div>
                              <h3 className="font-display font-bold text-[17px] lg:text-[18.5px] text-[#0B231A] leading-snug">
                                {port.name}
                              </h3>
                              <span className="inline-block px-3 py-0.5 rounded-[6px] bg-[#F5E6D0] text-[#9E5D28] font-body text-[12px] font-bold my-1">
                                {port.roleLabel}
                              </span>
                              <p className="font-body text-[12px] text-[#2F3B36] leading-snug">
                                {port.servedFrom}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Full-Width Dark Forest Green Reference Capacity Note Bar (Hình 38 — h ~104px) */}
            <div className="relative mt-6 lg:mt-[24px] rounded-[14px] overflow-hidden bg-gradient-to-r from-[#052C1D] via-[#073423] to-[#05291B] text-white px-6 sm:px-8 py-5 lg:py-[22px] flex items-start gap-4 border border-[#1B4B37] shadow-[0_8px_22px_-6px_rgba(4,34,23,0.28)]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 40% 120% at 92% 100%, rgba(212, 175, 90, 0.14) 0%, rgba(212, 175, 90, 0) 70%)",
                }}
              />
              <Info
                size={24}
                strokeWidth={1.7}
                className="text-[#D9B45A] shrink-0 mt-0.5 relative z-10"
              />
              <p className="font-body text-[12.5px] sm:text-[13.5px] text-white/92 leading-[1.6] relative z-10">
                <strong className="text-[#E0BE69] font-bold">Reference Capacity Note:</strong> The
                stated monthly capacity of approximately 600 × 40HQ containers represents an
                indicative combined planning capacity across 10 furniture production facilities
                (Facilities 01–10). Actual output varies by product specifications, production mix
                and order scheduling. Facility 11, dedicated to wood panels and primary processing,
                is excluded.
              </p>
            </div>
          </div>
        </section>

        {/* ── PART 22A: OUR GLOBAL MARKETS (29 Countries — Hình 40 Exact Proportions & Interactive Map) ── */}
        <section className="relative pt-9 pb-14 lg:pt-[38px] lg:pb-[64px] bg-[#F8F4EE] border-b border-[#E5DCCE] overflow-hidden">
          {/* Top-Right Full-Bleed Sunset Container Ship & Twin Cranes Banner (flush top-right like Hình 40) */}
          <div className="hidden md:block absolute top-0 right-0 w-[56%] lg:w-[55%] xl:w-[53%] h-[215px] lg:h-[235px] pointer-events-none select-none overflow-hidden">
            <img
              src="/img/pdf-guide/manufacturing/global-markets-ship.jpg?v=2"
              alt="DHT Global Export Container Ship and Port Cranes"
              className="w-full h-full object-cover object-right-top"
            />
            {/* Seamless horizontal fade into #F8F4EE warm ivory on the left */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #F8F4EE 0%, rgba(248, 244, 238, 0.92) 14%, rgba(248, 244, 238, 0.35) 34%, rgba(248, 244, 238, 0) 56%)",
              }}
            />
            {/* Soft bottom fade right into the canvas behind 3-stat bar */}
            <div
              className="absolute inset-x-0 bottom-0 h-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(248, 244, 238, 0) 0%, #F8F4EE 100%)",
              }}
            />
          </div>

          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
            {/* Top Left Header Copy (directly on ivory canvas — zero outer box, exact Hình 40) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
              className="max-w-[660px] mb-7 lg:mb-[28px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[1.5px] w-8 bg-[#A87544]" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#9E6A3A]">
                  INTERNATIONAL REACH
                </span>
              </div>

              <h2 className="font-display font-bold text-[#0B231A] leading-[1.08] tracking-[-0.01em] mb-2.5 text-[34px] sm:text-[42px] lg:text-[48px]">
                Our Global Markets
              </h2>

              <p className="font-body text-[14px] sm:text-[15px] text-[#2D3A34] leading-[1.55] max-w-[610px]">
                Exporting to 29 countries across North America, Europe, Middle East &amp; Eurasia,
                and Asia-Pacific &amp; Africa, with long-term partnerships worldwide.
              </p>
            </motion.div>

            {/* Full-Width Dark Emerald 3-Stat Bar with Gold Hairline Border (y=219..309 in Hình 40) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="mb-6 lg:mb-[26px] rounded-[16px] bg-gradient-to-r from-[#052C1D] via-[#073424] to-[#052B1D] text-white border-[1.5px] border-[#C9A86A]/70 shadow-[0_8px_22px_-6px_rgba(4,34,23,0.30)] px-6 sm:px-8 lg:px-10 py-4 lg:py-[18px]"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 items-center">
                {/* Stat 1: 29 Export Countries */}
                <div className="flex items-center md:justify-center gap-4 lg:gap-5 md:pr-6">
                  <Globe2 size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[32px] lg:text-[38px] text-white leading-none tabular-nums">
                      <CountUpNumber target={29} />
                    </p>
                    <p className="font-body text-[13px] lg:text-[14px] text-white/90 mt-1">
                      Export Countries
                    </p>
                  </div>
                </div>

                {/* Stat 2: 4 Global Regions */}
                <div className="relative flex items-center md:justify-center gap-4 lg:gap-5 md:px-6 md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-[46px] md:before:w-px md:before:bg-white/25">
                  <Handshake size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[32px] lg:text-[38px] text-white leading-none tabular-nums">
                      <CountUpNumber target={4} />
                    </p>
                    <p className="font-body text-[13px] lg:text-[14px] text-white/90 mt-1">
                      Global Regions
                    </p>
                  </div>
                </div>

                {/* Stat 3: 10+ Years of Export Experience */}
                <div className="relative flex items-center md:justify-center gap-4 lg:gap-5 md:pl-6 md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-[46px] md:before:w-px md:before:bg-white/25">
                  <Warehouse size={42} className="text-[#D4AF5A] shrink-0" strokeWidth={1.3} />
                  <div>
                    <p className="font-display font-bold text-[32px] lg:text-[38px] text-white leading-none tabular-nums">
                      <CountUpNumber target={10} />+
                    </p>
                    <p className="font-body text-[13px] lg:text-[14px] text-white/90 mt-1">
                      Years of Export Experience
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Exact 2-Column Split: 67.4% Dark World Map Card | 30.7% Stack of 4 Regional Cards (Hình 40) */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-[24px] items-stretch">
              {/* Left (67.4%): Museum-Grade Dark-Emerald World Map + Interactive Beacons + 6 Capability Icons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="lg:w-[67.4%] shrink-0 rounded-[14px] bg-[#06291C] text-white border border-[#C9A86A]/30 shadow-[0_10px_28px_-8px_rgba(4,34,23,0.35)] overflow-hidden flex flex-col justify-between"
              >
                {/* High-Res World Map Artwork + Animated Interactive SVG Overlay */}
                <div className="relative w-full aspect-[916/450] bg-[#06291C] overflow-hidden">
                  <img
                    src="/img/pdf-guide/manufacturing/global-markets-map.jpg?v=2"
                    alt="DHT 29 Global Export Markets World Map with Europe Inset"
                    className="w-full h-full object-cover select-none"
                  />

                  {/* Interactive Animated Beacons & Pulses Over Authentic Map Coordinates */}
                  <svg
                    viewBox="0 0 916 450"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    aria-hidden="true"
                  >
                    {/* Live Subtle Pulsing Golden Halo on Vietnam Origin Star */}
                    <motion.circle
                      cx="744"
                      cy="201"
                      r="16"
                      fill="none"
                      stroke="#F0CC6E"
                      strokeWidth="2"
                      animate={{ r: [10, 26], opacity: [0.85, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.circle
                      cx="744"
                      cy="201"
                      r="10"
                      fill="none"
                      stroke="#F5D98A"
                      strokeWidth="1.5"
                      animate={{ r: [8, 20], opacity: [0.7, 0] }}
                      transition={{
                        duration: 2.4,
                        delay: 0.9,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />

                    {/* Highlight Golden Ring around Europe Magnifier when Europe region or EU country is hovered */}
                    {(hoveredMarketRegion === "eu" ||
                      (hoveredMarketCountry &&
                        MARKET_PIN_COORDS[hoveredMarketCountry]?.region === "eu")) && (
                        <motion.circle
                          cx="210"
                          cy="286"
                          r="142"
                          fill="rgba(240, 204, 110, 0.08)"
                          stroke="#F4D37A"
                          strokeWidth="3.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.25 }}
                        />
                      )}

                    {/* Spotlight Beacon on Any Hovered Region's Pins or Individual Country Pin */}
                    {Object.entries(MARKET_PIN_COORDS).map(([country, pt]) => {
                      const isCountryMatch = hoveredMarketCountry === country;
                      const isRegionMatch =
                        !hoveredMarketCountry && hoveredMarketRegion === pt.region;
                      if (!isCountryMatch && !isRegionMatch) return null;
                      return (
                        <g key={country}>
                          <motion.circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isCountryMatch ? 18 : 13}
                            fill="rgba(244, 211, 122, 0.24)"
                            stroke="#F6D884"
                            strokeWidth={isCountryMatch ? 2.4 : 1.6}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: [0.9, 1.18, 0.9], opacity: 1 }}
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          {isCountryMatch && (
                            <motion.path
                              d={`M 744 201 Q ${(744 + pt.x) / 2} ${Math.min(201, pt.y) - 55} ${pt.x} ${pt.y}`}
                              fill="none"
                              stroke="#F6D884"
                              strokeWidth="2"
                              strokeDasharray="5 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.85 }}
                              transition={{ duration: 0.55, ease: "easeOut" }}
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Bottom 6 Export Capabilities Strip inside Dark Map Card (exact Hình 40 height & dividers) */}
                <div className="bg-[#05271A] border-t border-[#D4AF5A]/22 px-4 sm:px-6 py-4 lg:py-[16px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-3 lg:gap-0 items-center text-[11.5px] lg:text-[12px] text-white/92 font-body">
                    <div className="flex items-center justify-center gap-2 lg:px-2">
                      <Ship size={23} strokeWidth={1.4} className="text-[#D4AF5A] shrink-0" />
                      <span className="font-semibold tracking-wide">FCL</span>
                    </div>

                    <div className="relative flex items-center justify-center gap-2 lg:px-2 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-6 lg:before:w-px lg:before:bg-white/15">
                      <Warehouse size={23} strokeWidth={1.4} className="text-[#D4AF5A] shrink-0" />
                      <span className="font-semibold tracking-wide">LCL</span>
                    </div>

                    <div className="relative flex items-center justify-center gap-2 lg:px-2.5 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-6 lg:before:w-px lg:before:bg-white/15">
                      <FileText size={21} strokeWidth={1.4} className="text-[#D4AF5A] shrink-0" />
                      <span className="leading-[1.2]">
                        Commercial
                        <br />
                        documents
                      </span>
                    </div>

                    <div className="relative flex items-center justify-center gap-2 lg:px-2.5 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-6 lg:before:w-px lg:before:bg-white/15">
                      <Package size={21} strokeWidth={1.4} className="text-[#D4AF5A] shrink-0" />
                      <span className="leading-[1.2]">
                        Packing
                        <br />
                        information
                      </span>
                    </div>

                    <div className="relative flex items-center justify-center gap-2 lg:px-2.5 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-6 lg:before:w-px lg:before:bg-white/15">
                      <ClipboardList
                        size={21}
                        strokeWidth={1.4}
                        className="text-[#D4AF5A] shrink-0"
                      />
                      <span className="leading-[1.2]">
                        Loading
                        <br />
                        plans
                      </span>
                    </div>

                    <div className="relative flex items-center justify-center gap-2 lg:px-2.5 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-6 lg:before:w-px lg:before:bg-white/15">
                      <Calendar size={21} strokeWidth={1.4} className="text-[#D4AF5A] shrink-0" />
                      <span className="leading-[1.2]">
                        Shipment
                        <br />
                        schedules
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right (30.7%): Stack of 4 Regional Country Cards aligned top-to-bottom with Map */}
              <div className="flex-1 flex flex-col justify-between gap-3.5 lg:gap-[14px]">
                {GLOBAL_MARKET_REGIONS.map((region, idx) => {
                  const isRegionActive =
                    hoveredMarketRegion === region.id ||
                    (hoveredMarketCountry !== null &&
                      MARKET_PIN_COORDS[hoveredMarketCountry]?.region === region.id);
                  return (
                    <motion.div
                      key={region.id}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      onMouseEnter={() => setHoveredMarketRegion(region.id)}
                      onMouseLeave={() => setHoveredMarketRegion(null)}
                      className={`rounded-[12px] px-5 py-4 lg:px-[20px] lg:py-[16px] border transition-all duration-300 bg-[#FAF6F0] flex-1 flex flex-col justify-center cursor-pointer ${isRegionActive
                        ? "border-[#C27834] ring-1 ring-[#C27834]/30 shadow-[0_8px_20px_-6px_rgba(14,36,27,0.12)] -translate-y-0.5"
                        : "border-[#E5DDD0] shadow-[0_3px_10px_-3px_rgba(95,78,58,0.10)]"
                        }`}
                    >
                      {/* Card Header: Bronze Globe + Region Title + Dark Emerald Pill Count */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <Globe2
                            size={22}
                            strokeWidth={1.5}
                            className="text-[#B27B42] shrink-0"
                          />
                          <h3 className="font-display text-[13.5px] lg:text-[14px] font-bold uppercase tracking-[0.04em] text-[#0B231A]">
                            {region.name}
                          </h3>
                        </div>
                        <span className="min-w-[34px] h-[22px] px-2.5 rounded-full bg-[#093524] text-white font-body text-[12px] font-bold inline-flex items-center justify-center shrink-0">
                          {region.count}
                        </span>
                      </div>

                      {/* Indented Country List aligned right underneath the Region Title (exact Hình 40) */}
                      <div className="pl-[32px] flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-body text-[12px] lg:text-[12.5px] text-[#28342F] leading-[1.6]">
                        {region.countries.map((country, cIdx) => (
                          <span
                            key={country}
                            onMouseEnter={() => setHoveredMarketCountry(country)}
                            onMouseLeave={() => setHoveredMarketCountry(null)}
                            className={`transition-colors ${hoveredMarketCountry === country
                              ? "text-[#B6733A] font-bold"
                              : "text-[#28342F] hover:text-[#B6733A]"
                              }`}
                          >
                            {country}
                            {cIdx < region.countries.length - 1 && (
                              <span className="text-[#B6733A] ml-1.5">•</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── PART 22B: FACTORY VISIT CTA BANNER (Planning an On-Site Factory Inspection? — Hình 42 Exact) ── */}
        <section className="py-10 lg:py-[46px] bg-[#F8F1EB]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="relative rounded-[20px] overflow-hidden bg-[#012C1C] text-white px-7 py-9 sm:px-11 sm:py-11 lg:px-[60px] lg:py-[44px] shadow-[0_14px_34px_-10px_rgba(1,44,28,0.38)]"
            >
              {/* Authentic Velvet Emerald + Luminous Golden Silk Waves Background (Hình 42) */}
              <img
                src="/img/pdf-guide/manufacturing/factory-visit-bg.jpg?v=2"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />

              {/* Upper Row: Left 52% Copy | Mid-Height Vertical Divider | Right 48% 3 Bare Gold Icon Pillars */}
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">
                {/* Left Copy Block (52%) */}
                <div className="lg:w-[52%] lg:pr-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-[1.5px] w-8 bg-[#D8B460]" />
                    <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#D8B460]">
                      FACTORY VISIT
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-white leading-[1.12] tracking-[-0.01em] mb-4 text-[30px] sm:text-[36px] lg:text-[42px]">
                    Planning an On-Site
                    <br />
                    Factory Inspection?
                  </h2>

                  <p className="font-body text-[13.5px] sm:text-[14.5px] text-white/88 leading-[1.58] max-w-[540px]">
                    To protect client proprietary designs and maintain operational safety, factory
                    visits are arranged by appointment following an initial review of your product
                    scope and requirements.
                  </p>
                </div>

                {/* Main Mid-Height Vertical Divider (x=51.6% in Hình 42) */}
                <div className="hidden lg:block w-px h-[138px] bg-white/22 shrink-0" />

                {/* Right 3 Bare-Gold-Icon Inspection Pillars (48% — single-line labels, 2 shorter dividers) */}
                <div className="lg:w-[48%] lg:pl-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 items-center text-center">
                  <div className="flex flex-col items-center justify-center px-3">
                    <CalendarCheck
                      size={42}
                      strokeWidth={1.35}
                      className="text-[#E5C375] mb-3.5 shrink-0"
                    />
                    <span className="font-body text-[13.5px] lg:text-[14px] font-medium text-white/95 whitespace-nowrap">
                      By Appointment
                    </span>
                  </div>

                  <div className="relative flex flex-col items-center justify-center px-3 sm:before:content-[''] sm:before:absolute sm:before:left-0 sm:before:top-1/2 sm:before:-translate-y-1/2 sm:before:h-[72px] sm:before:w-px sm:before:bg-white/18">
                    <ShieldCheck
                      size={42}
                      strokeWidth={1.35}
                      className="text-[#E5C375] mb-3.5 shrink-0"
                    />
                    <span className="font-body text-[13.5px] lg:text-[14px] font-medium text-white/95 whitespace-nowrap">
                      Design Confidentiality
                    </span>
                  </div>

                  <div className="relative flex flex-col items-center justify-center px-3 sm:before:content-[''] sm:before:absolute sm:before:left-0 sm:before:top-1/2 sm:before:-translate-y-1/2 sm:before:h-[72px] sm:before:w-px sm:before:bg-white/18">
                    <HardHat
                      size={42}
                      strokeWidth={1.35}
                      className="text-[#E5C375] mb-3.5 shrink-0"
                    />
                    <span className="font-body text-[13.5px] lg:text-[14px] font-medium text-white/95 whitespace-nowrap">
                      Operational Safety
                    </span>
                  </div>
                </div>
              </div>

              {/* Lower CTA Row (aligned left directly under copy, exact 54px height & metallic gold/outline styling) */}
              <div className="relative z-10 mt-7 lg:mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?inquiry=factory-visit#smart-contact-form"
                  className="inline-flex items-center justify-center gap-2.5 h-[52px] lg:h-[54px] px-7 sm:px-9 rounded-[10px] text-[#082419] font-body text-[14.5px] lg:text-[15px] font-semibold transition-all duration-300 hover:brightness-105 hover:-translate-y-0.5 shadow-[0_6px_18px_-4px_rgba(222,168,89,0.45)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6D594 0%, #E0AB5C 52%, #C98B3B 100%)",
                  }}
                >
                  <span>Arrange Factory Visit</span>
                  <ArrowRight size={17} strokeWidth={2} />
                </Link>

                <a
                  href="/DHT_Company_Profile_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 h-[52px] lg:h-[54px] px-7 sm:px-8 rounded-[10px] bg-[#032619]/75 hover:bg-[#073624]/90 text-white border border-[#D8B460]/75 font-body text-[14.5px] lg:text-[15px] font-medium transition-all duration-300"
                >
                  <FileText size={19} strokeWidth={1.6} className="text-white/90 shrink-0" />
                  <span>View Company Profile (PDF)</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
