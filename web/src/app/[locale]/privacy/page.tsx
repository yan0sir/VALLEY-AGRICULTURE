import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, "/privacy", t("privacyTitle"));
}

// Short starter policy. Have it reviewed before launch.
export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  return (
    <>
      <PageHeader eyebrow={t("updated")} title={t("title")} />
      <section className="site-container pb-28">
        <div className="max-w-3xl space-y-6 border-t border-line pt-10 text-body-l text-soil-600">
          <p>{t("p1")}</p>
          <h2 className="display pt-4 text-heading text-green-900">{t("h2")}</h2>
          <p>{t("p2")}</p>
          <h2 className="display pt-4 text-heading text-green-900">{t("h3")}</h2>
          <p>{t("p3")}</p>
          <h2 className="display pt-4 text-heading text-green-900">{t("h4")}</h2>
          <p>{t("p4")}</p>
        </div>
      </section>
    </>
  );
}
