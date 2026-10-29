import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { site, whatsappLink } from "@/content/site";
import { pick } from "@/content/types";
import { pageMeta } from "@/lib/seo";
import { QuoteForm } from "./QuoteForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string; subject?: string }>;
};

export async function generateMetadata({ params }: Pick<Props, "params">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMeta(locale, "/contact", t("contactTitle"), t("contactDesc"));
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { product = "", subject } = await searchParams;
  const t = await getTranslations();

  const productGroups = [
    {
      label: pick(categories[0].title, locale),
      options: products.filter((p) => p.category === "tractors").map((p) => ({ value: p.slug, label: p.name })),
    },
    {
      label: t("nav.products"),
      options: categories.map((c) => ({ value: c.slug, label: pick(c.title, locale) })),
    },
  ];
  const validProduct = productGroups.some((g) => g.options.some((o) => o.value === product)) ? product : "";
  const defaultSubject = subject === "service" || subject === "general" ? subject : "quote";
  const row = "flex items-center gap-4 border-b border-sand-50/15 py-5";

  return (
    <section className="site-container pt-12 pb-24 md:pt-20 md:pb-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{t("contact.eyebrow")}</Eyebrow>
            <h1 className="display mt-6 text-display-l text-green-900">{t("contact.title")}</h1>
            <p className="mt-6 max-w-2xl text-body-l text-soil-600">{t("contact.text")}</p>
          </Reveal>
          <div className="mt-12 border-t border-line pt-10">
            <QuoteForm
              productGroups={productGroups}
              defaultProduct={validProduct}
              defaultSubject={defaultSubject}
              whatsappHref={whatsappLink(t("wa.general"))}
            />
          </div>
        </div>

        <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-4" delay={120}>
          <aside className="bg-green-900 p-8 text-sand-50 md:p-10 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <h2 className="display text-heading">{t("contact.cardTitle")}</h2>
            <ul className="mt-6 border-t border-sand-50/15">
              <li>
                <a href={`mailto:${site.email}`} className={`${row} group`}>
                  <MailIcon className="shrink-0 text-sand-50/70" />
                  <span>
                    <span className="label block text-sand-50/55">{t("contact.emailLabel")}</span>
                    <span className="link-underline pb-0.5 break-all">{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={row}>
                  <PhoneIcon className="shrink-0 text-sand-50/70" />
                  <span>
                    <span className="label block text-sand-50/55">{t("contact.phoneLabel")}</span>
                    <span dir="ltr" className="link-underline pb-0.5">{site.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={whatsappLink(t("wa.general"))} target="_blank" rel="noopener" className={row}>
                  <WhatsAppIcon className="shrink-0 text-sand-50/70" />
                  <span>
                    <span className="label block text-sand-50/55">{t("contact.whatsappLabel")}</span>
                    <span className="link-underline pb-0.5">{t("cta.whatsapp")}</span>
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
