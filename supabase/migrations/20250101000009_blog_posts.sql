create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status public.content_status not null default 'draft',
  excerpt text,
  content_md text not null default '',
  cover_image_url text,
  meta_title text,
  meta_description text,
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index blog_posts_status_idx on public.blog_posts (status);

alter table public.blog_posts enable row level security;

create policy "blog_posts_select_published"
  on public.blog_posts for select
  using (status = 'published');

create policy "blog_posts_admin_all"
  on public.blog_posts for all
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

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();
