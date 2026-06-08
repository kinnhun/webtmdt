import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { fadeUp, stagger, cardReveal } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import { materialArticles } from "@/data/materialArticles";

export default function MaterialsSection() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const vis = inView ? "show" : "hidden";

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
            {materialArticles.map((mat, i) => (
              <motion.div key={mat.key} {...cardReveal(i)}>
                <Link href={`/materials/${mat.slug}`} className="group relative block overflow-hidden rounded-xl aspect-[3/4] cursor-pointer bg-white/[0.04] border border-white/10 shadow-2xl shadow-black/20 text-left">
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={mat.image} alt={t(`home.materials.${mat.key}.name`)} className="absolute inset-0 z-0 h-full w-full object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-0" />
                    <img src={mat.hoverImage} alt={`${t(`home.materials.${mat.key}.name`)} detail`} className="absolute inset-0 z-10 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100" />
                  </div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[hsl(var(--navy-deep))] via-[hsl(var(--navy-deep)/0.34)] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="font-display font-medium text-white mb-2 drop-shadow" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>{t(`home.materials.${mat.key}.name`)}</p>
                    <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed drop-shadow">{t(`home.materials.${mat.key}.desc`)}</p>
                    <span className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Read material insight</span>
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
