import Link from "next/link";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { CheckCircle2, Shield, FileText, Award, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QualityCompliancePage() {
  const { t } = useTranslation();

  const qcSteps = [
    {
      num: "01",
      title: "Incoming Material & Component Checks",
      desc: "Moisture testing (8-12% kiln-dried timber), aluminium wall thickness, fabric density and foam resilience validation before production release."
    },
    {
      num: "02",
      title: "In-Line Production Inspections",
      desc: "Verification of joinery tolerances, mortise and tenon joints, robotic and manual weld penetration, and structural rigidity across active assembly lines."
    },
    {
      num: "03",
      title: "Pre-Packing & Surface Finishing Checks",
      desc: "Inspection of powder-coating adhesion, wood protective finishes, stainless steel hardware and trial set assembly before boxing."
    },
    {
      num: "04",
      title: "Final Random Inspection to Agreed AQL",
      desc: "Statistically rigorous sampling to international AQL standards (Major 1.5-2.5, Minor 4.0, Critical 0) before release for container packing."
    },
    {
      num: "05",
      title: "Packaging, Labelling & Container Loading",
      desc: "ISTA drop-test verification, barcode validation, carton burst strength and strategic dunnage placement during container stuffing."
    },
    {
      num: "06",
      title: "Corrective Action & Traceability Follow-up",
      desc: "Complete batch documentation and continuous manufacturing process improvements for every production programme."
    },
  ];

  return (
    <>
      <SEO
        title="Quality Control & International Compliance | DHT Furniture Vietnam"
        description="Discover DHT's comprehensive 6-step quality control system, FSC-certified timber supply chain, and international compliance for EU, UK, US, and Australian markets."
        canonical="https://dhtcompany.com/quality-compliance"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            { "@type": "ListItem", position: 2, name: "Quality & Compliance", item: "https://dhtcompany.com/quality-compliance" }
          ]
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* HERO */}
        <section className="container mx-auto px-6 py-10 text-center max-w-4xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded">
            Rigorous Standards
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            Quality Control & International Compliance
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed">
            From raw material testing to container-loading sign-off, DHT operates systematic quality controls and site-specific audit documentation to meet the commercial standards of leading global retailers.
          </p>
        </section>

        {/* 6-STEP QC PROCESS */}
        <section className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#173C2C]">Our 6-Step Quality Control Workflow</h2>
            <p className="text-xs text-gray-500 mt-1">Systematic quality gates embedded across every stage of manufacturing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qcSteps.map((step) => (
              <div key={step.num} className="bg-white p-6 rounded-xl shadow-sm border border-black/5 relative hover:border-[#B97846]/30 transition-all">
                <span className="text-3xl font-extrabold text-[#B97846]/25 absolute top-4 right-4">{step.num}</span>
                <h3 className="text-base font-bold text-[#173C2C] mb-2 pr-8">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MARKET COMPLIANCE ACCORDIONS */}
        <section className="container mx-auto px-6 py-10 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#173C2C]">Testing & Compliance for Your Market</h2>
            <p className="text-xs text-gray-500 mt-1">Alignment with major regional safety, environmental, and durability regulations</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <Shield size={20} className="text-[#B97846]" /> European Union & United Kingdom
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li><strong>EN 581 Compliance:</strong> Structural safety, durability, and shear-point testing for domestic and contract outdoor furniture.</li>
                <li><strong>REACH Regulation:</strong> Strict limits on heavy metals, phthalates, and restricted chemical substances in surface coatings and textiles.</li>
                <li><strong>EUDR & Phytosanitary:</strong> Fully documented supply chain tracing and fumigation certification verifying legal, deforestation-free timber.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <FileText size={20} className="text-[#B97846]" /> United States & Canada
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li><strong>Tip-over Restraint Standards:</strong> ASTM safety compliance for tall storage, dressers, and shelving units.</li>
                <li><strong>ISTA Packaging Standards:</strong> ISTA 1A / 3A drop, vibration, and compression testing for mail-order and retail flat-packs.</li>
                <li><strong>TSCA Title VI:</strong> Formaldehyde emissions compliance for all composite and engineered-wood panels.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <Award size={20} className="text-[#B97846]" /> Australia & New Zealand
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li><strong>BMSB Biosecurity Compliance:</strong> Mandatory seasonal offshore heat or chemical treatment for Brown Marmorated Stink Bug.</li>
                <li><strong>High UV & Tropical Durability:</strong> Accelerated weathering tests for high-index UV ropes, synthetic wicker, and outdoor fabrics.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* QUALITY PERFORMANCE METRICS & WARRANTY (Q04) */}
        <section className="container mx-auto px-6 py-10 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#173C2C]">Quality Performance Metrics & Warranty</h2>
            <p className="text-xs text-gray-500 mt-1">Operational benchmarks and commercial warranty protection for international programmes</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <span className="text-3xl font-extrabold text-[#173C2C]">~95%</span>
              <h4 className="text-sm font-bold text-[#B97846] mt-2 mb-1">On-Time In-Full (OTIF)</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Reference performance across confirmed annual retail commitments</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <span className="text-3xl font-extrabold text-[#173C2C]">~92%</span>
              <h4 className="text-sm font-bold text-[#B97846] mt-2 mb-1">First-Time Pass Rate</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Rigorous pre-packing QA inspection and AQL compliance gate</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <span className="text-3xl font-extrabold text-[#173C2C]">12 Staff</span>
              <h4 className="text-sm font-bold text-[#B97846] mt-2 mb-1">Dedicated QA/QC Team</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Full-time inspectors embedded across Central, Southern and Northern clusters</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <span className="text-3xl font-extrabold text-[#173C2C]">2 / 5 Yrs</span>
              <h4 className="text-sm font-bold text-[#B97846] mt-2 mb-1">Commercial Warranty</h4>
              <p className="text-xs text-gray-500 leading-relaxed">2-year finish & fabric warranty, 5-year structural frame guarantee</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 italic max-w-2xl mx-auto">
            Note: Performance metrics and warranty terms are reference parameters confirmed according to buyer specifications, programme scope, and intended commercial or residential use.
          </p>
        </section>

        {/* SUSTAINABILITY & RESOURCE EFFICIENCY (SLIDE 20) */}
        <section className="container mx-auto px-6 py-10 max-w-5xl">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider text-[#173C2C] bg-[#173C2C]/10 rounded">
              Responsible Manufacturing
            </span>
            <h2 className="text-2xl font-bold text-[#173C2C]">Sustainability & Resource Efficiency</h2>
            <p className="text-xs text-gray-500 mt-1">Traceable materials, high cutting yields, and circular biomass energy management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-[#173C2C] mb-2">100% Timber Traceability</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every log and plank is tracked from certified FSC forest concessions through kiln-drying to final packaging, guaranteeing legal timber origin and zero deforestation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-[#173C2C] mb-2">Cutting Yield & Biomass Recovery</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Computer-aided timber cutting achieves up to 82% recovery. 100% of solid wood offcuts and clean sawdust are converted into finger-joint furniture components or boiler biomass fuel.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-[#173C2C] mb-2">Clean Finishing & Recyclable Packaging</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Powder coating booths feature cyclone powder reclamation to minimize waste. All export cartons use recyclable corrugated cardboard and dunnage complying with international eco-directives.
              </p>
            </div>
          </div>
        </section>

        {/* AUDITS & CERTIFICATION NOTE */}
        <section className="container mx-auto px-6 py-8 text-center max-w-3xl">
          <div className="bg-[#173C2C] text-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">Site-Specific Audits & Chain of Custody</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Certifications including FSC CoC, ISO 9001, ISO 14001, BSCI, and SMETA are site-specific. Documented audit reports and valid scopes for the nominated production facility are provided directly to qualified buyers during programme onboarding.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=compliance"
                className="inline-flex items-center gap-2 bg-[#B97846] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#B97846]/90 transition-all shadow-sm"
              >
                Request Compliance Dossier <ArrowRight size={16} />
              </Link>
              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded text-sm font-semibold hover:bg-white/10 transition-all"
              >
                View 11 Production Facilities
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
