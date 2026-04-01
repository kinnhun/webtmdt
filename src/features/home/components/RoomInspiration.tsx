import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";

function useCardSize() {
  const [size, setSize] = useState({ w: 340, h: 440 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) setSize({ w: 260, h: 340 });
      else if (vw < 768) setSize({ w: 300, h: 380 });
      else setSize({ w: 340, h: 440 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

const ROOM_KEYS = ["masterBedroom", "livingRoom", "familyDining", "homeOffice", "outdoorPatio"] as const;

const roomImages: Record<string, { image: string; href: string }> = {
  masterBedroom: { image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&auto=format&fit=crop&q=80", href: "/catalogue/indoor?category=Bedroom" },
  livingRoom: { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&auto=format&fit=crop&q=80", href: "/catalogue/indoor?category=Living+Room" },
  familyDining: { image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop&q=80", href: "/catalogue/indoor?category=Dining+Room" },
  homeOffice: { image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop&q=80", href: "/catalogue/indoor?category=Home+Office" },
  outdoorPatio: { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&auto=format&fit=crop&q=80", href: "/catalogue/outdoor?category=Outdoor" },
};

const GAP = 16;

function RoomCard({ roomKey, index, cardWidth, cardHeight, t }: { roomKey: string; index: number; cardWidth: number; cardHeight: number; t: (k: string) => string }) {
  const room = roomImages[roomKey];
  return (
    <div className="group relative shrink-0 overflow-hidden rounded-lg cursor-pointer shadow-lg" style={{ width: cardWidth, height: cardHeight }}>
      <Link href={room.href} className="block w-full h-full relative">
        <img src={room.image} alt={t(`home.rooms.${roomKey}.name`)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--navy-deep)/0.9) 0%, hsl(var(--navy-deep)/0.25) 45%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: "hsl(var(--navy)/0.15)" }} />
        <span className="absolute top-0 right-5 font-display font-bold leading-none select-none transition-opacity duration-300 group-hover:opacity-0" style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.1)", top: "1rem" }}>0{(index % ROOM_KEYS.length) + 1}</span>
        <span className="absolute top-5 left-5 font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm" style={{ backgroundColor: "hsl(var(--orange))", color: "#fff" }}>{t(`home.rooms.${roomKey}.label`)}</span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-body text-xs text-white/60 mb-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{t(`home.rooms.${roomKey}.tagline`)}</p>
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-display font-bold text-white text-xl leading-tight">{t(`home.rooms.${roomKey}.name`)}</h3>
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
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { w: CARD_WIDTH, h: CARD_HEIGHT } = useCardSize();

  const extendedKeys = [...ROOM_KEYS, ...ROOM_KEYS, ...ROOM_KEYS];
  const startOffset = ROOM_KEYS.length;

  const getTranslateX = useCallback((idx: number) => {
    return -(idx + startOffset) * (CARD_WIDTH + GAP);
  }, [startOffset, CARD_WIDTH]);

  const slide = useCallback((dir: "left" | "right") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + (dir === "right" ? 1 : -1));
  }, [isTransitioning]);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    setCurrentIndex((prev) => {
      if (prev >= ROOM_KEYS.length) return prev - ROOM_KEYS.length;
      if (prev < -ROOM_KEYS.length + 1) return prev + ROOM_KEYS.length;
      return prev;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => { slide("right"); }, 4000);
    return () => clearInterval(timer);
  }, [slide]);

  const translateX = getTranslateX(currentIndex);

  return (
    <section className="py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("home.rooms.label")}</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "hsl(var(--navy-deep))" }}>{t("home.rooms.heading")}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="font-body text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm">{t("home.rooms.description")}</motion.p>
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

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex py-2 px-4 sm:px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
            style={{
              gap: GAP,
              transform: `translateX(${translateX}px)`,
              transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedKeys.map((key, i) => (
              <RoomCard key={`room-${i}`} roomKey={key} index={i} cardWidth={CARD_WIDTH} cardHeight={CARD_HEIGHT} t={t} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {ROOM_KEYS.map((_, i) => {
            const active = ((currentIndex % ROOM_KEYS.length) + ROOM_KEYS.length) % ROOM_KEYS.length === i;
            return (
              <button
                key={i}
                onClick={() => { setIsTransitioning(true); setCurrentIndex(i); }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: active ? "hsl(var(--orange))" : "hsl(var(--border))", transform: active ? "scale(1.4)" : "scale(1)" }}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
