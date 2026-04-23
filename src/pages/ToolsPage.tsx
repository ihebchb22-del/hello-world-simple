import { useState } from "react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import heroTools from "@/assets/hero-tools.jpg";

type ActiveTool = "calories" | "macros" | "oneRM" | "bmi" | "mealPlanner" | "stackAdvisor";

const toolsMeta: { id: ActiveTool; icon: string; gradient: string; glow: string }[] = [
  { id: "calories", icon: "🔥", gradient: "from-orange-500 to-red-600", glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]" },
  { id: "macros", icon: "🥩", gradient: "from-blue-500 to-indigo-600", glow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]" },
  { id: "mealPlanner", icon: "🍽️", gradient: "from-pink-500 to-rose-600", glow: "shadow-[0_0_30px_rgba(244,63,94,0.15)]" },
  { id: "oneRM", icon: "🏋️", gradient: "from-amber-500 to-yellow-600", glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]" },
  { id: "stackAdvisor", icon: "🧪", gradient: "from-purple-500 to-fuchsia-600", glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]" },
  { id: "bmi", icon: "📊", gradient: "from-emerald-500 to-teal-600", glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]" },
];

const ToolsPage = () => {
  const { t, dir, language } = useI18n();
  const parallax = useParallax(0.3);
  const [activeTool, setActiveTool] = useState<ActiveTool>("calories");
  const activeToolMeta = toolsMeta.find(tm => tm.id === activeTool)!;

  return (
    <>
      <SEOHead
        title={`${t("tools.title")} | Muscle Factory®`}
        description={
          language === "fr" ? "Calculateurs fitness gratuits : calories, macros, 1RM et IMC. Planifiez votre entraînement avec des données scientifiques."
          : language === "ar" ? "حاسبات لياقة مجانية: سعرات حرارية، ماكرو، أقصى رفع ومؤشر كتلة الجسم. خطط تدريبك بالبيانات."
          : "Free fitness calculators: calorie calculator, macro calculator, one-rep max, and BMI. Plan your training with science-backed data."
        }
        canonical="https://musclefactory.com/tools"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t("tools.title") + " – Muscle Factory",
          url: "https://musclefactory.com/tools",
          isPartOf: { "@type": "WebSite", name: "Muscle Factory", url: "https://musclefactory.com" },
        }}
      />
      <Header />
      <main className="min-h-screen bg-background" dir={dir}>
        {/* Immersive Hero */}
        <section className="relative overflow-hidden">
          <img ref={parallax.ref} style={parallax.style} src={heroTools} alt="Fitness calculators and body composition tools" className="absolute inset-0 w-full h-full object-cover scale-[1.2]" width={1920} height={640} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          
          <div className="container relative py-12 md:py-20">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-condensed font-semibold uppercase tracking-[0.3em] text-primary">
                    {t("tools.subtitle")}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground">{t("tools.title")}</h1>
                <p className="text-muted-foreground mt-4 font-condensed text-lg max-w-xl mx-auto leading-relaxed">{t("tools.description")}</p>
              </div>
            </ScrollReveal>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        <div className="container py-8 md:py-12">
          {/* Tool selector - large interactive cards */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
              {toolsMeta.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`group relative rounded-2xl border p-4 md:p-5 text-left transition-all duration-500 overflow-hidden ${
                    activeTool === tool.id
                      ? `border-primary/50 bg-card ${tool.glow} scale-[1.02]`
                      : "border-border bg-card/50 hover:border-primary/30 hover:scale-[1.01]"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} transition-opacity duration-500 ${
                    activeTool === tool.id ? "opacity-[0.08]" : "opacity-0 group-hover:opacity-[0.04]"
                  }`} />
                  {activeTool === tool.id && (
                    <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${tool.gradient} rounded-full blur-2xl opacity-20`} />
                  )}
                  <div className="relative">
                    <span className="text-2xl md:text-3xl mb-2 block transition-transform duration-300 group-hover:scale-110">{tool.icon}</span>
                    <p className={`text-[11px] md:text-sm font-condensed font-bold uppercase tracking-wider transition-colors leading-tight ${
                      activeTool === tool.id ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}>
                      {t(`tools.${tool.id}`)}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-condensed leading-snug hidden md:block">
                      {t(`tools.${tool.id}Desc`)}
                    </p>
                  </div>
                  {activeTool === tool.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-gold" />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active tool */}
          <div className="max-w-2xl mx-auto">
            {activeTool === "calories" && <CalorieCalculator gradient={activeToolMeta.gradient} />}
            {activeTool === "macros" && <MacroCalculator gradient={activeToolMeta.gradient} />}
            {activeTool === "mealPlanner" && <MealPlanner gradient={activeToolMeta.gradient} />}
            {activeTool === "oneRM" && <OneRMCalculator gradient={activeToolMeta.gradient} />}
            {activeTool === "stackAdvisor" && <StackAdvisor gradient={activeToolMeta.gradient} />}
            {activeTool === "bmi" && <BMICalculator gradient={activeToolMeta.gradient} />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

/* ── Calorie Calculator ── */
const CalorieCalculator = ({ gradient }: { gradient: string }) => {
  const { t, dir } = useI18n();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("178");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState<{ maintain: number; cut: number; bulk: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age), act = parseFloat(activity);
    if (isNaN(w) || isNaN(h) || isNaN(a)) return;
    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const maintain = Math.round(bmr * act);
    setResult({ maintain, cut: maintain - 500, bulk: maintain + 400 });
  };

  return (
    <ScrollReveal>
      <div className="bg-card/80 backdrop-blur rounded-3xl border border-border overflow-hidden shadow-card" dir={dir}>
        <div className={`p-6 md:p-8 border-b border-border relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
          <div className="relative">
            <h2 className="text-2xl font-heading text-foreground">{t("tools.calories")}</h2>
            <p className="text-xs text-muted-foreground font-condensed mt-1">{t("tools.caloriesDesc")}</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            {(["male", "female"] as const).map((g) => (
              <button key={g} onClick={() => setGender(g)}
                className={`py-3.5 rounded-2xl text-xs font-condensed font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  gender === g ? "gradient-gold text-primary-foreground border-primary shadow-gold" : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                }`}>{t(`tools.${g}`)}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <InputField label={t("tools.age")} value={age} onChange={setAge} unit={t("tools.years")} />
            <InputField label={t("tools.weight")} value={weight} onChange={setWeight} unit="kg" />
            <InputField label={t("tools.height")} value={height} onChange={setHeight} unit="cm" />
          </div>
          <div>
            <label className="text-xs font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              {t("tools.activity")}
            </label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}
              className="w-full bg-secondary rounded-2xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border transition-all">
              <option value="1.2">{t("tools.sedentary")}</option>
              <option value="1.375">{t("tools.light")}</option>
              <option value="1.55">{t("tools.moderate")}</option>
              <option value="1.725">{t("tools.heavy")}</option>
              <option value="1.9">{t("tools.extreme")}</option>
            </select>
          </div>
          <button onClick={calculate} className="w-full py-4 rounded-2xl gradient-gold text-primary-foreground text-sm font-condensed font-bold uppercase tracking-wider hover:shadow-gold transition-all hover:scale-[1.01] active:scale-[0.99]">
            {t("tools.calculate")}
          </button>
          {result && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              {([
                { key: "tools.cutting", val: result.cut, icon: "🔻", borderColor: "border-red-500/20" },
                { key: "tools.maintenance", val: result.maintain, icon: "⚖️", borderColor: "border-primary/30" },
                { key: "tools.bulking", val: result.bulk, icon: "📈", borderColor: "border-emerald-500/20" },
              ] as const).map((r) => (
                <div key={r.key} className={`relative bg-card rounded-2xl p-5 text-center border ${r.borderColor} overflow-hidden group hover:scale-[1.02] transition-all duration-300`}>
                  <span className="text-lg mb-1 block">{r.icon}</span>
                  <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t(r.key)}</p>
                  <p className="text-3xl font-heading text-primary">{r.val}</p>
                  <p className="text-[10px] text-muted-foreground">kcal/{t("tools.day")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

/* ── Macro Calculator ── */
const MacroCalculator = ({ gradient }: { gradient: string }) => {
  const { t, dir } = useI18n();
  const [calories, setCalories] = useState("2500");
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  const calculate = () => {
    const cal = parseFloat(calories);
    if (isNaN(cal)) return;
    const splits = { cut: [0.4, 0.3, 0.3], maintain: [0.3, 0.4, 0.3], bulk: [0.3, 0.45, 0.25] };
    const [p, c, f] = splits[goal];
    setResult({ protein: Math.round((cal * p) / 4), carbs: Math.round((cal * c) / 4), fat: Math.round((cal * f) / 9) });
  };

  return (
    <ScrollReveal>
      <div className="bg-card/80 backdrop-blur rounded-3xl border border-border overflow-hidden shadow-card" dir={dir}>
        <div className="p-6 md:p-8 border-b border-border relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
          <div className="relative">
            <h2 className="text-2xl font-heading text-foreground">{t("tools.macros")}</h2>
            <p className="text-xs text-muted-foreground font-condensed mt-1">{t("tools.macrosDesc")}</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <InputField label={t("tools.dailyCal")} value={calories} onChange={setCalories} unit="kcal" />
          <div className="grid grid-cols-3 gap-3">
            {(["cut", "maintain", "bulk"] as const).map((g) => (
              <button key={g} onClick={() => setGoal(g)}
                className={`py-3.5 rounded-2xl text-xs font-condensed font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  goal === g ? "gradient-gold text-primary-foreground border-primary shadow-gold" : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                }`}>{t(`tools.${g}`)}</button>
            ))}
          </div>
          <button onClick={calculate} className="w-full py-4 rounded-2xl gradient-gold text-primary-foreground text-sm font-condensed font-bold uppercase tracking-wider hover:shadow-gold transition-all hover:scale-[1.01] active:scale-[0.99]">
            {t("tools.calculate")}
          </button>
          {result && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              {([
                { key: "tools.protein", val: result.protein, unit: "g", icon: "🥩" },
                { key: "tools.carbs", val: result.carbs, unit: "g", icon: "🍚" },
                { key: "tools.fat", val: result.fat, unit: "g", icon: "🥑" },
              ] as const).map((r) => (
                <div key={r.key} className="relative bg-card rounded-2xl p-5 text-center border border-border overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:border-primary/30">
                  <span className="text-lg mb-1 block">{r.icon}</span>
                  <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t(r.key)}</p>
                  <p className="text-3xl font-heading text-primary">{r.val}<span className="text-lg">{r.unit}</span></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

/* ── One Rep Max Calculator (with strength standards) ── */
type LiftKey = "exSquat" | "exBench" | "exDeadlift" | "exOhp";
// Approx intermediate-male standards as multiplier of bodyweight (Strength Level avg)
const liftBaseline: Record<LiftKey, number> = { exSquat: 1.5, exBench: 1.15, exDeadlift: 1.85, exOhp: 0.75 };

const OneRMCalculator = ({ gradient }: { gradient: string }) => {
  const { t, dir } = useI18n();
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("5");
  const [bodyweight, setBodyweight] = useState("80");
  const [exercise, setExercise] = useState<LiftKey>("exBench");
  const [result, setResult] = useState<{ oneRM: number; level: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight), r = parseFloat(reps), bw = parseFloat(bodyweight);
    if (isNaN(w) || isNaN(r) || r <= 0) return;
    const oneRM = Math.round(w * (1 + r / 30));
    let level = "tools.levelBeginner";
    if (!isNaN(bw) && bw > 0) {
      const ratio = oneRM / bw;
      const base = liftBaseline[exercise];
      if (ratio >= base * 1.5) level = "tools.levelElite";
      else if (ratio >= base * 1.25) level = "tools.levelAdvanced";
      else if (ratio >= base) level = "tools.levelIntermediate";
      else if (ratio >= base * 0.7) level = "tools.levelNovice";
    }
    setResult({ oneRM, level });
  };

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65];

  return (
    <ScrollReveal>
      <div className="bg-card/80 backdrop-blur rounded-3xl border border-border overflow-hidden shadow-card" dir={dir}>
        <div className="p-6 md:p-8 border-b border-border relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
          <div className="relative">
            <h2 className="text-2xl font-heading text-foreground">{t("tools.oneRM")}</h2>
            <p className="text-xs text-muted-foreground font-condensed mt-1">{t("tools.oneRMDesc")}</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <div>
            <label className="text-xs font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              {t("tools.exercise")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["exSquat", "exBench", "exDeadlift", "exOhp"] as LiftKey[]).map((ex) => (
                <button key={ex} onClick={() => setExercise(ex)}
                  className={`py-2.5 rounded-xl text-[11px] font-condensed font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    exercise === ex ? "gradient-gold text-primary-foreground border-primary shadow-gold" : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                  }`}>{t(`tools.${ex}`)}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <InputField label={t("tools.liftWeight")} value={weight} onChange={setWeight} unit="kg" />
            <InputField label={t("tools.reps")} value={reps} onChange={setReps} />
            <InputField label={t("tools.bodyweight")} value={bodyweight} onChange={setBodyweight} unit="kg" />
          </div>
          <button onClick={calculate} className="w-full py-4 rounded-2xl gradient-gold text-primary-foreground text-sm font-condensed font-bold uppercase tracking-wider hover:shadow-gold transition-all hover:scale-[1.01] active:scale-[0.99]">
            {t("tools.calculate")}
          </button>
          {result && (
            <div className="pt-2 space-y-4">
              <div className="relative bg-gradient-to-b from-primary/10 to-primary/5 rounded-2xl p-6 text-center border border-primary/20 overflow-hidden">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-condensed font-semibold uppercase tracking-wider text-primary mb-2">{t("tools.estimated1RM")}</p>
                  <p className="text-6xl font-heading text-primary">{result.oneRM} <span className="text-xl">kg</span></p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-[10px] uppercase font-condensed tracking-wider text-muted-foreground">{t("tools.oneRMLevel")}:</span>
                    <span className="text-xs font-condensed font-bold text-primary">{t(result.level)}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("tools.percentageTable")}</p>
                <div className="grid grid-cols-4 gap-2">
                  {percentages.map((pct) => (
                    <div key={pct} className="bg-card rounded-2xl p-3 text-center border border-border hover:border-primary/30 hover:scale-[1.03] transition-all duration-300 cursor-default">
                      <p className="text-[10px] text-muted-foreground font-condensed font-semibold">{pct}%</p>
                      <p className="text-sm font-heading text-foreground">{Math.round(result.oneRM * pct / 100)} kg</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

/* ── Meal Planner ── */
const MealPlanner = ({ gradient }: { gradient: string }) => {
  const { t, dir } = useI18n();
  const [calories, setCalories] = useState("2500");
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [plan, setPlan] = useState<{ meal: string; foods: string; cal: number; p: number; c: number; f: number }[] | null>(null);

  const generate = () => {
    const cal = parseFloat(calories);
    if (isNaN(cal)) return;
    const splits = { cut: [0.4, 0.3, 0.3], maintain: [0.3, 0.4, 0.3], bulk: [0.3, 0.45, 0.25] };
    const [p, c, f] = splits[goal];
    const totalP = (cal * p) / 4, totalC = (cal * c) / 4, totalF = (cal * f) / 9;
    // Distribute: 25/30/15/30
    const dist = [0.25, 0.30, 0.15, 0.30];
    const meals: ("meal1" | "meal2" | "meal3" | "meal4")[] = ["meal1", "meal2", "meal3", "meal4"];
    const foodsKeys = ["tools.foodsBreakfast", "tools.foodsLunch", "tools.foodsPre", "tools.foodsDinner"];
    setPlan(meals.map((m, i) => ({
      meal: t(`tools.${m}`),
      foods: t(foodsKeys[i]),
      cal: Math.round(cal * dist[i]),
      p: Math.round(totalP * dist[i]),
      c: Math.round(totalC * dist[i]),
      f: Math.round(totalF * dist[i]),
    })));
  };

  return (
    <ScrollReveal>
      <div className="bg-card/80 backdrop-blur rounded-3xl border border-border overflow-hidden shadow-card" dir={dir}>
        <div className="p-6 md:p-8 border-b border-border relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
          <div className="relative">
            <h2 className="text-2xl font-heading text-foreground">{t("tools.mealPlanner")}</h2>
            <p className="text-xs text-muted-foreground font-condensed mt-1">{t("tools.mealPlannerDesc")}</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <InputField label={t("tools.dailyCal")} value={calories} onChange={setCalories} unit="kcal" />
          <div className="grid grid-cols-3 gap-3">
            {(["cut", "maintain", "bulk"] as const).map((g) => (
              <button key={g} onClick={() => setGoal(g)}
                className={`py-3.5 rounded-2xl text-xs font-condensed font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  goal === g ? "gradient-gold text-primary-foreground border-primary shadow-gold" : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                }`}>{t(`tools.${g}`)}</button>
            ))}
          </div>
          <button onClick={generate} className="w-full py-4 rounded-2xl gradient-gold text-primary-foreground text-sm font-condensed font-bold uppercase tracking-wider hover:shadow-gold transition-all hover:scale-[1.01] active:scale-[0.99]">
            {t("tools.generatePlan")}
          </button>
          {plan && (
            <div className="space-y-3 pt-2">
              {plan.map((m, i) => (
                <div key={i} className="bg-card rounded-2xl p-4 border border-border hover:border-primary/30 transition-all">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-base font-heading text-foreground">{m.meal}</h3>
                    <span className="text-sm font-heading text-primary">{m.cal} kcal</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-condensed mb-2">{t("tools.mealSuggestion")}: {m.foods}</p>
                  <div className="flex gap-2 text-[10px] font-condensed">
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{t("tools.protein")} {m.p}g</span>
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{t("tools.carbs")} {m.c}g</span>
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{t("tools.fat")} {m.f}g</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

/* ── Stack Advisor ── */
type StackGoal = "muscle" | "cut" | "perform" | "health";
type StackExp = "beginner" | "intermediate" | "advanced";
type StackFreq = "3" | "5" | "7";

interface StackItem {
  nameKey: string;
  timing: string;
  essential: boolean;
}

const buildStack = (goal: StackGoal, exp: StackExp, freq: StackFreq): StackItem[] => {
  const items: StackItem[] = [];
  // Always whey
  items.push({ nameKey: "ticker.whey", timing: "tools.timingPostWorkout", essential: true });
  // Multivitamin baseline
  items.push({ nameKey: "ticker.omega", timing: "tools.timingDaily", essential: true });

  if (goal === "muscle") {
    items.push({ nameKey: "ticker.creatine", timing: "tools.timingDaily", essential: true });
    if (exp !== "beginner") items.push({ nameKey: "ticker.massgainer", timing: "tools.timingPostWorkout", essential: false });
    if (freq !== "3") items.push({ nameKey: "ticker.zma", timing: "tools.timingEvening", essential: false });
  } else if (goal === "cut") {
    items.push({ nameKey: "ticker.bcaa", timing: "tools.timingPreWorkout", essential: true });
    items.push({ nameKey: "ticker.fatburner", timing: "tools.timingMorning", essential: false });
  } else if (goal === "perform") {
    items.push({ nameKey: "ticker.creatine", timing: "tools.timingDaily", essential: true });
    items.push({ nameKey: "ticker.preworkout", timing: "tools.timingPreWorkout", essential: true });
    if (exp === "advanced") items.push({ nameKey: "ticker.bcaa", timing: "tools.timingPreWorkout", essential: false });
  } else {
    items.push({ nameKey: "ticker.zma", timing: "tools.timingEvening", essential: false });
  }
  return items;
};

const StackAdvisor = ({ gradient }: { gradient: string }) => {
  const { t, dir } = useI18n();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<StackGoal | null>(null);
  const [exp, setExp] = useState<StackExp | null>(null);
  const [freq, setFreq] = useState<StackFreq | null>(null);

  const stack = goal && exp && freq ? buildStack(goal, exp, freq) : null;

  const reset = () => { setStep(0); setGoal(null); setExp(null); setFreq(null); };

  const Choice = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button onClick={onClick}
      className="w-full text-left p-4 rounded-2xl border border-border bg-secondary hover:border-primary hover:bg-primary/5 transition-all group">
      <span className="text-sm font-condensed font-semibold text-foreground group-hover:text-primary">{label}</span>
    </button>
  );

  return (
    <ScrollReveal>
      <div className="bg-card/80 backdrop-blur rounded-3xl border border-border overflow-hidden shadow-card" dir={dir}>
        <div className="p-6 md:p-8 border-b border-border relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading text-foreground">{t("tools.stackAdvisor")}</h2>
              <p className="text-xs text-muted-foreground font-condensed mt-1">{t("tools.stackAdvisorDesc")}</p>
            </div>
            {!stack && (
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-4">
          {!stack && step === 0 && (
            <>
              <h3 className="text-base font-heading text-foreground mb-3">{t("tools.q1")}</h3>
              <div className="space-y-2">
                <Choice label={t("pack.goalMuscle")} onClick={() => { setGoal("muscle"); setStep(1); }} />
                <Choice label={t("pack.goalCut")} onClick={() => { setGoal("cut"); setStep(1); }} />
                <Choice label={t("pack.goalPerform")} onClick={() => { setGoal("perform"); setStep(1); }} />
                <Choice label={t("pack.goalHealth")} onClick={() => { setGoal("health"); setStep(1); }} />
              </div>
            </>
          )}
          {!stack && step === 1 && (
            <>
              <h3 className="text-base font-heading text-foreground mb-3">{t("tools.q2")}</h3>
              <div className="space-y-2">
                <Choice label={t("tools.expBeginner")} onClick={() => { setExp("beginner"); setStep(2); }} />
                <Choice label={t("tools.expIntermediate")} onClick={() => { setExp("intermediate"); setStep(2); }} />
                <Choice label={t("tools.expAdvanced")} onClick={() => { setExp("advanced"); setStep(2); }} />
              </div>
            </>
          )}
          {!stack && step === 2 && (
            <>
              <h3 className="text-base font-heading text-foreground mb-3">{t("tools.q3")}</h3>
              <div className="space-y-2">
                <Choice label={t("tools.freq3")} onClick={() => setFreq("3")} />
                <Choice label={t("tools.freq5")} onClick={() => setFreq("5")} />
                <Choice label={t("tools.freq7")} onClick={() => setFreq("7")} />
              </div>
            </>
          )}
          {stack && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading text-foreground text-center">{t("tools.recommendedStack")}</h3>
              <div className="space-y-2.5">
                {stack.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 w-9 h-9 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
                        <span className="text-base">{item.essential ? "★" : "+"}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-condensed font-semibold text-foreground truncate">{t(item.nameKey)}</p>
                        <p className="text-[10px] text-muted-foreground font-condensed">{t(item.timing)}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[9px] font-condensed font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      item.essential ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      {item.essential ? t("tools.essential") : t("tools.optional")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={reset} className="py-3.5 rounded-2xl bg-secondary text-secondary-foreground text-xs font-condensed font-bold uppercase tracking-wider hover:bg-secondary/80 transition-all">
                  {t("tools.restart")}
                </button>
                <Link to="/build-pack" className="py-3.5 rounded-2xl gradient-gold text-primary-foreground text-xs font-condensed font-bold uppercase tracking-wider hover:shadow-gold transition-all text-center inline-flex items-center justify-center">
                  {t("tools.viewProducts")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};


/* ── BMI Calculator ── */
const BMICalculator = ({ gradient }: { gradient: string }) => {
  const { t, dir } = useI18n();
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("178");
  const [result, setResult] = useState<{ bmi: number; category: string; pct: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height) / 100;
    if (isNaN(w) || isNaN(h) || h <= 0) return;
    const bmi = w / (h * h);
    let category = "tools.bmiNormal", pct = 50;
    if (bmi < 18.5) { category = "tools.bmiUnder"; pct = 20; }
    else if (bmi >= 25 && bmi < 30) { category = "tools.bmiOver"; pct = 70; }
    else if (bmi >= 30) { category = "tools.bmiObese"; pct = 90; }
    setResult({ bmi: Math.round(bmi * 10) / 10, category, pct });
  };

  return (
    <ScrollReveal>
      <div className="bg-card/80 backdrop-blur rounded-3xl border border-border overflow-hidden shadow-card" dir={dir}>
        <div className="p-6 md:p-8 border-b border-border relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
          <div className="relative">
            <h2 className="text-2xl font-heading text-foreground">{t("tools.bmi")}</h2>
            <p className="text-xs text-muted-foreground font-condensed mt-1">{t("tools.bmiDesc")}</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <InputField label={t("tools.weight")} value={weight} onChange={setWeight} unit="kg" />
            <InputField label={t("tools.height")} value={height} onChange={setHeight} unit="cm" />
          </div>
          <button onClick={calculate} className="w-full py-4 rounded-2xl gradient-gold text-primary-foreground text-sm font-condensed font-bold uppercase tracking-wider hover:shadow-gold transition-all hover:scale-[1.01] active:scale-[0.99]">
            {t("tools.calculate")}
          </button>
          {result && (
            <div className="pt-2">
              <div className="relative bg-gradient-to-b from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20 overflow-hidden">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-condensed font-semibold uppercase tracking-wider text-primary mb-2">{t("tools.yourBMI")}</p>
                  <p className="text-6xl font-heading text-primary">{result.bmi}</p>
                  <p className="text-sm font-condensed text-muted-foreground mt-2">{t(result.category)}</p>
                  {/* Visual bar */}
                  <div className="mt-5 h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-yellow-400 to-red-500 transition-all duration-700"
                      style={{ width: `${result.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-foreground mt-1.5 font-condensed">
                    <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-5 max-w-sm mx-auto">{t("tools.bmiNote")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

/* ── Shared Input ── */
const InputField = ({ label, value, onChange, unit }: { label: string; value: string; onChange: (v: string) => void; unit?: string }) => (
  <div>
    <label className="text-xs font-condensed font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">{label}</label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-secondary rounded-2xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border transition-all"
      />
      {unit && <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-condensed">{unit}</span>}
    </div>
  </div>
);

export default ToolsPage;
