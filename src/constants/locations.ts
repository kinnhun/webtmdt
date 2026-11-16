export type MasterLocationKey = "office" | "manufacturing";

export type MasterLocation = {
  key: MasterLocationKey;
  title: { us: string; uk: string; vi: string };
  subtitle: { us: string; uk: string; vi: string };
  address: { us: string; uk: string; vi: string };
  phone: string;
  href: string;
  hours: { us: string; uk: string; vi: string };
};

export const MASTER_LOCATIONS: MasterLocation[] = [
  {
    key: "office",
    title: {
      us: "DHT Commercial Office",
      uk: "DHT Commercial Office",
      vi: "Văn phòng Thương mại DHT",
    },
    subtitle: {
      us: "Commercial & Business Inquiries",
      uk: "Commercial & Business Inquiries",
      vi: "Phòng Thương mại & Hợp tác Quốc tế",
    },
    address: {
      us: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
      uk: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
      vi: "72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam",
    },
    phone: "+84 932 058 545",
    href: "tel:+84932058545",
    hours: {
      us: "08:00 - 17:00 (UTC+7), Monday to Friday. Visits by appointment.",
      uk: "08:00 - 17:00 (UTC+7), Monday to Friday. Visits by appointment.",
      vi: "08:00 - 17:00 (UTC+7), Thứ Hai đến Thứ Sáu. Tiếp khách theo lịch hẹn.",
    },
  },
  {
    key: "manufacturing",
    title: {
      us: "DHT Manufacturing Network",
      uk: "DHT Manufacturing Network",
      vi: "Mạng lưới Sản xuất DHT",
    },
    subtitle: {
      us: "11 Specialised Facilities Across Vietnam",
      uk: "11 Specialised Facilities Across Vietnam",
      vi: "11 Cơ sở sản xuất chuyên môn hóa tại Việt Nam",
    },
    address: {
      us: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho / Vinh Phuc",
      uk: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho / Vinh Phuc",
      vi: "4 Cụm sản xuất: Quy Nhơn, TP.HCM & Vành đai phía Nam, Hưng Yên, Phú Thọ / Vĩnh Phúc",
    },
    phone: "+84 932 058 545",
    href: "tel:+84932058545",
    hours: {
      us: "Factory visits arranged by appointment through our Ho Chi Minh City commercial desk.",
      uk: "Factory visits arranged by appointment through our Ho Chi Minh City commercial desk.",
      vi: "Tham quan nhà máy được sắp xếp theo lịch hẹn thông qua văn phòng thương mại tại TP.HCM.",
    },
  },
];

export function getLocalizedLocations(langKey: 'us' | 'uk' | 'vi' = 'us') {
  return MASTER_LOCATIONS.map((loc) => ({
    key: loc.key,
    title: loc.title[langKey] || loc.title.us,
    subtitle: loc.subtitle[langKey] || loc.subtitle.us,
    address: loc.address[langKey] || loc.address.us,
    phone: loc.phone,
    href: loc.href,
    hours: loc.hours[langKey] || loc.hours.us,
  }));
}
