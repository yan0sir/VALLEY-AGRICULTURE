import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <section className="site-container py-28 md:py-40">
      <Eyebrow>404</Eyebrow>
      <h1 className="display mt-6 text-display-l text-green-900">{t("notFound.title")}</h1>
      <p className="mt-6 max-w-xl text-body-l text-soil-600">{t("notFound.text")}</p>
      <div className="mt-10">
        <ButtonLink href="/" arrow>
          {t("cta.backHome")}
        </ButtonLink>
      </div>
    </section>
  );
}
