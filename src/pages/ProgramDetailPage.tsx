import { useState, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft, Clock, Dumbbell, Flame, Target, Zap, CheckCircle2, Apple, Wind, Snowflake, Bookmark, BookmarkCheck, Trophy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/i18n";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { workoutPrograms } from "@/data/workouts";
import { programDetails } from "@/data/programDetails";

import workoutPpl from "@/assets/workout-ppl.jpg";
import workoutFullbody from "@/assets/workout-fullbody.jpg";
import workoutUpperlower from "@/assets/workout-upperlower.jpg";
import workoutBrosplit from "@/assets/workout-brosplit.jpg";
import workoutHiit from "@/assets/workout-hiit.jpg";
import workoutStrength from "@/assets/workout-strength.jpg";
import workoutBeginner from "@/assets/workout-beginner.jpg";
import workoutHome from "@/assets/workout-home.jpg";
import workoutGvt from "@/assets/workout-gvt.jpg";
import workout531 from "@/assets/workout-531.jpg";
import workoutYoga from "@/assets/workout-yoga.jpg";
import workoutSprint from "@/assets/workout-sprint.jpg";
import workoutCalisthenics from "@/assets/workout-calisthenics.jpg";
import workoutAthleanx from "@/assets/workout-athleanx.jpg";
import workoutCrossfit from "@/assets/workout-crossfit.jpg";
import workoutMobility from "@/assets/workout-mobility.jpg";

const programImages: Record<string, string> = {
  "workout-ppl": workoutPpl,
  "workout-fullbody": workoutFullbody,
  "workout-upperlower": workoutUpperlower,
  "workout-brosplit": workoutBrosplit,
  "workout-hiit": workoutHiit,
  "workout-strength": workoutStrength,
  "workout-beginner": workoutBeginner,
  "workout-home": workoutHome,
  "workout-gvt": workoutGvt,
  "workout-531": workout531,
  "workout-yoga": workoutYoga,
  "workout-sprint": workoutSprint,
  "workout-calisthenics": workoutCalisthenics,
  "workout-athleanx": workoutAthleanx,
  "workout-crossfit": workoutCrossfit,
  "workout-mobility": workoutMobility,
};

const ProgramDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, dir, language } = useI18n();
  const { toast } = useToast();
  const [activeDay, setActiveDay] = useState(0);
  const { isSaved, saveProgram, isDayComplete, toggleDay } = useProgress();

  const program = workoutPrograms.find((p) => p.id === id);
  const detail = id ? programDetails[id] : undefined;

  const seoUrl = `https://musclefactory.com/workouts/${id}`;
  const jsonLd = useMemo(() => {
    if (!program || !detail) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "ExercisePlan",
      name: t(program.nameKey),
      description: t(program.descKey),
      url: seoUrl,
      exerciseType: t(program.goalKey),
      activityDuration: `PT${program.durationWeeks}W`,
      restPeriods: `${program.daysPerWeek}/week`,
      image: `https://musclefactory.com${programImages[program.image] || ""}`,
    };
  }, [program, detail, t, seoUrl]);

  if (!program || !detail) {
    return <Navigate to="/workouts" replace />;
  }

  const day = detail.days[activeDay];
  const totalSets = detail.days.reduce((sum, d) => sum + d.exercises.reduce((s, e) => s + e.sets, 0), 0);

  const stats = [
    { icon: Clock, labelKey: "pdetail.stat.duration", value: `${program.durationWeeks} ${t("workouts.weeks")}` },
    { icon: Dumbbell, labelKey: "pdetail.stat.frequency", value: `${program.daysPerWeek} ${t("workouts.daysPerWeek")}` },
    { icon: Flame, labelKey: "pdetail.stat.intensity", value: t(detail.intensityKey) },
    { icon: Zap, labelKey: "pdetail.stat.calories", value: t(detail.caloriesKey) },
  ];

  return (
    <>
      <SEOHead
        title={`${t(program.nameKey)} | ${t("workouts.title")} – Muscle Factory®`}
        description={t(program.descKey)}
        canonical={seoUrl}
        ogImage={`https://musclefactory.com${programImages[program.image] || ""}`}
        jsonLd={jsonLd}
        language={language}
      />
      <Header />
      <main className="min-h-screen bg-background pb-20 md:pb-0" dir={dir}>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[380px] md:h-[60vh] overflow-hidden">
          <img
            src={programImages[program.image]}
            alt={t(program.nameKey)}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

          <div className="relative h-full container px-5 flex flex-col justify-between py-5 sm:py-8">
            <Link
              to="/workouts"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-condensed font-semibold uppercase tracking-wider text-foreground/90 hover:text-primary transition-colors w-fit touch-manipulation"
            >
              <ChevronLeft size={16} className={dir === "rtl" ? "rotate-180" : ""} />
              {t("pdetail.back")}
            </Link>

            <div className="max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {program.badge && (
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground gradient-gold px-2.5 py-1 rounded-md">
                    {program.badge}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {t(program.levelKey)}
                </span>
                <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider text-foreground bg-secondary px-2.5 py-1 rounded-md">
                  {t(detail.splitKey)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading text-foreground leading-[0.95]">
                {t(program.nameKey)}
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground font-condensed max-w-2xl leading-relaxed">
                {t(program.descKey)}
              </p>

              {/* Save / Track Progress */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5">
                {!isSaved(program.id) ? (
                  <button
                    onClick={() => {
                      saveProgram(program.id, detail.days.length);
                      toast({ title: t("pdetail.savedToast") });
                    }}
                    className="inline-flex items-center gap-2 gradient-gold text-primary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg shadow-gold hover:scale-105 transition-transform touch-manipulation"
                  >
                    <Bookmark size={15} />
                    {t("pdetail.save")}
                  </button>
                ) : (
                  <Link
                    to="/my-programs"
                    className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg hover:bg-primary/20 transition-colors touch-manipulation"
                  >
                    <BookmarkCheck size={15} />
                    {t("pdetail.saved")}
                  </Link>
                )}
                {isSaved(program.id) && (
                  <Link
                    to="/my-programs"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg hover:bg-muted transition-colors touch-manipulation"
                  >
                    <Trophy size={15} />
                    {t("pdetail.viewProgress")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="container px-5 -mt-10 sm:-mt-12 relative z-10">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.labelKey}
                  className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-start gap-1.5 hover:border-primary/30 transition-colors"
                >
                  <Icon size={18} className="text-primary" />
                  <p className="text-[9px] sm:text-[10px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(s.labelKey)}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-foreground leading-tight">
                    {s.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Overview + benefits */}
          <section className="mt-8 sm:mt-12 grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-primary" />
                <h2 className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.2em] text-primary">
                  {t("pdetail.overview")}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {t(detail.overviewKey)}
              </p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Apple size={18} className="text-primary" />
                  <h3 className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.2em] text-primary">
                    {t("pdetail.nutrition")}
                  </h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{t(detail.nutritionKey)}</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 sm:p-7">
              <h2 className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.2em] text-primary mb-4">
                {t("pdetail.benefits")}
              </h2>
              <ul className="space-y-3">
                {detail.benefitKeys.map((bKey) => (
                  <li key={bKey} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90 leading-snug">{t(bKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Day-by-day */}
          <section className="mt-10 sm:mt-14">
            <div className="flex items-end justify-between gap-3 mb-4 sm:mb-6 flex-wrap">
              <div>
                <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] text-primary block mb-1">
                  {t("pdetail.programBreakdown")}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground">
                  {t("pdetail.dayByDay")}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-condensed">
                {detail.days.length} {t("pdetail.days")} · {totalSets} {t("pdetail.totalSets")}
              </p>
            </div>

            {/* Day tabs - horizontal scroll on mobile */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-5 sm:mb-6 scrollbar-thin">
              {detail.days.map((d, i) => (
                <button
                  key={d.dayKey}
                  onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap touch-manipulation text-left ${
                    activeDay === i
                      ? "gradient-gold text-primary-foreground shadow-gold"
                      : "bg-card border border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  <p className="text-[9px] sm:text-[10px] font-condensed font-semibold uppercase tracking-wider opacity-80 leading-none">
                    {t("pdetail.day")} {i + 1}
                  </p>
                  <p className="text-xs sm:text-sm font-bold mt-0.5 leading-tight">
                    {t(d.dayKey)}
                  </p>
                </button>
              ))}
            </div>

            {/* Active day content */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-border bg-muted/30 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("pdetail.focus")}: <span className="text-primary">{t(day.focusKey)}</span>
                  </p>
                  <h3 className="text-lg sm:text-xl font-heading text-foreground mt-0.5">
                    {t(day.dayKey)}
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-condensed font-semibold text-foreground bg-background px-2.5 py-1 rounded-md border border-border">
                    {day.exercises.length} {t("pdetail.exercises")}
                  </span>
                  {isSaved(program.id) && (
                    <button
                      onClick={() => toggleDay(program.id, day.dayKey)}
                      className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-condensed font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border transition-all touch-manipulation ${
                        isDayComplete(program.id, day.dayKey)
                          ? "bg-primary/15 border-primary/40 text-primary"
                          : "bg-background border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      <CheckCircle2 size={12} />
                      {isDayComplete(program.id, day.dayKey) ? t("pdetail.dayComplete") : t("pdetail.markComplete")}
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile: card list. Desktop: table */}
              <div className="md:hidden divide-y divide-border">
                {day.exercises.map((ex, i) => (
                  <div key={`${ex.exerciseKey}-${i}`} className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="text-sm font-bold text-foreground mt-0.5 leading-tight">
                          {t(ex.exerciseKey)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mt-3">
                      <div className="bg-background rounded-lg px-2 py-1.5 border border-border">
                        <p className="text-[8px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground">{t("pdetail.sets")}</p>
                        <p className="text-sm font-bold text-foreground">{ex.sets}</p>
                      </div>
                      <div className="bg-background rounded-lg px-2 py-1.5 border border-border">
                        <p className="text-[8px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground">{t("pdetail.reps")}</p>
                        <p className="text-sm font-bold text-foreground">{ex.reps}</p>
                      </div>
                      <div className="bg-background rounded-lg px-2 py-1.5 border border-border">
                        <p className="text-[8px] font-condensed font-semibold uppercase tracking-wider text-muted-foreground">{t("pdetail.rest")}</p>
                        <p className="text-sm font-bold text-foreground">{ex.rest}</p>
                      </div>
                    </div>
                    {ex.noteKey && (
                      <p className="mt-2 text-[11px] text-primary font-condensed italic">
                        ★ {t(ex.noteKey)}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-start px-7 py-3 text-[10px] font-condensed font-bold uppercase tracking-wider text-muted-foreground w-12">#</th>
                      <th className="text-start px-4 py-3 text-[10px] font-condensed font-bold uppercase tracking-wider text-muted-foreground">{t("pdetail.exercise")}</th>
                      <th className="text-center px-4 py-3 text-[10px] font-condensed font-bold uppercase tracking-wider text-muted-foreground">{t("pdetail.sets")}</th>
                      <th className="text-center px-4 py-3 text-[10px] font-condensed font-bold uppercase tracking-wider text-muted-foreground">{t("pdetail.reps")}</th>
                      <th className="text-center px-4 py-3 text-[10px] font-condensed font-bold uppercase tracking-wider text-muted-foreground">{t("pdetail.rest")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.exercises.map((ex, i) => (
                      <tr key={`${ex.exerciseKey}-${i}`} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-7 py-4 text-xs font-condensed font-bold text-primary">{String(i + 1).padStart(2, "0")}</td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-bold text-foreground">{t(ex.exerciseKey)}</p>
                          {ex.noteKey && (
                            <p className="text-[11px] text-primary font-condensed italic mt-0.5">★ {t(ex.noteKey)}</p>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-semibold text-foreground">{ex.sets}</td>
                        <td className="px-4 py-4 text-center text-sm font-semibold text-foreground">{ex.reps}</td>
                        <td className="px-4 py-4 text-center text-sm font-semibold text-foreground">{ex.rest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Warmup + cooldown */}
          <section className="mt-10 sm:mt-14 grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Wind size={18} className="text-primary" />
                <h2 className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.2em] text-primary">
                  {t("pdetail.warmupTitle")}
                </h2>
              </div>
              <ol className="space-y-3">
                {detail.warmupKeys.map((k, i) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm text-foreground/90 leading-snug">{t(k)}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Snowflake size={18} className="text-primary" />
                <h2 className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.2em] text-primary">
                  {t("pdetail.cooldownTitle")}
                </h2>
              </div>
              <ol className="space-y-3">
                {detail.cooldownKeys.map((k, i) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm text-foreground/90 leading-snug">{t(k)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 sm:mt-14 mb-10 bg-gradient-to-br from-primary/15 via-card to-card border border-primary/20 rounded-2xl p-6 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground">
              {t("pdetail.ctaTitle")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 font-condensed max-w-xl mx-auto">
              {t("pdetail.ctaSubtitle")}
            </p>
            <div className="flex gap-2.5 sm:gap-3 mt-5 sm:mt-6 justify-center flex-wrap">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 gradient-gold text-primary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-gold hover:scale-105 transition-transform touch-manipulation"
              >
                {t("pdetail.ctaShop")}
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-muted transition-colors touch-manipulation"
              >
                {t("pdetail.ctaTools")}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProgramDetailPage;
