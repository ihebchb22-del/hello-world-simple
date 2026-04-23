import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import heroImg from "@/assets/hero-cinematic.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const { t, dir } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { val: "10K+", key: "hero.statAthletes" },
    { val: "4.9", key: "hero.statRating", suffix: "★" },
    { val: "24h", key: "hero.statDelivery" },
  ];

  return (
    <section
      dir={dir}
      className="relative min-h-[100svh] w-full flex flex-col overflow-hidden bg-background"
      aria-label={t("hero.imageAlt")}
    >
      {/* Background image */}
      <img
        src={heroImg}
        alt={t("hero.imageAlt")}
        width={1280}
        height={1600}
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1400ms] ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Editorial gradient: deep at bottom for type legibility, soft top */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 via-35% to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent rtl:bg-gradient-to-l" />

      {/* Subtle film grain via noise — just a tinted overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,hsl(var(--background))_0%,transparent_60%)]" />

      {/* ─── Top metadata rail ─────────────────────────────────────── */}
      <div
        className={`relative z-20 flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-16 pt-6 sm:pt-8 transition-opacity duration-700 delay-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-condensed text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.32em] text-foreground/70">
            {t("hero.tagline")}
          </span>
        </div>
        <span className="hidden sm:block font-condensed text-[10px] font-medium uppercase tracking-[0.32em] text-foreground/40 tabular-nums">
          N°01 — TUNISIA
        </span>
      </div>

      {/* ─── Main content — anchored bottom-left ───────────────────── */}
      <div className="relative z-10 mt-auto w-full px-5 sm:px-8 lg:px-16 pb-14 sm:pb-20 lg:pb-24">
        <div className="max-w-5xl">
          {/* Headline — single weight, tight tracking, no gradient */}
          <h1
            className={`font-heading text-foreground leading-[0.88] tracking-[-0.02em] transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontSize: "clamp(2.5rem, 9.5vw, 8rem)" }}
          >
            <span className="block">{t("hero.title1")}</span>
            <span className="block text-foreground/95">
              {t("hero.title2")}{" "}
              <span className="italic font-light text-primary/95">
                {t("hero.title3")}
              </span>
              <span className="text-primary">.</span>
            </span>
          </h1>

          {/* Hairline divider */}
          <div
            className={`mt-7 sm:mt-9 h-px w-16 bg-foreground/30 transition-all duration-700 delay-500 ${
              loaded ? "opacity-100 w-16" : "opacity-0 w-0"
            }`}
          />

          {/* Description */}
          <p
            className={`mt-6 text-[15px] sm:text-base lg:text-lg text-foreground/70 max-w-xl leading-[1.65] transition-all duration-700 delay-[600ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t("hero.description")}
          </p>

          {/* CTAs — refined, less candy */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 transition-all duration-700 delay-[750ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              to="/shop"
              className="group relative bg-primary text-primary-foreground px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary/90 active:scale-[0.98] inline-flex items-center justify-center gap-3"
            >
              <span>{t("hero.shop")}</span>
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/build-pack"
              className="group px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-foreground border border-foreground/25 transition-all hover:border-foreground hover:bg-foreground hover:text-background inline-flex items-center justify-center gap-3"
            >
              <span>{t("hero.buildPack")}</span>
            </Link>
          </div>

          {/* Stats — editorial table style */}
          <div
            className={`mt-12 sm:mt-16 grid grid-cols-3 gap-px bg-foreground/10 max-w-2xl border-y border-foreground/10 transition-all duration-700 delay-[900ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {stats.map((s) => (
              <div key={s.key} className="bg-background/40 backdrop-blur-sm py-4 sm:py-5 px-3 sm:px-5">
                <div className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground leading-none tabular-nums">
                  {s.val}
                  {s.suffix && <span className="text-primary">{s.suffix}</span>}
                </div>
                <div className="mt-2 text-[9px] sm:text-[10px] font-condensed uppercase tracking-[0.2em] text-foreground/55 leading-tight">
                  {t(s.key)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom signature line ─────────────────────────────────── */}
      <div
        className={`relative z-10 hidden md:flex items-center justify-between gap-6 px-5 sm:px-8 lg:px-16 pb-6 transition-opacity duration-1000 delay-[1100ms] ${
          loaded ? "opacity-60" : "opacity-0"
        }`}
      >
        <span className="font-condensed text-[10px] uppercase tracking-[0.32em] text-foreground/60">
          {t("hero.scroll")}
        </span>
        <div className="flex-1 h-px bg-foreground/15" />
        <span className="font-condensed text-[10px] uppercase tracking-[0.32em] text-foreground/60 tabular-nums">
          MF — EST. 2020
        </span>
      </div>

      {/* Bottom edge fade for seamless join */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
    </section>
  );
};

export default HeroSection;
