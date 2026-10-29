import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Compass, Factory, ShieldCheck, Truck } from "lucide-react";
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
    "/img/WhoWeAre3.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const capabilityCards = [
    {
      title: t(
        "home.intro.cards.development.title",
        isVi ? "Phát triển sản phẩm" : "Product Development"
      ),
      detail: t(
        "home.intro.cards.development.detail",
        isVi
          ? "Bản vẽ kỹ thuật, làm mẫu và lựa chọn vật liệu theo yêu cầu."
          : "Technical drawings, sampling and material selection aligned to your brief."
      ),
      icon: Compass,
      filled: true,
    },
    {
      title: t(
        "home.intro.cards.coordination.title",
        isVi ? "Phối hợp sản xuất" : "Production Coordination"
      ),
      detail: t(
        "home.intro.cards.coordination.detail",
        isVi
          ? "Điều phối tới cơ sở sản xuất chuyên môn phù hợp tại Việt Nam."
          : "Allocated to the appropriate specialised facility across Vietnam."
      ),
      icon: Factory,
      filled: false,
    },
    {
      title: t(
        "home.intro.cards.qc.title",
        isVi ? "Kiểm soát chất lượng" : "Quality Control"
      ),
      detail: t(
        "home.intro.cards.qc.detail",
        isVi
          ? "Kiểm tra xuyên suốt từ vật liệu đầu vào đến trước khi xuất hàng."
          : "In-line inspections from incoming materials to pre-shipment."
      ),
      icon: ShieldCheck,
      filled: false,
    },
    {
      title: t(
        "home.intro.cards.logistics.title",
        isVi ? "Xuất khẩu & logistics" : "Export & Logistics"
      ),
      detail: t(
        "home.intro.cards.logistics.detail",
        isVi
          ? "Phối hợp đóng gói, đóng container và chứng từ xuất khẩu."
          : "Packaging, container loading and export documentation coordination."
      ),
      icon: Truck,
      filled: true,
    },
  ];

  return (
    <section style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={vp}
        transition={{ duration: 1.2, ease }}
        style={{ transformOrigin: "left", backgroundColor: "hsl(var(--orange))", height: 3 }}
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-6 sm:mb-10"
        >
          <span className="h-px w-10 inline-block" style={{ backgroundColor: "hsl(var(--orange))" }} />
          <span
            className="font-body text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: "hsl(var(--orange))" }}
          >
            {t("home.intro.label", isVi ? "Về DHT" : "Who We Are")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Title, Subline, 2 Paragraphs, CTAs */}
          <div>
            <div className="mb-6 sm:mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.7, ease }}
                className="font-display font-bold leading-[1.1] tracking-tight max-w-xl"
                style={{
                  fontSize: "clamp(2rem, 3.6vw, 3.35rem)",
                  color: "hsl(var(--navy-deep))",
                }}
              >
                {t(
                  "home.intro.heading",
                  isVi
                    ? "Một đầu mối cho nội thất ngoài trời, trong nhà và dự án."
                    : "One Partner for Outdoor, Indoor & Project Furniture."
                )}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.7, delay: 0.12, ease }}
                className="font-body text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold mt-4"
                style={{ color: "hsl(var(--orange))" }}
              >
                {t(
                  "home.intro.subline",
                  isVi
                    ? "Nội thất ngoài trời · Nội thất trong nhà · Nội thất dự án · Ván gỗ & Chế biến gỗ"
                    : "Outdoor · Indoor · Project Furniture · Wood & Panels"
                )}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.65, delay: 0.2, ease }}
              className="space-y-4 mb-8 sm:mb-10 max-w-xl"
            >
              <p
                className="font-body text-sm sm:text-base leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {t(
                  "home.intro.paragraph1",
                  isVi
                    ? "DHT Furniture kết nối khách hàng quốc tế với năng lực chuyên môn của DHT, JAGER, THE ONE và MEKONG trong mạng lưới sản xuất tại Việt Nam."
                    : "DHT Furniture connects international buyers with the specialised capabilities of DHT, JAGER, THE ONE and MEKONG across our manufacturing network in Vietnam."
                )}
              </p>
              <p
                className="font-body text-sm sm:text-base leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {t(
                  "home.intro.paragraph2",
                  isVi
                    ? "Từ nội thất ngoài trời, nội thất trong nhà đến yêu cầu dự án và chế biến gỗ, đội ngũ DHT phối hợp phát triển sản phẩm, sản xuất, kiểm soát chất lượng và xuất khẩu thông qua một đầu mối thương mại."
                    : "From outdoor collections and indoor furniture to project requirements and wood processing, our team coordinates product development, production, quality control and export through one commercial contact."
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/catalogue/outdoor"
                className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-sm text-white rounded-sm hover:opacity-90 transition-all text-center w-full sm:w-auto"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                {t("home.intro.buttons.catalog", isVi ? "Xem Bộ sưu tập" : "Explore Collections")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-sm text-white rounded-sm hover:opacity-90 transition-all text-center w-full sm:w-auto"
                style={{ backgroundColor: "hsl(var(--navy))" }}
              >
                {t("home.intro.buttons.quote", isVi ? "Yêu cầu Báo giá" : "Request a Quote")}
              </Link>
              <Link
                href="/manufacturing"
                className="group hidden sm:inline-flex items-center gap-2.5 font-body font-semibold text-sm ml-2"
                style={{ color: "hsl(var(--navy))" }}
              >
                <span className="border-b border-current pb-0.5 transition-opacity duration-300 group-hover:opacity-60">
                  {t("home.intro.buttons.factory", isVi ? "Năng lực Sản xuất" : "Manufacturing Network")}
                </span>
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45"
                  style={{ backgroundColor: "hsl(var(--orange))" }}
                >
                  <ArrowUpRight size={12} className="text-white" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Instant-render Image + 4 Equal-Height Capability Cards */}
          <div className="flex flex-col gap-4">
            <div className="relative h-64 sm:h-80 lg:h-[340px] overflow-hidden rounded-sm group bg-[#173C2C]">
              {images.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt="DHT Manufacturing Network"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    idx === currentImage
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 z-0 pointer-events-none"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep)/0.35)] to-transparent pointer-events-none z-20" />
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full z-20"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                <span className="font-body font-semibold text-xs text-white tracking-wide">
                  {t("home.intro.location", isVi ? "Mạng lưới sản xuất tại Việt Nam" : "Vietnam Manufacturing Network")}
                </span>
              </div>

              {/* Slider dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentImage ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr">
              {capabilityCards.map(({ title, detail, icon: Icon, filled }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                  className="rounded-sm p-4 sm:p-5 flex flex-col justify-between h-full"
                  style={{
                    backgroundColor: filled ? "#173C2C" : "white",
                    border: filled ? "1px solid #173C2C" : "1px solid hsl(var(--border))",
                    minHeight: 120,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: filled ? "rgba(185,120,70,0.25)" : "rgba(23,60,44,0.08)",
                        color: filled ? "#E8C5A5" : "#173C2C",
                      }}
                    >
                      <Icon size={16} />
                    </span>
                    <span
                      className="font-body text-[10px] tracking-[0.18em] uppercase font-bold"
                      style={{ color: filled ? "#E8C5A5" : "#B97846" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-sm sm:text-base leading-snug mb-1.5"
                      style={{ color: filled ? "white" : "#0E241B" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="font-body text-xs leading-relaxed"
                      style={{
                        color: filled ? "rgba(247,245,240,0.78)" : "hsl(var(--muted-foreground))",
                      }}
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
