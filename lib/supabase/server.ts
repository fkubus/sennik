import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";

/**
 * Klient Supabase dla Server Components / Server Actions / Route Handlerów,
 * działający w kontekście zalogowanego użytkownika (respektuje RLS).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Wywołane z Server Component bez możliwości zapisu ciasteczek —
            // sesja i tak zostanie odświeżona przez proxy.ts przy kolejnym żądaniu.
          }
        },
      },
    },
  );
}
