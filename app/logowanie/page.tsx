import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/site/login-form";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Zaloguj się",
  description: "Zaloguj się do Sennika linkiem e-mail lub kontem Google.",
  alternates: { canonical: `${siteConfig.url}/logowanie` },
};

export default async function LogowaniePage(props: PageProps<"/logowanie">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/konto");

  const searchParams = await props.searchParams;
  const hasAuthError = searchParams?.error === "auth";

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Zaloguj się</h1>
        <p className="text-muted-foreground mt-2 text-sm text-balance">
          Bez hasła — wyślemy Ci link logowania na e-mail, albo zaloguj się
          przez Google.
        </p>
      </header>

      {hasAuthError && (
        <p className="text-destructive mb-4 text-center text-sm" role="alert">
          Link logowania wygasł lub jest nieprawidłowy. Spróbuj ponownie.
        </p>
      )}

      <LoginForm />
    </main>
  );
}
