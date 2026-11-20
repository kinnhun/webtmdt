import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { DhtHorizontalLogo } from "@/components/ui/BrandLogos";

export default function HomeContactSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A2219] text-white">
      {/* Full-Canvas Authentic Background (Top-Left Leaf + Diagonal Sunbeams + Bottom-Left Wooden Armchair) */}
      <img
        src="/img/pdf-guide/home/contact-section-bg.jpg"
        alt="DHT Commercial Office and Wooden Outdoor Armchair"
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-left-bottom"
      />

      <div className="container mx-auto px-6 lg:px-14 max-w-[1430px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] lg:min-h-[680px]">
          {/* Left Column (50% -> 6 cols): Logo + GET IN TOUCH + Contact DHT + Armchair Space Below */}
          <div className="lg:col-span-6 pt-12 sm:pt-16 lg:pt-[70px] pb-56 sm:pb-64 lg:pb-16 flex flex-col justify-start">
            {/* Official Horizontal Logo */}
            <div className="mb-12 sm:mb-14 lg:mb-[66px]">
              <DhtHorizontalLogo
                iconSize={46}
                textClassName="text-xl sm:text-2xl lg:text-[26px]"
              />
            </div>

            {/* Eyebrow: —— GET IN TOUCH */}
            <div className="flex items-center gap-5 mb-5">
              <span className="h-[3px] w-14 sm:w-20 rounded-full bg-[#D08B43]" />
              <span className="font-body text-sm sm:text-base font-normal uppercase tracking-[0.28em] text-[#D89448]">
                GET IN TOUCH
              </span>
            </div>

            {/* Main Serif Heading: Contact DHT */}
            <h2
              className="font-display font-bold text-[#EBE8E0] leading-none tracking-tight mb-5"
              style={{ fontSize: "clamp(2.75rem, 5vw, 4.35rem)" }}
            >
              Contact DHT
            </h2>

            {/* Sub-label: DHT COMMERCIAL OFFICE */}
            <p className="font-body text-xs sm:text-[15px] font-medium uppercase tracking-[0.28em] text-[#D89448]">
              DHT COMMERCIAL OFFICE
            </p>
          </div>

          {/* Right Column (50% -> 6 cols): Vertical Gold Line + 4 Contact Rows */}
          <div className="lg:col-span-6 flex items-center pb-14 lg:py-16">
            {/* Vertical Gold Line matching exact height of the 4 icon rows (y=148..551) */}
            <div className="w-full lg:pl-12 xl:pl-16 lg:border-l-[1.5px] lg:border-[#D69251]/85">
              <div className="divide-y divide-[#858B80]/40">
                {/* Row 1: EMAIL OUR TEAM */}
                <div className="py-5 first:pt-0 flex items-center gap-6">
                  <div
                    className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[16px] border border-[#D69251]/75 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.25)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(36, 62, 47, 0.45) 48%, rgba(12, 32, 23, 0.85) 100%)",
                    }}
                  >
                    <Mail size={28} className="text-[#E09648]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="font-body text-xs sm:text-[13px] font-normal uppercase tracking-[0.14em] text-[#DCE2DF] block mb-1">
                      EMAIL OUR TEAM
                    </span>
                    <a
                      href="mailto:sales@dhtcompany.com"
                      className="font-body text-xl sm:text-2xl lg:text-[26px] font-bold text-white hover:text-[#E5B869] transition-colors tracking-tight break-all leading-snug"
                    >
                      sales@dhtcompany.com
                    </a>
                  </div>
                </div>

                {/* Row 2: CALL DHT */}
                <div className="py-5 flex items-center gap-6">
                  <div
                    className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[16px] border border-[#D69251]/75 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.25)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(36, 62, 47, 0.45) 48%, rgba(12, 32, 23, 0.85) 100%)",
                    }}
                  >
                    <Phone size={28} className="text-[#E09648]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="font-body text-xs sm:text-[13px] font-normal uppercase tracking-[0.14em] text-[#DCE2DF] block mb-1">
                      CALL DHT
                    </span>
                    <a
                      href="tel:+84932058545"
                      className="font-body text-xl sm:text-2xl lg:text-[26px] font-bold text-white hover:text-[#E5B869] transition-colors tracking-tight leading-snug"
                    >
                      +84 932 058 545
                    </a>
                  </div>
                </div>

                {/* Row 3: DHT COMMERCIAL OFFICE */}
                <div className="py-5 flex items-center gap-6">
                  <div
                    className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[16px] border border-[#D69251]/75 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.25)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(36, 62, 47, 0.45) 48%, rgba(12, 32, 23, 0.85) 100%)",
                    }}
                  >
                    <MapPin size={28} className="text-[#E09648]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="font-body text-xs sm:text-[13px] font-normal uppercase tracking-[0.14em] text-[#DCE2DF] block mb-1.5">
                      DHT COMMERCIAL OFFICE
                    </span>
                    <p className="font-body text-base sm:text-[18.5px] font-normal text-white/95 leading-[1.38]">
                      72A Le Thanh Ton Street, Saigon Ward,
                      <br />
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>

                {/* Row 4: Factory visits by appointment. */}
                <div className="py-5 last:pb-0 flex items-center gap-6">
                  <div
                    className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[16px] border border-[#D69251]/75 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.25)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(36, 62, 47, 0.45) 48%, rgba(12, 32, 23, 0.85) 100%)",
                    }}
                  >
                    <Calendar size={28} className="text-[#E09648]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-body text-base sm:text-[19.5px] font-normal text-white/95">
                      Factory visits by appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
