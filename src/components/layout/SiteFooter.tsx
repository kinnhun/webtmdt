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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10"
        >
          <motion.div variants={fadeUp}>
            <div className="flex justify-center mb-5">
              <Image
                src="/img/logo.png"
                alt="DHT Logo"
                width={140}
                height={140}
                className="rounded-sm"
              />

            </div>
            <p className="font-body text-sm leading-relaxed text-white/60 mb-5">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
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

          <motion.div variants={fadeUp}>
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

          <motion.div variants={fadeUp}>
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

          <motion.div variants={fadeUp}>
            <h4 className="font-display text-white font-semibold text-base mb-5">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--accent))" }} />
                <span className="font-body text-sm text-white/60">12 Commerce Blvd, Furniture District, Jakarta 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: "hsl(var(--accent))" }} className="flex-shrink-0" />
                <a href="tel:+6221234567890" className="font-body text-sm text-white/60 hover:text-white transition-colors">+62 21 234 567 890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: "hsl(var(--accent))" }} className="flex-shrink-0" />
                <a href="mailto:info@dht-furniture.com" className="font-body text-sm text-white/60 hover:text-white transition-colors">info@dht-furniture.com</a>
              </li>
            </ul>
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
