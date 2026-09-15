import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBox } from "@/components/site/search-box";
import { getPublishedSymbols } from "@/lib/content/symbols";

const POPULAR_SLUGS = [
  "woda",
  "zeby",
  "latanie",
  "spadanie",
  "waz",
  "smierc",
  "ciaza",
  "ogien",
  "dom",
  "pogon",
];

export default async function Home() {
  const symbols = await getPublishedSymbols();
  const bySlug = new Map(symbols.map((s) => [s.slug, s]));
  const popular = POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <main className="flex flex-1 flex-col items-center gap-16 px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-6">
        <span className="text-primary text-sm font-medium tracking-widest uppercase">
          Sennik
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Odkryj, co naprawdę mówią Twoje sny
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg text-balance">
          Przeglądaj znaczenia symboli sennych lub zamień swój sen w
          spersonalizowaną interpretację przygotowaną przez AI.
        </p>

        <SearchBox symbols={symbols} />

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/interpretacja">Zinterpretuj swój sen z AI</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/sennik">Przeglądaj cały sennik</Link>
          </Button>
        </div>
      </div>

      {popular.length > 0 && (
        <section className="w-full max-w-4xl text-left">
          <h2 className="mb-6 text-center text-xl font-semibold">
            Popularne symbole
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {popular.map((symbol) => (
              <Card
                key={symbol.slug}
                className="hover:border-primary/50 transition-colors"
              >
                <Link href={`/sennik/${symbol.slug}`}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-center text-base font-medium">
                      {symbol.name}
                    </CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Card className="max-w-xl border-dashed">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Wciąż rozbudowujemy sennik
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Dziennik snów, konto użytkownika i pełny system subskrypcji pojawią
          się w kolejnych etapach projektu.
        </CardContent>
      </Card>
    </main>
  );
}
