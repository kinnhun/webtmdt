export type MaterialArticle = {
  slug: string;
  key: string;
  image: string;
  hoverImage: string;
  badge: string;
  title: string;
  headline: string;
  intro: string;
  layout: "editorial" | "premium" | "technical" | "comfort";
  stats: string[];
  sections: { title: string; body?: string; bullets?: string[]; image?: string }[];
};

const version = "20260608-5";

export const materialArticles: MaterialArticle[] = [
  {
    slug: "acacia-wood-outdoor-furniture",
    key: "solidOak",
    image: `/img/materials/AcaciaWood1.png?v=${version}`,
    hoverImage: `/img/materials/AcaciaWood2.png?v=${version}`,
    badge: "FSC ACACIA WOOD",
    title: "Cost-Effective Outdoor Furniture Solution",
    headline: "Acacia Wood Outdoor Furniture: Scalable Retail Programs with Certified Sourcing",
    intro: "When sourcing outdoor furniture for high-volume retail programs across the US and EU, cost efficiency must pair with certified sustainability. DHT utilizes 100% FSC-certified Acacia hybrid grown in Vietnam, combining attractive grain with proven outdoor durability under proper maintenance.",
    layout: "editorial",
    stats: ["100% FSC-certified", "Acacia hybrid (Vietnam)", "Kiln-dried 8-12% MC"],
    sections: [
      {
        title: "Why Acacia Hybrid Works for International Retailers",
        body: "Acacia hybrid is widely recognized as one of the most reliable and cost-efficient hardwoods for outdoor furniture. All wood used in DHT furniture is FSC-certified, ensuring full compliance with European EUDR and North American Lacey Act regulations.",
        bullets: [
          "Controlled kiln drying to 8-12% moisture content to prevent seasonal cracking",
          "Attractive natural grain suitable for oiled, brushed, or tinted finishes",
          "Periodic maintenance with teak or outdoor timber oil recommended for prolonged lifespan",
          "High stability and consistent supply across large-scale seasonal rollout"
        ],
        image: `/img/materials/AcaciaWood2.png?v=${version}`,
      },
      {
        title: "Built for Mass Retail & Drop-Ship Optimization",
        body: "DHT develops acacia programs tailored for mass retail chains, e-commerce distributors, and private label brands.",
        bullets: [
          "Mixed SKU container loading to optimize ocean freight efficiency",
          "Packaging engineered to pass ISTA 1A / 3A drop-test criteria",
          "Automated CNC joinery ensuring repeatable structural precision across batches",
          "Eco-friendly finishing systems formulated for exterior exposure"
        ],
        image: `/img/materials/AcaciaWood1.png?v=${version}`,
      },
      {
        title: "Commercial Execution & Repeatability",
        body: "From initial pilot orders to annual retail replenishment cycles, our 11-facility manufacturing network guarantees reliable lead times (typical 60-90 days for new programs, 45-60 days for repeat orders).",
        bullets: ["Batch-to-batch color matching", "Full traceability from certified forest concessions", "Dedicated technical support from our central commercial team"],
      },
    ],
  },
  {
    slug: "teak-wood-premium-outdoor-durability",
    key: "premiumTeak",
    image: `/img/materials/TeakWood1.png?v=${version}`,
    hoverImage: `/img/materials/TeakWood2.png?v=${version}`,
    badge: "FSC BRAZILIAN TEAK",
    title: "Premium Outdoor Durability",
    headline: "Teak Outdoor Furniture: Natural Resilience for High-End Patio & Hospitality",
    intro: "In the premium outdoor segment across North America, Europe, and Australia, teak remains the benchmark for outdoor resilience. DHT sources 100% FSC-certified Tectona grandis from sustainably managed plantations in Mato Grosso, Brazil.",
    layout: "premium",
    stats: ["FSC Tectona grandis", "Mato Grosso (Brazil)", "Natural patina aging"],
    sections: [
      {
        title: "Natural Chemistry & Weather Resistance",
        body: "Teak wood possesses high natural oil content and silica density, providing outstanding resistance against moisture, rot, and insects without chemical pressure-treatment.",
        bullets: [
          "Naturally develops a distinguished silver-grey patina when exposed to outdoor elements",
          "High dimensional stability under wide temperature and humidity fluctuations",
          "Simple maintenance: gentle brushing and mild soap cleaning; optional teak sealer to retain warm honey tones",
          "Ideal for premium residential terraces, luxury hospitality resorts, and contract dining"
        ],
        image: `/img/materials/TeakWood2.png?v=${version}`,
      },
      {
        title: "Precision Processing at DHT Facilities",
        body: "Executing teak collections at scale requires stringent timber seasoning. DHT utilizes precision wood kilns and computerized moisture monitoring to prevent stress cracking and warping.",
        bullets: [
          "Computer-controlled kiln drying preventing internal stresses",
          "Mortise and tenon joinery reinforced with marine-grade stainless steel hardware",
          "FSC Chain of Custody (CoC) certification supporting transparent due diligence documentation",
          "Fine hand-sanded finishes emphasizing smooth tactile quality"
        ],
        image: `/img/materials/TeakWood1.png?v=${version}`,
      },
      {
        title: "Designed for Long-Term Value",
        body: "With teak, durability translates directly into lifecycle economy. DHT partners with international buyers to engineer timeless collections built for multi-season commercial performance.",
      },
    ],
  },
  {
    slug: "powder-coated-aluminum-modern-scalable",
    key: "aluminium",
    image: `/img/materials/Powder-CoatedAluminum1.png?v=${version}`,
    hoverImage: `/img/materials/Powder-CoatedAluminum2.png?v=${version}`,
    badge: "POWDER-COATED ALUMINUM",
    title: "Modern & Scalable",
    headline: "Powder-Coated Aluminum: Architectural Durability for Modern Living",
    intro: "Lightweight, highly corrosion-resistant, and visually sleek — architectural powder-coated aluminum enables brands to scale modern outdoor programs while minimizing logistics weight and post-sales returns.",
    layout: "technical",
    stats: ["Architectural Alloy", "Pre-treated & Coated", "CBM & Freight Efficient"],
    sections: [
      {
        title: "Engineered Surface Protection",
        body: "Unlike untreated metals, DHT utilizes specialized multi-stage pre-treatment (chemical cleaning, degreasing, and anti-oxidation conversion) before electrostatically applying exterior-grade polyester powder coatings.",
        bullets: [
          "High corrosion resistance suitable for pool areas, coastal environments, and humid climates",
          "Exterior-grade architectural powders (AkzoNobel / Tiger Drylac) tested for UV color-fastness",
          "Lightweight construction reducing ocean freight costs per unit and easing home delivery",
          "Seamless TIG and MIG robotic welding ensuring robust structural frame integrity"
        ],
        image: `/img/materials/Powder-CoatedAluminum2.png?v=${version}`,
      },
      {
        title: "Mixed-Material Integration",
        body: "Aluminum frames serve as the modern backbone for composite collections, pairing effortlessly with FSC teak accents, hand-woven olefin rope, and quick-dry cushion systems.",
        bullets: [
          "Precision tube bending and customized die-cast joints",
          "Modular knockdown (KD) configurations reducing packaging CBM up to 40%",
          "Compatibility with high-density Olefin webbing and Sunbrella performance fabrics"
        ],
        image: `/img/materials/Powder-CoatedAluminum1.png?v=${version}`,
      },
      {
        title: "Scalable OEM / ODM Capabilities",
        bullets: [
          "Custom extrusion profiles for proprietary brand collections",
          "Powder coating finish matching (matte, textured, satin, metallic)",
          "Rapid sample prototyping within typical 7-14 days following drawing approval"
        ],
      },
    ],
  },
  {
    slug: "outdoor-fabric-performance-comfort",
    key: "linenVelvet",
    image: `/img/materials/OutdoorFabric1.png?v=${version}`,
    hoverImage: `/img/materials/OutdoorFabric2.png?v=${version}`,
    badge: "PERFORMANCE FABRICS",
    title: "Performance & Comfort",
    headline: "Outdoor Performance Fabrics & Cushion Systems",
    intro: "In outdoor seating, visual design attracts the eye, but comfort and durability govern customer satisfaction. DHT integrates certified solution-dyed fabrics and rapid-draining foam inserts engineered for exterior performance.",
    layout: "comfort",
    stats: ["Solution-dyed Olefin", "Quick-dry foam", "UV & water repellent"],
    sections: [
      {
        title: "Exterior Textile Standards",
        bullets: [
          "Solution-dyed Olefin fabrics with exceptional UV color-fastness (Grade 7/8)",
          "Water-repellent fluorocarbon-free surface treatments for environmental safety",
          "Resistance to mold, mildew, and chlorine bleaching",
          "Removable zippered covers for easy laundering and commercial maintenance"
        ],
        image: `/img/materials/OutdoorFabric2.png?v=${version}`,
      },
      {
        title: "Foam Cores & Quick-Draining Systems",
        body: "We offer reticulated quick-dry foam and open-cell polyester padding to allow rainwater to drain rapidly, avoiding moisture accumulation and odor.",
        bullets: [
          "High-resilience foam retaining structural shape over repeated loading cycles",
          "Breathable mesh bottom panels on seat cushions for rapid air and water escape",
          "Branded textiles (Sunbrella, Agora, etc.) and specialized fire-retardant foams (CA TB117, BS 5852) available upon project quotation"
        ],
        image: `/img/materials/OutdoorFabric1.png?v=${version}`,
      },
      {
        title: "Quality Assurance for Hospitality & Retail",
        body: "All cushion sets are batch-inspected for stitching tension, zipper durability, and dimensional accuracy to ensure a snug, premium fit.",
      },
    ],
  },
  {
    slug: "eucalyptus-wood-sustainable-strength",
    key: "eucalyptusWood",
    image: `/img/materials/AcaciaWood1.png?v=${version}`,
    hoverImage: `/img/materials/AcaciaWood2.png?v=${version}`,
    badge: "FSC EUCALYPTUS",
    title: "Sustainable Strength",
    headline: "Eucalyptus Grandis: Dense, Sustainable Hardwood for Scalable Programs",
    intro: "Eucalyptus grandis sourced from certified plantation forests in Uruguay offers high density, uniform texture, and outstanding mechanical strength — making it an exceptional timber for scalable commercial patio programs.",
    layout: "technical",
    stats: ["FSC Eucalyptus grandis", "Uruguay plantation", "High structural density"],
    sections: [
      {
        title: "Material Attributes of Plantation Eucalyptus",
        body: "All Eucalyptus utilized in DHT furniture is 100% FSC-certified. Selected for its dense fiber structure, fine grain, and natural durability, it provides high dimensional stability when seasoned properly.",
        bullets: [
          "Controlled kiln drying to 8-12% moisture content minimizing surface checking",
          "High bending and compressive strength ideal for heavy-use dining chairs and tables",
          "Warm reddish-brown tone that finishes smoothly with oil or exterior polyurethane stains",
          "Fully traceable FSC supply chain meeting European EUDR and American Lacey Act requirements"
        ],
        image: `/img/materials/AcaciaWood2.png?v=${version}`,
      },
      {
        title: "Industrial Processing & Performance",
        body: "Processed through specialized drying schedules and multi-axis CNC shaping across our facilities, Eucalyptus components are manufactured with tight tolerances for flawless knockdown assembly.",
        bullets: [
          "Engineered tenon joints with exterior-grade polyurethane D4 adhesives",
          "Rigid drop-test and load-test compliance according to EN 581 and ASTM standards",
          "Optimized packing configurations maximizing container utilization"
        ],
      },
      {
        title: "Sustainable Supply for Retail Chains",
        body: "With fast plantation growth cycles and sustainable forestry stewardship, Eucalyptus grandis ensures consistent volume availability and price predictability for multi-year commercial commitments.",
      },
    ],
  },
];

export const getMaterialArticle = (slug: string) => materialArticles.find((article) => article.slug === slug);
