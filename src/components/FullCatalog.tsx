import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const FullCatalog = () => {
  const remaining = products.slice(4);
  const { t, dir } = useI18n();

  if (remaining.length === 0) return null;

  return (
    <section className="container py-8 sm:py-10 md:py-16" dir={dir}>
      <ScrollReveal>
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 block">
              {t("catalog.subtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground">
              {t("catalog.title")}
            </h2>
            <p className="text-muted-foreground mt-2 font-condensed text-base sm:text-lg">{t("catalog.description")}</p>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider hover:gap-4 transition-all"
          >
            {t("featured.viewAll")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rtl:rotate-180" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {remaining.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 80} direction="up">
            <ProductCard product={p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FullCatalog;
