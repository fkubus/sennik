-- Dane startowe dla środowiska lokalnego/deweloperskiego.
insert into public.symbol_categories (slug, name, description, sort_order) values
  ('zwierzeta', 'Zwierzęta', 'Sny o zwierzętach dzikich, domowych i mitycznych.', 1),
  ('ludzie', 'Ludzie', 'Sny o bliskich, nieznajomych i postaciach z przeszłości.', 2),
  ('miejsca', 'Miejsca', 'Sny o domach, miastach, naturze i przestrzeniach.', 3),
  ('przedmioty', 'Przedmioty', 'Sny o rzeczach codziennego użytku i symbolicznych obiektach.', 4),
  ('emocje', 'Emocje i sytuacje', 'Sny o uczuciach, pogoni, spadaniu, egzaminach.', 5),
  ('zywioly', 'Żywioły', 'Sny o wodzie, ogniu, ziemi i powietrzu.', 6)
on conflict (slug) do nothing;
