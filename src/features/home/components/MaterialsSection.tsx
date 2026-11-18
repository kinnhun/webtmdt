import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, stagger } from "@/lib/animations";
import { useTranslation } from "react-i18next";

export default function MaterialsSection() {
  const { ref, inView } = useInView();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const vis = inView ? "show" : "hidden";

  const [activeTab, setActiveTab] = useState<"all" | "wood" | "metal-fabric" | "processing">("all");

  const filterTabs = [
    {
      id: "all" as const,
      label: isVi ? "Tất cả vật liệu" : "All Materials",
      count: 6,
    },
    {
      id: "wood" as const,
      label: isVi ? "Gỗ tự nhiên FSC" : "FSC Hardwoods",
      count: 3,
    },
    {
      id: "metal-fabric" as const,
      label: isVi ? "Kim loại & Vải" : "Metals & Fabrics",
      count: 2,
    },
    {
      id: "processing" as const,
      label: isVi ? "Ván gỗ & Chế biến" : "Wood Panels",
      count: 1,
    },
  ];

  const materialCards = [
    {
      key: "solidOak",
      category: "wood" as const,
      slug: "acacia-wood-outdoor-furniture",
      image: "/img/materials/AcaciaWood1.png",
      hoverImage: "/img/materials/AcaciaWood2.png",
      badge: isVi ? "GỖ TRÀM FSC®" : "FSC® ACACIA",
      specTag: isVi ? "Độ ẩm 8-12% · Sấy lò" : "8-12% MC · Kiln-Dried",
      title: t(
        "home.materials.solidOak.name",
        isVi ? "Gỗ Acacia được chứng nhận FSC" : "FSC-Certified Acacia"
      ),
      desc: t(
        "home.materials.solidOak.desc",
        isVi
          ? "Gỗ Acacia dùng cho các thiết kế nội thất được lựa chọn."
          : "Acacia wood for selected furniture designs."
      ),
    },
    {
      key: "premiumTeak",
      category: "wood" as const,
      slug: "teak-wood-premium-outdoor-durability",
      image: "/img/materials/TeakWood1.png",
      hoverImage: "/img/materials/TeakWood2.png",
      badge: isVi ? "GỖ TEAK FSC®" : "FSC® TEAK",
      specTag: isVi ? "Tectona Grandis · Mato Grosso" : "Tectona Grandis · Mato Grosso",
      title: t(
        "home.materials.premiumTeak.name",
        isVi ? "Gỗ Teak được chứng nhận FSC" : "FSC-Certified Teak"
      ),
      desc: t(
        "home.materials.premiumTeak.desc",
        isVi
          ? "Lựa chọn gỗ Teak cho các bộ sưu tập phù hợp."
          : "Teak options for selected collections."
      ),
    },
    {
      key: "eucalyptusWood",
      category: "wood" as const,
      slug: "eucalyptus-wood-sustainable-strength",
      image: "/img/readyToWork/2.png",
      hoverImage: "/img/category/chairs.png",
      badge: isVi ? "GỖ BẠCH ĐÀN FSC®" : "FSC® EUCALYPTUS",
      specTag: isVi ? "Gỗ cứng chịu lực cao" : "High Structural Density",
      title: t(
        "home.materials.eucalyptusWood.name",
        isVi ? "Gỗ Eucalyptus được chứng nhận FSC" : "FSC-Certified Eucalyptus"
      ),
      desc: t(
        "home.materials.eucalyptusWood.desc",
        isVi
          ? "Gỗ Eucalyptus dùng cho các thiết kế nội thất được lựa chọn."
          : "Eucalyptus wood for selected furniture designs."
      ),
    },
    {
      key: "aluminium",
      category: "metal-fabric" as const,
      slug: "powder-coated-aluminum-modern-scalable",
      image: "/img/materials/Powder-CoatedAluminum2.png",
      hoverImage: "/img/materials/Powder-CoatedAluminum1.png",
      badge: isVi ? "NHÔM SƠN TĨNH ĐIỆN" : "POWDER-COATED ALUMINIUM",
      specTag: isVi ? "Khung nhôm · Kháng muối biển" : "Alloy Frames · Salt-Spray Rated",
      title: t(
        "home.materials.aluminium.name",
        isVi ? "Nhôm sơn tĩnh điện" : "Powder-Coated Aluminium"
      ),
      desc: t(
        "home.materials.aluminium.desc",
        isVi
          ? "Phương án hoàn thiện khung được xác định theo từng bộ sưu tập."
          : "Frame finishes specified for each collection."
      ),
    },
    {
      key: "linenVelvet",
      category: "metal-fabric" as const,
      slug: "outdoor-fabric-performance-comfort",
      image: "/img/materials/OutdoorFabric2.png",
      hoverImage: "/img/materials/OutdoorFabric1.png",
      badge: isVi ? "VẢI & BỌC ĐỆM" : "FABRICS & UPHOLSTERY",
      specTag: isVi ? "Sợi Olefin kháng UV" : "High UV Solution-Dyed",
      title: t(
        "home.materials.linenVelvet.name",
        isVi ? "Vải & vật liệu bọc" : "Fabrics & Upholstery"
      ),
      desc: t(
        "home.materials.linenVelvet.desc",
        isVi
          ? "Lựa chọn cho trong nhà và ngoài trời theo mục đích sử dụng."
          : "Indoor and outdoor options specified by application."
      ),
    },
    {
      key: "woodPanels",
      category: "processing" as const,
      slug: "wood-panels-and-processing-mekong",
      image: "/img/WhoWeAre2.png",
      hoverImage: "/img/WhoWeAre3.png",
      badge: isVi ? "MEKONG — VÁN GỖ" : "MEKONG — PANELS",
      specTag: isVi ? "260.000 m² · Cơ sở 11" : "260,000 m² · Facility 11",
      title: t(
        "home.materials.woodPanels.name",
        isVi ? "Ván gỗ & chế biến gỗ — MEKONG" : "Wood Panels & Processing — MEKONG"
      ),
      desc: t(
        "home.materials.woodPanels.desc",
        isVi
          ? "Năng lực ván gỗ và chế biến gỗ."
          : "Wood panels and timber processing capabilities."
      ),
    },
  ];

  const displayedCards = activeTab === "all"
    ? materialCards
    : materialCards.filter((c) => c.category === activeTab);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: "hsl(var(--navy))" }}>
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[hsl(var(--orange))/0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-14">
            <motion.div
              variants={stagger(0, 0.12)}
              initial="hidden"
              animate={vis}
              className="md:col-span-7"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span
                  className="font-body text-xs tracking-[0.25em] uppercase font-bold"
                  style={{ color: "hsl(var(--orange))" }}
                >
                  {t("home.materials.label", isVi ? "Vật liệu & Chế biến" : "Materials & Processing")}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-white leading-[1.15]"
                style={{ fontSize: "clamp(2.15rem, 4vw, 3.5rem)" }}
              >
                {t(
                  "home.materials.heading",
                  isVi
                    ? "Vật liệu cho các dòng sản phẩm."
                    : "Materials Across Our Furniture Range."
                )}
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 font-body text-sm sm:text-base text-white/75 leading-relaxed"
            >
              {t(
                "home.materials.description",
                isVi
                  ? "Vật liệu và phương án hoàn thiện được lựa chọn theo từng sản phẩm và mục đích sử dụng. Thông số áp dụng được xác nhận trong báo giá."
                  : "Materials and finishes are selected for each product and its intended use. Available specifications are confirmed in the quotation."
              )}
            </motion.p>
          </div>

          {/* Interactive filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar"
          >
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white shadow-lg shadow-black/20"
                      : "text-white/65 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMaterialTab"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "hsl(var(--orange))" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.label}
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-black/25 text-white"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Materials Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 auto-rows-fr"
          >
            <AnimatePresence mode="popLayout">
              {displayedCards.map((mat) => (
                <motion.div
                  layout
                  key={mat.key}
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                  <Link
                    href={`/materials/${mat.slug}`}
                    className="group flex flex-col h-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#143628]/85 via-[#0e271d]/90 to-[#0a1e16]/95 border border-white/12 hover:border-[#F3BA7A]/60 transition-all duration-500 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-[#F3BA7A]/15 text-left"
                  >
                    {/* Image Container with Dual-Image Smooth Hover Effect */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0A1B14]">
                      {/* Primary Application Image */}
                      <img
                        src={mat.image}
                        alt={mat.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-108 group-hover:opacity-0"
                        loading="lazy"
                      />

                      {/* Secondary Detail/Swatch Image on Hover */}
                      <img
                        src={mat.hoverImage}
                        alt={`${mat.title} detail`}
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-108 group-hover:opacity-100"
                        loading="lazy"
                      />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--orange))]" />
                        <span>{mat.badge}</span>
                      </div>

                      {/* Top Right Action Arrow */}
                      <div
                        className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-black/45 backdrop-blur-md border border-white/20 text-white group-hover:bg-[hsl(var(--orange))] group-hover:border-[hsl(var(--orange))] group-hover:text-white transition-all duration-300 shadow-md"
                      >
                        <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                      </div>

                      {/* Subtle Vignette & Bottom Gradient for Seamless Card Flow */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0e271d] via-[#0e271d]/25 to-transparent" />
                    </div>

                    {/* Content Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Technical Spec Tag */}
                        <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-[hsl(var(--orange))] mb-2 font-mono">
                          <Sparkles size={11} className="shrink-0" />
                          <span>{mat.specTag}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-white text-lg sm:text-[21px] leading-snug mb-2 group-hover:text-[#F3BA7A] transition-colors duration-300">
                          {mat.title}
                        </h3>

                        {/* Description */}
                        <p className="font-body text-sm text-white/75 leading-relaxed">
                          {mat.desc}
                        </p>
                      </div>

                      {/* Bottom Micro-CTA */}
                      <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[hsl(var(--orange))] group-hover:text-[#F3BA7A] transition-colors duration-300">
                        <span>{isVi ? "Xem hồ sơ kỹ thuật" : "View Material Insight"}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
