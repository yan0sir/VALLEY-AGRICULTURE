import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, dirFor } from "@/i18n/routing";
import { Header, type MenuItem } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { categories } from "@/content/categories";
import { pick } from "@/content/types";
import { site, whatsappLink } from "@/content/site";
import { metadataBase } from "@/lib/seo";
import "lenis/dist/lenis.css";
import "../globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });
const plexAr = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-plex-ar", display: "swap", preload: false });

export const viewport: Viewport = { themeColor: "#FAF7F1" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    metadataBase,
    title: { default: t("homeTitle"), template: "%s" },
    description: t("homeDesc"),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const menu: MenuItem[] = categories.map((c) => ({
    slug: c.slug,
    title: pick(c.title, locale),
    short: pick(c.short, locale),
    image: c.image,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Valley Agricultural Tractors & Machinery Trading W.L.L.",
    alternateName: "فالي لتجارة الجرارات والمعدات الزراعية ذ.م.م",
    url: site.url,
    email: site.email,
    telephone: "+97337679169",
    areaServed: "BH",
    logo: `${site.url}/brand/valley-logo.svg`,
  };

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${hanken.variable} ${plexMono.variable} ${plexAr.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <Header menu={menu} whatsappHref={whatsappLink(t("wa.general"))} phoneHref={site.phoneHref} phoneDisplay={site.phoneDisplay} />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <SmoothScroll />
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
