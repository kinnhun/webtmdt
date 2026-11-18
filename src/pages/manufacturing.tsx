import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import {
  ArrowRight,
  Ship,
  Info,
  Sparkles,
  Globe2,
  ZoomIn,
  ZoomOut,
  Building2,
  Anchor,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import VietnamProductionMap, { ClusterInfo } from "@/components/maps/VietnamProductionMap";
import mapData from "../../public/data/vietnam-map.json";

interface FacilityItem {
  id: string;
  name: string;
  cluster: string;
  clusterId: "quynhon" | "hcmc" | "hungyen" | "phutho";
  area: string;
  category: "Finished Furniture" | "Panel & Primary Processing";
  focus: string;
  port: string;
  portGroup: "quynhon_port" | "south_ports" | "haiphong_port";
  monthlyVolume?: string;
}

const facilities: FacilityItem[] = [
  {
    id: "01",
    name: "Facility 01",
    cluster: "Quy Nhon Area",
    clusterId: "quynhon",
    area: "30,000 m²",
    category: "Finished Furniture",
    focus:
      "Wooden outdoor furniture, aluminium furniture, and mixed-material products incorporating wicker or rattan.",
    port: "Quy Nhon Port",
    portGroup: "quynhon_port",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "02",
    name: "Facility 02",
    cluster: "Ho Chi Minh City",
    clusterId: "hcmc",
    area: "30,000 m²",
    category: "Finished Furniture",
    focus:
      "High-end indoor and project furniture, including manufacturing, installation and turnkey interior completion.",
    port: "Cat Lai Port",
    portGroup: "south_ports",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "03",
    name: "Facility 03",
    cluster: "Southern Corridor",
    clusterId: "hcmc",
    area: "51,360 m²",
    category: "Finished Furniture",
    focus: "Wood and aluminium furniture manufacturing.",
    port: "Cai Mep / Cat Lai",
    portGroup: "south_ports",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "04",
    name: "Facility 04",
    cluster: "Southern Corridor",
    clusterId: "hcmc",
    area: "30,720 m²",
    category: "Finished Furniture",
    focus: "Wood and aluminium furniture manufacturing.",
    port: "Cai Mep / Cat Lai",
    portGroup: "south_ports",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "05",
    name: "Facility 05",
    cluster: "Southern Corridor",
    clusterId: "hcmc",
    area: "31,000 m²",
    category: "Finished Furniture",
    focus: "Wood, aluminium and mixed-material furniture manufacturing.",
    port: "Cai Mep / Cat Lai",
    portGroup: "south_ports",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "06",
    name: "Facility 06",
    cluster: "Hung Yen Area",
    clusterId: "hungyen",
    area: "24,800 m²",
    category: "Finished Furniture",
    focus: "Wood furniture manufacturing.",
    port: "Hai Phong Port",
    portGroup: "haiphong_port",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "07",
    name: "Facility 07",
    cluster: "Hung Yen Area",
    clusterId: "hungyen",
    area: "35,000 m²",
    category: "Finished Furniture",
    focus: "Mechanical fabrication and metal furniture manufacturing.",
    port: "Hai Phong Port",
    portGroup: "haiphong_port",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "08",
    name: "Facility 08",
    cluster: "Hung Yen Area",
    clusterId: "hungyen",
    area: "25,000 m²",
    category: "Finished Furniture",
    focus: "Office chairs, sofas and upholstered furniture manufacturing.",
    port: "Hai Phong Port",
    portGroup: "haiphong_port",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "09",
    name: "Facility 09",
    cluster: "Hung Yen Area",
    clusterId: "hungyen",
    area: "13,500 m²",
    category: "Finished Furniture",
    focus: "Steel cabinets, safes, racks and metal furniture manufacturing.",
    port: "Hai Phong Port",
    portGroup: "haiphong_port",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "10",
    name: "Facility 10",
    cluster: "Phu Tho / Vinh Phuc",
    clusterId: "phutho",
    area: "12,000 m²",
    category: "Finished Furniture",
    focus:
      "Indoor and contract furniture for office, education, healthcare, hospitality and residential projects.",
    port: "Hai Phong Port",
    portGroup: "haiphong_port",
    monthlyVolume: "50–60 containers/month",
  },
  {
    id: "11",
    name: "Facility 11",
    cluster: "Phu Tho",
    clusterId: "phutho",
    area: "260,000 m²",
    category: "Panel & Primary Processing",
    focus: "Engineered-wood panels and primary timber processing.",
    port: "Hai Phong Port",
    portGroup: "haiphong_port",
  },
];

const clusters: ClusterInfo[] = [
  {
    id: "quynhon",
    name: "Quy Nhon",
    region: "Central Vietnam",
    totalArea: "30,000 m²",
    furnitureArea: "30,000 m²",
    facilitiesCount: 1,
    focus:
      "Primarily wooden outdoor furniture, complemented by aluminium and mixed-material products incorporating wicker or rattan.",
    ports: "Quy Nhon Port",
    pin: { x: 288.2, y: 458.6 },
    provinceNames: ["Binh Dinh"],
  },
  {
    id: "hcmc",
    name: "Ho Chi Minh City & Southern Corridor",
    region: "Southern Vietnam",
    totalArea: "143,080 m²",
    furnitureArea: "143,080 m²",
    facilitiesCount: 4,
    focus:
      "Primarily indoor furniture, alongside wooden outdoor furniture and aluminium mixed-material products.",
    ports: "Cat Lai / Cai Mep - Thi Vai",
    pin: { x: 195.5, y: 570.6 },
    provinceNames: ["Ho Chi Minh city", "Binh Duong", "Dong Nai", "Ba Ria - Vung Tau"],
  },
  {
    id: "hungyen",
    name: "Hung Yen",
    region: "Northern Vietnam",
    totalArea: "98,300 m²",
    furnitureArea: "98,300 m²",
    facilitiesCount: 4,
    focus:
      "Powder-coated steel and aluminium furniture, indoor furniture, and wooden outdoor furniture for project requirements.",
    ports: "Hai Phong Port",
    pin: { x: 172.5, y: 196.1 },
    provinceNames: ["Hung Yen"],
  },
  {
    id: "phutho",
    name: "Phu Tho & Vinh Phuc",
    region: "Northern Processing & Projects",
    totalArea: "272,000 m²",
    furnitureArea: "12,000 m² (furniture)",
    panelArea: "260,000 m² (panel)",
    facilitiesCount: 2,
    focus:
      "Indoor and project furniture, engineered-wood panels and primary timber processing.",
    ports: "Hai Phong Port",
    pin: { x: 143.4, y: 168.7 },
    provinceNames: ["Phu Tho", "Vinh Phuc"],
  },
];

interface ExportVolumeGroup {
  id: string;
  label: string;
  facilityIds: string[];
  facilitiesLabel: string;
  facilityCount: number;
  volume: string;
  portName: string;
  portId: "quynhon_port" | "south_ports" | "haiphong_port";
  note: string;
  pin: { x: number; y: number };
  portPin: { x: number; y: number };
}

const exportVolumeGroups: ExportVolumeGroup[] = [
  {
    id: "quynhon",
    label: "Quy Nhon",
    facilityIds: ["01"],
    facilitiesLabel: "Facility 01",
    facilityCount: 1,
    volume: "50–60 containers/month",
    portName: "Quy Nhon Port",
    portId: "quynhon_port",
    note: "1 furniture facility × 50–60 containers/month",
    pin: { x: 288.2, y: 458.6 },
    portPin: { x: 304, y: 458.6 },
  },
  {
    id: "hcmc",
    label: "Ho Chi Minh & Southern Corridor",
    facilityIds: ["02", "03", "04", "05"],
    facilitiesLabel: "Facilities 02–05",
    facilityCount: 4,
    volume: "200–240 containers/month",
    portName: "Cat Lai / Cai Mep - Thi Vai",
    portId: "south_ports",
    note: "4 furniture facilities × 50–60 containers/month",
    pin: { x: 195.5, y: 570.6 },
    portPin: { x: 218, y: 582 },
  },
  {
    id: "hungyen",
    label: "Hung Yen",
    facilityIds: ["06", "07", "08", "09"],
    facilitiesLabel: "Facilities 06–09",
    facilityCount: 4,
    volume: "200–240 containers/month",
    portName: "Hai Phong Port",
    portId: "haiphong_port",
    note: "4 furniture facilities × 50–60 containers/month",
    pin: { x: 172.5, y: 196.1 },
    portPin: { x: 202, y: 193 },
  },
  {
    id: "phutho",
    label: "Phu Tho / Vinh Phuc",
    facilityIds: ["10"],
    facilitiesLabel: "Facility 10",
    facilityCount: 1,
    volume: "50–60 containers/month",
    portName: "Hai Phong Port",
    portId: "haiphong_port",
    note: "1 furniture facility × 50–60 containers/month (Excludes Facility 11 panel plant)",
    pin: { x: 143.4, y: 168.7 },
    portPin: { x: 202, y: 193 },
  },
];

const portGateways = [
  {
    id: "haiphong_port" as const,
    name: "Hai Phong Port",
    region: "Northern Gateway",
    facilitiesServed: "Facilities 06–10 (5 furniture facilities)",
    volume: "250–300 containers/month",
    x: 202,
    y: 193,
  },
  {
    id: "quynhon_port" as const,
    name: "Quy Nhon Port",
    region: "Central Gateway",
    facilitiesServed: "Facility 01 (1 furniture facility)",
    volume: "50–60 containers/month",
    x: 304,
    y: 458.6,
  },
  {
    id: "south_ports" as const,
    name: "Cat Lai / Cai Mep - Thi Vai",
    region: "Southern Gateway",
    facilitiesServed: "Facilities 02–05 (4 furniture facilities)",
    volume: "200–240 containers/month",
    x: 218,
    y: 582,
  },
];

interface MarketCountry {
  name: string;
  regionId: "na" | "eu" | "mea" | "apac";
  x: number;
  y: number;
}

const GLOBAL_MARKETS_REGIONS: {
  id: "na" | "eu" | "mea" | "apac";
  name: string;
  count: number;
  countries: MarketCountry[];
}[] = [
  {
    id: "na",
    name: "North America",
    count: 2,
    countries: [
      { name: "United States", regionId: "na", x: 215, y: 185 },
      { name: "Canada", regionId: "na", x: 205, y: 130 },
    ],
  },
  {
    id: "eu",
    name: "Europe",
    count: 14,
    countries: [
      { name: "United Kingdom", regionId: "eu", x: 472, y: 142 },
      { name: "Austria", regionId: "eu", x: 518, y: 162 },
      { name: "Denmark", regionId: "eu", x: 505, y: 132 },
      { name: "Estonia", regionId: "eu", x: 538, y: 120 },
      { name: "France", regionId: "eu", x: 486, y: 164 },
      { name: "Germany", regionId: "eu", x: 506, y: 150 },
      { name: "Greece", regionId: "eu", x: 536, y: 188 },
      { name: "Hungary", regionId: "eu", x: 528, y: 164 },
      { name: "Italy", regionId: "eu", x: 512, y: 178 },
      { name: "Netherlands", regionId: "eu", x: 494, y: 146 },
      { name: "Poland", regionId: "eu", x: 526, y: 146 },
      { name: "Slovakia", regionId: "eu", x: 528, y: 158 },
      { name: "Slovenia", regionId: "eu", x: 516, y: 168 },
      { name: "Spain", regionId: "eu", x: 472, y: 184 },
    ],
  },
  {
    id: "mea",
    name: "Middle East & Eurasia",
    count: 8,
    countries: [
      { name: "Türkiye", regionId: "mea", x: 562, y: 188 },
      { name: "Israel", regionId: "mea", x: 564, y: 216 },
      { name: "Lebanon", regionId: "mea", x: 566, y: 208 },
      { name: "Georgia", regionId: "mea", x: 586, y: 178 },
      { name: "Russia", regionId: "mea", x: 645, y: 118 },
      { name: "United Arab Emirates", regionId: "mea", x: 612, y: 238 },
      { name: "Saudi Arabia", regionId: "mea", x: 588, y: 236 },
      { name: "Qatar", regionId: "mea", x: 604, y: 234 },
    ],
  },
  {
    id: "apac",
    name: "Asia-Pacific & Africa",
    count: 5,
    countries: [
      { name: "China", regionId: "apac", x: 745, y: 195 },
      { name: "India", regionId: "apac", x: 688, y: 238 },
      { name: "Australia", regionId: "apac", x: 815, y: 375 },
      { name: "Mauritius", regionId: "apac", x: 618, y: 352 },
      { name: "South Africa", regionId: "apac", x: 538, y: 378 },
    ],
  },
];

const ALL_MARKET_COUNTRIES = GLOBAL_MARKETS_REGIONS.flatMap((r) => r.countries);

export default function ManufacturingPage() {
  const { i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const [activeCluster, setActiveCluster] = useState<string>("quynhon");

  // Interactive state for Section 05: Monthly Export Volume Across Our Furniture Facilities
  const [selectedVolumeFilter, setSelectedVolumeFilter] = useState<string>("all");

  // Interactive state for Section 06: Our Global Markets
  const [europeZoom, setEuropeZoom] = useState<boolean>(false);
  const [activeMarketRegion, setActiveMarketRegion] = useState<string>("all");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const activeVolumeSummary = (() => {
    if (selectedVolumeFilter === "all") {
      return {
        title: "All 10 Furniture Facilities (01–10)",
        volume: "500–600 containers/month",
        sub: "Average 50–60 containers/month per furniture facility · Excludes Facility 11 (260,000 m² panel & primary processing)",
        ports: "Quy Nhon Port · Cat Lai / Cai Mep - Thi Vai · Hai Phong Port",
      };
    }
    const byFacility = facilities.find(
      (f) => f.id === selectedVolumeFilter && f.id !== "11"
    );
    if (byFacility) {
      return {
        title: `${byFacility.name} — ${byFacility.cluster} (${byFacility.area})`,
        volume: byFacility.monthlyVolume || "50–60 containers/month",
        sub: byFacility.focus,
        ports: `Port of Loading: ${byFacility.port}`,
      };
    }
    const byRegion = exportVolumeGroups.find((g) => g.id === selectedVolumeFilter);
    if (byRegion) {
      return {
        title: `${byRegion.label} (${byRegion.facilitiesLabel})`,
        volume: byRegion.volume,
        sub: byRegion.note,
        ports: `Export Gateway: ${byRegion.portName}`,
      };
    }
    const byPort = portGateways.find((p) => p.id === selectedVolumeFilter);
    if (byPort) {
      return {
        title: `${byPort.name} (${byPort.region})`,
        volume: byPort.volume,
        sub: byPort.facilitiesServed,
        ports: `Consolidated export volume via ${byPort.name}`,
      };
    }
    return {
      title: "All 10 Furniture Facilities (01–10)",
      volume: "500–600 containers/month",
      sub: "Average 50–60 containers/month per furniture facility",
      ports: "Quy Nhon Port · Cat Lai / Cai Mep - Thi Vai · Hai Phong Port",
    };
  })();

  return (
    <>
      <SEO
        title="Manufacturing Footprint | 11 Facilities Across Vietnam | DHT Furniture"
        description="Explore DHT Furniture's 11 manufacturing facilities covering 543,380 m² across 4 industrial clusters in Vietnam: 283,380 m² finished furniture and 260,000 m² panel processing."
        canonical="https://dhtcompany.com/manufacturing"
      />
      <Schema
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

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* 01 — OVERVIEW + FOUR EXISTING KPIS */}
        <section className="container mx-auto px-6 py-10 text-center max-w-5xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded-full">
            <Sparkles size={13} /> National Production Footprint
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-5 leading-tight max-w-4xl mx-auto">
            11 Production Facilities. Specialised Capabilities Across Vietnam.
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed mb-10 max-w-3xl mx-auto">
            Our manufacturing network combines 10 furniture manufacturing facilities with one
            engineered-wood panel and primary-processing facility, covering a combined manufacturing
            footprint of 543,380 m² across Vietnam.
          </p>

          {/* 4 KPI CARDS — EQUAL HEIGHT, NO LINE BREAK ON m² */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left auto-rows-fr">
            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                Total Facilities
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#173C2C] my-2 whitespace-nowrap lining-nums tabular-nums">
                11 Facilities
              </p>
              <p className="text-xs text-gray-600">10 Furniture + 1 Panel Plant</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                Combined Footprint
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#B97846] my-2 whitespace-nowrap lining-nums tabular-nums">
                543,380 m²
              </p>
              <p className="text-xs text-gray-600">4 Strategic Regional Clusters</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                Finished Furniture
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#173C2C] my-2 whitespace-nowrap lining-nums tabular-nums">
                283,380 m²
              </p>
              <p className="text-xs text-gray-600">Outdoor, Indoor & Hospitality</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                Panel & Processing
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#173C2C] my-2 whitespace-nowrap lining-nums tabular-nums">
                260,000 m²
              </p>
              <p className="text-xs text-gray-600">Engineered Wood & Veneer</p>
            </div>
          </div>
        </section>

        {/* 02 — MAP OF FOUR MANUFACTURING REGIONS */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  Geographic Distribution
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  Four Specialised Manufacturing Clusters
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  Distributed across North, Central, and South Vietnam to combine regional material
                  advantages and specialised manufacturing capabilities.
                </p>
              </div>
              <div className="text-xs bg-[#F3EFE7] px-3.5 py-2 rounded-lg text-gray-600">
                Select a region below or on the map to explore capabilities
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* INTERACTIVE VIETNAM MAP */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <VietnamProductionMap
                  activeCluster={activeCluster}
                  onSelectCluster={setActiveCluster}
                  clusters={clusters}
                />
              </div>

              {/* 4 CLUSTER CARDS (PORT INFO MOVED TO SECTION 05 VOLUME MAP) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {clusters.map((c) => {
                  const isSelected = activeCluster === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setActiveCluster(c.id)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#173C2C] text-white border-[#173C2C] shadow-md scale-[1.01]"
                          : "bg-white text-[#1F2723] border-black/10 hover:border-[#B97846]/50 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider ${
                              isSelected ? "text-[#B97846]" : "text-gray-500"
                            }`}
                          >
                            {c.region}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                              isSelected
                                ? "bg-white/10 text-white"
                                : "bg-[#173C2C]/5 text-[#173C2C]"
                            }`}
                          >
                            {c.facilitiesCount} {c.facilitiesCount > 1 ? "Facilities" : "Facility"}
                          </span>
                        </div>
                        <h3
                          className={`text-lg font-bold mb-1 ${
                            isSelected ? "text-white" : "text-[#173C2C]"
                          }`}
                        >
                          {c.name}
                        </h3>
                        <p className="text-2xl font-black mb-2.5 text-[#B97846] whitespace-nowrap">
                          {c.totalArea}
                        </p>
                        <p
                          className={`text-xs leading-relaxed ${
                            isSelected ? "text-white/85" : "text-gray-600"
                          }`}
                        >
                          {c.focus}
                        </p>
                      </div>

                      <div
                        className={`mt-4 pt-3 border-t text-xs flex items-center justify-between ${
                          isSelected
                            ? "border-white/10 text-white/70"
                            : "border-gray-100 text-gray-500"
                        }`}
                      >
                        <span className="font-semibold text-[11px]">
                          {c.panelArea
                            ? "12,000 m² Furniture + 260,000 m² Panel"
                            : "Finished Furniture"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OPERATIONAL COORDINATION NOTE */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-start gap-2.5 text-xs text-gray-500">
              <Info size={16} className="text-[#B97846] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Operational Note:</strong> Location clusters represent geographical
                production regions across our manufacturing network in Vietnam. Commercial
                inquiries, quotations, quality control and export coordination are managed through
                one DHT commercial team.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — 11-FACILITY TABLE */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  Audited Capacity Master
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-[#173C2C] mt-0.5">
                  Comprehensive 11 Facility Breakdown
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Combined Operating Footprint: <strong>543,380 m²</strong> (Separating{" "}
                  <strong>283,380 m²</strong> finished furniture manufacturing across 10 facilities +{" "}
                  <strong>260,000 m²</strong> engineered-wood panel & primary processing).
                </p>
              </div>
              <span className="text-xs bg-[#173C2C]/5 text-[#173C2C] px-3.5 py-1.5 rounded-full font-semibold shrink-0">
                ~2,400 Network Personnel
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-[#173C2C] text-white text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-4 px-6">Facility</th>
                    <th className="py-4 px-6">Location Cluster</th>
                    <th className="py-4 px-6">Operating Footprint</th>
                    <th className="py-4 px-6">Operational Classification</th>
                    <th className="py-4 px-6">Core Manufacturing Focus</th>
                    <th className="py-4 px-6">Primary Export Gateway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {facilities.map((fac) => (
                    <tr key={fac.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-[#173C2C] whitespace-nowrap">
                        {fac.name}
                      </td>
                      <td className="py-3.5 px-6 font-medium text-gray-800 whitespace-nowrap">
                        {fac.cluster}
                      </td>
                      <td className="py-3.5 px-6 font-bold text-[#B97846] whitespace-nowrap">
                        {fac.area}
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap">
                        <span
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                            fac.category === "Panel & Primary Processing"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                          }`}
                        >
                          {fac.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-xs text-gray-700 leading-relaxed max-w-md">
                        {fac.focus}
                      </td>
                      <td className="py-3.5 px-6 text-xs text-gray-500 font-mono whitespace-nowrap">
                        {fac.port}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#F8F6F0] font-semibold text-xs text-[#173C2C] border-t-2 border-gray-200">
                  <tr>
                    <td colSpan={2} className="py-3.5 px-6 font-bold">
                      10 Finished Furniture Facilities Subtotal
                    </td>
                    <td className="py-3.5 px-6 font-bold text-[#B97846] whitespace-nowrap">
                      283,380 m²
                    </td>
                    <td colSpan={3} className="py-3.5 px-6 text-gray-500">
                      Outdoor, indoor, aluminium, steel and project furniture manufacturing
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-3.5 px-6 font-bold">
                      01 Engineered-Wood Panel Plant Subtotal
                    </td>
                    <td className="py-3.5 px-6 font-bold text-[#B97846] whitespace-nowrap">
                      260,000 m²
                    </td>
                    <td colSpan={3} className="py-3.5 px-6 text-gray-500">
                      Engineered-wood panels and primary timber processing
                    </td>
                  </tr>
                  <tr className="bg-[#173C2C] text-white font-bold text-sm">
                    <td colSpan={2} className="py-4 px-6">
                      Total Combined Manufacturing Footprint
                    </td>
                    <td className="py-4 px-6 text-[#B97846] font-black text-base whitespace-nowrap">
                      543,380 m²
                    </td>
                    <td colSpan={3} className="py-4 px-6 text-xs text-white/80 font-normal">
                      Full 11-facility production network across 4 Vietnamese clusters
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* 04 — OUR MANUFACTURING FACILITIES (FACTORY IMAGERY GALLERY) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  Factory Imagery
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  Our Manufacturing Facilities
                </h2>
              </div>
              <p className="text-xs text-gray-500">
                Selected views across our wood processing, joinery and finishing operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  src: "/img/WhoWeAre1.png",
                  tag: "Woodworking & Joinery",
                  title: "Joinery & Assembly Workshop",
                  focus: "Component sizing, profiling and joinery assembly for wooden furniture.",
                },
                {
                  src: "/img/WhoWeAre2.png",
                  tag: "Timber & Panel Preparation",
                  title: "Primary Timber Processing",
                  focus: "Lumber conditioning, multi-blade sawing and panel preparation.",
                },
                {
                  src: "/img/WhoWeAre3.png",
                  tag: "Coating & Line Transfer",
                  title: "Surface Finishing Line",
                  focus: "In-line component coating, transfer conveyor and pre-pack staging.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl overflow-hidden border border-black/10 bg-[#FBF9F5] flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-[#173C2C]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-[#173C2C] mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-snug">{item.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — MONTHLY EXPORT VOLUME ACROSS OUR FURNITURE FACILITIES */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  Reference Export Capacity & Gateways
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  Monthly Export Volume Across Our Furniture Facilities
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
                  Reference monthly export capacity across our 10 finished furniture facilities
                  (Facilities 01–10) and primary maritime export gateways in Vietnam.
                </p>
              </div>
              <button
                onClick={() => setSelectedVolumeFilter("all")}
                className={`text-xs font-semibold px-3.5 py-2 rounded-lg border transition-colors shrink-0 ${
                  selectedVolumeFilter === "all"
                    ? "bg-[#173C2C] text-white border-[#173C2C]"
                    : "bg-[#F3EFE7] text-[#173C2C] border-black/10 hover:bg-[#173C2C]/10"
                }`}
              >
                Show All 10 Furniture Facilities (500–600 containers/month)
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: VIETNAM EXPORT VOLUME & PORT GATEWAY MAP */}
              <div className="lg:col-span-5 bg-[#F8F6F0] rounded-xl p-5 border border-black/5 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span className="font-bold text-[#173C2C] flex items-center gap-1.5">
                    <Building2 size={14} className="text-[#B97846]" /> Facilities 01–10
                  </span>
                  <span className="font-bold text-[#173C2C] flex items-center gap-1.5">
                    <Anchor size={14} className="text-[#B97846]" /> Export Ports
                  </span>
                </div>

                <div className="relative w-full max-w-[330px] mx-auto">
                  <svg
                    viewBox="70 70 300 600"
                    className="w-full h-auto drop-shadow-sm select-none"
                    aria-label="Vietnam Furniture Export Volume and Port Gateways Map"
                  >
                    <g>
                      {mapData.provinces.map((prov: { id: string; name: string; path: string }) => {
                        const isClusterProvince = [
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
                            fill={isClusterProvince ? "#B97846" : "#DCE3DD"}
                            fillOpacity={isClusterProvince ? 0.45 : 1}
                            stroke="#FFFFFF"
                            strokeWidth="0.6"
                          />
                        );
                      })}
                    </g>

                    {/* Route Connectors from Facility Clusters to Assigned Export Ports */}
                    {exportVolumeGroups.map((group) => {
                      const isActive =
                        selectedVolumeFilter === "all" ||
                        selectedVolumeFilter === group.id ||
                        selectedVolumeFilter === group.portId ||
                        group.facilityIds.includes(selectedVolumeFilter);
                      return (
                        <g key={group.id}>
                          <line
                            x1={group.pin.x}
                            y1={group.pin.y}
                            x2={group.portPin.x}
                            y2={group.portPin.y}
                            stroke={isActive ? "#B97846" : "#9CA3AF"}
                            strokeWidth={isActive ? "2" : "1"}
                            strokeDasharray="3 2"
                          />
                          {/* Facility Cluster Node */}
                          <g
                            className="cursor-pointer"
                            onClick={() => setSelectedVolumeFilter(group.id)}
                          >
                            <circle
                              cx={group.pin.x}
                              cy={group.pin.y}
                              r={isActive ? 8 : 6}
                              fill={isActive ? "#173C2C" : "#6B7280"}
                              stroke="#FFFFFF"
                              strokeWidth="2"
                            />
                            <text
                              x={group.pin.x - 12}
                              y={group.pin.y + 3}
                              textAnchor="end"
                              fill="#173C2C"
                              fontSize="8.5"
                              fontWeight="700"
                            >
                              {group.facilitiesLabel}
                            </text>
                          </g>
                        </g>
                      );
                    })}

                    {/* Port Gateway Markers */}
                    {portGateways.map((port) => {
                      const isActive =
                        selectedVolumeFilter === "all" ||
                        selectedVolumeFilter === port.id ||
                        exportVolumeGroups.some(
                          (g) =>
                            (g.id === selectedVolumeFilter ||
                              g.facilityIds.includes(selectedVolumeFilter)) &&
                            g.portId === port.id
                        );
                      return (
                        <g
                          key={port.id}
                          className="cursor-pointer"
                          onClick={() => setSelectedVolumeFilter(port.id)}
                        >
                          <rect
                            x={port.x - 6}
                            y={port.y - 6}
                            width="12"
                            height="12"
                            rx="3"
                            fill={isActive ? "#B97846" : "#9CA3AF"}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                          <text
                            x={port.x + 10}
                            y={port.y + 3}
                            textAnchor="start"
                            fill="#0E241B"
                            fontSize="8.5"
                            fontWeight="800"
                          >
                            {port.name}
                          </text>
                        </g>
                      );
                    })}

                    {/* Sovereign Archipelagos */}
                    <g transform="translate(295, 360)">
                      <circle cx="15" cy="10" r="2" fill="#173C2C" />
                      <text x="15" y="25" textAnchor="middle" fill="#173C2C" fontSize="6.5" fontWeight="700">
                        HOANG SA
                      </text>
                    </g>
                    <g transform="translate(295, 550)">
                      <circle cx="15" cy="12" r="2" fill="#173C2C" />
                      <text x="15" y="28" textAnchor="middle" fill="#173C2C" fontSize="6.5" fontWeight="700">
                        TRUONG SA
                      </text>
                    </g>
                  </svg>
                </div>

                <p className="text-[11px] text-gray-500 text-center mt-2">
                  Click any facility cluster or port gateway on the map or cards to inspect volume
                  allocation.
                </p>
              </div>

              {/* RIGHT: TOTAL REFERENCE + REGION & PORT BREAKDOWN */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {/* Active Summary Banner */}
                <div className="bg-[#173C2C] text-white p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#E8C5A5] font-bold">
                      {activeVolumeSummary.title}
                    </span>
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/90 font-medium">
                      50–60 containers/month per facility
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-[#B97846] my-1 whitespace-nowrap">
                    {activeVolumeSummary.volume}
                  </p>
                  <p className="text-xs text-white/80 mt-1">{activeVolumeSummary.sub}</p>
                  <p className="text-xs text-[#E8C5A5] font-medium mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                    <Ship size={14} /> {activeVolumeSummary.ports}
                  </p>
                </div>

                {/* Individual Facility Selector (Facilities 01–10) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                    Select Individual Furniture Facility (01–10)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {facilities
                      .filter((f) => f.id !== "11")
                      .map((fac) => {
                        const isSelected = selectedVolumeFilter === fac.id;
                        return (
                          <button
                            key={fac.id}
                            onClick={() =>
                              setSelectedVolumeFilter(isSelected ? "all" : fac.id)
                            }
                            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#173C2C] text-white border-[#173C2C] shadow-sm"
                                : "bg-white text-[#173C2C] border-black/10 hover:border-[#B97846]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{fac.name}</span>
                              <span
                                className={`text-[10px] font-semibold ${
                                  isSelected ? "text-[#E8C5A5]" : "text-[#B97846]"
                                }`}
                              >
                                50–60
                              </span>
                            </div>
                            <p
                              className={`text-[10px] truncate mt-0.5 ${
                                isSelected ? "text-white/75" : "text-gray-500"
                              }`}
                            >
                              {fac.cluster}
                            </p>
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Breakdown by Furniture Facility Cluster (Facilities 01–10) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Breakdown by Manufacturing Region (Facilities 01–10)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exportVolumeGroups.map((group) => {
                      const isSelected = selectedVolumeFilter === group.id;
                      return (
                        <div
                          key={group.id}
                          onClick={() =>
                            setSelectedVolumeFilter(isSelected ? "all" : group.id)
                          }
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#173C2C]/5 border-[#173C2C] shadow-sm"
                              : "bg-[#F8F6F0] border-black/5 hover:border-[#B97846]/50"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-bold text-[#173C2C]">
                                {group.label}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#173C2C]/10 text-[#173C2C]">
                                {group.facilitiesLabel}
                              </span>
                            </div>
                            <p className="text-lg font-black text-[#B97846] my-1">
                              {group.volume}
                            </p>
                            <p className="text-[11px] text-gray-600">{group.note}</p>
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-black/6 flex items-center justify-between text-[11px] text-[#173C2C] font-semibold">
                            <span className="flex items-center gap-1">
                              <Ship size={12} className="text-[#B97846]" /> {group.portName}
                            </span>
                            <span>
                              {group.facilityCount}{" "}
                              {group.facilityCount > 1 ? "facilities" : "facility"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Breakdown by Export Port Gateway (No Double Counting) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Consolidated Volume by Primary Export Port
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {portGateways.map((port) => {
                      const isSelected = selectedVolumeFilter === port.id;
                      return (
                        <div
                          key={port.id}
                          onClick={() =>
                            setSelectedVolumeFilter(isSelected ? "all" : port.id)
                          }
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#173C2C] text-white border-[#173C2C]"
                              : "bg-white border-black/10 hover:border-[#B97846]/50"
                          }`}
                        >
                          <p
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isSelected ? "text-[#E8C5A5]" : "text-gray-500"
                            }`}
                          >
                            {port.region}
                          </p>
                          <p
                            className={`text-sm font-bold mt-0.5 ${
                              isSelected ? "text-white" : "text-[#173C2C]"
                            }`}
                          >
                            {port.name}
                          </p>
                          <p className="text-base font-black text-[#B97846] my-1">
                            {port.volume}
                          </p>
                          <p
                            className={`text-[11px] ${
                              isSelected ? "text-white/75" : "text-gray-500"
                            }`}
                          >
                            {port.facilitiesServed}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footnote */}
                <div className="p-3.5 rounded-lg bg-[#F8F6F0] border border-black/5 text-xs text-gray-600 leading-relaxed">
                  <strong>Reference Volume Note:</strong> Figures represent an indicative reference
                  range (<strong>50–60 containers/month</strong> per furniture facility × 10
                  facilities = <strong>500–600 containers/month</strong> across the reference
                  network, excluding Facility 11). These are unaudited reference estimates for the
                  facility network and do not represent DHT-owned capacity or DHT-exclusive order
                  volume. Each container is counted once at its port of loading without
                  transshipment double-counting.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — OUR GLOBAL MARKETS */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  International Reach
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  Our Global Markets
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  Exporting across 29 countries in North America, Europe, Middle East & Eurasia,
                  and Asia-Pacific & Africa.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setEuropeZoom(false)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${
                    !europeZoom
                      ? "bg-[#173C2C] text-white border-[#173C2C]"
                      : "bg-[#F8F6F0] text-[#173C2C] border-black/10 hover:bg-[#173C2C]/10"
                  }`}
                >
                  <ZoomOut size={14} /> World View (29)
                </button>
                <button
                  onClick={() => {
                    setEuropeZoom(true);
                    setActiveMarketRegion("eu");
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${
                    europeZoom
                      ? "bg-[#B97846] text-white border-[#B97846]"
                      : "bg-[#F8F6F0] text-[#173C2C] border-black/10 hover:bg-[#B97846]/15"
                  }`}
                >
                  <ZoomIn size={14} /> Europe Cluster Zoom (14)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* 70% WORLD MAP (NO FLIGHT LINES / SHIPPING ROUTES) */}
              <div className="lg:col-span-8 bg-[#0E241B] rounded-xl p-4 sm:p-6 border border-black/10 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveMarketRegion("all");
                        setEuropeZoom(false);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        activeMarketRegion === "all"
                          ? "bg-[#B97846] text-white"
                          : "bg-white/10 text-white/75 hover:bg-white/20"
                      }`}
                    >
                      All Regions (29)
                    </button>
                    {GLOBAL_MARKETS_REGIONS.map((reg) => (
                      <button
                        key={reg.id}
                        onClick={() => {
                          setActiveMarketRegion(reg.id);
                          if (reg.id === "eu") setEuropeZoom(true);
                          else setEuropeZoom(false);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          activeMarketRegion === reg.id
                            ? "bg-[#B97846] text-white"
                            : "bg-white/10 text-white/75 hover:bg-white/20"
                        }`}
                      >
                        {reg.name} ({reg.count})
                      </button>
                    ))}
                  </div>

                  {hoveredCountry && (
                    <span className="px-3 py-1 rounded-full bg-[#B97846] text-white text-xs font-bold">
                      {hoveredCountry}
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#132E22]">
                  <svg
                    viewBox={europeZoom ? "440 100 140 110" : "80 60 840 380"}
                    className="w-full h-full transition-all duration-500 select-none"
                    aria-label="Our Global Markets Map"
                  >
                    {/* Subtle Lat/Long Grid */}
                    <g stroke="rgba(255,255,255,0.05)" strokeWidth={europeZoom ? "0.3" : "1"}>
                      <line x1="80" y1="150" x2="920" y2="150" />
                      <line x1="80" y1="230" x2="920" y2="230" />
                      <line x1="80" y1="310" x2="920" y2="310" />
                      <line x1="250" y1="60" x2="250" y2="440" />
                      <line x1="500" y1="60" x2="500" y2="440" />
                      <line x1="750" y1="60" x2="750" y2="440" />
                    </g>

                    {/* Stylized Continental Landmasses */}
                    <g fill="#1F4736" stroke="rgba(255,255,255,0.12)" strokeWidth={europeZoom ? "0.4" : "1"}>
                      {/* North America */}
                      <path d="M120,95 L295,95 L310,165 L255,235 L185,230 L135,175 Z" />
                      {/* South America */}
                      <path d="M255,255 L345,275 L330,415 L275,425 L245,330 Z" />
                      {/* Europe */}
                      <path d="M455,105 L565,100 L575,185 L525,198 L458,192 Z" />
                      {/* Africa */}
                      <path d="M455,210 L575,215 L605,310 L555,400 L505,395 L475,305 Z" />
                      {/* Eurasia & Middle East & Asia */}
                      <path d="M568,90 L865,95 L885,245 L765,295 L665,275 L575,245 L555,185 Z" />
                      {/* Australia */}
                      <path d="M765,335 L865,335 L875,405 L775,405 Z" />
                    </g>

                    {/* Vietnam Manufacturing Origin Marker */}
                    {!europeZoom && (
                      <g>
                        <circle
                          cx="755"
                          cy="255"
                          r="6"
                          fill="#10B981"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <text
                          x="755"
                          y="272"
                          textAnchor="middle"
                          fill="#A7F3D0"
                          fontSize="10"
                          fontWeight="800"
                        >
                          VIETNAM (DHT)
                        </text>
                      </g>
                    )}

                    {/* 29 Market Country Nodes */}
                    {ALL_MARKET_COUNTRIES.map((country) => {
                      const isRegionActive =
                        activeMarketRegion === "all" || activeMarketRegion === country.regionId;
                      const isHovered = hoveredCountry === country.name;
                      const radius = europeZoom
                        ? isHovered
                          ? 3.2
                          : 2.2
                        : isHovered
                        ? 8
                        : isRegionActive
                        ? 5.5
                        : 3.5;

                      return (
                        <g
                          key={country.name}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredCountry(country.name)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => setHoveredCountry(country.name)}
                        >
                          <circle
                            cx={country.x}
                            cy={country.y}
                            r={radius}
                            fill={
                              isHovered
                                ? "#FFFFFF"
                                : isRegionActive
                                ? "#B97846"
                                : "rgba(255,255,255,0.3)"
                            }
                            stroke="#0E241B"
                            strokeWidth={europeZoom ? "0.5" : "1.5"}
                          />
                          {(isHovered || (europeZoom && country.regionId === "eu")) && (
                            <text
                              x={country.x}
                              y={country.y - (europeZoom ? 4 : 10)}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize={europeZoom ? "3.4" : "10"}
                              fontWeight="700"
                            >
                              {country.name}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
                  <span>
                    Hover or tap any country marker or name in the list to highlight its location.
                  </span>
                  <span className="text-[#E8C5A5] font-semibold">
                    4 Regions · 29 Export Countries
                  </span>
                </div>
              </div>

              {/* 30% COUNTRY LIST BY 4 REGIONS (29 COUNTRIES) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {GLOBAL_MARKETS_REGIONS.map((region) => {
                  const isActive =
                    activeMarketRegion === "all" || activeMarketRegion === region.id;
                  return (
                    <div
                      key={region.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isActive
                          ? "bg-[#F8F6F0] border-[#173C2C]/20"
                          : "bg-gray-50/60 border-black/5 opacity-75"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <button
                          onClick={() => {
                            setActiveMarketRegion(
                              activeMarketRegion === region.id ? "all" : region.id
                            );
                            if (region.id === "eu") setEuropeZoom(true);
                            else setEuropeZoom(false);
                          }}
                          className="text-xs font-bold uppercase tracking-wider text-[#173C2C] hover:text-[#B97846] transition-colors flex items-center gap-1.5 text-left"
                        >
                          <Globe2 size={13} className="text-[#B97846]" />
                          {region.name}
                        </button>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#173C2C] text-white">
                          {region.count}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {region.countries.map((c) => {
                          const isHovered = hoveredCountry === c.name;
                          return (
                            <button
                              key={c.name}
                              onMouseEnter={() => setHoveredCountry(c.name)}
                              onMouseLeave={() => setHoveredCountry(null)}
                              onClick={() => {
                                setHoveredCountry(c.name);
                                if (c.regionId === "eu") setEuropeZoom(true);
                              }}
                              className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                                isHovered
                                  ? "bg-[#B97846] text-white border-[#B97846] font-semibold"
                                  : "bg-white text-gray-700 border-black/10 hover:border-[#B97846]"
                              }`}
                            >
                              {c.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 07 — DHT CONTACT / VISIT REQUEST / COMPANY PROFILE */}
        <section className="container mx-auto px-6 py-10 max-w-4xl text-center">
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#B97846]/20 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-[#173C2C] mb-3">
              {isVi
                ? "Đặt Lịch Tham Quan Nhà Máy Hoặc Yêu Cầu Báo Giá"
                : "Planning an On-Site Factory Inspection?"}
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              {isVi
                ? "Để bảo mật thiết kế của khách hàng và đảm bảo an toàn vận hành, lịch tham quan nhà máy được sắp xếp theo lịch hẹn trước thông qua đầu mối thương mại DHT."
                : "To protect client proprietary designs and maintain operational safety, factory visits are arranged by appointment following an initial review of your product scope and requirements."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=visit"
                className="inline-flex items-center gap-2 bg-[#173C2C] text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#173C2C]/90 transition-all shadow-sm"
              >
                {isVi ? "Đặt Lịch Tham Quan Nhà Máy" : "Arrange Factory Visit"}{" "}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/DHT_Company_Profile_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-[#173C2C] border border-[#173C2C]/30 px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-black/5 transition-all"
              >
                {isVi ? "Tải Hồ Sơ Năng Lực (PDF)" : "View Company Profile (PDF)"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
