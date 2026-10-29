import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { DownloadIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { ProductCard, ProductVisual } from "@/components/sections/ProductCard";
import { getCategory } from "@/content/categories";
import { getProduct, products, productsIn } from "@/content/products";
import { whatsappLink, site } from "@/content/site";
import { pick } from "@/content/types";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; category: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, category: p.category, slug: p.slug })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, `/products/${p.category}/${p.slug}`, `${p.name} · ${t("siteName")}`, pick(p.short, locale));
}

export default async function ModelPage({ params }: Params) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  const p = getProduct(slug);
  if (!p || p.category !== category) notFound();
  const c = getCategory(category)!;
  const t = await getTranslations();
  const s = p.specs;

  const keySpecs = [
    { label: t("spec.power"), value: `${s.powerHp} ${t("unit.hp")}` },
    { label: t("spec.drive"), value: t(`filter.${s.drive}`) },
    { label: t("spec.cylinders"), value: String(s.cylinders) },
  ];
  const fullSpecs = [
    { label: t("spec.power"), value: `${s.powerHp} ${t("unit.hp")}` },
    { label: t("spec.drive"), value: t(`filter.${s.drive}`) },
    { label: t("spec.transmission"), value: pick(s.transmission, locale) },
    { label: t("spec.cylinders"), value: String(s.cylinders) },
    { label: t("spec.weight"), value: `${s.weightKg.toLocaleString("en")} ${t("unit.kg")}` },
    { label: t("spec.lift"), value: `${s.liftKg.toLocaleString("en")} ${t("unit.kg")}` },
    { label: t("spec.pto"), value: `${s.pto} ${t("unit.rpm")}` },
    { label: t("spec.fuel"), value: `${s.fuelL} ${t("unit.l")}` },
  ];
  const related = productsIn(category).filter((r) => r.slug !== p.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: pick(p.short, locale),
    category: pick(c.title, locale),
    url: `${site.url}/${locale}/products/${p.category}/${p.slug}`,
  };

  return (
    <>
      <section className="site-container pt-10 pb-20 md:pt-14 md:pb-28">
        <Breadcrumbs
          items={[
            { href: "/", label: t("nav.home") },
            { href: "/products", label: t("nav.products") },
            { href: `/products/${c.slug}`, label: pick(c.title, locale) },
            { label: p.name },
          ]}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            {p.images.length > 1 ? <Gallery images={p.images} alt={p.name} /> : <ProductVisual product={p} sizes="(min-width: 1024px) 58vw, 100vw" priority />}
          </div>

          <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:col-span-5 lg:self-start">
            <p className="label flex items-center gap-2 text-soil-600">
              <span className={`size-1.5 rounded-full ${p.status === "inStock" ? "bg-red-600" : "bg-soil-600/40"}`} aria-hidden />
              {t(`status.${p.status}`)}
            </p>
            <h1 className="display mt-4 text-display-l text-green-900">{p.name}</h1>
            <p className="mt-5 text-body-l text-soil-600">{pick(p.short, locale)}</p>

            <dl className="mt-8 grid grid-cols-3 border-y border-line">
              {keySpecs.map((k, i) => (
                <div key={k.label} className={`py-5 ${i > 0 ? "border-s border-line ps-4" : ""}`}>
                  <dt className="label text-soil-600">{k.label}</dt>
                  <dd className="display mt-2 text-heading text-green-900">{k.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={`/contact?subject=quote&product=${p.slug}`} arrow className="flex-1">
                {t("cta.enquireModel")}
              </ButtonLink>
              <ButtonAnchor
                href={whatsappLink(t("wa.model", { model: p.name }))}
                target="_blank"
                rel="noopener"
                variant="secondary"
                icon={<WhatsAppIcon />}
                className="flex-1"
              >
                {t("cta.whatsapp")}
              </ButtonAnchor>
            </div>
            {p.brochure && (
              <a href={p.brochure} download className="mt-5 inline-flex items-center gap-2 font-medium text-green-700 link-underline pb-0.5">
                <DownloadIcon />
                {t("cta.brochure")}
              </a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-sand-200 py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-display-m text-green-900">{t("model.fullSpecs")}</h2>
            <table className="mt-8 w-full border-t border-line text-start">
              <tbody>
                {fullSpecs.map((row) => (
                  <tr key={row.label} className="border-b border-line even:bg-green-100/60">
                    <th scope="row" className="w-1/2 py-4 ps-3 text-start font-normal text-soil-600">
                      {row.label}
                    </th>
                    <td className="py-4 pe-3 font-mono text-[0.95rem] text-soil-900">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <h2 className="display text-heading text-green-900">{t("model.suitableFor")}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.uses.map((u) => (
                <li key={u} className="label rounded-sm border border-green-500/40 bg-sand-50 px-3 py-2 text-green-900">
                  {t(`use.${u}`)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="site-container py-20 md:py-28">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="display text-display-m text-green-900">{t("model.related")}</h2>
            <ButtonLink href={`/products/${c.slug}`} variant="ghost" arrow>
              {t("cta.viewAllTractors")}
            </ButtonLink>
          </Reveal>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 90}>
                <ProductCard product={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaBand waMessage={t("wa.model", { model: p.name })} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
