import { Star, ShieldCheck, Truck, Wallet, Headphones } from "lucide-react";
import { useI18n } from "@/i18n";

const TestimonialsSection = () => {
  const { t, dir } = useI18n();

  const testimonials = [
    { id: "t1", initial: "A" },
    { id: "t2", initial: "Y" },
    { id: "t3", initial: "M" },
  ];

  const trustItems = [
    { icon: ShieldCheck, title: t("trust.authentic"), desc: t("trust.authenticDesc") },
    { icon: Truck, title: t("trust.delivery"), desc: t("trust.deliveryDesc") },
    { icon: Wallet, title: t("trust.payment"), desc: t("trust.paymentDesc") },
    { icon: Headphones, title: t("trust.support"), desc: t("trust.supportDesc") },
  ];

  return (
    <section
      className="relative py-16 sm:py-24 bg-gradient-to-b from-background via-card/30 to-background overflow-hidden"
      dir={dir}
      aria-label={t("testimonials.title")}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="container px-5 relative">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-xs font-condensed font-bold uppercase tracking-[0.3em] text-primary block mb-3">
            {t("testimonials.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-foreground leading-[0.95]">
            {t("testimonials.title")}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground font-condensed">
            {t("testimonials.description")}
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {testimonials.map((tm) => (
            <article
              key={tm.id}
              className="group relative bg-card border border-border rounded-2xl p-6 sm:p-7 hover:border-primary/30 transition-all duration-300 hover:shadow-gold/10 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-6 italic">
                "{t(`testimonials.${tm.id}.text`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {tm.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {t(`testimonials.${tm.id}.name`)}
                  </p>
                  <p className="text-[11px] sm:text-xs font-condensed text-muted-foreground uppercase tracking-wider truncate">
                    {t(`testimonials.${tm.id}.role`)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-5 flex items-start gap-3 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] sm:text-xs font-condensed text-muted-foreground mt-0.5 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
