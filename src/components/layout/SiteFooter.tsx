import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "@/lib/animations";import { useQuery } from "@tanstack/react-query";

export default function SiteFooter() {
  const { t, i18n } = useTranslation();

  const langKey = (() => {
    const lang = i18n.language;
    if (lang === 'vi-VN' || lang === 'vi') return 'vi';
    if (lang === 'en-GB') return 'uk';
    return 'us';
  })();

  const txt = (obj: any, lKey: string) => {
    if (!obj) return '';
    const val = obj[lKey];
    if (val) return val;
    return obj.us || '';
  };

  const { data: dbData } = useQuery({
    queryKey: ['footerContactContent'],
    queryFn: async () => {
      const res = await fetch('/api/contact-content');
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
  });

  const hasDB = !!dbData;

  const contactLocations = (hasDB && dbData.locations?.items?.length) 
    ? dbData.locations.items.map((loc: any) => ({
        title: txt(loc.title, langKey),
        subtitle: txt(loc.subtitle, langKey),
        address: txt(loc.address, langKey),
        phone: loc.phone || "",
        href: loc.href || `tel:${(loc.phone || "").replace(/\s/g, "")}`,
        hours: txt(loc.hours, langKey)
      }))
    : [
        {
          title: "DHT Furniture Vietnam Factory",
          subtitle: "",
          address: "19 National Highway, Nguyen Hue Ward, Phuoc Loc, Tuy Phuoc District, Binh Dinh Province, Vietnam",
          phone: "+84 902 907 399",
          href: "tel:+84902907399",
          hours: "(From 8:00 AM - 17:00 PM Vietnam local time)"
        },
        {
          title: "DHT Private Garden Showroom",
          subtitle: "",
          address: "Vinh Thanh 2 Hamlet, Tuy Phuoc Commune, Gia Lai Province, Vietnam",
          phone: "+84 907 386 898",
          href: "tel:+84907386898",
          hours: "(From 8:00 AM - 17:00 PM Vietnam local time)"
        },
        {
          title: "DHT Furniture Vietnam Office",
          subtitle: "Commercial & CS Dept.",
          address: "72 Le Thanh Ton Street, Sai Gon Ward, Ho Chi Minh City, Vietnam",
          phone: "+84 907 386 898",
          href: "tel:+84907386898",
          hours: "(24/7)"
        },
        {
          title: "JDD Global Furnishing Co. Ltd",
          subtitle: "",
          address: "226 Go Dua Street, Tam Binh Ward, Thu Duc City, Ho Chi Minh City, Vietnam",
          phone: "+84 932 058 545",
          href: "tel:+84932058545",
          hours: "(From 8:00 AM - 17:00 PM Vietnam local time)"
        }
      ];

  const quickLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.catalogue"), href: "/catalogue/outdoor" },
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

              {contactLocations.map((loc: any, i: number) => (
                <div key={i}>
                  <h5 className="text-white font-bold text-sm mb-3">
                    <span dangerouslySetInnerHTML={{ __html: loc.title }} className="rt-reset" />
                    {loc.subtitle && (
                      <span className="text-[10px] text-[hsl(var(--orange))]/80 uppercase tracking-widest block mt-1 rt-reset" dangerouslySetInnerHTML={{ __html: loc.subtitle }} />
                    )}
                  </h5>
                  <ul className="space-y-3">
                    {loc.address && (
                      <li className="flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-[hsl(var(--orange))]" />
                        <span className="font-body text-xs text-white/60 leading-relaxed block flex-1 overflow-hidden" style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: loc.address }} />
                      </li>
                    )}
                    {loc.phone && (
                      <li className="flex items-start gap-2">
                        <Phone size={16} className="mt-0.5 shrink-0 text-[hsl(var(--orange))]" />
                        <span className="font-body text-xs text-white/60 leading-relaxed block flex-1 overflow-hidden">
                          <a href={loc.href || `tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors block mb-1">
                            {loc.phone}
                          </a>
                          {loc.hours && (
                            <span className="text-white/40 block rt-reset wrap-break-word" dangerouslySetInnerHTML={{ __html: loc.hours }} />
                          )}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
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
