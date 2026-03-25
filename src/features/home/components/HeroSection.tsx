import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const YOUTUBE_VIDEO_ID = "EfvZPYW_8nk";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const iframeSrc = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`;

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 480, backgroundColor: "hsl(var(--navy-deep))" }}>
      {/* YouTube Background Video — scaled to cover viewport on all devices */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: "hidden" }}>
        {isMounted && (
          <iframe
            src={iframeSrc}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute border-0"
            style={{
              top: "50%",
              left: "50%",
              width: "300vw",
              height: "300vh",
              minWidth: "300vw",
              minHeight: "300vh",
              transform: "translate(-50%, -50%)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
            title="Hero background video"
          />
        )}
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(var(--navy-deep)/0.35) 0%, hsl(var(--navy-deep)/0.6) 55%, hsl(var(--navy-deep)) 100%)" }} />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium mb-4 sm:mb-6" style={{ color: "hsl(var(--orange))" }}>
          {t("home.hero.badge")}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-white leading-[0.95] tracking-tight mb-6 sm:mb-8" style={{ fontSize: "clamp(2.4rem, 8vw, 7.5rem)" }}>
          {t("home.hero.title1")}<br /><span style={{ color: "hsl(var(--orange))" }}>{t("home.hero.title2")}</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center px-4 sm:px-0">
          <Link href="/catalogue" className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 font-body font-semibold text-sm text-white rounded-sm transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--orange))" }}>
            {t("home.hero.exploreProducts")} <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 font-body font-semibold text-sm text-white rounded-sm border border-white/25 hover:bg-white/10 transition-all">
            {t("home.hero.getQuote")}
          </Link>
        </motion.div>
      </div>
      {/* Stats bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10" style={{ background: "hsl(var(--navy-deep)/0.7)", backdropFilter: "blur(12px)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { n: "15+", label: t("home.hero.stats.yearsExperience") },
              { n: "50K+", label: t("home.hero.stats.unitsMonth") },
              { n: "200+", label: t("home.hero.stats.products") },
              { n: "25+", label: t("home.hero.stats.exportCountries") },
            ].map(({ n, label }) => (
              <div key={label} className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                <p className="font-display font-bold text-white text-lg sm:text-2xl leading-none mb-0.5 sm:mb-1">{n}</p>
                <p className="font-body text-[10px] sm:text-xs tracking-wide uppercase" style={{ color: "hsl(var(--warm-cream)/0.4)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
