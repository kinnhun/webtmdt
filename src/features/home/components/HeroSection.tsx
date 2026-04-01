import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 480, backgroundColor: "hsl(var(--navy-deep))" }}>
      {/* YouTube Background Video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#0a1128]">
        {isMounted && (
          <iframe
            src="https://www.youtube.com/embed/9JXZlHOwTzM?autoplay=1&mute=1&loop=1&playlist=9JXZlHOwTzM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
            title="DHT Furniture Hero Background"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-85 mix-blend-screen"
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
        )}
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(var(--navy-deep)/0.15) 0%, hsl(var(--navy-deep)/0.4) 55%, hsl(var(--navy-deep)) 100%)" }} />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium mb-4 sm:mb-6" style={{ color: "hsl(var(--orange))" }}>
          {t("home.hero.badge")}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-white text-center leading-[1.05] tracking-tight mb-6 sm:mb-8 max-w-6xl mx-auto" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
          {t("home.hero.title1")}<br /><span style={{ color: "hsl(var(--orange))" }}>{t("home.hero.title2")}</span>
        </motion.h1>

      </div>
      {/* Stats bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10" style={{ background: "hsl(var(--navy-deep)/0.7)", backdropFilter: "blur(12px)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { n: "18+", label: t("home.hero.stats.yearsExperience") },
              { n: "50,000+", label: t("home.hero.stats.unitsMonth") },
              { n: "400+", label: t("home.hero.stats.products") },
              { n: "35+", label: t("home.hero.stats.exportCountries") },
            ].map(({ n, label }) => (
              <div key={label} className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                <p className="font-display lining-nums tabular-nums font-bold text-white text-lg sm:text-2xl leading-none mb-0.5 sm:mb-1">{n}</p>
                <p className="font-body text-[10px] sm:text-xs tracking-wide uppercase" style={{ color: "hsl(var(--warm-cream)/0.4)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
