export interface MasterLocation {
  key: "office" | "showroom" | "manufacturing";
  title: { us: string; uk: string; vi: string };
  subtitle: { us: string; uk: string; vi: string };
  address: { us: string; uk: string; vi: string };
  phone: string;
  href: string;
  hours: { us: string; uk: string; vi: string };
}

export const MASTER_LOCATIONS: MasterLocation[] = [
  {
    key: "office",
    title: {
      us: "DHT Central Commercial Coordination Hub",
      uk: "DHT Central Commercial Coordination Hub",
      vi: "Văn phòng Điều phối Thương mại DHT",
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
    key: "showroom",
    title: {
      us: "DHT Showroom & Gallery",
      uk: "DHT Showroom & Gallery",
      vi: "Showroom Trưng Bày DHT",
    },
    subtitle: {
      us: "Outdoor & Indoor Collections",
      uk: "Outdoor & Indoor Collections",
      vi: "Bộ sưu tập Nội Ngoại thất",
    },
    address: {
      us: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam",
      uk: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam",
      vi: "206 Phan Đình Phùng, TP. Pleiku, Tỉnh Gia Lai, Việt Nam",
    },
    phone: "+84 907 386 898",
    href: "tel:+84907386898",
    hours: {
      us: "08:00 - 17:00 (UTC+7). Visits by appointment.",
      uk: "08:00 - 17:00 (UTC+7). Visits by appointment.",
      vi: "08:00 - 17:00 (UTC+7). Tham quan theo lịch hẹn trước.",
    },
  },
  {
    key: "manufacturing",
    title: {
      us: "DHT Manufacturing Network",
      uk: "DHT Manufacturing Network",
      vi: "Mạng lưới Nhà máy Sản xuất DHT",
    },
    subtitle: {
      us: "11 Facilities Across Vietnam",
      uk: "11 Facilities Across Vietnam",
      vi: "11 Cơ sở sản xuất toàn quốc",
    },
    address: {
      us: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc",
      uk: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc",
      vi: "4 Cụm sản xuất: Quy Nhơn, TP.HCM & Nam Bộ, Hưng Yên, Phú Thọ/Vĩnh Phúc",
    },
    phone: "+84 902 907 399",
    href: "tel:+84902907399",
    hours: {
      us: "Factory visits arranged by appointment following product brief review.",
      uk: "Factory visits arranged by appointment following product brief review.",
      vi: "Tham quan nhà xưởng sắp xếp theo lịch hẹn sau khi chốt yêu cầu kỹ thuật.",
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
