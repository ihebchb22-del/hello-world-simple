import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/i18n";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title={
          language === "fr" ? "Page Non Trouvée | Muscle Factory®"
          : language === "ar" ? "الصفحة غير موجودة | Muscle Factory®"
          : "Page Not Found | Muscle Factory®"
        }
        description={
          language === "fr" ? "La page que vous recherchez n'existe pas ou a été déplacée."
          : language === "ar" ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
          : "The page you're looking for doesn't exist or has been moved."
        }
        noIndex={true}
      />
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="text-center">
          <h1 className="mb-4 text-6xl sm:text-8xl font-heading text-primary">404</h1>
          <p className="mb-4 text-lg sm:text-xl text-muted-foreground font-condensed">{t("notFound.message")}</p>
          <Link to="/" className="inline-flex gradient-gold px-6 py-3 text-sm font-condensed font-semibold uppercase tracking-wider text-primary-foreground rounded-lg hover:shadow-gold transition-all touch-manipulation">
            {t("notFound.backHome")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
