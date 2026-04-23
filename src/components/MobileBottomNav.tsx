import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Dumbbell, Trophy, Heart } from "lucide-react";
import { useI18n } from "@/i18n";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProgress } from "@/contexts/ProgressContext";

const MobileBottomNav = () => {
  const location = useLocation();
  const { t, dir } = useI18n();
  const { count: wishlistCount } = useWishlist();
  const { count: programsCount } = useProgress();

  const items = [
    { href: "/", icon: Home, label: t("bottomNav.home") },
    { href: "/shop", icon: ShoppingBag, label: t("bottomNav.shop") },
    { href: "/workouts", icon: Dumbbell, label: t("bottomNav.train") },
    { href: "/my-programs", icon: Trophy, label: t("bottomNav.myPrograms"), badge: programsCount },
    { href: "/wishlist", icon: Heart, label: t("bottomNav.saved"), badge: wishlistCount },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 pb-[env(safe-area-inset-bottom)]"
      dir={dir}
      aria-label={t("aria.bottomNav")}
    >
      <ul className="flex items-stretch justify-around px-1">
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                to={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-2 px-1 transition-colors touch-manipulation ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all ${
                    active ? "bg-primary/15" : ""
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className={`text-[10px] font-condensed font-semibold uppercase tracking-wider leading-none ${active ? "text-primary" : ""}`}>
                  {item.label}
                </span>
                {active && <span className="absolute top-0 h-0.5 w-8 rounded-full gradient-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
