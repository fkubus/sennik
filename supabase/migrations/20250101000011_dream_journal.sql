-- Dziennik snów (funkcja Premium). Treść snu szyfrowana jak w interpretations.
create table public.dream_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text,
  dream_text_encrypted bytea not null,
  tags text[] not null default '{}',
  mood text,
  dreamed_at date,
  interpretation_id uuid references public.interpretations (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index dream_journal_user_id_idx on public.dream_journal (user_id, dreamed_at desc);

alter table public.dream_journal enable row level security;

create policy "dream_journal_select_own"
  on public.dream_journal for select
  using (auth.uid() = user_id);

create policy "dream_journal_insert_own"
  on public.dream_journal for insert
  with check (auth.uid() = user_id);

create policy "dream_journal_update_own"
  on public.dream_journal for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "dream_journal_delete_own"
  on public.dream_journal for delete
  using (auth.uid() = user_id);

create trigger dream_journal_set_updated_at
  before update on public.dream_journal
  for each row execute function public.set_updated_at();
