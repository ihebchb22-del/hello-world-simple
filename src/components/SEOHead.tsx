import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  /** Canonical URL. hreflang alternates will be derived by appending ?lang=. */
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
  /** Current language (en/fr/ar). Defaults to "fr" — Tunisia primary. */
  language?: "en" | "fr" | "ar";
}

const SUPPORTED_LANGS: Array<"en" | "fr" | "ar"> = ["en", "fr", "ar"];

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_TN",
};

const buildAltUrl = (canonical: string, lang: "en" | "fr" | "ar") => {
  try {
    const url = new URL(canonical);
    url.searchParams.set("lang", lang);
    return url.toString();
  } catch {
    const sep = canonical.includes("?") ? "&" : "?";
    return `${canonical}${sep}lang=${lang}`;
  }
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://musclefactory.com/images/og-cover.jpg",
  ogType = "website",
  jsonLd,
  noIndex = false,
  language = "fr",
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = language;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("name", "description", description);
    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
    }

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:site_name", "Muscle Factory®");
    setMeta("property", "og:locale", ogLocaleMap[language] || "fr_FR");
    if (canonical) {
      setMeta("property", "og:url", canonical);
    }

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", title);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // hreflang alternates — clear previous, then emit en/fr/ar + x-default
    document
      .querySelectorAll('link[rel="alternate"][data-seo-hreflang]')
      .forEach((n) => n.remove());

    if (canonical) {
      const baseCanonical = canonical.split("?")[0];
      SUPPORTED_LANGS.forEach((lng) => {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = lng;
        link.href = buildAltUrl(canonical, lng);
        link.setAttribute("data-seo-hreflang", "true");
        document.head.appendChild(link);
      });
      const xDefault = document.createElement("link");
      xDefault.rel = "alternate";
      xDefault.hreflang = "x-default";
      xDefault.href = baseCanonical;
      xDefault.setAttribute("data-seo-hreflang", "true");
      document.head.appendChild(xDefault);
    }

    // JSON-LD
    if (jsonLd) {
      const existingScript = document.querySelector("script[data-seo-jsonld]");
      if (existingScript) existingScript.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
      return () => {
        script.remove();
      };
    }
  }, [title, description, canonical, ogImage, ogType, jsonLd, noIndex, language]);

  return null;
};

export default SEOHead;
