import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";

const NAMES = ["Ahmed", "Yassine", "Sami", "Mehdi", "Karim", "Anis", "Walid", "Omar", "Bilel", "Nour", "Skander", "Aymen", "Hedi", "Slim", "Ramy"];
const CITIES = ["Tunis", "Sfax", "Sousse", "Bizerte", "Nabeul", "Gabes", "Ariana", "Monastir", "Hammamet", "La Marsa", "Kairouan", "Mahdia"];
const PRODUCTS_KEYS = [
  "ticker.whey",
  "ticker.creatine",
  "ticker.preworkout",
  "ticker.massgainer",
  "ticker.bcaa",
  "ticker.fatburner",
  "ticker.omega",
  "ticker.zma",
];

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const LiveOrderTicker = () => {
  const { t, dir } = useI18n();
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({ name: "", city: "", productKey: "", mins: 1 });

  useEffect(() => {
    let mounted = true;
    const next = () => {
      if (!mounted) return;
      setOrder({
        name: rand(NAMES),
        city: rand(CITIES),
        productKey: rand(PRODUCTS_KEYS),
        mins: Math.floor(Math.random() * 14) + 1,
      });
      setShow(true);
      setTimeout(() => mounted && setShow(false), 5500);
    };
    const first = setTimeout(next, 3500);
    const interval = setInterval(next, 9500);
    return () => {
      mounted = false;
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      dir={dir}
      aria-live="polite"
      className={`fixed bottom-20 md:bottom-4 left-4 rtl:left-auto rtl:right-4 z-40 max-w-[90vw] sm:max-w-sm transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-card/95 backdrop-blur-xl border border-border rounded-2xl pl-2 pr-4 py-2 shadow-card">
        <div className="relative shrink-0 w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
          <span className="text-base">🛒</span>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-card animate-pulse" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-condensed text-foreground truncate">
            <span className="font-bold">{order.name}</span> {t("ticker.from")} {order.city}{" "}
            <span className="text-muted-foreground">{t("ticker.bought")}</span>{" "}
            <span className="font-semibold text-primary">{t(order.productKey)}</span>
          </p>
          <p className="text-[10px] text-muted-foreground font-condensed mt-0.5">
            {order.mins} {t("ticker.minsAgo")} · ✓ {t("ticker.verified")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveOrderTicker;
