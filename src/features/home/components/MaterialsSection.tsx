import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, stagger } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import type { MaterialHomeCardItem } from "@/types/materials";

const MATERIAL_CARDS: readonly MaterialHomeCardItem[] = [
  {
    key: "solidOak",
    slug: "acacia-wood-outdoor-furniture",
    image: "/img/materials/AcaciaWood1.png",
    hoverImage: "/img/materials/TeakWood2.png",
    titleEn: "FSC-Certified Acacia",
    titleVi: "Gỗ Acacia được chứng nhận FSC",
    descEn: "Acacia wood for selected furniture designs.",
    descVi: "Gỗ Acacia dùng cho các thiết kế nội thất được lựa chọn.",
    isFscCertifiedTimber: true,
  },
  {
    key: "premiumTeak",
    slug: "teak-wood-premium-outdoor-durability",
    image: "/img/materials/TeakWood2.png",
    hoverImage: "/img/materials/TeakWood1.png",
    titleEn: "FSC-Certified Teak",
    titleVi: "Gỗ Teak được chứng nhận FSC",
    descEn: "Teak options for selected collections.",
    descVi: "Lựa chọn gỗ Teak cho các bộ sưu tập phù hợp.",
    isFscCertifiedTimber: true,
  },
  {
    key: "eucalyptusWood",
    slug: "eucalyptus-wood-sustainable-strength",
    image: "/img/readyToWork/2.png",
    hoverImage: "/img/about/image.png",
    titleEn: "FSC-Certified Eucalyptus",
    titleVi: "Gỗ Eucalyptus được chứng nhận FSC",
    descEn: "Eucalyptus wood for selected furniture designs.",
    descVi: "Gỗ Eucalyptus dùng cho các thiết kế nội thất được lựa chọn.",
    isFscCertifiedTimber: true,
  },
  {
    key: "aluminium",
    slug: "powder-coated-aluminum-modern-scalable",
    image: "/img/category/aluminum1.png",
    hoverImage: "/img/materials/Powder-CoatedAluminum2.png",
    titleEn: "Powder-Coated Aluminium",
    titleVi: "Nhôm sơn tĩnh điện",
    descEn: "Frame finishes specified for each collection.",
    descVi: "Phương án hoàn thiện khung được xác định theo từng bộ sưu tập.",
    isFscCertifiedTimber: false,
  },
  {
    key: "linenVelvet",
    slug: "outdoor-fabric-performance-comfort",
    image: "/img/materials/OutdoorFabric2.png",
    hoverImage: "/img/category/chairs.png",
    titleEn: "Fabrics & Upholstery",
    titleVi: "Vải & vật liệu bọc",
    descEn: "Indoor and outdoor options specified by application.",
    descVi: "Lựa chọn cho trong nhà và ngoài trời theo mục đích sử dụng.",
    isFscCertifiedTimber: false,
  },
  {
    key: "woodPanels",
    slug: "wood-panels-and-processing-mekong",
    image: "/img/WhoWeAre2.png",
    hoverImage: "/img/WhoWeAre3.png",
    titleEn: "Wood Panels & Processing — MEKONG",
    titleVi: "Ván gỗ & chế biến gỗ — MEKONG",
    descEn: "Wood panels and timber processing capabilities.",
    descVi: "Năng lực ván gỗ và chế biến gỗ.",
    isFscCertifiedTimber: false,
  },
];

export default function MaterialsSection() {
  const { ref, inView } = useInView();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const vis = inView ? "show" : "hidden";
  const [activatedHoverKeys, setActivatedHoverKeys] = useState<string[]>([]);

  const enableHoverPreview = (key: string) => {
    setActivatedHoverKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EA] border-t border-black/5">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end mb-12 sm:mb-14">
          <motion.div
            variants={stagger(0, 0.1)}
            initial="hidden"
            animate={vis}
            className="md:col-span-7"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#9A5B2A]" />
              <span className="font-body text-xs tracking-[0.25em] uppercase font-bold text-[#9A5B2A]">
                {t("home.materials.label", isVi ? "Vật liệu & Chế biến" : "Materials & Processing")}
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-[#173C2C] leading-[1.12]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
            >
              {t(
                "home.materials.heading",
                isVi ? "Vật liệu cho các dòng sản phẩm." : "Materials Across Our Furniture Range."
              )}
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 font-body text-sm sm:text-base text-[#1F2723]/85 leading-relaxed"
          >
            {t(
              "home.materials.description",
              isVi
                ? "Vật liệu và phương án hoàn thiện được lựa chọn theo từng sản phẩm và mục đích sử dụng. Thông số áp dụng được xác nhận trong báo giá."
                : "Materials and finishes are selected for each product and its intended use. Available specifications are confirmed in the quotation."
            )}
          </motion.p>
        </div>

        {/* Clean 3x2 Material Cards Grid — Sharp 4:3 Photography, Text Separated Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {MATERIAL_CARDS.map((mat, index) => {
            const title = t(`home.materials.${mat.key}.name`, isVi ? mat.titleVi : mat.titleEn);
            const desc = t(`home.materials.${mat.key}.desc`, isVi ? mat.descVi : mat.descEn);

            return (
              <motion.div
                key={mat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Link
                  href={`/materials/${mat.slug}`}
                  onMouseEnter={() => enableHoverPreview(mat.key)}
                  onFocus={() => enableHoverPreview(mat.key)}
                  className="group flex flex-col h-full rounded-2xl bg-white border border-black/8 hover:border-[#173C2C]/30 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Unblurred 4:3 Photograph without overlaid badges or dark vignettes */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE5DA]">
                    <Image
                      src={mat.image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={85}
                      className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    {activatedHoverKeys.includes(mat.key) && (
                      <Image
                        src={mat.hoverImage}
                        alt={`${title} detail`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        quality={85}
                        className="object-cover object-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                      />
                    )}
                  </div>

                  {/* Card Text Below Photo */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {mat.isFscCertifiedTimber ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold uppercase tracking-wide">
                          <CheckCircle2 size={12} className="shrink-0" />
                          <span>{isVi ? "Gỗ Chứng Nhận FSC" : "FSC-Certified Wood"}</span>
                        </div>
                      ) : (
                        <div className="mb-2.5 h-5" aria-hidden="true" />
                      )}

                      <h3 className="font-display font-bold text-[#173C2C] text-lg sm:text-xl leading-snug mb-2 group-hover:text-[#9A5B2A] transition-colors">
                        {title}
                      </h3>

                      <p className="font-body text-sm text-[#1F2723]/85 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-black/8 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#173C2C] group-hover:text-[#9A5B2A] transition-colors">
                      <span>{isVi ? "Xem thông số vật liệu" : "Explore specifications"}</span>
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
