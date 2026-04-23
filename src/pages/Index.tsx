import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import GoalSection from "@/components/GoalSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import FullCatalog from "@/components/FullCatalog";
import CTABanner from "@/components/CTABanner";
import BlogPreview from "@/components/BlogPreview";
import LandingCTAStrip from "@/components/LandingCTAStrip";
import LoadingScreen from "@/components/LoadingScreen";
import LiveOrderTicker from "@/components/LiveOrderTicker";
import TestimonialsSection from "@/components/TestimonialsSection";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/i18n";

const seoData = {
  en: {
    title: "Muscle Factory® Tunisia | Whey Protein, Creatine & Gym Equipment Tunis",
    description: "Tunisia's #1 fitness store — authentic whey protein, creatine, pre-workout, BCAA & gym equipment. Best prices in TND. Free delivery in Tunis, Sfax, Sousse over 50 TND.",
  },
  fr: {
    title: "Muscle Factory® Tunisie | Whey, Créatine & Équipement Musculation Tunis",
    description: "Le N°1 des suppléments en Tunisie — whey, créatine, pre-workout, BCAA et matériel de musculation authentiques. Meilleurs prix en TND. Livraison gratuite Tunis, Sfax, Sousse dès 50 TND.",
  },
  ar: {
    title: "Muscle Factory® تونس | بروتين واي وكرياتين ومعدات الجيم تونس",
    description: "المتجر رقم 1 للمكملات في تونس — بروتين واي، كرياتين، ما قبل التمرين ومعدات الجيم الأصلية. أفضل الأسعار بالدينار. توصيل مجاني تونس وصفاقس وسوسة فوق 50 دينار.",
  },
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);
  const { language } = useI18n();
  const seo = seoData[language] || seoData.en;

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonical="https://musclefactory.com/"
        language={language}
      />
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <Header />
      <main>
        <HeroSection />
        <GoalSection />
        <FeaturedProducts />
        <FullCatalog />
        <LandingCTAStrip />
        <CategoryGrid />
        <TestimonialsSection />
        <CTABanner />
        <BlogPreview />
      </main>
      <Footer />
      <LiveOrderTicker />
    </>
  );
};

export default Index;
