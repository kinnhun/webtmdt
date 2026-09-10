import { useTranslation } from "react-i18next";

const separatorDot = (
  <span className="inline-block w-1.5 h-1.5 rounded-full mx-5 align-middle" style={{ backgroundColor: "#B97846" }} />
);

interface MarqueeStripProps {
  items?: string[];
}

const DEFAULT_MARQUEE_EN = [
  "OEM Development",
  "Wood & Mixed Materials",
  "Quality Control",
  "Export Coordination",
];

const DEFAULT_MARQUEE_VI = [
  "Phát Triển OEM",
  "Gỗ & Vật Liệu Phối Hợp",
  "Kiểm Soát Chất Lượng",
  "Điều Phối Xuất Khẩu",
];

export default function MarqueeStrip({ items: customItems }: MarqueeStripProps) {
  const { t, i18n } = useTranslation();
  
  let items = customItems;
  if (!items || !Array.isArray(items) || items.length === 0) {
    const translated = t("marquee.items", { returnObjects: true });
    if (Array.isArray(translated) && translated.length > 0) {
      items = translated as string[];
    } else {
      items = i18n.language?.startsWith("vi") ? DEFAULT_MARQUEE_VI : DEFAULT_MARQUEE_EN;
    }
  }

  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className="inline-block whitespace-nowrap font-body font-medium text-sm tracking-widest uppercase">{item}</span>,
    <span key={`dot-${i}`} className="inline-block" aria-hidden="true">{separatorDot}</span>,
  ]);

  // Duplicate content 8 times to ensure it's wide enough for 4K+ screens
  const repeatedContent = Array.from({ length: 8 }).map((_, i) => (
    <span key={`repeat-${i}`} className="inline-flex items-center shrink-0">
      {content}
    </span>
  ));

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{
        backgroundColor: "#0E241B",
        borderColor: "rgba(185, 120, 70, 0.25)",
      }}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <span className="flex items-center shrink-0" style={{ color: "rgba(247, 245, 240, 0.88)" }}>{repeatedContent}</span>
        <span className="flex items-center shrink-0" style={{ color: "rgba(247, 245, 240, 0.88)" }} aria-hidden="true">{repeatedContent}</span>
      </div>
    </div>
  );
}
