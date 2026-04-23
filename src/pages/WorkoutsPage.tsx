import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParallax } from "@/hooks/useParallax";
import { useI18n } from "@/i18n";
import { workoutPrograms, muscleGroups } from "@/data/workouts";
import SEOHead from "@/components/SEOHead";

import heroWorkouts from "@/assets/hero-workouts.jpg";
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
import workoutMma from "@/assets/workout-mma.jpg";
import workoutClassic from "@/assets/workout-classic.jpg";
import workoutRamadan from "@/assets/workout-ramadan.jpg";
import workoutWomen from "@/assets/workout-women.jpg";
import exerciseChest from "@/assets/exercise-chest.jpg";
import exerciseBack from "@/assets/exercise-back.jpg";
import exerciseLegs from "@/assets/exercise-legs.jpg";
import exerciseShoulders from "@/assets/exercise-shoulders.jpg";
import exerciseArms from "@/assets/exercise-arms.jpg";
import exerciseCore from "@/assets/exercise-core.jpg";
import exerciseGlutes from "@/assets/exercise-glutes.jpg";
import exerciseTraps from "@/assets/exercise-traps.jpg";
import exerciseForearms from "@/assets/exercise-forearms.jpg";

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
  "workout-mma": workoutMma,
  "workout-classic": workoutClassic,
  "workout-ramadan": workoutRamadan,
  "workout-women": workoutWomen,
};

const exerciseImages: Record<string, string> = {
  "exercise-chest": exerciseChest,
  "exercise-back": exerciseBack,
  "exercise-legs": exerciseLegs,
  "exercise-shoulders": exerciseShoulders,
  "exercise-arms": exerciseArms,
  "exercise-core": exerciseCore,
  "exercise-glutes": exerciseGlutes,
  "exercise-traps": exerciseTraps,
  "exercise-forearms": exerciseForearms,
};

const WorkoutsPage = () => {
  const { t, dir } = useI18n();
  const parallax = useParallax(0.3);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedMuscle, setExpandedMuscle] = useState<string | null>(null);

  const filters = [
    { key: "all", label: t("workouts.all") },
    { key: "muscle", label: t("workouts.muscle") },
    { key: "fatLoss", label: t("workouts.fatLoss") },
    { key: "strength", label: t("workouts.strength") },
    { key: "beginner", label: t("workouts.beginner") },
    { key: "home", label: t("workouts.home") },
    { key: "recovery", label: t("workouts.recovery") },
  ];

  const filteredPrograms = activeFilter === "all"
    ? workoutPrograms
    : workoutPrograms.filter((p) => p.category === activeFilter);

  const weekSchedule = [
    { dayKey: "workouts.monday", workoutKey: "workouts.push", color: "bg-primary/20 text-primary" },
    { dayKey: "workouts.tuesday", workoutKey: "workouts.pull", color: "bg-blue-500/20 text-blue-400" },
    { dayKey: "workouts.wednesday", workoutKey: "workouts.legsDay", color: "bg-green-500/20 text-green-400" },
    { dayKey: "workouts.thursday", workoutKey: "workouts.rest", color: "bg-muted text-muted-foreground" },
    { dayKey: "workouts.friday", workoutKey: "workouts.push", color: "bg-primary/20 text-primary" },
    { dayKey: "workouts.saturday", workoutKey: "workouts.pull", color: "bg-blue-500/20 text-blue-400" },
    { dayKey: "workouts.sunday", workoutKey: "workouts.legsDay", color: "bg-green-500/20 text-green-400" },
  ];

  const tips = [
    { titleKey: "workouts.tip1Title", descKey: "workouts.tip1Desc", icon: "📈" },
    { titleKey: "workouts.tip2Title", descKey: "workouts.tip2Desc", icon: "😴" },
    { titleKey: "workouts.tip3Title", descKey: "workouts.tip3Desc", icon: "🧠" },
    { titleKey: "workouts.tip4Title", descKey: "workouts.tip4Desc", icon: "🍗" },
    { titleKey: "workouts.tip5Title", descKey: "workouts.tip5Desc", icon: "🔥" },
    { titleKey: "workouts.tip6Title", descKey: "workouts.tip6Desc", icon: "📊" },
    { titleKey: "workouts.tip7Title", descKey: "workouts.tip7Desc", icon: "⏸️" },
    { titleKey: "workouts.tip8Title", descKey: "workouts.tip8Desc", icon: "🏋️" },
    { titleKey: "workouts.tip9Title", descKey: "workouts.tip9Desc", icon: "💨" },
    { titleKey: "workouts.tip10Title", descKey: "workouts.tip10Desc", icon: "📅" },
  ];

  return (
    <>
      <SEOHead
        title={t("workouts.seoTitle")}
        description={t("workouts.seoDesc")}
        canonical="https://musclefactory.com/workouts"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Workout Programs",
          description: t("workouts.seoDesc"),
          url: "https://musclefactory.com/workouts",
          publisher: { "@type": "Organization", name: "Muscle Factory" },
        }}
      />
      <Header />
      <main className="min-h-screen" dir={dir}>
        {/* Hero */}
        <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
          <img
            ref={parallax.ref}
            style={parallax.style}
            src={heroWorkouts}
            alt={t("workouts.title")}
            className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
            width={1920}
            height={640}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="container relative px-5">
            <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 sm:mb-3 block">
              {t("workouts.tagline")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading text-foreground">
              {t("workouts.title")}
            </h1>
            <p className="text-muted-foreground mt-2 sm:mt-3 font-condensed text-base sm:text-lg max-w-2xl">
              {t("workouts.subtitle")}
            </p>
          </div>
        </section>

        <div className="container py-8 sm:py-12 px-5">
          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 whitespace-nowrap touch-manipulation ${
                  activeFilter === f.key
                    ? "gradient-gold text-primary-foreground shadow-gold"
                    : "bg-secondary text-secondary-foreground hover:bg-muted hover:scale-105"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Featured Program */}
          {filteredPrograms.length > 0 && (
            <Link
              to={`/workouts/${filteredPrograms[0].id}`}
              aria-label={t(filteredPrograms[0].nameKey)}
              className="block mb-8 sm:mb-12 touch-manipulation"
            >
              <article className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-gold">
                <div className="md:flex">
                  <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={programImages[filteredPrograms[0].image]}
                      alt={t(filteredPrograms[0].nameKey)}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      width={640}
                      height={640}
                    />
                  </div>
                  <div className="md:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                      {filteredPrograms[0].badge && (
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                          {filteredPrograms[0].badge}
                        </span>
                      )}
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground font-condensed">
                        {filteredPrograms[0].daysPerWeek} {t("workouts.daysPerWeek")}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground font-condensed">
                        {filteredPrograms[0].durationWeeks} {t("workouts.weeks")}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-heading text-foreground leading-tight">
                      {t(filteredPrograms[0].nameKey)}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-3 sm:mt-4 leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {t(filteredPrograms[0].descKey)}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4 sm:mt-5">
                      <div className="text-[10px] sm:text-xs font-condensed">
                        <span className="text-muted-foreground">{t("workouts.level")}:</span>{" "}
                        <span className="text-foreground font-semibold">{t(filteredPrograms[0].levelKey)}</span>
                      </div>
                      <div className="text-[10px] sm:text-xs font-condensed">
                        <span className="text-muted-foreground">{t("workouts.equipment")}:</span>{" "}
                        <span className="text-foreground font-semibold">{t(filteredPrograms[0].equipmentKey)}</span>
                      </div>
                    </div>
                    <span className="inline-block mt-4 sm:mt-6 text-xs sm:text-sm font-bold text-primary uppercase tracking-wider font-condensed">
                      {t("workouts.viewProgram")} →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Programs Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPrograms.slice(1).map((program) => (
              <Link
                key={program.id}
                to={`/workouts/${program.id}`}
                aria-label={t(program.nameKey)}
                className="group block touch-manipulation"
              >
                <article className="h-full bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-gold">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={programImages[program.image]}
                      alt={t(program.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={640}
                      height={640}
                    />
                    {program.badge && (
                      <span className="absolute top-3 left-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary-foreground gradient-gold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                        {program.badge}
                      </span>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                      <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-condensed text-foreground/80">
                        <span>{program.daysPerWeek} {t("workouts.daysPerWeek")}</span>
                        <span>·</span>
                        <span>{program.durationWeeks} {t("workouts.weeks")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-heading text-lg sm:text-xl text-foreground leading-tight">
                      {t(program.nameKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 line-clamp-2">
                      {t(program.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-[9px] sm:text-[10px] font-condensed font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {t(program.levelKey)}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-condensed font-semibold text-secondary-foreground bg-secondary px-2 py-0.5 rounded">
                        {t(program.equipmentKey)}
                      </span>
                    </div>
                    <span className="inline-block mt-3 sm:mt-4 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider font-condensed">
                      {t("workouts.viewProgram")} →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Weekly Schedule */}
          <section className="mt-12 sm:mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground">{t("workouts.weeklySchedule")}</h2>
              <p className="text-sm text-muted-foreground mt-2 font-condensed max-w-xl mx-auto">{t("workouts.weeklyScheduleDesc")}</p>
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
              {weekSchedule.map((day) => (
                <div key={day.dayKey} className={`rounded-lg sm:rounded-xl p-2 sm:p-4 text-center ${day.color} transition-all duration-200`}>
                  <p className="text-[8px] sm:text-[10px] font-condensed font-semibold uppercase tracking-wider opacity-70 mb-1">
                    {t(day.dayKey)}
                  </p>
                  <p className="text-[10px] sm:text-sm font-condensed font-bold">{t(day.workoutKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise Library */}
          <section className="mt-12 sm:mt-16">
            <div className="text-center mb-8">
              <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 block">
                {t("workouts.exerciseLibrary")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground">{t("workouts.exerciseLibrary")}</h2>
              <p className="text-sm text-muted-foreground mt-2 font-condensed max-w-xl mx-auto">{t("workouts.exerciseLibraryDesc")}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {muscleGroups.map((group) => (
                <div
                  key={group.id}
                  className="group bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-gold cursor-pointer"
                  onClick={() => setExpandedMuscle(expandedMuscle === group.id ? null : group.id)}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={exerciseImages[group.image]}
                      alt={t(group.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={640}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-heading text-xl sm:text-2xl text-foreground">{t(group.nameKey)}</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-condensed">
                        {group.exercises.length} {t("workouts.exercises")}
                      </p>
                    </div>
                  </div>
                  {expandedMuscle === group.id && (
                    <div className="p-4 sm:p-5 border-t border-border animate-in slide-in-from-top-2 duration-200">
                      <ul className="space-y-2">
                        {group.exercises.map((ex) => (
                          <li key={ex} className="flex items-center gap-2 text-sm text-foreground font-condensed">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {t(ex)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Training Tips */}
          <section className="mt-12 sm:mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground">{t("workouts.tipsTitle")}</h2>
              <p className="text-sm text-muted-foreground mt-2 font-condensed max-w-xl mx-auto">{t("workouts.tipsSubtitle")}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tips.map((tip) => (
                <div
                  key={tip.titleKey}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
                >
                  <span className="text-2xl sm:text-3xl mb-3 block">{tip.icon}</span>
                  <h3 className="font-condensed font-semibold text-foreground text-base sm:text-lg">{t(tip.titleKey)}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{t(tip.descKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 sm:mt-16 gradient-gold rounded-xl sm:rounded-2xl p-6 sm:p-10 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-primary-foreground">{t("workouts.ctaTitle")}</h2>
            <p className="text-sm text-primary-foreground/80 mt-2 sm:mt-3 font-condensed max-w-xl mx-auto">{t("workouts.ctaDesc")}</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              <Link
                to="/shop"
                className="bg-background text-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-condensed font-semibold uppercase tracking-wider hover:bg-background/90 transition-colors touch-manipulation"
              >
                {t("workouts.shopSupplements")}
              </Link>
              <Link
                to="/tools"
                className="border-2 border-primary-foreground text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-condensed font-semibold uppercase tracking-wider hover:bg-primary-foreground/10 transition-colors touch-manipulation"
              >
                {t("workouts.useTools")}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WorkoutsPage;
