import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const CTABanner = () => {
  const { t, dir } = useI18n();

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-20" dir={dir}>
      <div className="absolute inset-0 gradient-gold opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiMwMDAiLz48L2c+PC9zdmc+')] opacity-30" />
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/10 rounded-full animate-[spin_20s_linear_infinite] hidden sm:block" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary-foreground/10 rounded-full animate-[spin_30s_linear_infinite_reverse] hidden sm:block" />
      <div className="container relative z-10 text-center px-5">
        <ScrollReveal direction="scale">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading text-primary-foreground leading-tight">{t("cta.title")}</h2>
          <p className="text-primary-foreground/80 mt-3 sm:mt-4 max-w-xl mx-auto font-condensed text-base sm:text-lg">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Link to="/shop" className="group relative bg-background px-6 sm:px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-foreground rounded overflow-hidden transition-all hover:shadow-xl touch-manipulation text-center">
              <span className="relative z-10">{t("cta.shop")}</span>
              <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-sm font-bold uppercase tracking-wider text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t("cta.shop")}</span>
            </Link>
            <Link to="/tips" className="border-2 border-primary-foreground px-6 sm:px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground rounded transition-all hover:bg-primary-foreground hover:text-primary touch-manipulation text-center">
              {t("cta.guides")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTABanner;
