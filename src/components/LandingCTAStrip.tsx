import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import ctaBuildpack from "@/assets/cta-buildpack.jpg";
import ctaTools from "@/assets/cta-tools.jpg";

const LandingCTAStrip = () => {
  const { t, dir } = useI18n();

  return (
    <section className="container py-6 sm:py-8 md:py-12" dir={dir}>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <ScrollReveal direction="left">
          <Link
            to="/build-pack"
            className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/40 hover:shadow-gold transition-all duration-500 block min-h-[200px] sm:min-h-[260px] touch-manipulation"
          >
            <img src={ctaBuildpack} alt={t("landing.packCta")} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={960} height={640} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
            <div className="relative p-5 sm:p-6 md:p-8 flex flex-col justify-center h-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-heading text-foreground mb-1.5 sm:mb-2">
                {t("landing.packCta")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-condensed mb-3 sm:mb-4 max-w-xs">
                {t("landing.packCtaDesc")}
              </p>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed font-bold text-primary uppercase tracking-wider group-hover:gap-4 transition-all">
                {t("landing.packCtaBtn")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rtl:rotate-180" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <Link
            to="/tools"
            className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/40 hover:shadow-gold transition-all duration-500 block min-h-[200px] sm:min-h-[260px] touch-manipulation"
          >
            <img src={ctaTools} alt={t("landing.toolsCta")} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={960} height={640} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
            <div className="relative p-5 sm:p-6 md:p-8 flex flex-col justify-center h-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-heading text-foreground mb-1.5 sm:mb-2">
                {t("landing.toolsCta")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-condensed mb-3 sm:mb-4 max-w-xs">
                {t("landing.toolsCtaDesc")}
              </p>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed font-bold text-primary uppercase tracking-wider group-hover:gap-4 transition-all">
                {t("landing.toolsCtaBtn")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rtl:rotate-180" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LandingCTAStrip;
