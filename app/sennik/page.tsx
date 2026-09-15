import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getPublishedSymbols } from "@/lib/content/symbols";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Sennik — znaczenie snów od A do Z",
  description:
    "Pełny indeks symboli sennych — przeglądaj alfabetycznie lub według kategorii i sprawdź, co oznacza Twój sen.",
  alternates: { canonical: `${siteConfig.url}/sennik` },
};

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export default async function SennikIndexPage() {
  const [symbols, categories] = await Promise.all([
    getPublishedSymbols(),
    getCategories(),
  ]);

  const grouped = new Map<string, typeof symbols>();
  for (const symbol of symbols) {
    const letter = symbol.name[0]?.toLowerCase() ?? "#";
    const key = ALPHABET.includes(letter) ? letter : "#";
    grouped.set(key, [...(grouped.get(key) ?? []), symbol]);
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Sennik od A do Z
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-balance">
          {symbols.length} symboli sennych — wybierz kategorię albo znajdź
          symbol alfabetycznie.
        </p>
      </header>

      {categories.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-4 text-lg font-semibold">Kategorie</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/kategoria/${category.slug}`}
                className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 text-lg font-semibold">Indeks alfabetyczny</h2>
        {symbols.length === 0 ? (
          <p className="text-muted-foreground">
            Symbole pojawią się tutaj wkrótce.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {[...grouped.entries()]
              .sort(([a], [b]) => a.localeCompare(b, "pl"))
              .map(([letter, letterSymbols]) => (
                <div key={letter} id={letter}>
                  <h3 className="text-primary mb-3 text-2xl font-bold uppercase">
                    {letter}
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
                    {letterSymbols
                      .sort((a, b) => a.name.localeCompare(b.name, "pl"))
                      .map((symbol) => (
                        <li key={symbol.slug}>
                          <Link
                            href={`/sennik/${symbol.slug}`}
                            className="text-foreground/90 hover:text-primary text-sm transition-colors"
                          >
                            {symbol.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
