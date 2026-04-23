import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { extraTranslations } from "./translations-extra";
import { workoutTranslations } from "./translations-workouts";
import { programDetailTranslations } from "./translations-program-detail";

export type Language = "en" | "fr" | "ar";

type Translations = Record<string, Record<Language, string>>;

const baseTranslations: Translations = {
  // Header / Nav
  "nav.shop": { en: "Shop", fr: "Boutique", ar: "تسوق" },
  "nav.supplements": { en: "Supplements", fr: "Suppléments", ar: "مكملات" },
  "nav.equipment": { en: "Equipment", fr: "Équipement", ar: "معدات" },
  "nav.tips": { en: "Tips & Guides", fr: "Conseils & Guides", ar: "نصائح ودلائل" },
  "nav.deals": { en: "Deals", fr: "Offres", ar: "عروض" },
  "header.promo": {
    en: "Free Shipping on Orders Over 50 TND · Use Code MUSCLE10 for 10% Off",
    fr: "Livraison Gratuite dès 50 TND · Code MUSCLE10 pour -10%",
    ar: "شحن مجاني للطلبات فوق 50 TND · استخدم كود MUSCLE10 للحصول على خصم 10%",
  },

  // Hero
  "hero.tagline": { en: "Est. 2024 — Premium Fitness", fr: "Est. 2024 — Fitness Premium", ar: "تأسست 2024 — لياقة متميزة" },
  "hero.title1": { en: "BUILT", fr: "CONÇU", ar: "صُنع" },
  "hero.title2": { en: "FOR THE", fr: "POUR LES", ar: "من أجل" },
  "hero.title3": { en: "RELENTLESS", fr: "IMPLACABLES", ar: "العزيمة" },
  "hero.description": {
    en: "Science-backed supplements & premium equipment for every athlete. No shortcuts — just results.",
    fr: "Suppléments scientifiques & équipement premium pour chaque athlète. Pas de raccourcis — que des résultats.",
    ar: "مكملات مدعومة علمياً ومعدات متميزة لكل رياضي. بدون اختصارات — فقط نتائج.",
  },
  "hero.shop": { en: "Shop Collection", fr: "Voir la Collection", ar: "تسوق المجموعة" },
  "hero.guides": { en: "Expert Guides", fr: "Guides Experts", ar: "أدلة الخبراء" },
  "hero.stat1": { en: "Athletes Trust Us", fr: "Athlètes Nous Font Confiance", ar: "رياضي يثقون بنا" },
  "hero.stat2": { en: "Products", fr: "Produits", ar: "منتج" },
  "hero.stat3": { en: "Satisfaction", fr: "Satisfaction", ar: "رضا العملاء" },
  "hero.delivery": { en: "Free shipping on all orders over 50 TND", fr: "Livraison gratuite dès 50 TND", ar: "شحن مجاني لجميع الطلبات فوق 50 TND" },
  "hero.fastDelivery": { en: "Fast Delivery", fr: "Livraison Rapide", ar: "توصيل سريع" },
  "hero.explore": { en: "Explore", fr: "Explorer", ar: "استكشف" },
  "hero.buildPack": { en: "Build My Pack", fr: "Composer Mon Pack", ar: "كوّن حزمتي" },
  "hero.scroll": { en: "Scroll", fr: "Défiler", ar: "مرّر" },
  "hero.statAthletes": { en: "Athletes Trust Us", fr: "Athlètes Nous Suivent", ar: "رياضي يثقون بنا" },
  "hero.statRating": { en: "Verified Reviews", fr: "Avis Vérifiés", ar: "تقييمات موثقة" },
  "hero.statDelivery": { en: "Delivery Tunisia", fr: "Livraison Tunisie", ar: "توصيل تونس" },

  // Goals
  "goals.subtitle": { en: "What's Your Mission?", fr: "Quelle Est Votre Mission?", ar: "ما هي مهمتك؟" },
  "goals.title": { en: "CHOOSE YOUR GOAL", fr: "CHOISISSEZ VOTRE OBJECTIF", ar: "اختر هدفك" },
  "goals.description": { en: "Find the perfect supplements for your fitness journey", fr: "Trouvez les suppléments parfaits pour votre parcours fitness", ar: "اعثر على المكملات المثالية لرحلتك الرياضية" },
  "goal.buildMuscle": { en: "Build Muscle", fr: "Prise de Masse", ar: "بناء العضلات" },
  "goal.buildMuscle.desc": { en: "Protein, Creatine & Mass Gainers", fr: "Protéines, Créatine & Gainers", ar: "بروتين، كرياتين ومكملات الكتلة" },
  "goal.burnFat": { en: "Burn Fat", fr: "Brûler les Graisses", ar: "حرق الدهون" },
  "goal.burnFat.desc": { en: "Fat Burners, CLA & L-Carnitine", fr: "Brûleurs, CLA & L-Carnitine", ar: "حارق دهون، CLA و L-كارنيتين" },
  "goal.boostEnergy": { en: "Boost Energy", fr: "Boost d'Énergie", ar: "تعزيز الطاقة" },
  "goal.boostEnergy.desc": { en: "Pre-Workout & Caffeine", fr: "Pré-Entraînement & Caféine", ar: "ما قبل التمرين والكافيين" },
  "goal.recover": { en: "Recover Faster", fr: "Récupérer Plus Vite", ar: "تعافي أسرع" },
  "goal.recover.desc": { en: "BCAAs, Glutamine & EAAs", fr: "BCAAs, Glutamine & EAAs", ar: "أحماض أمينية وجلوتامين" },
  "goal.stayHealthy": { en: "Stay Healthy", fr: "Rester en Forme", ar: "حافظ على صحتك" },
  "goal.stayHealthy.desc": { en: "Vitamins, Omega-3 & Immunity", fr: "Vitamines, Oméga-3 & Immunité", ar: "فيتامينات، أوميغا-3 والمناعة" },
  "goal.getStronger": { en: "Get Stronger", fr: "Devenir Plus Fort", ar: "كن أقوى" },
  "goal.getStronger.desc": { en: "Creatine, Test Boosters & ZMA", fr: "Créatine, Boosters & ZMA", ar: "كرياتين، معززات و ZMA" },

  // Categories
  "categories.subtitle": { en: "Browse Collection", fr: "Parcourir la Collection", ar: "تصفح المجموعة" },
  "categories.title": { en: "SHOP BY CATEGORY", fr: "ACHETER PAR CATÉGORIE", ar: "تسوق حسب الفئة" },
  "categories.description": { en: "Everything you need to build your best physique", fr: "Tout ce dont vous avez besoin pour votre physique idéal", ar: "كل ما تحتاجه لبناء أفضل جسم" },
  "categories.shopNow": { en: "Shop Now", fr: "Acheter", ar: "تسوق الآن" },
  "categories.products": { en: "Products", fr: "Produits", ar: "منتج" },

  // Featured
  "featured.subtitle": { en: "Most Popular", fr: "Les Plus Populaires", ar: "الأكثر شعبية" },
  "featured.title": { en: "BEST SELLERS", fr: "MEILLEURES VENTES", ar: "الأكثر مبيعاً" },
  "featured.description": { en: "Top products trusted by athletes worldwide", fr: "Top produits approuvés par les athlètes", ar: "أفضل المنتجات الموثوقة من الرياضيين" },
  "featured.viewAll": { en: "View All Products", fr: "Voir Tous les Produits", ar: "عرض جميع المنتجات" },

  // Full Catalog
  "catalog.subtitle": { en: "Complete Collection", fr: "Collection Complète", ar: "المجموعة الكاملة" },
  "catalog.title": { en: "MORE PRODUCTS", fr: "PLUS DE PRODUITS", ar: "المزيد من المنتجات" },
  "catalog.description": { en: "Explore our full range of supplements, recovery, and performance products", fr: "Explorez notre gamme complète de suppléments, récupération et performance", ar: "استكشف مجموعتنا الكاملة من المكملات والتعافي والأداء" },


  // CTA
  "cta.title": { en: "FUEL YOUR AMBITION", fr: "ALIMENTEZ VOTRE AMBITION", ar: "غذِّ طموحك" },
  "cta.description": {
    en: "Join thousands of athletes who trust Muscle Factory for their fitness journey. New members get 15% off their first order.",
    fr: "Rejoignez des milliers d'athlètes qui font confiance à Muscle Factory. Les nouveaux membres bénéficient de -15% sur leur première commande.",
    ar: "انضم إلى آلاف الرياضيين الذين يثقون بـ Muscle Factory. الأعضاء الجدد يحصلون على خصم 15% على طلبهم الأول.",
  },
  "cta.shop": { en: "Start Shopping", fr: "Commencer vos Achats", ar: "ابدأ التسوق" },
  "cta.guides": { en: "Read Expert Guides", fr: "Lire les Guides", ar: "اقرأ أدلة الخبراء" },

  // Blog
  "blog.subtitle": { en: "Learn & Grow", fr: "Apprendre & Progresser", ar: "تعلم وتطور" },
  "blog.title": { en: "EXPERT GUIDES", fr: "GUIDES EXPERTS", ar: "أدلة الخبراء" },
  "blog.description": { en: "Tips on supplements, gear, training & nutrition", fr: "Conseils sur les suppléments, le gear, l'entraînement & la nutrition", ar: "نصائح حول المكملات والمعدات والتدريب والتغذية" },
  "blog.viewAll": { en: "View All Guides", fr: "Voir Tous les Guides", ar: "عرض جميع الأدلة" },
  "blog.readMore": { en: "Read More", fr: "Lire Plus", ar: "اقرأ المزيد" },
  "blog.minRead": { en: "min read", fr: "min de lecture", ar: "دقيقة قراءة" },

  // Footer
  "footer.description": {
    en: "Premium fitness supplements, equipment, and expert guidance for athletes of all levels. Fuel your potential with Muscle Factory.",
    fr: "Suppléments fitness premium, équipement et conseils experts pour les athlètes de tous niveaux. Alimentez votre potentiel avec Muscle Factory.",
    ar: "مكملات لياقة بدنية متميزة ومعدات وإرشادات خبراء للرياضيين من جميع المستويات. غذِّ إمكاناتك مع Muscle Factory.",
  },
  "footer.shop": { en: "SHOP", fr: "BOUTIQUE", ar: "تسوق" },
  "footer.resources": { en: "RESOURCES", fr: "RESSOURCES", ar: "الموارد" },
  "footer.support": { en: "SUPPORT", fr: "ASSISTANCE", ar: "الدعم" },
  "footer.subscribe": { en: "Subscribe for exclusive deals", fr: "Abonnez-vous pour des offres exclusives", ar: "اشترك للحصول على عروض حصرية" },
  "footer.emailPlaceholder": { en: "Email address", fr: "Adresse email", ar: "البريد الإلكتروني" },
  "footer.join": { en: "Join", fr: "Rejoindre", ar: "انضم" },
  "footer.rights": { en: "© 2026 Muscle Factory®. All rights reserved.", fr: "© 2026 Muscle Factory®. Tous droits réservés.", ar: "© 2026 Muscle Factory®. جميع الحقوق محفوظة." },

  // Footer links
  "footer.proteins": { en: "Proteins", fr: "Protéines", ar: "البروتينات" },
  "footer.preWorkout": { en: "Pre-Workout", fr: "Pré-Entraînement", ar: "ما قبل التمرين" },
  "footer.creatine": { en: "Creatine", fr: "Créatine", ar: "كرياتين" },
  "footer.bcaas": { en: "BCAAs & Aminos", fr: "BCAAs & Acides Aminés", ar: "أحماض أمينية" },
  "footer.vitamins": { en: "Vitamins & Health", fr: "Vitamines & Santé", ar: "فيتامينات وصحة" },
  "footer.fatBurners": { en: "Fat Burners", fr: "Brûleurs de Graisses", ar: "حارقات الدهون" },
  "footer.equipment": { en: "Equipment", fr: "Équipement", ar: "معدات" },
  "footer.apparel": { en: "Apparel", fr: "Vêtements", ar: "ملابس" },
  "footer.suppGuides": { en: "Supplement Guides", fr: "Guides Suppléments", ar: "أدلة المكملات" },
  "footer.gearTips": { en: "Gear & Steroid Tips", fr: "Conseils Gear & Stéroïdes", ar: "نصائح المعدات والستيرويد" },
  "footer.exerciseLib": { en: "Exercise Library", fr: "Bibliothèque d'Exercices", ar: "مكتبة التمارين" },
  "footer.nutritionPlans": { en: "Nutrition Plans", fr: "Plans Nutritionnels", ar: "خطط التغذية" },
  "footer.blog": { en: "Blog", fr: "Blog", ar: "المدونة" },
  "footer.faq": { en: "FAQ", fr: "FAQ", ar: "الأسئلة الشائعة" },
  "footer.contact": { en: "Contact Us", fr: "Contactez-nous", ar: "اتصل بنا" },
  "footer.shipping": { en: "Shipping & Returns", fr: "Livraison & Retours", ar: "الشحن والإرجاع" },
  "footer.trackOrder": { en: "Track Order", fr: "Suivre Commande", ar: "تتبع الطلب" },
  "footer.sizeGuide": { en: "Size Guide", fr: "Guide des Tailles", ar: "دليل المقاسات" },
  "footer.privacy": { en: "Privacy Policy", fr: "Politique de Confidentialité", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms & Conditions", fr: "Conditions Générales", ar: "الشروط والأحكام" },

  // Shop page
  "shop.title": { en: "ALL PRODUCTS", fr: "TOUS LES PRODUITS", ar: "جميع المنتجات" },
  "shop.subtitle": { en: "Browse our complete collection of premium supplements & gear", fr: "Parcourez notre collection complète de suppléments & équipements premium", ar: "تصفح مجموعتنا الكاملة من المكملات والمعدات المتميزة" },
  "shop.all": { en: "All", fr: "Tout", ar: "الكل" },
  "shop.featured": { en: "Featured", fr: "En Vedette", ar: "مميز" },
  "shop.priceLow": { en: "Price: Low to High", fr: "Prix: Croissant", ar: "السعر: من الأقل" },
  "shop.priceHigh": { en: "Price: High to Low", fr: "Prix: Décroissant", ar: "السعر: من الأعلى" },
  "shop.rating": { en: "Rating", fr: "Note", ar: "التقييم" },
  "shop.productsFound": { en: "products found", fr: "produits trouvés", ar: "منتجات" },
  "shop.viewProduct": { en: "View Product", fr: "Voir le Produit", ar: "عرض المنتج" },

  // Product detail
  "product.addToCart": { en: "Add to Cart", fr: "Ajouter au Panier", ar: "أضف إلى السلة" },
  "product.buyNow": { en: "Buy Now", fr: "Acheter Maintenant", ar: "اشتري الآن" },
  "product.features": { en: "Key Features", fr: "Caractéristiques", ar: "الميزات الرئيسية" },
  "product.related": { en: "YOU MAY ALSO LIKE", fr: "VOUS AIMEREZ AUSSI", ar: "قد يعجبك أيضاً" },
  "product.flavor": { en: "Flavor", fr: "Saveur", ar: "النكهة" },
  "product.servings": { en: "servings", fr: "portions", ar: "حصة" },
  "product.notFound": { en: "PRODUCT NOT FOUND", fr: "PRODUIT NON TROUVÉ", ar: "المنتج غير موجود" },
  "product.backToShop": { en: "Back to Shop", fr: "Retour à la Boutique", ar: "العودة للمتجر" },
  "product.home": { en: "Home", fr: "Accueil", ar: "الرئيسية" },
  "product.reviews": { en: "reviews", fr: "avis", ar: "تقييمات" },
  "product.save": { en: "SAVE", fr: "ÉCONOMISEZ", ar: "وفّر" },
  "product.freeShipping": { en: "Free Shipping 50+ TND", fr: "Livraison Gratuite dès 50 TND", ar: "شحن مجاني +50 TND" },
  "product.returns": { en: "30-Day Returns", fr: "Retours 30 Jours", ar: "إرجاع خلال 30 يوم" },
  "product.labTested": { en: "Lab Tested", fr: "Testé en Laboratoire", ar: "مختبر معملياً" },
  "product.secureCheckout": { en: "Secure Checkout", fr: "Paiement Sécurisé", ar: "دفع آمن" },

  // Tips page
  "tips.title": { en: "EXPERT GUIDES & TIPS", fr: "GUIDES EXPERTS & CONSEILS", ar: "أدلة الخبراء والنصائح" },
  "tips.subtitle": {
    en: "Science-backed advice on supplements, gear, steroids, nutrition, training, and equipment — everything you need to train smarter.",
    fr: "Conseils scientifiques sur les suppléments, le gear, les stéroïdes, la nutrition, l'entraînement et l'équipement — tout pour s'entraîner plus intelligemment.",
    ar: "نصائح مدعومة علمياً حول المكملات والمعدات والستيرويدات والتغذية والتدريب — كل ما تحتاجه للتدريب بذكاء.",
  },
  "tips.all": { en: "All", fr: "Tout", ar: "الكل" },
  "tips.supplements": { en: "Supplements", fr: "Suppléments", ar: "مكملات" },
  "tips.gearGuide": { en: "Gear Guide", fr: "Guide Gear", ar: "دليل المعدات" },
  "tips.training": { en: "Training", fr: "Entraînement", ar: "تدريب" },
  "tips.nutrition": { en: "Nutrition", fr: "Nutrition", ar: "تغذية" },
  "tips.equipment": { en: "Equipment", fr: "Équipement", ar: "معدات" },
  "tips.featured": { en: "FEATURED", fr: "EN VEDETTE", ar: "مميز" },
  "tips.readFullGuide": { en: "Read Full Guide", fr: "Lire le Guide Complet", ar: "اقرأ الدليل الكامل" },
  "tips.minRead": { en: "min read", fr: "min de lecture", ar: "دقيقة قراءة" },
  "tips.readMore": { en: "Read More", fr: "Lire Plus", ar: "اقرأ المزيد" },
  "tips.disclaimer": { en: "DISCLAIMER", fr: "AVERTISSEMENT", ar: "تنبيه" },
  "tips.disclaimerText": {
    en: "The information provided in our gear and steroid guides is for educational purposes only. We do not promote or condone the use of illegal substances. Always consult a qualified healthcare professional before starting any supplement regimen or performance-enhancing protocol. The use of anabolic steroids carries significant health risks and may be illegal in your jurisdiction.",
    fr: "Les informations fournies dans nos guides sur le gear et les stéroïdes sont à titre éducatif uniquement. Nous ne promouvons ni ne cautionnons l'utilisation de substances illégales. Consultez toujours un professionnel de santé qualifié avant de commencer tout régime de suppléments ou protocole d'amélioration des performances.",
    ar: "المعلومات المقدمة في أدلة المعدات والستيرويدات هي لأغراض تعليمية فقط. نحن لا نروج أو نتغاضى عن استخدام المواد غير القانونية. استشر دائماً أخصائي رعاية صحية مؤهل قبل البدء في أي نظام مكملات أو بروتوكول تعزيز الأداء.",
  },

  // Loading
  "loading.assets": { en: "Loading Assets", fr: "Chargement", ar: "تحميل الملفات" },
  "loading.preparing": { en: "Preparing Store", fr: "Préparation du Magasin", ar: "تحضير المتجر" },
  "loading.almost": { en: "Almost Ready", fr: "Presque Prêt", ar: "جاهز تقريباً" },
  "loading.welcome": { en: "Welcome", fr: "Bienvenue", ar: "مرحباً" },

  // Search
  "search.placeholder": { en: "Search supplements, equipment, guides...", fr: "Rechercher suppléments, équipement, guides...", ar: "ابحث عن المكملات، المعدات، الأدلة..." },

  // Not Found
  "notFound.title": { en: "PAGE NOT FOUND", fr: "PAGE NON TROUVÉE", ar: "الصفحة غير موجودة" },
  "notFound.description": { en: "The page you're looking for doesn't exist or has been moved.", fr: "La page que vous recherchez n'existe pas ou a été déplacée.", ar: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." },
  "notFound.backHome": { en: "Back to Home", fr: "Retour à l'Accueil", ar: "العودة للرئيسية" },
  "notFound.shopNow": { en: "Shop Now", fr: "Acheter Maintenant", ar: "تسوق الآن" },
};

const translations: Translations = { ...baseTranslations, ...extraTranslations, ...workoutTranslations, ...programDetailTranslations };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key: string) => key,
  dir: "ltr",
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1) URL ?lang= takes priority (so Google hreflang URLs work on web)
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang") as Language | null;
        if (urlLang && ["en", "fr", "ar"].includes(urlLang)) {
          try { localStorage.setItem("mf-lang", urlLang); } catch { /* ignore */ }
          return urlLang;
        }
      } catch { /* ignore */ }
    }
    // 2) Saved preference (sync read from localStorage — works in WebView too)
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("mf-lang") : null;
      if (saved && ["en", "fr", "ar"].includes(saved)) return saved as Language;
    } catch { /* ignore */ }
    return "fr";
  });

  // 3) Native fallback hydration: on Android/iOS, also check Capacitor
  //    Preferences (survives WebView cache clears better than localStorage alone).
  useEffect(() => {
    let cancelled = false;

    const hydrateNativeLanguage = async () => {
      try {
        if (!Capacitor.isNativePlatform()) return;
        const { value } = await Preferences.get({ key: "mf-lang" });
        if (cancelled) return;

        if (value && ["en", "fr", "ar"].includes(value) && value !== language) {
          setLanguageState(value as Language);
        } else if (!value) {
          await Preferences.set({ key: "mf-lang", value: language });
        }
      } catch {
        /* ignore */
      }
    };

    void hydrateNativeLanguage();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem("mf-lang", lang); } catch { /* ignore */ }

    if (Capacitor.isNativePlatform()) {
      void Preferences.set({ key: "mf-lang", value: lang }).catch(() => {
        /* ignore */
      });
    }

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || translations[key]?.en || key;

    },
    [language]
  );

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};
