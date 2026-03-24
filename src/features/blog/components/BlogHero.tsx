import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface BlogHeroProps {
  activeCategory: string;
  categories: string[];
  onCategoryChange: (cat: string) => void;
}

export default function BlogHero({ activeCategory, categories, onCategoryChange }: BlogHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--orange)), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--orange)/0.5), transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs tracking-[0.25em] uppercase font-medium mb-4"
          style={{ color: "hsl(var(--orange))" }}
        >
          {t("blog.hero.label")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {t("blog.hero.heading")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-body text-white/50 max-w-lg mb-10"
        >
          {t("blog.hero.description")}
        </motion.p>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="px-4 py-2 rounded-sm font-body text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? "hsl(var(--orange))" : "rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                }}
              >
                {cat === "All" ? t("blog.filterAll") : cat}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
