import type { CSSProperties } from "react";
import { ARC_D, TRACTOR_D, WORDMARK_D, TAGLINE_D, LOGO_VIEWBOX, ICON_VIEWBOX } from "./logo-paths";

const GREEN = "#28783B";
const RED = "#FE2B2B";
const SAND = "#FAF7F1";
const COMPACT_VIEWBOX = "20 30 2910 690";

type Props = {
  /** full = icon + VALLEY + tagline; compact = icon + VALLEY (navbar); icon = tractor and arc only. */
  variant?: "full" | "compact" | "icon";
  tone?: "color" | "reversed";
  className?: string;
  style?: CSSProperties;
  /** Lets the header fade the tagline out as the logo collapses. */
  taglineStyle?: CSSProperties;
  title?: string;
};

/** Inline SVG logo with separate parts, so pieces can be animated individually. */
export function Logo({ variant = "full", tone = "color", className, style, taglineStyle, title }: Props) {
  const ink = tone === "reversed" ? SAND : GREEN;
  return (
    <svg
      viewBox={variant === "icon" ? ICON_VIEWBOX : variant === "compact" ? COMPACT_VIEWBOX : LOGO_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      // The logo is Latin script and should never mirror in RTL.
      direction="ltr"
    >
      <g id="icon">
        <path fill={RED} d={ARC_D} />
        <path fill={ink} fillRule="evenodd" d={TRACTOR_D} />
      </g>
      {variant !== "icon" && <path fill={ink} d={WORDMARK_D} />}
      {variant === "full" && <path fill={ink} d={TAGLINE_D} style={taglineStyle} />}
    </svg>
  );
}
