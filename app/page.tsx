import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-4">
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
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/sennik">Przeglądaj sennik</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/interpretacja">Zinterpretuj swój sen z AI</Link>
        </Button>
      </div>

      <Card className="max-w-xl border-dashed">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Strona w budowie
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          To jest etap 1 projektu — fundament aplikacji. Strony symboli,
          wyszukiwarka i interpretacja AI pojawią się w kolejnych etapach.
        </CardContent>
      </Card>
    </main>
  );
}
