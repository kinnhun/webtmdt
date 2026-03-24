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
    { key: "bedroom", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80", href: "/catalogue?category=Bedroom" },
    { key: "diningRoom", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=80", href: "/catalogue?category=Dining+Room" },
    { key: "livingRoom", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80", href: "/catalogue?category=Living+Room" },
    { key: "homeOffice", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=80", href: "/catalogue?category=Home+Office" },
    { key: "outdoor", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80", href: "/catalogue?category=Outdoor" },
  ];

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
              {t("home.categories.heading1")}<br />{t("home.categories.heading2")}
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="shrink-0">
            <Link href="/catalogue" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--navy))" }}>{t("home.categories.viewAll")} <ArrowRight size={15} /></Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.key} {...fItem(i)}>
              <Link href={cat.href} className="group block relative overflow-hidden rounded-sm aspect-[3/4]">
                <img src={cat.image} alt={t(`home.categories.${cat.key}.name`)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.85) 0%, hsl(var(--navy-deep)/0.1) 50%, transparent 100%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-body text-[10px] tracking-wider uppercase mb-1" style={{ color: "hsl(var(--orange))" }}>{t(`home.categories.${cat.key}.tagline`)}</p>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg leading-tight">{t(`home.categories.${cat.key}.name`)}</h3>
                      <p className="font-body text-xs text-white/40 mt-0.5">{t(`home.categories.${cat.key}.count`)}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: "hsl(var(--orange))" }}>
                      <ArrowUpRight size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
