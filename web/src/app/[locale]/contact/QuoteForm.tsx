"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { submitQuote, type QuoteState } from "./actions";

type Option = { value: string; label: string };

export function QuoteForm({
  productGroups,
  defaultProduct,
  defaultSubject,
  whatsappHref,
}: {
  productGroups: { label: string; options: Option[] }[];
  defaultProduct: string;
  defaultSubject: "quote" | "service" | "general";
  whatsappHref: string;
}) {
  const t = useTranslations("form");
  const locale = useLocale();
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, { status: "idle" });
  const v = state.values ?? {};
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="border-t-2 border-green-700 bg-green-100 p-8 md:p-10" role="status">
        <p className="display text-display-m text-green-900">✓</p>
        <p className="mt-4 text-body-l text-green-900">{t("success")}</p>
        <a href={whatsappHref} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 font-medium text-green-700 link-underline pb-0.5">
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    );
  }

  const field = "mt-2 block w-full rounded-sm border bg-sand-50 px-4 py-3 text-soil-900 outline-none transition-colors focus:border-green-700 focus:ring-1 focus:ring-green-700";
  const border = (bad?: boolean) => (bad ? "border-red-700" : "border-line");
  const label = "text-sm font-medium text-soil-900";
  const FieldErr = ({ code }: { code?: string }) => (code ? <p className="mt-1.5 text-sm text-red-700">{t(code)}</p> : null);

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="subject" className={label}>{t("subject")}</label>
        <select id="subject" name="subject" defaultValue={v.subject || defaultSubject} className={`${field} ${border()}`}>
          <option value="quote">{t("subjectQuote")}</option>
          <option value="service">{t("subjectService")}</option>
          <option value="general">{t("subjectGeneral")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="name" className={label}>{t("name")} *</label>
        <input id="name" name="name" required autoComplete="name" defaultValue={v.name} aria-invalid={!!err.name} className={`${field} ${border(!!err.name)}`} />
        <FieldErr code={err.name} />
      </div>
      <div>
        <label htmlFor="company" className={label}>{t("company")}</label>
        <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={`${field} ${border()}`} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>{t("phone")} *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          dir="ltr"
          autoComplete="tel"
          placeholder="+973"
          defaultValue={v.phone}
          aria-invalid={!!err.phone}
          className={`${field} ${border(!!err.phone)} text-start rtl:text-end`}
        />
        <FieldErr code={err.phone} />
      </div>
      <div>
        <label htmlFor="email" className={label}>{t("email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={!!err.email}
          className={`${field} ${border(!!err.email)} text-start rtl:text-end`}
        />
        <FieldErr code={err.email} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="product" className={label}>{t("product")}</label>
        <select id="product" name="product" defaultValue={v.product ?? defaultProduct} className={`${field} ${border()}`}>
          <option value="">{t("productNone")}</option>
          {productGroups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>{t("message")} *</label>
        <textarea id="message" name="message" rows={5} required defaultValue={v.message} aria-invalid={!!err.message} className={`${field} ${border(!!err.message)} resize-y`} />
        <FieldErr code={err.message} />
      </div>

      {state.status === "error" && !state.errors && (
        <p className="sm:col-span-2 border-s-2 border-red-700 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {t("error")}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-soil-600">
          {t("privacy").split(/(Privacy Policy|سياسة الخصوصية)/).map((part, i) =>
            /Privacy Policy|سياسة الخصوصية/.test(part) ? (
              <Link key={i} href="/privacy" className="underline underline-offset-2 hover:text-green-700">
                {part}
              </Link>
            ) : (
              part
            ),
          )}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm bg-green-700 px-7 font-medium text-sand-50 transition-colors hover:bg-green-800 disabled:opacity-60"
        >
          {pending ? t("sending") : t("submit")}
          {!pending && <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />}
        </button>
      </div>
    </form>
  );
}
