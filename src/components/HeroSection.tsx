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

  return (
    <section
      dir={dir}
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden bg-background"
      aria-label={t("hero.imageAlt")}
    >
      {/* Full-bleed cinematic image */}
      <img
        src={heroImg}
        alt={t("hero.imageAlt")}
        width={1280}
        height={1600}
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[2s] ease-out ${
          loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      />

      {/* Cinematic gradient stack */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 via-40% to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.45)_75%,hsl(var(--background))_100%)]" />

      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/[0.04] rounded-full blur-[160px] pointer-events-none" />

      {/* Top-corner brand stamp */}
      <div className={`absolute top-24 sm:top-28 left-5 sm:left-10 rtl:left-auto rtl:right-5 sm:rtl:right-10 z-20 transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <div className="flex items-center gap-2.5">
          <div className="h-px w-8 bg-primary" />
          <span className="font-condensed text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] text-primary">
            {t("hero.tagline")}
          </span>
        </div>
      </div>

      {/* Side vertical scroll hint — desktop */}
      <div className={`hidden lg:flex absolute right-8 rtl:right-auto rtl:left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 transition-opacity duration-1000 delay-[1.4s] ${loaded ? "opacity-60" : "opacity-0"}`}>
        <span className="font-condensed text-[10px] uppercase tracking-[0.4em] text-foreground [writing-mode:vertical-rl]">
          {t("hero.scroll")}
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>

      {/* Main content — anchored bottom-left */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-28 pt-32">
        <div className="max-w-4xl">
          {/* Headline */}
          <h1
            className={`font-heading leading-[0.85] text-foreground transition-all duration-1000 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ fontSize: "clamp(2.75rem, 11vw, 9rem)" }}
          >
            <span className="block">{t("hero.title1")}</span>
            <span className="block -mt-1 sm:-mt-2">
              {t("hero.title2")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-gold-light to-primary">
                {t("hero.title3")}
              </span>
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-foreground/75 max-w-xl leading-relaxed font-condensed transition-all duration-700 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-7 sm:mt-9 transition-all duration-700 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              to="/shop"
              className="group relative gradient-gold px-7 sm:px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground rounded-full transition-all hover:shadow-gold hover:scale-[1.03] active:scale-95 text-center inline-flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">{t("hero.shop")}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/build-pack"
              className="px-7 sm:px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-foreground rounded-full border border-foreground/20 backdrop-blur-md bg-background/30 transition-all hover:border-primary hover:text-primary hover:bg-primary/5 text-center inline-flex items-center justify-center gap-2"
            >
              <span>{t("hero.buildPack")}</span>
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className={`mt-10 sm:mt-14 flex flex-wrap items-center gap-x-8 sm:gap-x-12 gap-y-4 transition-all duration-700 delay-[900ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {[
              { val: "10K+", key: "hero.statAthletes" },
              { val: "4.9★", key: "hero.statRating" },
              { val: "24-48h", key: "hero.statDelivery" },
            ].map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className="text-2xl sm:text-3xl font-heading text-primary leading-none">{s.val}</div>
                <div className="text-[10px] sm:text-[11px] font-condensed uppercase tracking-[0.2em] text-foreground/60 max-w-[110px] leading-tight">
                  {t(s.key)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom edge fade for seamless join */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
    </section>
  );
};

export default HeroSection;
