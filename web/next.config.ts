import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep search rankings from the old Wix site.
  async redirects() {
    const old = "/portfolio-collections/portfolio";
    return [
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/portfolio", destination: "/en/products", permanent: true },
      { source: `${old}/tractors-more`, destination: "/en/products/tractors", permanent: true },
      { source: `${old}/irrigation-pivots`, destination: "/en/products/irrigation-pivots", permanent: true },
      { source: `${old}/irrigation-automation`, destination: "/en/products/irrigation-automation", permanent: true },
      { source: `${old}/bale-handling-equipment`, destination: "/en/products/bale-handling", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
