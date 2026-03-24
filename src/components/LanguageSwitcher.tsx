import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en-US", flag: "🇺🇸", short: "US" },
  { code: "en-GB", flag: "🇬🇧", short: "UK" },
  { code: "vi-VN", flag: "🇻🇳", short: "VI" },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
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
            <span className="text-base leading-none">{current.flag}</span>
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
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-sm transition-colors text-left"
                style={{
                  color: isActive ? "hsl(var(--orange))" : "rgba(255,255,255,0.7)",
                  backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
              >
                <span className="text-base leading-none">{lang.flag}</span>
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
