import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";
import { useFeaturedProducts } from "@/domains/product/product.hooks";
import type { Product } from "@/domains/product/product.types";
import type { FeaturedProductsProps } from "@/types/product";
import { formatProductDisplayTitle } from "@/lib/productDisplay";
import { withImageVariant } from "@/lib/imageUrl";

const QuickViewModal = dynamic(() => import("@/components/QuickViewModal"), {
  ssr: false,
});

function FeaturedSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="rounded-sm aspect-[4/3] bg-black/5" />
          <div className="h-4 w-3/4 bg-black/5 rounded" />
          <div className="h-3 w-20 bg-black/5 rounded" />
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
  const isVi = i18n?.language?.startsWith("vi");
  const langEnum: Record<string, "vi" | "uk" | "us"> = {
    "vi-VN": "vi",
    "en-GB": "uk",
    "en-US": "us",
  };
  const langId = langEnum[i18n?.language] || "us";
  const rawName = product.name?.[langId] || product.name?.us || "";
  const pName = formatProductDisplayTitle(rawName);
  const collectionLabel = Array.isArray(product.collection)
    ? product.collection.join(", ")
    : typeof product.collection === "string"
      ? product.collection
      : "";
  const pCategory =
    product.category?.[langId] ||
    product.category?.us ||
    collectionLabel ||
    "Furniture Collection";
  const productDetailHref = `/catalogue/${product.slug}`;
  const viewCollectionLabel = t(
    "home.featured.viewCollection",
    isVi ? "Xem bộ sưu tập" : "View Collection"
  );

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
        <Image
          src={withImageVariant(product.image, 720, 80)}
          alt={pName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          quality={85}
          className="object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 bg-black/20 transition-all duration-300 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto flex items-center justify-center min-w-[155px] gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-xs text-white shadow-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:brightness-110 cursor-pointer"
            style={{ backgroundColor: "hsl(var(--orange))" }}
          >
            <Eye size={14} /> {t("product.quickView", "Quick View")}
          </button>
          <Link
            href={productDetailHref}
            className="pointer-events-auto flex items-center justify-center min-w-[155px] gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-xs text-white shadow-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 cursor-pointer"
            style={{
              backgroundColor: "hsl(var(--navy-deep)/0.9)",
              backdropFilter: "blur(4px)",
            }}
          >
            <ArrowRight size={14} /> {viewCollectionLabel}
          </Link>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={productDetailHref} className="block">
            <h3
              className="font-display font-bold text-lg leading-snug transition-colors duration-200 hover:opacity-75"
              style={{ color: "hsl(var(--navy-deep))" }}
            >
              {pName}
            </h3>
          </Link>
          <p className="font-body text-xs font-semibold tracking-wider uppercase mt-1 text-[#9A5B2A]">
            {product.code}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/6">
          <span className="font-body text-xs text-muted-foreground">{pCategory}</span>
          <Link
            href={productDetailHref}
            className="font-body text-xs font-semibold flex items-center gap-1 transition-opacity duration-200 hover:opacity-75 text-[#9A5B2A]"
          >
            {viewCollectionLabel} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
  const { ref, inView } = useInView();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: featuredProducts = [], isLoading } = useFeaturedProducts(initialProducts);

  const displayed = featuredProducts.filter(
    (product) => typeof product.slug === "string" && product.slug.trim() !== ""
  );

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
                <span className="h-px w-8 bg-[#9A5B2A]" />
                <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-[#9A5B2A]">
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
                href="/catalogue"
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
              href="/catalogue"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-sm font-body font-semibold text-sm overflow-hidden transition-all duration-300 border-2 border-[#9A5B2A] text-[#9A5B2A]"
            >
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out bg-[#A45E2F]" />
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
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
