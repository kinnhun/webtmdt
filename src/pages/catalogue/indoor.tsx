import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { Sofa, Utensils, Hotel, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function IndoorCataloguePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const lng = router.locale;

  const tr = (key: string, defaultVal: string) => t(key, { defaultValue: defaultVal, lng });

  const diningTags = t("catalogue.indoor.capabilities.dining.tags", { returnObjects: true, lng });
  const livingTags = t("catalogue.indoor.capabilities.living.tags", { returnObjects: true, lng });
  const upholsteredTags = t("catalogue.indoor.capabilities.upholstered.tags", { returnObjects: true, lng });
  const hospitalityTags = t("catalogue.indoor.capabilities.hospitality.tags", { returnObjects: true, lng });

  const capabilities = [
    {
      id: "dining",
      icon: Utensils,
      title: tr("catalogue.indoor.capabilities.dining.title", "Dining & Occasional"),
      image: "/img/category/diningset1.png",
      imageAlt: tr("catalogue.indoor.capabilities.dining.title", "DHT Dining and Occasional Furniture Manufacturing"),
      desc: tr("catalogue.indoor.capabilities.dining.desc", "Solid oak, ash, rubberwood, and acacia dining tables, upholstered chairs, sideboards, and occasional consoles engineered for residential and commercial contract programmes."),
      tags: Array.isArray(diningTags) ? diningTags : ["Solid Timber", "Veneered Tops", "Contract Dining Chairs", "Custom Finishes"],
      specNote: tr("catalogue.indoor.capabilities.dining.specNote", "Kiln-dried timber (8–12% MC) • Custom commercial finishes")
    },
    {
      id: "living-storage",
      icon: Layers,
      title: tr("catalogue.indoor.capabilities.living.title", "Living & Storage"),
      image: "/img/category/chairs.png",
      imageAlt: tr("catalogue.indoor.capabilities.living.title", "DHT Living Room Casegoods, Cabinets and Storage Systems"),
      desc: tr("catalogue.indoor.capabilities.living.desc", "Sideboards, media consoles, shelving systems, dressers, and custom cabinetry combining veneered engineered panels, solid wood structural frames, and precision hardware. Composite wood and adhesives confirmed to TSCA Title VI / CARB Phase 2 compliance according to destination dossier."),
      tags: Array.isArray(livingTags) ? livingTags : ["Custom Cabinetry", "Precision Joinery", "TSCA Title VI (Specified)", "Durable Veneers"],
      specNote: tr("catalogue.indoor.capabilities.living.specNote", "TSCA Title VI / CARB Phase 2 compliant panels confirmed upon project requirements")
    },
    {
      id: "upholstered",
      icon: Sofa,
      title: tr("catalogue.indoor.capabilities.upholstered.title", "Upholstered Furniture"),
      image: "/img/readyToWork/2.png",
      imageAlt: tr("catalogue.indoor.capabilities.upholstered.title", "DHT Upholstered Seating, Sofas and Lounge Chairs"),
      desc: tr("catalogue.indoor.capabilities.upholstered.desc", "Sectionals, sofas, armchairs, and cushioned ottomans upholstered in contract-grade fabrics. Configurable to meet international flammability requirements (including CA TB117 / BS 5852) upon project specification and destination market testing compliance."),
      tags: Array.isArray(upholsteredTags) ? upholsteredTags : ["High-Resilience Foam", "Contract Upholstery", "Hardwood Frames", "Flammability Tested on Request"],
      specNote: tr("catalogue.indoor.capabilities.upholstered.specNote", "CA TB117 / BS 5852 flammability testing confirmed per order specification")
    },
    {
      id: "hospitality",
      icon: Hotel,
      title: tr("catalogue.indoor.capabilities.hospitality.title", "Hospitality & Commercial Projects"),
      image: "/img/WhoWeAre1.png",
      imageAlt: tr("catalogue.indoor.capabilities.hospitality.title", "DHT Hospitality and Commercial Turnkey Project Casegoods"),
      desc: tr("catalogue.indoor.capabilities.hospitality.desc", "Comprehensive casegoods, architectural joinery packages, and bespoke loose furniture tailored for hotels, serviced apartments, resorts, and restaurants built directly from architectural CAD drawings."),
      tags: Array.isArray(hospitalityTags) ? hospitalityTags : ["Architectural Joinery", "High-Traffic Specs", "CAD Value Engineering", "Knock-Down / Fully Assembled"],
      specNote: tr("catalogue.indoor.capabilities.hospitality.specNote", "Built to architectural submittals & shop drawings with mock-up room verification")
    }
  ];

  return (
    <>
      <SEO
        title={tr("catalogue.indoor.seo.title", "Indoor & Project Furniture Manufacturing | DHT Furniture Vietnam")}
        description={tr("catalogue.indoor.seo.description", "Discover DHT Furniture Vietnam's capabilities in manufacturing solid wood, upholstered, and mixed-material furniture for residential, hospitality, and commercial programmes.")}
        canonical="https://dhtcompany.com/catalogue/indoor"
        image="/img/category/chairs.png"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: tr("catalogue.indoor.breadcrumbs.home", "Home"), item: "https://dhtcompany.com" },
            { "@type": "ListItem", position: 2, name: tr("catalogue.indoor.breadcrumbs.indoor", "Indoor & Projects"), item: "https://dhtcompany.com/catalogue/indoor" }
          ]
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* HERO */}
        <section className="container mx-auto px-6 py-10 text-center max-w-4xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded">
            {tr("catalogue.indoor.hero.badge", "Contract & OEM Manufacturing")}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            {tr("catalogue.indoor.hero.title", "Indoor & Project Furniture")}
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed">
            {tr("catalogue.indoor.hero.description", "DHT supports solid-wood, engineered-wood, upholstered, and mixed-material furniture for residential, hospitality, and commercial programmes through specialised facilities within our family-owned group.")}
          </p>
        </section>

        {/* 4 CORE CAPABILITIES WITH AUTHENTIC PHOTOGRAPHY */}
        <section className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:border-[#B97846]/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Capability Photography */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={cap.image}
                        alt={cap.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={cap.id === "dining"}
                      />
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm text-[#173C2C] flex items-center justify-center shadow-sm">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <h3 className="text-xl font-bold text-[#173C2C] mb-2.5">{cap.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{cap.desc}</p>
                      
                      <p className="text-xs text-[#B97846] font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B97846]" />
                        {cap.specNote}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      {cap.tags.map(tag => (
                        <span key={tag} className="text-[11px] bg-[#F3EFE7] text-[#173C2C] px-2.5 py-1 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TECHNICAL ADAPTATION & VALUE ENGINEERING BANNER */}
        <section className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold text-[#B97846] uppercase tracking-wider block mb-2">
                  {tr("catalogue.indoor.development.badge", "Tailored To Your Specifications • Commercial Terms")}
                </span>
                <h3 className="text-2xl font-bold text-[#173C2C] mb-4">
                  {tr("catalogue.indoor.development.title", "Custom Development, Sampling & Value Engineering")}
                </h3>

                {/* EXACT MANDATED SPECIFICATION CLAUSE (GUIDE INDOOR TR.26) */}
                <div className="p-4 bg-[#F8F6F0] rounded-xl border border-black/5 mb-6 text-sm text-[#1F2723]/90 leading-relaxed font-serif italic">
                  &ldquo;{tr("catalogue.indoor.development.mandate", "Product adaptation, material selection, value engineering and packaging development are reviewed according to the project brief and intended use. Sampling, production timing and applicable testing are confirmed for the agreed specification.")}&rdquo;
                </div>

                {/* OFFICIAL LEAD TIMES & COMMERCIAL CONDITIONS (DHT PROFILE 2026) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173C2C]">{tr("catalogue.indoor.development.terms.sampleTitle", "Sample Prototyping: ")} </span>
                      <span>{tr("catalogue.indoor.development.terms.sampleValue", "Typical 7–14 days")} <span className="text-gray-500">{tr("catalogue.indoor.development.terms.sampleCondition", "(post-drawing & material confirmation)")}</span></span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173C2C]">{tr("catalogue.indoor.development.terms.orderTitle", "New Order Production: ")} </span>
                      <span>{tr("catalogue.indoor.development.terms.orderValue", "Typical 60–90 days")} <span className="text-gray-500">{tr("catalogue.indoor.development.terms.orderCondition", "(depending on testing & programme scope)")}</span></span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173C2C]">{tr("catalogue.indoor.development.terms.repeatTitle", "Repeat Order Runs: ")} </span>
                      <span>{tr("catalogue.indoor.development.terms.repeatValue", "Typical 45–60 days")} <span className="text-gray-500">{tr("catalogue.indoor.development.terms.repeatCondition", "(for established collection programmes)")}</span></span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173C2C]">{tr("catalogue.indoor.development.terms.fscTitle", "FSC Sourcing: ")} </span>
                      <span>{tr("catalogue.indoor.development.terms.fscValue", "All wood used in DHT furniture is FSC-certified")}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173C2C]">{tr("catalogue.indoor.development.terms.containerTitle", "Container Loading: ")} </span>
                      <span>{tr("catalogue.indoor.development.terms.containerValue", "Flexible mixed-container loading across collection items")}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B97846] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173C2C]">{tr("catalogue.indoor.development.terms.packagingTitle", "Packaging Options: ")} </span>
                      <span>{tr("catalogue.indoor.development.terms.packagingValue", "Flat-pack (KD) or fully assembled with drop-tested carton engineering")}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mt-5 pt-3 border-t border-gray-100 leading-relaxed">
                  {tr("catalogue.indoor.development.conditionsNote", "* Conditions & Starting Point: Production lead times commence upon receipt of confirmed commercial deposit, approved shop drawings, and finalized material swatches. Testing schedules and specific laboratory verifications (e.g., CA TB117, BS 5852, TSCA Title VI, or ISTA packaging standards) are formally confirmed per project specification and destination market dossier.")}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact?type=project"
                  className="w-full text-center py-3.5 px-6 rounded-xl bg-[#173C2C] text-white text-sm font-semibold hover:bg-[#173C2C]/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {tr("catalogue.indoor.development.ctaDiscuss", "Discuss Your Indoor or Project Requirements")} <ArrowRight size={16} />
                </Link>
                <Link
                  href="/manufacturing"
                  className="w-full text-center py-3 px-6 rounded-xl border border-[#173C2C]/30 text-[#173C2C] text-sm font-medium hover:bg-[#173C2C]/5 transition-all"
                >
                  {tr("catalogue.indoor.development.ctaFacilities", "View Facilities Network")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-8 text-center max-w-3xl">
          <div className="bg-[#173C2C] text-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">{tr("catalogue.indoor.bottomCta.title", "Looking for Outdoor Collections?")}</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {tr("catalogue.indoor.bottomCta.description", "Explore our extensive range of outdoor dining, lounge, sunlounger, and modular furniture crafted in FSC timber, powder-coated aluminium, and all-weather ropes.")}
            </p>
            <Link
              href="/catalogue/outdoor"
              className="inline-flex items-center gap-2 bg-[#B97846] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#B97846]/90 transition-all shadow-sm"
            >
              {tr("catalogue.indoor.bottomCta.button", "Explore Outdoor Collections")} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
