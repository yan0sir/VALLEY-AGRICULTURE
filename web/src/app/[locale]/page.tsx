import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { categories } from "@/content/categories";
import { pick } from "@/content/types";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, "/", t("homeTitle"), t("homeDesc"));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const range = categories.map((c) => ({
    href: `/products/${c.slug}`,
    image: c.image,
    title: pick(c.title, locale),
    text: pick(c.short, locale),
  }));

  return (
    <>
      {/* Hero: full-bleed photo, minimal type */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-green-900 text-sand-50 md:h-[calc(100svh-var(--nav-h))] md:max-h-[920px]">
        <Image src="/images/fastrac-baling.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[50%_60%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-green-900/80 via-green-900/10 to-transparent" />
        <div className="site-container pb-12 md:pb-16">
          <Reveal className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-9">
              <Eyebrow tone="light">{t("home.heroEyebrow")}</Eyebrow>
              <h1 className="display mt-6 text-display-xl">{t("home.heroTitle")}</h1>
            </div>
            {/* End margin keeps the link clear of the floating WhatsApp button. */}
            <div className="md:col-span-3 md:justify-self-end md:me-24">
              <a href="#range" className="group inline-flex items-center gap-3 font-medium text-sand-50">
                <span className="link-underline pb-1">{t("home.exploreRange")}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1">
                  <path d="M12 4v15M6 13l6 6 6-6" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section>
        <Reveal className="site-container grid gap-8 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-3">
            <Eyebrow>{t("home.statementEyebrow")}</Eyebrow>
          </div>
          <p className="display text-[clamp(1.6rem,1.2rem+1.6vw,2.75rem)] leading-[1.25] text-green-900 md:col-span-9">{t("home.statement")}</p>
        </Reveal>
      </section>

      {/* The range: portfolio gallery */}
      <section id="range" className="site-container scroll-mt-[calc(var(--nav-h)+2rem)] pb-24 md:pb-36">
        <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6 md:mb-20">
          <h2 className="display text-display-m text-green-900">{t("home.rangeTitle")}</h2>
          <span className="label text-soil-600">{String(range.length).padStart(2, "0")}</span>
        </Reveal>
        <WorkGrid items={range} />
      </section>

      {/* About, in one line */}
      <section className="bg-sand-200">
        <div className="site-container grid gap-8 py-24 md:grid-cols-12 md:py-32">
          <Reveal className="md:col-span-3">
            <Eyebrow>{t("home.whyEyebrow")}</Eyebrow>
          </Reveal>
          <Reveal className="md:col-span-8" delay={100}>
            <p className="display text-display-m text-green-900">{t("home.whyTitle")}</p>
            <p className="mt-6 max-w-2xl text-body-l text-soil-600">{t("home.whyText")}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <ButtonLink href="/about" variant="ghost" arrow>
                {t("nav.about")}
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost" arrow>
                {t("nav.services")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <CtaBand />
      </div>
    </>
  );
}
