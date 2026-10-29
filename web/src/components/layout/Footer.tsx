import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { categories } from "@/content/categories";
import { pick } from "@/content/types";
import { site, whatsappLink } from "@/content/site";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { LangSwitch } from "./LangSwitch";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const heading = "label text-sand-50/55 mb-5";
  const link = "text-sand-50/85 hover:text-sand-50 link-underline pb-0.5";

  return (
    <footer className="bg-soil-900 text-sand-50">
      <div className="site-container grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Link href="/" aria-label={t("a11y.home")} className="inline-block w-[260px] max-w-full">
            <Logo tone="reversed" className="block h-auto w-full" />
          </Link>
          <p className="mt-6 max-w-sm text-sand-50/70">{t("footer.tagline")}</p>
        </div>

        <div className="md:col-span-3">
          <p className={heading}>{t("footer.products")}</p>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className={link}>
                  {pick(c.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className={heading}>{t("footer.company")}</p>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className={link}>{t("nav.about")}</Link>
            </li>
            <li>
              <Link href="/services" className={link}>{t("nav.services")}</Link>
            </li>
            <li>
              <Link href="/contact" className={link}>{t("nav.contact")}</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className={heading}>{t("footer.contact")}</p>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className={`${link} inline-flex items-center gap-2 whitespace-nowrap`}>
                <MailIcon className="shrink-0" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className={`${link} inline-flex items-center gap-2 whitespace-nowrap`}>
                <PhoneIcon className="shrink-0" />
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={whatsappLink(t("wa.general"))} target="_blank" rel="noopener" className={`${link} inline-flex items-center gap-2`}>
                <WhatsAppIcon className="shrink-0" width={18} height={18} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-50/10">
        {/* Extra end padding keeps the floating WhatsApp button clear of these links. */}
        <div className="site-container flex flex-col gap-4 py-6 pb-24 text-sm text-sand-50/60 md:flex-row md:items-center md:justify-between md:pb-6 md:pe-28">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="link-underline pb-0.5 hover:text-sand-50">
              {t("footer.privacy")}
            </Link>
            <LangSwitch className="text-sand-50/80 hover:text-sand-50" />
          </div>
        </div>
      </div>
    </footer>
  );
}
