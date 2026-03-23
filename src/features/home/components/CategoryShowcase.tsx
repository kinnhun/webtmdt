import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, fadeLeft, stagger, cardReveal } from "@/lib/animations";

const categories = [
  { name: "Bedroom", tagline: "Rest in elegance", count: "48 products", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop", href: "/catalogue?category=Bedroom" },
  { name: "Dining Room", tagline: "Gather, dine, celebrate", count: "32 products", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop", href: "/catalogue?category=Dining+Room" },
  { name: "Living Room", tagline: "Where comfort meets design", count: "56 products", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop", href: "/catalogue?category=Living+Room" },
  { name: "Home Office", tagline: "Work with purpose", count: "24 products", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop", href: "/catalogue?category=Home+Office" },
  { name: "Outdoor", tagline: "Extend your living space", count: "18 products", image: "https://images.unsplash.com/photo-1520587337572-92e75e9b6c0b?w=900&auto=format&fit=crop", href: "/catalogue?category=Outdoor" },
];

function CategoryCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  return (
    <motion.div {...cardReveal(index)} className="h-full">
      <Link href={cat.href} className="group block relative overflow-hidden rounded-sm h-full">
        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)) 0%, hsl(var(--navy-deep)/0.5) 40%, transparent 80%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="font-body text-xs text-white/50 mb-1 uppercase tracking-widest">{cat.tagline}</p>
              <h3 className="font-display font-bold text-white text-xl leading-tight">{cat.name}</h3>
            </div>
            <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ backgroundColor: "hsl(var(--orange))" }}>
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>
          <div className="h-px mt-3 mb-2 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <p className="font-body text-xs text-white/40 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{cat.count}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategoryShowcase() {
  const { ref, inView } = useInView();
  const vis = inView ? "show" : "hidden";

  return (
    <section className="py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref} className="container mx-auto px-6 md:px-8">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div variants={stagger(0, 0.1)} initial="hidden" animate={vis}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Collections</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Every Room,<br />Perfectly Furnished
              </motion.h2>
            </motion.div>
            <motion.div variants={fadeLeft} initial="hidden" animate={vis} transition={{ delay: 0.3 }}>
              <Link href="/catalogue" className="inline-flex items-center gap-2 font-body font-semibold text-sm group" style={{ color: "hsl(var(--navy))" }}>
                View All
                <span className="w-6 h-px transition-all duration-300 group-hover:w-12" style={{ backgroundColor: "hsl(var(--navy))", display: "inline-block" }} />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-12 grid-rows-2 gap-4" style={{ height: "clamp(520px, 70vh, 780px)" }}>
            <div className="col-span-12 md:col-span-4 row-span-2"><CategoryCard cat={categories[0]} index={0} /></div>
            <div className="col-span-12 md:col-span-4 row-span-1"><CategoryCard cat={categories[1]} index={1} /></div>
            <div className="col-span-12 md:col-span-4 row-span-1"><CategoryCard cat={categories[2]} index={2} /></div>
            <div className="col-span-12 md:col-span-4 row-span-1"><CategoryCard cat={categories[3]} index={3} /></div>
            <div className="col-span-12 md:col-span-4 row-span-1"><CategoryCard cat={categories[4]} index={4} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
