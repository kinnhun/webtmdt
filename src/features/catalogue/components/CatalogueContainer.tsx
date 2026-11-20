import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  Trees,
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
    category: "Outdoor Furniture",
    material: "Acacia Wood",
    style: "Contemporary",
    image: "/img/pdf-guide/collections/dht-olivia-lounge.jpg?v=2",
    featuredOrder: 1,
  },
  {
    id: "dht-santos",
    slug: "santos-dining-collection",
    brand: "DHT",
    title: "Santos Dining Collection",
    category: "Outdoor Furniture",
    material: "Teak & Rope",
    style: "Coastal Woven",
    image: "/img/pdf-guide/collections/dht-santos-dining.jpg?v=2",
    featuredOrder: 2,
  },
  {
    id: "dht-aster",
    slug: "aster-sunlounger-collection",
    brand: "DHT",
    title: "Aster Sunlounger Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood",
    style: "Resort Poolside",
    image: "/img/pdf-guide/collections/dht-aster-sunlounger.jpg?v=2",
    featuredOrder: 7,
  },
  {
    id: "dht-bali",
    slug: "bali-daybed-collection",
    brand: "DHT",
    title: "Bali Daybed Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood & Fabric",
    style: "Resort Canopy",
    image: "/img/pdf-guide/collections/dht-bali-daybed.jpg?v=2",
    featuredOrder: 10,
  },
  {
    id: "dht-marina",
    slug: "marina-modular-collection",
    brand: "DHT",
    title: "Marina Modular Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood",
    style: "Architectural",
    image: "/img/pdf-guide/collections/dht-marina-modular.jpg?v=2",
    featuredOrder: 11,
  },
  {
    id: "dht-luna",
    slug: "luna-lounge-collection",
    brand: "DHT",
    title: "Luna Lounge Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood & Rope",
    style: "Organic Curve",
    image: "/img/pdf-guide/collections/dht-luna-lounge.jpg?v=2",
    featuredOrder: 12,
  },
  {
    id: "dht-riviera",
    slug: "riviera-dining-collection",
    brand: "DHT",
    title: "Riviera Dining Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood",
    style: "Classic Timber",
    image: "/img/pdf-guide/collections/dht-riviera-dining.jpg?v=2",
    featuredOrder: 13,
  },
  {
    id: "dht-calypso",
    slug: "calypso-lounge-collection",
    brand: "DHT",
    title: "Calypso Lounge Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood & Aluminium",
    style: "Mixed Material",
    image: "/img/pdf-guide/collections/dht-calypso-lounge.jpg?v=2",
    featuredOrder: 14,
  },
  {
    id: "dht-terra",
    slug: "terra-dining-collection",
    brand: "DHT",
    title: "Terra Dining Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood & Rope",
    style: "Sculpted Base",
    image: "/img/pdf-guide/collections/dht-terra-dining.jpg?v=2",
    featuredOrder: 15,
  },
  {
    id: "dht-pacific",
    slug: "pacific-sunbed-collection",
    brand: "DHT",
    title: "Pacific Sunbed Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood",
    style: "Hospitality",
    image: "/img/pdf-guide/collections/dht-pacific-sunbed.jpg?v=2",
    featuredOrder: 16,
  },
  {
    id: "dht-vento",
    slug: "vento-lounge-collection",
    brand: "DHT",
    title: "Vento Lounge Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood & Rope",
    style: "Coastal Woven",
    image: "/img/pdf-guide/collections/dht-vento-lounge.jpg?v=2",
    featuredOrder: 17,
  },
  {
    id: "dht-cove",
    slug: "cove-bar-collection",
    brand: "DHT",
    title: "Cove Bar Collection",
    category: "Outdoor Furniture",
    material: "Acacia Wood",
    style: "Hospitality Bar",
    image: "/img/pdf-guide/collections/dht-cove-bar.jpg?v=2",
    featuredOrder: 18,
  },

  // ── JAGER (8 Indoor Collections — Hình 48) ──
  {
    id: "jager-arden",
    slug: "arden-dining-collection",
    brand: "JAGER",
    title: "Arden Dining Collection",
    category: "Indoor Furniture",
    material: "Oak Wood",
    style: "Modern Residential",
    image: "/img/pdf-guide/collections/jager-arden-dining.jpg?v=2",
    featuredOrder: 3,
  },
  {
    id: "jager-leno",
    slug: "leno-living-collection",
    brand: "JAGER",
    title: "Leno Living Collection",
    category: "Indoor Furniture",
    material: "Oak & Fabric",
    style: "Contemporary Lounge",
    image: "/img/pdf-guide/collections/jager-leno-living.jpg?v=2",
    featuredOrder: 19,
  },
  {
    id: "jager-riva",
    slug: "riva-bedroom-collection",
    brand: "JAGER",
    title: "Riva Bedroom Collection",
    category: "Indoor Furniture",
    material: "Oak & Veneer",
    style: "Warm Minimalist",
    image: "/img/pdf-guide/collections/jager-riva-bedroom.jpg?v=2",
    featuredOrder: 4,
  },
  {
    id: "jager-nexa",
    slug: "nexa-storage-collection",
    brand: "JAGER",
    title: "Nexa Storage Collection",
    category: "Indoor Furniture",
    material: "Oak Wood",
    style: "Fluted Timber",
    image: "/img/pdf-guide/collections/jager-nexa-storage.jpg?v=2",
    featuredOrder: 20,
  },
  {
    id: "jager-elara",
    slug: "elara-dining-collection",
    brand: "JAGER",
    title: "Elara Dining Collection",
    category: "Indoor Furniture",
    material: "Walnut Wood",
    style: "Sculpted Pedestal",
    image: "/img/pdf-guide/collections/jager-elara-dining.jpg?v=2",
    featuredOrder: 21,
  },
  {
    id: "jager-vero",
    slug: "vero-lounge-collection",
    brand: "JAGER",
    title: "Vero Lounge Collection",
    category: "Indoor Furniture",
    material: "Oak Wood & Fabric",
    style: "Mid-Century Modern",
    image: "/img/pdf-guide/collections/jager-vero-lounge.jpg?v=2",
    featuredOrder: 22,
  },
  {
    id: "jager-mila",
    slug: "mila-bedroom-collection",
    brand: "JAGER",
    title: "Mila Bedroom Collection",
    category: "Indoor Furniture",
    material: "Fabric & Oak Wood",
    style: "Soft Upholstered",
    image: "/img/pdf-guide/collections/jager-mila-bedroom.jpg?v=2",
    featuredOrder: 23,
    wideCard: true,
  },
  {
    id: "jager-carter",
    slug: "carter-cabinet-collection",
    brand: "JAGER",
    title: "Carter Cabinet Collection",
    category: "Indoor Furniture",
    material: "Oak Wood",
    style: "Architectural Glass",
    image: "/img/pdf-guide/collections/jager-carter-cabinet.jpg?v=2",
    featuredOrder: 24,
    wideCard: true,
  },

  // ── THE ONE (5 Office & Project Collections — Hình 49) ──
  {
    id: "theone-orion",
    slug: "orion-conference-collection",
    brand: "THE ONE",
    title: "Orion Conference Collection",
    category: "Project & Office",
    material: "Engineered Wood",
    style: "Executive Boardroom",
    image: "/img/pdf-guide/collections/theone-orion-conference.jpg?v=2",
    featuredOrder: 5,
  },
  {
    id: "theone-axis",
    slug: "axis-workstation-collection",
    brand: "THE ONE",
    title: "Axis Workstation Collection",
    category: "Office Furniture",
    material: "Engineered Wood",
    style: "Modular Workspace",
    image: "/img/pdf-guide/collections/theone-axis-workstation.jpg?v=2",
    featuredOrder: 8,
  },
  {
    id: "theone-vela",
    slug: "vela-lounge-collection",
    brand: "THE ONE",
    title: "Vela Lounge Collection",
    category: "Project & Office",
    material: "Fabric & Wood",
    style: "Contract Lobby",
    image: "/img/pdf-guide/collections/theone-vela-lounge.jpg?v=2",
    featuredOrder: 25,
  },
  {
    id: "theone-terra",
    slug: "terra-project-collection",
    brand: "THE ONE",
    title: "Terra Project Collection",
    category: "Project & Office",
    material: "Aluminium & Rope",
    style: "Commercial Terrace",
    image: "/img/pdf-guide/collections/theone-terra-project.jpg?v=2",
    featuredOrder: 26,
    wideCard: true,
  },
  {
    id: "theone-lagoon",
    slug: "lagoon-modular-collection",
    brand: "THE ONE",
    title: "Lagoon Modular Collection",
    category: "Project & Office",
    material: "Aluminium & Fabric",
    style: "Hospitality Lounge",
    image: "/img/pdf-guide/collections/theone-lagoon-modular.jpg?v=2",
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
    image: "/img/pdf-guide/collections/mekong-standard-panel.jpg?v=2",
    featuredOrder: 6,
  },
  {
    id: "mekong-plywood",
    slug: "plywood-series",
    brand: "MEKONG",
    title: "Plywood Series",
    category: "Wood Panels",
    material: "Birch / Eucalyptus",
    style: "Structural Multi-Ply",
    image: "/img/pdf-guide/collections/mekong-plywood-series.jpg?v=2",
    featuredOrder: 28,
  },
  {
    id: "mekong-veneer",
    slug: "decorative-veneer-panels",
    brand: "MEKONG",
    title: "Decorative Veneer Panels",
    category: "Wood Panels",
    material: "Natural Veneer",
    style: "Interior Architectural",
    image: "/img/pdf-guide/collections/mekong-decorative-veneer.jpg?v=2",
    featuredOrder: 9,
  },
];

const BRAND_FILTER_PILLS: { id: CollectionBrandFilter; label: string; logoScale: string }[] = [
  { id: "ALL", label: "All Brands", logoScale: "" },
  { id: "DHT", label: "DHT", logoScale: "scale-[0.82]" },
  { id: "JAGER", label: "JAGER", logoScale: "scale-[0.82]" },
  { id: "THE ONE", label: "THE ONE", logoScale: "scale-[0.76]" },
  { id: "MEKONG", label: "MEKONG", logoScale: "scale-[0.74]" },
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

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    const filterEl = document.getElementById("brand-filter-bar");
    if (filterEl) {
      filterEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  const filteredCollections = useMemo(() => {
    const list = brandScopedItems.filter((item) => {
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) return false;
      if (selectedMaterial !== "ALL" && item.material !== selectedMaterial) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "brand") return a.brand.localeCompare(b.brand);
      return a.featuredOrder - b.featuredOrder;
    });
  }, [brandScopedItems, selectedCategory, selectedMaterial, sortBy]);

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
      image: "/img/pdf-guide/collections/hero-all.jpg?v=2",
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

      <main className="bg-[#FAF6F1] text-[#0B231A] min-h-screen pt-16 lg:pt-[72px]">
        {/* ── 1. DYNAMIC HERO BANNER (Exact Hình 47 Proportions) ── */}
        <section className="relative min-h-[340px] lg:min-h-[390px] flex items-center bg-[#042418] text-white overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[66%] pointer-events-none">
            <img
              key={heroConfig.image}
              src={heroConfig.image}
              alt={heroConfig.title}
              className="w-full h-full object-cover object-center opacity-50 lg:opacity-100 transition-opacity duration-500"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #042418 0%, rgba(4, 36, 24, 0.94) 16%, rgba(4, 36, 24, 0.44) 38%, rgba(4, 36, 24, 0.06) 66%, rgba(4, 36, 24, 0) 100%)",
              }}
            />
          </div>

          <div className="max-w-[1320px] mx-auto w-full px-6 sm:px-8 lg:px-10 py-12 lg:py-14 relative z-10">
            <motion.div
              key={selectedBrand}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-[540px]"
            >
              {selectedBrand === "THE ONE" ? (
                <div className="inline-flex items-center gap-4 mb-4">
                  <BrandLogo brand="THE ONE" variant="light" />
                  <div className="h-10 w-px bg-white/30" />
                  <h1 className="font-display font-bold text-2xl sm:text-3xl text-white whitespace-pre-line leading-tight">
                    {heroConfig.title}
                  </h1>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="h-[1.5px] w-8 bg-[#D8B460]" />
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D8B460]">
                      {heroConfig.badge}
                    </span>
                  </div>
                  <h1 className="font-display font-bold text-white whitespace-pre-line leading-[1.1] tracking-[-0.01em] mb-3.5 text-[34px] sm:text-[42px] lg:text-[48px]">
                    {heroConfig.title}
                  </h1>
                </>
              )}

              <p className="font-body text-[14px] sm:text-[15px] text-white/88 leading-[1.58] max-w-[450px] mb-7">
                {heroConfig.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                {heroConfig.primaryCtaHref.startsWith("#") ? (
                  <a
                    href={heroConfig.primaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full text-[#072318] font-body text-[13.5px] sm:text-[14px] font-bold border border-[#FAE5B3]/65 hover:brightness-105 hover:-translate-y-0.5 transition-all shadow-[0_6px_18px_-4px_rgba(222,168,89,0.5)]"
                    style={{
                      background:
                        "linear-gradient(180deg, #F8DC9F 0%, #E1AD5B 52%, #C98B3B 100%)",
                    }}
                  >
                    <span>{heroConfig.primaryCtaLabel}</span>
                    <ArrowDown size={15} strokeWidth={2.2} />
                  </a>
                ) : (
                  <Link
                    href={heroConfig.primaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full text-[#072318] font-body text-[13.5px] sm:text-[14px] font-bold border border-[#FAE5B3]/65 hover:brightness-105 hover:-translate-y-0.5 transition-all shadow-[0_6px_18px_-4px_rgba(222,168,89,0.5)]"
                    style={{
                      background:
                        "linear-gradient(180deg, #F8DC9F 0%, #E1AD5B 52%, #C98B3B 100%)",
                    }}
                  >
                    <span>{heroConfig.primaryCtaLabel}</span>
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </Link>
                )}

                {heroConfig.secondaryCtaLabel && heroConfig.secondaryCtaHref && (
                  <Link
                    href={heroConfig.secondaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full bg-[#041E14]/50 hover:bg-[#073020]/85 text-white border border-white/75 font-body text-[13.5px] sm:text-[14px] font-medium transition-all backdrop-blur-xs"
                  >
                    <span>{heroConfig.secondaryCtaLabel}</span>
                    <ArrowUpRight size={15} strokeWidth={2} />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. INTERACTIVE BRAND LOGO FILTER BAR + CATEGORY / MATERIAL PILLS (Exact Hình 47) ── */}
        <section id="brand-filter-bar" className="pt-7 pb-6 lg:pt-8 lg:pb-8 scroll-mt-20">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10">
            {/* Row 1: 5 Brand Pills (flush-left, single row on desktop) | 1px Divider | Fixed-Width Category & Material Pills */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-2.5 lg:gap-3">
                {BRAND_FILTER_PILLS.map((pill) => {
                  const isActive = selectedBrand === pill.id;
                  return (
                    <button
                      type="button"
                      key={pill.id}
                      onClick={() => handleSelectBrand(pill.id)}
                      className={`h-[46px] lg:h-[50px] min-w-[108px] sm:min-w-[120px] lg:min-w-[128px] xl:min-w-[144px] px-3.5 xl:px-4 rounded-[10px] border transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer ${isActive
                          ? "bg-[#05281B] text-white border-[#05281B] shadow-[0_6px_16px_-4px_rgba(5,40,27,0.35)]"
                          : "bg-white text-[#0B231A] border-[#E7E0D4] hover:border-[#C89444] shadow-[0_2px_10px_-3px_rgba(14,36,27,0.09)]"
                        }`}
                    >
                      {pill.id === "ALL" ? (
                        <span className="font-body text-[13px] lg:text-[14px] font-semibold tracking-wide whitespace-nowrap">
                          All Brands
                        </span>
                      ) : (
                        <span className={`inline-flex items-center justify-center ${pill.logoScale}`}>
                          <BrandLogo
                            brand={pill.id as BrandId}
                            variant={isActive ? "light" : "color"}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Cluster: Vertical Divider + Fixed-Width Compact Category & Material Pill Dropdowns */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="hidden lg:block w-px h-[36px] bg-[#DDD5C7] mr-1" />

                <div className="relative w-[130px] xl:w-[140px]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    aria-label="Filter by Category"
                    className="w-full h-[42px] pl-4 pr-8 rounded-full bg-[#FBF9F5] border border-[#DDD5C7] hover:border-[#C2833E] font-body text-[13px] font-semibold text-[#0B231A] truncate appearance-none focus:outline-none focus:border-[#B97846] cursor-pointer transition-colors"
                  >
                    <option value="ALL">Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5550] pointer-events-none"
                  />
                </div>

                <div className="relative w-[130px] xl:w-[140px]">
                  <select
                    value={selectedMaterial}
                    onChange={(e) => {
                      setSelectedMaterial(e.target.value);
                      setCurrentPage(1);
                    }}
                    aria-label="Filter by Material"
                    className="w-full h-[42px] pl-4 pr-8 rounded-full bg-[#FBF9F5] border border-[#DDD5C7] hover:border-[#C2833E] font-body text-[13px] font-semibold text-[#0B231A] truncate appearance-none focus:outline-none focus:border-[#B97846] cursor-pointer transition-colors"
                  >
                    <option value="ALL">Material</option>
                    {materialOptions.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5550] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Compact Bold Count Left + Sort By Pill Right (Exact Hình 47) */}
            <div className="pt-5 pb-5 flex flex-wrap items-center justify-between gap-4">
              <p className="font-body font-bold text-[15px] lg:text-[16px] text-[#0B231A]">
                {filteredCollections.length}{" "}
                {selectedBrand === "ALL" ? "Collections Found" : "Collections"}
              </p>

              <div className="flex items-center gap-2.5">
                <span className="font-body text-[13px] text-[#4A5550]">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "featured" | "name" | "brand")
                    }
                    className="h-[38px] pl-4 pr-9 rounded-full bg-white border border-[#DDD5C7] hover:border-[#C2833E] font-body text-[13px] font-bold text-[#0B231A] appearance-none focus:outline-none focus:border-[#B97846] cursor-pointer transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Collection Name (A–Z)</option>
                    <option value="brand">Brand</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5550] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* ── 3. COLLECTIONS 3×3 GRID (Hình 47–51) ── */}
            {filteredCollections.length === 0 ? (
              <div className="rounded-[14px] bg-white border border-[#E4DDD0] py-14 px-6 text-center">
                <p className="font-display font-bold text-xl text-[#0B231A] mb-2">
                  No collections match your selected filters
                </p>
                <p className="font-body text-sm text-[#4A5550] mb-5">
                  Try clearing Category or Material filters to explore all curated collections.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedMaterial("ALL");
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#05281B] text-white font-body text-xs font-bold uppercase tracking-wider hover:bg-[#0B3B28] transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Consistent 3-Column Grid across all brands & filters (even when 1–2 items remain on a row) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[22px]">
                {displayedCollections.map((item, idx) => (
                  <CollectionCardItem
                    key={item.id}
                    item={item}
                    index={idx}
                    allBrandsMode={selectedBrand === "ALL" && safePage === 1}
                  />
                ))}
              </div>
            )}

            {/* ── 4. PAGINATION BAR (Centered Clean Squares matching Hình 47) ── */}
            {selectedBrand === "ALL" && totalPages > 1 && (
              <div className="mt-9 flex items-center justify-center gap-2 font-body text-[13px]">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="w-9 h-9 rounded-[8px] bg-white border border-[#E3DBD0] text-[#0B231A] flex items-center justify-center hover:border-[#B97846] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const p = idx + 1;
                  const isCurrent = safePage === p;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-9 h-9 rounded-[8px] border font-bold flex items-center justify-center transition-all cursor-pointer ${isCurrent
                          ? "bg-[#06291B] text-white border-[#06291B] shadow-xs"
                          : "bg-white text-[#0B231A] border-[#E3DBD0] hover:border-[#B97846]"
                        }`}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="w-9 h-9 rounded-[8px] bg-white border border-[#E3DBD0] text-[#0B231A] flex items-center justify-center hover:border-[#B97846] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── 5. DYNAMIC BOTTOM PRIVATE COLLECTION ACCESS BANNER (Exact Hình 47 Sleek Bar) ── */}
        <section className="pt-4 pb-14 lg:pt-6 lg:pb-[60px]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="relative rounded-[16px] overflow-hidden bg-gradient-to-r from-[#032316] via-[#052C1D] to-[#032115] text-white px-7 py-6 sm:px-9 lg:px-10 lg:py-[24px] shadow-[0_12px_30px_-8px_rgba(3,28,19,0.38)]"
            >
              {/* Subtle Velvet Golden Silk Wave Accents */}
              <svg
                viewBox="0 0 1200 130"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="col-pca-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D8B460" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#D8B460" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,68 C 36,96 76,120 118,130 L 0,130 Z"
                  fill="url(#col-pca-gold)"
                  opacity="0.38"
                />
                <path
                  d="M 1020,130 C 1095,112 1158,76 1200,36 L 1200,130 Z"
                  fill="#0D4731"
                  opacity="0.55"
                />
              </svg>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-7">
                {/* Left: Bare Gold Icon + Title */}
                <div className="flex items-center gap-4 lg:gap-5 shrink-0">
                  {selectedBrand === "MEKONG" || selectedBrand === "ALL" ? (
                    <Layers size={44} strokeWidth={1.35} className="text-[#E6BF69] shrink-0" />
                  ) : (
                    <Armchair size={44} strokeWidth={1.35} className="text-[#E6BF69] shrink-0" />
                  )}
                  <div>
                    <span className="font-body text-[11px] lg:text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#E6BF69] block mb-0.5">
                      {selectedBrand === "ALL"
                        ? "PRIVATE COLLECTION ACCESS"
                        : `EXPLORE MORE FROM ${selectedBrand}`}
                    </span>
                    <h3 className="font-display font-bold text-[23px] sm:text-[26px] lg:text-[29px] text-white leading-tight whitespace-nowrap">
                      {selectedBrand === "ALL"
                        ? "Request Our Full Collections"
                        : `Request ${selectedBrand} Catalogue`}
                    </h3>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden lg:block h-[54px] w-px bg-white/25 shrink-0" />

                {/* Middle Copy */}
                <p className="font-body text-[13px] lg:text-[14px] text-white/90 text-center lg:text-left leading-[1.52] max-w-[390px]">
                  {selectedBrand === "ALL"
                    ? "Access the complete catalogue of our four brands and curated collections, tailored to your market needs."
                    : selectedBrand === "MEKONG"
                      ? "Get the complete MEKONG catalogue with full panel ranges and specifications."
                      : `Get the complete ${selectedBrand} catalogue with full collections and product specifications.`}
                </p>

                {/* Right Metallic Champagne-Gold Pill CTA */}
                <Link
                  href={
                    selectedBrand === "ALL"
                      ? "/contact?inquiry=catalogue#smart-contact-form"
                      : `/contact?inquiry=catalogue&brand=${encodeURIComponent(
                        selectedBrand
                      )}#smart-contact-form`
                  }
                  className="shrink-0 inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-full text-[#072318] font-body text-[13.5px] lg:text-[14px] font-bold border border-[#FAE5B3]/75 hover:brightness-105 hover:-translate-y-0.5 transition-all shadow-[0_6px_18px_-3px_rgba(222,168,89,0.5),inset_0_1px_1px_rgba(255,255,255,0.55)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F9DF9F 0%, #E2AF5B 52%, #C98B3B 100%)",
                  }}
                >
                  <span>
                    {selectedBrand === "ALL"
                      ? "Request Collection Access"
                      : "Request Catalogue"}
                  </span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </motion.div>
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
      ? "/img/pdf-guide/collections/jager-willow-dining.jpg?v=2"
      : item.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.045 }}
      className="group h-full rounded-[14px] bg-[#FAF7F2] border border-[#E4DDD0] hover:border-[#C2833E] overflow-hidden shadow-[0_3px_12px_-4px_rgba(95,78,58,0.10)] hover:shadow-[0_12px_24px_-6px_rgba(14,36,27,0.13)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Collection Image + Authentic Brand Corner Badge */}
      <div className="relative aspect-[16/9.6] w-full overflow-hidden bg-[#EAE4D7]">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
        />
        <div className="absolute top-2.5 left-2.5 shadow-sm">
          <BrandLogo brand={item.brand} variant="badge" />
        </div>
      </div>

      {/* Compact Crisp Card Body */}
      <div className="px-5 pt-3.5 pb-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-display font-bold text-[17px] lg:text-[18.5px] text-[#0B231A] leading-snug mb-1.5">
            {displayTitle}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-[12px] font-body text-[#48524D] mb-3">
            <span className="inline-flex items-center gap-1.5">
              {item.brand === "MEKONG" ? (
                <Layers size={13.5} strokeWidth={1.6} className="text-[#6F6A62]" />
              ) : item.brand === "THE ONE" ? (
                <Briefcase size={13.5} strokeWidth={1.6} className="text-[#6F6A62]" />
              ) : (
                <Armchair size={13.5} strokeWidth={1.6} className="text-[#6F6A62]" />
              )}
              <span>{item.category}</span>
            </span>
            <span className="text-[#CFC7B9]">|</span>
            <span className="inline-flex items-center gap-1.5">
              {item.brand === "MEKONG" ? (
                <Layers size={13.5} strokeWidth={1.6} className="text-[#6F6A62]" />
              ) : (
                <Trees size={13.5} strokeWidth={1.6} className="text-[#6F6A62]" />
              )}
              <span>{item.material}</span>
            </span>
          </div>
        </div>

        <Link
          href={`/contact?inquiry=quotation&brand=${encodeURIComponent(
            item.brand
          )}&collection=${encodeURIComponent(displayTitle)}#smart-contact-form`}
          className="inline-flex items-center gap-2 font-body text-[12.5px] lg:text-[13px] font-bold text-[#944E1B] hover:text-[#0B231A] transition-colors pt-2.5 border-t border-[#EEE8DC]"
        >
          <ImageIcon size={14} strokeWidth={1.7} className="text-[#A85D24] shrink-0" />
          <span>Inquire About This Collection</span>
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
}
