import { Link } from "react-router-dom";
import { blogPosts } from "@/data/products";
import { useI18n } from "@/i18n";
import { ScrollReveal } from "@/hooks/useScrollReveal";

import blogCreatine from "@/assets/blog-creatine.jpg";
import blogSteroids from "@/assets/blog-steroids.jpg";
import blogExercises from "@/assets/blog-exercises.jpg";
import blogPct from "@/assets/blog-pct.jpg";
import blogProteinTiming from "@/assets/blog-protein-timing.jpg";
import blogGymTools from "@/assets/blog-gym-tools.jpg";
import blogTrt from "@/assets/blog-trt.jpg";
import blogProteinCompare from "@/assets/blog-protein-compare.jpg";
import blogBulkingCutting from "@/assets/blog-bulking-cutting.jpg";

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
};

const BlogPreview = () => {
  const posts = blogPosts.slice(0, 6);
  const { t, dir } = useI18n();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="container py-8 sm:py-10 md:py-16" dir={dir}>
      <ScrollReveal>
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] sm:text-xs font-condensed font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 block">{t("blog.subtitle")}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground">{t("blog.title")}</h2>
            <p className="text-muted-foreground mt-2 font-condensed text-base sm:text-lg">{t("blog.description")}</p>
          </div>
          <Link to="/tips" className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider hover:gap-4 transition-all">
            {t("blog.viewAll")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rtl:rotate-180" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-4">
        {/* Featured large article */}
        <ScrollReveal direction="left">
          <Link
            to={`/tips#${featured.slug}`}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-gold block h-full touch-manipulation"
          >
            <div className="aspect-[16/9] overflow-hidden relative">
              <img src={blogImages[featured.slug]} alt={featured.title} loading="lazy" width={960} height={544} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rtl:left-auto rtl:right-2 sm:rtl:right-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded">{featured.category}</span>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-1.5 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">{featured.readTime} {t("blog.minRead")}</span>
              </div>
              <h3 className="font-condensed font-semibold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors leading-tight">{featured.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 line-clamp-2">{featured.excerpt}</p>
            </div>
          </Link>
        </ScrollReveal>

        {/* Stacked list */}
        <ScrollReveal direction="right">
          <div className="flex flex-col gap-2 sm:gap-3 h-full">
            {rest.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                to={`/tips#${post.slug}`}
                className="group flex gap-3 sm:gap-4 bg-card rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-gold flex-1 touch-manipulation"
              >
                <div className="w-24 sm:w-28 md:w-32 shrink-0 overflow-hidden">
                  {blogImages[post.slug] ? (
                    <img src={blogImages[post.slug]} alt={post.title} loading="lazy" width={256} height={160} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="font-heading text-sm text-muted-foreground/30">{post.category}</span>
                    </div>
                  )}
                </div>
                <div className="py-2.5 sm:py-3 pr-3 sm:pr-4 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-primary">{post.category}</span>
                    <span className="text-[8px] sm:text-[9px] text-muted-foreground">· {post.readTime} {t("blog.minRead")}</span>
                  </div>
                  <h4 className="font-condensed font-semibold text-foreground text-xs sm:text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-5 sm:mt-6 text-center md:hidden">
        <Link to="/tips" className="text-sm font-bold text-primary uppercase tracking-wider hover:underline touch-manipulation">
          {t("blog.viewAll")} →
        </Link>
      </div>
    </section>
  );
};

export default BlogPreview;
