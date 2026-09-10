import Head from "next/head";
import { useRouter } from "next/router";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  keywords?: string;
  // Article specific
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  // Product specific
  brand?: string;
  price?: string | number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder" | string;
  sku?: string;
}

const SITE_NAME = "DHT Furniture Vietnam";
const SITE_DOMAIN = "https://dhtcompany.com";
const DEFAULT_IMAGE = `${SITE_DOMAIN}/img/logo-no-text.png`;

export default function SEO({
  title,
  description,
  image,
  url,
  canonical,
  type = "website",
  noindex = false,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  brand = "DHT Furniture Vietnam",
  price,
  currency = "USD",
  availability = "InStock",
  sku,
}: SEOProps) {
  const router = useRouter();
  const locale = router.locale || "en-US";
  const isVi = locale === "vi-VN";

  const defaultDescriptionEn =
    "DHT Furniture Vietnam is a premier manufacturer and exporter of outdoor, indoor, and commercial project furniture with 11 specialized facilities across Vietnam.";
  const defaultDescriptionVi =
    "DHT Furniture Vietnam là đơn vị sản xuất và xuất khẩu nội thất ngoài trời, trong nhà và dự án thương mại với mạng lưới 11 cơ sở sản xuất chuyên môn hóa trên toàn quốc.";

  const defaultTitle = isVi
    ? "DHT Furniture Vietnam - Nhà Sản Xuất & Xuất Khẩu Nội Thất"
    : "DHT Furniture Vietnam - Outdoor, Indoor & Project Furniture Manufacturer";

  const defaultDesc = isVi ? defaultDescriptionVi : defaultDescriptionEn;

  const finalTitle = title
    ? (title.includes("DHT Furniture Vietnam") ? title : `${title} | DHT Furniture Vietnam`)
    : defaultTitle;
  const finalDesc = description || defaultDesc;

  // Auto noindex on admin routes and 404
  const isAdminOr404 = router.pathname.startsWith("/admin") || router.pathname === "/404";
  const effectiveNoindex = noindex || isAdminOr404;

  // Ensure absolute image URL
  const rawImage = image || DEFAULT_IMAGE;
  const finalImage = rawImage.startsWith("http://") || rawImage.startsWith("https://")
    ? rawImage
    : `${SITE_DOMAIN}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  // Clean path without query parameters or hash
  const rawPath = router.asPath || "/";
  const cleanPath = rawPath.split("?")[0].split("#")[0];

  // Canonical URL
  const canonicalUrl =
    canonical ||
    url ||
    (locale === "en-US"
      ? `${SITE_DOMAIN}${cleanPath}`
      : `${SITE_DOMAIN}/${locale}${cleanPath === "/" ? "" : cleanPath}`);

  // Base path for hreflangs
  const normalizedPath = cleanPath === "/" ? "" : cleanPath;

  const ogLocale = locale === "vi-VN" ? "vi_VN" : locale === "en-GB" ? "en_GB" : "en_US";

  return (
    <Head>
      <title key="title">{finalTitle}</title>
      <meta key="description" name="description" content={finalDesc} />
      {keywords && <meta key="keywords" name="keywords" content={keywords} />}
      <meta
        key="robots"
        name="robots"
        content={
          effectiveNoindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      {/* Open Graph */}
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={finalTitle} />
      <meta key="og:description" property="og:description" content={finalDesc} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:image" property="og:image" content={finalImage} />
      <meta key="og:image:secure_url" property="og:image:secure_url" content={finalImage} />
      <meta key="og:image:alt" property="og:image:alt" content={finalTitle} />
      <meta key="og:locale" property="og:locale" content={ogLocale} />

      {/* Article Open Graph */}
      {type === "article" && (
        <>
          {author && <meta key="article:author" property="article:author" content={author} />}
          {publishedTime && <meta key="article:published_time" property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta key="article:modified_time" property="article:modified_time" content={modifiedTime} />}
          {section && <meta key="article:section" property="article:section" content={section} />}
          {tags?.map((tag) => (
            <meta key={`article:tag:${tag}`} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Product Open Graph */}
      {type === "product" && (
        <>
          <meta key="product:brand" property="product:brand" content={brand} />
          <meta key="product:availability" property="product:availability" content={availability} />
          {price !== undefined && (
            <>
              <meta key="product:price:amount" property="product:price:amount" content={String(price)} />
              <meta key="product:price:currency" property="product:price:currency" content={currency} />
            </>
          )}
          {sku && <meta key="product:retailer_item_id" property="product:retailer_item_id" content={sku} />}
        </>
      )}

      {/* Twitter Card */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@dhtcompany" />
      <meta key="twitter:title" name="twitter:title" content={finalTitle} />
      <meta key="twitter:description" name="twitter:description" content={finalDesc} />
      <meta key="twitter:image" name="twitter:image" content={finalImage} />
      <meta key="twitter:image:alt" name="twitter:image:alt" content={finalTitle} />

      {/* Canonical URL */}
      <link key="canonical" rel="canonical" href={canonicalUrl} />

      {/* Hreflang for international multi-language SEO */}
      <link key="alt-en-us" rel="alternate" hrefLang="en-US" href={`${SITE_DOMAIN}/en-US${normalizedPath}`} />
      <link key="alt-en-gb" rel="alternate" hrefLang="en-GB" href={`${SITE_DOMAIN}/en-GB${normalizedPath}`} />
      <link key="alt-vi-vn" rel="alternate" hrefLang="vi-VN" href={`${SITE_DOMAIN}/vi-VN${normalizedPath}`} />
      <link key="alt-x-default" rel="alternate" hrefLang="x-default" href={`${SITE_DOMAIN}${normalizedPath || "/"}`} />
    </Head>
  );
}

