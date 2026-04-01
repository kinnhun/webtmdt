import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUp, stagger, cardReveal } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { X } from "lucide-react";

export default function MaterialsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const vis = inView ? "show" : "hidden";

  const materials = [
    { key: "solidOak", image: "/img/materials/AcaciaWood.png" },
    { key: "premiumTeak", image: "/img/materials/TeakWood.png" },
    { key: "aluminium", image: "/img/materials/Powder-CoatedAluminum.png" },
    { key: "linenVelvet", image: "/img/materials/OutdoorFabric.png" },
  ];

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: "hsl(var(--navy))" }}>
      <div ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-end mb-8 sm:mb-14">
            <motion.div variants={stagger(0, 0.12)} initial="hidden" animate={vis}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("home.materials.label")}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{t("home.materials.heading1")}<br />{t("home.materials.heading2")}</motion.h2>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="font-body text-sm sm:text-base text-white/55 leading-relaxed">{t("home.materials.description")}</motion.p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {materials.map((mat, i) => (
              <motion.div key={mat.key} {...cardReveal(i)} onClick={() => setSelectedImage(mat.image)} className="group relative overflow-hidden rounded-sm aspect-[3/4] cursor-pointer">
                <Image src={mat.image} alt={t(`home.materials.${mat.key}.name`)} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-[1.06] transition-transform duration-700" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="font-display font-medium text-white mb-2" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>{t(`home.materials.${mat.key}.name`)}</p>
                  <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed">{t(`home.materials.${mat.key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-[101] text-white/80 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-[85vh] max-w-6xl rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Expanded Material" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
