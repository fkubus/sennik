import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "@/app/konto/actions";

export const metadata: Metadata = {
  title: "Moje konto",
  robots: { index: false },
};

export default async function KontoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/logowanie");

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Moje konto</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">{user.email}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-4 text-sm">
          <p>
            Kredyty, historia interpretacji, dziennik snów i zarządzanie
            subskrypcją pojawią się tutaj w kolejnych etapach projektu.
          </p>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Wyloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
