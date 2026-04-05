import { DefaultSeoProps } from "next-seo";

export const getSeoConfig = (locale: string): DefaultSeoProps => {
  const isVi = locale === "vi-VN";
  
  const siteName = "DHT Company (nemark)";
  const descriptionEn = "Premium Ecommerce Solutions - DHT Company brings you the best luxury furnitures and home decor elements.";
  const descriptionVi = "Giải pháp Thương mại điện tử Cao cấp - DHT Company mang đến cho bạn các sản phẩm nội thất sang trọng và tinh tế nhất.";

  return {
    titleTemplate: isVi ? "%s | DHT Company" : "%s | DHT Company",
    defaultTitle: "DHT Company - Luxury Furniture",
    description: isVi ? descriptionVi : descriptionEn,
    languageAlternates: [
      { hrefLang: "en", href: "https://dhtcompany.com/en-US" },
      { hrefLang: "vi", href: "https://dhtcompany.com/vi-VN" },
      { hrefLang: "x-default", href: "https://dhtcompany.com" },
    ],
    openGraph: {
      type: "website",
      locale: isVi ? "vi_VN" : "en_US",
      url: "https://dhtcompany.com/",
      siteName: siteName,
      description: isVi ? descriptionVi : descriptionEn,
      images: [
        {
          url: "https://dhtcompany.com/img/logo-no-text.png",
          width: 800,
          height: 600,
          alt: "DHT Company Logo",
        },
      ],
    },
    twitter: {
      handle: "@dhtcompany",
      site: "@dhtcompany",
      cardType: "summary_large_image",
    },
  };
};
