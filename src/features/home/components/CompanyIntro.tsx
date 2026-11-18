import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type CapabilityStepItem = {
  number: string;
  title: string;
  description: string;
};

const CAPABILITY_STEPS: CapabilityStepItem[] = [
  {
    number: "01",
    title: "Product Development",
    description: "We develop drawings and samples to match your brief.",
  },
  {
    number: "02",
    title: "Manufacturing",
    description:
      "We manufacture your order at the group facility best suited to your product.",
  },
  {
    number: "03",
    title: "Quality Control",
    description:
      "We check materials, inspect production and verify finished goods before shipment.",
  },
  {
    number: "04",
    title: "Export & Logistics",
    description:
      "Our export team coordinates packing, container loading and shipping documents.",
  },
];

export default function CompanyIntro() {
  return (
    <section className="py-16 lg:py-24 bg-[#F5F2EB] border-b border-black/5">
      <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column (5 cols): WHO WE ARE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#B35C2A] block mb-3">
                WHO WE ARE
              </span>

              <h2
                className="font-display font-bold text-[#0F3122] leading-[1.12] tracking-tight mb-4"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.1rem)" }}
              >
                One Partner for
                <br />
                Outdoor, Indoor &amp;
                <br />
                Project Furniture.
              </h2>

              <p className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-[0.06em] text-[#B35C2A] mb-6">
                OUTDOOR · INDOOR · PROJECT FURNITURE · WOOD &amp; PANELS
              </p>

              <div className="space-y-5 font-body text-sm sm:text-[15.5px] text-[#1C2420] leading-[1.6] mb-8">
                <p>
                  Our family-owned manufacturing group operates 11 production facilities across
                  Vietnam. <strong>DHT, JAGER, THE ONE</strong> and <strong>MEKONG</strong>{" "}
                  specialise in outdoor furniture, indoor furniture, project furniture and wood
                  panels.
                </p>
                <p>
                  <strong>DHT Furniture Vietnam</strong> is your single point of contact for OEM
                  orders, from product development to shipment.
                </p>
              </div>
            </div>

            <div>
              {/* 2 Side-by-Side Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <Link
                  href="/catalogue"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[6px] bg-[#103524] hover:bg-[#0B261A] text-white font-display text-sm sm:text-base font-bold transition-colors shadow-xs"
                >
                  Explore Collections
                </Link>
                <Link
                  href="/contact?inquiry=quotation#smart-contact-form"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[6px] bg-transparent hover:bg-[#B35C2A]/10 text-[#B35C2A] border border-[#B35C2A] font-body text-sm sm:text-base font-bold transition-colors"
                >
                  Request a Quote
                </Link>
              </div>

              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 font-body text-sm sm:text-base font-bold text-[#103524] hover:text-[#B35C2A] transition-colors"
              >
                <span>Explore Our Facilities</span>
                <ArrowRight size={17} strokeWidth={2.2} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column (7 cols): 11 Production Facilities Banner + 2x2 Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {/* Top Dark Forest Green Banner Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="rounded-[8px] bg-[#0F3524] text-white px-7 sm:px-10 py-6 sm:py-7 flex items-center gap-6 sm:gap-8 shadow-sm"
            >
              <span
                className="font-display font-bold text-[#F3EFE6] leading-none shrink-0 tracking-tight"
                style={{ fontSize: "clamp(3.75rem, 6vw, 5.25rem)" }}
              >
                11
              </span>
              <div className="h-20 w-[1.5px] bg-white/35 shrink-0" />
              <div>
                <h3
                  className="font-display font-bold text-white leading-[1.15] mb-2"
                  style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.95rem)" }}
                >
                  Production Facilities
                  <br />
                  Across Vietnam
                </h3>
                <p className="font-body text-xs sm:text-sm text-white/90">
                  Operated by our family-owned manufacturing group.
                </p>
              </div>
            </motion.div>

            {/* 2x2 Grid of 01-04 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              {CAPABILITY_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-[8px] bg-[#F9F7F2] p-6 sm:p-7 border border-[#CFCBC2] hover:border-[#B35C2A]/60 transition-all flex flex-col justify-start"
                >
                  <span className="font-display font-bold text-xl sm:text-2xl text-[#B35C2A] block mb-1.5">
                    {step.number}
                  </span>
                  <h4 className="font-display font-bold text-xl sm:text-[22px] text-[#0F3122] mb-2.5 leading-snug">
                    {step.title}
                  </h4>
                  <p className="font-body text-sm sm:text-[15px] text-[#222825] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
