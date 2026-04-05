import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

const FLAGS: Record<string, ReactNode> = {
  "en-US": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14" className="rounded-[2px]">
      <rect width="60" height="30" fill="#002868"/>
      <rect y="2.31" width="60" height="2.31" fill="#fff"/><rect y="6.92" width="60" height="2.31" fill="#fff"/><rect y="11.54" width="60" height="2.31" fill="#fff"/><rect y="16.15" width="60" height="2.31" fill="#fff"/><rect y="20.77" width="60" height="2.31" fill="#fff"/><rect y="25.38" width="60" height="2.31" fill="#fff"/>
      <rect y="4.62" width="60" height="2.31" fill="#BF0A30"/><rect y="9.23" width="60" height="2.31" fill="#BF0A30"/><rect y="13.85" width="60" height="2.31" fill="#BF0A30"/><rect y="18.46" width="60" height="2.31" fill="#BF0A30"/><rect y="23.08" width="60" height="2.31" fill="#BF0A30"/><rect y="27.69" width="60" height="2.31" fill="#BF0A30"/>
      <rect width="24" height="16.15" fill="#002868"/>
    </svg>
  ),
  "en-GB": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14" className="rounded-[2px]">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" clipPath="url(#gb)"/>
      <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  "vi-VN": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width="20" height="14" className="rounded-[2px]">
      <rect width="30" height="20" fill="#da251d"/>
      <polygon points="15,4 16.76,9.41 22.5,9.41 17.87,12.59 19.63,18 15,14.82 10.37,18 12.13,12.59 7.5,9.41 13.24,9.41" fill="#ff0"/>
    </svg>
  ),
};

const LANGUAGES = [
  { code: "en-US", short: "US" },
  { code: "en-GB", short: "UK" },
  { code: "vi-VN", short: "VI" },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm font-body text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
        aria-label="Change language"
      >
        {mounted ? (
          <>
            <span className="flex items-center leading-none">{FLAGS[current.code]}</span>
            <span className="hidden sm:inline text-xs font-medium tracking-wide">{current.short}</span>
          </>
        ) : (
          <>
            <span className="text-base leading-none">🌐</span>
            <span className="hidden sm:inline text-xs font-medium tracking-wide">—</span>
          </>
        )}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {mounted && open && (
        <div
          className="absolute right-0 top-full mt-1.5 rounded-sm shadow-xl border overflow-hidden z-50"
          style={{ backgroundColor: "hsl(var(--navy-deep))", borderColor: "rgba(255,255,255,0.12)", minWidth: 140 }}
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === i18n.language;
            return (
              <button
                key={lang.code}
                onClick={async () => {
                  setOpen(false);
                  const { pathname, asPath, query } = router;
                  await router.push({ pathname, query }, asPath, { locale: lang.code });
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-sm transition-colors text-left"
                style={{
                  color: isActive ? "hsl(var(--orange))" : "rgba(255,255,255,0.7)",
                  backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
              >
                <span className="flex items-center leading-none">{FLAGS[lang.code]}</span>
                <span className="font-medium">{lang.short}</span>
                {isActive && (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" className="ml-auto">
                    <path d="M1 4L4.5 7.5L11 1" stroke="hsl(var(--orange))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
