import { useState, useRef, useEffect } from "react";
import { useI18n, Language } from "@/i18n";

const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-sm shadow-sm">
    <clipPath id="gb"><rect width="60" height="42" rx="2"/></clipPath>
    <g clipPath="url(#gb)">
      <rect width="60" height="42" fill="#012169"/>
      <path d="M0 0L60 42M60 0L0 42" stroke="#fff" strokeWidth="7"/>
      <path d="M0 0L60 42M60 0L0 42" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30 0V42M0 21H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0V42M0 21H60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FlagFR = () => (
  <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-sm shadow-sm">
    <rect width="60" height="42" rx="2" fill="#fff"/>
    <rect width="20" height="42" fill="#002395"/>
    <rect x="40" width="20" height="42" fill="#ED2939"/>
  </svg>
);

const FlagAR = () => (
  <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-sm shadow-sm">
    <rect width="60" height="42" rx="2" fill="#fff"/>
    <rect width="60" height="14" fill="#006C35"/>
    <rect y="28" width="60" height="14" fill="#000"/>
    <text x="30" y="24" textAnchor="middle" fill="#006C35" fontSize="10" fontWeight="bold">☪</text>
  </svg>
);

const flags: Record<Language, () => JSX.Element> = { en: FlagEN, fr: FlagFR, ar: FlagAR };
const labels: Record<Language, string> = { en: "English", fr: "Français", ar: "العربية" };
const shortLabels: Record<Language, string> = { en: "EN", fr: "FR", ar: "AR" };

const LanguageSwitcher = () => {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const ActiveFlag = flags[language];
  const otherLangs = (Object.keys(flags) as Language[]).filter((l) => l !== language);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-secondary transition-all duration-200"
        aria-label={`Language: ${labels[language]}`}
      >
        <ActiveFlag />
        <span className="text-[11px] font-condensed font-semibold uppercase tracking-wider">{shortLabels[language]}</span>
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-card overflow-hidden z-50 min-w-[160px] animate-fade-in">
          {otherLangs.map((lang) => {
            const Flag = flags[lang];
            return (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-foreground hover:bg-secondary/80 transition-colors duration-150"
              >
                <Flag />
                <span className="text-sm font-body">{labels[lang]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
