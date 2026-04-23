import { useState, useCallback } from "react";
import { useI18n } from "@/i18n";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const { t } = useI18n();

  useState(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          setTimeout(() => {
            setPhase("done");
            setTimeout(onComplete, 600);
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
  });

  if (phase === "done") return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-700 ${phase === "reveal" ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative mb-8">
        <div className={`absolute inset-0 rounded-full bg-primary/20 blur-3xl transition-transform duration-1000 ${progress > 50 ? "scale-150" : "scale-100"}`} />
        <img src="/images/logo.png" alt="Muscle Factory" className="relative h-16 md:h-20 invert animate-pulse" />
      </div>
      <div className="w-48 md:w-64 h-[2px] bg-border rounded-full overflow-hidden mb-4">
        <div className="h-full gradient-gold rounded-full transition-all duration-300 ease-out" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <p className="font-condensed text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {progress < 30 ? t("loading.assets") : progress < 70 ? t("loading.preparing") : progress < 100 ? t("loading.almost") : t("loading.welcome")}
      </p>
      <p className="font-heading text-4xl text-primary mt-2">{Math.min(Math.round(progress), 100)}%</p>
    </div>
  );
};

export default LoadingScreen;
