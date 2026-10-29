import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";
import QuickViewModal from "@/components/QuickViewModal";
import { useProducts } from "@/domains/product/product.hooks";
import type { Product, FilterState } from "@/domains/product/product.types";

const EXCLUDED_WATERMARK_TABLES = [
  "SUN ROUND TABLE",
  "SEINA TABLE",
  "RECTANGULAR TABLE",
  "HAYMONT TABLE",
];

function isCleanFurnitureSet(product: Product): boolean {
  const nameUs = (product.name?.us || "").trim().toUpperCase();
  const code = (product.code || "").trim().toUpperCase();
  const catUs = (product.category?.us || "").trim().toUpperCase();

  if (EXCLUDED_WATERMARK_TABLES.some((excluded) => nameUs.includes(excluded))) {
    return false;
  }
  if (code.includes("-TAB-") || catUs === "TABLES" || nameUs.endsWith(" TABLE")) {
    return false;
  }
  return true;
}

function FeaturedSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="rounded-sm aspect-[4/3] bg-black/5" />
          <div className="h-3 w-20 bg-black/5 rounded" />
          <div className="h-4 w-3/4 bg-black/5 rounded" />
          <div className="h-3 w-1/2 bg-black/5 rounded" />
        </div>
      ))}
    </div>
  );
}

function EditorialProductCard({
  product,
  index,
  onQuickView,
}: {
  product: Product;
  index: number;
  onQuickView: (p: Product) => void;
}) {
  const { t, i18n } = useTranslation();
  const langEnum: Record<string, "vi" | "uk" | "us"> = {
    "vi-VN": "vi",
    "en-GB": "uk",
    "en-US": "us",
  };
  const langId = langEnum[i18n?.language] || "us";
  const pName = product.name?.[langId] || product.name?.us || "";
  const collectionLabel =
    typeof product.collection === "string" ? product.collection : "";
  const pCategory =
    product.category?.[langId] ||
    product.category?.us ||
    collectionLabel ||
    "Outdoor Furniture";
  const productDetailHref = `/catalogue/${product.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white rounded-sm border border-black/8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <div
        className="relative overflow-hidden aspect-[4/3] w-full"
        style={{ backgroundColor: "hsl(var(--warm-beige))" }}
      >
        <Link href={productDetailHref} className="absolute inset-0 z-0 bg-transparent" />
        <img
          src={product.image}
          alt={pName}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 bg-black/20 transition-all duration-300 pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto flex items-center justify-center min-w-[145px] gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-xs text-white shadow-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:brightness-110 cursor-pointer"
            style={{ backgroundColor: "hsl(var(--orange))" }}
          >
            <Eye size={14} /> {t("product.quickView", "Quick View")}
          </button>
          <Link
            href={productDetailHref}
            className="pointer-events-auto flex items-center justify-center min-w-[145px] gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-xs text-white shadow-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 cursor-pointer"
            style={{
              backgroundColor: "hsl(var(--navy-deep)/0.9)",
              backdropFilter: "blur(4px)",
            }}
          >
            <ArrowRight size={14} /> {t("product.viewDetails", "View Details")}
          </Link>
        </div>
        <span
          className="absolute top-3 left-3 font-body text-[11px] font-medium px-2.5 py-1 rounded-sm text-white backdrop-blur-sm pointer-events-none truncate max-w-[calc(100%-24px)]"
          style={{ backgroundColor: "hsl(var(--navy-deep)/0.85)" }}
          title={pCategory}
        >
          {pCategory}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p
            className="font-body text-xs font-semibold tracking-wider uppercase mb-1"
            style={{ color: "hsl(var(--orange))" }}
          >
            {product.code}
          </p>
          <Link href={productDetailHref} className="block">
            <h3
              className="font-display font-bold text-lg leading-snug transition-colors duration-200 hover:opacity-75"
              style={{ color: "hsl(var(--navy-deep))" }}
            >
              {pName}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/6">
          <span className="font-body text-xs text-muted-foreground">{pCategory}</span>
          <Link
            href={productDetailHref}
            className="font-body text-xs font-semibold flex items-center gap-1 transition-opacity duration-200 hover:opacity-75"
            style={{ color: "hsl(var(--orange))" }}
          >
            {t("home.featured.inquire", "Inquire")} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { ref, inView } = useInView();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const emptyFilters: FilterState = {
    category: [],
    material: [],
    moq: [],
    color: [],
    style: [],
  };
  const { data: rawProducts = [], isLoading } = useProducts(emptyFilters, "");

  const validFeaturedProducts = rawProducts.filter(
    (product) =>
      typeof product.slug === "string" &&
      product.slug.trim() !== "" &&
      isCleanFurnitureSet(product)
  );

  // 3 columns x 2 rows = 6 sets on desktop
  const displayed = validFeaturedProducts.slice(0, 6);

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span
                  className="font-body text-xs tracking-[0.25em] uppercase font-medium"
                  style={{ color: "hsl(var(--orange))" }}
                >
                  {t("home.featured.label", isVi ? "Bộ sưu tập Chọn lọc" : "Featured Collections")}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-bold leading-tight"
                style={{
                  fontSize: "clamp(1.9rem, 3.8vw, 3.25rem)",
                  color: "hsl(var(--navy-deep))",
                }}
              >
                {t(
                  "home.featured.heading",
                  isVi ? "Bộ sưu tập nội thất chọn lọc." : "Selected Furniture Collections."
                )}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed"
              >
                {t(
                  "home.featured.description",
                  isVi
                    ? "Khám phá các bộ nội thất chọn lọc. Liên hệ DHT để nhận thông tin về cấu hình, vật liệu và báo giá."
                    : "Explore selected furniture sets. Contact DHT for available configurations, materials and quotation details."
                )}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="shrink-0"
            >
              <Link
                href="/catalogue/outdoor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--navy))" }}
              >
                {t("home.featured.fullCatalogue", isVi ? "Xem Toàn bộ Danh mục" : "Full Catalogue")}{" "}
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {isLoading ? (
            <FeaturedSkeletonGrid />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {displayed.map((product, i) => (
                  <EditorialProductCard
                    key={product.id || product.code || i}
                    product={product}
                    index={i}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
              {displayed.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-body text-muted-foreground">
                    {t("home.featured.noProducts", "No products found.")}
                  </p>
                </div>
              )}
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mt-14"
          >
            <Link
              href="/catalogue/outdoor"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-sm font-body font-semibold text-sm overflow-hidden transition-all duration-300 border-2"
              style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))" }}
            >
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-200 flex items-center gap-3">
                {t("home.featured.seeAllProducts", isVi ? "Xem Tất cả Sản phẩm" : "Explore All Collections")}{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
