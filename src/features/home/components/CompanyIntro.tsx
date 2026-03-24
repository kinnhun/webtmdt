import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.05 };

export default function CompanyIntro() {
  const { t } = useTranslation();

  return (
    <section style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={vp} transition={{ duration: 1.2, ease }} style={{ transformOrigin: "left", backgroundColor: "hsl(var(--orange))", height: 3 }} />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 lg:py-32">
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5, ease }} className="flex items-center gap-3 mb-8 sm:mb-16">
          <span className="h-px w-10 inline-block" style={{ backgroundColor: "hsl(var(--orange))" }} />
          <span className="font-body text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("home.intro.label")}</span>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
          <div>
            <div className="mb-6 sm:mb-10 space-y-1">
              {[
                { text: t("home.intro.heading1"), outline: false },
                { text: t("home.intro.heading2"), outline: true, italic: true },
                { text: t("home.intro.heading3"), outline: false, accent: true },
              ].map(({ text, outline, italic, accent }, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h2 initial={{ y: "105%" }} whileInView={{ y: 0 }} viewport={vp} transition={{ duration: 0.8, delay: i * 0.08, ease }} className={`font-display font-bold leading-[0.92] tracking-tight block${italic ? " italic" : ""}`} style={{ fontSize: "clamp(2.2rem, 6.5vw, 6rem)", color: outline ? "transparent" : "hsl(var(--navy-deep))", WebkitTextStroke: outline ? "1.5px hsl(var(--navy-light))" : undefined }}>
                    {accent ? (<>{text.replace(".", "")}<span style={{ color: "hsl(var(--orange))" }}>.</span></>) : text}
                  </motion.h2>
                </div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={vp} transition={{ duration: 0.65, delay: 0.28, ease }} className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 max-w-lg">
              <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{t("home.intro.paragraph1")}</p>
              <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{t("home.intro.paragraph2")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.44, ease }}>
              <Link href="/about" className="group inline-flex items-center gap-2.5 font-body font-semibold text-sm" style={{ color: "hsl(var(--navy))" }}>
                <span className="border-b border-current pb-0.5 transition-opacity duration-300 group-hover:opacity-60">{t("home.intro.ourStory")}</span>
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-45" style={{ backgroundColor: "hsl(var(--orange))" }}>
                  <ArrowUpRight size={12} className="text-white" />
                </span>
              </Link>
            </motion.div>
          </div>
          <div className="flex flex-col gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={vp} transition={{ duration: 1, delay: 0.1, ease }} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=85" alt="DHT outdoor furniture production" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.55) 0%, transparent 55%)" }} />
              <motion.div initial={{ opacity: 0, y: 14, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={vp} transition={{ duration: 0.5, delay: 0.55, ease }} className="absolute bottom-4 left-4 px-5 py-3.5 rounded-sm shadow-2xl" style={{ backgroundColor: "hsl(var(--navy))" }}>
                <p className="font-display font-bold text-2xl text-white leading-none">ISO</p>
                <p className="font-body text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t("home.intro.isoCertified")}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.45, delay: 0.65, ease }} className="absolute top-4 right-4 px-3 py-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--orange))" }}>
                <span className="font-body font-semibold text-xs text-white tracking-wide">{t("home.intro.location")}</span>
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { n: "15+", label: t("home.intro.statsYears"), filled: true },
                { n: "50K", label: t("home.intro.statsUnits"), filled: false },
                { n: "400+", label: t("home.intro.statsCraftspeople"), filled: true },
                { n: "25+", label: t("home.intro.statsExport"), filled: false },
              ].map(({ n, label, filled }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.55, delay: 0.2 + i * 0.09, ease }} className="rounded-sm px-4 sm:px-5 py-4 sm:py-5" style={{ backgroundColor: filled ? "hsl(var(--navy))" : "white", border: filled ? "none" : "1px solid hsl(var(--border))", minHeight: 76 }}>
                  <p className="font-display font-bold leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: filled ? "white" : "hsl(var(--navy))" }}>{n}</p>
                  <p className="font-body text-xs tracking-[0.12em] uppercase font-medium" style={{ color: filled ? "rgba(255,255,255,0.45)" : "hsl(var(--muted-foreground))" }}>{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
