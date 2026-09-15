import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import type { SymbolDetail } from "@/lib/content/symbols";

export function buildSymbolMetadata(symbol: SymbolDetail): Metadata {
  const title =
    symbol.metaTitle ?? `Sen o: ${symbol.name} — znaczenie i interpretacja`;
  const description =
    symbol.metaDescription ??
    symbol.excerpt ??
    `Co oznacza sen o ${symbol.name.toLowerCase()}? Sprawdź znaczenie symboliczne, najczęstsze warianty i psychologiczną interpretację.`;
  const url = `${siteConfig.url}/sennik/${symbol.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}
