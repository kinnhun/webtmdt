import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { stagger, fadeUp } from "@/lib/animations";

const testimonials = [
  { quote: "DHT delivered all 200 units on time with exceptional finish quality. Professional and responsive throughout.", name: "James Lim", role: "Interior Designer, Singapore", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", project: "200-unit Apartment" },
  { quote: "We've partnered with DHT for three hospitality projects. Consistent quality and hassle-free logistics.", name: "Sophie Tan", role: "Procurement Manager, KL", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", project: "3x Hotel Fit-Out" },
  { quote: "The custom bedroom sets exceeded expectations. True craftsmanship at a competitive price.", name: "Marco Rossi", role: "Property Developer, Bali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", project: "Luxury Villa" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView();
  const vis = inView ? "show" : "hidden";
  const t = testimonials[active];

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div variants={stagger(0, 0.12)} initial="hidden" animate={vis} className="lg:col-span-4">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Client Stories</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Trusted by Designers</motion.h2>
            <div className="flex flex-col gap-3">
              {testimonials.map((tt, i) => (
                <button key={i} onClick={() => setActive(i)} className={`flex items-center gap-3 p-3 rounded-sm text-left transition-all ${i === active ? "shadow-sm opacity-100" : "opacity-60 hover:opacity-80"}`} style={i === active ? { backgroundColor: "hsl(var(--warm-cream))", borderLeft: "3px solid hsl(var(--orange))" } : {}}>
                  <img src={tt.avatar} alt={tt.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-sm">{tt.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{tt.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5 }} className="lg:col-span-8 relative p-8 rounded-sm" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
              <div className="absolute top-0 left-4 font-display text-8xl leading-none select-none pointer-events-none" style={{ color: "hsl(var(--orange)/0.1)" }}>&ldquo;</div>
              <p className="font-display font-medium leading-relaxed text-foreground mb-8 relative z-10" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: "hsl(var(--orange))" }} />
                <div>
                  <p className="font-body font-semibold text-sm">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
