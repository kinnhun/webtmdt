import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.1 };

const points = [
  "In-house production: no outsourcing, full quality control",
  "Custom sizes, finishes, and OEM / ODM available",
  "Stable capacity for large hospitality & development projects",
  "Experienced export team, on-time delivery record",
  "FSC-certified materials, sustainable sourcing",
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1549497538-303791108f95?w=1600&auto=format&fit=crop&q=85" alt="Factory" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(var(--navy-deep)/0.97) 0%, hsl(var(--navy-deep)/0.90) 45%, hsl(var(--navy-deep)/0.4) 100%)" }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-28">
        <div className="max-w-xl">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.6, ease }} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Why DHT</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={vp} transition={{ duration: 0.7, delay: 0.1, ease }} className="font-display font-bold text-white leading-tight mb-7" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Your Trusted Manufacturing Partner</motion.h2>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, delay: 0.2, ease }} className="font-body text-sm sm:text-base text-white/60 leading-relaxed mb-8 sm:mb-10">From concept sketch to container delivery — we manage every step with precision, transparency, and care.</motion.p>
          <ul className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
            {points.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -20, filter: "blur(4px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={vp} transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease }} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                <span className="font-body text-sm text-white/70">{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.7, ease }} className="flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--orange))" }}>Request a Quote <ArrowRight size={15} /></Link>
            <Link href="/catalogue" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-all">View Catalogue</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
