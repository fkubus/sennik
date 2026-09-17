-- Naprawa: "profiles_select_admin" (i polityki *_admin_all na symbols/
-- blog_posts/symbol_categories) odpytywały public.profiles wewnątrz
-- własnej polityki RLS na profiles, co dawało nieskończoną rekurencję
-- (Postgres error 42P17) przy każdym zapytaniu do tych tabel.
--
-- Rozwiązanie: funkcja SECURITY DEFINER, która sprawdza rolę użytkownika
-- z pominięciem RLS (funkcja należy do właściciela migracji, który ma
-- uprawnienie BYPASSRLS), więc nie wywołuje ponownie polityk profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
  on public.profiles for select
  using (public.is_admin());

drop policy if exists "symbol_categories_admin_all" on public.symbol_categories;
create policy "symbol_categories_admin_all"
  on public.symbol_categories for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "symbols_admin_all" on public.symbols;
create policy "symbols_admin_all"
  on public.symbols for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "blog_posts_admin_all" on public.blog_posts;
create policy "blog_posts_admin_all"
  on public.blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());
