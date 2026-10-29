"use client";

import { Children, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type Item = { hp: number; drive: "2wd" | "4wd" };
const HP_BANDS = [
  { key: "lt75", label: "< 75", test: (hp: number) => hp < 75 },
  { key: "75-120", label: "75–120", test: (hp: number) => hp >= 75 && hp <= 120 },
  { key: "gt120", label: "> 120", test: (hp: number) => hp > 120 },
];

/** Client-side HP / drive filters over server-rendered product cards (children, same order as items). */
export function TractorFilter({ items, children }: { items: Item[]; children: ReactNode }) {
  const t = useTranslations("filter");
  const [hp, setHp] = useState<string | null>(null);
  const [drive, setDrive] = useState<string | null>(null);
  const cards = Children.toArray(children);
  const visible = cards.filter((_, i) => {
    const it = items[i];
    const band = HP_BANDS.find((b) => b.key === hp);
    return (!band || band.test(it.hp)) && (!drive || it.drive === drive);
  });

  const chip = (on: boolean) =>
    `label rounded-sm border px-3 py-2 transition-colors ${on ? "border-green-700 bg-green-700 text-sand-50" : "border-line text-soil-900 hover:border-green-500"}`;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-line py-5">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="label me-2 float-start py-2 text-soil-600">{t("hp")}</legend>
          <button type="button" className={chip(hp === null)} onClick={() => setHp(null)}>
            {t("all")}
          </button>
          {HP_BANDS.map((b) => (
            <button key={b.key} type="button" className={chip(hp === b.key)} onClick={() => setHp(b.key)} dir="ltr">
              {b.label}
            </button>
          ))}
        </fieldset>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="label me-2 float-start py-2 text-soil-600">{t("drive")}</legend>
          {(["2wd", "4wd"] as const).map((d) => (
            <button key={d} type="button" className={chip(drive === d)} onClick={() => setDrive(drive === d ? null : d)}>
              {t(d)}
            </button>
          ))}
        </fieldset>
        <p className="label ms-auto text-soil-600" aria-live="polite">
          {t("results", { count: visible.length })}
        </p>
      </div>
      {visible.length ? (
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{visible}</div>
      ) : (
        <div className="py-16 text-center text-soil-600">
          <p>{t("empty")}</p>
          <button type="button" className="mt-4 font-medium text-green-700 underline" onClick={() => (setHp(null), setDrive(null))}>
            {t("clear")}
          </button>
        </div>
      )}
    </>
  );
}
