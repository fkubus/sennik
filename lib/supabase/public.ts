import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Klient do publicznych, anonimowych odczytów (symbole, kategorie, blog).
 * W odróżnieniu od lib/supabase/server.ts NIE jest powiązany z ciasteczkami
 * requestu, więc można go bezpiecznie wywoływać w generateStaticParams,
 * podczas rewalidacji ISR i w innych kontekstach bez żądania HTTP.
 * Respektuje RLS jak każdy klient z kluczem anon — działa tylko na danych
 * publicznie dostępnych (np. symbols.status = 'published').
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    },
  );
}
