import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { 
  ArrowRight, Factory, Ship, ShieldCheck, MapPin, CheckCircle2, 
  Layers, Anchor, Boxes, Info, Sparkles 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import VietnamProductionMap, { ClusterInfo } from "@/components/maps/VietnamProductionMap";

interface FacilityItem {
  id: string;
  name: string;
  cluster: string;
  area: string;
  category: "Finished Furniture" | "Panel & Primary Processing";
  focus: string;
  port: string;
}

const facilities: FacilityItem[] = [
  { id: "01", name: "Facility 01", cluster: "Quy Nhon Area", area: "30,000 m²", category: "Finished Furniture", focus: "Outdoor wood and mixed-material furniture", port: "Quy Nhon Port" },
  { id: "02", name: "Facility 02", cluster: "Ho Chi Minh City", area: "30,000 m²", category: "Finished Furniture", focus: "Indoor, joinery and project furniture", port: "Cat Lai Port" },
  { id: "03", name: "Facility 03", cluster: "Southern Corridor", area: "51,360 m²", category: "Finished Furniture", focus: "Wood and aluminium furniture", port: "Cai Mep / Cat Lai" },
  { id: "04", name: "Facility 04", cluster: "Southern Corridor", area: "30,720 m²", category: "Finished Furniture", focus: "Wood and aluminium furniture", port: "Cai Mep / Cat Lai" },
  { id: "05", name: "Facility 05", cluster: "Southern Corridor", area: "31,000 m²", category: "Finished Furniture", focus: "Wood, aluminium and mixed materials", port: "Cai Mep / Cat Lai" },
  { id: "06", name: "Facility 06", cluster: "Hung Yen Area", area: "24,800 m²", category: "Finished Furniture", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "07", name: "Facility 07", cluster: "Hung Yen Area", area: "35,000 m²", category: "Finished Furniture", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "08", name: "Facility 08", cluster: "Hung Yen Area", area: "25,000 m²", category: "Finished Furniture", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "09", name: "Facility 09", cluster: "Hung Yen Area", area: "13,500 m²", category: "Finished Furniture", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "10", name: "Facility 10", cluster: "Phu Tho / Vinh Phuc", area: "12,000 m²", category: "Finished Furniture", focus: "Indoor and project furniture", port: "Hai Phong Port" },
  { id: "11", name: "Facility 11", cluster: "Phu Tho", area: "260,000 m²", category: "Panel & Primary Processing", focus: "Engineered-wood panels & primary processing", port: "Hai Phong Port" },
];

const clusters: ClusterInfo[] = [
  {
    id: "quynhon",
    name: "Quy Nhon Area",
    region: "Central Vietnam",
    totalArea: "30,000 m²",
    furnitureArea: "30,000 m²",
    facilitiesCount: 1,
    focus: "Specialised in outdoor wood and mixed-material furniture programmes. Direct proximity to Quy Nhon deep-water port.",
    ports: "Quy Nhon Port",
    pin: { x: 288.2, y: 458.6 },
    provinceNames: ["Binh Dinh"],
  },
  {
    id: "hcmc",
    name: "HCMC & Southern Corridor",
    region: "Southern Vietnam",
    totalArea: "143,080 m²",
    furnitureArea: "143,080 m²",
    facilitiesCount: 4,
    focus: "Dedicated to indoor collections, joinery, wood, aluminium, and hospitality projects. Direct logistics routing via Cat Lai and Cai Mep - Thi Vai.",
    ports: "Cat Lai & Cai Mep - Thi Vai",
    pin: { x: 195.5, y: 570.6 },
    provinceNames: ["Ho Chi Minh city", "Binh Duong", "Dong Nai", "Ba Ria - Vung Tau"],
  },
  {
    id: "hungyen",
    name: "Hung Yen Area",
    region: "Northern Vietnam",
    totalArea: "98,300 m²",
    furnitureArea: "98,300 m²",
    facilitiesCount: 4,
    focus: "Precision manufacturing in solid wood and powder-coated aluminium furniture. Serviced by Hai Phong international port.",
    ports: "Hai Phong Port",
    pin: { x: 172.5, y: 196.1 },
    provinceNames: ["Hung Yen"],
  },
  {
    id: "phutho",
    name: "Phu Tho & Vinh Phuc",
    region: "Northern Processing",
    totalArea: "272,000 m²",
    furnitureArea: "12,000 m² (furniture)",
    panelArea: "260,000 m² (panel)",
    facilitiesCount: 2,
    focus: "Combines a 12,000 m² indoor project facility with a 260,000 m² engineered-wood panel and primary timber processing plant.",
    ports: "Hai Phong Port",
    pin: { x: 143.4, y: 168.7 },
    provinceNames: ["Phu Tho", "Vinh Phuc"],
  },
];

export default function ManufacturingPage() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const [activeCluster, setActiveCluster] = useState<string>("quynhon");

  return (
    <>
      <SEO
        title="Manufacturing Footprint | 11 Facilities Across Vietnam | DHT Furniture"
        description="Explore DHT Furniture Vietnam's 11 manufacturing facilities covering 543,380 m² across 4 industrial clusters in Vietnam. 283,380 m² finished furniture and 260,000 m² panel processing."
        canonical="https://dhtcompany.com/manufacturing"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            { "@type": "ListItem", position: 2, name: "Manufacturing", item: "https://dhtcompany.com/manufacturing" }
          ]
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded-full">
            <Sparkles size={13} /> National Production Footprint
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            11 Production Facilities. Specialised Capabilities Across Vietnam.
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed mb-8">
            Our family-owned group combines 10 furniture manufacturing facilities with one engineered-wood panel and primary-processing facility, covering a combined manufacturing footprint of 543,380 m² across Vietnam.
          </p>

          {/* KEY METRICS BREAKDOWN HIGHLIGHT */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Total Facilities</p>
              <p className="text-2xl md:text-3xl font-black text-[#173C2C] mt-1">11 Facilities</p>
              <p className="text-xs text-gray-600 mt-1">10 Furniture + 1 Panel Plant</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Combined Footprint</p>
              <p className="text-2xl md:text-3xl font-black text-[#B97846] mt-1">543,380 m²</p>
              <p className="text-xs text-gray-600 mt-1">4 Strategic Regional Clusters</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Finished Furniture</p>
              <p className="text-2xl md:text-3xl font-black text-[#173C2C] mt-1">283,380 m²</p>
              <p className="text-xs text-gray-600 mt-1">Outdoor, Indoor & Hospitality</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">Panel & Processing</p>
              <p className="text-2xl md:text-3xl font-black text-[#173C2C] mt-1">260,000 m²</p>
              <p className="text-xs text-gray-600 mt-1">Engineered Wood & Veneer</p>
            </div>
          </div>
        </section>

        {/* 4 CLUSTERS & INTERACTIVE MAP SECTION */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">Geographic Distribution</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  Four Specialised Manufacturing Clusters
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  Distributed across North, Central, and South Vietnam to combine regional material advantages, specialised artisan workforces, and strategic port logistics.
                </p>
              </div>
              <div className="text-xs bg-[#F3EFE7] px-3.5 py-2 rounded-lg text-gray-600">
                Click a cluster below or on the map to explore capabilities
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* INTERACTIVE VIETNAM MAP (WITH HOANG SA & TRUONG SA) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <VietnamProductionMap
                  activeCluster={activeCluster}
                  onSelectCluster={setActiveCluster}
                  clusters={clusters}
                />
              </div>

              {/* 4 CLUSTER CARDS */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clusters.map((c) => {
                  const isSelected = activeCluster === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setActiveCluster(c.id)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#173C2C] text-white border-[#173C2C] shadow-md scale-[1.02]"
                          : "bg-white text-[#1F2723] border-black/10 hover:border-[#B97846]/50 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? "text-[#B97846]" : "text-gray-500"}`}>
                            {c.region}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            isSelected ? "bg-white/10 text-white" : "bg-[#173C2C]/5 text-[#173C2C]"
                          }`}>
                            {c.facilitiesCount} {c.facilitiesCount > 1 ? "Facilities" : "Facility"}
                          </span>
                        </div>
                        <h3 className={`text-lg font-bold mb-1 ${isSelected ? "text-white" : "text-[#173C2C]"}`}>
                          {c.name}
                        </h3>
                        <p className={`text-2xl font-black mb-2 ${isSelected ? "text-[#B97846]" : "text-[#B97846]"}`}>
                          {c.totalArea}
                        </p>
                        <p className={`text-xs leading-relaxed mb-4 ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                          {c.focus}
                        </p>
                      </div>

                      <div className={`pt-3 border-t text-xs flex items-center justify-between ${
                        isSelected ? "border-white/10 text-white/70" : "border-gray-100 text-gray-500"
                      }`}>
                        <span className="flex items-center gap-1">
                          <Ship size={13} className={isSelected ? "text-[#B97846]" : "text-[#173C2C]"} /> {c.ports}
                        </span>
                        <span className="font-semibold text-[11px]">
                          {c.panelArea ? "Furniture + Panel" : "Finished Furniture"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CLUSTER LEGAL DISCLAIMER NOTE */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-start gap-2.5 text-xs text-gray-500">
              <Info size={16} className="text-[#B97846] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Operational Distinction Note:</strong> Location clusters represent geographical production regions and group facility clusters, not separate legal entities or registered corporate offices. Commercial contracts, export licensing, and technical oversight are administered centrally by DHT Furniture Joint Stock Company.
              </p>
            </div>
          </div>
        </section>

        {/* 11 FACILITIES BREAKDOWN TABLE */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">Audited Capacity Master</span>
                <h2 className="text-xl md:text-2xl font-bold text-[#173C2C] mt-0.5">Comprehensive 11 Facility Breakdown</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Combined Operating Footprint: <strong>543,380 m²</strong> (Separating <strong>283,380 m²</strong> finished furniture manufacturing across 10 facilities + <strong>260,000 m²</strong> engineered-wood panel & primary processing).
                </p>
              </div>
              <span className="text-xs bg-[#173C2C]/5 text-[#173C2C] px-3.5 py-1.5 rounded-full font-semibold shrink-0">
                ~2,400 Group Manufacturing Personnel
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
                      <td className="py-3.5 px-6 font-bold text-[#173C2C]">{fac.name}</td>
                      <td className="py-3.5 px-6 font-medium text-gray-800">{fac.cluster}</td>
                      <td className="py-3.5 px-6 font-bold text-[#B97846]">{fac.area}</td>
                      <td className="py-3.5 px-6">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                          fac.category === "Panel & Primary Processing" 
                            ? "bg-amber-100 text-amber-800 border border-amber-200" 
                            : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                        }`}>
                          {fac.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-xs text-gray-700">{fac.focus}</td>
                      <td className="py-3.5 px-6 text-xs text-gray-500 font-mono">{fac.port}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#F8F6F0] font-semibold text-xs text-[#173C2C] border-t-2 border-gray-200">
                  <tr>
                    <td colSpan={2} className="py-3.5 px-6 font-bold">10 Finished Furniture Facilities Subtotal</td>
                    <td className="py-3.5 px-6 font-bold text-[#B97846]">283,380 m²</td>
                    <td colSpan={3} className="py-3.5 px-6 text-gray-500">Outdoor, indoor, aluminium and contract project production</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-3.5 px-6 font-bold">01 Engineered-Wood Panel Plant Subtotal</td>
                    <td className="py-3.5 px-6 font-bold text-[#B97846]">260,000 m²</td>
                    <td colSpan={3} className="py-3.5 px-6 text-gray-500">Engineered timber, plywood, veneer & primary processing</td>
                  </tr>
                  <tr className="bg-[#173C2C] text-white font-bold text-sm">
                    <td colSpan={2} className="py-4 px-6">Total Group Manufacturing Footprint</td>
                    <td className="py-4 px-6 text-[#B97846] font-black text-base">543,380 m²</td>
                    <td colSpan={3} className="py-4 px-6 text-xs text-white/80 font-normal">
                      Full 11-facility production network across 4 Vietnamese clusters
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* AUTHENTIC WORKSHOP PHOTOGRAPHY EVIDENCE SECTION */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">Authentic Evidence</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                Active Manufacturing Floors & Technical Operations
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Documentary photographs from our active furniture production lines across Vietnam, illustrating timber preparation, joinery assembly, and continuous finishing lines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* IMAGE 1: WhoWeAre1.png */}
              <div className="group rounded-xl overflow-hidden border border-black/10 bg-[#FBF9F5] flex flex-col hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                  <Image
                    src="/img/WhoWeAre1.png"
                    alt="Component sizing and manual joinery assembly at DHT furniture factory"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-[#173C2C]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    Component Sizing & Joinery
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#173C2C] mb-1.5">
                      Precision Woodworking & Manual Joinery
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Skilled artisans operating profiling routers and dry-fitting joinery components for outdoor dining sets and lounge frames.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                    Verified Activity: Joinery Assembly Floor
                  </div>
                </div>
              </div>

              {/* IMAGE 2: WhoWeAre2.png */}
              <div className="group rounded-xl overflow-hidden border border-black/10 bg-[#FBF9F5] flex flex-col hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                  <Image
                    src="/img/WhoWeAre2.png"
                    alt="Primary timber processing and sawing floor at DHT factory"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-[#173C2C]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    Primary Processing & Milling
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#173C2C] mb-1.5">
                      Timber Preparation & Multi-Blade Sawing Bay
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Primary wood preparation floor equipped with multi-rip panel saws, industrial dust evacuation systems, and kiln-dried lumber staging.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                    Verified Activity: Lumber Milling & Conditioning
                  </div>
                </div>
              </div>

              {/* IMAGE 3: WhoWeAre3.png */}
              <div className="group rounded-xl overflow-hidden border border-black/10 bg-[#FBF9F5] flex flex-col hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                  <Image
                    src="/img/WhoWeAre3.png"
                    alt="In-line finishing and transfer conveyor system at DHT factory"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-[#173C2C]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    Finishing & Line Assembly
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#173C2C] mb-1.5">
                      In-Line Component Finishing & Transfer Lines
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Continuous belt transfer conveyor connecting automated surface coating lines with intermediate component staging prior to final packing.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                    Verified Activity: In-Line Surface Finishing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTDOOR MANUFACTURING CAPABILITY & TECHNICAL SPECIFICATIONS (Item 13) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  {isVi ? "Năng Lực Chuyên Biệt Ngoại Thất" : "Outdoor Manufacturing Capability"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  {isVi ? "Quy Chuẩn Kỹ Thuật Nội Thất Ngoài Trời" : "Outdoor Furniture Specifications & Engineering Standards"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
                  {isVi 
                    ? "DHT phát triển và gia công các chương trình bàn ăn ngoài trời, sofa lounge, ghế tắm nắng và nội thất module phối hợp vật liệu, đáp ứng tiêu chuẩn kiểm định EN 581 và ASTM cho thị trường xuất khẩu."
                    : "DHT engineers outdoor dining collections, deep seating lounges, sunloungers, daybeds, and modular systems combining certified timber, architectural aluminium, and high-performance woven materials tested to EN 581 and ASTM standards."}
                </p>
              </div>
              <Link
                href="/catalogue/outdoor"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#173C2C] hover:bg-[#173C2C]/90 px-4 py-2.5 rounded-lg transition-colors shrink-0"
              >
                <span>{isVi ? "Xem Bộ Sưu Tập Outdoor" : "View Outdoor Catalogue"}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">FSC Timber</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">100% Certified</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#173C2C]">
                    {isVi ? "Gỗ Tự Nhiên Đạt Chuẩn FSC" : "FSC-Certified Hardwoods"}
                  </h4>
                  <ul className="text-xs text-gray-600 mt-3 space-y-1.5 leading-relaxed">
                    <li>• <strong>Acacia hybrid:</strong> {isVi ? "Gỗ keo lai Việt Nam" : "Vietnam plantation source"}</li>
                    <li>• <strong>Eucalyptus grandis:</strong> {isVi ? "Bạch đàn Uruguay" : "Uruguay plantation source"}</li>
                    <li>• <strong>Tectona grandis:</strong> {isVi ? "Gỗ tếch Mato Grosso, Brazil" : "Mato Grosso, Brazil source"}</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Độ ẩm sấy chuẩn: 8–12% MC" : "Target Moisture: 8–12% MC"}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Aluminium & Steel</span>
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">Powder Coated</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#173C2C]">
                    {isVi ? "Khung Kim Loại & Xử Lý Bề Mặt" : "Architectural Metal Frames"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {isVi
                      ? "Ống nhôm định hình 1.5–2.0mm và thép kết cấu, tẩy rửa hoá chất đa tầng trước khi sơn bột tĩnh điện ngoài trời, nung buồng sấy tự động chống ăn mòn muối biển."
                      : "Architectural tubular aluminium (1.5–2.0mm) & structural steel. Multi-stage chemical degreasing and electrostatic exterior powder coating for salt-spray durability."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Hàn TIG/MIG & nẹp ngàm chính xác" : "Precision TIG/MIG Welding"}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Rope & Wicker</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">UV Resistant</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#173C2C]">
                    {isVi ? "Đan Thủ Công & Đệm Ngoài Trời" : "All-Weather Woven & Foam"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {isVi
                      ? "Mây nhựa HDPE và dây đan polypropylene/polyester kháng tia UV. Đệm mút thoát nước nhanh hoặc mút đàn hồi cao bọc vải chuyên dụng trượt nước."
                      : "UV-stabilised HDPE synthetic wicker and solution-dyed outdoor ropes. Quick-drying reticulated or high-resilience foam cores in water-repellent fabrics."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Thử nghiệm chống cháy theo đơn hàng" : "Flammability Tested on Request"}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Compliance & Scale</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">EN 581 / ASTM</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#173C2C]">
                    {isVi ? "Kiểm Định & Đóng Gói Xuất Khẩu" : "Testing & Export Packaging"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {isVi
                      ? "Thử nghiệm độ bền cơ học EN 581-1/2/3 và ASTM. Thùng carton 5 lớp xuất khẩu thử nghiệm thả rơi ISTA, túi hút ẩm và nẹp góc gia cố."
                      : "Mechanical safety & cycle testing to EN 581 and ASTM upon programme specification. ISTA drop-test export cartons with corner protection and desiccants."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Công suất: 60–70 cont 40ft/tháng/xưởng" : "Capacity: 60–70 conts/mo/plant"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY MACHINERY & PROCESSING SYSTEMS (CLEANED OF UNPROVEN CLAIMS) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="mb-8 pb-6 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                {t("manufacturing.equipment", "Manufacturing Equipment")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                {t("manufacturing.keyMachinery", "Key Machinery & Processing Systems")}
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                {t("manufacturing.machineryDesc", "Industrial equipment deployed across our 11 production facilities to ensure export-grade precision, consistent moisture content, and durable surface protection.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Precision Cutting</p>
                  <p className="text-sm font-bold text-[#173C2C]">Panel Saws & Sliding Table Saws</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Heavy-duty sliding table saws and multi-blade cutting units for clean dimensional sizing and tight tolerances.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Woodworking Preparation
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Surfacing & Milling</p>
                  <p className="text-sm font-bold text-[#173C2C]">Double-Surface Planers</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Dual-side surface planers, thickness planers, and 4-side moulders for smooth lumber surfacing.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Timber Planing & Moulding
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Timber Lamination</p>
                  <p className="text-sm font-bold text-[#173C2C]">Finger-Joint & Hydraulic Press</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Finger-jointing machines with hot and cold hydraulic pressing lines for solid wood panel lamination.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Structural Jointing
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">CNC Shaping</p>
                  <p className="text-sm font-bold text-[#173C2C]">Three-Axis CNC Machines</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Three-axis CNC routing and mortising systems for repeatable curved cuts, joinery slots, and hardware pockets.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Automated Joinery
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Surface Finishing</p>
                  <p className="text-sm font-bold text-[#173C2C]">UV / PU / Oil Coating Lines</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Enclosed spray booths, automated roller coating lines, and curing chambers for exterior-grade finishes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Protective Coatings
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Metal Fabrication</p>
                  <p className="text-sm font-bold text-[#173C2C]">Aluminium & Powder Coating</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    TIG/MIG welding bays, chemical degreasing pre-treatment, and electrostatic powder coating chambers.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Metal Finishing
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Moisture Control</p>
                  <p className="text-sm font-bold text-[#173C2C]">Export-Standard Wood Kilns</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Large-capacity drying kilns with automated humidity sensors, conditioning timber to 8–12% target moisture content.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Kiln Conditioning
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide mb-1">Export Packaging</p>
                  <p className="text-sm font-bold text-[#173C2C]">Packaging & Vacuum Sealing Lines</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Carton packing lines with reinforced corner protection, flat-pack hardware vacuum bagging, and container strapping.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  Export Protection
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMERCIAL SCALE & OPERATING PARAMETERS (Item 17) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                  {isVi ? "Quy Mô & Thông Số Thương Mại" : "Commercial Parameters & Scale"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  {isVi ? "Năng Lực Cung Ứng & Điều Kiện Đơn Hàng" : "Production Scale, Capacity & Order Parameters"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
                  {isVi 
                    ? "Tổng quan về công suất container hàng tháng, tỷ lệ vận hành nhà xưởng, chính sách MOQ và khả năng đóng ghép container linh hoạt phục vụ các nhà bán lẻ và phân phối quốc tế."
                    : "Key commercial operating parameters covering container volumes, plant capacity utilization, minimum order quantities (MOQ), and mixed-container loading flexibility for global retailers and distributors."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Container Capacity */}
              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Monthly Output</span>
                    <span className="text-[10px] bg-[#173C2C]/10 text-[#173C2C] px-2 py-0.5 rounded font-semibold">40ft HC</span>
                  </div>
                  <h4 className="text-base font-bold text-[#173C2C]">
                    {isVi ? "60–70 Cont / Tháng / Xưởng" : "60–70 Conts / Mo / Plant"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {isVi
                      ? "Công suất tham chiếu tại một cơ sở sản xuất ngoại thất đạt 60–70 container 40ft/tháng. Tổng năng lực nhóm có thể nhân rộng linh hoạt trên 10 cơ sở thành phẩm."
                      : "Reference capacity at a typical outdoor facility is 60–70 40-ft High Cube containers per month. Cumulative multi-plant capacity is scalable across our 10 furniture facilities."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Tổng mặt bằng: 543,380 m²" : "Group Footprint: 543,380 m²"}
                </div>
              </div>

              {/* Card 2: Plant Utilisation */}
              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Plant Utilisation</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Seasonal Buffer</span>
                  </div>
                  <h4 className="text-base font-bold text-[#173C2C]">
                    {isVi ? "75%–85% Tỷ Lệ Vận Hành" : "75%–85% Target Utilisation"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {isVi
                      ? "Tỷ lệ khai thác nhà xưởng duy trì ở mức 75%–85% trong giai đoạn cao điểm mùa vụ, chủ động giữ quỹ dự phòng công suất cho các đơn đặt hàng lặp lại (repeat orders)."
                      : "Operating utilisation is calibrated seasonally at 75%–85% during peak export cycles, deliberately reserving buffer capacity for urgent re-orders and programme expansions."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Lực lượng: ~2,400 nhân sự nhóm" : "Workforce: ~2,400 Personnel"}
                </div>
              </div>

              {/* Card 3: MOQ & Mixed Container */}
              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Order Minimums</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">Flexible Loading</span>
                  </div>
                  <h4 className="text-base font-bold text-[#173C2C]">
                    {isVi ? "1 Cont 40ft (Ghép SKU)" : "1 × 40ft HC (Mixed SKUs)"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {isVi
                      ? "MOQ tiêu chuẩn tính theo 1 container 40ft High Cube cho mỗi đơn hàng sản xuất. Hỗ trợ ghép linh hoạt nhiều SKU trong cùng bộ sưu tập hoặc cùng nhóm vật liệu để tối ưu thể tích CBM."
                      : "Standard production MOQ is 1 × 40ft High Cube container per run. Supports flexible mixed-SKU loading across the same collection or material suite to maximize CBM ocean freight efficiency."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Mẫu thử: 7–14 ngày sau duyệt bản vẽ" : "Prototypes: 7–14 Days Post-Drawings"}
                </div>
              </div>

              {/* Card 4: Delivery Terms */}
              <div className="p-5 rounded-xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B97846] uppercase tracking-wide">Commercial Terms</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">Incoterms</span>
                  </div>
                  <h4 className="text-base font-bold text-[#173C2C]">
                    {isVi ? "FOB Việt Nam / CIF Cảng Đến" : "FOB Vietnam / CIF Terms"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {isVi
                      ? "Giá FOB giao tại các cảng Quy Nhơn, Cát Lái, Cái Mép hoặc Hải Phòng. Tiến độ sản xuất: 60–90 ngày cho đơn hàng mới, 45–60 ngày cho đơn hàng lặp lại sau khi chốt cọc và bản vẽ."
                      : "Standard terms quoted FOB at designated gateways (Quy Nhon, Cat Lai, Cai Mep, Hai Phong) or CIF upon request. Production lead times: 60–90 days initial, 45–60 days repeat."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                  {isVi ? "Điều phối: 1 đầu mối trung tâm" : "Single Commercial Coordination Hub"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGISTICS, EXPORT GATEWAYS & TARGET MARKETS (Item 24) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gateways Box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#173C2C] mb-3 flex items-center gap-2">
                  <Ship size={20} className="text-[#B97846]" /> 
                  {isVi ? "Cửa Ngõ Xuất Khẩu Chiến Lược" : "Strategic Export Gateways"}
                </h3>
                {/* VERBATIM AUDIT STATEMENT (Guide M03 / Mã 10) */}
                <p className="text-sm text-gray-700 mb-5 leading-relaxed font-medium bg-[#F8F6F0] p-4 rounded-xl border border-black/5">
                  &ldquo;Export routing is planned according to the production location, order mix and buyer requirements. Relevant gateways include Quy Nhon, Cat Lai, Cai Mep-Thi Vai and Hai Phong.&rdquo;
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-[#F8F6F0]/60 rounded-lg border border-black/5">
                    <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide">Quy Nhon Port (Central Vietnam)</p>
                    <p className="text-xs text-gray-600 mt-0.5">Servicing Central Vietnam outdoor timber and mixed-material collections with direct terminal access.</p>
                  </div>
                  <div className="p-3 bg-[#F8F6F0]/60 rounded-lg border border-black/5">
                    <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide">Cat Lai Port (Ho Chi Minh City)</p>
                    <p className="text-xs text-gray-600 mt-0.5">Premier commercial container hub servicing Southern Vietnam indoor, upholstered, and casegoods plants.</p>
                  </div>
                  <div className="p-3 bg-[#F8F6F0]/60 rounded-lg border border-black/5">
                    <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide">Cai Mep - Thi Vai Deep-Water Terminal</p>
                    <p className="text-xs text-gray-600 mt-0.5">Deep-water international terminal accommodating direct mother-vessel routes to US East/West Coast and European hubs without transshipment.</p>
                  </div>
                  <div className="p-3 bg-[#F8F6F0]/60 rounded-lg border border-black/5">
                    <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide">Hai Phong Port (Northern Vietnam)</p>
                    <p className="text-xs text-gray-600 mt-0.5">Northern maritime gateway servicing Hung Yen furniture facilities and Phu Tho panel/processing plants.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Markets & Dedicated Coordination Box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#173C2C] mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#B97846]" /> 
                  {isVi ? "Thị Trường Xuất Khẩu & Đội Ngũ Điều Phối" : "Approved Export Markets & Coordination"}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {isVi
                    ? "Sản phẩm của DHT được xuất khẩu rộng rãi tới các thị trường bán lẻ và dự án quốc tế, được điều phối bởi đội ngũ trung tâm khoảng 20 nhân sự quản lý kỹ thuật, chất lượng và chứng từ vận tải."
                    : "DHT furniture programmes are shipped worldwide to commercial retail chains, importers, and hospitality projects, coordinated by our centralised team of approximately 20 professionals."}
                </p>

                {/* 4 Approved Export Programme Destinations */}
                <div className="space-y-3 mb-5">
                  <div className="p-3 rounded-lg bg-[#F8F6F0]/80 border border-black/5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#B97846] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-xs text-[#173C2C] block">North America (United States & Canada)</strong>
                      <span className="text-[11px] text-gray-600 leading-snug">Full compliance dossiers for U.S. Lacey Act, TSCA Title VI / CARB Phase 2, and ASTM safety standards. Direct mother-vessel shipping via Cai Mep.</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8F6F0]/80 border border-black/5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#B97846] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-xs text-[#173C2C] block">Europe & United Kingdom (EU / UK)</strong>
                      <span className="text-[11px] text-gray-600 leading-snug">Traceability supporting EUDR due diligence, EN 581 structural testing, REACH SVHC checks, and BS 5852 flammability standards.</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8F6F0]/80 border border-black/5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#B97846] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-xs text-[#173C2C] block">Australia & New Zealand (Oceania)</strong>
                      <span className="text-[11px] text-gray-600 leading-snug">Department of Agriculture (DAFF) biosecurity protocols with targeted seasonal BMSB offshore heat treatment and high-index UV weathering testing.</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8F6F0]/80 border border-black/5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#B97846] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-xs text-[#173C2C] block">Asia-Pacific & Regional Trade</strong>
                      <span className="text-[11px] text-gray-600 leading-snug">Regional contract casegoods and turnkey hotel joinery shipped via direct regional feeder networks.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-[#F8F6F0] p-4 rounded-xl border border-black/5 leading-relaxed">
                <span className="font-bold text-[#173C2C]">One DHT Coordination:</span> Single point of commercial contact, unified Bill of Materials (BOM), standardised in-line QC gates, and consolidated container shipping across all 11 production facilities.
              </div>
            </div>
          </div>
        </section>

        {/* ON-SITE VISITS NOTICE & CTA */}
        <section className="container mx-auto px-6 py-10 max-w-4xl text-center">
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#B97846]/20 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-[#173C2C] mb-3">Planning an On-Site Factory Inspection?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              To protect client proprietary designs and maintain strict operational safety, factory visits are arranged strictly by appointment following an initial review of your product scope, specifications, and programme requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=visit"
                className="inline-flex items-center gap-2 bg-[#173C2C] text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#173C2C]/90 transition-all shadow-sm"
              >
                Arrange Factory Visit <ArrowRight size={16} />
              </Link>
              <Link
                href="/DHT_Company_Profile_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-[#173C2C] border border-[#173C2C]/30 px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-black/5 transition-all"
              >
                View Company Profile (PDF)
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
