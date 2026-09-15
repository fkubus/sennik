import { siteConfig } from "@/lib/config/site";
import type { SymbolDetail } from "@/lib/content/symbols";

export function buildSymbolJsonLd(symbol: SymbolDetail) {
  const url = `${siteConfig.url}/sennik/${symbol.slug}`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sennik",
        item: `${siteConfig.url}/sennik`,
      },
      ...(symbol.categoryName && symbol.categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: symbol.categoryName,
              item: `${siteConfig.url}/kategoria/${symbol.categorySlug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: symbol.categoryName ? 3 : 2,
        name: symbol.name,
        item: url,
      },
    ],
  };

  const article = {
    "@type": "Article",
    headline: `Sen o: ${symbol.name}`,
    description: symbol.excerpt ?? symbol.metaDescription ?? undefined,
    url,
    dateModified: symbol.updatedAt,
    datePublished: symbol.publishedAt ?? symbol.updatedAt,
    inLanguage: "pl-PL",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faq =
    symbol.faq.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: symbol.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, article, ...(faq ? [faq] : [])],
  };
}
