import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { categories } from "@/content/categories";
import { pick } from "@/content/types";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, "/products", t("productsTitle"), t("productsDesc"));
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader eyebrow={t("products.eyebrow")} title={t("products.title")} />
      <section className="site-container pb-24 md:pb-36">
        <WorkGrid
          items={categories.map((c) => ({
            href: `/products/${c.slug}`,
            image: c.image,
            title: pick(c.title, locale),
            text: pick(c.short, locale),
          }))}
        />
      </section>
      <CtaBand />
    </>
  );
}
