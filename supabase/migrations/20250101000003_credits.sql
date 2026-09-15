-- Stan kredytów użytkownika (jeden wiersz na użytkownika).
-- Zapis wyłącznie przez service_role — patrz polityki poniżej i webhook Stripe.
create table public.credits (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  balance integer not null default 0,
  free_trial_used boolean not null default false,
  monthly_used integer not null default 0,
  monthly_reset_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint credits_balance_non_negative check (balance >= 0)
);

alter table public.credits enable row level security;

create policy "credits_select_own"
  on public.credits for select
  using (auth.uid() = user_id);

create trigger credits_set_updated_at
  before update on public.credits
  for each row execute function public.set_updated_at();
