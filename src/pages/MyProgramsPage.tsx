import { Link } from "react-router-dom";
import { Trophy, Trash2, ChevronRight, CheckCircle2, Circle, Dumbbell } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StreakDashboard from "@/components/StreakDashboard";
import { useI18n } from "@/i18n";
import { useProgress } from "@/contexts/ProgressContext";
import { workoutPrograms } from "@/data/workouts";
import { programDetails } from "@/data/programDetails";
import { Progress } from "@/components/ui/progress";

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

const MyProgramsPage = () => {
  const { t, dir, language } = useI18n();
  const { savedPrograms, removeProgram, toggleDay, getProgress } = useProgress();

  return (
    <>
      <SEOHead
        title={`${t("myPrograms.title")} | Muscle Factory® Tunisie`}
        description={t("myPrograms.description")}
        canonical="https://musclefactory.com/my-programs"
        language={language}
      />
      <Header />
      <main className="min-h-screen bg-background pb-24 md:pb-12" dir={dir}>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-card via-background to-card border-b border-border">
          <div className="container px-5 py-10 sm:py-14">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={18} className="text-primary" />
              <span className="text-[10px] sm:text-xs font-condensed font-bold uppercase tracking-[0.25em] text-primary">
                {t("myPrograms.subtitle")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading text-foreground leading-[0.95]">
              {t("myPrograms.title")}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground font-condensed max-w-2xl">
              {t("myPrograms.description")}
            </p>
          </div>
        </section>

        <div className="container px-5 mt-8 sm:mt-12 space-y-8 sm:space-y-12">
          {/* Streak + weekly view — always visible if user has any sessions OR saved programs */}
          {savedPrograms.length > 0 && <StreakDashboard />}

          {savedPrograms.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-14 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Dumbbell size={28} className="text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-heading text-foreground mb-2">
                {t("myPrograms.empty.title")}
              </h2>
              <p className="text-sm text-muted-foreground font-condensed max-w-md mx-auto mb-6">
                {t("myPrograms.empty.description")}
              </p>
              <Link
                to="/workouts"
                className="inline-flex items-center gap-2 gradient-gold text-primary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-gold hover:scale-105 transition-transform touch-manipulation"
              >
                {t("myPrograms.empty.cta")}
                <ChevronRight size={16} className={dir === "rtl" ? "rotate-180" : ""} />
              </Link>
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-7">
              {savedPrograms.map((saved) => {
                const program = workoutPrograms.find((p) => p.id === saved.id);
                const detail = programDetails[saved.id];
                if (!program || !detail) return null;
                const { completed, total, percent } = getProgress(saved.id);
                const isDone = percent === 100;

                return (
                  <article
                    key={saved.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <div className="grid sm:grid-cols-[200px_1fr] md:grid-cols-[260px_1fr]">
                      {/* Image */}
                      <Link
                        to={`/workouts/${saved.id}`}
                        className="relative h-40 sm:h-full min-h-[160px] overflow-hidden block group"
                      >
                        <img
                          src={programImages[program.image]}
                          alt={t(program.nameKey)}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent sm:bg-gradient-to-r" />
                        {isDone && (
                          <div className="absolute top-3 left-3 inline-flex items-center gap-1 gradient-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                            <Trophy size={11} />
                            {t("myPrograms.completed")}
                          </div>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-condensed font-semibold uppercase tracking-wider text-primary block mb-1">
                              {t(program.levelKey)} · {program.daysPerWeek} {t("workouts.daysPerWeek")}
                            </span>
                            <Link
                              to={`/workouts/${saved.id}`}
                              className="text-lg sm:text-xl md:text-2xl font-heading text-foreground hover:text-primary transition-colors block leading-tight"
                            >
                              {t(program.nameKey)}
                            </Link>
                          </div>
                          <button
                            onClick={() => removeProgram(saved.id)}
                            aria-label={t("myPrograms.remove")}
                            className="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive transition-colors touch-manipulation rounded-lg hover:bg-secondary"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
                              {t("myPrograms.progress")}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-primary">
                              {completed}/{total} · {percent}%
                            </span>
                          </div>
                          <Progress value={percent} className="h-2" />
                        </div>

                        {/* Day toggles */}
                        <div className="flex gap-1.5 flex-wrap">
                          {detail.days.map((d, i) => {
                            const done = saved.completedDays.includes(d.dayKey);
                            return (
                              <button
                                key={d.dayKey}
                                onClick={() => toggleDay(saved.id, d.dayKey)}
                                className={`group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-condensed font-semibold uppercase tracking-wider transition-all touch-manipulation ${
                                  done
                                    ? "bg-primary/10 border-primary/40 text-primary"
                                    : "bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                                }`}
                                aria-pressed={done}
                              >
                                {done ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                                {t("pdetail.day")} {i + 1}
                              </button>
                            );
                          })}
                        </div>

                        <Link
                          to={`/workouts/${saved.id}`}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-condensed font-bold uppercase tracking-wider text-primary hover:gap-2 transition-all"
                        >
                          {t("myPrograms.viewProgram")}
                          <ChevronRight size={14} className={dir === "rtl" ? "rotate-180" : ""} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyProgramsPage;
