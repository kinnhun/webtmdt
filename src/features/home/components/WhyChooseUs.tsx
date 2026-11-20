import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Pencil, Factory, ShieldCheck, Box } from "lucide-react";

type WhyStepItem = {
  number: string;
  title: string;
  icon: "pencil" | "factory" | "shield" | "box";
};

const WHY_STEPS: WhyStepItem[] = [
  { number: "01", title: "Product\nDevelopment", icon: "pencil" },
  { number: "02", title: "Direct\nManufacturing", icon: "factory" },
  { number: "03", title: "Quality\nAssurance", icon: "shield" },
  { number: "04", title: "Export\nManagement", icon: "box" },
];

function StepIcon({ name }: { name: WhyStepItem["icon"] }) {
  if (name === "pencil") {
    return <Pencil size={21} className="text-[#B3753E] shrink-0" strokeWidth={1.6} />;
  }
  if (name === "factory") {
    return <Factory size={21} className="text-[#B3753E] shrink-0" strokeWidth={1.6} />;
  }
  if (name === "shield") {
    return <ShieldCheck size={21} className="text-[#B3753E] shrink-0" strokeWidth={1.6} />;
  }
  return <Box size={21} className="text-[#B3753E] shrink-0" strokeWidth={1.6} />;
}

export default function WhyChooseUs() {
  return (
    <section className="py-14 lg:py-20 bg-[#F8F6F1] border-b border-black/5">
      <div className="container mx-auto px-6 lg:px-10 max-w-[1340px]">
        {/* Top Eyebrow Row (y=51..64 in Hình 10 — sits above the y=80 alignment line) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-[1.5px] w-8 bg-[#B3753E]" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#B3753E]">
            WHY CHOOSE DHT
          </span>
        </motion.div>

        {/* Main 2-Column Row (y=80..418 in Hình 10: Left 629px : Gap 18px : Right 677px) */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-[1.36%]">
          {/* Left Column (629 / 1324 = 47.51%): Top of Heading aligns with Top of Frames; Bottom of 4 Cards aligns with Bottom of Frames */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[47.51%] flex flex-col justify-between"
          >
            <div>
              {/* 2-Line Serif Heading (Top at y=80) */}
              <h2
                className="font-display font-bold text-[#0F2C1E] leading-[1.08] tracking-tight -mt-1 mb-4"
                style={{ fontSize: "clamp(2rem, 3.25vw, 2.95rem)" }}
              >
                Direct Manufacturing.
                <br />
                One Trusted Partner.
              </h2>

              {/* Description */}
              <p className="font-body text-sm sm:text-[15px] text-[#222825] leading-[1.58] max-w-xl mb-5">
                Work directly with our family-owned furniture manufacturing group in Vietnam, with
                DHT managing your programme from product development to export.
              </p>

              {/* 2 CTAs */}
              <div className="flex flex-wrap items-center gap-6 mb-7">
                <Link
                  href="/contact?inquiry=project#smart-contact-form"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[7px] bg-[#B3753E] hover:bg-[#9E6533] text-white font-body text-sm font-semibold transition-all shadow-2xs"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </Link>

                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 font-body text-sm font-bold text-[#0F2C1E] hover:text-[#B3753E] transition-colors"
                >
                  <span>Explore Collections</span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </div>

            {/* 4 Horizontal Step Cards (y=297..418 -> 148x121px each, 10px gap, bottom 3px bronze edge at y=418) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {WHY_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="relative rounded-[11px] bg-gradient-to-br from-[#FCFBF8] via-[#F7F3EA] to-[#EFE8D8] px-3.5 py-3.5 border border-[#E8E1D1] border-b-[3px] border-b-[#B26F37] shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[116px]"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <StepIcon name={step.icon} />
                    <span className="h-5 w-px bg-[#DDD5C5]" />
                    <span className="font-body font-bold text-lg sm:text-[19px] text-[#B3753E] leading-none">
                      {step.number}
                    </span>
                  </div>
                  <p className="font-body font-bold text-[12.5px] sm:text-[13px] text-[#0F2C1E] whitespace-pre-line leading-[1.26]">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column (677 / 1324 = 51.13%): Frame 1 (416x338) + Gap (18px) + Frame 2 (243x338) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="w-full lg:w-[51.13%] flex items-stretch gap-3 sm:gap-[2.66%]"
          >
            {/* Frame 1: 416 / 677 = 61.45% width, aspect 416/338 */}
            <div className="w-[61.45%] aspect-[416/338] bg-[#FBFBFB] rounded-[10px] border border-[#E9E1D9] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center shrink-0">
              <img
                src="/img/pdf-guide/home/why-dht-dining-full.jpg"
                alt="DHT Wooden Dining Table and 6 Armchairs"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Frame 2: 243 / 677 = 35.89% width, aspect 243/338 (exact same 338 height as Frame 1!) */}
            <div className="w-[35.89%] aspect-[243/338] bg-[#FBFBFB] rounded-[10px] border border-[#E9E1D9] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center shrink-0">
              <img
                src="/img/pdf-guide/home/why-dht-dining-closeup.jpg"
                alt="DHT Wooden Dining Armchair Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
