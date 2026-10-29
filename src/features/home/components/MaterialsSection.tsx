import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, stagger, cardReveal } from "@/lib/animations";
import { useTranslation } from "react-i18next";

export default function MaterialsSection() {
  const { ref, inView } = useInView();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const vis = inView ? "show" : "hidden";

  const materialCards = [
    {
      key: "solidOak",
      slug: "acacia-wood-outdoor-furniture",
      image: "/img/materials/AcaciaWood1.png",
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
      slug: "teak-wood-premium-outdoor-durability",
      image: "/img/materials/TeakWood2.png",
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
      slug: "eucalyptus-wood-sustainable-strength",
      image: "/img/readyToWork/2.png",
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
      slug: "powder-coated-aluminum-modern-scalable",
      image: "/img/materials/Powder-CoatedAluminum2.png",
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
      slug: "outdoor-fabric-performance-comfort",
      image: "/img/materials/OutdoorFabric2.png",
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
      slug: "wood-panels-and-processing-mekong",
      image: "/img/WhoWeAre2.png",
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

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: "hsl(var(--navy))" }}>
      <div ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
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
                  className="font-body text-xs tracking-[0.25em] uppercase font-medium"
                  style={{ color: "hsl(var(--orange))" }}
                >
                  {t("home.materials.label", isVi ? "Vật liệu & Chế biến" : "Materials & Processing")}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
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

          {/* 3 columns x 2 rows = 6 cards on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {materialCards.map((mat, i) => (
              <motion.div key={mat.key} {...cardReveal(i)} className="h-full">
                <Link
                  href={`/materials/${mat.slug}`}
                  className="group flex flex-col h-full overflow-hidden rounded-sm bg-white/[0.04] border border-white/12 hover:border-[#B97846]/60 transition-all duration-300 shadow-lg"
                >
                  {/* 4:3 Image on top */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E241B]">
                    <img
                      src={mat.image}
                      alt={mat.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: "hsl(var(--orange))" }}
                    >
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Title & Description placed BELOW image (not overlaid) */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#133224]">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg sm:text-xl leading-snug mb-2 group-hover:text-[#E8C5A5] transition-colors">
                        {mat.title}
                      </h3>
                      <p className="font-body text-sm text-white/75 leading-relaxed">
                        {mat.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
