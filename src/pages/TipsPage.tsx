import Header from "@/components/Header";
import { useParallax } from "@/hooks/useParallax";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/products";
import { useI18n } from "@/i18n";
import SEOHead from "@/components/SEOHead";
import heroTips from "@/assets/hero-tips.jpg";

import blogCreatine from "@/assets/blog-creatine.jpg";
import blogSteroids from "@/assets/blog-steroids.jpg";
import blogExercises from "@/assets/blog-exercises.jpg";
import blogPct from "@/assets/blog-pct.jpg";
import blogProteinTiming from "@/assets/blog-protein-timing.jpg";
import blogGymTools from "@/assets/blog-gym-tools.jpg";
import blogTrt from "@/assets/blog-trt.jpg";
import blogProteinCompare from "@/assets/blog-protein-compare.jpg";
import blogBulkingCutting from "@/assets/blog-bulking-cutting.jpg";
import blogSarms from "@/assets/blog-sarms.jpg";
import blogSleep from "@/assets/blog-sleep.jpg";
import blogStacking from "@/assets/blog-stacking.jpg";
import blogHgh from "@/assets/blog-hgh.jpg";
import blogMealprep from "@/assets/blog-mealprep.jpg";
import blogHomegym from "@/assets/blog-homegym.jpg";
import blogPreworkoutGuide from "@/assets/blog-preworkout-guide.jpg";
import blogFasting from "@/assets/blog-fasting.jpg";
import blogMobility from "@/assets/blog-mobility.jpg";
import blogMindset from "@/assets/blog-mindset.jpg";
import blogHydration from "@/assets/blog-hydration.jpg";
import blogProgressiveOverload from "@/assets/blog-progressive-overload.jpg";
import blogGvt from "@/assets/blog-gvt.jpg";
import blog531 from "@/assets/blog-531.jpg";
import blogYoga from "@/assets/blog-yoga.jpg";
import blogSprint from "@/assets/blog-sprint.jpg";
import blogBestExercises from "@/assets/blog-best-exercises.jpg";
import blogElectrolytes from "@/assets/blog-electrolytes.jpg";
import blogChestTraining from "@/assets/blog-chest-training.jpg";
import blogBackTraining from "@/assets/blog-back-training.jpg";
import blogLegTraining from "@/assets/blog-leg-training.jpg";
import blogShoulderTraining from "@/assets/blog-shoulder-training.jpg";
import blogArmTraining from "@/assets/blog-arm-training.jpg";
import blogCoreTraining from "@/assets/blog-core-training.jpg";
import blogGluteTraining from "@/assets/blog-glute-training.jpg";
import blogWarmupStretching from "@/assets/blog-warmup-stretching.jpg";
import blogBeginnerMistakes from "@/assets/blog-beginner-mistakes.jpg";
import blogTestEnanthate from "@/assets/blog-test-enanthate.jpg";
import blogAnavar from "@/assets/blog-anavar.jpg";
import blogClenbuterol from "@/assets/blog-clenbuterol.jpg";
import blogDianabol from "@/assets/blog-dianabol.jpg";
import blogTrenbolone from "@/assets/blog-trenbolone.jpg";
import blogTunisiaGym from "@/assets/blog-tunisia-gym.jpg";

const blogImages: Record<string, string> = {
  "ultimate-guide-creatine": blogCreatine,
  "understanding-anabolic-steroids": blogSteroids,
  "top-compound-exercises-muscle-growth": blogExercises,
  "pct-post-cycle-therapy-guide": blogPct,
  "protein-timing-does-it-matter": blogProteinTiming,
  "essential-gym-tools-2026": blogGymTools,
  "trt-testosterone-replacement-therapy": blogTrt,
  "whey-vs-casein-vs-plant-protein": blogProteinCompare,
  "bulking-vs-cutting-nutrition": blogBulkingCutting,
  "sarms-vs-steroids-comparison": blogSarms,
  "sleep-muscle-recovery-science": blogSleep,
  "beginners-guide-supplement-stacking": blogStacking,
  "hgh-growth-hormone-explained": blogHgh,
  "meal-prep-bodybuilders-weekly": blogMealprep,
  "home-gym-equipment-guide": blogHomegym,
  "guide-complet-pre-workout": blogPreworkoutGuide,
  "jeune-intermittent-musculation": blogFasting,
  "mobilite-etirements-musculation": blogMobility,
  "mindset-athlete-psychologie-performance": blogMindset,
  "hydratation-performance-sportive": blogHydration,
  "surcharge-progressive-croissance-musculaire": blogProgressiveOverload,
  "german-volume-training-guide": blogGvt,
  "programme-531-wendler-force": blog531,
  "yoga-musculation-flexibilite": blogYoga,
  "sprint-training-bruleur-graisses": blogSprint,
  "meilleurs-exercices-par-muscle": blogBestExercises,
  "electrolytes-sport-hydratation": blogElectrolytes,
  "chest-training-guide-complet": blogChestTraining,
  "back-training-guide-complet": blogBackTraining,
  "leg-training-guide-complet": blogLegTraining,
  "shoulder-training-guide-complet": blogShoulderTraining,
  "arm-training-guide-complet": blogArmTraining,
  "core-training-guide-complet": blogCoreTraining,
  "glute-training-guide-complet": blogGluteTraining,
  "warmup-stretching-routine-guide": blogWarmupStretching,
  "beginner-mistakes-musculation": blogBeginnerMistakes,
  "test-enanthate-cycle-guide-tunisie": blogTestEnanthate,
  "anavar-oxandrolone-cutting-guide": blogAnavar,
  "clenbuterol-fat-burner-guide": blogClenbuterol,
  "dianabol-methandrostenolone-bulking": blogDianabol,
  "trenbolone-acetate-enanthate-guide": blogTrenbolone,
  "sarms-ostarine-rad140-lgd4033-guide": blogTrenbolone,
  "peptides-bpc157-tb500-ipamorelin": blogTestEnanthate,
  "insuline-musculation-danger-guide": blogTestEnanthate,
  "musculation-tunisie-guide-complet": blogTunisiaGym,
  "musculation-ramadan-guide-tunisie": blogTunisiaGym,
  "musculation-femme-guide-complet": blogTunisiaGym,
  "whey-protein-tunisie-comparatif": blogTunisiaGym,
  "creatine-tunisie-prix-alternatives": blogTunisiaGym,
  "prise-masse-tunisien-budget": blogTunisiaGym,
};

const TipsPage = () => {
  const { t, dir, language } = useI18n();
  const parallax = useParallax(0.3);

  const categories = [
    t("tips.all"),
    t("tips.supplements"),
    t("tips.gearGuide"),
    t("tips.training"),
    t("tips.nutrition"),
    t("tips.equipment"),
  ];

  return (
    <>
      <SEOHead
        title={
          language === "fr" ? "Guides Fitness & Conseils Experts | Muscle Factory®"
          : language === "ar" ? "أدلة اللياقة ونصائح الخبراء | Muscle Factory®"
          : "Fitness Guides & Expert Tips | Muscle Factory®"
        }
        description={
          language === "fr" ? "Lisez des guides experts sur les suppléments, l'entraînement, la nutrition et le gear. Conseils scientifiques pour la prise de masse, la sèche et la performance."
          : language === "ar" ? "اقرأ أدلة الخبراء حول المكملات والتدريب والتغذية. نصائح علمية للتضخيم والتنشيف والأداء."
          : "Read expert guides on supplements, training, nutrition, and gear. Science-backed tips for bulking, cutting, and performance."
        }
        canonical="https://musclefactory.com/tips"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Muscle Factory Expert Guides",
          "description": "Science-backed fitness guides, supplement reviews, and training tips.",
          "url": "https://musclefactory.com/tips",
          "publisher": { "@type": "Organization", "name": "Muscle Factory" },
          "inLanguage": [language],
        }}
      />
      <Header />
      <main className="min-h-screen" dir={dir}>
        <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
          <img ref={parallax.ref} style={parallax.style} src={heroTips} alt={t("tips.title")} className="absolute inset-0 w-full h-full object-cover scale-[1.2]" width={1920} height={640} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="container relative px-5">
            <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 sm:mb-3 block">
              {t("blog.subtitle")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading text-foreground">{t("tips.title")}</h1>
            <p className="text-muted-foreground mt-2 sm:mt-3 font-condensed text-base sm:text-lg max-w-2xl">
              {t("tips.subtitle")}
            </p>
          </div>
        </section>

        <div className="container py-8 sm:py-12 px-5">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-wider rounded-lg bg-secondary text-secondary-foreground hover:bg-muted hover:scale-105 transition-all duration-200 whitespace-nowrap touch-manipulation"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article */}
          <article id={blogPosts[0].slug} className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden mb-8 sm:mb-12 hover:border-primary/30 transition-all duration-300 hover:shadow-gold">
            <div className="md:flex">
              <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                <img
                  src={blogImages[blogPosts[0].slug]}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  width={960}
                  height={540}
                />
              </div>
              <div className="md:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">{blogPosts[0].category}</span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground font-condensed">{blogPosts[0].readTime} {t("tips.minRead")}</span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground font-condensed hidden sm:inline">{blogPosts[0].date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading text-foreground leading-tight">{blogPosts[0].title.toUpperCase()}</h2>
                <p className="text-sm text-muted-foreground mt-3 sm:mt-4 leading-relaxed line-clamp-3 sm:line-clamp-none">{blogPosts[0].excerpt}</p>
                <span className="inline-block mt-4 sm:mt-6 text-xs sm:text-sm font-bold text-primary uppercase tracking-wider hover:underline cursor-pointer font-condensed touch-manipulation">
                  {t("tips.readFullGuide")} →
                </span>
              </div>
            </div>
          </article>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                id={post.slug}
                className="group bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blogImages[post.slug]}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">{post.category}</span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-condensed">{post.readTime} {t("tips.minRead")} · {post.date}</span>
                  </div>
                  <h3 className="font-condensed font-semibold text-foreground leading-tight text-base sm:text-lg line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>
                  <span className="inline-block mt-3 sm:mt-4 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider hover:underline cursor-pointer font-condensed touch-manipulation">
                    {t("tips.readMore")} →
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 sm:mt-16 p-5 sm:p-6 md:p-8 bg-secondary/50 rounded-xl sm:rounded-2xl border border-border">
            <h3 className="font-heading text-base sm:text-lg text-foreground mb-2 sm:mb-3">{t("tips.disclaimer")}</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
              {t("tips.disclaimerText")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TipsPage;
