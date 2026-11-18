import Link from "next/link";
import { useRouter } from "next/router";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { DhtHorizontalLogo } from "@/components/ui/BrandLogos";

export default function SiteFooter() {
  const router = useRouter();
  const isContactPage = router.pathname === "/contact";

  const exploreLinks = [
    { href: "/about", label: "About DHT" },
    { href: "/manufacturing", label: "Manufacturing" },
    { href: "/our-brands", label: "Our Brands" },
    { href: "/catalogue", label: "Collections" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-[#0B2017] text-white border-t border-[#C88A36]/25 overflow-hidden">
      {/* Subtle luxury wave background accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 85%, rgba(200, 138, 54, 0.16), transparent 45%), radial-gradient(circle at 88% 80%, rgba(200, 138, 54, 0.14), transparent 45%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 pt-14 pb-10 relative z-10">
        {/* 3-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/15">
          {/* Column 1 (Left): Brand Introduction + Social Icons */}
          <div className="md:col-span-5 md:pr-8 md:border-r md:border-white/15 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-3">
                <DhtHorizontalLogo iconSize={34} textClassName="text-lg sm:text-xl" />
              </Link>
              <div className="w-8 h-[2px] bg-[#C88A36] mb-4" />
              <p className="font-body text-sm text-white/80 leading-relaxed max-w-md">
                DHT Furniture Vietnam provides direct access to our family-owned manufacturing
                group, specialising in outdoor, indoor, office and project furniture, and wood
                panels.
              </p>
            </div>

            {/* Official Social Links (Facebook + LinkedIn) */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DHT Furniture on Facebook"
                className="w-9 h-9 rounded-md border border-[#C88A36]/60 bg-[#C88A36]/10 text-[#E5B869] hover:bg-[#C88A36] hover:text-[#0B2017] transition-colors flex items-center justify-center font-serif font-bold text-base"
              >
                f
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DHT Furniture on LinkedIn"
                className="w-9 h-9 rounded-md border border-[#C88A36]/60 bg-[#C88A36]/10 text-[#E5B869] hover:bg-[#C88A36] hover:text-[#0B2017] transition-colors flex items-center justify-center font-body font-bold text-xs tracking-tight"
              >
                in
              </a>
            </div>
          </div>

          {/* Column 2 (Middle): EXPLORE DHT */}
          <div className="md:col-span-3 md:px-6 md:border-r md:border-white/15">
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#D89B3C] mb-5">
              EXPLORE DHT
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-white/85 hover:text-[#E5B869] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (Right): GET IN TOUCH */}
          <div className="md:col-span-4 md:pl-4">
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#D89B3C] mb-5">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3.5 font-body text-sm text-white/85">
              <li>
                <a
                  href="mailto:sales@dhtcompany.com"
                  className="inline-flex items-center gap-3 hover:text-[#E5B869] transition-colors"
                >
                  <Mail size={16} className="text-[#D89B3C] shrink-0" />
                  <span>sales@dhtcompany.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+84932058545"
                  className="inline-flex items-center gap-3 hover:text-[#E5B869] transition-colors"
                >
                  <Phone size={16} className="text-[#D89B3C] shrink-0" />
                  <span>+84 932 058 545</span>
                </a>
              </li>
              {!isContactPage && (
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#D89B3C] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    72A Le Thanh Ton Street, Saigon Ward,
                    <br />
                    Ho Chi Minh City, Vietnam
                  </span>
                </li>
              )}
              <li className="flex items-center gap-3 text-white/80">
                <Calendar size={16} className="text-[#D89B3C] shrink-0" />
                <span>Factory visits by appointment.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-xs text-white/75">
          <p>© 2026 DHT Furniture Vietnam Joint Stock Company.</p>
          <p className="text-center md:text-right tracking-wide">
            Outdoor Furniture &nbsp;·&nbsp; Indoor Furniture &nbsp;·&nbsp; Project &amp; Office
            Furniture &nbsp;·&nbsp; Wood Panel
          </p>
        </div>
      </div>
    </footer>
  );
}
