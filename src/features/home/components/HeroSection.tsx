import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative w-full overflow-hidden flex flex-col justify-between" style={{ minHeight: "100svh", backgroundColor: "#0E241B" }}>
      {/* Background Factory Imagery & Forest Green Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/img/WhyDHT.png"
          alt="DHT Manufacturing Factory"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105"
        />
        {/* Deep Forest Green Gradient Overlay according to 2026 Master Palette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(14, 36, 27, 0.72) 0%, rgba(23, 60, 44, 0.82) 45%, rgba(14, 36, 27, 0.96) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0E241B]/40 to-[#0E241B]/90" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md mb-5"
          style={{ backgroundColor: "rgba(185, 120, 70, 0.15)" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#B97846] animate-pulse" />
          <span className="font-body text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-[#E8C5A5]">
            {t("home.hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white text-center leading-[1.08] tracking-tight mb-4 max-w-5xl mx-auto"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          {t("home.hero.title1")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-8"
        >
          {t("home.hero.title2")}
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/catalogue/outdoor"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-body font-semibold text-sm text-white shadow-xl hover:brightness-110 transition-all duration-300"
            style={{ backgroundColor: "#B97846" }}
          >
            {t("home.hero.exploreProducts")} <ArrowRight size={16} />
          </Link>

          <a
            href="/DHT_Company_Profile_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-body font-semibold text-sm text-white border border-white/30 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
          >
            <FileText size={16} className="text-[#B97846]" />
            View Company Profile (PDF)
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-body font-semibold text-sm text-white/80 hover:text-white hover:underline transition-all duration-300"
          >
            {t("home.hero.getQuote")}
          </Link>
        </motion.div>
      </div>

      {/* Stats Bar with Footnote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 border-t border-white/10"
        style={{ background: "rgba(14, 36, 27, 0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { n: "11", label: t("home.hero.stats.facilities"), sub: "10 Furniture + 1 Panel" },
              { n: "543,380 m²", label: t("home.hero.stats.footprint"), sub: "283,380 m² Finished" },
              { n: "~2,400", label: t("home.hero.stats.personnel"), sub: "Group Manufacturing" },
              { n: "4", label: t("home.hero.stats.clusters"), sub: "Key Hubs in Vietnam" },
            ].map(({ n, label, sub }) => (
              <div key={label} className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                <p className="font-display lining-nums tabular-nums font-bold text-white text-xl sm:text-2xl leading-none mb-1">
                  {n}
                </p>
                <p className="font-body text-[11px] sm:text-xs tracking-wide uppercase text-white/80 font-medium">
                  {label}
                </p>
                <p className="font-body text-[10px] text-[#B97846] mt-0.5 hidden sm:block">
                  {sub}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-2 pt-2 border-t border-white/5">
            <p className="font-body text-[10px] text-white/40 tracking-wider">
              * 543,380 m² combined footprint includes 283,380 m² dedicated finished furniture facilities and 260,000 m² panel/primary processing facility.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
