import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Split } from "@/components/sections/Split";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, "/about", t("aboutTitle"), t("aboutDesc"));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      <section className="site-container pb-24 md:pb-32">
        <Reveal className="grid gap-8 border-t border-line pt-12 md:grid-cols-12">
          <p className="display text-[clamp(1.5rem,1.15rem+1.4vw,2.35rem)] leading-[1.35] text-green-900 md:col-span-10">{t("p1")}</p>
        </Reveal>
      </section>

      <Split image="/images/tractors.png" eyebrow={t("approachTitle")} title={tHome("whyTitle")} tone="sand">
        <p>{t("approachText")}</p>
      </Split>

      <section className="site-container py-24 md:py-32">
        <Reveal>
          <Eyebrow>{t("whoTitle")}</Eyebrow>
        </Reveal>
        <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {(["who1", "who2", "who3", "who4"] as const).map((k, i) => (
            <Reveal as="li" key={k} delay={i * 90} className="border-b border-line py-8 sm:pe-6">
              <span className="label text-soil-600">0{i + 1}</span>
              <p className="display mt-4 text-display-m text-green-900">{t(k)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="site-container pb-24 md:pb-32">
        <ServicesGrid />
      </section>

      <CtaBand />
    </>
  );
}
