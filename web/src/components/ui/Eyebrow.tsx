/** Small mono label that sits above section titles. */
export function Eyebrow({ children, className = "", tone = "dark" }: { children: React.ReactNode; className?: string; tone?: "dark" | "light" }) {
  return <p className={`label ${tone === "light" ? "text-sand-50/85" : "text-soil-600"} ${className}`}>{children}</p>;
}
