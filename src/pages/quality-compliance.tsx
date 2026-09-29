import Link from "next/link";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { 
  Shield, 
  FileText, 
  Award, 
  ArrowRight, 
  Activity, 
  Calendar, 
  MapPin, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  FileCheck,
  Ship,
  Leaf,
  TreePine,
  Layers,
  Box,
  Flame,
  Trash,
  FileSpreadsheet
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function QualityCompliancePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const lng = router.locale;

  const tr = (key: string, defaultVal: string) => t(key, { defaultValue: defaultVal, lng });

  const qcSteps = [
    {
      num: "01",
      title: tr("quality.workflow.steps.01.title", "Incoming Material & Component Checks"),
      desc: tr("quality.workflow.steps.01.desc", "Moisture target verification (typically 8–12% for kiln-dried timber, calibrated to destination climate and technical spec), aluminium wall thickness, fabric density, and foam resilience validated against approved programme criteria before release into production.")
    },
    {
      num: "02",
      title: tr("quality.workflow.steps.02.title", "In-Line Production Inspections"),
      desc: tr("quality.workflow.steps.02.desc", "Verification of joinery tolerances, mortise and tenon joints, robotic and manual weld penetration, and structural rigidity across active assembly lines.")
    },
    {
      num: "03",
      title: tr("quality.workflow.steps.03.title", "Pre-Packing & Surface Finishing Checks"),
      desc: tr("quality.workflow.steps.03.desc", "Inspection of powder-coating adhesion, wood protective finishes, stainless steel hardware and trial set assembly before boxing.")
    },
    {
      num: "04",
      title: tr("quality.workflow.steps.04.title", "Final Random Inspection to Agreed AQL"),
      desc: tr("quality.workflow.steps.04.desc", "Statistically rigorous lot sampling conducted to client-agreed AQL thresholds (such as Major 1.5–2.5, Minor 4.0, Critical 0 where specified in contract programme) prior to export container release.")
    },
    {
      num: "05",
      title: tr("quality.workflow.steps.05.title", "Packaging, Labelling & Container Loading"),
      desc: tr("quality.workflow.steps.05.desc", "ISTA drop and vibration testing protocols (conducted where specified for mail-order / retail programmes), barcode verification, carton burst strength, and container dunnage placement.")
    },
    {
      num: "06",
      title: tr("quality.workflow.steps.06.title", "Corrective Action & Traceability Follow-up"),
      desc: tr("quality.workflow.steps.06.desc", "Complete batch documentation and continuous manufacturing process improvements for every production programme.")
    },
  ];

  const kpis = [
    {
      id: "otif",
      value: tr("quality.metrics.kpis.0.value", "~95%"),
      title: tr("quality.metrics.kpis.0.title", "On-Time In-Full (OTIF)"),
      definition: tr(
        "quality.metrics.kpis.0.definition",
        "Percentage of confirmed purchase order volume dispatched on schedule and complete in full without split shipments or quantity shortages."
      ),
      scope: tr(
        "quality.metrics.kpis.0.scope",
        "Nominated export retail programmes at primary furniture manufacturing facilities (Facilities 01–05)."
      ),
      period: tr(
        "quality.metrics.kpis.0.period",
        "Annual operational review cycle (2025–2026 Reference Period)."
      )
    },
    {
      id: "ftpr",
      value: tr("quality.metrics.kpis.1.value", "~92%"),
      title: tr("quality.metrics.kpis.1.title", "First-Time Pass Rate (FTPR)"),
      definition: tr(
        "quality.metrics.kpis.1.definition",
        "Percentage of production lots passing internal QA inspection at pre-packing gate without requiring rework prior to final AQL client audit."
      ),
      scope: tr(
        "quality.metrics.kpis.1.scope",
        "Finished furniture production lines at nominated export facilities (Facilities 01–05)."
      ),
      period: tr(
        "quality.metrics.kpis.1.period",
        "Rolling 12-month production baseline."
      )
    },
    {
      id: "qa-team",
      value: tr("quality.metrics.kpis.2.value", "12 Staff"),
      title: tr("quality.metrics.kpis.2.title", "Dedicated QA/QC Team"),
      definition: tr(
        "quality.metrics.kpis.2.definition",
        "Full-time inspection personnel managing incoming timber grading, in-line assembly tolerances, surface coating adhesion, and pre-shipment gates."
      ),
      scope: tr(
        "quality.metrics.kpis.2.scope",
        "Dedicated to Southern & Central furniture export facilities (Facilities 01–05); does not encompass all 11 group processing sites."
      ),
      period: tr(
        "quality.metrics.kpis.2.period",
        "Active operational roster (2026 Deployment)."
      )
    }
  ];

  const sustainabilityPillars = [
    {
      id: "traceability",
      image: "/img/materials/AcaciaWood1.png",
      tag: tr("quality.sustainability.pillars.traceability.tag", "Chain of Custody"),
      title: tr("quality.sustainability.pillars.traceability.title", "Legal Timber Origin & Material Traceability"),
      metric: tr("quality.sustainability.pillars.traceability.metric", "FSC-Certified Wood (All Furniture Timber)"),
      desc: tr(
        "quality.sustainability.pillars.traceability.desc",
        "All natural timber used in DHT furniture is FSC-certified. Supporting documentation is maintained for the applicable FSC claim. Every lumber batch is verified against legal harvesting concession permits, transport waybills, and kiln-drying batch logs, ensuring full chain of custody and zero undocumented timber input."
      ),
      evidence: tr("quality.sustainability.pillars.traceability.evidence", "Site-specific FSC CoC scope & Certified Timber Manifests")
    },
    {
      id: "cuttingYield",
      image: "/img/WhoWeAre2.png",
      tag: tr("quality.sustainability.pillars.cuttingYield.tag", "Material Yield & Biomass Energy"),
      title: tr("quality.sustainability.pillars.cuttingYield.title", "Cutting Yield Optimization & Circular Biomass"),
      metric: tr("quality.sustainability.pillars.cuttingYield.metric", "75%–82% Typical Recovery & 100% Solid Residue Repurposing"),
      desc: tr(
        "quality.sustainability.pillars.cuttingYield.desc",
        "Computer-aided nesting and gang-rip optimization achieve typical cutting yields of 75%–82% based on lumber grade and component specs. Solid hardwood offcuts are reclaimed for finger-joint furniture components, while clean sawdust and shavings fuel on-site biomass steam boilers for timber drying kilns."
      ),
      evidence: tr("quality.sustainability.pillars.cuttingYield.evidence", "ERP Material Requisitions & Boiler Fuel Logbooks")
    },
    {
      id: "finishingWaste",
      image: "/img/materials/Powder-CoatedAluminum1.png",
      tag: tr("quality.sustainability.pillars.finishingWaste.tag", "Finishing Reclamation & Waste Stewardship"),
      title: tr("quality.sustainability.pillars.finishingWaste.title", "Powder Reclamation & Compliant Waste Handling"),
      metric: tr("quality.sustainability.pillars.finishingWaste.metric", "Cyclone Powder Recovery & 100% Manifested Transfer"),
      desc: tr(
        "quality.sustainability.pillars.finishingWaste.desc",
        "Powder coating lines utilize cyclone reclamation booths to capture overspray powder and minimize chemical waste. Export packaging uses recyclable corrugated cartons meeting specified burst tests. Finishing effluents and hazardous wastes are transferred exclusively via licensed industrial waste management contractors."
      ),
      evidence: tr("quality.sustainability.pillars.finishingWaste.evidence", "Coating Powder Logs & Licensed Waste Disposal Manifests")
    }
  ];

  const sustainabilityMatrix = [
    {
      id: "traceability",
      activity: tr("quality.sustainability.matrix.items.0.activity", "Timber Sourcing & Traceability"),
      icon: TreePine,
      practice: tr(
        "quality.sustainability.matrix.items.0.practice",
        "100% of timber inputs are FSC-certified; complete chain of custody maintained from certified plantation concession through primary breakdown and kiln-drying."
      ),
      scope: tr(
        "quality.sustainability.matrix.items.0.scope",
        "All wood furniture production lines at nominated facilities (Binh Duong, Quy Nhon, Dong Nai clusters)."
      ),
      source: tr(
        "quality.sustainability.matrix.items.0.source",
        "Facility FSC CoC Certificate, VAT Purchase Invoices, Forest Department Transport Manifests, and Kiln Batch Logs."
      )
    },
    {
      id: "yield",
      activity: tr("quality.sustainability.matrix.items.1.activity", "Cutting Yield Optimization"),
      icon: Layers,
      practice: tr(
        "quality.sustainability.matrix.items.1.practice",
        "Computer-aided nesting and precision gang-ripping yielding 75%–82% recovery baseline depending on lumber grade, moisture profile, and component geometry."
      ),
      scope: tr(
        "quality.sustainability.matrix.items.1.scope",
        "Primary breakdown and rough mill workshops handling solid timber (Acacia, Eucalyptus, Teak)."
      ),
      source: tr(
        "quality.sustainability.matrix.items.1.source",
        "Technical Bill of Materials (BOM), Shift Yield Performance Logs, and ERP Material Utilization Summaries."
      )
    },
    {
      id: "offcuts",
      activity: tr("quality.sustainability.matrix.items.2.activity", "Solid Wood Offcuts Repurposing"),
      icon: Box,
      practice: tr(
        "quality.sustainability.matrix.items.2.practice",
        "Clean hardwood offcuts sorted by dimension, planed 4-sides, and fed into finger-jointing lines or edge-glued blocks for concealed structural components."
      ),
      scope: tr(
        "quality.sustainability.matrix.items.2.scope",
        "Secondary conversion lines at designated timber processing and auxiliary component facilities."
      ),
      source: tr(
        "quality.sustainability.matrix.items.2.source",
        "Semi-finished lumber sorting SOP and Finger-joint Work Orders."
      )
    },
    {
      id: "sawdust",
      activity: tr("quality.sustainability.matrix.items.3.activity", "Sawdust & Biomass Energy"),
      icon: Flame,
      practice: tr(
        "quality.sustainability.matrix.items.3.practice",
        "100% of clean sawdust and wood shavings captured via central dust extraction cyclones and utilized on-site as carbon-neutral biomass fuel for kiln boilers."
      ),
      scope: tr(
        "quality.sustainability.matrix.items.3.scope",
        "Central dust collection systems and boiler facilities at designated primary wood processing sites."
      ),
      source: tr(
        "quality.sustainability.matrix.items.3.source",
        "Boiler Fuel Feed Logbooks, Kiln Steam Generation Records, and Industrial Boiler Safety Permits."
      )
    },
    {
      id: "recycling",
      activity: tr("quality.sustainability.matrix.items.4.activity", "Powder Coating & Packaging Recycling"),
      icon: Leaf,
      practice: tr(
        "quality.sustainability.matrix.items.4.practice",
        "Cyclone recovery booths recycle clean powder overspray; export shipping cartons utilize 5-ply / 7-ply recyclable corrugated board compliant with buyer ECT standards."
      ),
      scope: tr(
        "quality.sustainability.matrix.items.4.scope",
        "Metal finishing workshops and export packing lines for contracted programme orders."
      ),
      source: tr(
        "quality.sustainability.matrix.items.4.source",
        "Powder Coating Technical Datasheets, Packaging Material Inspection Reports, and Box Compression Certificates."
      )
    },
    {
      id: "waste",
      activity: tr("quality.sustainability.matrix.items.5.activity", "Industrial Waste & Hazardous Handling"),
      icon: Trash,
      practice: tr(
        "quality.sustainability.matrix.items.5.practice",
        "Hazardous process wastes (paint sludge, oily shop rags, spent solvent drums) stored in dedicated bunded hazardous stores and transferred by licensed contractors."
      ),
      scope: tr(
        "quality.sustainability.matrix.items.5.scope",
        "Designated hazardous waste storage facilities across active manufacturing sites."
      ),
      source: tr(
        "quality.sustainability.matrix.items.5.source",
        "Hazardous Waste Source Registration, Environmental Monitoring Reports, and Licensed Waste Transfer Manifests."
      )
    }
  ];

  return (
    <>
      <SEO
        title={tr("quality.seo.title", "Quality Control & International Compliance | DHT Furniture Vietnam")}
        description={tr(
          "quality.seo.description",
          "Discover DHT's comprehensive 6-step quality control system, FSC-certified timber supply chain, and international compliance for EU, UK, US, and Australian markets."
        )}
        canonical="https://dhtcompany.com/quality-compliance"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: tr("nav.home", "Home"), item: "https://dhtcompany.com" },
            { "@type": "ListItem", position: 2, name: tr("nav.qualityCompliance", "Quality & Compliance"), item: "https://dhtcompany.com/quality-compliance" }
          ]
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* HERO */}
        <section className="container mx-auto px-6 py-10 text-center max-w-4xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded">
            {tr("quality.hero.badge", "Rigorous Standards")}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            {tr("quality.hero.title", "Quality Control & International Compliance")}
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed">
            {tr(
              "quality.hero.description",
              "From raw material testing to container-loading sign-off, DHT operates systematic quality controls and site-specific audit documentation to meet the commercial standards of leading global retailers."
            )}
          </p>
        </section>

        {/* 6-STEP QC PROCESS */}
        <section className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#173C2C]">
              {tr("quality.workflow.title", "Our 6-Step Quality Control Workflow")}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {tr("quality.workflow.subtitle", "Systematic quality gates embedded across every stage of manufacturing")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qcSteps.map((step) => (
              <div 
                key={step.num} 
                className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:border-[#B97846]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded-md">
                      {tr("quality.workflow.gate", "Gate")} {step.num}
                    </span>
                    <CheckCircle2 size={16} className="text-[#173C2C]/30" />
                  </div>
                  <h3 className="text-base font-bold text-[#173C2C] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MARKET COMPLIANCE ACCORDIONS (Guide Q03 / Audit Issue 13) */}
        <section className="container mx-auto px-6 py-10 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C]">
              {tr("quality.markets.title", "Testing & Compliance for Your Market")}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1.5">
              {tr("quality.markets.subtitle", "Procedural alignment with international safety, environmental, and durability regulations")}
            </p>
          </div>

          {/* MANDATORY OPENING COPY (Guide Q03) */}
          <div className="bg-[#173C2C]/5 border border-[#173C2C]/15 rounded-xl p-5 md:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#173C2C]/10 flex items-center justify-center shrink-0 text-[#173C2C]">
              <FileText size={20} />
            </div>
            <p className="text-sm md:text-base text-[#173C2C] font-medium leading-relaxed">
              {tr(
                "quality.markets.intro",
                "Timber traceability, material documentation, product safety testing and packaging requirements are reviewed according to the destination market, product construction and buyer specification. Relevant third-party testing is arranged where required."
              )}
            </p>
          </div>
          
          <div className="space-y-4">
            {/* 1. EU & UK */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <Shield size={20} className="text-[#B97846]" /> {tr("quality.markets.eu.title", "European Union & United Kingdom")}
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li>
                  <strong>{tr("quality.markets.eu.items.0.title", "EN 581 Performance Standards (Where specified):")}</strong>{" "}
                  {tr("quality.markets.eu.items.0.desc", "Mechanical safety, structural cycle durability, and stability testing reviewed and coordinated through accredited test bodies for domestic or contract outdoor collections upon programme requirements.")}
                </li>
                <li>
                  <strong>{tr("quality.markets.eu.items.1.title", "REACH Regulation & Chemical Restrictions:")}</strong>{" "}
                  {tr("quality.markets.eu.items.1.desc", "Raw materials, powder coatings, and upholstery fabrics reviewed against SVHC and restricted substance thresholds; accredited lab testing dossiers compiled per purchase order specification.")}
                </li>
                <li>
                  <strong>{tr("quality.markets.eu.items.2.title", "EUDR Due Diligence & Phytosanitary Documentation:")}</strong>{" "}
                  {tr("quality.markets.eu.items.2.desc", "Timber supply chains traced from legally certified concessions with plot-level geolocation data and official treatment certificates reviewed to support importer compliance.")}
                </li>
              </ul>
            </div>

            {/* 2. US & Canada */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <FileText size={20} className="text-[#B97846]" /> {tr("quality.markets.us.title", "United States & Canada")}
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li>
                  <strong>{tr("quality.markets.us.items.0.title", "U.S. Lacey Act Due Diligence:")}</strong>{" "}
                  {tr("quality.markets.us.items.0.desc", "Timber genus, species, and harvest origin documented throughout procurement to facilitate legal wood declaration and importer customs filings.")}
                </li>
                <li>
                  <strong>{tr("quality.markets.us.items.1.title", "ASTM & Safety Guidelines (Where applicable):")}</strong>{" "}
                  {tr("quality.markets.us.items.1.desc", "Structural static/cycle loading and stability requirements (including tip-over restraints for casegoods) evaluated and tested according to intended contract or residential use.")}
                </li>
                <li>
                  <strong>{tr("quality.markets.us.items.2.title", "ISTA Transit Packaging Validation:")}</strong>{" "}
                  {tr("quality.markets.us.items.2.desc", "ISTA 1A, 3A, or 6-Series drop, vibration, and clamp testing arranged with accredited third parties when required for e-commerce, courier, or retail flat-pack distribution.")}
                </li>
                <li>
                  <strong>{tr("quality.markets.us.items.3.title", "TSCA Title VI & CARB Phase 2 Emission Limits:")}</strong>{" "}
                  {tr("quality.markets.us.items.3.desc", "Formaldehyde emission verification and mill certification dossiers gathered for all engineered wood, composite panels, and resin systems utilized in indoor casegoods.")}
                </li>
              </ul>
            </div>

            {/* 3. Australia & New Zealand */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <Award size={20} className="text-[#B97846]" /> {tr("quality.markets.au.title", "Australia & New Zealand")}
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li>
                  <strong>{tr("quality.markets.au.items.0.title", "BMSB Biosecurity Compliance (Seasonal / Targeted):")}</strong>{" "}
                  {tr("quality.markets.au.items.0.desc", "Targeted offshore heat treatment or certified fumigation administered during designated BMSB high-risk seasonal windows in accordance with Australian DAFF / NZ MPI biosecurity directives for eligible high-risk target commodities (not mandatory for every shipment year-round).")}
                </li>
                <li>
                  <strong>{tr("quality.markets.au.items.1.title", "UV & Weathering Durability Testing (Per specification):")}</strong>{" "}
                  {tr("quality.markets.au.items.1.desc", "Accelerated exposure assessments for high-index UV synthetic ropes, PE wicker, and solution-dyed fabrics coordinated against regional climate benchmarks upon buyer request.")}
                </li>
              </ul>
            </div>

            {/* 4. Shipping & Container Loading (Guide Q03) */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#173C2C] mb-2 flex items-center gap-2.5">
                <Ship size={20} className="text-[#B97846]" /> {tr("quality.markets.shipping.title", "Shipping, Container Loading & Port Logistics")}
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 mt-3 list-disc pl-5 leading-relaxed">
                <li>
                  <strong>{tr("quality.markets.shipping.items.0.title", "Container Desiccant & Moisture Management:")}</strong>{" "}
                  {tr("quality.markets.shipping.items.0.desc", "Moisture-barrier lining, industrial desiccants, and container sealing protocols calculated based on transit duration, ocean routing, and seasonal humidity differentials.")}
                </li>
                <li>
                  <strong>{tr("quality.markets.shipping.items.1.title", "Export Phytosanitary & Quarantine Clearance:")}</strong>{" "}
                  {tr("quality.markets.shipping.items.1.desc", "Official phytosanitary treatment certificates, fumigation certificates, and heat treatment markings (ISPM 15 for solid wood packaging) issued and archived for seamless customs release.")}
                </li>
              </ul>
            </div>
          </div>

          {/* TECHNICAL COMPLIANCE GOVERNANCE NOTICE */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 px-2.5 py-0.5 rounded">
                {tr("quality.markets.governance.badge", "Owner: Quality Department")}
              </span>
              <h4 className="text-sm font-bold text-[#173C2C]">
                {tr("quality.markets.governance.title", "Technical Compliance Governance & Scope Ratification")}
              </h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {tr(
                "quality.markets.governance.text",
                "DHT operates as an OEM/ODM and contract manufacturing partner. Compliance testing (such as EN 581, ASTM, ISTA, REACH, and TSCA Title VI) and mandatory import treatments (including seasonal BMSB or phytosanitary fumigation) are reviewed and executed by the DHT Quality Team in collaboration with certified third-party testing laboratories (e.g., SGS, TÜV, Intertek) based on destination country regulations, material bills-of-materials, and ratified buyer specifications. Website disclosures document operational capabilities and procedural readiness, not blanket self-certification for every catalogue item."
              )}
            </p>
          </div>
        </section>

        {/* QUALITY PERFORMANCE METRICS & WARRANTY (Q04 / AUDIT ISSUE 12) */}
        <section className="container mx-auto px-6 py-10 max-w-5xl">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider text-[#173C2C] bg-[#173C2C]/10 rounded">
              {tr("quality.metrics.labels.governanceNotice", "Operational Parameters")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C]">
              {tr("quality.metrics.sectionTitle", "Quality Performance Metrics & Warranty")}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1.5 max-w-2xl mx-auto">
              {tr(
                "quality.metrics.sectionSubtitle",
                "Operational benchmarks and commercial warranty parameters aligned with nominated production programmes and ratified contracts"
              )}
            </p>
          </div>

          {/* 3 STRUCTURED KPI CARDS (Value | Metric definition | Site/programme scope | Measurement period) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {kpis.map((kpi) => (
              <div 
                key={kpi.id} 
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl md:text-4xl font-extrabold text-[#173C2C] tracking-tight">
                      {kpi.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 px-2 py-0.5 rounded">
                      Reference Baseline
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#173C2C] mb-3">
                    {kpi.title}
                  </h3>

                  {/* 1. Metric Definition */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1.5">
                      <Activity size={13} className="text-[#B97846]" /> 
                      {tr("quality.metrics.labels.metricDefinition", "Metric Definition")}
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {kpi.definition}
                    </p>
                  </div>

                  {/* 2. Site / Programme Scope */}
                  <div className="mb-4 bg-[#F3EFE7]/60 rounded-lg p-3 border border-[#173C2C]/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#173C2C] block mb-1 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#B97846]" /> 
                      {tr("quality.metrics.labels.scope", "Site / Programme Scope")}
                    </span>
                    <p className="text-xs text-gray-800 leading-relaxed font-medium">
                      {kpi.scope}
                    </p>
                  </div>
                </div>

                {/* 3. Measurement Period */}
                <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 flex items-center gap-2 mt-auto">
                  <Calendar size={13} className="text-gray-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block">
                      {tr("quality.metrics.labels.measurementPeriod", "Measurement Period")}
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      {kpi.period}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DEDICATED COMMERCIAL WARRANTY PANEL */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded mb-2">
                  {tr("quality.metrics.warranty.badge", "Commercial Policy")}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#173C2C]">
                  {tr("quality.metrics.warranty.title", "Commercial Warranty & Programme Protection")}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-xl">
                  {tr(
                    "quality.metrics.warranty.subtitle",
                    "Approved duration and coverage, subject to published programme terms and individual commercial contract covenants"
                  )}
                </p>
              </div>

              {/* Approved Duration Box */}
              <div className="bg-[#173C2C]/5 border border-[#173C2C]/10 rounded-xl p-4 md:text-right shrink-0">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                  {tr("quality.metrics.labels.approvedDuration", "Approved Duration")}
                </span>
                <span className="text-2xl font-extrabold text-[#173C2C] block mt-0.5">
                  {tr("quality.metrics.warranty.durationValue", "2–5 Years Reference Tier")}
                </span>
                <span className="text-[11px] text-gray-500 italic block mt-1 max-w-xs">
                  {tr(
                    "quality.metrics.warranty.durationNote",
                    "Duration tier and coverage criteria are determined by product category, material construction, and commercial agreement."
                  )}
                </span>
              </div>
            </div>

            {/* 4 Pillars Grid (Coverage, Conditions, Exclusions, Programme Terms) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Covered Scope */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#173C2C] flex items-center gap-1.5 mb-2">
                  <Shield size={15} className="text-emerald-700 shrink-0" />
                  {tr("quality.metrics.warranty.coverage.label", "Covered Scope")}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {tr(
                    "quality.metrics.warranty.coverage.text",
                    "Structural frame integrity, joint rigidity, mortise-and-tenon stability, and manufacturing workmanship defects occurring under intended use."
                  )}
                </p>
              </div>

              {/* 2. Operating Conditions */}
              <div className="bg-amber-50/40 border border-amber-100 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#173C2C] flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={15} className="text-[#B97846] shrink-0" />
                  {tr("quality.metrics.warranty.conditions.label", "Operating Conditions")}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {tr(
                    "quality.metrics.warranty.conditions.text",
                    "Furniture installed, operated, and maintained in accordance with DHT technical guidelines within designated indoor, sheltered patio, or specified commercial environments."
                  )}
                </p>
              </div>

              {/* 3. Exclusions */}
              <div className="bg-rose-50/30 border border-rose-100 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-2">
                  <AlertCircle size={15} className="text-rose-600 shrink-0" />
                  {tr("quality.metrics.warranty.exclusions.label", "Exclusions & Exceptions")}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {tr(
                    "quality.metrics.warranty.exclusions.text",
                    "Normal weathering, natural timber hairline checks/movement, organic surface patina, harsh chemical cleaning abuse, improper winter storage, accidental impact, or unauthorized structural modifications."
                  )}
                </p>
              </div>

              {/* 4. Programme Terms */}
              <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#173C2C] flex items-center gap-1.5 mb-2">
                  <FileCheck size={15} className="text-blue-700 shrink-0" />
                  {tr("quality.metrics.warranty.programmeTerms.label", "Programme Terms & Contract Specifics")}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {tr(
                    "quality.metrics.warranty.programmeTerms.text",
                    "Exact warranty durations, defect tolerance thresholds, spare parts provision, and credit/replacement remedies are defined in the individual Purchase Agreement and approved technical specifications for each buyer programme."
                  )}
                </p>
              </div>
            </div>

            {/* Governance Callout */}
            <div className="mt-6 bg-[#173C2C]/5 border border-[#173C2C]/15 rounded-lg p-4 flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
              <Info size={16} className="text-[#173C2C] shrink-0 mt-0.5" />
              <p>
                {tr(
                  "quality.metrics.note",
                  "Governance & Quality Sign-Off: Operational metrics (~95% OTIF, ~92% FTPR, 12 QA/QC Staff) and reference warranty terms (2–5 years) represent verified operational baselines ratified by DHT Quality Management and COO approval for nominated facilities. Website disclosures do not supersede, alter, or unilaterally expand contractual warranty terms in ratified commercial agreements."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY & RESOURCE EFFICIENCY */}
        <section className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider text-[#173C2C] bg-[#173C2C]/10 rounded">
              {tr("quality.sustainability.badge", "Responsible Manufacturing")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C]">
              {tr("quality.sustainability.title", "Sustainability & Resource Efficiency")}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
              {tr(
                "quality.sustainability.subtitle",
                "Documented timber sourcing, material-use efficiency, and verified waste-handling practices across nominated facilities"
              )}
            </p>
          </div>

          {/* Mandatory Opening Policy Card */}
          <div className="bg-[#F3EFE7]/80 border-2 border-[#173C2C]/20 rounded-xl p-6 md:p-8 mb-10 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#173C2C] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Leaf size={24} className="text-[#B97846]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#173C2C] bg-[#173C2C]/10 px-2 py-0.5 rounded">
                    {tr("quality.sustainability.statement.label", "Programme Boundary & Due Diligence Standard")}
                  </span>
                </div>
                <p className="text-sm md:text-base font-semibold text-[#173C2C] leading-relaxed">
                  {tr(
                    "quality.sustainability.statement.text",
                    "DHT coordinates documented timber sourcing, material-use efficiency and waste-handling practices with the nominated production facility. Programme-specific records are reviewed as part of production planning and buyer qualification."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* 3 Core Practice Pillars with Authentic Factory Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {sustainabilityPillars.map((pillar) => (
              <div 
                key={pillar.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
              >
                {/* Photo Header */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    {pillar.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <span className="text-[11px] font-extrabold text-[#B97846] block uppercase tracking-wider">
                        {pillar.metric}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#173C2C] mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Verification Evidence Footnote */}
                  <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] text-gray-500">
                    <FileCheck size={14} className="text-[#173C2C] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-700">{tr("quality.sustainability.matrix.columns.source", "Source Dossier")}:</strong> {pillar.evidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Criteria: Structured Source & Verification Matrix Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-[#F3EFE7]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#173C2C] bg-[#173C2C]/10 rounded mb-1.5">
                  {tr("quality.sustainability.matrix.badge", "Verification & Evidence Matrix")}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-[#173C2C]">
                  {tr("quality.sustainability.matrix.title", "Sustainability Claims & Source Verification Matrix")}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {tr(
                    "quality.sustainability.matrix.subtitle",
                    "Comprehensive breakdown of the 6 sustainability activities, operational baselines, facility scopes, and verification source dossiers"
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#173C2C] bg-white px-3 py-1.5 rounded-lg border border-gray-200 self-start md:self-auto shrink-0 shadow-2xs">
                <FileSpreadsheet size={15} className="text-[#B97846]" />
                <span>6 Audited Activities</span>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 w-[22%]">{tr("quality.sustainability.matrix.columns.activity", "Activity / Pillar")}</th>
                    <th className="py-3 px-4 w-[32%]">{tr("quality.sustainability.matrix.columns.practice", "Operational Practice & Metric")}</th>
                    <th className="py-3 px-4 w-[22%]">{tr("quality.sustainability.matrix.columns.scope", "Facility & Programme Scope")}</th>
                    <th className="py-3 px-4 w-[24%]">{tr("quality.sustainability.matrix.columns.source", "Source Dossier & Audit Căn Cứ")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sustainabilityMatrix.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-[#F3EFE7]/30 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/30' : ''}`}
                      >
                        <td className="py-3.5 px-4 font-bold text-[#173C2C] align-top">
                          <div className="flex items-start gap-2">
                            <span className="p-1 rounded bg-[#173C2C]/5 text-[#173C2C] mt-0.5 shrink-0">
                              <IconComp size={14} />
                            </span>
                            <span className="leading-tight mt-0.5">{item.activity}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-700 leading-relaxed align-top">
                          {item.practice}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 leading-relaxed align-top">
                          <span className="bg-[#173C2C]/5 px-2 py-0.5 rounded text-[11px] font-medium text-gray-800 block">
                            {item.scope}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 leading-relaxed align-top">
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] font-medium text-gray-800">{item.source}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards View */}
            <div className="lg:hidden divide-y divide-gray-100">
              {sustainabilityMatrix.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.id} className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-[#173C2C]/10 text-[#173C2C] shrink-0">
                        <IconComp size={16} />
                      </span>
                      <h4 className="text-sm font-bold text-[#173C2C]">
                        {item.activity}
                      </h4>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        {tr("quality.sustainability.matrix.columns.practice", "Operational Practice & Metric")}
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {item.practice}
                      </p>
                    </div>

                    <div className="bg-[#F3EFE7]/50 rounded-lg p-2.5 border border-[#173C2C]/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#173C2C] block mb-1">
                        {tr("quality.sustainability.matrix.columns.scope", "Facility & Programme Scope")}
                      </span>
                      <p className="text-xs text-gray-800 font-medium">
                        {item.scope}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                          {tr("quality.sustainability.matrix.columns.source", "Source Dossier")}
                        </span>
                        <p className="text-xs text-gray-700 font-medium">
                          {item.source}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AUDITS & CERTIFICATION NOTE */}
        <section className="container mx-auto px-6 py-8 text-center max-w-3xl">
          <div className="bg-[#173C2C] text-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              {tr("quality.audits.title", "Site-Specific Audits & Chain of Custody")}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {tr(
                "quality.audits.desc",
                "Certifications including FSC CoC, ISO 9001, ISO 14001, BSCI, and SMETA are site-specific. Documented audit reports and valid scopes for the nominated production facility are provided directly to qualified buyers during programme onboarding."
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=compliance"
                className="inline-flex items-center gap-2 bg-[#B97846] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#B97846]/90 transition-all shadow-sm"
              >
                {tr("quality.audits.requestDossier", "Request Compliance Dossier")} <ArrowRight size={16} />
              </Link>
              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded text-sm font-semibold hover:bg-white/10 transition-all"
              >
                {tr("quality.audits.viewFacilities", "View 11 Production Facilities")}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
