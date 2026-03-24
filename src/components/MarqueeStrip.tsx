import { useTranslation } from "react-i18next";

const separatorDot = (
  <span className="inline-block w-1.5 h-1.5 rounded-full mx-5 align-middle" style={{ backgroundColor: "hsl(var(--orange))" }} />
);

export default function MarqueeStrip() {
  const { t } = useTranslation();
  const items = t("marquee.items", { returnObjects: true }) as string[];

  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className="inline-block whitespace-nowrap font-body font-medium text-sm tracking-widest uppercase">{item}</span>,
    <span key={`dot-${i}`} className="inline-block" aria-hidden>{separatorDot}</span>,
  ]);

  return (
    <div className="relative overflow-hidden py-4 border-y" style={{ backgroundColor: "hsl(var(--navy))", borderColor: "hsl(var(--navy-light)/0.4)" }}>
      <div className="flex animate-marquee">
        <span className="flex items-center" style={{ color: "hsl(var(--warm-cream)/0.7)" }}>{content}</span>
        <span className="flex items-center" style={{ color: "hsl(var(--warm-cream)/0.7)" }} aria-hidden>{content}</span>
      </div>
    </div>
  );
}
