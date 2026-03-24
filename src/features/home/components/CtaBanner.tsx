import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--orange)), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--orange)/0.5), transparent 70%)" }} />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          {t("home.cta.heading")}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-base text-white/60 max-w-lg mx-auto mb-10">
          {t("home.cta.description")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-3 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--orange))" }}>
            {t("home.cta.sendInquiry")} <ArrowRight size={15} />
          </Link>
          <Link href="/catalogue" className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-all">
            {t("home.cta.browseCatalogue")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
