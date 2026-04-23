import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";
import { useWishlist } from "@/contexts/WishlistContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { t, dir } = useI18n();
  const { count: wishlistCount } = useWishlist();

  const navLinks = [
    { label: t("nav.shop"), href: "/shop" },
    { label: t("nav.workouts"), href: "/workouts" },
    { label: t("bottomNav.myPrograms"), href: "/my-programs" },
    { label: t("nav.buildPack"), href: "/build-pack" },
    { label: t("nav.tips"), href: "/tips" },
    { label: t("nav.tools"), href: "/tools" },
    { label: t("nav.deals"), href: "/shop?deals=true" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pt-[env(safe-area-inset-top)]" dir={dir}>
      {/* Top bar */}
      <div className="gradient-gold py-1.5 text-center">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-primary-foreground uppercase px-4">
          {t("header.promo")}
        </p>
      </div>

      <div className="container flex items-center justify-between h-14 sm:h-16 md:h-20">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -ml-2 text-foreground touch-manipulation"
          aria-label={t("aria.toggleMenu")}
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Muscle Factory - Accueil">
          <img src="/images/logo.png" alt="Muscle Factory" className="h-7 sm:h-8 md:h-10 invert" width={120} height={40} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label={t("aria.mainNav")}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-condensed text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
                location.pathname === link.href || (link.href === "/shop?deals=true" && location.search.includes("deals=true"))
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors touch-manipulation"
            aria-label={t("aria.search")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <Link
            to="/wishlist"
            className={`relative p-2 transition-colors touch-manipulation ${location.pathname === "/wishlist" ? "text-primary" : "text-foreground hover:text-primary"}`}
            aria-label={`${t("wishlist.title")} (${wishlistCount})`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/shop" className="relative p-2 text-foreground hover:text-primary transition-colors touch-manipulation" aria-label={t("aria.cart")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-border bg-background px-4 py-3 sm:py-4">
          <div className="container">
            <input
              type="search"
              placeholder={t("search.placeholder")}
              className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              autoFocus
              dir={dir}
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-in slide-in-from-top-2 duration-200" aria-label={t("aria.mobileNav")}>
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-3.5 font-condensed text-sm font-semibold uppercase tracking-wider transition-colors touch-manipulation ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
