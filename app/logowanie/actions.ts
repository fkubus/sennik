"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";
import { checkAuthRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/config/site";

export interface SendMagicLinkState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function sendMagicLink(
  _prevState: SendMagicLinkState,
  formData: FormData,
): Promise<SendMagicLinkState> {
  const parsed = loginSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const identifier = forwardedFor?.split(",")[0]?.trim() ?? "anonymous";

  const rateLimit = await checkAuthRateLimit(identifier);
  if (!rateLimit.success) {
    return {
      status: "error",
      message:
        "Zbyt wiele prób w krótkim czasie. Spróbuj ponownie za kilka minut.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${siteConfig.url}/auth/callback`,
    },
  });

  if (error) {
    return {
      status: "error",
      message: "Nie udało się wysłać linku logowania. Spróbuj ponownie.",
    };
  }

  return {
    status: "success",
    message: "Sprawdź swoją skrzynkę e-mail — wysłaliśmy link do logowania.",
  };
}
