"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { LangSwitch } from "./LangSwitch";

/** The client's original logo artwork, used exactly as supplied (cropped to its edges only). */
function OriginalLogo() {
  return (
    <Image
      src="/brand/valley-logo.png"
      alt="Valley Agricultural Tractors & Machinery Trading W.L.L."
      width={325}
      height={70}
      priority
      unoptimized
      className="block h-11 w-auto lg:h-14"
    />
  );
}

export type MenuItem ={ slug: string; title: string; short: string; image: string };

type Props = { menu: MenuItem[]; whatsappHref: string; phoneHref: string; phoneDisplay: string };

/** Standard fixed navbar: compact logo at the start, links at the end. */
export function Header({ menu, whatsappHref, phoneHref, phoneDisplay }: Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Close menus on navigation.
  useEffect(() => {
    setMegaOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  // Lock page scroll behind the mobile sheet; Escape closes any open menu.
  useEffect(() => {
    document.documentElement.style.overflow = sheetOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const active = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);
  const navLink = "link-underline pb-1 text-[0.95rem] font-medium text-green-900 whitespace-nowrap";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[70] focus:bg-green-900 focus:px-4 focus:py-2 focus:text-sand-50"
      >
        {t("a11y.skip")}
      </a>

      {/* White bar so the original logo artwork (which has a white background) sits on it seamlessly. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white">
        <div className="site-container flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={t("a11y.home")} className="block shrink-0">
            <OriginalLogo />
          </Link>

          <nav className="hidden h-full items-center gap-8 lg:flex" aria-label="Main">
            <div className="flex h-full items-center" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <button
                type="button"
                className={`${navLink} inline-flex items-center gap-1.5`}
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                aria-current={active("/products")}
                onClick={() => setMegaOpen((v) => !v)}
              >
                {t("nav.products")}
                <ChevronDownIcon className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <Link href="/services" className={navLink} aria-current={active("/services")}>
              {t("nav.services")}
            </Link>
            <Link href="/about" className={navLink} aria-current={active("/about")}>
              {t("nav.about")}
            </Link>
            <Link href="/contact" className={navLink} aria-current={active("/contact")}>
              {t("nav.contact")}
            </Link>
            <LangSwitch className="text-[0.95rem] text-green-900" />
            <ButtonLink href="/contact?subject=quote" className="!min-h-11 !px-5">
              {t("nav.quote")}
            </ButtonLink>
          </nav>

          <button
            type="button"
            className="-me-2 p-2 text-green-900 lg:hidden"
            aria-label={t("a11y.menuOpen")}
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>

        {/* Products mega menu */}
        <div
          id="mega-menu"
          className={`absolute inset-x-0 top-full hidden transition-[opacity,visibility] duration-200 lg:block ${
            megaOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="border-b border-line bg-sand-50 shadow-[0_24px_48px_-24px_rgba(34,29,25,0.25)]">
            <div className="site-container grid grid-cols-4 gap-6 py-8">
              {menu.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
                    <Image src={item.image} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-medium text-green-900">{item.title}</p>
                  <p className="mt-1 text-sm text-soil-600">{item.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Keeps page content clear of the fixed bar. */}
      <div aria-hidden className="h-[var(--nav-h)]" />

      {/* Mobile menu sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-green-900 text-sand-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="shrink-0 bg-white">
            <div className="site-container flex h-[var(--nav-h)] items-center justify-between">
              <Link href="/" aria-label={t("a11y.home")} className="block">
                <OriginalLogo />
              </Link>
              <button type="button" className="-me-2 p-2 text-green-900" aria-label={t("a11y.menuClose")} onClick={() => setSheetOpen(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <nav className="site-container flex flex-1 flex-col gap-1 pt-6" aria-label="Mobile">
            {[
              ["/", t("nav.home")],
              ["/products", t("nav.products")],
              ["/services", t("nav.services")],
              ["/about", t("nav.about")],
              ["/contact", t("nav.contact")],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="display border-b border-sand-50/15 py-3 text-[2rem]">
                {label}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {menu.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="py-1 text-sand-50/80">
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>
          <div className="site-container flex flex-col gap-3 py-8">
            <ButtonLink href="/contact?subject=quote" variant="inverse">
              {t("nav.quote")}
            </ButtonLink>
            <ButtonAnchor href={whatsappHref} target="_blank" rel="noopener" variant="inverseOutline" icon={<WhatsAppIcon />}>
              {t("cta.whatsapp")}
            </ButtonAnchor>
            <div className="mt-3 flex items-center justify-between text-sand-50/85">
              <a href={phoneHref} className="inline-flex items-center gap-2">
                <PhoneIcon />
                <span dir="ltr">{phoneDisplay}</span>
              </a>
              <LangSwitch />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
