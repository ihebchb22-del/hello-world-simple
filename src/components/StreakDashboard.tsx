import { Flame, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n";
import { useProgress } from "@/contexts/ProgressContext";

const StreakDashboard = () => {
  const { t, dir, language } = useI18n();
  const {
    getCurrentStreak,
    getLongestStreak,
    getThisWeekDays,
    getTotalSessions,
    getSessionsThisWeek,
  } = useProgress();

  const currentStreak = getCurrentStreak();
  const longestStreak = getLongestStreak();
  const weekDays = getThisWeekDays();
  const totalSessions = getTotalSessions();
  const weekCount = getSessionsThisWeek();

  // Localized day labels — Monday-first
  const dayLabels: Record<string, string[]> = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    fr: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    ar: ["إث", "ثل", "أر", "خم", "جم", "سب", "أح"],
  };
  const labels = dayLabels[language] || dayLabels.en;

  // Today's index (Monday=0..Sunday=6)
  const today = new Date();
  const todayIdx = (today.getDay() + 6) % 7;

  const stats = [
    {
      icon: Flame,
      label: t("streak.current"),
      value: currentStreak,
      suffix: currentStreak === 1 ? t("streak.day") : t("streak.days"),
      emoji: currentStreak >= 3 ? "🔥" : null,
      highlight: currentStreak >= 3,
    },
    {
      icon: Trophy,
      label: t("streak.longest"),
      value: longestStreak,
      suffix: longestStreak === 1 ? t("streak.day") : t("streak.days"),
      emoji: longestStreak >= 7 ? "🏆" : null,
      highlight: false,
    },
    {
      icon: Calendar,
      label: t("streak.thisWeek"),
      value: weekCount,
      suffix: t("streak.sessions"),
      emoji: weekCount >= 3 ? "⚡" : null,
      highlight: false,
    },
    {
      icon: CheckCircle2,
      label: t("streak.total"),
      value: totalSessions,
      suffix: t("streak.sessions"),
      emoji: null,
      highlight: false,
    },
  ];

  return (
    <section className="space-y-5 sm:space-y-6" dir={dir}>
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`relative bg-card border rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all overflow-hidden ${
                s.highlight
                  ? "border-primary/40 shadow-gold/10 shadow-lg"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {s.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
              )}
              <div className="relative flex items-center justify-between mb-2">
                <Icon
                  size={18}
                  className={s.highlight ? "text-primary" : "text-muted-foreground"}
                />
                {s.emoji && (
                  <span className="text-base sm:text-lg leading-none animate-pulse">
                    {s.emoji}
                  </span>
                )}
              </div>
              <p className="relative text-[9px] sm:text-[10px] font-condensed font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1.5">
                {s.label}
              </p>
              <div className="relative flex items-baseline gap-1.5">
                <span
                  className={`text-2xl sm:text-3xl font-heading leading-none ${
                    s.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
                  {s.value}
                </span>
                <span className="text-[10px] sm:text-xs font-condensed text-muted-foreground uppercase tracking-wider">
                  {s.suffix}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly calendar */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <h2 className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.2em] text-primary">
              {t("streak.weekTitle")}
            </h2>
          </div>
          <p className="text-[10px] sm:text-xs font-condensed text-muted-foreground uppercase tracking-wider">
            {weekCount} / 7 {t("streak.days")}
          </p>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekDays.map((done, i) => {
            const isToday = i === todayIdx;
            const isFuture = i > todayIdx;
            return (
              <div
                key={i}
                className={`relative flex flex-col items-center justify-center aspect-square rounded-lg border transition-all ${
                  done
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : isToday
                    ? "bg-background border-primary/40 border-dashed text-foreground"
                    : isFuture
                    ? "bg-background/30 border-border/50 text-muted-foreground/50"
                    : "bg-background border-border text-muted-foreground"
                }`}
                aria-label={`${labels[i]}${done ? " · completed" : ""}`}
              >
                <span className="text-[9px] sm:text-[10px] font-condensed font-bold uppercase tracking-wider leading-none">
                  {labels[i]}
                </span>
                <div className="mt-1.5 sm:mt-2 flex items-center justify-center">
                  {done ? (
                    <span className="text-base sm:text-lg leading-none">🔥</span>
                  ) : (
                    <span
                      className={`block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        isToday ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
                {isToday && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
            );
          })}
        </div>

        {currentStreak > 0 && (
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-foreground/80 font-condensed text-center">
            <span className="font-bold text-primary">🔥 {currentStreak}</span>{" "}
            {t("streak.message")}
          </p>
        )}
        {currentStreak === 0 && totalSessions > 0 && (
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-muted-foreground font-condensed text-center italic">
            {t("streak.restart")}
          </p>
        )}
      </div>
    </section>
  );
};

export default StreakDashboard;
