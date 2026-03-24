import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domains/product/product.types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useTranslation();

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
              <button onClick={onClose} className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md text-muted-foreground hover:text-foreground hover:bg-gray-50 transition-colors">
                <X size={20} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative bg-beige min-h-72">
                  <img src={product.images[activeImage]} alt={product.name} className="w-full h-80 md:h-full object-cover" />
                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {product.images.map((_, i) => (
                        <button key={i} onClick={() => setActiveImage(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? "bg-white scale-125" : "bg-white/50"}`} />
                      ))}
                    </div>
                  )}
                  {product.images.length > 1 && (
                    <>
                      <button onClick={() => setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setActiveImage((prev) => (prev + 1) % product.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow">
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>
                <div className="p-7 flex flex-col gap-5">
                  <div>
                    <p className="font-body text-xs text-muted-foreground mb-1 tracking-wider uppercase">{product.code}</p>
                    <h2 className="font-display text-2xl text-foreground font-semibold">{product.name}</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      { label: t("product.category"), value: product.category },
                      { label: t("product.material"), value: product.material },
                      { label: t("product.color"), value: product.color },
                      { label: t("product.size"), value: product.size },
                      { label: t("product.style"), value: product.style },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-sm">
                        <span className="font-body text-muted-foreground">{label}: </span>
                        <span className="font-body font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  <ul className="space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "hsl(var(--accent))" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 mt-auto pt-2">
                    <Link href={`/contact?product=${encodeURIComponent(product.name)}&code=${product.code}`} className="w-full py-3 rounded font-body font-medium text-center text-white text-sm transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--accent))" }} onClick={onClose}>
                      {t("product.sendInquiry")}
                    </Link>
                    <a href={`https://wa.me/1234567890?text=Hi, I'd like to inquire about ${product.name} (${product.code})`} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded font-body font-medium text-center text-sm border transition-all hover:bg-orange/5" style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))" }}>
                      <Phone size={14} className="inline mr-2" /> {t("product.whatsappUs")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
