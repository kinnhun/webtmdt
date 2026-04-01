import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";
import QuickViewModal from "@/components/QuickViewModal";
import { featuredProductsData } from "@/data/products";
import type { Product } from "@/domains/product/product.types";

const FILTER_KEYS = ["Outdoor Sofas", "Dining Sets", "Lounge & Daybeds", "Tables", "Chairs"] as const;

const FILTER_I18N: Record<string, string> = {
  "Outdoor Sofas": "home.featured.filterOutdoorSofas",
  "Dining Sets": "home.featured.filterDiningSets",
  "Lounge & Daybeds": "home.featured.filterLoungeDaybeds",
  "Tables": "home.featured.filterTables",
  "Chairs": "home.featured.filterChairs",
};

function EditorialProductCard({ product, index, onQuickView }: { product: Product; index: number; onQuickView: (p: Product) => void }) {
  const { t } = useTranslation();

  return (
    <motion.div layout initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} className="group cursor-pointer" onClick={() => onQuickView(product)}>
      <div className="relative overflow-hidden rounded-sm aspect-3/4 mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-500" style={{ backgroundColor: "hsl(var(--warm-beige))" }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out" loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 px-5 py-3 rounded-sm font-body font-semibold text-sm text-white shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-350" style={{ backgroundColor: "hsl(var(--orange))" }}>
            <Eye size={15} /> {t("product.quickView")}
          </div>
        </div>
        <span className="absolute top-3 left-3 font-body text-xs font-medium px-2.5 py-1 rounded-sm text-white backdrop-blur-sm" style={{ backgroundColor: "hsl(var(--navy-deep)/0.8)" }}>{product.category}</span>
        {index === 0 && (
          <span className="absolute top-3 right-3 flex items-center gap-1 font-body text-xs font-semibold px-2.5 py-1 rounded-sm text-white" style={{ backgroundColor: "hsl(var(--orange))" }}>
            <Sparkles size={10} /> {t("home.featured.new")}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="font-body text-xs tracking-wider" style={{ color: "hsl(var(--orange))" }}>{product.code}</p>
        <h3 className="font-display font-semibold text-base leading-snug transition-colors duration-200" style={{ color: "hsl(var(--navy-deep))" }}>{product.name}</h3>
        <div className="flex items-center justify-between pt-0.5">
          <span className="font-body text-xs text-muted-foreground">{product.material} · {product.style}</span>
          <span className="font-body text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "hsl(var(--orange))" }}>{t("home.featured.inquire")} <ArrowRight size={11} /></span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState("Outdoor Sofas");

  const filtered = featuredProductsData.filter(p => p.category === activeFilter);
  const targetUrl = `/catalogue?category=${encodeURIComponent(activeFilter)}`;

  return (
    <section className="py-16 sm:py-28" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("home.featured.label")}</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "hsl(var(--navy-deep))" }}>{t("home.featured.heading")}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="font-body text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 max-w-md leading-relaxed">{t("home.featured.description")}</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="shrink-0">
              <Link href={targetUrl} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 hover:gap-3" style={{ backgroundColor: "hsl(var(--navy))" }}>{t("home.featured.fullCatalogue")} <ArrowRight size={15} /></Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35 }} className="flex flex-wrap gap-2.5 mb-8 sm:mb-10">
            {FILTER_KEYS.map((f) => {
              const isActive = activeFilter === f;
              const count = featuredProductsData.filter(p => p.category === f).length;
              if (count === 0) return null;
              return (
                <button key={f} onClick={() => setActiveFilter(f)} className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap shrink-0" style={isActive ? { backgroundColor: "hsl(var(--navy-deep))", color: "#fff", boxShadow: "0 4px 14px hsl(var(--navy-deep)/0.25)" } : { backgroundColor: "hsl(var(--warm-beige))", color: "hsl(var(--navy-deep))", border: "1px solid hsl(var(--warm-beige))" }}>
                  {t(FILTER_I18N[f])}
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[10px] font-bold" style={isActive ? { backgroundColor: "hsl(var(--orange))", color: "#fff" } : { backgroundColor: "hsl(var(--navy-deep)/0.12)", color: "hsl(var(--navy-deep)/0.8)" }}>{count}</span>
                </button>
              );
            })}
          </motion.div>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-10 md:gap-x-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (<EditorialProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20"><p className="font-body text-muted-foreground">{t("home.featured.noProducts")}</p></motion.div>)}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center mt-16">
            <Link href={targetUrl} className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-sm font-body font-semibold text-sm overflow-hidden transition-all duration-300 border-2" style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))" }}>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <span className="relative z-10 group-hover:text-white transition-colors duration-200 flex items-center gap-3">{t("home.featured.seeAllProducts")} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" /></span>
            </Link>
          </motion.div>
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}

