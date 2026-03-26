import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, ArrowUpRight, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { productsData } from "@/data/products";
import { OUTDOOR_CATEGORIES, INDOOR_CATEGORIES, MATERIALS, MOQ_OPTIONS, COLORS, STYLES } from "@/domains/product/product.types";
import type { Product, FilterState, Collection } from "@/domains/product/product.types";

function getOptionTranslation(t: any, key: string, opt: string) {
  if (key === 'moq') {
    if (opt === 'Under 10') return t('catalogue.moqOptions.under10');
    if (opt === '10–50') return t('catalogue.moqOptions.10to50');
    if (opt === '50–100') return t('catalogue.moqOptions.50to100');
    if (opt === '100+') return t('catalogue.moqOptions.100plus');
  }
  if (key === 'color') {
    const cKey = opt.charAt(0).toLowerCase() + opt.replace(/\s+/g, '').slice(1);
    const trans = t(`catalogue.colorOptions.${cKey}`);
    return trans !== `catalogue.colorOptions.${cKey}` ? trans : opt;
  }
  if (key === 'style') {
    const sKey = opt.charAt(0).toLowerCase() + opt.replace(/\s+/g, '').slice(1);
    const trans = t(`catalogue.styleOptions.${sKey}`);
    return trans !== `catalogue.styleOptions.${sKey}` ? trans : opt;
  }
  return opt;
}

/* ── Hero Slider ── */
function HeroSlider({ products, onQuickView }: { products: Product[]; onQuickView: (p: Product) => void }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const featured = products.slice(0, 5);

  const goTo = useCallback((i: number) => setCurrent((i + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    if (featured.length === 0) return;
    const safeCurrent = current >= featured.length ? 0 : current;
    if (safeCurrent !== current) setCurrent(safeCurrent);
    
    timerRef.current = setInterval(() => goTo(safeCurrent + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [current, goTo, featured.length]);

  if (!featured.length) return null;
  const safeCurrent = current >= featured.length ? 0 : current;
  const p = featured[safeCurrent];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px", backgroundColor: "hsl(var(--navy-deep))" }}>
      <AnimatePresence mode="wait">
        <motion.div key={p.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6 }} className="absolute inset-0">
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(var(--navy-deep)) 35%, transparent 80%)" }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-10">
          <AnimatePresence mode="wait">
            <motion.div key={p.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5 }} className="max-w-md">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-medium mb-3 block" style={{ color: "hsl(var(--orange))" }}>{p.category} — {p.code}</span>
              <h2 className="font-display font-bold text-white text-4xl leading-tight mb-3">{p.name}</h2>
              <p className="font-body text-white/50 text-sm mb-1">{p.material} · {p.color}</p>
              <p className="font-body text-white/40 text-sm mb-6">{p.style} {p.moq && `· MOQ: ${p.moq}`}</p>
              <div className="flex gap-3">
                <button onClick={() => onQuickView(p)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-sm text-white hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(var(--orange))" }}>
                  <Eye size={15} /> {t("catalogue.quickView")}
                </button>
                <Link href={`/contact?product=${encodeURIComponent(p.name)}&code=${p.code}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-all">
                  {t("catalogue.inquire")} <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
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
function SidebarFilter({ collection, handleCollectionChange, filters, toggleFilter, clearFilters, activeCount, filterGroups }: {
  collection: Collection;
  handleCollectionChange: (c: Collection) => void;
  filters: FilterState;
  toggleFilter: (key: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  activeCount: number;
  filterGroups: { key: keyof FilterState; label: string; options: string[] }[];
}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ category: true, material: true, moq: true, color: false, style: false });

  return (
    <aside className="w-full space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">{t("catalogue.filters")}</h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="font-body text-xs font-medium hover:underline" style={{ color: "hsl(var(--orange))" }}>{t("catalogue.clearAll")} ({activeCount})</button>
        )}
      </div>

      <div className="border-b border-border pb-4 mb-2">
        <p className="font-body font-semibold text-sm text-foreground mb-3">{t("catalogue.collection")}</p>
        <div className="space-y-2.5">
          {(["Outdoor", "Indoor"] as Collection[]).map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" checked={collection === c} onChange={() => handleCollectionChange(c)} className="w-4 h-4 accent-orange outline-none" style={{ accentColor: "hsl(var(--orange))" }} />
              <span className={`font-body text-sm transition-colors ${collection === c ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                {c === "Outdoor" ? t("catalogue.outdoorCollection") : t("catalogue.indoorCollection")}
              </span>
            </label>
          ))}
        </div>
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
                    const displayOpt = getOptionTranslation(t, key, opt);
                    const checked = filters[key].includes(opt);
                    return (
                      <label key={opt} className="flex items-center gap-2.5 cursor-pointer group py-0.5 px-1 rounded hover:bg-muted/50 transition-colors">
                        <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleFilter(key, opt)} />
                        <span className={`w-4 h-4 rounded-[3px] border-2 flex items-center justify-center transition-all ${checked ? "border-orange bg-orange" : "border-border group-hover:border-muted-foreground"}`} style={checked ? { borderColor: "hsl(var(--orange))", backgroundColor: "hsl(var(--orange))" } : {}}>
                          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>
                        <span className={`font-body text-sm transition-colors ${checked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>{displayOpt}</span>
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
  const { t } = useTranslation();
  
  const [collection, setCollection] = useState<Collection>("Outdoor");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({ category: [], material: [], moq: [], color: [], style: [] });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const filterGroups: { key: keyof FilterState; label: string; options: string[] }[] = [
    { key: "category", label: t("catalogue.category"), options: collection === "Outdoor" ? OUTDOOR_CATEGORIES : INDOOR_CATEGORIES },
    { key: "material", label: t("catalogue.material"), options: MATERIALS },
    { key: "moq", label: t("catalogue.moq"), options: MOQ_OPTIONS },
    { key: "color", label: t("catalogue.color"), options: COLORS },
    { key: "style", label: t("catalogue.style"), options: STYLES },
  ];

  const [initialized, setInitialized] = useState(false);

  // 1. Read from URL on mount
  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query;
    
    let initCol: Collection = "Outdoor";
    if (q.collection === "Indoor" || q.collection === "Outdoor") {
      initCol = q.collection as Collection;
    }
    
    const initFilters: FilterState = { category: [], material: [], moq: [], color: [], style: [] };
    
    // Parse array filters
    ['category', 'material', 'moq', 'color', 'style'].forEach((key) => {
      const val = q[key];
      if (val) {
        if (typeof val === 'string') initFilters[key as keyof FilterState] = val.split(',');
        else if (Array.isArray(val)) initFilters[key as keyof FilterState] = val;
      }
    });

    // Auto-switch collection if category belongs to a specific collection
    if (initFilters.category.length > 0) {
      const firstCat = initFilters.category[0];
      if (OUTDOOR_CATEGORIES.includes(firstCat)) initCol = "Outdoor";
      else if (INDOOR_CATEGORIES.includes(firstCat)) initCol = "Indoor";
    }

    setCollection(initCol);
    setFilters(initFilters);
    if (q.search && typeof q.search === "string") setSearch(q.search);
    if (q.page && typeof q.page === "string") {
      const parsedPage = parseInt(q.page, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) setPage(parsedPage);
    }
    
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // 2. Write to URL when state changes
  useEffect(() => {
    if (!initialized) return;

    const query: Record<string, string> = {};
    if (collection !== "Outdoor") query.collection = collection;
    if (search) query.search = search;
    if (page > 1) query.page = page.toString();
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        query[key] = values.join(',');
      }
    });

    // Check if the query is actually different from the current URL to avoid cancelling Next.js scroll-to-top
    const currentQueryRaw = { ...router.query };
    delete currentQueryRaw.slug; // clean up if any dynamic route slugs leaked (though index.tsx doesn't have them)
    
    // Sort keys to ensure stable stringify or URLSearchParams
    const newQueryString = new URLSearchParams(query).toString();
    const currentQueryString = new URLSearchParams(currentQueryRaw as any).toString();

    if (newQueryString !== currentQueryString) {
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, search, filters, page, initialized, router.pathname]);

  const handleCollectionChange = (newCollection: Collection) => {
    setCollection(newCollection);
    setFilters(prev => ({ ...prev, category: [] })); 
    setPage(1);
  };

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v: string) => v !== value) : [...arr, value] };
    });
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: [], material: [], moq: [], color: [], style: [] });
    setSearch("");
    setPage(1);
  };

  const activeCount = Object.values(filters).flat().length + (search ? 1 : 0);

  // 1. Filter by Collection first
  let collectionProducts = productsData.filter(p => p.collection === collection);

  // 2. Then apply text search and facet filters
  let filtered = collectionProducts.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.code.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    if (filters.moq.length && (!p.moq || !filters.moq.includes(p.moq))) return false;
    if (filters.color.length && (!p.color || !filters.color.includes(p.color))) return false;
    if (filters.style.length && (!p.style || !filters.style.includes(p.style))) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <>
      <Head>
        <title>{t("catalogue.seo.title")}</title>
        <meta name="description" content={t("catalogue.seo.description")} />
      </Head>

      <div className="pt-[64px]" style={{ backgroundColor: "hsl(var(--warm-cream))", minHeight: "100vh" }}>
        <div className="hidden lg:block">
          <HeroSlider products={collectionProducts} onQuickView={setQuickViewProduct} />
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder={t("catalogue.searchPlaceholder")} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-10 pr-4 py-3 rounded-sm bg-white border border-border font-body text-sm outline-none focus:ring-2 transition-shadow" style={{ "--tw-ring-color": "hsl(var(--orange)/0.3)" } as React.CSSProperties} />
            </div>
            <button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="lg:hidden flex items-center gap-2 px-5 py-3 rounded-sm bg-white border border-border font-body text-sm font-medium hover:bg-muted transition-colors">
              <SlidersHorizontal size={15} /> {t("catalogue.filters")} {activeCount > 0 && <span className="w-5 h-5 rounded-full text-xs text-white flex items-center justify-center" style={{ backgroundColor: "hsl(var(--orange))" }}>{activeCount}</span>}
            </button>
          </div>

          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-6 lg:hidden">
                <div className="p-6 bg-white rounded-sm border border-border">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="font-body font-semibold text-sm mb-3 text-foreground">{t("catalogue.collection")}</p>
                      <div className="space-y-2">
                        {(["Outdoor", "Indoor"] as Collection[]).map((c) => (
                          <label key={c} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" checked={collection === c} onChange={() => handleCollectionChange(c)} className="accent-orange w-4 h-4 outline-none" style={{ accentColor: "hsl(var(--orange))" }} />
                            <span className={`font-body text-sm transition-colors ${collection === c ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                              {c === "Outdoor" ? t("catalogue.outdoorCollection") : t("catalogue.indoorCollection")}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {filterGroups.map(({ key, label, options }) => (
                      <div key={key}>
                        <p className="font-body font-semibold text-sm mb-3 text-foreground">{label}</p>
                        <div className="space-y-2">
                          {options.map((opt) => {
                            const displayOpt = getOptionTranslation(t, key, opt);
                            return (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" checked={filters[key].includes(opt)} onChange={() => toggleFilter(key, opt)} className="accent-orange w-4 h-4" />
                                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{displayOpt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-8">
            <div className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24 bg-white rounded-sm border border-border p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <SidebarFilter collection={collection} handleCollectionChange={handleCollectionChange} filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} activeCount={activeCount} filterGroups={filterGroups} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {activeCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(filters).map(([key, values]) =>
                    (values as string[]).map((val: string) => {
                      const displayVal = getOptionTranslation(t, key, val);
                      return (
                      <button key={`${key}-${val}`} onClick={() => toggleFilter(key as keyof FilterState, val)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-border font-body text-xs font-medium text-foreground hover:border-red-300 hover:text-red-500 transition-colors group">
                        {displayVal} <X size={12} className="text-muted-foreground group-hover:text-red-500" />
                      </button>
                      );
                    })
                  )}
                  <button onClick={clearFilters} className="inline-flex items-center gap-1 px-3 py-1.5 font-body text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">{t("catalogue.clearAll")}</button>
                </div>
              )}

              {filtered.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginated.map((p, i) => (<ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 mb-8 flex items-center justify-center gap-2 font-body text-sm">
                      <button onClick={() => { setPage(1); window.scrollTo({ top: 300, behavior: 'smooth' }); }} disabled={safePage === 1} className="w-8 h-8 flex items-center justify-center rounded-sm border border-border disabled:opacity-50 hover:bg-muted transition-colors disabled:cursor-not-allowed text-muted-foreground hover:text-foreground" title="First">«</button>
                      <button onClick={() => { setPage(safePage - 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }} disabled={safePage === 1} className="w-8 h-8 flex items-center justify-center rounded-sm border border-border disabled:opacity-50 hover:bg-muted transition-colors disabled:cursor-not-allowed text-muted-foreground hover:text-foreground" title="Previous">‹</button>

                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const p = idx + 1;
                        if (p === 1 || p === totalPages || (p >= safePage - 1 && p <= safePage + 1)) {
                          return (
                            <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className={`w-8 h-8 flex items-center justify-center rounded-sm border transition-colors ${safePage === p ? 'bg-orange outline-none text-white border-orange shadow-md' : 'border-border text-foreground hover:bg-muted'}`} style={safePage === p ? { backgroundColor: 'hsl(var(--orange))', borderColor: 'hsl(var(--orange))' } : {}}>
                              {p}
                            </button>
                          );
                        }
                        if (p === 2 && safePage > 3) return <span key={`dots-start-${p}`} className="px-1 text-muted-foreground">...</span>;
                        if (p === totalPages - 1 && safePage < totalPages - 2) return <span key={`dots-end-${p}`} className="px-1 text-muted-foreground">...</span>;
                        return null;
                      })}

                      <button onClick={() => { setPage(safePage + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }} disabled={safePage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-sm border border-border disabled:opacity-50 hover:bg-muted transition-colors disabled:cursor-not-allowed text-muted-foreground hover:text-foreground" title="Next">›</button>
                      <button onClick={() => { setPage(totalPages); window.scrollTo({ top: 300, behavior: 'smooth' }); }} disabled={safePage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-sm border border-border disabled:opacity-50 hover:bg-muted transition-colors disabled:cursor-not-allowed text-muted-foreground hover:text-foreground" title="Last">»</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="font-body text-muted-foreground text-lg mb-2">{t("catalogue.noResults")}</p>
                  <button onClick={clearFilters} className="font-body text-sm font-medium" style={{ color: "hsl(var(--orange))" }}>{t("catalogue.clearAllFilters")}</button>
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
