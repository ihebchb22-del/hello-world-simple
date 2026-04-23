import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useI18n } from "@/i18n";
import SEOHead from "@/components/SEOHead";
import { categoryTranslationKeys, badgeTranslationKeys } from "@/data/translations-map";

import whey from "@/assets/product-whey.jpg";
import preworkout from "@/assets/product-preworkout.jpg";
import creatine from "@/assets/product-creatine.jpg";
import bcaa from "@/assets/product-bcaa.jpg";
import testo from "@/assets/product-testo.jpg";
import fatburner from "@/assets/product-fatburner.jpg";
import multivitamin from "@/assets/product-multivitamin.jpg";
import omega from "@/assets/product-omega.jpg";

const images: Record<string, string> = {
  "product-whey": whey,
  "product-preworkout": preworkout,
  "product-creatine": creatine,
  "product-bcaa": bcaa,
  "product-testo": testo,
  "product-fatburner": fatburner,
  "product-multivitamin": multivitamin,
  "product-omega": omega,
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { t, dir } = useI18n();
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavor?.[0] || "");

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center" dir={dir}>
          <div className="text-center">
            <h1 className="text-4xl font-heading text-foreground">{t("product.notFound")}</h1>
            <Link to="/shop" className="text-primary hover:underline mt-4 inline-block font-condensed font-semibold">
              {t("product.backToShop")}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <SEOHead
        title={`${product.name} | Muscle Factory®`}
        description={`Buy ${product.name} — ${product.category}. ${product.price.toFixed(2)} TND. Science-backed formula. Fast shipping.`}
        canonical={`https://musclefactory.com/product/${product.slug}`}
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": `https://musclefactory.com/assets/${product.image}.jpg`,
          "brand": { "@type": "Brand", "name": "Muscle Factory" },
          "sku": product.id,
          "category": product.category,
          "offers": {
            "@type": "Offer",
            "url": `https://musclefactory.com/product/${product.slug}`,
            "priceCurrency": "TND",
            "price": product.price.toFixed(2),
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "Muscle Factory" },
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.toString(),
            "reviewCount": product.reviewCount.toString(),
            "bestRating": "5",
          },
        }}
      />
      <Header />
      <main className="min-h-screen" dir={dir}>
        {/* Breadcrumb */}
        <nav className="container py-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-muted-foreground font-condensed">
            <li><Link to="/" className="hover:text-primary transition-colors">{t("product.home")}</Link></li>
            <li className="text-border">/</li>
            <li><Link to="/shop" className="hover:text-primary transition-colors">{t("nav.shop")}</Link></li>
            <li className="text-border">/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        {/* Product detail */}
        <section className="container pb-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="group relative aspect-square bg-card rounded-2xl overflow-hidden border border-border">
              <img
                src={images[product.image]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground rounded-md">
                  {badgeTranslationKeys[product.badge] ? t(badgeTranslationKeys[product.badge]) : product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-condensed font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                {categoryTranslationKeys[product.category] ? t(categoryTranslationKeys[product.category]) : product.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground leading-tight">{product.name.toUpperCase()}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="18" height="18" viewBox="0 0 24 24" className={star <= Math.round(product.rating) ? "text-primary fill-primary" : "text-muted fill-muted"}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-condensed">
                  {product.rating} ({product.reviewCount.toLocaleString()} {t("product.reviews")})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-4xl font-heading text-primary">{product.price.toFixed(2)} TND</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-condensed">{product.originalPrice.toFixed(2)} TND</span>
                    <span className="gradient-gold px-2.5 py-1 text-[10px] font-bold text-primary-foreground rounded-md uppercase tracking-wider">
                      {t("product.save")} {discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mt-5 leading-relaxed">{product.description}</p>

              {/* Flavor selector */}
              {product.flavor && product.flavor.length > 0 && (
                <div className="mt-6">
                  <label className="text-sm font-condensed font-semibold uppercase tracking-wider text-foreground">
                    {t("product.flavor")}
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.flavor.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFlavor(f)}
                        className={`px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 ${
                          selectedFlavor === f
                            ? "border-primary text-primary bg-primary/10 shadow-sm"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to cart */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-foreground hover:text-primary hover:bg-muted transition-colors">−</button>
                  <span className="px-5 py-3 text-sm font-semibold text-foreground border-x border-border min-w-[3rem] text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-foreground hover:text-primary hover:bg-muted transition-colors">+</button>
                </div>
                <button className="flex-1 gradient-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground rounded-lg transition-all hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]">
                  {t("product.addToCart")} — {(product.price * qty).toFixed(2)} TND
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-heading text-xl text-foreground mb-4">{t("product.features").toUpperCase()}</h3>
                <ul className="space-y-2.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full gradient-gold flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" className="text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border">
                {[
                  t("product.freeShipping"),
                  t("product.returns"),
                  t("product.labTested"),
                  t("product.secureCheckout"),
                ].map((label) => (
                  <span key={label} className="flex items-center gap-2 text-[11px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" className="text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="bg-card py-16 border-t border-border">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-8">{t("product.related")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
