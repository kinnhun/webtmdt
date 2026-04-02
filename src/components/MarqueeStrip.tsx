import { useTranslation } from "react-i18next";

const separatorDot = (
  <span className="inline-block w-1.5 h-1.5 rounded-full mx-5 align-middle" style={{ backgroundColor: "hsl(var(--orange))" }} />
);

interface MarqueeStripProps {
  items?: string[];
}

export default function MarqueeStrip({ items: customItems }: MarqueeStripProps) {
  const { t } = useTranslation();
  const items = customItems ?? (t("marquee.items", { returnObjects: true }) as string[]);

  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className="inline-block whitespace-nowrap font-body font-medium text-sm tracking-widest uppercase">{item}</span>,
    <span key={`dot-${i}`} className="inline-block" aria-hidden>{separatorDot}</span>,
  ]);

  // Duplicate content 8 times to ensure it's wide enough for 4K+ screens
  const repeatedContent = Array.from({ length: 8 }).map((_, i) => (
    <span key={`repeat-${i}`} className="inline-flex items-center shrink-0">
      {content}
    </span>
  ));

  return (
    <div className="relative overflow-hidden py-4 border-y" style={{ backgroundColor: "hsl(var(--navy))", borderColor: "hsl(var(--navy-light)/0.4)" }}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <span className="flex items-center shrink-0" style={{ color: "hsl(var(--warm-cream)/0.7)" }}>{repeatedContent}</span>
        <span className="flex items-center shrink-0" style={{ color: "hsl(var(--warm-cream)/0.7)" }} aria-hidden>{repeatedContent}</span>
      </div>
    </div>
  );
}
