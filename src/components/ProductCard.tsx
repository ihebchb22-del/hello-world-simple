import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/data/products";
import { categoryTranslationKeys, badgeTranslationKeys } from "@/data/translations-map";

import whey from "@/assets/product-whey.jpg";
import preworkout from "@/assets/product-preworkout.jpg";
import creatine from "@/assets/product-creatine.jpg";
import bcaa from "@/assets/product-bcaa.jpg";
import testo from "@/assets/product-testo.jpg";
import fatburner from "@/assets/product-fatburner.jpg";
import multivitamin from "@/assets/product-multivitamin.jpg";
import omega from "@/assets/product-omega.jpg";
import massgainer from "@/assets/product-massgainer.jpg";
import glutamine from "@/assets/product-glutamine.jpg";
import zma from "@/assets/product-zma.jpg";
import casein from "@/assets/product-casein.jpg";

const images: Record<string, string> = {
  "product-whey": whey,
  "product-preworkout": preworkout,
  "product-creatine": creatine,
  "product-bcaa": bcaa,
  "product-testo": testo,
  "product-fatburner": fatburner,
  "product-multivitamin": multivitamin,
  "product-omega": omega,
  "product-massgainer": massgainer,
  "product-glutamine": glutamine,
  "product-zma": zma,
  "product-casein": casein,
};

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1" role="img" aria-label={`${rating} sur 5 étoiles`}>
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="12" height="12" viewBox="0 0 24 24" className={star <= Math.round(rating) ? "text-primary fill-primary" : "text-muted-foreground"} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
    <span className="text-[10px] sm:text-xs text-muted-foreground">({count.toLocaleString()})</span>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const imgSrc = images[product.image];
  const { t } = useI18n();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-card rounded-lg border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-gold sm:hover:-translate-y-2"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={imgSrc} alt={product.name} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {product.badge && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rtl:left-auto rtl:right-2 sm:rtl:right-3 gradient-gold px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary-foreground rounded">
            {badgeTranslationKeys[product.badge] ? t(badgeTranslationKeys[product.badge]) : product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block" />
        <div className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:flex">
          <span className="bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider rounded translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {t("shop.viewProduct")}
          </span>
        </div>
        <button
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 rtl:right-auto rtl:left-2 sm:rtl:left-3 p-1.5 sm:p-2 rounded-full transition-all duration-300 touch-manipulation ${
            wishlisted
              ? "bg-primary text-primary-foreground scale-110"
              : "bg-background/80 text-foreground hover:text-primary hover:scale-110"
          }`}
          aria-label={wishlisted ? t("wishlist.remove") : t("wishlist.add")}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[9px] sm:text-[10px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">{categoryTranslationKeys[product.category] ? t(categoryTranslationKeys[product.category]) : product.category}</p>
        <h3 className="font-condensed font-semibold text-foreground text-xs sm:text-sm leading-tight mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <span className="text-base sm:text-lg font-bold text-primary">{product.price.toFixed(2)} TND</span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-sm text-muted-foreground line-through">{product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
