import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
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
          title: "DHT Head Office & Commercial Dept.",
          subtitle: "Commercial & Business Inquiries",
          address: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
          phone: "+84 932 058 545",
          href: "tel:+84932058545",
          hours: "08:00 - 17:00 (UTC+7), Mon - Fri. Visits by appointment."
        },
        {
          title: "DHT Showroom & Gallery",
          subtitle: "Outdoor & Indoor Collections",
          address: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam",
          phone: "+84 907 386 898",
          href: "tel:+84907386898",
          hours: "08:00 - 17:00 (UTC+7). Visits by appointment."
        },
        {
          title: "DHT Manufacturing Network (11 Facilities)",
          subtitle: "4 Clusters Across Vietnam",
          address: "Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc",
          phone: "+84 902 907 399",
          href: "tel:+84902907399",
          hours: "Factory visits arranged by appointment."
        }
      ];

  const quickLinks = [
    { label: t("nav.home", "Home"), href: "/" },
    { label: t("nav.about", "About DHT"), href: "/about" },
    { label: t("nav.manufacturing", "Manufacturing"), href: "/manufacturing" },
    { label: t("nav.qualityCompliance", "Quality & Compliance"), href: "/quality-compliance" },
    { label: t("footer.links.outdoorCollection", "Outdoor Collections"), href: "/catalogue/outdoor" },
    { label: t("footer.links.indoorCollection", "Indoor & Projects"), href: "/catalogue/indoor" },
    { label: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const collectionGroups = [
    {
      title: t("footer.links.outdoorCollection"),
      items: [
        { label: t("footer.collectionsItems.outdoorSofas"), href: "/catalogue/outdoor?category=Outdoor+Sofas" },
        { label: t("footer.collectionsItems.diningSets"), href: "/catalogue/outdoor?category=Dining+Sets" },
        { label: t("footer.collectionsItems.loungeDaybeds"), href: "/catalogue/outdoor?category=Lounge+%26+Daybeds" },
        { label: t("footer.collectionsItems.tables"), href: "/catalogue/outdoor?category=Tables" },
        { label: t("footer.collectionsItems.chairs"), href: "/catalogue/outdoor?category=Chairs" },
      ],
    },
    {
      title: t("footer.links.indoorCollection"),
      items: [
        { label: t("footer.collectionsItems.livingRoomFurniture"), href: "/catalogue/indoor?category=Living+Room+Furniture" },
        { label: t("footer.collectionsItems.diningRoomFurniture"), href: "/catalogue/indoor?category=Dining+Room+Furniture" },
        { label: t("footer.collectionsItems.bathroomFurniture"), href: "/catalogue/indoor?category=Bathroom+Furniture" },
      ],
    },
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
              {t("footer.description", "DHT Furniture Vietnam is a Vietnamese furniture manufacturer and exporter, operating as part of a family-owned furniture group with 11 production facilities across Vietnam. We develop outdoor, indoor and project furniture for international buyers.")}
            </p>
            <div className="flex gap-3 lg:justify-center">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/share/18u8Hk2SxD/?mibextid=wwXIfr", label: "Facebook" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/dhtfurniturevietnam/posts/?feedView=all", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <div className="space-y-5">
              {collectionGroups.map((group) => (
                <div key={group.title}>
                  <h5 className="font-body text-sm font-semibold text-white mb-3">{group.title}</h5>
                  {group.items.length > 0 && (
                    <ul className="space-y-3">
                      {group.items.map(({ label, href }) => (
                        <li key={href}>
                          <Link href={href} className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 group flex items-center gap-1">
                            <span className="inline-block w-0 group-hover:w-3 h-px transition-all duration-200 mr-0 group-hover:mr-1" style={{ backgroundColor: "hsl(var(--orange))" }} />
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
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

            <div className="mt-8 pt-6 border-t border-white/10">
              <a href="mailto:sales@dhtcompany.com" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#B97846] hover:text-white transition-colors">
                <Mail size={16} /> sales@dhtcompany.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="font-body text-xs text-white/40">
            {t("footer.copyright", "© 2026 DHT Furniture Vietnam Joint Stock Company. All rights reserved.")}
          </p>
          <p className="font-body text-xs text-white/30">
            {t("footer.tagline", "Outdoor • Indoor • Project Furniture")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
