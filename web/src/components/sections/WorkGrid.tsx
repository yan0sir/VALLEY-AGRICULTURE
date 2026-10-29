import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export type WorkItem = { href: string; image: string; title: string; text?: string };

/**
 * Portfolio gallery: a regular grid of equal tiles with captions underneath.
 * On hover the photo zooms slightly and the caption turns red-accented.
 */
export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:gap-x-8 md:gap-y-20">
      {items.map((item, i) => (
        <Reveal key={item.href} delay={(i % 2) * 120}>
          <Link href={item.href} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 bg-green-900/0 transition-colors duration-500 group-hover:bg-green-900/15" />
            </div>
            <div className="mt-5 flex items-start gap-5">
              <span className="label pt-1.5 text-soil-600 transition-colors duration-300 group-hover:text-red-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="display text-[clamp(1.4rem,1.15rem+0.8vw,1.9rem)] leading-tight text-green-900">
                  <span className="link-underline pb-1">{item.title}</span>
                </h3>
                {item.text && <p className="mt-2 max-w-md text-soil-600">{item.text}</p>}
              </div>
              <ArrowIcon className="mt-2 shrink-0 text-green-700 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
