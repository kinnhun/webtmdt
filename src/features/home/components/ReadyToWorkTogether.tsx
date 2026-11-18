import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function ReadyToWorkTogether() {
  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F3]">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#173A2B] via-[#10291E] to-[#0B1F16] text-white px-6 sm:px-12 py-14 sm:py-16 text-center shadow-xl border border-[#C88A36]/25"
        >
          {/* Subtle luxury light glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(216, 155, 60, 0.22), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.06), transparent 50%)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Label */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#D89B3C]" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#D89B3C]">
                PARTNER WITH DHT
              </span>
              <span className="h-px w-8 bg-[#D89B3C]" />
            </div>

            {/* Title */}
            <h2
              className="font-display font-bold text-white leading-tight mb-5"
              style={{ fontSize: "clamp(1.85rem, 3.5vw, 3rem)" }}
            >
              Your Manufacturing Partner in Vietnam.
            </h2>

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed mb-9 max-w-2xl mx-auto">
              From established furniture collections to custom OEM projects, DHT offers direct
              access to our family-owned manufacturing facilities, with dedicated support from
              product development to final shipment.
            </p>

            {/* 2 CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#B97846] hover:bg-[#C88550] text-white font-body text-sm font-semibold transition-all shadow-md"
              >
                <span>Contact DHT</span>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/90 hover:text-[#E5B869] underline underline-offset-8 decoration-[#D89B3C]/60 transition-colors py-2"
              >
                <span>Explore Manufacturing Capabilities</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
