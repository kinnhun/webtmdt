import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { DhtHorizontalLogo } from "@/components/ui/BrandLogos";

export default function HomeContactSection() {
  return (
    <section className="relative bg-[#0E261C] text-white overflow-hidden border-t border-white/10">
      {/* Subtle dappled sunlight gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 25%, rgba(255, 255, 255, 0.07), transparent 45%), linear-gradient(135deg, #133124 0%, #0B1F16 100%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Brand + Title + Real Wooden Armchair Photo at Bottom-Left */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="pb-8">
              <div className="mb-8">
                <DhtHorizontalLogo iconSize={38} textClassName="text-xl sm:text-2xl" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-9 bg-[#D89B3C]" />
                <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#D89B3C]">
                  GET IN TOUCH
                </span>
              </div>

              <h2
                className="font-display font-bold text-white leading-none mb-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}
              >
                Contact DHT
              </h2>

              <p className="font-body text-xs sm:text-sm font-medium uppercase tracking-[0.24em] text-[#D89B3C]">
                DHT COMMERCIAL OFFICE
              </p>
            </div>

            {/* Bottom-Left Authentic Wooden Armchair Corner Image (Hình 16) */}
            <div className="mt-auto -mx-6 lg:mx-0 max-w-md overflow-hidden rounded-tr-2xl">
              <img
                src="/img/pdf-guide/home/contact-armchair-corner.jpg"
                alt="DHT Outdoor Wooden Armchair"
                className="w-full h-48 sm:h-56 object-cover object-left-bottom"
              />
            </div>
          </div>

          {/* Right Column: 4 Contact Rows with Square Bronze Icons */}
          <div className="lg:col-span-6 lg:pl-10 lg:border-l lg:border-[#D89B3C]/40 pb-16 flex flex-col justify-center">
            <div className="divide-y divide-white/15">
              {/* Row 1: Email */}
              <div className="py-5 first:pt-0 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#D89B3C]/50 flex items-center justify-center shrink-0 shadow-inner">
                  <Mail size={22} className="text-[#D89B3C]" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 block mb-1">
                    EMAIL OUR TEAM
                  </span>
                  <a
                    href="mailto:sales@dhtcompany.com"
                    className="font-body text-lg sm:text-2xl font-bold text-white hover:text-[#E5B869] transition-colors break-all"
                  >
                    sales@dhtcompany.com
                  </a>
                </div>
              </div>

              {/* Row 2: Phone */}
              <div className="py-5 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#D89B3C]/50 flex items-center justify-center shrink-0 shadow-inner">
                  <Phone size={22} className="text-[#D89B3C]" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 block mb-1">
                    CALL DHT
                  </span>
                  <a
                    href="tel:+84932058545"
                    className="font-body text-lg sm:text-2xl font-bold text-white hover:text-[#E5B869] transition-colors"
                  >
                    +84 932 058 545
                  </a>
                </div>
              </div>

              {/* Row 3: Commercial Office Address */}
              <div className="py-5 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#D89B3C]/50 flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin size={22} className="text-[#D89B3C]" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 block mb-1">
                    DHT COMMERCIAL OFFICE
                  </span>
                  <p className="font-body text-sm sm:text-base text-white/95 leading-snug">
                    72A Le Thanh Ton Street, Saigon Ward,
                    <br />
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>

              {/* Row 4: Factory Visits */}
              <div className="py-5 last:pb-0 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#D89B3C]/50 flex items-center justify-center shrink-0 shadow-inner">
                  <Calendar size={22} className="text-[#D89B3C]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-body text-sm sm:text-base text-white/95">
                    Factory visits by appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
