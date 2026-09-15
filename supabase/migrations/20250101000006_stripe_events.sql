-- Log przetworzonych zdarzeń webhooka Stripe — zapewnia idempotentność
-- (to samo zdarzenie nie doda kredytów dwa razy).
create table public.stripe_events (
  stripe_event_id text primary key,
  type text not null,
  processed_at timestamptz not null default now()
);

alter table public.stripe_events enable row level security;

-- Brak jakichkolwiek polityk: tabela dostępna wyłącznie dla service_role.
