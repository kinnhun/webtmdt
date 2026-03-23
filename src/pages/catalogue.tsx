import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, ArrowUpRight, Eye } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { productsData } from "@/data/products";
import { CATEGORIES, MATERIALS, COLORS, SIZES, STYLES } from "@/domains/product/product.types";
import type { Product, FilterState } from "@/domains/product/product.types";

const filterGroups = [
  { key: "category" as const, label: "Category", options: CATEGORIES },
  { key: "material" as const, label: "Material", options: MATERIALS },
  { key: "color" as const, label: "Color", options: COLORS },
  { key: "size" as const, label: "Size", options: SIZES },
  { key: "style" as const, label: "Style", options: STYLES },
];

/* ── Hero Slider ── */
function HeroSlider({ products, onQuickView }: { products: Product[]; onQuickView: (p: Product) => void }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const featured = products.slice(0, 5);

  const goTo = useCallback((i: number) => setCurrent((i + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [current, goTo]);

  if (!featured.length) return null;
  const p = featured[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px", backgroundColor: "hsl(var(--navy-deep))" }}>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6 }} className="absolute inset-0">
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(var(--navy-deep)) 35%, transparent 80%)" }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-10">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5 }} className="max-w-md">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-medium mb-3 block" style={{ color: "hsl(var(--orange))" }}>{p.category} — {p.code}</span>
              <h2 className="font-display font-bold text-white text-4xl leading-tight mb-3">{p.name}</h2>
              <p className="font-body text-white/50 text-sm mb-1">{p.material} · {p.color} · {p.size}</p>
              <p className="font-body text-white/40 text-sm mb-6">{p.style}</p>
              <div className="flex gap-3">
                <button onClick={() => onQuickView(p)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-sm text-white hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(var(--orange))" }}>
                  <Eye size={15} /> Quick View
                </button>
                <Link href={`/contact?product=${encodeURIComponent(p.name)}&code=${p.code}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-all">
                  Inquire <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Nav */}
      <div className="absolute bottom-5 right-6 flex items-center gap-3 z-10">
        <button onClick={() => goTo(current - 1)} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all"><ChevronLeft size={18} /></button>
        <div className="flex gap-1.5">
          {featured.map((_, i) => (<button key={i} onClick={() => goTo(i)} className="w-2 h-2 rounded-full transition-all" style={{ backgroundColor: i === current ? "hsl(var(--orange))" : "rgba(255,255,255,0.3)", transform: i === current ? "scale(1.3)" : "scale(1)" }} />))}
        </div>
        <button onClick={() => goTo(current + 1)} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}

/* ── Sidebar Filter ── */
function SidebarFilter({ filters, toggleFilter, clearFilters, activeCount }: {
  filters: FilterState;
  toggleFilter: (key: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  activeCount: number;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ category: true, material: true, color: false, size: false, style: false });

  return (
    <aside className="w-full space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="font-body text-xs font-medium hover:underline" style={{ color: "hsl(var(--orange))" }}>Clear all ({activeCount})</button>
        )}
      </div>
      {filterGroups.map(({ key, label, options }) => (
        <div key={key} className="border-b border-border">
          <button onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))} className="w-full flex items-center justify-between py-3.5 font-body text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors">
            {label}
            {filters[key].length > 0 && <span className="w-5 h-5 rounded-full text-xs text-white flex items-center justify-center mr-1" style={{ backgroundColor: "hsl(var(--orange))" }}>{filters[key].length}</span>}
            <ChevronRight size={14} className={`transition-transform duration-200 text-muted-foreground ml-auto ${expanded[key] ? "rotate-90" : ""}`} />
          </button>
          <AnimatePresence>
            {expanded[key] && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <div className="pb-3 space-y-1.5">
                  {options.map((opt) => {
                    const checked = filters[key].includes(opt);
                    return (
                      <label key={opt} className="flex items-center gap-2.5 cursor-pointer group py-0.5 px-1 rounded hover:bg-muted/50 transition-colors">
                        <span className={`w-4 h-4 rounded-[3px] border-2 flex items-center justify-center transition-all ${checked ? "border-orange bg-orange" : "border-border group-hover:border-muted-foreground"}`} style={checked ? { borderColor: "hsl(var(--orange))", backgroundColor: "hsl(var(--orange))" } : {}}>
                          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>
                        <span className={`font-body text-sm transition-colors ${checked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}

/* ── Main Page ── */
export default function CataloguePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({ category: [], material: [], color: [], size: [], style: [] });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const q = router.query;
    if (q.category && typeof q.category === "string") {
      setFilters((prev) => ({ ...prev, category: [q.category as string] }));
    }
    if (q.search && typeof q.search === "string") {
      setSearch(q.search);
    }
  }, [router.query]);

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const clearFilters = () => {
    setFilters({ category: [], material: [], color: [], size: [], style: [] });
    setSearch("");
  };

  const activeCount = Object.values(filters).flat().length + (search ? 1 : 0);

  let filtered = productsData.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.code.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    if (filters.color.length && !filters.color.includes(p.color)) return false;
    if (filters.size.length && !filters.size.includes(p.size)) return false;
    if (filters.style.length && !filters.style.includes(p.style)) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Head>
        <title>Catalogue — DHT Outdoor Furniture</title>
        <meta name="description" content="Browse our full collection of premium outdoor furniture." />
      </Head>

      <div className="pt-[64px]" style={{ backgroundColor: "hsl(var(--warm-cream))", minHeight: "100vh" }}>
        {/* Hero Slider — desktop only, full-width right below header */}
        <div className="hidden lg:block">
          <HeroSlider products={filtered} onQuickView={setQuickViewProduct} />
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Search Bar + Mobile Filter Button */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search by name, code, or category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-sm bg-white border border-border font-body text-sm outline-none focus:ring-2 transition-shadow" style={{ "--tw-ring-color": "hsl(var(--orange)/0.3)" } as React.CSSProperties} />
            </div>
            <button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="lg:hidden flex items-center gap-2 px-5 py-3 rounded-sm bg-white border border-border font-body text-sm font-medium hover:bg-muted transition-colors">
              <SlidersHorizontal size={15} /> Filters {activeCount > 0 && <span className="w-5 h-5 rounded-full text-xs text-white flex items-center justify-center" style={{ backgroundColor: "hsl(var(--orange))" }}>{activeCount}</span>}
            </button>
          </div>

          {/* Mobile filters dropdown */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-6 lg:hidden">
                <div className="p-6 bg-white rounded-sm border border-border">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {filterGroups.map(({ key, label, options }) => (
                      <div key={key}>
                        <p className="font-body font-semibold text-sm mb-3 text-foreground">{label}</p>
                        <div className="space-y-2">
                          {options.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                              <input type="checkbox" checked={filters[key].includes(opt)} onChange={() => toggleFilter(key, opt)} className="accent-orange w-4 h-4" />
                              <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop: Sidebar + Grid  |  Mobile: Grid only */}
          <div className="flex gap-8">
            {/* Sidebar — desktop only */}
            <div className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24 bg-white rounded-sm border border-border p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <SidebarFilter filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} activeCount={activeCount} />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Active filter chips */}
              {activeCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(filters).map(([key, values]) =>
                    (values as string[]).map((val: string) => (
                      <button key={`${key}-${val}`} onClick={() => toggleFilter(key as keyof FilterState, val)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-border font-body text-xs font-medium text-foreground hover:border-red-300 hover:text-red-500 transition-colors group">
                        {val} <X size={12} className="text-muted-foreground group-hover:text-red-500" />
                      </button>
                    ))
                  )}
                  <button onClick={clearFilters} className="inline-flex items-center gap-1 px-3 py-1.5 font-body text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">Clear all</button>
                </div>
              )}

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {filtered.map((p, i) => (<ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-body text-muted-foreground text-lg mb-2">No products match your filters</p>
                  <button onClick={clearFilters} className="font-body text-sm font-medium" style={{ color: "hsl(var(--orange))" }}>Clear all filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
