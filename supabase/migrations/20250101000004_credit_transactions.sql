-- Rejestr (ledger) wszystkich zmian salda kredytów — do historii i audytu.
create type public.credit_transaction_type as enum (
  'free_trial',
  'purchase',
  'subscription_grant',
  'monthly_reset',
  'consumption',
  'refund'
);

create table public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  type public.credit_transaction_type not null,
  amount integer not null,
  stripe_event_id text unique,
  description text,
  created_at timestamptz not null default now()
);

create index credit_transactions_user_id_idx on public.credit_transactions (user_id, created_at desc);

alter table public.credit_transactions enable row level security;

create policy "credit_transactions_select_own"
  on public.credit_transactions for select
  using (auth.uid() = user_id);

-- Brak polityk insert/update/delete dla ról authenticated/anon —
-- zapisy wyłącznie przez service_role (webhook Stripe, endpoint interpretacji).
