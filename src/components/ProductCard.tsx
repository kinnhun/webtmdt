import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domains/product/product.types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden bg-beige aspect-[4/3]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button onClick={() => onQuickView(product)} className="flex items-center gap-2 px-4 py-2 bg-white rounded font-body text-sm font-medium text-foreground shadow-md transition-all duration-200" style={{ }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'hsl(var(--orange))'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = ''; }}>
            <Eye size={15} /> {t("product.quickView")}
          </button>
        </div>
        <span className="absolute top-3 left-3 text-xs font-body font-medium px-2.5 py-1 rounded-sm" style={{ backgroundColor: "hsl(var(--orange))", color: "white" }}>{product.category}</span>
      </div>
      <div className="p-4">
        <p className="font-body text-xs text-muted-foreground mb-1">{product.code}</p>
        <h3 className="font-display text-base font-semibold text-foreground leading-tight mb-2">{product.name}</h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[product.material, product.style].map((tag) => (
            <span key={tag} className="text-xs font-body px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">{tag}</span>
          ))}
        </div>
        <button
          onClick={() => onQuickView(product)}
          className="w-full py-2.5 rounded font-body text-sm font-semibold text-white transition-all duration-200"
          style={{ backgroundColor: "hsl(var(--orange))" }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px hsl(var(--orange)/0.35)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          {t("product.viewDetails")}
        </button>
      </div>
    </motion.div>
  );
}
