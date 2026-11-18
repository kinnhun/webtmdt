import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Layers,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { BrandLogo } from "@/components/ui/BrandLogos";
import type {
  BrandId,
  CollectionBrandFilter,
  CuratedCollectionItem,
} from "@/types/dht.types";
import type { Collection } from "@/domains/product/product.types";

const CURATED_COLLECTIONS: CuratedCollectionItem[] = [
  // ── DHT (12 Outdoor Collections — Hình 50) ──
  {
    id: "dht-olivia",
    slug: "olivia-lounge-collection",
    brand: "DHT",
    title: "Olivia Lounge Collection",
    category: "Outdoor Lounge",
    material: "Acacia Wood",
    style: "Contemporary",
    image: "/img/pdf-guide/collections/dht-olivia-lounge.jpg",
    featuredOrder: 1,
  },
  {
    id: "dht-santos",
    slug: "santos-dining-collection",
    brand: "DHT",
    title: "Santos Dining Collection",
    category: "Outdoor Dining",
    material: "Acacia Wood & Rope",
    style: "Coastal Woven",
    image: "/img/pdf-guide/collections/dht-santos-dining.jpg",
    featuredOrder: 2,
  },
  {
    id: "dht-aster",
    slug: "aster-sunlounger-collection",
    brand: "DHT",
    title: "Aster Sunlounger Collection",
    category: "Sunlounger",
    material: "Acacia Wood",
    style: "Resort Poolside",
    image: "/img/pdf-guide/collections/dht-aster-sunlounger.jpg",
    featuredOrder: 7,
  },
  {
    id: "dht-bali",
    slug: "bali-daybed-collection",
    brand: "DHT",
    title: "Bali Daybed Collection",
    category: "Daybed",
    material: "Acacia Wood & Fabric",
    style: "Resort Canopy",
    image: "/img/pdf-guide/collections/dht-bali-daybed.jpg",
    featuredOrder: 10,
  },
  {
    id: "dht-marina",
    slug: "marina-modular-collection",
    brand: "DHT",
    title: "Marina Modular Collection",
    category: "Modular Seating",
    material: "Acacia Wood",
    style: "Architectural",
    image: "/img/pdf-guide/collections/dht-marina-modular.jpg",
    featuredOrder: 11,
  },
  {
    id: "dht-luna",
    slug: "luna-lounge-collection",
    brand: "DHT",
    title: "Luna Lounge Collection",
    category: "Lounge Chair",
    material: "Acacia Wood & Rope",
    style: "Organic Curve",
    image: "/img/pdf-guide/collections/dht-luna-lounge.jpg",
    featuredOrder: 12,
  },
  {
    id: "dht-riviera",
    slug: "riviera-dining-collection",
    brand: "DHT",
    title: "Riviera Dining Collection",
    category: "Outdoor Dining",
    material: "Acacia Wood",
    style: "Classic Timber",
    image: "/img/pdf-guide/collections/dht-riviera-dining.jpg",
    featuredOrder: 13,
  },
  {
    id: "dht-calypso",
    slug: "calypso-lounge-collection",
    brand: "DHT",
    title: "Calypso Lounge Collection",
    category: "Outdoor Lounge",
    material: "Acacia Wood & Aluminium",
    style: "Mixed Material",
    image: "/img/pdf-guide/collections/dht-calypso-lounge.jpg",
    featuredOrder: 14,
  },
  {
    id: "dht-terra",
    slug: "terra-dining-collection",
    brand: "DHT",
    title: "Terra Dining Collection",
    category: "Outdoor Dining",
    material: "Acacia Wood & Rope",
    style: "Sculpted Base",
    image: "/img/pdf-guide/collections/dht-terra-dining.jpg",
    featuredOrder: 15,
  },
  {
    id: "dht-pacific",
    slug: "pacific-sunbed-collection",
    brand: "DHT",
    title: "Pacific Sunbed Collection",
    category: "Sunlounger / Daybed",
    material: "Acacia Wood",
    style: "Hospitality",
    image: "/img/pdf-guide/collections/dht-pacific-sunbed.jpg",
    featuredOrder: 16,
  },
  {
    id: "dht-vento",
    slug: "vento-lounge-collection",
    brand: "DHT",
    title: "Vento Lounge Collection",
    category: "Outdoor Lounge",
    material: "Acacia Wood & Rope",
    style: "Coastal Woven",
    image: "/img/pdf-guide/collections/dht-vento-lounge.jpg",
    featuredOrder: 17,
  },
  {
    id: "dht-cove",
    slug: "cove-bar-collection",
    brand: "DHT",
    title: "Cove Bar Collection",
    category: "Outdoor Bar",
    material: "Acacia Wood",
    style: "Hospitality Bar",
    image: "/img/pdf-guide/collections/dht-cove-bar.jpg",
    featuredOrder: 18,
  },

  // ── JAGER (8 Indoor Collections — Hình 48) ──
  {
    id: "jager-arden",
    slug: "arden-dining-collection",
    brand: "JAGER",
    title: "Arden Dining Collection",
    category: "Indoor Dining",
    material: "Oak Wood",
    style: "Modern Residential",
    image: "/img/pdf-guide/collections/jager-arden-dining.jpg",
    featuredOrder: 3,
  },
  {
    id: "jager-leno",
    slug: "leno-living-collection",
    brand: "JAGER",
    title: "Leno Living Collection",
    category: "Living Room",
    material: "Oak & Fabric",
    style: "Contemporary Lounge",
    image: "/img/pdf-guide/collections/jager-leno-living.jpg",
    featuredOrder: 19,
  },
  {
    id: "jager-riva",
    slug: "riva-bedroom-collection",
    brand: "JAGER",
    title: "Riva Bedroom Collection",
    category: "Bedroom",
    material: "Oak Veneer",
    style: "Warm Minimalist",
    image: "/img/pdf-guide/collections/jager-riva-bedroom.jpg",
    featuredOrder: 4,
  },
  {
    id: "jager-nexa",
    slug: "nexa-storage-collection",
    brand: "JAGER",
    title: "Nexa Storage Collection",
    category: "Storage & Cabinet",
    material: "Oak Wood",
    style: "Fluted Timber",
    image: "/img/pdf-guide/collections/jager-nexa-storage.jpg",
    featuredOrder: 20,
  },
  {
    id: "jager-elara",
    slug: "elara-dining-collection",
    brand: "JAGER",
    title: "Elara Dining Collection",
    category: "Indoor Dining",
    material: "Walnut Wood",
    style: "Sculpted Pedestal",
    image: "/img/pdf-guide/collections/jager-elara-dining.jpg",
    featuredOrder: 21,
  },
  {
    id: "jager-vero",
    slug: "vero-lounge-collection",
    brand: "JAGER",
    title: "Vero Lounge Collection",
    category: "Living Room",
    material: "Oak Wood & Fabric",
    style: "Mid-Century Modern",
    image: "/img/pdf-guide/collections/jager-vero-lounge.jpg",
    featuredOrder: 22,
  },
  {
    id: "jager-mila",
    slug: "mila-bedroom-collection",
    brand: "JAGER",
    title: "Mila Bedroom Collection",
    category: "Bedroom",
    material: "Fabric & Oak Wood",
    style: "Soft Upholstered",
    image: "/img/pdf-guide/collections/jager-mila-bedroom.jpg",
    featuredOrder: 23,
    wideCard: true,
  },
  {
    id: "jager-carter",
    slug: "carter-cabinet-collection",
    brand: "JAGER",
    title: "Carter Cabinet Collection",
    category: "Storage & Cabinet",
    material: "Oak Wood",
    style: "Architectural Glass",
    image: "/img/pdf-guide/collections/jager-carter-cabinet.jpg",
    featuredOrder: 24,
    wideCard: true,
  },

  // ── THE ONE (5 Office & Project Collections — Hình 49) ──
  {
    id: "theone-orion",
    slug: "orion-conference-collection",
    brand: "THE ONE",
    title: "Orion Conference Collection",
    category: "Office & Meeting",
    material: "Engineered Wood",
    style: "Executive Boardroom",
    image: "/img/pdf-guide/collections/theone-orion-conference.jpg",
    featuredOrder: 5,
  },
  {
    id: "theone-axis",
    slug: "axis-workstation-collection",
    brand: "THE ONE",
    title: "Axis Workstation Collection",
    category: "Office Furniture",
    material: "Melamine & Metal",
    style: "Modular Workspace",
    image: "/img/pdf-guide/collections/theone-axis-workstation.jpg",
    featuredOrder: 8,
  },
  {
    id: "theone-vela",
    slug: "vela-lounge-collection",
    brand: "THE ONE",
    title: "Vela Lounge Collection",
    category: "Project & Hospitality",
    material: "Fabric & Wood",
    style: "Contract Lobby",
    image: "/img/pdf-guide/collections/theone-vela-lounge.jpg",
    featuredOrder: 25,
  },
  {
    id: "theone-terra",
    slug: "terra-project-collection",
    brand: "THE ONE",
    title: "Terra Project Collection",
    category: "Outdoor Project",
    material: "Aluminium & Rope",
    style: "Commercial Terrace",
    image: "/img/pdf-guide/collections/theone-terra-project.jpg",
    featuredOrder: 26,
    wideCard: true,
  },
  {
    id: "theone-lagoon",
    slug: "lagoon-modular-collection",
    brand: "THE ONE",
    title: "Lagoon Modular Collection",
    category: "Outdoor Project",
    material: "Aluminium & Fabric",
    style: "Hospitality Lounge",
    image: "/img/pdf-guide/collections/theone-lagoon-modular.jpg",
    featuredOrder: 27,
    wideCard: true,
  },

  // ── MEKONG (3 Wood Panel Series — Hình 51) ──
  {
    id: "mekong-standard",
    slug: "standard-panel-series",
    brand: "MEKONG",
    title: "Standard Panel Series",
    category: "Wood Panels",
    material: "MDF / HDF",
    style: "Furniture Core",
    image: "/img/pdf-guide/collections/mekong-standard-panel.jpg",
    featuredOrder: 6,
  },
  {
    id: "mekong-plywood",
    slug: "plywood-series",
    brand: "MEKONG",
    title: "Plywood Series",
    category: "Engineered Panels",
    material: "Birch / Eucalyptus",
    style: "Structural Multi-Ply",
    image: "/img/pdf-guide/collections/mekong-plywood-series.jpg",
    featuredOrder: 28,
  },
  {
    id: "mekong-veneer",
    slug: "decorative-veneer-panels",
    brand: "MEKONG",
    title: "Decorative Veneer Panels",
    category: "Veneered Panels",
    material: "Oak Veneer / Walnut Veneer",
    style: "Interior Architectural",
    image: "/img/pdf-guide/collections/mekong-decorative-veneer.jpg",
    featuredOrder: 9,
  },
];

const BRAND_FILTER_PILLS: { id: CollectionBrandFilter; label: string }[] = [
  { id: "ALL", label: "All Brands" },
  { id: "DHT", label: "DHT" },
  { id: "JAGER", label: "JAGER" },
  { id: "THE ONE", label: "THE ONE" },
  { id: "MEKONG", label: "MEKONG" },
];

export default function CatalogueContainer({
  forcedCollection,
}: {
  forcedCollection?: Collection;
}) {
  const router = useRouter();
  const initialBrand: CollectionBrandFilter =
    forcedCollection === "Outdoor"
      ? "DHT"
      : forcedCollection === "Indoor"
      ? "JAGER"
      : "ALL";

  const [selectedBrand, setSelectedBrand] = useState<CollectionBrandFilter>(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("ALL");
  const [selectedStyle, setSelectedStyle] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "brand">("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync brand filter from URL query (?brand=DHT|JAGER|THE ONE|MEKONG)
  useEffect(() => {
    if (!router.isReady) return;
    const rawBrand = router.query.brand as string | undefined;
    if (!rawBrand) return;
    const upper = rawBrand.toUpperCase().trim();
    if (upper === "DHT") setSelectedBrand("DHT");
    else if (upper === "JAGER") setSelectedBrand("JAGER");
    else if (upper === "THE ONE" || upper === "THEONE") setSelectedBrand("THE ONE");
    else if (upper === "MEKONG") setSelectedBrand("MEKONG");
    else if (upper === "ALL") setSelectedBrand("ALL");
    setCurrentPage(1);
  }, [router.isReady, router.query.brand]);

  const handleSelectBrand = (brand: CollectionBrandFilter) => {
    setSelectedBrand(brand);
    setSelectedCategory("ALL");
    setSelectedMaterial("ALL");
    setSelectedStyle("ALL");
    setCurrentPage(1);
    const nextQuery = { ...router.query };
    if (brand === "ALL") {
      delete nextQuery.brand;
    } else {
      nextQuery.brand = brand;
    }
    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, {
      shallow: true,
    });
  };

  // Dynamic options based on selectedBrand
  const brandScopedItems = useMemo(() => {
    if (selectedBrand === "ALL") return CURATED_COLLECTIONS;
    return CURATED_COLLECTIONS.filter((item) => item.brand === selectedBrand);
  }, [selectedBrand]);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(brandScopedItems.map((i) => i.category)));
  }, [brandScopedItems]);

  const materialOptions = useMemo(() => {
    return Array.from(new Set(brandScopedItems.map((i) => i.material)));
  }, [brandScopedItems]);

  const styleOptions = useMemo(() => {
    return Array.from(new Set(brandScopedItems.map((i) => i.style)));
  }, [brandScopedItems]);

  const filteredCollections = useMemo(() => {
    const list = brandScopedItems.filter((item) => {
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) return false;
      if (selectedMaterial !== "ALL" && item.material !== selectedMaterial) return false;
      if (selectedStyle !== "ALL" && item.style !== selectedStyle) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "brand") return a.brand.localeCompare(b.brand);
      return a.featuredOrder - b.featuredOrder;
    });
  }, [brandScopedItems, selectedCategory, selectedMaterial, selectedStyle, sortBy]);

  const pageSize = selectedBrand === "ALL" ? 9 : 12;
  const totalPages = Math.max(1, Math.ceil(filteredCollections.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const displayedCollections = useMemo(() => {
    if (selectedBrand !== "ALL") return filteredCollections;
    const start = (safePage - 1) * pageSize;
    return filteredCollections.slice(start, start + pageSize);
  }, [filteredCollections, selectedBrand, safePage, pageSize]);

  // Dynamic Hero Banner Content based on Selected Brand (Hình 47–51)
  const heroConfig = useMemo(() => {
    if (selectedBrand === "DHT") {
      return {
        badge: "COLLECTIONS",
        title: "DHT Collections",
        description:
          "A curated selection of outdoor furniture, crafted in Vietnam with FSC® certified wood and durable, weather-resistant materials for global markets.",
        image: "/img/pdf-guide/collections/hero-dht.jpg",
        primaryCtaLabel: "Inquire About DHT Collections",
        primaryCtaHref: "/contact?inquiry=catalogue&brand=DHT#smart-contact-form",
        secondaryCtaLabel: null,
        secondaryCtaHref: null,
      };
    }
    if (selectedBrand === "JAGER") {
      return {
        badge: "COLLECTIONS",
        title: "JAGER Collections",
        description:
          "Refined indoor furniture collections that bring natural materials, modern design and lasting quality to everyday living.",
        image: "/img/pdf-guide/collections/hero-jager.jpg",
        primaryCtaLabel: "Request JAGER Catalogue",
        primaryCtaHref: "/contact?inquiry=catalogue&brand=JAGER#smart-contact-form",
        secondaryCtaLabel: "Inquire About a Collection",
        secondaryCtaHref: "/contact?inquiry=quotation&brand=JAGER#smart-contact-form",
      };
    }
    if (selectedBrand === "THE ONE") {
      return {
        badge: "THE ONE",
        title: "Modern Living,\nThoughtfully Designed",
        description:
          "Commercial, office and hospitality furniture solutions for diverse projects, combining functionality, durability and contemporary design.",
        image: "/img/pdf-guide/collections/hero-theone.jpg",
        primaryCtaLabel: "Inquire About THE ONE Collections",
        primaryCtaHref: "/contact?inquiry=catalogue&brand=THE%20ONE#smart-contact-form",
        secondaryCtaLabel: null,
        secondaryCtaHref: null,
      };
    }
    if (selectedBrand === "MEKONG") {
      return {
        badge: "COLLECTIONS",
        title: "MEKONG®\nNatural Materials, Honest Craft",
        description:
          "Engineered wood panels and primary timber solutions for furniture, interior and project applications.",
        image: "/img/pdf-guide/collections/hero-mekong.jpg",
        primaryCtaLabel: "Inquire About MEKONG Collections",
        primaryCtaHref: "/contact?inquiry=catalogue&brand=MEKONG#smart-contact-form",
        secondaryCtaLabel: null,
        secondaryCtaHref: null,
      };
    }
    return {
      badge: "COLLECTIONS",
      title: "Selected Furniture\nCollections.",
      description:
        "Discover a curated selection of outdoor, indoor, office and project furniture from our four brands, manufactured in Vietnam.",
      image: "/img/pdf-guide/collections/hero-all.jpg",
      primaryCtaLabel: "Explore by Brand",
      primaryCtaHref: "#brand-filter-bar",
      secondaryCtaLabel: "Request Collection Access",
      secondaryCtaHref: "/contact?inquiry=catalogue#smart-contact-form",
    };
  }, [selectedBrand]);

  return (
    <>
      <SEO
        title="Furniture Collections | DHT, JAGER, THE ONE & MEKONG | DHT Furniture Vietnam"
        description="Discover 28 curated outdoor, indoor, office and project furniture collections and wood panel series from our four brands manufactured in Vietnam."
        canonical="https://dhtcompany.com/catalogue"
        image={heroConfig.image}
      />
      <Schema
        id="schema-breadcrumbs-collections"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Collections",
              item: "https://dhtcompany.com/catalogue",
            },
          ],
        }}
      />

      <main className="bg-[#FAF8F3] text-[#0E241B] min-h-screen pt-16 lg:pt-[72px]">
        {/* ── 1. DYNAMIC HERO BANNER (Hình 47–51) ── */}
        <section className="relative min-h-[340px] lg:min-h-[380px] flex items-center bg-[#0C2118] text-white overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
            <img
              key={heroConfig.image}
              src={heroConfig.image}
              alt={heroConfig.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #0C2118 0%, rgba(12, 33, 24, 0.88) 34%, rgba(12, 33, 24, 0.15) 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-14 relative z-10">
            <div className="max-w-xl">
              {selectedBrand === "THE ONE" ? (
                <div className="inline-flex items-center gap-4 mb-4">
                  <div className="px-4 py-2 rounded-xl bg-[#0D5C9E] text-white font-body font-extrabold text-base tracking-wider shadow-md">
                    THE ONE<sup>®</sup>
                  </div>
                  <div className="h-10 w-px bg-white/30" />
                  <h1 className="font-display font-bold text-2xl sm:text-3xl text-white whitespace-pre-line leading-tight">
                    {heroConfig.title}
                  </h1>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="h-[1.5px] w-7 bg-[#D89B3C]" />
                    <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#D89B3C]">
                      {heroConfig.badge}
                    </span>
                  </div>
                  <h1
                    className="font-display font-bold text-white whitespace-pre-line leading-[1.12] mb-3.5"
                    style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
                  >
                    {heroConfig.title}
                  </h1>
                </>
              )}

              <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed mb-7">
                {heroConfig.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                {heroConfig.primaryCtaHref.startsWith("#") ? (
                  <a
                    href={heroConfig.primaryCtaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E2AA4F] to-[#C88A36] text-[#0E241B] font-body text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-md"
                  >
                    <span>{heroConfig.primaryCtaLabel}</span>
                    <ArrowDown size={15} />
                  </a>
                ) : (
                  <Link
                    href={heroConfig.primaryCtaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E2AA4F] to-[#C88A36] text-[#0E241B] font-body text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-md"
                  >
                    <span>{heroConfig.primaryCtaLabel}</span>
                    <ArrowRight size={15} />
                  </Link>
                )}

                {heroConfig.secondaryCtaLabel && heroConfig.secondaryCtaHref && (
                  <Link
                    href={heroConfig.secondaryCtaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/35 hover:bg-black/55 text-white border border-white/45 font-body text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs"
                  >
                    <span>{heroConfig.secondaryCtaLabel}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. INTERACTIVE BRAND LOGO FILTER BAR + CATEGORY/MATERIAL DROPDOWNS ── */}
        <section id="brand-filter-bar" className="py-8 lg:py-10 scroll-mt-16">
          <div className="container mx-auto px-6 lg:px-10">
            {/* Row 1: Brand Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="font-body text-xs sm:text-sm font-bold text-[#0E241B] mr-1">
                  Select Brand:
                </span>

                {BRAND_FILTER_PILLS.map((pill) => {
                  const isActive = selectedBrand === pill.id;
                  return (
                    <button
                      type="button"
                      key={pill.id}
                      onClick={() => handleSelectBrand(pill.id)}
                      className={`h-11 px-5 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                        isActive
                          ? "bg-[#0E241B] text-white border-[#0E241B] shadow-md scale-[1.01]"
                          : "bg-white text-[#0E241B] border-[#E2DACB] hover:border-[#C88A36] shadow-2xs"
                      }`}
                    >
                      {pill.id === "ALL" ? (
                        <span className="font-body text-xs sm:text-sm font-bold tracking-wide">
                          All Brands
                        </span>
                      ) : (
                        <BrandLogo
                          brand={pill.id as BrandId}
                          variant={isActive ? "light" : "color"}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Category & Material Dropdowns */}
              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by Category"
                  className="h-10 px-3.5 rounded-full bg-white border border-[#E2DACB] font-body text-xs font-semibold text-[#0E241B] focus:outline-none focus:border-[#B97846] cursor-pointer"
                >
                  <option value="ALL">Category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  aria-label="Filter by Material"
                  className="h-10 px-3.5 rounded-full bg-white border border-[#E2DACB] font-body text-xs font-semibold text-[#0E241B] focus:outline-none focus:border-[#B97846] cursor-pointer"
                >
                  <option value="ALL">Material</option>
                  {materialOptions.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  aria-label="Filter by Style or Application"
                  className="h-10 px-3.5 rounded-full bg-white border border-[#E2DACB] font-body text-xs font-semibold text-[#0E241B] focus:outline-none focus:border-[#B97846] cursor-pointer"
                >
                  <option value="ALL">
                    {selectedBrand === "MEKONG" ? "Application" : "Style"}
                  </option>
                  {styleOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Collections Count + Sort By */}
            <div className="pt-5 pb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#B97846]" />
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0E241B]">
                  {filteredCollections.length}{" "}
                  {selectedBrand === "ALL" ? "Collections Found" : "Collections"}
                </h2>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-body text-xs text-[#4A5550]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "featured" | "name" | "brand")
                  }
                  className="h-9 px-3.5 rounded-full bg-white border border-[#E2DACB] font-body text-xs font-bold text-[#0E241B] focus:outline-none focus:border-[#B97846] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Collection Name (A–Z)</option>
                  <option value="brand">Brand</option>
                </select>
              </div>
            </div>

            {/* ── 3. COLLECTIONS GRID (Hình 47–51) ── */}
            {selectedBrand === "MEKONG" ? (
              /* 2-Column Large Panel Showcase for MEKONG (Hình 51) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedCollections.map((item, idx) => (
                  <CollectionCardItem
                    key={item.id}
                    item={item}
                    index={idx}
                    allBrandsMode={false}
                  />
                ))}
              </div>
            ) : (
              /* Standard 3-Column Grid + Wide Cards on Bottom Row when filtering JAGER or THE ONE */
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                {displayedCollections.map((item, idx) => {
                  const isWide =
                    selectedBrand !== "ALL" &&
                    selectedCategory === "ALL" &&
                    selectedMaterial === "ALL" &&
                    item.wideCard;
                  return (
                    <div
                      key={item.id}
                      className={isWide ? "md:col-span-3" : "md:col-span-2"}
                    >
                      <CollectionCardItem
                        item={item}
                        index={idx}
                        allBrandsMode={selectedBrand === "ALL" && safePage === 1}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Bar (Matches Hình 47 & Hình 50) */}
            {(selectedBrand === "ALL" || selectedBrand === "DHT") && (
              <div className="mt-10 flex items-center justify-center gap-2 font-body text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-9 h-9 rounded-lg bg-white border border-[#E2DACB] text-[#0E241B] flex items-center justify-center hover:border-[#B97846] disabled:opacity-45 cursor-pointer"
                >
                  ‹
                </button>
                {Array.from({ length: selectedBrand === "ALL" ? totalPages : 2 }).map(
                  (_, idx) => {
                    const p = idx + 1;
                    const isCurrent = safePage === p;
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => {
                          if (selectedBrand === "ALL") setCurrentPage(p);
                        }}
                        className={`w-9 h-9 rounded-lg border font-bold flex items-center justify-center transition-colors cursor-pointer ${
                          isCurrent
                            ? "bg-[#0E241B] text-white border-[#0E241B]"
                            : "bg-white text-[#0E241B] border-[#E2DACB] hover:border-[#B97846]"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  }
                )}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-9 h-9 rounded-lg bg-white border border-[#E2DACB] text-[#0E241B] flex items-center justify-center hover:border-[#B97846] disabled:opacity-45 cursor-pointer"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── 4. DYNAMIC BOTTOM REQUEST CATALOGUE BANNER (Hình 47–51 Bottom) ── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="rounded-2xl bg-gradient-to-r from-[#0E261C] via-[#133225] to-[#0E261C] text-white p-7 sm:p-10 shadow-xl border border-[#C88A36]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#D89B3C]/15 border border-[#D89B3C]/40 flex items-center justify-center shrink-0">
                  {selectedBrand === "MEKONG" || selectedBrand === "ALL" ? (
                    <Layers size={30} className="text-[#E5B869]" strokeWidth={1.6} />
                  ) : (
                    <Armchair size={30} className="text-[#E5B869]" strokeWidth={1.6} />
                  )}
                </div>
                <div>
                  <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#E5B869] block mb-1">
                    {selectedBrand === "ALL"
                      ? "PRIVATE COLLECTION ACCESS"
                      : `EXPLORE MORE FROM ${selectedBrand}`}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {selectedBrand === "ALL"
                      ? "Request Our Full Collections"
                      : `Request ${selectedBrand} Catalogue`}
                  </h3>
                </div>
              </div>

              <div className="hidden lg:block h-12 w-px bg-white/15" />

              <p className="font-body text-xs sm:text-sm text-white/85 max-w-md text-center lg:text-left leading-relaxed">
                {selectedBrand === "ALL"
                  ? "Access the complete catalogue of our four brands and curated collections, tailored to your market needs."
                  : selectedBrand === "MEKONG"
                  ? "Get the complete MEKONG catalogue with full panel ranges and specifications."
                  : `Get the complete ${selectedBrand} catalogue with full collections and product specifications.`}
              </p>

              <Link
                href={
                  selectedBrand === "ALL"
                    ? "/contact?inquiry=catalogue#smart-contact-form"
                    : `/contact?inquiry=catalogue&brand=${encodeURIComponent(
                        selectedBrand
                      )}#smart-contact-form`
                }
                className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E2AA4F] to-[#C88A36] text-[#0E241B] font-body text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-md"
              >
                <span>
                  {selectedBrand === "ALL"
                    ? "Request Collection Access"
                    : "Request Catalogue"}
                </span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function CollectionCardItem({
  item,
  index,
  allBrandsMode,
}: {
  item: CuratedCollectionItem;
  index: number;
  allBrandsMode: boolean;
}) {
  // On All Brands Page 1 (Hình 47), card #3 displays "Willow Dining Collection" and card #6 displays "Premium Panel Series"
  const displayTitle =
    allBrandsMode && item.id === "jager-arden"
      ? "Willow Dining Collection"
      : allBrandsMode && item.id === "mekong-standard"
      ? "Premium Panel Series"
      : item.title;

  const displayImage =
    allBrandsMode && item.id === "jager-arden"
      ? "/img/pdf-guide/collections/jager-willow-dining.jpg"
      : item.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="group h-full rounded-2xl bg-[#FBF9F5] border border-[#E5DEC9] hover:border-[#B97846] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      {/* Top Collection Image + Brand Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE4D7]">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <BrandLogo brand={item.brand} variant="badge" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-[#0E241B] mb-2">
            {displayTitle}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs font-body text-[#37413D] mb-4">
            <span className="inline-flex items-center gap-1.5">
              {item.brand === "MEKONG" ? (
                <Layers size={13} className="text-[#8C5327]" />
              ) : (
                <Armchair size={13} className="text-[#8C5327]" />
              )}
              <span>{item.category}</span>
            </span>
            <span className="text-black/25">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#8C5327]" />
              <span>{item.material}</span>
            </span>
          </div>
        </div>

        <Link
          href={`/contact?inquiry=quotation&brand=${encodeURIComponent(
            item.brand
          )}&collection=${encodeURIComponent(displayTitle)}#smart-contact-form`}
          className="inline-flex items-center gap-2 font-body text-xs sm:text-sm font-bold text-[#8C4A1D] group-hover:text-[#0E241B] transition-colors pt-1"
        >
          <ImageIcon size={14} className="text-[#B97846] shrink-0" />
          <span>Inquire About This Collection</span>
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
}
