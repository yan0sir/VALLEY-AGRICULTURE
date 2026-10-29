import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { ArrowIcon } from "@/components/ui/Icons";
import { pick, type Product } from "@/content/types";

/** Product photo, or a branded placeholder until real photos are supplied. */
export async function ProductVisual({ product, sizes, priority }: { product: Product; sizes: string; priority?: boolean }) {
  const t = await getTranslations("label");
  const src = product.images[0];
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
      {src ? (
        <Image src={src} alt={product.name} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <Logo variant="icon" className="w-[46%] opacity-[0.16] grayscale transition-transform duration-700 group-hover:scale-105" />
          <span className="label absolute bottom-4 text-soil-600/70">{t("photoSoon")}</span>
        </div>
      )}
      {product.isSample && (
        <span className="label absolute top-3 start-3 bg-sand-50/90 px-2 py-1 text-[0.65rem] text-soil-600">{t("sample")}</span>
      )}
    </div>
  );
}

export async function ProductCard({ product }: { product: Product }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const s = product.specs;
  return (
    <Link href={`/products/${product.category}/${product.slug}`} className="group block">
      <ProductVisual product={product} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="label flex items-center gap-2 text-soil-600">
            <span className={`size-1.5 rounded-full ${product.status === "inStock" ? "bg-red-600" : "bg-soil-600/40"}`} aria-hidden />
            {t(`status.${product.status}`)}
          </p>
          <h3 className="display mt-2 text-heading text-green-900">{product.name}</h3>
        </div>
        <ArrowIcon className="mt-7 shrink-0 text-green-700 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </div>
      <p className="mt-2 line-clamp-2 text-soil-600">{pick(product.short, locale)}</p>
      <dl className="label mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-soil-900">
        <div className="flex gap-1.5">
          <dt className="sr-only">{t("spec.power")}</dt>
          <dd>
            {s.powerHp} {t("unit.hp")}
          </dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="sr-only">{t("spec.drive")}</dt>
          <dd>{t(`filter.${s.drive}`)}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="sr-only">{t("spec.cylinders")}</dt>
          <dd>
            {s.cylinders} {t("unit.cyl")}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
