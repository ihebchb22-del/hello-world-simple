import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useI18n } from "@/i18n";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const { t, dir, language } = useI18n();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <SEOHead
        title={`${t("wishlist.title")} | Muscle Factory®`}
        description={
          language === "fr" ? "Vos produits sauvegardés. Gérez vos suppléments et équipements favoris."
          : language === "ar" ? "منتجاتك المحفوظة. عرض وإدارة مكملاتك ومعداتك المفضلة."
          : "Your saved products. View and manage your favorite supplements and gear."
        }
        canonical="https://musclefactory.com/wishlist"
        noIndex={true}
      />
      <Header />
      <main className="min-h-screen" dir={dir}>
        <section className="relative bg-card border-b border-border py-8 md:py-12 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/2 w-80 h-80 bg-primary rounded-full blur-[120px]" />
          </div>
          <div className="container relative">
            <span className="text-xs font-condensed font-semibold uppercase tracking-[0.3em] text-primary mb-2 block">
              {t("wishlist.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground">
              {t("wishlist.title")}
            </h1>
            <p className="text-muted-foreground mt-2 font-condensed text-base">
              {wishlistProducts.length} {t("wishlist.items")}
            </p>
          </div>
        </section>

        <div className="container py-8 md:py-12">
          {wishlistProducts.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-heading text-foreground mb-2">{t("wishlist.empty")}</h2>
                <p className="text-muted-foreground font-condensed mb-6">{t("wishlist.emptyDesc")}</p>
                <Link
                  to="/shop"
                  className="inline-flex gradient-gold px-6 py-3 text-sm font-condensed font-semibold uppercase tracking-wider text-primary-foreground rounded-lg hover:shadow-gold transition-all"
                >
                  {t("wishlist.browseShop")}
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {wishlistProducts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 60} direction="up">
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WishlistPage;
