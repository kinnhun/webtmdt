import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domains/product/product.types";

export function HeroSlider({ products, onQuickView }: { products: Product[]; onQuickView: (p: Product) => void }) {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const featured = products.slice(0, 5);

  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = (langEnum[i18n?.language] || "us") as 'vi' | 'uk' | 'us';

  const goTo = useCallback((i: number) => setCurrent((i + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    if (featured.length === 0) return;
    const safeCurrent = current >= featured.length ? 0 : current;
    if (safeCurrent !== current) setCurrent(safeCurrent);

    timerRef.current = setInterval(() => goTo(safeCurrent + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [current, goTo, featured.length]);

  if (!featured.length) return null;
  const safeCurrent = current >= featured.length ? 0 : current;
  const p = featured[safeCurrent];

  const pName = p.name?.[langId] || p.name?.us || "";
  const pCat = p.category?.[langId] || p.category?.us || "";
  const pMat = p.material?.[langId] || p.material?.us || "";
  const pColor = p.color?.[langId] || p.color?.us || "";
  const pStyle = p.style?.[langId] || p.style?.us || "";

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px", backgroundColor: "hsl(var(--navy-deep))" }}>
      <AnimatePresence mode="wait">
        <motion.div key={p.id || p.code || safeCurrent} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6 }} className="absolute inset-0">
          {p.images?.[0] ? (
            <Image src={p.images[0]} alt={pName} fill priority sizes="100vw" className="object-cover opacity-60" />
          ) : (
            <div className="w-full h-full bg-navy opacity-60" />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(var(--navy-deep)) 35%, transparent 80%)" }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-10">
          <AnimatePresence mode="wait">
            <motion.div key={p.id || p.code || safeCurrent} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5 }} className="max-w-md">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-medium mb-3 block" style={{ color: "hsl(var(--orange))" }}>{pCat} — {p.code}</span>
              <h2 className="font-display font-bold text-white text-4xl leading-tight mb-3">{pName}</h2>
              <p className="font-body text-white/50 text-sm mb-1">{pMat} · {pColor}</p>
              <p className="font-body text-white/40 text-sm mb-6">{pStyle} {p.moq && `· MOQ: ${p.moq}`}</p>
              <div className="flex gap-3">
                <button onClick={() => onQuickView(p)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-sm text-white hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(var(--orange))" }}>
                  <Eye size={15} /> {t("catalogue.quickView")}
                </button>
                <Link href={`/contact?product=${encodeURIComponent(pName)}&code=${p.code}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-all">
                  {t("catalogue.inquire")} <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-5 right-6 flex items-center gap-3 z-10">
        <button onClick={() => goTo(current - 1)} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all"><ChevronLeft size={18} /></button>
        <div className="flex gap-1.5">
          {featured.map((_, i) => (<button key={i} onClick={() => goTo(i)} className="w-2 h-2 rounded-full transition-all" style={{ backgroundColor: i === current ? "hsl(var(--orange))" : "rgba(255,255,255,0.3)", transform: i === current ? "scale(1.3)" : "scale(1)" }} />))}
        </div>
        <button onClick={() => goTo(current + 1)} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
