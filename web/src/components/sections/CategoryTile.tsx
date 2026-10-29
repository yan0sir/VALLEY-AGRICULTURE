import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "@/components/ui/Icons";

/** Tall Tolix-style image tile with a caption bar. */
export function CategoryTile({
  href,
  image,
  title,
  text,
  cta,
  index,
  className = "",
  sizes = "(min-width: 768px) 33vw, 100vw",
}: {
  href: string;
  image: string;
  title: string;
  text?: string;
  cta: string;
  index?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link href={href} className={`group relative block min-h-[420px] overflow-hidden bg-green-900 text-sand-50 ${className}`}>
      <Image src={image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        {index && <p className="label text-sand-50/70">{index}</p>}
        <h3 className="display mt-2 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-tight">{title}</h3>
        {text && <p className="mt-2 max-w-sm text-sand-50/80">{text}</p>}
        <span className="mt-4 inline-flex items-center gap-2 font-medium">
          <span className="link-underline pb-0.5">{cta}</span>
          <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
