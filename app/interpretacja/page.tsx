import type { Metadata } from "next";
import { DreamInterpretationForm } from "@/components/site/dream-interpretation-form";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Interpretacja snu przez AI",
  description:
    "Opisz swój sen i otrzymaj spersonalizowaną, symboliczno-psychologiczną interpretację przygotowaną przez AI.",
  alternates: { canonical: `${siteConfig.url}/interpretacja` },
};

export default function InterpretacjaPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <header className="mb-10 text-center">
        <span className="text-primary text-sm font-medium tracking-widest uppercase">
          Interpretacja AI
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Co oznacza Twój sen?
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-balance">
          Opisz sen własnymi słowami — im więcej szczegółów, tym trafniejsza
          będzie interpretacja.
        </p>
      </header>

      <DreamInterpretationForm />

      <p className="text-muted-foreground mt-10 text-center text-xs text-balance">
        Interpretacja ma charakter rozrywkowy i refleksyjny — nie stanowi porady
        medycznej, psychologicznej ani przepowiedni przyszłości. W sprawach
        zdrowia psychicznego skonsultuj się ze specjalistą.
      </p>
    </main>
  );
}
