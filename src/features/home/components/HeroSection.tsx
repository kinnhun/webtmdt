import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col justify-between"
      style={{ minHeight: "100svh", backgroundColor: "#0E241B" }}
    >
      {/* Background Factory Video & Forest Green Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fallback image while video is loading */}
        <Image
          src="/img/WhyDHT.png"
          alt="DHT Furniture Manufacturing Network"
          fill
          priority
          quality={85}
          className="object-cover object-center scale-105"
        />

        {/* Background YouTube Video Embed */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube-nocookie.com/embed/roXn8vbbRkI?autoplay=1&mute=1&loop=1&playlist=roXn8vbbRkI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full scale-110 pointer-events-none border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            title="DHT Furniture Manufacturing Video"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        {/* Forest Green Gradient Overlay balanced for legibility and video clarity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14, 36, 27, 0.6) 0%, rgba(23, 60, 44, 0.42) 45%, rgba(14, 36, 27, 0.88) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0E241B]/20 to-[#0E241B]/75 pointer-events-none" />
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
          style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.35rem)" }}
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
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-body font-semibold text-sm text-white shadow-xl hover:brightness-110 transition-all duration-300"
            style={{ backgroundColor: "#B97846" }}
          >
            {t("home.hero.requestQuote", isVi ? "Yêu cầu Báo giá" : "Request a Quotation")} <ArrowRight size={16} />
          </Link>

          <Link
            href="/catalogue/outdoor"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-body font-semibold text-sm text-white border border-white/25 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            {t("home.hero.exploreProducts", isVi ? "Khám phá Bộ sưu tập" : "Explore Collections")}
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
              {
                n: "11",
                label: t("home.hero.stats.facilities"),
                sub: isVi ? "10 Xưởng thành phẩm + 1 Xưởng ván" : "10 Furniture + 1 Panel",
              },
              {
                n: "543,380 m²",
                label: t("home.hero.stats.footprint"),
                sub: isVi ? "283.380 m² Xưởng thành phẩm" : "283,380 m² Finished",
              },
              {
                n: "~2,400",
                label: t("home.hero.stats.personnel"),
                sub: isVi ? "Nhân sự mạng lưới sản xuất" : "Network Personnel",
              },
              {
                n: "4",
                label: t("home.hero.stats.clusters"),
                sub: isVi ? "Cụm trọng điểm tại Việt Nam" : "Key Hubs in Vietnam",
              },
            ].map(({ n, label, sub }) => (
              <div key={label} className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                <p className="font-display lining-nums tabular-nums font-bold text-white text-xl sm:text-2xl leading-none mb-1 whitespace-nowrap">
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
              {isVi
                ? "* Tổng diện tích 543.380 m² bao gồm 283.380 m² cơ sở sản xuất nội thất thành phẩm và 260.000 m² cơ sở ván gỗ và chế biến gỗ nguyên liệu."
                : "* 543,380 m² combined footprint includes 283,380 m² dedicated finished furniture facilities and 260,000 m² panel/primary processing facility."}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
