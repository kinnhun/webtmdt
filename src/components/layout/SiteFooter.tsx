import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Phone, MapPin, CalendarClock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { fadeUp, stagger } from "@/lib/animations";

export default function SiteFooter() {
  const { t } = useTranslation();
  const router = useRouter();
  const tr = (k: string, d?: string) => t(k, { defaultValue: d, lng: router.locale });

  return (
    <footer className="text-white/80 pt-14 pb-8" style={{ backgroundColor: "hsl(var(--navy-dark))" }}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10 items-start"
        >
          {/* Block 1: Brand Introduction (50-55% width on desktop) */}
          <motion.div variants={fadeUp} className="lg:col-span-6 xl:col-span-7">
            <Link href="/" className="inline-flex items-center gap-3.5 group mb-5">
              <Image
                src="/img/logo.png"
                alt="DHT Furniture"
                width={56}
                height={56}
                className="h-12 w-auto object-contain rounded-sm transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-display font-bold text-xl tracking-[0.14em] text-[#D4A853] uppercase">
                  DHT
                </span>
                <span className="font-body font-semibold text-xs tracking-[0.26em] text-white/90 uppercase mt-1">
                  FURNITURE
                </span>
              </div>
            </Link>

            <p className="font-body text-[15px] sm:text-base leading-relaxed text-white/85 max-w-xl mb-6">
              {tr(
                "footer.description",
                "Outdoor, indoor and project furniture, coordinated through one DHT commercial team."
              )}
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/share/18u8Hk2SxD/?mibextid=wwXIfr",
                  label: "Facebook",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/dhtfurniturevietnam/posts/?feedView=all",
                  label: "LinkedIn",
                },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded border border-white/25 flex items-center justify-center text-white/85 hover:text-white hover:border-white/60 transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Block 2: Contact DHT */}
          <motion.div variants={fadeUp} className="lg:col-span-6 xl:col-span-5">
            <h4 className="font-display text-white font-semibold text-xl mb-2">
              {tr("footer.contact", "Contact DHT")}
            </h4>
            <p className="font-body text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-[#F3BA7A] mb-5">
              {tr("footer.commercialOffice", "DHT Commercial Office")}
            </p>

            <ul className="space-y-3.5 font-body text-[15px] sm:text-base text-white/95">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-1 shrink-0 text-[#F3BA7A]" />
                <span className="leading-relaxed">
                  {tr(
                    "footer.officeAddress",
                    "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam"
                  )}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-[#F3BA7A]" />
                <a
                  href="mailto:sales@dhtcompany.com"
                  className="font-medium text-white/95 hover:text-[#F3BA7A] transition-colors"
                >
                  sales@dhtcompany.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-[#F3BA7A]" />
                <a
                  href="tel:+84932058545"
                  className="font-medium text-white/95 hover:text-[#F3BA7A] transition-colors"
                >
                  +84 932 058 545
                </a>
              </li>

              <li className="flex items-center gap-3 pt-1 text-white/85 text-[15px]">
                <CalendarClock size={16} className="shrink-0 text-[#F3BA7A]" />
                <span>{tr("footer.visitNote", "Factory visits by appointment.")}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="font-body text-xs text-white/75">
            {tr("footer.copyright", "© 2026 DHT Furniture Vietnam Joint Stock Company. All rights reserved.")}
          </p>
          <p className="font-body text-xs text-white/70">
            {tr("footer.tagline", "Outdoor • Indoor • Project Furniture • Wood & Panels")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
