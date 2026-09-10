import Link from "next/link";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { Sofa, Utensils, Hotel, Layers, ArrowRight, CheckCircle2, ShieldCheck, Factory } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function IndoorCataloguePage() {
  const { t } = useTranslation();

  const capabilities = [
    {
      icon: Utensils,
      title: "Dining & Occasional",
      desc: "Solid oak, ash, rubberwood, and acacia dining tables, upholstered chairs, sideboards, and occasional consoles engineered for residential and commercial contract programmes.",
      tags: ["Solid Timber", "Veneered Tops", "Contract Chairs", "Custom Finishes"]
    },
    {
      icon: Sofa,
      title: "Living & Upholstered Seating",
      desc: "Sectionals, sofas, armchairs, and cushioned ottomans upholstered in contract-grade fabrics and compliant with international CA TB117 / BS 5852 flammability standards.",
      tags: ["High-Resilience Foam", "Fire-Retardant Fabrics", "Hardwood Frames", "Modular Configs"]
    },
    {
      icon: Layers,
      title: "Bedroom & Storage Systems",
      desc: "Bed frames, nightstands, dressers, and custom cabinetry combining veneered engineered panels, solid wood structural frames, and precision soft-close hardware.",
      tags: ["TSCA Title VI Compliant", "Soft-Close Hardware", "Custom Wardrobes", "Durable Veneers"]
    },
    {
      icon: Hotel,
      title: "Hospitality & Turnkey Projects",
      desc: "Comprehensive casegoods and turnkey joinery packages tailored for hotels, serviced apartments, resorts, and restaurants built directly from architectural CAD drawings.",
      tags: ["Architectural Joinery", "High-Traffic Specs", "CAD Value Engineering", "Knock-Down / Fully Assembled"]
    }
  ];

  return (
    <>
      <SEO
        title="Indoor & Project Furniture Manufacturing | DHT Furniture Vietnam"
        description="Discover DHT Furniture Vietnam's capabilities in manufacturing solid wood, upholstered, and mixed-material furniture for residential, hospitality, and commercial programmes."
        canonical="https://dhtcompany.com/catalogue/indoor"
        image="/img/categories/indoor.jpg"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            { "@type": "ListItem", position: 2, name: "Indoor & Projects", item: "https://dhtcompany.com/catalogue/indoor" }
          ]
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* HERO */}
        <section className="container mx-auto px-6 py-10 text-center max-w-4xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded">
            Contract & OEM Manufacturing
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            Indoor & Project Furniture
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed">
            DHT supports solid-wood, engineered-wood, upholstered, and mixed-material furniture for residential, hospitality, and commercial programmes through specialised facilities within our family-owned group.
          </p>
        </section>

        {/* 4 CORE CAPABILITIES */}
        <section className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white p-8 rounded-xl shadow-sm border border-black/5 hover:border-[#B97846]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#173C2C]/5 text-[#173C2C] flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#173C2C] mb-3">{cap.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">{cap.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {cap.tags.map(tag => (
                      <span key={tag} className="text-[11px] bg-[#F3EFE7] text-[#173C2C] px-2.5 py-1 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TECHNICAL ADAPTATION & VALUE ENGINEERING BANNER */}
        <section className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="bg-white p-8 sm:p-10 rounded-xl border border-black/5 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-semibold text-[#B97846] uppercase tracking-wider block mb-2">
                  Tailored To Your Specifications
                </span>
                <h3 className="text-2xl font-bold text-[#173C2C] mb-4">
                  Custom Development, Sampling & Value Engineering
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Product adaptation, material selection, value engineering, and packaging development are reviewed according to your architectural brief, target price points, and intended commercial use.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0" />
                    <span>Typical sample lead time: 7-14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0" />
                    <span>New production orders: 60-90 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0" />
                    <span>All wood used in DHT furniture is FSC-certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0" />
                    <span>Flat-pack (KD) or fully assembled options</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact?type=project"
                  className="w-full text-center py-3.5 px-6 rounded bg-[#173C2C] text-white text-sm font-semibold hover:bg-[#173C2C]/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  Discuss Project Brief <ArrowRight size={16} />
                </Link>
                <Link
                  href="/manufacturing"
                  className="w-full text-center py-3 px-6 rounded border border-[#173C2C]/30 text-[#173C2C] text-sm font-medium hover:bg-[#173C2C]/5 transition-all"
                >
                  View Facilities Network
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-8 text-center max-w-3xl">
          <div className="bg-[#173C2C] text-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">Looking for Outdoor Collections?</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Explore our extensive range of outdoor dining, lounge, sunlounger, and modular furniture crafted in FSC timber, powder-coated aluminium, and all-weather ropes.
            </p>
            <Link
              href="/catalogue/outdoor"
              className="inline-flex items-center gap-2 bg-[#B97846] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#B97846]/90 transition-all shadow-sm"
            >
              Explore Outdoor Collections <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
