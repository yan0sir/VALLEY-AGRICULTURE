import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Points "forward": right in English, left in Arabic. */
export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p} className={`rtl:-scale-x-100 ${p.className ?? ""}`}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden {...base} {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden {...base} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="currentColor" {...p}>
    <path d="M12.04 2a9.9 9.9 0 00-8.5 15l-1.4 5.1 5.2-1.37A9.9 9.9 0 1012.04 2zm0 18.1a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.09.81.82-3.01-.2-.31a8.2 8.2 0 1113.85.22 8.15 8.15 0 01-6.9 3.62zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 01-1.98-1.22 7.4 7.4 0 01-1.37-1.71c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 00-.65.3 2.75 2.75 0 00-.86 2.04c0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.58.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.17-.47-.29z" />
  </svg>
);

export const DownloadIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

/* Service line icons */
export const ConsultIcon = (p: P) => (
  <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden {...base} {...p}>
    <path d="M6 9h22v14H15l-6 5v-5H6z" />
    <path d="M28 15h6v13h-3v4l-5-4h-8v-5" />
  </svg>
);
export const InstallIcon = (p: P) => (
  <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden {...base} {...p}>
    <path d="M24 6a7 7 0 00-6.6 9.3L6 26.7 9.3 30l11.4-11.4A7 7 0 0030 12l-4 4-4-1-1-4 4-4z" />
  </svg>
);
export const MaintainIcon = (p: P) => (
  <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden {...base} {...p}>
    <circle cx="20" cy="20" r="5" />
    <path d="M20 5v5M20 30v5M5 20h5M30 20h5M9.4 9.4l3.5 3.5M27.1 27.1l3.5 3.5M9.4 30.6l3.5-3.5M27.1 12.9l3.5-3.5" />
  </svg>
);
export const PartsIcon = (p: P) => (
  <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden {...base} {...p}>
    <path d="M6 13l14-7 14 7v14l-14 7-14-7z" />
    <path d="M6 13l14 7 14-7M20 20v14" />
  </svg>
);
