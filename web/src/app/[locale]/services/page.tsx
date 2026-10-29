import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { SERVICES } from "@/components/sections/ServicesGrid";
import { pageMeta } from "@/lib/seo";

// Placeholder imagery until the client supplies service photos.
const IMAGES = ["/images/tractors.png", "/images/irrigation-pivots.png", "/images/irrigation-automation.png", "/images/bale-handling.png"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, "/services", t("servicesTitle"), t("servicesDesc"));
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader eyebrow={t("services.eyebrow")} title={t("services.title")} intro={t("services.intro")} />

      <section className="site-container space-y-6 pb-24 md:space-y-10 md:pb-32">
        {SERVICES.map(({ key, Icon }, i) => (
          <div key={key} className="grid overflow-hidden bg-sand-200 md:grid-cols-2">
            <div className={`relative min-h-[280px] md:min-h-[440px] ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={IMAGES[i]} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <Reveal className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-4 text-green-700">
                <Icon />
                <span className="label text-soil-600">0{i + 1}</span>
              </div>
              <h2 className="display mt-6 text-display-m text-green-900">{t(`service.${key}Title`)}</h2>
              <p className="mt-5 max-w-md text-body-l text-soil-600">{t(`service.${key}Text`)}</p>
              <div className="mt-8">
                <ButtonLink href="/contact?subject=service" variant="ghost" arrow>
                  {t("cta.bookService")}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      <CtaBand waMessage={t("wa.service")} />
    </>
  );
}
