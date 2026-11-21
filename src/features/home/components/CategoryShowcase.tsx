import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogos";
import type { BrandShowcaseItem } from "@/types/dht.types";

const BRAND_ITEMS: BrandShowcaseItem[] = [
  {
    id: "DHT",
    name: "DHT",
    specialty: "Outdoor Furniture",
    shortDesc: "Dining, lounge, sunloungers and mixed-material outdoor collections.",
    modalTitle: "DHT | Outdoor Furniture",
    modalDescription:
      "DHT manufactures outdoor furniture for dining, lounging and hospitality spaces. Contact DHT Furniture Vietnam for OEM enquiries.",
    factoryImage: "/img/pdf-guide/home/brand-dht-factory.jpg?v=3",
    brandCardImage: "/img/pdf-guide/brands/card-dht.jpg",
    videoUrl: "/video/dht-fac-1.mp4",
  },
  {
    id: "JAGER",
    name: "JAGER",
    specialty: "Indoor Furniture",
    shortDesc: "Residential indoor furniture and custom product development.",
    modalTitle: "JAGER | Indoor Furniture",
    modalDescription:
      "JAGER manufactures indoor furniture for residential spaces. For OEM enquiries, contact DHT Furniture Vietnam.",
    factoryImage: "/img/pdf-guide/home/brand-jager-factory.jpg?v=4",
    brandCardImage: "/img/pdf-guide/brands/card-jager.jpg",
    videoUrl: "/video/jager-factory.mp4",
  },
  {
    id: "THE ONE",
    name: "THE ONE",
    specialty: "Office & Project Furniture",
    shortDesc: "Commercial, office and hospitality furniture for diverse projects.",
    modalTitle: "THE ONE | Office & Project Furniture",
    modalDescription:
      "THE ONE manufactures office furniture and furniture for indoor and outdoor projects. For OEM enquiries, contact DHT Furniture Vietnam.",
    factoryImage: "/img/pdf-guide/home/brand-theone-factory.jpg?v=3",
    brandCardImage: "/img/pdf-guide/brands/card-theone.jpg",
    videoUrl: "/video/theone-factory.mp4",
  },
  {
    id: "MEKONG",
    name: "MEKONG",
    specialty: "Wood Processing & Panels",
    shortDesc: "Engineered wood panels and primary timber processing.",
    modalTitle: "MEKONG | Wood Processing & Panels",
    modalDescription:
      "MEKONG produces wood panels and processed wood materials for furniture and interior applications. For trade and OEM enquiries, contact DHT Furniture Vietnam.",
    factoryImage: "/img/pdf-guide/home/brand-mekong-factory.jpg?v=3",
    brandCardImage: "/img/pdf-guide/brands/card-mekong.jpg",
    videoUrl: "/video/mekong-factory.mp4",
  },
];

export default function CategoryShowcase() {
  const [activeModalBrand, setActiveModalBrand] = useState<BrandShowcaseItem | null>(null);

  return (
    <section id="our-brands" className="py-20 lg:py-24 bg-[#FAF8F3] border-b border-black/5">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#9E3B24] block mb-2.5">
            OUR BRANDS
          </span>
          <h2
            className="font-display font-bold text-[#0E241B] leading-tight mb-3"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.85rem)" }}
          >
            Four Brands, One Manufacturing Group
          </h2>
          <p className="font-body text-sm sm:text-base text-[#1F2723]/85 font-medium leading-relaxed">
            Meet the four brands in our family-owned manufacturing group and see what each makes in
            Vietnam.
          </p>
        </div>

        {/* 4 Brand Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveModalBrand(item)}
              className="group bg-white rounded-2xl p-3.5 border border-[#E4DFD3] hover:border-[#B97846]/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Factory Image + Play Button + 25% Opacity Brand Logo Overlay */}
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#132A1F]">
                <img
                  src={item.factoryImage}
                  alt={`${item.name} — ${item.specialty}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />

                {/* Official Brand Logo at 25% opacity on Desktop Hover / Mobile Viewport */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 lg:opacity-0 lg:group-hover:opacity-25 transition-opacity duration-300">
                  <div className="scale-150">
                    <BrandLogo brand={item.id} variant="light" />
                  </div>
                </div>

                {/* Centered Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/55 border border-white/80 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#173C2C] transition-all shadow-md">
                    <Play size={18} className="fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="pt-5 pb-3 px-2 text-center">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0E241B] tracking-wide mb-1">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-[#37413D] mb-4">{item.specialty}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalBrand(item);
                  }}
                  className="inline-flex items-center justify-center gap-2 font-body text-xs sm:text-sm font-bold text-[#0E241B] group-hover:text-[#B97846] transition-colors cursor-pointer"
                >
                  <span className="text-[#173C2C] group-hover:text-[#B97846] text-xs">▶</span>
                  <span>Watch Factory Video</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In-Page Factory Video Modal (Hình 07) */}
      <AnimatePresence>
        {activeModalBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalBrand(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl bg-[#FAF8F3] border border-[#E2DACB] shadow-2xl p-6 sm:p-8 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0E241B]">
                  <span>{activeModalBrand.name}</span>
                  <span className="mx-2.5 font-light text-[#0E241B]/40">|</span>
                  <span className="font-normal">{activeModalBrand.specialty}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModalBrand(null)}
                  aria-label="Close video modal"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#0E241B]/70 hover:text-[#0E241B] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Modal Body: Left Video (60%), Right Intro + CTA (40%) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 rounded-xl overflow-hidden bg-black aspect-video relative shadow-md">
                  <video
                    key={activeModalBrand.id}
                    src={activeModalBrand.videoUrl}
                    poster={activeModalBrand.factoryImage}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                  <p className="font-display text-base sm:text-lg text-[#1F2723] leading-relaxed">
                    {activeModalBrand.modalDescription}
                  </p>

                  <Link
                    href={`/contact?inquiry=project&brand=${encodeURIComponent(
                      activeModalBrand.id
                    )}#smart-contact-form`}
                    onClick={() => setActiveModalBrand(null)}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#144528] hover:bg-[#0E241B] text-white font-body text-sm sm:text-base font-semibold text-center transition-colors shadow-sm"
                  >
                    Discuss Your Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
