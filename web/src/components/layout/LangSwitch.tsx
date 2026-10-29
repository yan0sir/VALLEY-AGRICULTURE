"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LangSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  // The current path without the locale prefix, e.g. /products/tractors/utility-75.
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";
  return (
    <Link
      href={pathname}
      locale={other}
      lang={other}
      aria-label={t("switchToLabel")}
      className={`link-underline pb-0.5 ${other === "ar" ? "font-[family-name:var(--font-plex-ar)]" : "font-[family-name:var(--font-hanken)]"} ${className}`}
    >
      {t("switchTo")}
    </Link>
  );
}
