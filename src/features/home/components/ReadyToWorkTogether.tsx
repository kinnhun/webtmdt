import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const backgroundImages = [
  "/img/readyToWork/1.png",
  "/img/readyToWork/2.png",
  "/img/readyToWork/3.png",
];

export default function ReadyToWorkTogether() {
  const { t } = useTranslation();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 flex items-center justify-center min-h-[60vh]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-[#111827]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIdx]}
              alt="Background Slider"
              fill
              className="object-cover"
              priority={currentImageIdx === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay to make text pop, similar to screenshot */}
        <div className="absolute inset-0 z-10" style={{ backgroundColor: "rgba(17, 24, 39, 0.85)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-medium text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          {t("home.cta.heading")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {t("home.cta.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/catalogue/outdoor"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-body font-semibold text-sm text-white transition-all hover:opacity-90 w-full sm:w-auto"
            style={{ backgroundColor: "hsl(var(--orange))" }}
          >
            {t("home.cta.btn1")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-body font-semibold text-sm text-white/80 border border-white/10 bg-white/5 hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            {t("home.cta.btn2")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
