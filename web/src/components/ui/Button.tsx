import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "./Icons";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "inverse" | "inverseOutline";

const styles: Record<Variant, string> = {
  primary: "bg-green-700 text-sand-50 hover:bg-green-800",
  secondary: "border border-green-500 text-green-700 hover:bg-green-700 hover:text-sand-50 hover:border-green-700",
  whatsapp: "bg-green-500 text-sand-50 hover:bg-green-700",
  inverse: "bg-sand-50 text-green-900 hover:bg-sand-200",
  inverseOutline: "border border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50/10",
  ghost: "",
};

const box =
  "inline-flex items-center justify-center gap-2.5 min-h-12 px-6 text-[0.95rem] font-medium rounded-sm transition-colors duration-200 whitespace-nowrap";

type Common = { variant?: Variant; icon?: ReactNode; arrow?: boolean; className?: string; children: ReactNode };

function Inner({ icon, arrow, children }: Pick<Common, "icon" | "arrow" | "children">) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />}
    </>
  );
}

const cls = (variant: Variant, className?: string) =>
  variant === "ghost"
    ? `group inline-flex items-center gap-2 font-medium text-green-700 link-underline pb-1 ${className ?? ""}`
    : `group ${box} ${styles[variant]} ${className ?? ""}`;

/** Internal link styled as a button. */
export function ButtonLink({
  variant = "primary",
  icon,
  arrow,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link {...rest} className={cls(variant, className)}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </Link>
  );
}

/** External link (tel:, mailto:, WhatsApp, files) styled as a button. */
export function ButtonAnchor({
  variant = "primary",
  icon,
  arrow,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"a">, "className" | "children">) {
  return (
    <a {...rest} className={cls(variant, className)}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </a>
  );
}
