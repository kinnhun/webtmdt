import Head from "next/head";
import { useRouter } from "next/router";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import type { Collection, Product } from "@/domains/product/product.types";
import { useCatalogue } from "../hooks/useCatalogue";

type CatalogueContainerProps = {
  forcedCollection?: Collection;
};

export default function CatalogueContainer({ forcedCollection }: CatalogueContainerProps) {
  const router = useRouter();
  const isVi = router.locale === "vi-VN";

  const {
    collection,
    search,
    setSearch,
    quickViewProduct,
    setQuickViewProduct,
    setPage,
    clearFilters,
    filtered,
    paginated,
    totalPages,
    safePage,
    t,
  } = useCatalogue(forcedCollection);

  const isOutdoor = forcedCollection === "Outdoor" || collection === "Outdoor";
  const heroTitle = isVi
    ? isOutdoor
      ? "Bộ Sưu Tập Nội Thất Ngoài Trời"
      : "Bộ Sưu Tập Nội Thất"
    : isOutdoor
      ? "Outdoor Furniture Collections"
      : "Furniture Collections";
  const heroDescription = isVi
    ? isOutdoor
      ? "Khám phá các dòng bàn ghế ăn, sofa lounge, ban công và ghế tắm nắng chế tác từ gỗ chứng nhận FSC, nhôm sơn tĩnh điện, thép và dây đan qua mạng lưới 11 cơ sở sản xuất tại Việt Nam."
      : "Khám phá danh mục đa dạng gồm nội thất ngoài trời, nội thất trong nhà và nội thất dự án, được sản xuất qua mạng lưới 11 cơ sở chuyên biệt tại Việt Nam. Từ gỗ tự nhiên, nhôm và thép đến nội thất bọc nệm, giả mây, dây đan và ván gỗ công nghiệp, DHT cung cấp giải pháp OEM/ODM linh hoạt cho đối tác B2B toàn cầu."
    : isOutdoor
      ? "Explore export-ready dining, lounge, balcony and sunlounger programmes crafted in FSC-certified timber, powder-coated aluminium, woven rope and mixed materials across our 11-facility Vietnam network."
      : "Explore our diverse range of outdoor, indoor and project furniture, supported by a network of 11 specialised manufacturing facilities across Vietnam. From solid wood, aluminium and steel to upholstery, wicker, rope and engineered wood, DHT provides flexible OEM/ODM solutions for global B2B buyers.";

  return (
    <>
      <Head>
        <title>{heroTitle} | DHT Furniture Vietnam</title>
        <meta name="description" content={heroDescription} />
      </Head>

      <div className="pt-[64px] bg-[#F4F1EA] min-h-screen">
        {/* Video Hero Banner — B2B Furniture Manufacturing & Export */}
        <section className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] overflow-hidden bg-[#112B20]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/img/hero-poster.webp"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
          >
            <source src="/video/hero-banner.mp4" type="video/mp4" />
          </video>

          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0E241B]/90 via-[#122D22]/75 to-[#0E241B]/45"
            aria-hidden="true"
          />

          <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
            <div className="max-w-3xl">
              <span className="inline-block font-body text-xs font-bold tracking-[0.25em] uppercase text-[#F3BA7A] mb-3">
                {isVi
                  ? "SẢN XUẤT & XUẤT KHẨU NỘI THẤT B2B"
                  : "B2B FURNITURE MANUFACTURING & EXPORT"}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4">
                {heroTitle}
              </h1>
              <p className="font-body text-sm sm:text-base text-white/95 leading-relaxed max-w-2xl">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Streamlined Search Bar + Wide Product Grid (Sidebar Filters Removed) */}
        <div className="container mx-auto px-6 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-black/8 shadow-xs">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#173C2C]/75" />
              <input
                type="text"
                placeholder={
                  isVi
                    ? "Tìm theo tên bộ sưu tập, mã SKU hoặc chất liệu (vd: Teak, Aluminium, Sofa)..."
                    : "Search by collection name, SKU, or material (e.g. Aluminium, Teak, Sofa)..."
                }
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#F8F6F0] border border-black/15 font-body text-sm text-[#1F2723] placeholder:text-[#1F2723]/65 outline-none focus:border-[#173C2C] transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label={isVi ? "Xóa tìm kiếm" : "Clear search"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-600 hover:text-[#173C2C] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="shrink-0 font-body text-sm font-medium text-[#173C2C] px-2">
              {isVi
                ? isOutdoor
                  ? `Hiển thị ${filtered.length} bộ sưu tập & mẫu ngoại thất`
                  : `Hiển thị ${filtered.length} sản phẩm`
                : isOutdoor
                  ? `Showing ${filtered.length} outdoor collections & items`
                  : `Showing ${filtered.length} items & collections`}
            </div>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginated.map((product: Product, i: number) => (
                  <ProductCard
                    key={product.id || product.code || i}
                    product={product}
                    index={i}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 mb-8 flex items-center justify-center gap-2 font-body text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setPage(1);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={safePage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/15 bg-white disabled:opacity-40 hover:bg-black/5 transition-colors disabled:cursor-not-allowed text-[#173C2C]"
                    title="First"
                  >
                    «
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPage(safePage - 1);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={safePage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/15 bg-white disabled:opacity-40 hover:bg-black/5 transition-colors disabled:cursor-not-allowed text-[#173C2C]"
                    title="Previous"
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const p = idx + 1;
                    if (p === 1 || p === totalPages || (p >= safePage - 1 && p <= safePage + 1)) {
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setPage(p);
                            window.scrollTo({ top: 380, behavior: "smooth" });
                          }}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${safePage === p
                              ? "bg-[#173C2C] text-white border-[#173C2C] shadow-xs"
                              : "bg-white border-black/15 text-[#173C2C] hover:bg-black/5"
                            }`}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (p === 2 && safePage > 3) {
                      return (
                        <span key={`dots-start-${p}`} className="px-1 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    if (p === totalPages - 1 && safePage < totalPages - 2) {
                      return (
                        <span key={`dots-end-${p}`} className="px-1 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setPage(safePage + 1);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={safePage === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/15 bg-white disabled:opacity-40 hover:bg-black/5 transition-colors disabled:cursor-not-allowed text-[#173C2C]"
                    title="Next"
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPage(totalPages);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={safePage === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/15 bg-white disabled:opacity-40 hover:bg-black/5 transition-colors disabled:cursor-not-allowed text-[#173C2C]"
                    title="Last"
                  >
                    »
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-black/8">
              <p className="font-body text-[#1F2723]/85 text-lg mb-3">
                {t("catalogue.noResults")}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="font-body text-sm font-semibold text-[#9A5B2A] hover:underline cursor-pointer"
              >
                {t("catalogue.clearAllFilters")}
              </button>
            </div>
          )}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
