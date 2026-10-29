import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappLink } from "@/content/site";

/** Portfolio-style closing contact section: big heading and large, direct contact links. */
export async function CtaBand({ title, text, waMessage }: { title?: string; text?: string; waMessage?: string }) {
  const t = await getTranslations();
  const big = "display block text-[clamp(1.5rem,1.1rem+1.6vw,2.6rem)] leading-tight text-green-900";

  return (
    <section className="site-container pb-24 md:pb-32">
      <div className="grid gap-12 border-t border-line pt-14 md:grid-cols-12 md:pt-20">
        <Reveal className="md:col-span-5">
          <Eyebrow>{t("contact.eyebrow")}</Eyebrow>
          <h2 className="display mt-6 text-display-m text-green-900">{title ?? t("contact.title")}</h2>
          <p className="mt-5 max-w-md text-body-l text-soil-600">{text ?? t("ctaBand.text")}</p>
          <div className="mt-8">
            <ButtonLink href="/contact?subject=quote" arrow>
              {t("cta.quote")}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <ul className="divide-y divide-line border-y border-line">
            <li className="py-6">
              <p className="label text-soil-600">{t("contact.emailLabel")}</p>
              <a href={`mailto:${site.email}`} className={`${big} mt-2`}>
                <span className="link-underline pb-1 break-all">{site.email}</span>
              </a>
            </li>
            <li className="py-6">
              <p className="label text-soil-600">{t("contact.phoneLabel")}</p>
              <a href={site.phoneHref} className={`${big} mt-2`}>
                <span dir="ltr" className="link-underline pb-1">
                  {site.phoneDisplay}
                </span>
              </a>
            </li>
            <li className="py-6">
              <p className="label text-soil-600">{t("contact.whatsappLabel")}</p>
              <a href={whatsappLink(waMessage ?? t("wa.general"))} target="_blank" rel="noopener" className={`${big} mt-2`}>
                <span className="link-underline pb-1">{t("cta.whatsapp")}</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
