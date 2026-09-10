import Link from "next/link";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { ArrowRight, Factory, Ship, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FacilityItem {
  id: string;
  name: string;
  cluster: string;
  area: string;
  focus: string;
  port: string;
}

const facilities: FacilityItem[] = [
  { id: "01", name: "Facility 01", cluster: "Quy Nhon Area", area: "30,000 m²", focus: "Outdoor wood and mixed-material furniture", port: "Quy Nhon Port" },
  { id: "02", name: "Facility 02", cluster: "Ho Chi Minh City", area: "30,000 m²", focus: "Indoor, joinery and project furniture", port: "Cat Lai Port" },
  { id: "03", name: "Facility 03", cluster: "Southern Corridor", area: "51,360 m²", focus: "Wood and aluminium furniture", port: "Cai Mep / Cat Lai" },
  { id: "04", name: "Facility 04", cluster: "Southern Corridor", area: "30,720 m²", focus: "Wood and aluminium furniture", port: "Cai Mep / Cat Lai" },
  { id: "05", name: "Facility 05", cluster: "Southern Corridor", area: "31,000 m²", focus: "Wood, aluminium and mixed materials", port: "Cai Mep / Cat Lai" },
  { id: "06", name: "Facility 06", cluster: "Hung Yen Area", area: "24,800 m²", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "07", name: "Facility 07", cluster: "Hung Yen Area", area: "35,000 m²", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "08", name: "Facility 08", cluster: "Hung Yen Area", area: "25,000 m²", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "09", name: "Facility 09", cluster: "Hung Yen Area", area: "13,500 m²", focus: "Wood and aluminium furniture", port: "Hai Phong Port" },
  { id: "10", name: "Facility 10", cluster: "Phu Tho / Vinh Phuc", area: "12,000 m²", focus: "Indoor and project furniture", port: "Hai Phong Port" },
  { id: "11", name: "Facility 11", cluster: "Phu Tho", area: "260,000 m²", focus: "Engineered-wood panels & primary processing", port: "Hai Phong Port" },
];

export default function ManufacturingPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Manufacturing Footprint | 11 Facilities Across Vietnam | DHT Furniture"
        description="Explore DHT Furniture Vietnam's 11 manufacturing facilities covering 543,380 m² across 4 industrial clusters in Vietnam. Specialised capabilities in outdoor, indoor, and panel processing."
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
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded">
            National Production Footprint
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            11 Production Facilities. Specialised Capabilities Across Vietnam.
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed">
            Our family-owned group combines 10 furniture manufacturing facilities with one engineered-wood panel and primary-processing facility, covering a combined manufacturing footprint of 543,380 m² across Vietnam.
          </p>
        </section>

        {/* 4 CLUSTERS SUMMARY */}
        <section className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:border-[#B97846]/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#173C2C]/5 text-[#173C2C] flex items-center justify-center mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#173C2C] mb-1">Quy Nhon Area</h3>
              <p className="text-2xl font-extrabold text-[#B97846] mb-1">30,000 m²</p>
              <p className="text-xs text-gray-500 mb-3">1 Facility • Central Vietnam</p>
              <p className="text-sm text-gray-600 leading-relaxed">Specialised in outdoor wood and mixed-material furniture programmes. Direct access to Quy Nhon port.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:border-[#B97846]/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#173C2C]/5 text-[#173C2C] flex items-center justify-center mb-4">
                <Factory size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#173C2C] mb-1">HCMC & Southern Corridor</h3>
              <p className="text-2xl font-extrabold text-[#B97846] mb-1">143,080 m²</p>
              <p className="text-xs text-gray-500 mb-3">4 Facilities • Southern Vietnam</p>
              <p className="text-sm text-gray-600 leading-relaxed">Dedicated to indoor, wood, aluminium, and project collections. Export via Cat Lai and Cai Mep deep-water ports.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:border-[#B97846]/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#173C2C]/5 text-[#173C2C] flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#173C2C] mb-1">Hung Yen Area</h3>
              <p className="text-2xl font-extrabold text-[#B97846] mb-1">98,300 m²</p>
              <p className="text-xs text-gray-500 mb-3">4 Facilities • Northern Vietnam</p>
              <p className="text-sm text-gray-600 leading-relaxed">Precision manufacturing in wood and powder-coated aluminium furniture. Serviced by Hai Phong international port.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:border-[#B97846]/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#173C2C]/5 text-[#173C2C] flex items-center justify-center mb-4">
                <Ship size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#173C2C] mb-1">Phu Tho & Vinh Phuc</h3>
              <p className="text-2xl font-extrabold text-[#B97846] mb-1">272,000 m²</p>
              <p className="text-xs text-gray-500 mb-3">2 Facilities • Northern Processing</p>
              <p className="text-sm text-gray-600 leading-relaxed">Includes 12,000 m² project facility and 260,000 m² engineered-wood panel and primary-processing facility.</p>
            </div>
          </div>
        </section>

        {/* 11 FACILITIES TABLE */}
        <section className="container mx-auto px-6 py-10">
          <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#173C2C]">Comprehensive Facility Breakdown</h2>
                <p className="text-xs text-gray-500 mt-1">Combined Footprint: 543,380 m² (283,380 m² finished furniture + 260,000 m² panel & primary processing)</p>
              </div>
              <span className="text-xs bg-[#173C2C]/5 text-[#173C2C] px-3.5 py-1.5 rounded-full font-semibold">
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
                    <th className="py-4 px-6">Core Manufacturing Focus</th>
                    <th className="py-4 px-6">Export Gateway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {facilities.map((fac) => (
                    <tr key={fac.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#173C2C]">{fac.name}</td>
                      <td className="py-4 px-6">{fac.cluster}</td>
                      <td className="py-4 px-6 font-semibold text-[#B97846]">{fac.area}</td>
                      <td className="py-4 px-6">{fac.focus}</td>
                      <td className="py-4 px-6 text-xs text-gray-500">{fac.port}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SLIDE 11: KEY MACHINERY & PROCESSING SYSTEMS */}
        <section className="container mx-auto px-6 py-6 max-w-5xl">
          <div className="bg-white p-8 rounded-xl border border-black/5 shadow-sm mb-6">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">Slide 11 Specification</span>
              <h2 className="text-2xl font-bold text-[#173C2C] mt-1">Key Machinery & Processing Systems</h2>
              <p className="text-sm text-gray-600 mt-1">High-precision industrial machinery deployed across our 11 production facilities to ensure export-grade stability and tight tolerances.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Precision Cutting</p>
                <p className="text-sm font-semibold text-gray-800">Panel Saws & Sliding Table Saws</p>
                <p className="text-xs text-gray-500 mt-1">Homag & high-accuracy multi-rip systems</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Surfacing & Milling</p>
                <p className="text-sm font-semibold text-gray-800">Double-Surface Planers</p>
                <p className="text-xs text-gray-500 mt-1">Thickness planers & 4-side moulders</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Timber Lamination</p>
                <p className="text-sm font-semibold text-gray-800">Finger-Joint & Hydraulic Press</p>
                <p className="text-xs text-gray-500 mt-1">Hot & cold pressing lines for solid wood</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">CNC Shaping</p>
                <p className="text-sm font-semibold text-gray-800">Three-Axis CNC Machines</p>
                <p className="text-xs text-gray-500 mt-1">Multi-tool automated routing & joinery</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Surface Finishing</p>
                <p className="text-sm font-semibold text-gray-800">UV / PU / Oil Coating Lines</p>
                <p className="text-xs text-gray-500 mt-1">Automated spray booths & roller lines</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Metal Protection</p>
                <p className="text-sm font-semibold text-gray-800">Automated Powder Coating</p>
                <p className="text-xs text-gray-500 mt-1">Closed-loop powder recovery tunnel</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Moisture Control</p>
                <p className="text-sm font-semibold text-gray-800">Export-Standard Wood Kilns</p>
                <p className="text-xs text-gray-500 mt-1">Biomass-heated kilns, 8-12% target MC</p>
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE7]/50 border border-black/5">
                <p className="text-xs font-bold text-[#173C2C] uppercase tracking-wide mb-1">Packing & Protection</p>
                <p className="text-sm font-semibold text-gray-800">Drop-Tested Packaging Lines</p>
                <p className="text-xs text-gray-500 mt-1">ISTA 3A / 6A compliant carton lines</p>
              </div>
            </div>
          </div>
        </section>

        {/* LOGISTICS & GATEWAYS */}
        <section className="container mx-auto px-6 py-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-xl border border-black/5 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-3 flex items-center gap-2">
                <Ship size={20} className="text-[#B97846]" /> Strategic Export Gateways
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Export routing is strategically planned according to production facility location, order mix, and buyer shipping lines. Primary gateways include:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li><strong>Quy Nhon Port:</strong> Servicing Central Vietnam outdoor programmes.</li>
                <li><strong>Cat Lai (HCMC) & Cai Mep-Thi Vai:</strong> Direct deep-water mother vessel calls to US and EU for Southern facilities.</li>
                <li><strong>Hai Phong Port:</strong> Servicing Northern facilities in Hung Yen and Phu Tho.</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border border-black/5 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-[#B97846]" /> One DHT Management Team
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                While production takes place across specialised facilities, our centralised DHT team of approximately 20 professionals coordinates all buyer communications, technical development, quality verification, and shipping documentation.
              </p>
              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                Reference capacity at an outdoor facility: 60-70 40-ft containers per month, subject to product mix and production planning.
              </p>
            </div>
          </div>
        </section>

        {/* ON-SITE VISITS NOTICE & CTA */}
        <section className="container mx-auto px-6 py-10 max-w-4xl text-center">
          <div className="bg-white p-8 rounded-xl border border-[#B97846]/20 shadow-sm">
            <h3 className="text-xl font-bold text-[#173C2C] mb-3">Planning an On-Site Factory Inspection?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              To protect client designs and production integrity, factory visits are arranged strictly by appointment following an initial review of your product scope, specifications, and programme requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=visit"
                className="inline-flex items-center gap-2 bg-[#173C2C] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#173C2C]/90 transition-all shadow-sm"
              >
                Arrange Factory Visit <ArrowRight size={16} />
              </Link>
              <a
                href="/DHT_Company_Profile_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#173C2C] text-[#173C2C] px-6 py-3 rounded text-sm font-semibold hover:bg-[#173C2C]/5 transition-all"
              >
                Download Company Profile (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
