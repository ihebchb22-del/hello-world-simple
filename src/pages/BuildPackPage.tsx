import { useState, useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { products } from "@/data/products";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { categoryTranslationKeys, badgeTranslationKeys } from "@/data/translations-map";

import heroBuildpack from "@/assets/hero-buildpack-v2.jpg";
import goalMuscle from "@/assets/pack-goal-muscle.jpg";
import goalCut from "@/assets/pack-goal-cut.jpg";
import goalHealth from "@/assets/pack-goal-health.jpg";
import goalPerform from "@/assets/pack-goal-perform.jpg";

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

const imgMap: Record<string, string> = {
  "product-whey": whey, "product-preworkout": preworkout, "product-creatine": creatine,
  "product-bcaa": bcaa, "product-testo": testo, "product-fatburner": fatburner,
  "product-multivitamin": multivitamin, "product-omega": omega, "product-massgainer": massgainer,
  "product-glutamine": glutamine, "product-zma": zma, "product-casein": casein,
};

interface PackItem { productId: string; quantity: number; }

type Step = 1 | 2 | 3;

const presetPacks: Record<string, string[]> = {
  muscle: ["1", "3", "9", "4"],   // whey, creatine, mass gainer, bcaa
  cut: ["6", "4", "7", "1"],      // fat burner, bcaa, multivitamin, whey
  health: ["7", "8", "11", "10"], // multivitamin, omega, zma, glutamine
  perform: ["2", "3", "5", "4"],  // preworkout, creatine, testo, bcaa
};

const BuildPackPage = () => {
  const { t, dir, language } = useI18n();
  const parallax = useParallax(0.3);
  const [pack, setPack] = useState<PackItem[]>([]);
  const [step, setStep] = useState<Step>(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [animatingStep, setAnimatingStep] = useState(false);

  const goals = [
    { key: "muscle", labelKey: "pack.goalMuscle", descKey: "pack.goalMuscleDesc", img: goalMuscle, icon: "💪", gradient: "from-blue-500/20 to-indigo-600/20", border: "border-blue-500/40" },
    { key: "cut", labelKey: "pack.goalCut", descKey: "pack.goalCutDesc", img: goalCut, icon: "🔥", gradient: "from-red-500/20 to-orange-600/20", border: "border-red-500/40" },
    { key: "health", labelKey: "pack.goalHealth", descKey: "pack.goalHealthDesc", img: goalHealth, icon: "🛡️", gradient: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-500/40" },
    { key: "perform", labelKey: "pack.goalPerform", descKey: "pack.goalPerformDesc", img: goalPerform, icon: "⚡", gradient: "from-amber-500/20 to-yellow-600/20", border: "border-amber-500/40" },
  ];

  const goalCategories: Record<string, string[]> = {
    muscle: ["Proteins", "Performance"],
    cut: ["Weight Management", "Recovery"],
    health: ["Health & Wellness"],
    perform: ["Pre-Workout", "Performance", "Hormonal Support"],
  };

  const filteredProducts = selectedGoal
    ? products.filter((p) => goalCategories[selectedGoal]?.includes(p.category))
    : products;

  const addToPack = (productId: string) => {
    setPack((prev) => {
      const existing = prev.find((p) => p.productId === productId);
      if (existing) return prev.map((p) => p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p);
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromPack = (productId: string) => setPack((prev) => prev.filter((p) => p.productId !== productId));

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromPack(productId);
    setPack((prev) => prev.map((p) => (p.productId === productId ? { ...p, quantity: qty } : p)));
  };

  const loadPreset = (goalKey: string) => {
    const ids = presetPacks[goalKey] || [];
    setPack(ids.map((id) => ({ productId: id, quantity: 1 })));
  };

  const totalItems = pack.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = useMemo(() => pack.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0), [pack]);

  const discount = pack.length >= 4 ? 0.15 : pack.length >= 3 ? 0.1 : pack.length >= 2 ? 0.05 : 0;
  const finalPrice = totalPrice * (1 - discount);
  const savings = totalPrice - finalPrice;
  const progressPct = Math.min((pack.length / 4) * 100, 100);

  const goToStep = (s: Step) => {
    setAnimatingStep(true);
    setTimeout(() => { setStep(s); setAnimatingStep(false); }, 200);
  };

  const handleGoalSelect = (goalKey: string) => {
    setSelectedGoal(goalKey);
  };

  const steps = [
    { num: 1, key: "pack.step1" },
    { num: 2, key: "pack.step2" },
    { num: 3, key: "pack.step3" },
  ];

  const seoDescription = {
    en: "Build your personalized supplement stack. Choose your fitness goal, select products, unlock up to 15% bundle discounts. Whey, creatine, pre-workout and more.",
    fr: "Composez votre stack de suppléments personnalisé. Choisissez votre objectif, sélectionnez vos produits et débloquez jusqu'à -15% de remise pack.",
    ar: "كوّن حزمة مكملاتك المخصصة. اختر هدفك الرياضي، حدد المنتجات واحصل على خصم يصل إلى 15%.",
  };

  return (
    <>
      <SEOHead
        title={`${t("pack.title")} | Muscle Factory®`}
        description={seoDescription[language] || seoDescription.en}
        canonical="https://musclefactory.com/build-pack"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t("pack.title") + " – Muscle Factory",
          description: seoDescription[language] || seoDescription.en,
          url: "https://musclefactory.com/build-pack",
          isPartOf: { "@type": "WebSite", name: "Muscle Factory", url: "https://musclefactory.com" },
        }}
      />
      <Header />
      <main className="min-h-screen bg-background" dir={dir}>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img ref={parallax.ref} style={parallax.style} src={heroBuildpack} alt={t("pack.title")} className="absolute inset-0 w-full h-full object-cover scale-[1.2]" width={1920} height={800} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />

          <div className="container relative py-12 md:py-20">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-condensed font-semibold uppercase tracking-[0.3em] text-primary">
                    {t("pack.subtitle")}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground leading-[0.9]">
                  {t("pack.title")}
                </h1>
                <p className="text-muted-foreground mt-4 font-condensed text-lg max-w-xl mx-auto leading-relaxed">
                  {t("pack.description")}
                </p>
              </div>
            </ScrollReveal>

            {/* Step indicator */}
            <div className="mt-8 flex items-center justify-center gap-0">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <button
                    onClick={() => {
                      if (s.num === 2 && !selectedGoal && step === 1) return;
                      if (s.num === 3 && pack.length === 0) return;
                      goToStep(s.num as Step);
                    }}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-500 ${
                      step === s.num
                        ? "bg-primary/15 border border-primary/40 shadow-gold scale-105"
                        : step > s.num
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-card/50 border border-border/50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      step === s.num
                        ? "gradient-gold text-primary-foreground"
                        : step > s.num
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {step > s.num ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                      ) : s.num}
                    </div>
                    <span className={`text-xs font-condensed font-semibold uppercase tracking-wider hidden sm:block ${
                      step === s.num ? "text-primary" : "text-muted-foreground"
                    }`}>{t(s.key)}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-px mx-1 transition-all duration-500 ${
                      step > s.num ? "bg-primary/40" : "bg-border/40"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        <div className={`container py-8 md:py-12 transition-opacity duration-200 ${animatingStep ? "opacity-0" : "opacity-100"}`}>

          {/* ============ STEP 1: CHOOSE GOAL ============ */}
          {step === 1 && (
            <div>
              <ScrollReveal>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-heading text-foreground">{t("pack.chooseGoal")}</h2>
                  <p className="text-muted-foreground font-condensed mt-2">{t("pack.chooseGoalDesc")}</p>
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                {goals.map((goal, i) => (
                  <ScrollReveal key={goal.key} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                    <button
                      onClick={() => handleGoalSelect(goal.key)}
                      className={`group relative w-full overflow-hidden rounded-2xl border transition-all duration-500 text-left min-h-[220px] md:min-h-[280px] ${
                        selectedGoal === goal.key
                          ? `${goal.border} ring-2 ring-primary/30 shadow-gold scale-[1.01]`
                          : "border-border hover:border-primary/30 hover:shadow-card hover:-translate-y-1"
                      }`}
                    >
                      <img src={goal.img} alt={t(goal.labelKey)} loading="lazy" width={640} height={640}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${goal.gradient} from-background/95 via-background/70 to-background/20`} />

                      {selectedGoal === goal.key && (
                        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-8 h-8 rounded-full gradient-gold flex items-center justify-center shadow-gold animate-scale-in">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-foreground"><path d="M20 6L9 17l-5-5" /></svg>
                        </div>
                      )}

                      <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                        <span className="text-3xl mb-2">{goal.icon}</span>
                        <h3 className="text-xl md:text-2xl font-heading text-foreground mb-1">{t(goal.labelKey)}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground font-condensed max-w-xs leading-relaxed">{t(goal.descKey)}</p>
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>

              {selectedGoal && (
                <ScrollReveal>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <button
                      onClick={() => { loadPreset(selectedGoal); goToStep(2); }}
                      className="px-8 py-4 text-xs font-condensed font-semibold uppercase tracking-wider rounded-2xl gradient-gold text-primary-foreground hover:shadow-gold transition-all hover:scale-[1.02]"
                    >
                      {t("pack.usePreset")} ✨
                    </button>
                    <button
                      onClick={() => goToStep(2)}
                      className="px-8 py-4 text-xs font-condensed font-semibold uppercase tracking-wider rounded-2xl bg-secondary text-secondary-foreground hover:bg-muted transition-all hover:scale-[1.02] border border-border"
                    >
                      {t("pack.customSelect")} →
                    </button>
                  </div>
                </ScrollReveal>
              )}
            </div>
          )}

          {/* ============ STEP 2: SELECT PRODUCTS ============ */}
          {step === 2 && (
            <div className="grid lg:grid-cols-[1fr_340px] gap-6">
              <div>
                <ScrollReveal>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <button onClick={() => goToStep(1)} className="text-xs font-condensed text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:rotate-180"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
                      {t("pack.step1")}
                    </button>
                    <div className="h-4 w-px bg-border" />
                    <h2 className="text-2xl font-heading text-foreground">{t("pack.selectProducts")}</h2>
                    {selectedGoal && (
                      <span className="text-xs font-condensed px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                        {t(`pack.goal${selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)}`)}
                      </span>
                    )}
                  </div>
                </ScrollReveal>

                {/* Goal quick-filter pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setSelectedGoal(null)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-condensed font-semibold uppercase tracking-wider border transition-all ${
                      !selectedGoal ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/30"
                    }`}
                  >
                    {t("shop.all")}
                  </button>
                  {goals.map((g) => (
                    <button key={g.key} onClick={() => setSelectedGoal(g.key)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-condensed font-semibold uppercase tracking-wider border transition-all ${
                        selectedGoal === g.key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/30"
                      }`}
                    >
                      {g.icon} {t(g.labelKey)}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {filteredProducts.map((product, i) => {
                    const inPack = pack.find((p) => p.productId === product.id);
                    return (
                      <ScrollReveal key={product.id} delay={i * 40} direction="up">
                        <div
                          className={`group relative bg-card rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                            inPack
                              ? "border-primary ring-2 ring-primary/20 shadow-gold"
                              : "border-border hover:border-primary/30 hover:shadow-card"
                          }`}
                        >
                          <div className="aspect-square overflow-hidden relative bg-secondary">
                            <img
                              src={imgMap[product.image]}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {inPack && (
                              <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 gradient-gold text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-gold animate-scale-in">
                                {inPack.quantity}
                              </div>
                            )}
                            {product.badge && (
                              <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 text-[9px] font-bold uppercase tracking-wider gradient-gold text-primary-foreground px-3 py-1 rounded-full shadow-gold">
                                {badgeTranslationKeys[product.badge] ? t(badgeTranslationKeys[product.badge]) : product.badge}
                              </span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="p-3 md:p-4">
                            <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-primary mb-1">
                              {categoryTranslationKeys[product.category] ? t(categoryTranslationKeys[product.category]) : product.category}
                            </p>
                            <h3 className="font-condensed font-semibold text-foreground text-xs sm:text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline gap-1">
                                <span className="font-heading text-lg text-foreground">{product.price.toFixed(2)}</span>
                                <span className="text-[10px] text-muted-foreground font-condensed">TND</span>
                              </div>
                              <button
                                onClick={() => addToPack(product.id)}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${
                                  inPack
                                    ? "gradient-gold text-primary-foreground shadow-gold"
                                    : "bg-secondary text-foreground hover:gradient-gold hover:text-primary-foreground hover:scale-110"
                                }`}
                                aria-label={`Add ${product.name} to pack`}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M12 5v14m-7-7h14" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar: live pack summary */}
              <div className="lg:sticky lg:top-4 self-start">
                <ScrollReveal direction="right">
                  <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-5 md:p-6">
                    <h3 className="text-lg font-heading text-foreground mb-4 flex items-center gap-2">
                      🛒 {t("pack.yourPack")}
                      {pack.length > 0 && (
                        <span className="text-xs font-condensed bg-primary/10 text-primary px-2 py-0.5 rounded-full">{totalItems}</span>
                      )}
                    </h3>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-condensed text-muted-foreground mb-1">
                        <span>{pack.length}/4 {t("pack.items")}</span>
                        {discount > 0 && <span className="text-primary font-bold animate-pulse">-{Math.round(discount * 100)}%</span>}
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full gradient-gold transition-all duration-700 ease-out" style={{ width: `${progressPct}%` }} />
                      </div>
                      <div className="flex justify-between mt-1">
                        {[5, 10, 15].map((pct, i) => (
                          <span key={pct} className={`text-[9px] font-condensed font-bold ${pack.length >= i + 2 ? "text-primary" : "text-muted-foreground/40"}`}>
                            {i + 2}+ = -{pct}%
                          </span>
                        ))}
                      </div>
                    </div>

                    {pack.length === 0 ? (
                      <div className="text-center py-8">
                        <span className="text-4xl block mb-3">📦</span>
                        <p className="text-xs text-muted-foreground font-condensed">{t("pack.emptyPack")}</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {pack.map((item) => {
                          const product = products.find((p) => p.id === item.productId)!;
                          return (
                            <div key={item.productId} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-2.5 group/item hover:bg-secondary transition-colors">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary shrink-0">
                                <img src={imgMap[product.image]} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-condensed font-semibold text-foreground text-xs truncate">{product.name}</p>
                                <p className="text-[10px] text-muted-foreground">{product.price.toFixed(2)} TND</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="w-6 h-6 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-primary/10 text-xs transition-all">−</button>
                                <span className="text-xs font-semibold text-foreground w-5 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="w-6 h-6 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-primary/10 text-xs transition-all">+</button>
                              </div>
                              <button onClick={() => removeFromPack(item.productId)}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg opacity-0 group-hover/item:opacity-100">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Total */}
                    {pack.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        {savings > 0 && (
                          <div className="flex justify-between text-xs font-condensed mb-2">
                            <span className="text-muted-foreground">{t("pack.totalSavings")}</span>
                            <span className="text-primary font-bold">-{savings.toFixed(2)} TND</span>
                          </div>
                        )}
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-condensed font-semibold text-muted-foreground uppercase">{t("pack.total")}</span>
                          <div className="flex items-baseline gap-1.5">
                            {discount > 0 && <span className="text-sm text-muted-foreground line-through">{totalPrice.toFixed(2)}</span>}
                            <span className="text-3xl font-heading text-foreground">{finalPrice.toFixed(2)}</span>
                            <span className="text-sm text-primary font-condensed">TND</span>
                          </div>
                        </div>
                        <button
                          onClick={() => goToStep(3)}
                          className="w-full mt-4 px-6 py-3.5 text-xs font-condensed font-semibold uppercase tracking-wider rounded-2xl gradient-gold text-primary-foreground hover:shadow-gold transition-all hover:scale-[1.01]"
                        >
                          {t("pack.reviewPack")} →
                        </button>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          )}

          {/* ============ STEP 3: REVIEW & CHECKOUT ============ */}
          {step === 3 && (
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <button onClick={() => goToStep(2)} className="text-xs font-condensed text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-6">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:rotate-180"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
                  {t("pack.addMore")}
                </button>

                <div className="text-center mb-8">
                  <span className="text-5xl block mb-3">🎉</span>
                  <h2 className="text-3xl md:text-4xl font-heading text-foreground">{t("pack.reviewTitle")}</h2>
                  <p className="text-muted-foreground font-condensed mt-2">{t("pack.reviewDesc")}</p>
                </div>

                {/* Pack items */}
                <div className="space-y-3 mb-8">
                  {pack.map((item, i) => {
                    const product = products.find((p) => p.id === item.productId)!;
                    return (
                      <ScrollReveal key={item.productId} delay={i * 80}>
                        <div className="flex items-center gap-4 bg-card/80 backdrop-blur rounded-2xl border border-border p-4 hover:border-primary/30 hover:shadow-card transition-all duration-300">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
                            <img src={imgMap[product.image]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-primary mb-0.5">
                              {categoryTranslationKeys[product.category] ? t(categoryTranslationKeys[product.category]) : product.category}
                            </p>
                            <h4 className="font-condensed font-semibold text-foreground text-sm md:text-base">{product.name}</h4>
                            <p className="text-xs text-muted-foreground font-condensed mt-0.5">
                              {product.price.toFixed(2)} TND × {item.quantity} = <span className="text-foreground font-semibold">{(product.price * item.quantity).toFixed(2)} TND</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary/10 text-sm transition-all">−</button>
                            <span className="text-sm font-semibold text-foreground w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary/10 text-sm transition-all">+</button>
                          </div>
                          <button onClick={() => removeFromPack(item.productId)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-destructive/10">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                          </button>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>

                {/* Summary card */}
                <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-primary/20 p-6 md:p-8">
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: t("pack.items"), value: totalItems.toString(), icon: "📦" },
                      { label: t("pack.discount"), value: discount > 0 ? `-${Math.round(discount * 100)}%` : "0%", icon: "🏷️" },
                      { label: t("pack.totalSavings"), value: `${savings.toFixed(2)} TND`, icon: "💰" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center bg-secondary/50 rounded-xl p-4">
                        <span className="text-2xl block mb-1">{stat.icon}</span>
                        <p className="text-xl font-heading text-foreground">{stat.value}</p>
                        <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-condensed font-semibold text-muted-foreground uppercase tracking-wider">{t("pack.total")}</span>
                    <div className="flex items-baseline gap-2">
                      {discount > 0 && <span className="text-lg text-muted-foreground line-through">{totalPrice.toFixed(2)}</span>}
                      <span className="text-4xl font-heading text-foreground">{finalPrice.toFixed(2)}</span>
                      <span className="text-lg text-primary font-condensed">TND</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => goToStep(2)}
                      className="flex-1 px-5 py-3.5 text-xs font-condensed font-semibold uppercase tracking-wider rounded-2xl bg-secondary text-secondary-foreground hover:bg-muted transition-all border border-border">
                      {t("pack.addMore")}
                    </button>
                    <button className="flex-1 px-6 py-3.5 text-xs font-condensed font-semibold uppercase tracking-wider rounded-2xl gradient-gold text-primary-foreground hover:shadow-gold transition-all hover:scale-[1.01]">
                      {t("pack.checkout")} →
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BuildPackPage;
