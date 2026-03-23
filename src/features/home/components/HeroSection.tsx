import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const HERO_VIDEO = "https://videos.pexels.com/video-files/4812452/4812452-hd_1920_1080_25fps.mp4";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 560, backgroundColor: "hsl(var(--navy-deep))" }}>
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }}>
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(var(--navy-deep)/0.3) 0%, hsl(var(--navy-deep)/0.65) 60%, hsl(var(--navy-deep)) 100%)" }} />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="font-body text-xs tracking-[0.3em] uppercase font-medium mb-6" style={{ color: "hsl(var(--orange))" }}>
          DHT · Outdoor Furniture Production
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
          Crafted for the<br /><span style={{ color: "hsl(var(--orange))" }}>Outdoors</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap gap-3 justify-center">
          <Link href="/catalogue" className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-semibold text-sm text-white rounded-sm transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--orange))" }}>
            Explore Products <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-semibold text-sm text-white rounded-sm border border-white/25 hover:bg-white/10 transition-all">
            Get a Quote
          </Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10" style={{ background: "hsl(var(--navy-deep)/0.7)", backdropFilter: "blur(12px)" }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { n: "15+", label: "Years Experience" },
              { n: "50K+", label: "Units / Month" },
              { n: "200+", label: "Products" },
              { n: "25+", label: "Export Countries" },
            ].map(({ n, label }) => (
              <div key={label} className="px-6 py-4 text-center">
                <p className="font-display font-bold text-white text-2xl leading-none mb-1">{n}</p>
                <p className="font-body text-xs tracking-wide uppercase" style={{ color: "hsl(var(--warm-cream)/0.4)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
