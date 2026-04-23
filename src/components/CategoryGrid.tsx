import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";

import catSupplements from "@/assets/category-supplements.jpg";
import catEquipment from "@/assets/category-equipment.jpg";
import catApparel from "@/assets/category-apparel.jpg";
import catAccessories from "@/assets/category-accessories.jpg";

const catImages: Record<string, string> = {
  "category-supplements": catSupplements,
  "category-equipment": catEquipment,
  "category-apparel": catApparel,
  "category-accessories": catAccessories,
};

const CategoryGrid = () => {
  const { t, dir } = useI18n();

  return (
    <section className="container py-8 sm:py-10 md:py-16" dir={dir}>
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 block">{t("categories.subtitle")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground">{t("categories.title")}</h2>
          <p className="text-muted-foreground mt-2 font-condensed text-base sm:text-lg">{t("categories.description")}</p>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.slug} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
            <Link to={`/shop?category=${cat.slug}`} className="group relative aspect-[3/4] rounded-lg overflow-hidden block touch-manipulation">
              <img src={catImages[cat.image]} alt={t(cat.nameKey)} loading="lazy" width={800} height={600} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                <h3 className="font-heading text-lg sm:text-2xl md:text-3xl text-foreground transition-transform duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">{t(cat.nameKey).toUpperCase()}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-condensed">{cat.count}+ {t("categories.products")}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider transition-all group-hover:gap-3">
                  {t("categories.shopNow")}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1 rtl:rotate-180 sm:w-3.5 sm:h-3.5" aria-hidden="true">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
