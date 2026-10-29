export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.valleyagrotrading.com",
  email: "info@valleyagrotrading.com",
  phoneDisplay: "+973 37679169",
  phoneHref: "tel:+97337679169",
  // Assumed to be the same number as the phone; confirm with the client.
  whatsappNumber: "97337679169",
  // Optional, hidden until the client supplies them.
  address: null as null | { en: string; ar: string },
  hours: null as null | { en: string; ar: string },
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
