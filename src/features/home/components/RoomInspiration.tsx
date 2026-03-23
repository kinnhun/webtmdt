import { useRef, useState, useCallback, useEffect } from "react";
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

const CARD_WIDTH = 340;
const GAP = 20;
const VISIBLE_DESKTOP = 4; // cards visible on desktop

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  return (
    <div
      className="group relative shrink-0 overflow-hidden rounded-lg cursor-pointer shadow-lg"
      style={{ width: CARD_WIDTH, height: 440 }}
    >
      <Link href={room.href} className="block w-full h-full relative">
        <img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.9) 0%, hsl(var(--navy-deep)/0.25) 45%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: "hsl(var(--navy)/0.15)" }} />
        <span className="absolute top-4 right-5 font-display font-bold leading-none select-none transition-opacity duration-300 group-hover:opacity-0" style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.1)" }}>0{(index % rooms.length) + 1}</span>
        <span className="absolute top-5 left-5 font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm" style={{ backgroundColor: "hsl(var(--orange))", color: "#fff" }}>{room.label}</span>
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
    </div>
  );
}

export default function RoomInspiration() {
  const { ref, inView } = useInView();
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create extended array: [...rooms, ...rooms, ...rooms] for infinite illusion
  const extendedRooms = [...rooms, ...rooms, ...rooms];
  const startOffset = rooms.length; // start at the middle copy

  // Calculate translateX
  const getTranslateX = useCallback((idx: number) => {
    return -(idx + startOffset) * (CARD_WIDTH + GAP);
  }, [startOffset]);

  // Jump without animation to reset position when wrapping
  const jumpTo = useCallback((idx: number) => {
    setIsTransitioning(false);
    setCurrentIndex(idx);
  }, []);

  const slide = useCallback((dir: "left" | "right") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + (dir === "right" ? 1 : -1));
  }, [isTransitioning]);

  // After transition ends, check if we need to silently reset
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    setCurrentIndex((prev) => {
      if (prev >= rooms.length) {
        // Went past the end → jump to equivalent position in middle
        return prev - rooms.length;
      }
      if (prev < -rooms.length + 1) {
        // Went past the beginning → jump to equivalent position in middle
        return prev + rooms.length;
      }
      return prev;
    });
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      slide("right");
    }, 4000);
    return () => clearInterval(timer);
  }, [slide]);

  const translateX = getTranslateX(currentIndex);

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
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="hidden md:flex items-center gap-2 pb-1">
              <button onClick={() => slide("left")} className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:bg-white hover:shadow-sm" style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--navy-deep))" }} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => slide("right")} className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:bg-white hover:shadow-sm" style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--navy-deep))" }} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Infinite carousel track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex py-2 px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
            style={{
              gap: GAP,
              transform: `translateX(${translateX}px)`,
              transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedRooms.map((room, i) => (
              <RoomCard key={`room-${i}`} room={room} index={i} />
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {rooms.map((_, i) => {
            const active = ((currentIndex % rooms.length) + rooms.length) % rooms.length === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(i);
                }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: active ? "hsl(var(--orange))" : "hsl(var(--border))",
                  transform: active ? "scale(1.4)" : "scale(1)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
