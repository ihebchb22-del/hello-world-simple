import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";

import goalBuildMuscle from "@/assets/goal-build-muscle.jpg";
import goalBurnFat from "@/assets/goal-burn-fat.jpg";
import goalBoostEnergy from "@/assets/goal-boost-energy.jpg";
import goalRecover from "@/assets/goal-recover.jpg";
import goalStayHealthy from "@/assets/goal-stay-healthy.jpg";
import goalGetStronger from "@/assets/goal-get-stronger.jpg";

const goals = [
  { key: "buildMuscle", image: goalBuildMuscle },
  { key: "burnFat", image: goalBurnFat },
  { key: "boostEnergy", image: goalBoostEnergy },
  { key: "recover", image: goalRecover },
  { key: "stayHealthy", image: goalStayHealthy },
  { key: "getStronger", image: goalGetStronger },
];

const GoalSection = () => {
  const { t, dir } = useI18n();

  return (
    <section className="container py-8 sm:py-10 md:py-16" dir={dir}>
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 block">{t("goals.subtitle")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground">{t("goals.title")}</h2>
          <p className="text-muted-foreground mt-2 font-condensed text-base sm:text-lg">{t("goals.description")}</p>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {goals.map((goal, i) => (
          <ScrollReveal key={goal.key} delay={i * 80} direction="up">
            <Link
              to={`/shop?goal=${goal.key}`}
              className="group relative block rounded-lg overflow-hidden aspect-[3/4] border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-gold sm:hover:-translate-y-2 touch-manipulation"
            >
              <img
                src={goal.image}
                alt={t(`goal.${goal.key}`)}
                loading="lazy"
                width={640}
                height={800}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                <h3 className="font-heading text-xs sm:text-sm md:text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                  {t(`goal.${goal.key}`).toUpperCase()}
                </h3>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-0.5 line-clamp-1 sm:line-clamp-2 hidden sm:block">{t(`goal.${goal.key}.desc`)}</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default GoalSection;
