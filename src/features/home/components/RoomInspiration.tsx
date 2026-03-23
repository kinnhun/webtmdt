import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const rooms = [
  { name: "Master Bedroom", label: "Bedroom", tagline: "Where rest becomes ritual", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&auto=format&fit=crop&q=80", href: "/catalogue?category=Bedroom" },
  { name: "Living Room", label: "Living", tagline: "The heart of every home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&auto=format&fit=crop&q=80", href: "/catalogue?category=Living+Room" },
  { name: "Family Dining", label: "Dining", tagline: "Crafted for moments shared", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop&q=80", href: "/catalogue?category=Dining+Room" },
  { name: "Home Office", label: "Office", tagline: "Focus meets form", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop&q=80", href: "/catalogue?category=Home+Office" },
  { name: "Outdoor Patio", label: "Outdoor", tagline: "Design without walls", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&auto=format&fit=crop&q=80", href: "/catalogue?category=Outdoor" },
];

export default function RoomInspiration() {
  const { ref, inView } = useInView();
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLElement>("[data-room-card]");
    const cardWidth = card?.offsetWidth ?? 360;
    const gap = 20;
    trackRef.current.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" });
  };

  return (
    <section className="py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
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
            {/* Desktop nav arrows */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="hidden md:flex items-center gap-2 pb-1">
              <button onClick={() => scroll("left")} className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:bg-white hover:shadow-sm" style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--navy-deep))" }} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll("right")} className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:bg-white hover:shadow-sm" style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--navy-deep))" }} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scrollable track — overflow visible for cards */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {rooms.map((room, i) => (
              <motion.div
                key={room.name}
                data-room-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative shrink-0 snap-start overflow-hidden rounded-lg cursor-pointer shadow-lg"
                style={{ width: "min(340px, 75vw)", height: "440px" }}
              >
                <Link href={room.href} className="block w-full h-full relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.9) 0%, hsl(var(--navy-deep)/0.25) 45%, transparent 100%)" }} />
                  {/* Hover tint */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: "hsl(var(--navy)/0.15)" }} />

                  {/* Number watermark */}
                  <span className="absolute top-4 right-5 font-display font-bold leading-none select-none transition-opacity duration-300 group-hover:opacity-0" style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.1)" }}>0{i + 1}</span>

                  {/* Label badge */}
                  <span className="absolute top-5 left-5 font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm" style={{ backgroundColor: "hsl(var(--orange))", color: "#fff" }}>{room.label}</span>

                  {/* Content at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-body text-xs text-white/60 mb-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{room.tagline}</p>
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="font-display font-bold text-white text-xl leading-tight">{room.name}</h3>
                      <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: "hsl(var(--orange))" }}>
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>
                    <div className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out mt-2" style={{ backgroundColor: "hsl(var(--orange)/0.5)" }} />
                  </div>
                </Link>
              </motion.div>
            ))}
            {/* End spacer */}
            <div className="shrink-0 w-4 md:w-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
