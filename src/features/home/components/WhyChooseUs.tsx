import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.1 };

export default function WhyChooseUs() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");

  const defaultPoints = isVi
    ? [
        "Phát triển sản phẩm theo yêu cầu",
        "Phối hợp sản xuất",
        "Kiểm soát chất lượng trong sản xuất",
        "Phối hợp đóng gói và xuất khẩu",
      ]
    : [
        "Product development to your brief",
        "Production coordination",
        "Quality control during production",
        "Packing and export coordination",
      ];

  const translatedPoints = t("home.whyUs.points", { returnObjects: true });
  const points =
    Array.isArray(translatedPoints) && translatedPoints.length > 0
      ? (translatedPoints as string[])
      : defaultPoints;

  return (
    <section
      className="py-16 sm:py-24 border-t border-black/6"
      style={{ backgroundColor: "#F8F6F0" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (40% on desktop): Dark Green Text on Light Background */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <span
                className="font-body text-xs tracking-[0.25em] uppercase font-medium"
                style={{ color: "hsl(var(--orange))" }}
              >
                {t("home.whyUs.label", isVi ? "Tại sao chọn DHT" : "Why Choose DHT")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="font-display font-bold leading-tight mb-5"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
                color: "#173C2C",
              }}
            >
              {t(
                "home.whyUs.heading",
                isVi ? "Một đầu mối. Phối hợp xuyên suốt." : "One Contact. Coordinated Delivery."
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="font-body text-sm sm:text-base leading-relaxed mb-7"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {t(
                "home.whyUs.description",
                isVi
                  ? "Làm việc với một đội ngũ DHT từ yêu cầu ban đầu đến khi xuất hàng, với năng lực sản xuất phù hợp được phối hợp cho từng đơn hàng."
                  : "Work with one DHT team from the initial brief to shipment, with the appropriate manufacturing capability coordinated for your order."
              )}
            </motion.p>

            <ul className="space-y-3.5 mb-8">
              {points.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: 0.22 + i * 0.07, ease }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "hsl(var(--orange))" }}
                  />
                  <span className="font-body text-sm sm:text-base font-medium text-[#173C2C]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/catalogue/outdoor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 shadow-sm"
                style={{ backgroundColor: "#B97846" }}
              >
                {t("home.whyUs.btn1", isVi ? "Xem Bộ sưu tập" : "Explore Collections")}{" "}
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#173C2C" }}
              >
                {t("home.whyUs.btn2", isVi ? "Liên hệ DHT" : "Contact DHT")}
              </Link>
            </motion.div>
          </div>

          {/* Right Column (60% on desktop): Sharp Unblurred Product Setting Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm shadow-xl border border-black/8 bg-[#173C2C]">
              <Image
                src="/img/WhyDHT.png"
                alt="DHT Furniture Collection"
                fill
                className="object-cover object-center"
                quality={95}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
