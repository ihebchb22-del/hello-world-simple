import { useRef, useEffect, useState } from "react";

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.parentElement?.getBoundingClientRect();
          if (rect) {
            const scrolled = -rect.top * speed;
            setOffset(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, style: { transform: `translateY(${offset}px)`, willChange: "transform" as const } };
}
