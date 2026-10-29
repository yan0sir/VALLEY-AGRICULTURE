import type { MetadataRoute } from "next";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    "/contact",
    "/products",
    "/privacy",
    ...categories.map((c) => `/products/${c.slug}`),
    ...products.map((p) => `/products/${p.category}/${p.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}/en${p}`,
    alternates: { languages: { en: `${site.url}/en${p}`, ar: `${site.url}/ar${p}` } },
  }));
}
