import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TreePine, Layers, ShieldCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const vp = { once: true, amount: 0.05 as const };

export default function CompanyIntro() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/img/WhoWeAre1.png",
    "/img/WhoWeAre2.png",
    "/img/WhoWeAre3.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={vp} transition={{ duration: 1.2, ease }} style={{ transformOrigin: "left", backgroundColor: "hsl(var(--orange))", height: 3 }} />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 lg:py-32">
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5, ease }} className="flex items-center gap-3 mb-8 sm:mb-16">
          <span className="h-px w-10 inline-block" style={{ backgroundColor: "hsl(var(--orange))" }} />
          <span className="font-body text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("home.intro.label")}</span>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
          <div>
            <div className="mb-6 sm:mb-10 space-y-1">
              {[
                { text: t("home.intro.heading1"), outline: false },
                { text: t("home.intro.heading2"), outline: true, italic: true },
                { text: t("home.intro.heading3"), outline: false, accent: true },
              ].map(({ text, outline, italic, accent }, i) => (
                <div key={i}>
                  <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.8, delay: i * 0.08, ease }} className={`font-display font-bold leading-[0.92] tracking-tight block${italic ? " italic" : ""}`} style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: outline ? "transparent" : "hsl(var(--navy-deep))", WebkitTextStroke: outline ? "1.5px hsl(var(--navy-light))" : undefined }}>
                    {accent ? (<>{text.replace(".", "")}<span >.</span></>) : text}
                  </motion.h2>
                </div>
              ))}
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.8, delay: 0.2 }} className="font-body text-sm uppercase tracking-widest font-semibold mt-4" style={{ color: "hsl(var(--orange))" }}>
                {t("home.intro.subline")}
              </motion.p>

            </div>
            <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={vp} transition={{ duration: 0.65, delay: 0.28, ease }} className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 max-w-lg">
              <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{t("home.intro.paragraph1")}</p>
              <p className="font-body text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{ color: "hsl(var(--muted-foreground))" }}>{t("home.intro.paragraph2")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.44, ease }} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/catalogue/outdoor" className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-sm text-white rounded-sm hover:opacity-90 transition-all text-center w-full sm:w-auto" style={{ backgroundColor: "hsl(var(--orange))" }}>
                {t("home.intro.buttons.catalog")}
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-sm text-white rounded-sm hover:bg-white/10 transition-all text-center w-full sm:w-auto" style={{ backgroundColor: "hsl(var(--navy))" }}>
                {t("home.intro.buttons.quote")}
              </Link>
              <Link href="/manufacturing" className="group hidden sm:inline-flex items-center gap-2.5 font-body font-semibold text-sm ml-2" style={{ color: "hsl(var(--navy))" }}>
                <span className="border-b border-current pb-0.5 transition-opacity duration-300 group-hover:opacity-60">{t("home.intro.buttons.factory")}</span>
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45" style={{ backgroundColor: "hsl(var(--orange))" }}>
                  <ArrowUpRight size={12} className="text-white" />
                </span>
              </Link>
            </motion.div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-sm group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0 z-0"
                >
                  <img src={images[currentImage]} alt="Team and Furniture Production" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.1]" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep)/0.3)] to-transparent pointer-events-none z-10" />
              <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.45, delay: 0.65, ease }} className="absolute top-4 right-4 px-3 py-1.5 rounded-full z-20" style={{ backgroundColor: "hsl(var(--orange))" }}>
                <span className="font-body font-semibold text-xs text-white tracking-wide">{t("home.intro.location")}</span>
              </motion.div>

              {/* Slider dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                {
                  title: isVi ? "Chế Tác Gỗ Tự Nhiên" : "Wood Production",
                  detail: isVi ? "Tràm, Giá Tỵ, Bạch Đàn chuẩn FSC" : "Acacia, Teak & Eucalyptus (FSC)",
                  badge: isVi ? "100% FSC" : "100% FSC",
                  icon: TreePine,
                  filled: true,
                },
                {
                  title: isVi ? "Kim Loại & Vật Liệu Phối" : "Metal & Mixed Materials",
                  detail: isVi ? "Khung nhôm định hình, dây đan outdoor" : "Architectural aluminium, rope & sling",
                  badge: isVi ? "Bền Thời Tiết" : "Weatherproof",
                  icon: Layers,
                  filled: false,
                },
                {
                  title: isVi ? "Kiểm Soát Chất Lượng" : "Quality Control (QC)",
                  detail: isVi ? "Quy trình 6 cổng kiểm tra, OTIF ~95%" : "6-gate inspection process, OTIF ~95%",
                  badge: isVi ? "6 Cổng QC" : "6-Gate QC",
                  icon: ShieldCheck,
                  filled: false,
                },
                {
                  title: isVi ? "Đóng Container & Logistics" : "Loading & Logistics",
                  detail: isVi ? "Đóng hàng trực tiếp, xuất Quy Nhơn/Cát Lái" : "Direct container stuffing via Quy Nhon/Cat Lai",
                  badge: isVi ? "Xuất Khẩu" : "Direct Export",
                  icon: Truck,
                  filled: true,
                },
              ].map(({ title, detail, badge, icon: Icon, filled }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.09, ease }}
                  className="rounded-sm p-3.5 sm:p-4 flex flex-col justify-between"
                  style={{
                    backgroundColor: filled ? "#173C2C" : "white",
                    border: filled ? "none" : "1px solid hsl(var(--border))",
                    minHeight: 100,
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: filled ? "rgba(185,120,70,0.25)" : "rgba(23,60,44,0.08)",
                        color: filled ? "#B97846" : "#173C2C",
                      }}
                    >
                      <Icon size={14} />
                    </span>
                    <span
                      className="font-body text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: filled ? "rgba(255,255,255,0.12)" : "rgba(185,120,70,0.12)",
                        color: filled ? "#E8C5A5" : "#B97846",
                      }}
                    >
                      {badge}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-xs sm:text-sm leading-tight mb-0.5"
                      style={{ color: filled ? "white" : "#0E241B" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="font-body text-[11px] leading-snug line-clamp-2"
                      style={{ color: filled ? "rgba(247,245,240,0.72)" : "hsl(var(--muted-foreground))" }}
                    >
                      {detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
