import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "@/lib/animations";

export default function SiteFooter() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.catalogue"), href: "/catalogue" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const collections = [
    { label: t("home.categories.outdoorSofa.name"), category: "Outdoor Sofas" },
    { label: t("home.categories.outdoorDining.name"), category: "Dining Sets" },
    { label: t("home.categories.aluminium.name"), category: "Tables" },
    { label: t("home.categories.indoor.name"), category: "Chairs" },
  ];

  return (
    <footer className="text-white/80 pt-16 pb-8" style={{ backgroundColor: "hsl(var(--navy-dark))" }}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10"
        >
          <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-3">
            <div className="flex justify-start lg:justify-center mb-5">
              <Image
                src="/img/logo.png"
                alt="DHT Logo"
                width={140}
                height={140}
                className="rounded-sm"
              />
            </div>
            <p className="font-body text-sm leading-relaxed text-white/60 mb-5 lg:text-center">
              {t("footer.description")}
            </p>
            <div className="flex gap-3 lg:justify-center">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-2">
            <h4 className="font-display text-white font-semibold text-base mb-5">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 group flex items-center gap-1">
                    <span className="inline-block w-0 group-hover:w-3 h-px transition-all duration-200 mr-0 group-hover:mr-1" style={{ backgroundColor: "hsl(var(--orange))" }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-2">
            <h4 className="font-display text-white font-semibold text-base mb-5">{t("footer.collections")}</h4>
            <ul className="space-y-3">
              {collections.map(({ label, category }) => (
                <li key={category}>
                  <Link href={`/catalogue?category=${encodeURIComponent(category)}`} className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 group flex items-center gap-1">
                    <span className="inline-block w-0 group-hover:w-3 h-px transition-all duration-200 mr-0 group-hover:mr-1" style={{ backgroundColor: "hsl(var(--orange))" }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-5">
            <h4 className="font-display text-white font-semibold text-base mb-6">{t("footer.contact")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">

              {/* Factory */}
              <div>
                <h5 className="text-white font-bold text-sm mb-3">DHT Furniture Vietnam Factory</h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">19 National Highway, Nguyen Hue Ward, Phuoc Loc, Tuy Phuoc District, Binh Dinh Province, Vietnam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">
                      <a href="tel:+84902907399" className="hover:text-white transition-colors block mb-1">Hotline: +84 902 907 399</a>
                      <span className="text-white/40 block">(From 8:00 AM - 17:00 PM Vietnam local time)</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Showroom */}
              <div>
                <h5 className="text-white font-bold text-sm mb-3">DHT Private Garden Showroom</h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">Vinh Thanh 2 Hamlet, Tuy Phuoc Commune, Gia Lai Province, Vietnam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">
                      <a href="tel:+84907386898" className="hover:text-white transition-colors block mb-1">Hotline: +84 907 386 898</a>
                      <span className="text-white/40 block">(From 8:00 AM - 17:00 PM Vietnam local time)</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Office */}
              <div>
                <h5 className="text-white font-bold text-sm mb-3">DHT Furniture Vietnam Office<br /><span className="text-[10px] text-[hsl(var(--orange))]/80 uppercase tracking-widest block mt-1">Commercial & CS Dept.</span></h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">72 Le Thanh Ton Street, Sai Gon Ward, Ho Chi Minh City, Vietnam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">
                      <a href="tel:+84907386898" className="hover:text-white transition-colors block mb-1">Hotline: +84 907 386 898</a>
                      <span className="text-white/40 block">(24/7)</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* JDD */}
              <div>
                <h5 className="text-white font-bold text-sm mb-3 mt-4 sm:mt-0">JDD Global Furnishing Co. Ltd</h5>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">226 Go Dua Street, Tam Binh Ward, Thu Duc City, Ho Chi Minh City, Vietnam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-[hsl(var(--orange))]" />
                    <span className="font-body text-xs text-white/60 leading-relaxed">
                      <a href="tel:+84932058545" className="hover:text-white transition-colors block mb-1">Hotline: +84 932 058 545</a>
                      <span className="text-white/40 block">(From 8:00 AM - 17:00 PM Vietnam local time)</span>
                    </span>
                  </li>
                </ul>
              </div>

            </div>

            {/* <div className="mt-8 pt-6 border-t border-white/5">
              <a href="mailto:info@dhtcompany.com" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[hsl(var(--orange))] hover:text-white transition-colors">
                <Mail size={16} /> info@dhtcompany.com
              </a>
            </div> */}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="font-body text-xs text-white/40">{t("footer.copyright")}</p>
          <p className="font-body text-xs text-white/30">{t("footer.tagline")}</p>
        </motion.div>
      </div>
    </footer>
  );
}
