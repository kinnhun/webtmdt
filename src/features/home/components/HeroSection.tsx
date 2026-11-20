import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Layers, Handshake } from "lucide-react";

type ValuePropItem = {
  icon: "factory" | "layers" | "handshake";
  title: string;
  subtitle: string;
};

const VALUE_PROPS: ValuePropItem[] = [
  {
    icon: "factory",
    title: "Manufacturing Group",
    subtitle: "11 Family-Owned Facilities",
  },
  {
    icon: "layers",
    title: "Not a Trading Company",
    subtitle: "We Manufacture in Vietnam",
  },
  {
    icon: "handshake",
    title: "Single Commercial Contact",
    subtitle: "From Development to Shipment",
  },
];

function ValuePropIcon({ name }: { name: ValuePropItem["icon"] }) {
  if (name === "factory") {
    return <Factory size={30} className="text-[#E2A84B] shrink-0" strokeWidth={1.6} />;
  }
  if (name === "layers") {
    return <Layers size={30} className="text-[#E2A84B] shrink-0" strokeWidth={1.6} />;
  }
  return <Handshake size={30} className="text-[#E2A84B] shrink-0" strokeWidth={1.6} />;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#121C17]">
      {/* Background Video: Clip DHT 1 (Page 3 PDF) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/img/pdf-guide/home/brand-dht-factory.jpg?v=2"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/dht-fac-1.mp4" type="video/mp4" />
      </video>

      {/* Evenly balanced dark overlay matching Hình 02 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(12, 20, 16, 0.38) 0%, rgba(10, 18, 14, 0.58) 100%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* Top Centered Pill Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-5 py-1.5 rounded-full bg-black/45 backdrop-blur-xs border border-[#D8A352]/70 mb-6 shadow-sm">
            <span className="text-[#E6B665] text-[10px] leading-none">✦</span>
            <span className="font-body text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-[#EAD09D]">
              DHT &nbsp;·&nbsp; JAGER &nbsp;·&nbsp; THE ONE &nbsp;·&nbsp; MEKONG
            </span>
            <span className="text-[#EAD09D]/50">|</span>
            <span className="font-body text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-[#EAD09D]">
              ONE COMMERCIAL CONTACT
            </span>
          </div>

          {/* Main Centered 2-Line Serif Headline */}
          <h1
            className="font-display font-bold text-white leading-[1.12] tracking-tight mb-8 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]"
            style={{ fontSize: "clamp(2.1rem, 4.4vw + 0.4rem, 4.1rem)" }}
          >
            Your Direct Manufacturing Partner
            <br />
            in Vietnam
          </h1>

          {/* 3 Horizontal Value Props (No outer box, separated by subtle vertical dividers) */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-5 md:gap-0 mb-7">
            {VALUE_PROPS.map((prop, idx) => (
              <div
                key={prop.title}
                className={`flex items-center gap-3.5 text-left ${
                  idx > 0 ? "md:pl-8 md:border-l md:border-white/35" : ""
                } ${idx < VALUE_PROPS.length - 1 ? "md:pr-8" : ""}`}
              >
                <ValuePropIcon name={prop.icon} />
                <div>
                  <p className="font-body text-sm sm:text-[15px] font-bold text-white leading-snug drop-shadow-xs">
                    {prop.title}
                  </p>
                  <p className="font-body text-xs sm:text-[13px] text-white/85 leading-snug mt-0.5 drop-shadow-xs">
                    {prop.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Category Subline */}
          <p className="font-body text-sm sm:text-base md:text-[17px] font-normal text-white/95 tracking-wide mb-8 drop-shadow-xs">
            Outdoor &nbsp;·&nbsp; Indoor &nbsp;·&nbsp; Project Furniture &nbsp;·&nbsp; Wood Panel
          </p>

          {/* 2 Centered CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?inquiry=quotation#smart-contact-form"
              className="min-w-[215px] h-12 px-7 rounded-[8px] bg-[#B8763E]/90 hover:bg-[#C68349] border border-[#E5B880]/55 text-white font-body text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2.5 transition-all shadow-md backdrop-blur-2xs"
            >
              <span>Request a Quotation</span>
              <ArrowRight size={15} />
            </Link>

            <a
              href="#our-brands"
              className="min-w-[215px] h-12 px-7 rounded-[8px] bg-black/40 hover:bg-black/60 border border-white/75 text-white font-body text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2.5 transition-all shadow-md backdrop-blur-xs"
            >
              <span>Explore Our Brands</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
