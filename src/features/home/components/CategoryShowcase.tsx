import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";

const fItem = (i: number) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: { duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } });

export default function CategoryShowcase() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  const categories = [
    {
      key: "outdoorSofa",
      image: "/img/category/outdoorsofas.png",
      href: "/catalogue/outdoor?category=Outdoor+Sofas",
    },
    {
      key: "outdoorDining",
      image: "/img/category/diningset.png",
      href: "/catalogue/outdoor?category=Dining+Sets",
    },
    {
      key: "sunlounger",
      image: "/img/category/sunlounger.png",
      href: "/catalogue/outdoor?category=Lounge+Daybeds",
    },
    {
      key: "aluminium",
      image: "/img/category/aluminum.png",
      href: "/catalogue/outdoor?category=Tables",
    }
  ];

  const indoorCategory = {
    key: "indoor",
    image: "/img/category/chairs.png",
    href: "/catalogue/indoor?category=Chairs",
  };

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref} className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("home.categories.label")}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "hsl(var(--navy-deep))" }}>
              {t("home.categories.heading1")} {t("home.categories.heading2")}
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="font-body text-sm sm:text-base tracking-wide mt-3 max-w-xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              {t("home.categories.subline")}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="shrink-0">
            <Link href="/catalogue/outdoor" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--navy))" }}>{t("home.categories.viewAll")} <ArrowRight size={15} /></Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.key} {...fItem(i)}>
              <Link href={cat.href} className="group block relative overflow-hidden rounded-sm aspect-3/4">
                <img src={cat.image} alt={t(`home.categories.${cat.key}.name`)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.85) 0%, hsl(var(--navy-deep)/0.1) 50%, transparent 100%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg leading-tight">{t(`home.categories.${cat.key}.name`)}</h3>
                      <p className="font-body text-xs text-white/40 mt-1">{t(`home.categories.${cat.key}.count`)}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: "hsl(var(--orange))" }}>
                      <ArrowUpRight size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] as any }} className="w-full">
          <Link href={indoorCategory.href} className="group block relative overflow-hidden rounded-sm aspect-16/6 lg:aspect-24/6">
            <img src={indoorCategory.image} alt={t(`home.categories.${indoorCategory.key}.name`)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-out" loading="lazy" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.9) 0%, hsl(var(--navy-deep)/0.2) 60%, transparent 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex flex-row items-end justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-xl md:text-3xl leading-tight mb-1">{t(`home.categories.${indoorCategory.key}.name`)}</h3>
                <p className="font-body text-xs md:text-sm text-white/60 uppercase tracking-widest">{t(`home.categories.${indoorCategory.key}.count`)}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: "hsl(var(--orange))" }}>
                <ArrowUpRight size={18} className="text-white" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
