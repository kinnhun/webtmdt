import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUp, stagger, cardReveal } from "@/lib/animations";
import { useTranslation } from "react-i18next";

export default function MaterialsSection() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const vis = inView ? "show" : "hidden";

  const materials = [
    { key: "solidOak", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=90" },
    { key: "walnutWood", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&auto=format&fit=crop&q=90" },
    { key: "premiumTeak", image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&auto=format&fit=crop&q=90" },
    { key: "linenVelvet", image: "https://images.unsplash.com/photo-1606744837616-56c9a5c08a68?w=600&auto=format&fit=crop&q=90" },
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
              <motion.div key={mat.key} {...cardReveal(i)} className="group relative overflow-hidden rounded-sm aspect-[3/4]">
                <img src={mat.image} alt={t(`home.materials.${mat.key}.name`)} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)) 0%, transparent 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display font-bold text-white text-base mb-1">{t(`home.materials.${mat.key}.name`)}</p>
                  <p className="font-body text-xs text-white/50 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{t(`home.materials.${mat.key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
