import { useGlobalLoading } from "@/contexts/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function GlobalLoading() {
  const { isLoading } = useGlobalLoading();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(var(--navy-deep))/85] backdrop-blur-md"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Elegant Dual Ring Animation */}
            <div className="relative w-20 h-20 flex items-center justify-center mb-8">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border-[2px] border-white/5"
                style={{
                  borderTopColor: "hsl(var(--orange))",
                  borderRightColor: "hsl(var(--orange)/0.4)",
                  boxShadow: "0 0 20px hsl(var(--orange)/0.1)",
                }}
              />
              
              {/* Inner Ring (opposite rotation) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                className="absolute inset-3 rounded-full border-[1.5px] border-white/5"
                style={{
                  borderBottomColor: "hsl(var(--orange))",
                  borderLeftColor: "hsl(var(--orange)/0.2)",
                }}
              />

              {/* Glowing Center Dot */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ 
                  backgroundColor: "hsl(var(--orange))", 
                  boxShadow: "0 0 15px hsl(var(--orange))" 
                }}
              />
            </div>

            {/* Typography & Mini-dots */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="flex flex-col items-center gap-3"
            >
              <span
                className="font-display font-medium text-xs tracking-[0.4em] uppercase text-white/90 ml-1"
              >
                {t("common.loading", "Loading...")}
              </span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="w-1 h-1 rounded-full bg-[hsl(var(--orange))]"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
