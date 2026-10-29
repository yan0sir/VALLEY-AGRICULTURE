import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CategoryTile } from "@/components/sections/CategoryTile";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProductCard } from "@/components/sections/ProductCard";
import { TractorFilter } from "@/components/sections/TractorFilter";
import { categories, getCategory, secondaryCategories } from "@/content/categories";
import { productsIn } from "@/content/products";
import { pick } from "@/content/types";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => categories.map((c) => ({ locale, category: c.slug })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "seo" });
  if (c.slug === "tractors") return pageMeta(locale, "/products/tractors", t("tractorsTitle"), t("tractorsDesc"));
  return pageMeta(locale, `/products/${c.slug}`, `${pick(c.title, locale)} · ${t("siteName")}`, pick(c.short, locale));
}

export default async function CategoryPage({ params }: Params) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const c = getCategory(category);
  if (!c) notFound();
  const t = await getTranslations();
  const title = pick(c.title, locale);
  const crumbs = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { label: title },
  ];

  /* ---------- Tractors: model listing ---------- */
  if (c.slug === "tractors") {
    const models = productsIn("tractors");
    const cards = models.map((p) => <ProductCard key={p.slug} product={p} />);
    return (
      <>
        <section className="site-container pt-10 pb-14 md:pt-14 md:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-10 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>{t("tractors.eyebrow")}</Eyebrow>
              <h1 className="display mt-6 text-display-l text-green-900">{t("tractors.title")}</h1>
            </div>
            <p className="text-body-l text-soil-600 md:col-span-7 md:pt-12">{t("tractors.intro")}</p>
          </Reveal>
        </section>
        <section className="site-container pb-24 md:pb-32">
          {/* Filters only earn their place once the range is large enough. */}
          {models.length > 8 ? (
            <TractorFilter items={models.map((p) => ({ hp: p.specs.powerHp, drive: p.specs.drive }))}>{cards}</TractorFilter>
          ) : (
            <div className="grid gap-x-6 gap-y-14 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, i) => (
                <Reveal key={models[i].slug} delay={(i % 3) * 90}>
                  {card}
                </Reveal>
              ))}
            </div>
          )}
          <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
            <div>
              <h2 className="display text-heading text-green-900">{t("tractors.sourcingTitle")}</h2>
              <p className="mt-2 text-soil-600">{t("tractors.sourcingText")}</p>
            </div>
            <ButtonLink href="/contact?subject=quote&product=tractors" arrow>
              {t("cta.quote")}
            </ButtonLink>
          </Reveal>
        </section>
        <CtaBand />
      </>
    );
  }

  /* ---------- Secondary category ---------- */
  const others = secondaryCategories.filter((o) => o.slug !== c.slug);
  return (
    <>
      <section className="site-container pt-10 md:pt-14">
        <Breadcrumbs items={crumbs} />
      </section>
      <section className="site-container pt-10 pb-20 md:pb-28">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-6 lg:col-span-5">
            <Eyebrow>{t("nav.products")}</Eyebrow>
            <h1 className="display mt-6 text-display-l text-green-900">{title}</h1>
            <p className="mt-8 text-body-l text-soil-600">{pick(c.text, locale)}</p>
            <div className="mt-10">
              <ButtonLink href={`/contact?subject=quote&product=${c.slug}`} arrow>
                {t("cta.quote")}
              </ButtonLink>
            </div>
          </Reveal>
          <div className="relative aspect-square overflow-hidden bg-sand-200 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <Image src={c.image} alt={title} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {c.benefits.length > 0 && (
        <section className="bg-sand-200 py-20 md:py-28">
          <div className="site-container">
            <Reveal>
              <Eyebrow>{t("category.benefits")}</Eyebrow>
            </Reveal>
            <ol className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {c.benefits.map((b, i) => (
                <Reveal as="li" key={i} delay={i * 90} className="border-b border-line py-8 sm:pe-6">
                  <span className="label text-red-700">0{i + 1}</span>
                  <p className="display mt-4 text-heading text-green-900">{pick(b, locale)}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="site-container py-20 md:py-28">
        <Reveal className="mb-10 border-b border-line pb-6">
          <h2 className="display text-display-m text-green-900">{t("products.otherTitle")}</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          <CategoryTile href="/products/tractors" image="/images/tractors.png" title={t("products.tractorsTitle")} cta={t("cta.discover")} />
          {others.map((o) => (
            <CategoryTile key={o.slug} href={`/products/${o.slug}`} image={o.image} title={pick(o.title, locale)} cta={t("cta.discover")} />
          ))}
        </div>
      </section>

      <CtaBand
        title={t("category.enquireTitle", { category: title })}
        text={t("category.enquireText")}
        waMessage={t("wa.category", { category: title })}
      />
    </>
  );
}
