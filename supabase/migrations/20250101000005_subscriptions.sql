create type public.subscription_status as enum (
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete'
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  status public.subscription_status not null,
  plan text not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- Zapis wyłącznie przez service_role (webhook Stripe).
