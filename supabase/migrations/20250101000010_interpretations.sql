-- Treść snu i odpowiedź AI trzymane w postaci zaszyfrowanej (AES-256-GCM,
-- szyfrowanie/deszyfrowanie po stronie aplikacji — patrz lib/crypto w etapie 6).
-- RLS ogranicza dostęp do właściciela; nawet rola 'admin' nie ma tu wglądu.
create table public.interpretations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  dream_text_encrypted bytea not null,
  emotions text[] not null default '{}',
  life_context_encrypted bytea,
  ai_response_encrypted bytea,
  model_used text,
  tokens_used integer,
  credit_transaction_id uuid references public.credit_transactions (id) on delete set null,
  created_at timestamptz not null default now()
);

create index interpretations_user_id_idx on public.interpretations (user_id, created_at desc);

alter table public.interpretations enable row level security;

create policy "interpretations_select_own"
  on public.interpretations for select
  using (auth.uid() = user_id);

create policy "interpretations_insert_own"
  on public.interpretations for insert
  with check (auth.uid() = user_id);

create policy "interpretations_delete_own"
  on public.interpretations for delete
  using (auth.uid() = user_id);

-- Brak polityki update: historia interpretacji jest niemutowalna dla użytkownika.
