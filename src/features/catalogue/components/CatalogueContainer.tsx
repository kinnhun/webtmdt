import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import type { FilterState, Collection } from "@/domains/product/product.types";
import { useCatalogue } from "../hooks/useCatalogue";
import { HeroSlider } from "./HeroSlider";
import { SidebarFilter } from "./SidebarFilter";
import { getOptionTranslation } from "../utils/translations";

export default function CatalogueContainer() {
  const {
    collection,
    search,
    setSearch,
    filters,
    quickViewProduct,
    setQuickViewProduct,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    page,
    setPage,
    handleCollectionChange,
    toggleFilter,
    clearFilters,
    activeCount,
    collectionProducts,
    filtered,
    paginated,
    totalPages,
    safePage,
    filterGroups,
    t
  } = useCatalogue();

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
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <span className="font-body text-sm font-medium text-foreground">
                  {t("catalogue.productsFound", { count: filtered.length })}
                </span>
              </div>

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
