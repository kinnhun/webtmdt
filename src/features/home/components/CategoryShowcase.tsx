import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";

const fItem = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: {
    duration: 0.6,
    delay: 0.12 + i * 0.08,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function CategoryShowcase() {
  const { ref, inView } = useInView();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");

  const capabilityCards = [
    {
      key: "dht",
      brand: "DHT",
      title: t("home.categories.dht.name", isVi ? "Nội thất ngoài trời" : "Outdoor Furniture"),
      desc: t(
        "home.categories.dht.desc",
        isVi
          ? "Các dòng ghế, bộ bàn ăn và bộ lounge ngoài trời."
          : "Outdoor seating, dining and lounge collections."
      ),
      image: "/img/category/outdoorsofas1.png",
      href: "/catalogue/outdoor",
    },
    {
      key: "jager",
      brand: "JAGER",
      title: t("home.categories.jager.name", isVi ? "Nội thất trong nhà" : "Indoor Furniture"),
      desc: t(
        "home.categories.jager.desc",
        isVi
          ? "Nội thất trong nhà cho không gian nhà ở và thương mại."
          : "Indoor furniture for residential and commercial spaces."
      ),
      image: "/img/category/chairs.png",
      href: "/catalogue/indoor",
    },
    {
      key: "theOne",
      brand: "THE ONE",
      title: t("home.categories.theOne.name", isVi ? "Nội thất dự án" : "Project Furniture"),
      desc: t(
        "home.categories.theOne.desc",
        isVi
          ? "Nội thất trong nhà và ngoài trời theo yêu cầu dự án."
          : "Indoor and outdoor furniture for project requirements."
      ),
      image: "/img/category/aluminum1.png",
      href: "/catalogue/indoor",
    },
    {
      key: "mekong",
      brand: "MEKONG",
      title: t("home.categories.mekong.name", isVi ? "Ván gỗ & chế biến gỗ" : "Wood & Panels"),
      desc: t(
        "home.categories.mekong.desc",
        isVi
          ? "Năng lực ván gỗ và chế biến gỗ."
          : "Wood panels and timber processing capabilities."
      ),
      image: "/img/WhoWeAre2.png",
      href: "/manufacturing",
    },
  ];

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div ref={ref} className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <span
                className="font-body text-xs tracking-[0.25em] uppercase font-medium"
                style={{ color: "hsl(var(--orange))" }}
              >
                {t("home.categories.label", isVi ? "Năng lực Chuyên môn" : "Core Capabilities")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold leading-tight max-w-3xl"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)", color: "hsl(var(--navy-deep))" }}
            >
              {t(
                "home.categories.heading",
                isVi
                  ? "Khám phá năng lực nội thất và vật liệu."
                  : "Explore Our Furniture & Material Capabilities."
              )}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="shrink-0"
          >
            <Link
              href="/catalogue/outdoor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "hsl(var(--navy))" }}
            >
              {t("home.categories.viewAll", isVi ? "Xem Danh mục" : "View Collections")}{" "}
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
          {capabilityCards.map((card, i) => (
            <motion.div key={card.key} {...fItem(i)} className="h-full">
              <Link
                href={card.href}
                className="group flex flex-col h-full overflow-hidden rounded-sm bg-white border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E241B]">
                  <img
                    src={card.image}
                    alt={`${card.brand} — ${card.title}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(14, 36, 27, 0.55) 0%, transparent 55%)",
                    }}
                  />
                  <span
                    className="absolute top-3.5 left-3.5 px-3 py-1 rounded-sm font-body text-[11px] font-bold tracking-[0.18em] uppercase text-white shadow-sm"
                    style={{ backgroundColor: "#173C2C", border: "1px solid rgba(185,120,70,0.45)" }}
                  >
                    {card.brand}
                  </span>
                  <div
                    className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow"
                    style={{ backgroundColor: "hsl(var(--orange))" }}
                  >
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p
                      className="font-body text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
                      style={{ color: "hsl(var(--orange))" }}
                    >
                      {card.brand}
                    </p>
                    <h3
                      className="font-display font-bold text-xl leading-snug mb-2"
                      style={{ color: "hsl(var(--navy-deep))" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
