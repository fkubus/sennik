import type { MetadataRoute } from "next";
import { getCategories, getPublishedSymbols } from "@/lib/content/symbols";
import { siteConfig } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [symbols, categories] = await Promise.all([
    getPublishedSymbols(),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteConfig.url}/sennik`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/interpretacja`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const symbolRoutes: MetadataRoute.Sitemap = symbols.map((symbol) => ({
    url: `${siteConfig.url}/sennik/${symbol.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/kategoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...symbolRoutes, ...categoryRoutes];
}
