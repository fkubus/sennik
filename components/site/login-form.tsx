"use client";

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import {
  sendMagicLink,
  type SendMagicLinkState,
} from "@/app/logowanie/actions";

const initialState: SendMagicLinkState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Wysyłanie…
        </>
      ) : (
        <>
          <Mail />
          Wyślij link logowania
        </>
      )}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(sendMagicLink, initialState);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const consentId = useId();

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Adres e-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ty@przyklad.pl"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id={consentId}
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            className="mt-1"
          />
          <Label
            htmlFor={consentId}
            className="text-muted-foreground font-normal"
          >
            Akceptuję{" "}
            <a href="/regulamin" className="text-primary underline">
              Regulamin
            </a>{" "}
            i{" "}
            <a href="/polityka-prywatnosci" className="text-primary underline">
              Politykę prywatności
            </a>
            .
          </Label>
        </div>

        {state.status !== "idle" && (
          <p
            role="alert"
            className={
              state.status === "success"
                ? "text-sm text-emerald-500"
                : "text-destructive text-sm"
            }
          >
            {state.message}
          </p>
        )}

        <fieldset disabled={!consentAccepted} className="contents">
          <SubmitButton />
        </fieldset>
      </form>

      <div className="flex items-center gap-3">
        <div className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-xs">lub</span>
        <div className="bg-border h-px flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={!consentAccepted}
        onClick={handleGoogleLogin}
      >
        Kontynuuj z Google
      </Button>
    </div>
  );
}
