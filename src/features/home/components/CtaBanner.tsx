import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "580px" }}>
      {/* YouTube Video Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/_9CxO-2BJFk?autoplay=1&mute=1&loop=1&playlist=_9CxO-2BJFk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
          title="DHT Furniture Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 mix-blend-screen"
          style={{
            width: "calc(100vw + 200px)",
            height: "calc(100vh + 200px)",
            minWidth: "177.78vh",
            minHeight: "56.25vw",
            border: "none",
          }}
          allow="autoplay; encrypted-media"
          loading="lazy"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(215 40% 15% / 0.40) 0%, hsl(215 40% 15% / 0.50) 100%)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-white leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {t("home.cta.heading")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-base text-white/60 max-w-lg mx-auto mb-10"
        >
          {t("home.cta.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "hsl(var(--orange))" }}
          >
            {t("home.cta.sendInquiry")} <ArrowRight size={15} />
          </Link>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-all"
          >
            {t("home.cta.browseCatalogue")}
          </Link>
        </motion.div>

        {/* Company Slogan */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-sm tracking-[0.15em] uppercase mt-10"
          style={{
            background: "linear-gradient(90deg, #f5d76e, #e8a838, #d4862a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("home.cta.slogan")}
        </motion.p>
      </div>
    </section>
  );
}
