import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";

import whey from "@/assets/product-whey.jpg";
import preworkout from "@/assets/product-preworkout.jpg";
import creatine from "@/assets/product-creatine.jpg";
import bcaa from "@/assets/product-bcaa.jpg";
import testo from "@/assets/product-testo.jpg";
import fatburner from "@/assets/product-fatburner.jpg";

const heroImages: Record<string, string> = {
  "product-whey": whey,
  "product-preworkout": preworkout,
  "product-creatine": creatine,
  "product-bcaa": bcaa,
  "product-testo": testo,
  "product-fatburner": fatburner,
};

const FeaturedProducts = () => {
  const hero = products[0];
  const secondary = products.slice(1, 3);
  const rest = products.slice(3, 7);
  const { t, dir } = useI18n();

  return (
    <section className="bg-card py-8 sm:py-10 md:py-16 relative overflow-hidden" dir={dir}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="container relative">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 block">
                {t("featured.subtitle")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-foreground">
                {t("featured.title")}
              </h2>
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

        {/* Bento layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {/* HERO product — spans 2 cols & 2 rows on desktop */}
          <ScrollReveal direction="left" className="col-span-2 row-span-2">
            <Link
              to={`/product/${hero.slug}`}
              className="group relative block h-full rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-gold touch-manipulation"
            >
              <div className="relative h-full min-h-[300px] sm:min-h-[400px] md:min-h-[520px]">
                <img
                  src={heroImages[hero.image]}
                  alt={hero.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {hero.badge && (
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 rtl:left-auto rtl:right-3 sm:rtl:right-4 gradient-gold px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary-foreground rounded">
                    {hero.badge}
                  </span>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <p className="text-[9px] sm:text-[10px] font-condensed font-semibold uppercase tracking-wider text-primary mb-1 sm:mb-2">
                    {hero.category}
                  </p>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground group-hover:text-primary transition-colors leading-[0.95]">
                    {hero.name.toUpperCase()}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 max-w-md font-condensed line-clamp-2">
                    {hero.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                    <span className="text-xl sm:text-2xl md:text-3xl font-heading text-primary">
                      {hero.price.toFixed(2)} TND
                    </span>
                    {hero.originalPrice && (
                      <span className="text-xs sm:text-base text-muted-foreground line-through">
                        {hero.originalPrice.toFixed(2)} TND
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-2 mt-4 gradient-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground rounded translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {t("shop.viewProduct")}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rtl:rotate-180" aria-hidden="true">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {secondary.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100} direction="up">
              <ProductCard product={p} />
            </ScrollReveal>
          ))}

          {rest.map((p, i) => (
            <ScrollReveal key={p.id} delay={(i + 2) * 80} direction="up">
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-5 sm:mt-6 text-center md:hidden">
          <Link to="/shop" className="text-sm font-bold text-primary uppercase tracking-wider hover:underline touch-manipulation">
            {t("featured.viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
