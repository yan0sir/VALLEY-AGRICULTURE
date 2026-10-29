import { Link } from "@/i18n/navigation";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label text-soil-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-line">/</span>}
            {item.href ? (
              <Link href={item.href} className="link-underline pb-0.5 hover:text-green-700">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-soil-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
