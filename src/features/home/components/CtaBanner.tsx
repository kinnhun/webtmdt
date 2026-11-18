import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: "hsl(var(--navy))" }}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 50%, white, transparent 70%)" }} />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="text-left text-white max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {t("home.cta.heading")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-base sm:text-lg text-white/70 leading-relaxed mb-10"
            >
              {t("home.cta.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 w-full sm:w-auto"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                {t("home.cta.sendInquiry")} <ArrowRight size={15} />
              </Link>
              <Link
                href="/catalogue"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white/80 border border-white/25 hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                {t("home.cta.browseCatalogue")}
              </Link>
            </motion.div>

            {/* Company Slogan */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-sm tracking-[0.15em] uppercase mt-12"
              style={{
                background: "linear-gradient(90deg, #f5d76e, #e8a838, #d4862a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("home.cta.slogan")}
            </motion.p>
          </div>

          {/* Right 3 Images Layout */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full mt-10 lg:mt-0">
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 right-0 w-[65%] h-[60%] rounded-sm overflow-hidden z-10 shadow-2xl group"
            >
              <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=80" alt="Factory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>

            {/* Bottom left medium image */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-10 left-0 w-[55%] h-[50%] rounded-sm overflow-hidden z-20 shadow-2xl border-4 group"
              style={{ borderColor: "hsl(var(--navy))" }}
            >
              <img src="https://images.unsplash.com/photo-1595526114101-1b702ecacccf?w=600&auto=format&fit=crop&q=80" alt="Process" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>

            {/* Bottom right smaller image */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 right-5 w-[40%] h-[40%] rounded-sm overflow-hidden z-30 shadow-2xl border-4 group"
              style={{ borderColor: "hsl(var(--navy))" }}
            >
              <img src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&auto=format&fit=crop&q=80" alt="Craftsmanship" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
