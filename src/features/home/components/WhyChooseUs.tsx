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
    <section className="py-16 lg:py-20 bg-[#F8F6F1] border-b border-black/5">
      <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="h-[1.5px] w-8 bg-[#B3753E]" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#B3753E]">
                WHY CHOOSE DHT
              </span>
            </div>

            {/* 2-Line Serif Heading */}
            <h2
              className="font-display font-bold text-[#0F2C1E] leading-[1.1] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 3.3vw, 2.95rem)" }}
            >
              Direct Manufacturing.
              <br />
              One Trusted Partner.
            </h2>

            {/* Description */}
            <p className="font-body text-sm sm:text-[15px] text-[#222825] leading-[1.6] max-w-xl mb-6">
              Work directly with our family-owned furniture manufacturing group in Vietnam, with DHT
              managing your programme from product development to export.
            </p>

            {/* 2 CTAs */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <Link
                href="/contact?inquiry=project#smart-contact-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[7px] bg-[#B3753E] hover:bg-[#9E6533] text-white font-body text-sm font-semibold transition-all shadow-xs"
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

            {/* 4 Horizontal Step Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {WHY_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="relative rounded-[12px] bg-gradient-to-br from-[#FCFBF8] via-[#F7F3EA] to-[#EFE8D8] px-4 py-4 border border-[#E8E1D1] shadow-[0_3px_0_0_#A66B38,0_6px_14px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[112px]"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <StepIcon name={step.icon} />
                    <span className="h-5 w-px bg-[#DDD5C5]" />
                    <span className="font-body font-bold text-lg sm:text-xl text-[#B3753E] leading-none">
                      {step.number}
                    </span>
                  </div>
                  <p className="font-body font-bold text-[13px] sm:text-[13.5px] text-[#0F2C1E] whitespace-pre-line leading-[1.28]">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column (6 cols): 2 Rounded Photo Frames Matching HÌNH THAM KHẢO 10 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch"
          >
            {/* Left Frame (~63% width -> 7.5/12 -> 7 cols): Full Dining Set */}
            <div className="sm:col-span-7 bg-white rounded-[14px] border border-[#E6E2D9] overflow-hidden shadow-2xs flex items-center justify-center">
              <img
                src="/img/pdf-guide/home/why-dht-dining-full.jpg"
                alt="DHT Wooden Dining Table and 6 Armchairs"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Frame (~37% width -> 4.5/12 -> 5 cols): Close-up Armchair Detail */}
            <div className="sm:col-span-5 bg-white rounded-[14px] border border-[#E6E2D9] overflow-hidden shadow-2xs flex items-center justify-center">
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
