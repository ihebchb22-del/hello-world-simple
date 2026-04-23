import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

const Footer = () => {
  const { t, dir } = useI18n();

  const shopLinks = [
    { key: "footer.proteins", href: "/shop" },
    { key: "footer.preWorkout", href: "/shop" },
    { key: "footer.creatine", href: "/shop" },
    { key: "footer.bcaas", href: "/shop" },
    { key: "footer.vitamins", href: "/shop" },
    { key: "footer.fatBurners", href: "/shop" },
    { key: "footer.equipment", href: "/shop" },
    { key: "footer.apparel", href: "/shop" },
  ];

  const resourceLinks = [
    { key: "footer.suppGuides", href: "/tips" },
    { key: "footer.gearTips", href: "/tips" },
    { key: "footer.exerciseLib", href: "/workouts" },
    { key: "footer.nutritionPlans", href: "/tips" },
    { key: "footer.blog", href: "/tips" },
    { key: "nav.workouts", href: "/workouts" },
    { key: "nav.tools", href: "/tools" },
    { key: "nav.buildPack", href: "/build-pack" },
  ];

  const supportLinks = [
    { key: "footer.contact", href: "#" },
    { key: "footer.shipping", href: "#" },
    { key: "footer.trackOrder", href: "#" },
    { key: "footer.sizeGuide", href: "#" },
    { key: "footer.privacy", href: "#" },
    { key: "footer.terms", href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-card mt-16 sm:mt-20" dir={dir} role="contentinfo">
      <div className="container py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 md:col-span-1">
            <img src="/images/logo.png" alt="Muscle Factory" className="h-7 sm:h-8 invert mb-4" width={120} height={32} loading="lazy" />
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.description")}</p>
            <div className="flex gap-4 mt-5 sm:mt-6">
              {["Instagram", "YouTube", "TikTok", "Facebook"].map((s) => (
                <a key={s} href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-condensed font-semibold uppercase tracking-wider touch-manipulation" aria-label={`${s}`}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-lg text-foreground mb-3 sm:mb-4">{t("footer.shop")}</h3>
            <ul className="space-y-2">
              {shopLinks.map((item) => (
                <li key={item.key}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors touch-manipulation">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg text-foreground mb-3 sm:mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((item) => (
                <li key={item.key}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors touch-manipulation">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading text-lg text-foreground mb-3 sm:mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors touch-manipulation">
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 sm:mt-6">
              <p className="text-xs text-muted-foreground mb-2">{t("footer.subscribe")}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="flex-1 min-w-0 bg-secondary rounded-l-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  dir={dir}
                  aria-label={t("footer.emailPlaceholder")}
                />
                <button className="gradient-gold px-4 sm:px-5 py-2.5 rounded-r-lg text-xs font-bold text-primary-foreground uppercase tracking-wider hover:shadow-gold transition-all touch-manipulation whitespace-nowrap">
                  {t("footer.join")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs text-muted-foreground">{t("footer.rights")}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["Visa", "Mastercard", "PayPal", "Apple Pay", "Klarna"].map((p) => (
              <span key={p} className="text-[10px] sm:text-xs text-muted-foreground font-condensed font-semibold uppercase">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
