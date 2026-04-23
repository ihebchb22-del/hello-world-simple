import { useState, useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categoryTranslationKeys } from "@/data/translations-map";
import { useI18n } from "@/i18n";
import SEOHead from "@/components/SEOHead";
import heroShop from "@/assets/hero-shop.jpg";

const allCategories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const ShopPage = () => {
  const { t, dir, language } = useI18n();
  const [searchParams] = useSearchParams();
  const isDeals = searchParams.get("deals") === "true";
  const parallax = useParallax(0.3);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");

  const sortOptions = [
    { value: "Featured", label: t("shop.featured") },
    { value: "Price: Low to High", label: t("shop.priceLow") },
    { value: "Price: High to Low", label: t("shop.priceHigh") },
    { value: "Rating", label: t("shop.rating") },
  ];

  const filtered = useMemo(() => {
    let result = products;

    if (isDeals) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "Price: Low to High": return [...result].sort((a, b) => a.price - b.price);
      case "Price: High to Low": return [...result].sort((a, b) => b.price - a.price);
      case "Rating": return [...result].sort((a, b) => b.rating - a.rating);
      default: return result;
    }
  }, [selectedCategory, sortBy, isDeals]);

  return (
    <>
      <SEOHead
        title={isDeals
          ? (language === "fr" ? "Offres & Promotions" : language === "ar" ? "عروض وتخفيضات" : "Deals & Promotions") + " | Muscle Factory®"
          : (language === "fr" ? "Boutique Suppléments & Équipement" : language === "ar" ? "متجر المكملات والمعدات" : "Shop Supplements & Equipment") + " | Muscle Factory®"
        }
        description={
          language === "fr" ? "Parcourez nos protéines whey, créatine, pré-entraînement, BCAA, brûleurs de graisses et plus. Prix en TND. Livraison gratuite dès 50 TND."
          : language === "ar" ? "تصفح بروتين الواي، كرياتين، ما قبل التمرين، BCAA، حارقات الدهون والمزيد. أسعار بالدينار التونسي. شحن مجاني فوق 50 TND."
          : "Browse whey protein, creatine, pre-workout, BCAA, fat burners and more. Prices in TND. Free shipping on orders over 50 TND."
        }
        canonical="https://musclefactory.com/shop"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Shop – Muscle Factory",
          "description": "Browse our complete collection of premium fitness supplements and equipment.",
          "url": "https://musclefactory.com/shop",
          "isPartOf": { "@type": "WebSite", "name": "Muscle Factory", "url": "https://musclefactory.com" },
        }}
      />
      <Header />
      <main className="min-h-screen" dir={dir}>
        <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
          <img ref={parallax.ref} style={parallax.style} src={heroShop} alt={t("shop.title")} className="absolute inset-0 w-full h-full object-cover scale-[1.2]" width={1920} height={640} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="container relative px-5">
            <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 sm:mb-3 block">
              {isDeals ? t("nav.deals") : t("categories.subtitle")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading text-foreground">
              {isDeals ? t("nav.deals") : t("shop.title")}
            </h1>
            <p className="text-muted-foreground mt-2 sm:mt-3 font-condensed text-base sm:text-lg max-w-2xl">
              {t("shop.subtitle")}
            </p>
          </div>
        </section>

        <div className="container py-6 sm:py-8 px-5">
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 whitespace-nowrap touch-manipulation ${
                    selectedCategory === cat
                      ? "gradient-gold text-primary-foreground shadow-gold"
                      : "bg-secondary text-secondary-foreground hover:bg-muted hover:scale-105"
                  }`}
                >
                  {cat === "All" ? t("shop.all") : (categoryTranslationKeys[cat] ? t(categoryTranslationKeys[cat]) : cat)}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-3 sm:px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all self-start sm:self-end touch-manipulation"
              dir={dir}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 font-condensed">
            {filtered.length} {t("shop.productsFound")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ShopPage;
