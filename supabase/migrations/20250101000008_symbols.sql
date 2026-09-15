create type public.content_status as enum ('draft', 'published');

create table public.symbols (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_id uuid references public.symbol_categories (id) on delete set null,
  status public.content_status not null default 'draft',
  excerpt text,
  content_md text not null default '',
  variants jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  related_slugs text[] not null default '{}',
  meta_title text,
  meta_description text,
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index symbols_status_idx on public.symbols (status);
create index symbols_category_id_idx on public.symbols (category_id);

alter table public.symbols enable row level security;

create policy "symbols_select_published"
  on public.symbols for select
  using (status = 'published');

create policy "symbols_admin_all"
  on public.symbols for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create trigger symbols_set_updated_at
  before update on public.symbols
  for each row execute function public.set_updated_at();
