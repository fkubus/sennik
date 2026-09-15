@AGENTS.md

# Sennik — słownik snów z interpretacją AI

Polski serwis: darmowe strony symboli sennych jako magnes na ruch z Google
(SEO) + płatna, spersonalizowana interpretacja snów przez AI + subskrypcja
Premium z dziennikiem snów. Model biznesowy: ruch organiczny na darmowe
strony symboli, monetyzacja przez interpretacje AI i subskrypcję.

## Stack

- **Next.js 16** (App Router, Turbopack domyślnie) + **TypeScript strict**
- **Tailwind CSS v4** + **shadcn/ui** (preset Nova, baza Radix)
- **Supabase**: Postgres + Auth (magic link + Google), RLS na każdej tabeli
- **Stripe**: Checkout + webhooki, płatności BLIK/Przelewy24/karta w PLN
- **Anthropic SDK** (`@anthropic-ai/sdk`) do interpretacji snów, model z env
  `ANTHROPIC_MODEL` (domyślnie `claude-haiku-4-5-20251001`)
- **Zod** do walidacji, **Upstash Ratelimit** do rate limitingu
- **Vitest** (testy jednostkowe) + **Playwright** (testy E2E)
- Hosting: **Vercel**. Analityka: **Plausible** (bez ciasteczek śledzących)

⚠️ **Next.js 16 ma zmiany łamiące kompatybilność względem starszych wersji.**
Przed pisaniem kodu związanego z routingiem/cache/obrazami sprawdź
`node_modules/next/dist/docs/` (patrz `AGENTS.md`). Kluczowe różnice
uwzględnione już w tym projekcie:

- `params`, `searchParams`, `cookies()`, `headers()` są **asynchroniczne**
  (`await params` itd.) — dotyczy stron `/sennik/[symbol]`, API routes.
- Middleware nazywa się teraz **`proxy.ts`** (nie `middleware.ts`), runtime
  zawsze `nodejs` (nie `edge`).
- `revalidateTag(tag, profile)` wymaga drugiego argumentu (np. `'max'`).
- Turbopack jest domyślny dla `dev` i `build`; brak `next lint` (używamy
  bezpośrednio ESLint CLI — stąd `pnpm lint`, nie `next lint`).

## Komendy

```bash
pnpm dev              # serwer developerski (Turbopack)
pnpm build            # build produkcyjny
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm format           # Prettier --write
pnpm test             # Vitest (jednorazowo)
pnpm test:watch       # Vitest watch
pnpm e2e              # Playwright (wymaga zbudowanego/uruchomionego dev servera)
# W środowisku z preinstalowaną przeglądarką w innej wersji niż @playwright/test
# oczekuje, ustaw PLAYWRIGHT_CHROMIUM_EXECUTABLE na ścieżkę binarki chrome
# zamiast pobierać nową (patrz playwright.config.ts).

pnpm supabase:start   # lokalny Supabase (Docker)
pnpm supabase:stop
pnpm supabase:types   # generuje lib/supabase/types.ts z połączonego projektu
```

Przed każdym commitem: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

## Struktura projektu

```
/app                  # App Router: strony, layouty, route handlery (/api/**)
/components/ui        # komponenty shadcn/ui (generowane, nie edytować ręcznie
                       # poza drobnymi poprawkami — patrz components.json)
/components/site       # własne komponenty złożone z komponentów ui
/lib/supabase         # klienci: client.ts (przeglądarka), server.ts (SSR,
                       # respektuje RLS, wymaga cookies() — NIE używać w
                       # generateStaticParams/ISR poza requestem), public.ts
                       # (anon bez cookies — do publicznych odczytów przy
                       # SSG/ISR), admin.ts (service_role, tylko serwer)
/lib/ai               # system-prompt.ts, klient Anthropic, wykrywanie kryzysu
/lib/stripe           # klient Stripe, konfiguracja planów/cen
/lib/validations      # schematy Zod
/lib/seo              # metadane, dane strukturalne schema.org, slugify
/data/symbols.json     # lista symboli do wygenerowania szkiców (etap 7)
/scripts              # generate-symbol-drafts.ts, import-symbols.ts
/supabase/migrations  # migracje SQL (numerowane, rosnąco)
/supabase/seed.sql    # dane startowe (kategorie symboli)
/tests                # testy jednostkowe (Vitest)
/e2e                  # testy E2E (Playwright)
```

## Konwencje

- **Wszystkie teksty widoczne dla użytkownika po polsku**, poprawną
  polszczyzną — treść stron, komunikaty błędów, e-maile, etykiety UI.
- **RLS włączone na każdej tabeli Supabase.** Nowa tabela bez polityk RLS =
  błąd. Klient `service_role` (`lib/supabase/admin.ts`) tylko w route
  handlerach/Server Actions, nigdy w komponentach klienckich.
- **Kredyty dodaje wyłącznie webhook Stripe** (`app/api/stripe/webhook`),
  z idempotencją przez tabelę `stripe_events`. Frontend nigdy nie modyfikuje
  `credits` bezpośrednio.
- **Sekrety tylko w zmiennych środowiskowych** — zero kluczy w kodzie. Nowa
  zmienna env → dopisz ją do `.env.example` z komentarzem.
- Treść snów i dziennik snów: kolumny `*_encrypted` (bytea), szyfrowanie
  AES-256-GCM po stronie aplikacji (implementacja w etapie 6).
- Slugi URL: polskie znaki diakrytyczne transliterowane na łacińskie przez
  `lib/seo/slugify.ts` (np. „ząb” → `zab`).
- Domyślny motyw: **ciemny** (klasa `.dark` na `<html>`, patrz
  `app/layout.tsx`), jasny opcjonalny przez przełącznik (`next-themes`,
  etap 2/3).
- Komponenty shadcn/ui dodawać przez `pnpm dlx shadcn@latest add <nazwa>`,
  nie kopiować ręcznie.

## Status

Etap 1 (fundament: konfiguracja projektu, schemat bazy, CLAUDE.md) — ukończony.
Kolejne etapy: patrz konwersacja projektowa / TODO w repo.
