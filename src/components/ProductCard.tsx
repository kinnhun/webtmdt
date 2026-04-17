import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domains/product/product.types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  const pName = product.name?.[langId] || product.name?.us || "";
  const pCategory = product.category?.[langId] || product.category?.us || "";
  const pMaterial = product.material?.[langId] || product.material?.us || "";
  const pStyle = product.style?.[langId] || product.style?.us || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden bg-beige aspect-4/3">
        {product.image ? (
          <Image src={product.image} alt={pName} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded font-body text-sm font-medium text-foreground shadow-md transition-all duration-200 hover:bg-[hsl(var(--orange))] hover:text-white"
          >
            <Eye size={15} /> {t("product.quickView")}
          </button>
        </div>
        <span className="absolute top-3 left-3 text-xs font-body font-medium px-2.5 py-1 rounded-sm truncate max-w-[calc(100%-24px)]" style={{ backgroundColor: "hsl(var(--orange))", color: "white" }} title={pCategory}>{pCategory}</span>
      </div>
      <div className="p-4">
        <p className="font-body text-xs text-muted-foreground mb-1">{product.code}</p>
        <h3 className="font-display text-base font-semibold text-foreground leading-tight mb-2 truncate">{pName}</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[pMaterial, pStyle].filter(Boolean).map((tag, i) => (
            <span key={`${tag}-${i}`} className="text-xs font-body px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">{tag}</span>
          ))}
        </div>

        {/* Mobile Actions: Side-by-side Quick View and Details */}
        <div className="flex sm:hidden items-center justify-between gap-2 w-full">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2.5 rounded font-body text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 border hover:bg-gray-50"
            style={{ color: "hsl(var(--navy-deep))", borderColor: "hsl(var(--navy-deep)/0.1)" }}
          >
            <Eye size={14} /> {t("product.quickView")}
          </button>
          <Link
            href={`/catalogue/${product.slug}`}
            className="flex-1 py-2.5 rounded font-body text-xs sm:text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-1.5 hover:brightness-110"
            style={{ backgroundColor: "hsl(var(--orange))", boxShadow: "0 2px 8px hsl(var(--orange)/0.2)" }}
          >
            {t("product.viewDetails")} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Desktop Action: Full width Details */}
        <Link
          href={`/catalogue/${product.slug}`}
          className="hidden sm:flex w-full py-2.5 rounded font-body text-sm font-semibold text-white transition-all duration-200 items-center justify-center gap-2 hover:brightness-110 hover:-translate-y-px"
          style={{ backgroundColor: "hsl(var(--orange))", boxShadow: "0 2px 8px hsl(var(--orange)/0.2)" }}
        >
          {t("product.viewDetails")} <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
