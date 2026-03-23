import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const rooms = [
  { name: "Master Bedroom", label: "Bedroom", tagline: "Where rest becomes ritual", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&auto=format&fit=crop", href: "/catalogue?category=Bedroom" },
  { name: "Living Room", label: "Living", tagline: "The heart of every home", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop", href: "/catalogue?category=Living+Room" },
  { name: "Family Dining", label: "Dining", tagline: "Crafted for moments shared", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop", href: "/catalogue?category=Dining+Room" },
  { name: "Home Office", label: "Office", tagline: "Focus meets form", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop", href: "/catalogue?category=Home+Office" },
  { name: "Outdoor", label: "Outdoor", tagline: "Design without walls", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&auto=format&fit=crop", href: "/catalogue?category=Outdoor" },
];

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }} className="group relative flex-shrink-0 w-[72vw] md:w-[38vw] lg:w-[26vw] h-[70vh] max-h-[600px] overflow-hidden rounded-sm cursor-pointer">
      <Link href={room.href} className="block w-full h-full">
        <img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.85) 0%, hsl(var(--navy-deep)/0.2) 50%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: "hsl(var(--navy)/0.35)" }} />
        <span className="absolute top-5 right-5 font-display font-bold leading-none select-none transition-opacity duration-300 group-hover:opacity-0" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "rgba(255,255,255,0.12)" }}>0{index + 1}</span>
        <span className="absolute top-5 left-5 font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm" style={{ backgroundColor: "hsl(var(--orange))", color: "#fff" }}>{room.label}</span>
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
          <p className="font-body text-xs text-white/70 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">{room.tagline}</p>
          <div className="flex items-end justify-between">
            <h3 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>{room.name}</h3>
            <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: "hsl(var(--orange))" }}>
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>
          <div className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out mt-1" style={{ backgroundColor: "hsl(var(--orange)/0.7)" }} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function RoomInspiration() {
  const { ref, inView } = useInView();
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Inspiration</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "hsl(var(--navy-deep))" }}>Room by Room</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="font-body text-sm text-muted-foreground mt-2 max-w-sm">Every space tells a story. Discover furniture curated for each room in your home.</motion.p>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="font-body text-xs text-muted-foreground flex items-center gap-2 md:pb-2">
              <span>Swipe to explore</span>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "hsl(var(--muted-foreground)/0.4)" }} />
            </motion.p>
          </div>
        </div>
        <div ref={trackRef} className="flex gap-4 overflow-x-auto scrollbar-none px-6 md:px-[calc((100vw-1400px)/2+2rem)]" style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingBottom: "8px" }}>
          {rooms.map((room, i) => (<RoomCard key={room.name} room={room} index={i} />))}
          <div className="flex-shrink-0 w-6 md:w-12" />
        </div>
      </div>
    </section>
  );
}
