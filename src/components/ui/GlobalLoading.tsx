import { useGlobalLoading } from "@/contexts/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoading() {
  const { isLoading } = useGlobalLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.15 }}
          animate={{ opacity: 1, scaleX: 0.85 }}
          exit={{ opacity: 0, scaleX: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--orange)), #F5CA7B, hsl(var(--orange)))",
            boxShadow: "0 0 8px rgba(164, 94, 47, 0.45)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
