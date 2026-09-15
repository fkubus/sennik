-- Przy rejestracji: tworzy profil, inicjalizuje kredyty i przyznaje
-- 1 darmową interpretację (patrz credits.balance + wpis w credit_transactions).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);

  insert into public.credits (user_id, balance)
  values (new.id, 1);

  insert into public.credit_transactions (user_id, type, amount, description)
  values (new.id, 'free_trial', 1, 'Darmowa interpretacja po rejestracji');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
