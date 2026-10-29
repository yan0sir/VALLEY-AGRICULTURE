import type { Metadata } from "next";
import { site } from "@/content/site";

/** Page metadata with hreflang alternates for both locales. `path` excludes the locale, e.g. "/about". */
export function pageMeta(locale: string, path: string, title: string, description?: string): Metadata {
  const p = path === "/" ? "" : path;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${p}`,
      languages: { en: `/en${p}`, ar: `/ar${p}`, "x-default": `/en${p}` },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${p}`,
      siteName: locale === "ar" ? "فالي" : "Valley Agriculture",
      locale: locale === "ar" ? "ar_BH" : "en_BH",
      type: "website",
      images: [{ url: "/images/fastrac-baling.webp", width: 1424, height: 580 }],
    },
  };
}

export const metadataBase = new URL(site.url);
