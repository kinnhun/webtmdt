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
    badge: "ACACIA WOOD",
    title: "Cost-Effective Outdoor Furniture Solution",
    headline: "Acacia Wood Outdoor Furniture: The Smart Choice for Scalable Retail Programs",
    intro: "When sourcing outdoor furniture for high-volume retail programs across the US and EU, cost efficiency alone is not enough. Buyers need price stability, visual appeal, and consistent quality — and this is where acacia wood stands out.",
    layout: "editorial",
    stats: ["Retail-ready hardwood", "Stable seasonal supply", "Margin-driven programs"],
    sections: [
      {
        title: "Why Acacia Works for US/EU Buyers",
        body: "Acacia is widely recognized as one of the most cost-efficient hardwoods for outdoor furniture. It enables competitive retail pricing without compromising perceived value.",
        bullets: ["Good resistance to moisture and outdoor conditions", "Attractive grain patterns for mid-range positioning", "Stable supply compared to teak"],
        image: `/img/materials/AcaciaWood2.png?v=${version}`,
      },
      {
        title: "Built for Retail: Not Just Manufacturing",
        body: "DHT develops acacia programs tailored for mass retail chains, e-commerce brands, and private label distributors.",
        bullets: ["Mixed SKU container optimization", "FSC-certified sourcing aligned with EU compliance", "Pre-treatment and finishing systems optimized for outdoor durability", "Packaging tailored for Amazon, retail chains, and drop-test standards"],
        image: `/img/materials/AcaciaWood1.png?v=${version}`,
      },
      {
        title: "Proven Experience in Large-Scale Programs",
        body: "Our acacia lines are developed with repeatability in mind, from pilot orders to full retail rollout.",
        bullets: ["Consistent color matching across batches", "Stable lead times even during peak season", "Ability to scale from pilot orders to full retail rollout"],
      },
    ],
  },
  {
    slug: "teak-wood-premium-outdoor-durability",
    key: "premiumTeak",
    image: `/img/materials/TeakWood1.png?v=${version}`,
    hoverImage: `/img/materials/TeakWood2.png?v=${version}`,
    badge: "TEAK WOOD",
    title: "Premium Outdoor Durability",
    headline: "Teak Outdoor Furniture: Premium Material for Long-Term Value",
    intro: "In the premium outdoor segment across the US and Europe, teak remains the benchmark for durability, longevity, and high-end positioning.",
    layout: "premium",
    stats: ["Luxury positioning", "Long lifecycle collections", "Hospitality-ready durability"],
    sections: [
      {
        title: "Why Teak Dominates the Premium Segment",
        bullets: ["Highly resistant to water, UV, and temperature changes", "Structurally stable over years of outdoor exposure", "Low maintenance compared to other hardwoods", "Ideal for luxury patio collections, resorts, and hospitality environments"],
        image: `/img/materials/TeakWood2.png?v=${version}`,
      },
      {
        title: "DHT’s Approach to Teak Programs",
        body: "Sourcing teak is easy. Executing teak programs at scale is not. DHT focuses on controlled process and consistent finishing.",
        bullets: ["Controlled kiln drying to prevent cracking and movement", "Precision joinery for long-term structural stability", "Sustainable sourcing aligned with EU Timber Regulation", "Natural, brushed, and weathered finish options"],
        image: `/img/materials/TeakWood1.png?v=${version}`,
      },
      {
        title: "Designed for High-Value Buyers",
        body: "With teak, the risk is not the cost — it is inconsistency and poor execution. Our role is to eliminate that risk.",
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
    headline: "Powder-Coated Aluminum Furniture: Built for Modern Outdoor Living",
    intro: "Lightweight, rust-resistant, and highly versatile — powder-coated aluminum enables brands to scale quickly while maintaining design flexibility.",
    layout: "technical",
    stats: ["Zero rust risk", "Logistics-efficient", "OEM/ODM scalable"],
    sections: [
      {
        title: "Why Aluminum is Dominating the Market",
        bullets: ["Zero rust risk for coastal markets", "Lightweight construction for logistics efficiency", "Clean, modern aesthetics aligned with contemporary design trends", "Lower shipping costs, faster inventory turnover, and reduced after-sales issues"],
        image: `/img/materials/Powder-CoatedAluminum2.png?v=${version}`,
      },
      {
        title: "Engineering Matters More Than Material",
        bullets: ["Precision welding and structural reinforcement", "High-quality powder coating for UV and corrosion resistance", "Compatibility with mixed materials such as rope, wood, and fabric"],
        image: `/img/materials/Powder-CoatedAluminum1.png?v=${version}`,
      },
      {
        title: "Scalable for OEM/ODM Programs",
        bullets: ["Private label collections", "Fast product development cycles", "Flexible MOQ", "Mixed container loading", "Rapid prototyping for new collections"],
      },
    ],
  },
  {
    slug: "outdoor-fabric-performance-comfort",
    key: "linenVelvet",
    image: `/img/materials/OutdoorFabric1.png?v=${version}`,
    hoverImage: `/img/materials/OutdoorFabric2.png?v=${version}`,
    badge: "OUTDOOR FABRIC",
    title: "Performance & Comfort",
    headline: "Outdoor Fabric: Where Comfort Meets Performance",
    intro: "In outdoor furniture, the frame gets attention — but fabric defines user experience. It must look good, feel comfortable, and survive outdoor conditions.",
    layout: "comfort",
    stats: ["UV & water resistance", "Comfort-led experience", "Lower return rates"],
    sections: [
      {
        title: "Performance Requirements in Modern Markets",
        bullets: ["UV resistance to prevent fading", "Water resistance for all-weather use", "Mold and mildew protection", "Color fastness for long-term aesthetics", "Olefin and Sunbrella as industry-standard options"],
        image: `/img/materials/OutdoorFabric2.png?v=${version}`,
      },
      {
        title: "DHT’s Fabric Integration Strategy",
        bullets: ["Partnering with certified fabric suppliers", "Testing for UV, abrasion, and water resistance", "Cushion construction optimized for shape retention", "Quick-dry foam options for premium lines"],
        image: `/img/materials/OutdoorFabric1.png?v=${version}`,
      },
      {
        title: "Supporting Your Brand Experience",
        body: "For B2B buyers, fabric impacts customer satisfaction, return rates, and brand perception. Every fabric component is aligned with target market positioning.",
      },
    ],
  },
];

export const getMaterialArticle = (slug: string) => materialArticles.find((article) => article.slug === slug);
