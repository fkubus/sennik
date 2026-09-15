import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Klient z kluczem service_role — omija RLS.
 * Używać WYŁĄCZNIE w zaufanym kodzie serwerowym: webhook Stripe,
 * odejmowanie/dodawanie kredytów, operacje panelu admina po weryfikacji roli.
 * Nigdy nie importować w komponentach klienckich ani przekazywać do przeglądarki.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
