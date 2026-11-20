import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function ReadyToWorkTogether() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0C392B] text-white py-16 sm:py-20 lg:py-24">
      {/* Authentic Emerald Gradient + Flowing Wave Ribbon Background from Hình 14 */}
      <img
        src="/img/pdf-guide/home/partner-wave-bg.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-bottom"
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow: —— PARTNER WITH DHT —— */}
          <div className="inline-flex items-center justify-center gap-4 mb-5">
            <span className="h-[1px] w-14 sm:w-20 bg-[#C99B3B]/85" />
            <span className="font-body text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4A445]">
              PARTNER WITH DHT
            </span>
            <span className="h-[1px] w-14 sm:w-20 bg-[#C99B3B]/85" />
          </div>

          {/* 2-Line Serif Headline */}
          <h2
            className="font-display font-bold text-white leading-[1.14] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.1rem, 3.8vw, 3.35rem)" }}
          >
            Your Manufacturing Partner
            <br />
            in Vietnam.
          </h2>

          {/* 2-Line Supporting Description */}
          <p className="font-body text-sm sm:text-[15.5px] text-[#DCE6E1] leading-[1.68] max-w-3xl mx-auto mb-9">
            From established furniture collections to custom OEM projects, DHT offers direct access
            <br className="hidden md:inline" /> to our family-owned manufacturing facilities, with
            dedicated support from product development to final shipment.
          </p>

          {/* 2 Centered CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-11">
            <Link
              href="/contact"
              className="min-w-[230px] h-[52px] px-8 rounded-[7px] text-white font-display text-base sm:text-[17px] font-bold inline-flex items-center justify-center gap-2.5 border border-[#DBA16E]/40 shadow-[0_6px_18px_rgba(0,0,0,0.22)] hover:brightness-105 transition-all"
              style={{
                background:
                  "linear-gradient(135deg, #C98049 0%, #B5703C 52%, #A2673B 100%)",
              }}
            >
              <span>Contact DHT</span>
              <ArrowUpRight size={17} strokeWidth={2} />
            </Link>

            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-2.5 font-body text-sm sm:text-[15px] font-bold text-white hover:text-[#E5B869] border-b border-white/75 hover:border-[#E5B869] pb-2 transition-colors"
            >
              <span>Explore Manufacturing Capabilities</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
