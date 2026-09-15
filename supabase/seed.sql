-- Dane startowe dla środowiska lokalnego/deweloperskiego.
insert into public.symbol_categories (slug, name, description, sort_order) values
  ('zwierzeta', 'Zwierzęta', 'Sny o zwierzętach dzikich, domowych i mitycznych.', 1),
  ('ludzie', 'Ludzie', 'Sny o bliskich, nieznajomych i postaciach z przeszłości.', 2),
  ('miejsca', 'Miejsca', 'Sny o domach, miastach, naturze i przestrzeniach.', 3),
  ('przedmioty', 'Przedmioty', 'Sny o rzeczach codziennego użytku i symbolicznych obiektach.', 4),
  ('emocje', 'Emocje i sytuacje', 'Sny o uczuciach, pogoni, spadaniu, egzaminach.', 5),
  ('zywioly', 'Żywioły', 'Sny o wodzie, ogniu, ziemi i powietrzu.', 6)
on conflict (slug) do nothing;

-- 10 przykładowych symboli (etap 2) — treść oryginalna, opublikowana od razu
-- jako materiał demonstracyjny (w odróżnieniu od masowych szkiców z etapu 7,
-- które trafiają do bazy ze statusem 'draft' do ręcznej redakcji).

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'woda',
  'Woda',
  (select id from public.symbol_categories where slug = 'zywioly'),
  'published',
  $excerpt$Woda w snach najczęściej symbolizuje emocje i stan podświadomości — jej klarowność, ruch i temperatura mówią o tym, co dzieje się w Twoim wnętrzu.$excerpt$,
  $content$Woda należy do najstarszych i najbardziej uniwersalnych symboli sennych. Pojawia się w prawie każdej kulturze jako obraz emocji, podświadomości i tego, co płynne, zmienne i trudne do uchwycenia w naszym życiu wewnętrznym. Kiedy śni nam się woda, warto przyjrzeć się nie tylko temu, że w ogóle się pojawiła, ale przede wszystkim jej stanowi — czy była spokojna, czy wzburzona, czysta czy mętna, głęboka czy płytka.

## Woda jako lustro emocji

W psychologii snu woda często odzwierciedla to, jak radzimy sobie z własnymi uczuciami. Spokojna, gładka tafla wody może wskazywać na wewnętrzną równowagę i poczucie bezpieczeństwa emocjonalnego. Wzburzone fale czy sztorm na morzu bywają natomiast obrazem chaosu, którego doświadczamy na jawie — nagromadzonego stresu, tłumionego gniewu albo lęku, z którym trudno nam sobie poradzić w ciągu dnia.

## Głębokość i klarowność

Głębokość wody w śnie bywa odczytywana jako miara tego, jak blisko jesteśmy kontaktu z własną podświadomością. Płynięcie po powierzchni płytkiego jeziora może sugerować, że funkcjonujemy na poziomie zadań i obowiązków, nie sięgając do tego, co naprawdę czujemy. Zanurzenie się w głębinie, szczególnie jeśli towarzyszy mu ciekawość, a nie strach, bywa symbolem gotowości do zmierzenia się z trudniejszymi, głębiej ukrytymi emocjami.

Czystość wody ma podobne znaczenie — przejrzysta, krystaliczna woda kojarzy się z jasnością myślenia i szczerością wobec samego siebie, podczas gdy mętna, brudna woda może sygnalizować splątanie emocjonalne, niewyjaśnioną sytuację życiową albo poczucie, że coś „mąci” nasz spokój, nawet jeśli trudno to nazwać.

## Ruch wody a kierunek zmian

Warto zwrócić uwagę na to, czy woda płynęła, czy stała w miejscu. Rwący nurt rzeki bywa obrazem sytuacji, nad którą nie mamy pełnej kontroli — życie niesie nas w określonym kierunku, czy tego chcemy, czy nie. Stojąca woda, jak w stawie czy jeziorze, częściej wiąże się z okresem zastoju, refleksji, a czasem stagnacji, która domaga się jakiegoś ruchu.

## Kontekst osobisty ma znaczenie

Symbolika wody nigdy nie działa w oderwaniu od tego, co dzieje się w życiu śniącego. Ta sama scena — pływanie w morzu — może dla jednej osoby oznaczać ukojenie po trudnym okresie, a dla innej, która niedawno przeżyła coś trudnego związanego z wodą, wywoływać zupełnie inne, bardziej niepokojące skojarzenia. Dlatego opis snu o wodzie warto zestawić z tym, co aktualnie dzieje się w Twoim życiu emocjonalnym — to właśnie ten kontekst, a nie sam symbol, niesie najwięcej informacji.

## Pogoda i temperatura wody

Warto zwrócić uwagę także na okoliczności, w jakich woda się pojawia. Łagodny deszcz spadający na spokojny krajobraz częściej kojarzy się z oczyszczeniem i ulgą po trudnym okresie, podczas gdy powódź czy nagła fala — z przytłaczającym napływem emocji, których nie zdążyliśmy jeszcze przetworzyć. Temperatura wody również ma znaczenie: ciepła, przyjemna kąpiel zwykle wskazuje na emocjonalny komfort i bliskość, a lodowata, przenikliwie zimna woda — na dystans, chłód w relacji albo emocje, które trzymamy na uwięzi.$content$,
  $json$[
    {"label": "Czysta, spokojna woda", "content": "Zwykle wiąże się z poczuciem wewnętrznego spokoju, jasnością myślenia i akceptacją własnych emocji. To dobry znak, że aktualnie jesteś w zgodzie sam ze sobą."},
    {"label": "Mętna lub brudna woda", "content": "Może wskazywać na emocjonalne zamieszanie, nierozwiązaną sytuację albo uczucia, których jeszcze nie potrafisz nazwać. Warto zastanowić się, co ostatnio „mąci” Twój spokój."},
    {"label": "Sztorm lub wzburzone fale", "content": "Symbolizuje silne, często tłumione emocje — stres, niepokój albo gniew, które domagają się ujścia. To sygnał, by dać sobie przestrzeń na ich przeżycie."},
    {"label": "Tonięcie w wodzie", "content": "Często pojawia się w okresach, gdy czujemy się przytłoczeni obowiązkami lub emocjami. To sen-ostrzeżenie, by nie brać na siebie zbyt wiele naraz."}
  ]$json$::jsonb,
  $json$[
    {"question": "Co oznacza sen o czystej wodzie?", "answer": "Najczęściej symbolizuje spokój wewnętrzny, jasność umysłu i dobry kontakt z własnymi emocjami."},
    {"question": "Dlaczego śni mi się, że tonę w wodzie?", "answer": "Sen o tonięciu często pojawia się, gdy czujemy się przytłoczeni obowiązkami lub silnymi emocjami, nad którymi trudno nam zapanować."},
    {"question": "Czy sen o wodzie zawsze dotyczy emocji?", "answer": "W większości interpretacji symbolicznych tak, choć znaczenie zależy też od kontekstu — np. snu o suszy czy braku wody, który bywa odczytywany inaczej."}
  ]$json$::jsonb,
  ARRAY['ogien','spadanie','pogon']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'zeby',
  'Zęby',
  (select id from public.symbol_categories where slug = 'emocje'),
  'published',
  $excerpt$Sen o wypadających zębach to jeden z najczęstszych snów na świecie — zwykle wiąże się z lękiem przed utratą kontroli, zmianą albo troską o to, jak jesteśmy postrzegani.$excerpt$,
  $content$Sny o zębach, a zwłaszcza o ich wypadaniu, kruszeniu się czy łamaniu, należą do najczęściej zgłaszanych snów na świecie — niezależnie od kultury czy szerokości geograficznej. Ich powszechność sprawia, że psychologowie snu poświęcili im wyjątkowo dużo uwagi, choć wciąż nie ma jednej, ostatecznej interpretacji. Najczęściej łączy się je z tematami kontroli, pewności siebie i tego, jak prezentujemy się światu.

## Utrata kontroli i lęk przed zmianą

Zęby są częścią ciała, którą utożsamiamy z siłą, pewnością i zdolnością do „gryzienia się” z problemami. Kiedy w śnie wypadają lub kruszą się, często odzwierciedla to poczucie, że tracimy kontrolę nad jakimś obszarem życia — zawodowym, finansowym albo relacyjnym. Ten sen bywa szczególnie częsty w okresach dużych zmian: nowej pracy, przeprowadzki, rozstania czy innej sytuacji, w której grunt zaczyna nam się chwiać pod nogami.

## Troska o wizerunek

Zęby są też jednym z pierwszych elementów, na które zwracamy uwagę, patrząc na czyjąś twarz — mają duży wpływ na to, jak jesteśmy postrzegani. Sen o zniszczonych, brzydkich czy wypadających zębach bywa więc odczytywany jako lęk związany z samooceną, obawa przed oceną innych albo poczucie, że tracimy coś, co budowało naszą pewność siebie.

## Stres i napięcie

Nie bez znaczenia jest też fizjologia — osoby, które w ciągu dnia zaciskają zęby lub cierpią na bruksizm nasilający się w stresie, częściej miewają tego typu sny. W takim wypadku sen może być odbiciem realnego napięcia w szczęce, a nie tylko symbolicznym przekazem. Jeśli tego typu sny powtarzają się bardzo często, warto rozważyć rozmowę zarówno ze stomatologiem, jak i — jeśli towarzyszy im silny niepokój — ze specjalistą zajmującym się stresem.

## Wyrastające lub zdrowe zęby

Nie każdy sen o zębach jest niepokojący. Sny, w których zęby rosną, są wyjątkowo białe i mocne, częściej wiążą się z poczuciem siły, dojrzewania do nowej roli albo gotowości do zmierzenia się z wyzwaniem. Warto więc zwracać uwagę nie tylko na sam fakt pojawienia się zębów w śnie, ale też na to, w jakim są stanie i jakie towarzyszą temu emocje.

## Co zrobić z takim snem

Zamiast szukać jednej uniwersalnej odpowiedzi, warto zapytać siebie: w jakim obszarze życia ostatnio czuję, że grunt się pode mną chwieje? Gdzie boję się utraty kontroli albo oceny innych? Sen o zębach rzadko jest przepowiednią — znacznie częściej jest zaproszeniem do przyjrzenia się własnemu poczuciu stabilności.

## Zęby u dentysty we śnie

Częstym wariantem jest też sen, w którym siedzimy na fotelu dentystycznym, poddajemy się leczeniu albo obserwujemy, jak ktoś naprawia nasze zęby. Taki obraz bywa odczytywany jako gotowość do „naprawienia” tego, co w nas nadszarpnięte — podjęcia działań, które mają przywrócić poczucie kontroli i pewności siebie, zamiast biernego czekania, aż sytuacja rozwiąże się sama.$content$,
  $json$[
    {"label": "Wypadające zęby", "content": "Najczęstszy wariant tego snu, zwykle związany z lękiem przed utratą kontroli lub dużą zmianą życiową."},
    {"label": "Kruszące się lub łamiące zęby", "content": "Może wskazywać na poczucie bezsilności w sytuacji, która wymaga stanowczości i „gryzienia się” z problemem."},
    {"label": "Wyrastające nowe zęby", "content": "Często symbolizuje rozwój, nową siłę lub gotowość do podjęcia wyzwania, przed którym wcześniej się wahaliśmy."},
    {"label": "Brudne lub zepsute zęby", "content": "Bywa łączone z troską o to, jak jesteśmy postrzegani przez innych, lub z poczuciem zaniedbania jakiegoś obszaru życia."}
  ]$json$::jsonb,
  $json$[
    {"question": "Czy sen o wypadających zębach oznacza czyjąś śmierć?", "answer": "To popularne, ludowe przekonanie, ale współczesna psychologia snu nie potwierdza takiego związku — znacznie częściej sen ten łączy się z lękiem przed utratą kontroli."},
    {"question": "Dlaczego tak często śnią się zęby?", "answer": "To jeden z najpowszechniejszych motywów sennych na świecie, prawdopodobnie dlatego, że zęby symbolizują siłę, pewność siebie i kontrolę — tematy, które dotyczą niemal każdego z nas."},
    {"question": "Co zrobić, jeśli sen o zębach powtarza się bardzo często?", "answer": "Warto sprawdzić, czy nie towarzyszy mu bruksizm (zaciskanie zębów w nocy), a jeśli sen wywołuje silny niepokój — rozważyć rozmowę ze specjalistą."}
  ]$json$::jsonb,
  ARRAY['spadanie','pogon','smierc']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'latanie',
  'Latanie',
  (select id from public.symbol_categories where slug = 'emocje'),
  'published',
  $excerpt$Sen o lataniu zwykle wiąże się z poczuciem wolności, kontroli nad własnym życiem i wewnętrzną siłą — choć to, jak latamy, mówi o wiele więcej.$excerpt$,
  $content$Latanie we śnie to jedno z najprzyjemniejszych, najczęściej pozytywnie wspominanych doświadczeń sennych. Wielu ludzi budzi się po takim śnie z poczuciem lekkości i euforii, które trudno odtworzyć na jawie. Nic dziwnego — symbolika latania od wieków wiąże się z wolnością, przekraczaniem ograniczeń i zdolnością do spojrzenia na swoje życie z dystansu.

## Wolność i kontrola

Najczęstsza interpretacja snu o lataniu dotyczy poczucia wolności — od obowiązków, oczekiwań innych albo sytuacji, która na jawie wydaje się przytłaczająca. To sen, który często pojawia się w momentach, gdy udało nam się przezwyciężyć coś trudnego, podjąć odważną decyzję albo uwolnić się od relacji czy pracy, która nas ograniczała.

Ważne jest też to, jak przebiega samo latanie. Swobodny, kontrolowany lot, podczas którego czujemy się pewnie, zwykle odzwierciedla realne poczucie sprawczości w życiu — wiarę, że potrafimy pokierować własnym losem. Latanie, które sprawia trudność, podczas którego z wysiłkiem próbujemy utrzymać się w powietrzu, może natomiast wskazywać na sytuację, w której walczymy o utrzymanie kontroli, choć nie do końca nam się to udaje.

## Perspektywa z góry

Lot daje też perspektywę niedostępną na ziemi — możliwość spojrzenia na własne życie z dystansu. Sny, w których z góry obserwujemy znajome miejsca, bywają odczytywane jako potrzeba spojrzenia na jakiś problem szerzej, bez emocjonalnego zaangażowania, które towarzyszy nam na co dzień.

## Strach przed lataniem lub spadaniem podczas lotu

Nie każdy sen o lataniu jest przyjemny. Czasem towarzyszy mu lęk wysokości, obawa przed upadkiem albo poczucie, że w każdej chwili możemy stracić zdolność latania. Taki sen bywa obrazem niepewności — sukcesu lub wolności, którą osiągnęliśmy, ale w którą do końca nie wierzymy, obawiając się, że w każdej chwili może nam zostać odebrana.

## Latanie jako metafora ambicji

Sen o lataniu bywa też odczytywany jako wyraz ambicji i dążenia do celów, które na jawie wydają się odległe. Wznoszenie się coraz wyżej, w stronę słońca czy chmur, symbolizuje wtedy dążenie do rozwoju osobistego lub zawodowego oraz wiarę we własny potencjał.

Niezależnie od szczegółów, sen o lataniu warto potraktować jako zaproszenie do zapytania siebie: gdzie w życiu czuję się naprawdę wolny, a gdzie wciąż próbuję się wznieść?

## Latanie z innymi osobami lub przedmiotami

Sposób, w jaki latamy, również niesie znaczenie. Latanie razem z kimś bliskim bywa obrazem wspólnej drogi, którą podążamy z tą osobą, i wzajemnego wsparcia w dążeniu do celu. Latanie na jakimś obiekcie — dywanie, w samolocie czy na grzbiecie zwierzęcia — może natomiast wskazywać, że nasze poczucie wolności opiera się obecnie na czymś zewnętrznym: relacji, pracy albo okolicznościach, które w każdej chwili mogą się zmienić.$content$,
  $json$[
    {"label": "Swobodny, kontrolowany lot", "content": "Wiąże się z poczuciem sprawczości i wiarą we własne możliwości. To sen osób, które czują, że panują nad swoim życiem."},
    {"label": "Trudność w utrzymaniu lotu", "content": "Może odzwierciedlać sytuację, w której walczysz o utrzymanie kontroli lub poczucia wolności, ale coś Cię w tym ogranicza."},
    {"label": "Latanie tuż nad ziemią", "content": "Często pojawia się, gdy dopiero uczymy się ufać własnym decyzjom — symbolizuje ostrożną, stopniową wolność."},
    {"label": "Strach podczas lotu", "content": "Bywa obrazem niepewności co do trwałości sukcesu lub wolności, którą właśnie osiągnęliśmy."}
  ]$json$::jsonb,
  $json$[
    {"question": "Co oznacza sen, w którym swobodnie latam?", "answer": "Najczęściej symbolizuje poczucie wolności, kontroli nad własnym życiem i wiarę we własne możliwości."},
    {"question": "Dlaczego we śnie boję się latać?", "answer": "Lęk podczas lotu we śnie często wskazuje na niepewność związaną z utrzymaniem sukcesu, wolności lub nowej sytuacji życiowej."},
    {"question": "Czy sen o lataniu zawsze jest pozytywny?", "answer": "Zwykle tak, choć jego wydźwięk zależy od tego, czy lot jest swobodny, czy naznaczony trudnością i lękiem."}
  ]$json$::jsonb,
  ARRAY['spadanie','woda','pogon']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'spadanie',
  'Spadanie',
  (select id from public.symbol_categories where slug = 'emocje'),
  'published',
  $excerpt$Sen o spadaniu to jeden z najbardziej uniwersalnych motywów sennych — zwykle wiąże się z utratą kontroli, niepewnością lub poczuciem, że grunt usuwa nam się spod nóg.$excerpt$,
  $content$Sen o spadaniu to jeden z najstarszych i najbardziej rozpoznawalnych motywów sennych — badacze snu podejrzewają, że może mieć nawet podłoże ewolucyjne, związane z odruchem czuwania nad równowagą. Niezależnie od jego biologicznego źródła, psychologicznie sen o spadaniu niemal zawsze wiąże się z utratą kontroli, poczuciem niestabilności lub obawą, że coś, na czym nam zależało, zaczyna się rozpadać.

## Utrata gruntu pod nogami

Najczęstsza interpretacja tego snu jest dosłowna: „grunt usuwa nam się spod nóg” w jakimś obszarze życia. Może to dotyczyć pracy, która nagle staje się niepewna, relacji, w której czujemy się coraz mniej bezpiecznie, albo planu, który się nie sprawdza tak, jak zakładaliśmy. Spadanie we śnie bywa emocjonalnym odpowiednikiem tego uczucia — nagłej, niekontrolowanej zmiany kierunku.

## Skąd spadamy, ma znaczenie

Warto zwrócić uwagę na to, z jakiego miejsca spadamy. Spadanie z dużej wysokości, na przykład z budynku czy samolotu, częściej wiąże się z lękiem przed utratą czegoś ważnego — pozycji, osiągnięcia, statusu. Spadanie ze schodów lub niewielkiej wysokości bywa raczej odzwierciedleniem drobniejszych, codziennych potknięć i niepewności, które nie zagrażają całej naszej stabilności, ale wciąż są odczuwalne.

## Moment przebudzenia

Wielu ludzi budzi się gwałtownie tuż przed uderzeniem o ziemię, czasem z uczuciem szarpnięcia całego ciała (tzw. mioklonie senne). To zjawisko fizjologiczne, niezwiązane bezpośrednio z treścią snu, choć często wzmacnia poczucie, że sen o spadaniu był wyjątkowo intensywny i realistyczny.

## Spadanie jako sygnał przeciążenia

Sen o spadaniu często pojawia się w okresach dużego stresu, przemęczenia lub wtedy, gdy staramy się utrzymać zbyt wiele „w powietrzu” jednocześnie — projekty, zobowiązania, relacje. W takim ujęciu spadanie jest ostrzeżeniem, że któryś z tych obszarów domaga się uwagi, zanim naprawdę wymknie się spod kontroli.

## Co warto zrobić z takim snem

Zamiast traktować sen o spadaniu jako zapowiedź nieszczęścia, warto zapytać siebie: co ostatnio wymyka mi się spod kontroli? Gdzie czuję, że tracę oparcie? Często sama odpowiedź na te pytania przynosi więcej niż próba dosłownej interpretacji symbolu.

## Spadanie zakończone miękkim lądowaniem

Nie każdy sen o spadaniu musi kończyć się przebudzeniem w panice. Czasem spadanie przechodzi w miękkie, bezpieczne lądowanie albo nawet płynnie zamienia się w lot. Taki przebieg snu bywa dobrym znakiem — sugeruje, że mimo poczucia utraty kontroli, w głębi siebie wierzymy, że sytuacja się unormuje i znajdziemy oparcie, zanim naprawdę dojdzie do „upadku”.

## Spadanie razem z kimś innym

Czasem we śnie spadamy nie sami, lecz razem z drugą osobą, albo obserwujemy, jak spada ktoś bliski. Taki obraz bywa odzwierciedleniem współdzielonego ryzyka lub niepewności — wspólnego projektu, związku czy sytuacji rodzinnej, w której czujemy, że nie tylko my, ale i osoby wokół nas, tracą grunt pod nogami. Warto wtedy zastanowić się, czy nie jest to sygnał, by o tej niepewności otwarcie porozmawiać, zamiast przechodzić przez nią w milczeniu.$content$,
  $json$[
    {"label": "Spadanie z dużej wysokości", "content": "Zwykle wiąże się z lękiem przed utratą czegoś ważnego — pozycji, osiągnięcia lub poczucia bezpieczeństwa."},
    {"label": "Spadanie i nagłe przebudzenie", "content": "Często to zjawisko fizjologiczne (mioklonie senne), niekoniecznie niosące głębsze znaczenie symboliczne."},
    {"label": "Powolne, kontrolowane opadanie", "content": "Bywa łagodniejszą wersją tego snu — sygnalizuje stopniową utratę kontroli, z którą jednak sobie radzimy."},
    {"label": "Spadanie do wody", "content": "Łączy w sobie symbolikę utraty kontroli (spadanie) i zanurzenia w emocjach (woda) — często pojawia się w okresach silnego przeciążenia emocjonalnego."}
  ]$json$::jsonb,
  $json$[
    {"question": "Dlaczego budzę się gwałtownie zaraz po tym, jak spadam we śnie?", "answer": "To najczęściej mioklonie senne — mimowolne szarpnięcie mięśni na granicy snu i czuwania, niezwiązane bezpośrednio z treścią snu."},
    {"question": "Co oznacza powtarzający się sen o spadaniu?", "answer": "Często wskazuje na długotrwały stres lub poczucie, że w jakimś obszarze życia tracimy kontrolę."},
    {"question": "Czy sen o spadaniu jest niebezpieczny?", "answer": "Nie — to jeden z najczęstszych i najbardziej naturalnych motywów sennych, niezwiązany z realnym zagrożeniem."}
  ]$json$::jsonb,
  ARRAY['latanie','zeby','pogon']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'waz',
  'Wąż',
  (select id from public.symbol_categories where slug = 'zwierzeta'),
  'published',
  $excerpt$Wąż to jeden z najbardziej wieloznacznych symboli sennych — może oznaczać zagrożenie i ukryty lęk, ale też przemianę, uzdrowienie i odradzającą się siłę.$excerpt$,
  $content$Niewiele symboli sennych budzi tak skrajne emocje jak wąż. Dla jednych jest uosobieniem zagrożenia i zdrady, dla innych — w tradycjach sięgających starożytnej medycyny i mitologii — symbolem uzdrowienia, przemiany i odradzającej się energii życiowej. Ta dwoistość sprawia, że sen o wężu wymaga szczególnie uważnego przyjrzenia się kontekstowi i emocjom, jakie mu towarzyszyły.

## Zagrożenie i ukryty lęk

W najbardziej intuicyjnej interpretacji wąż symbolizuje zagrożenie — czasem realne, częściej jednak ukryte, trudne do nazwania na jawie. Może reprezentować osobę, której nie do końca ufamy, sytuację, w której czujemy, że coś jest „nie tak”, choć nie potrafimy wskazać co, albo lęk, który świadomie tłumimy w ciągu dnia. Jadowity wąż, który atakuje, często odzwierciedla realny konflikt lub zdradę, jakiej obawiamy się w bliskiej relacji.

## Przemiana i odnowa

Wąż zrzuca skórę, by rosnąć — ten naturalny proces od wieków czyni go symbolem transformacji i odnowy. Sen, w którym wąż zmienia skórę albo po prostu pojawia się w spokojnym, niezagrażającym kontekście, bywa odczytywany jako zapowiedź ważnej zmiany wewnętrznej: kończenia pewnego etapu życia i wchodzenia w nowy, z większą świadomością siebie.

## Energia życiowa i seksualność

W niektórych nurtach psychologii, w tym w tradycji jungowskiej, wąż bywa łączony z energią życiową i seksualnością — pierwotną, instynktowną siłą, która czasem budzi niepokój, bo trudno ją w pełni kontrolować. Sen o wężu może więc pojawiać się w okresach, gdy ta sfera życia domaga się większej uwagi lub szczerości wobec siebie.

## Kolor, zachowanie i liczba węży

Szczegóły snu mają duże znaczenie. Wąż, który ucieka lub jest spokojny, rzadko symbolizuje realne zagrożenie — częściej wskazuje na lęk, który sami sobie stwarzamy. Wiele węży naraz może odzwierciedlać poczucie, że jesteśmy otoczeni trudnościami z wielu stron jednocześnie. Wąż owinięty wokół ciała bywa odczytywany jako sytuacja, która nas „dusi” lub ogranicza, nawet jeśli z zewnątrz wygląda niegroźnie.

## Jak podejść do tego snu

Zamiast od razu zakładać, że sen o wężu jest zły, warto zapytać: czy w tym śnie czułem/-am strach, czy raczej fascynację i spokój? To właśnie emocja, nie sam wąż, najlepiej wskazuje, czy sen mówi o zagrożeniu, które warto rozpoznać, czy o przemianie, na którą jesteśmy gotowi.

## Wąż jako opiekun lub przewodnik

W niektórych snach wąż nie atakuje ani nie ucieka, lecz po prostu towarzyszy nam, obserwuje albo prowadzi w jakimś kierunku. Taki obraz, choć może początkowo budzić niepokój, bywa odczytywany jako kontakt z własną intuicją i pierwotną mądrością, do której na co dzień rzadko sięgamy. Warto wtedy zapytać, dokąd dokładnie prowadził nas ten sen — odpowiedź często okazuje się zaskakująco trafna.$content$,
  $json$[
    {"label": "Wąż atakujący lub jadowity", "content": "Często symbolizuje realny konflikt, zdradę lub lęk przed kimś, komu nie do końca ufamy."},
    {"label": "Wąż zmieniający skórę", "content": "Silny symbol przemiany — zapowiedź zamknięcia pewnego etapu i wejścia w nowy, bardziej dojrzały."},
    {"label": "Wiele węży naraz", "content": "Może wskazywać na poczucie, że problemy otaczają nas z wielu stron jednocześnie."},
    {"label": "Wąż owinięty wokół ciała", "content": "Bywa obrazem sytuacji lub relacji, która nas ogranicza, nawet jeśli pozornie nie wygląda groźnie."}
  ]$json$::jsonb,
  $json$[
    {"question": "Czy sen o wężu zawsze oznacza coś złego?", "answer": "Nie — w zależności od kontekstu może symbolizować zarówno zagrożenie, jak i pozytywną przemianę czy odnowę."},
    {"question": "Co oznacza sen o wężu, który mnie ugryzł?", "answer": "Często wiąże się z poczuciem zdrady lub realnym konfliktem, którego się obawiamy, nawet jeśli nie potrafimy go jeszcze nazwać."},
    {"question": "Dlaczego wąż jest symbolem przemiany?", "answer": "Ponieważ zrzuca skórę, by rosnąć — naturalny proces, który od wieków kojarzony jest z odnową i nowym początkiem."}
  ]$json$::jsonb,
  ARRAY['smierc','woda','dom']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'smierc',
  'Śmierć',
  (select id from public.symbol_categories where slug = 'emocje'),
  'published',
  $excerpt$Sen o śmierci niemal nigdy nie jest dosłowną zapowiedzią — znacznie częściej symbolizuje koniec pewnego etapu życia i przestrzeń na nowy początek.$excerpt$,
  $content$Sen o śmierci należy do tych, które budzą najwięcej niepokoju — i jednocześnie do tych, wokół których narosło najwięcej mitów. Warto powiedzieć to jasno na początku: w psychologii snu sen o śmierci niemal nigdy nie jest traktowany jako dosłowna przepowiednia. Znacznie częściej symbolizuje coś, co się w naszym życiu kończy, aby mogło zacząć się coś nowego.

## Symbol zakończenia, nie zapowiedź

Śmierć we śnie najczęściej odzwierciedla koniec pewnego etapu — relacji, pracy, sposobu myślenia o sobie, a nawet konkretnego nawyku czy tożsamości, którą nosiliśmy przez lata. Ludzki umysł chętnie sięga po obraz śmierci, gdy chce oddać coś tak fundamentalnego jak zamknięcie rozdziału, nawet jeśli na jawie ta zmiana nie wygląda dramatycznie.

## Śmierć własna a śmierć bliskiej osoby

Sen, w którym umieramy sami, często wiąże się z procesem głębokiej wewnętrznej przemiany — porzucaniem starej wersji siebie na rzecz nowej. Bywa też odzwierciedleniem lęku przed utratą kontroli nad własnym życiem. Śmierć bliskiej osoby we śnie rzadko dotyczy realnego zagrożenia dla tej osoby — częściej symbolizuje zmianę w relacji z nią, koniec pewnego etapu wspólnej historii albo, paradoksalnie, nieuświadomiony lęk przed jej utratą, wynikający z tego, jak bardzo jest dla nas ważna.

## Emocje towarzyszące snu

Kluczowe jest to, jakie emocje towarzyszyły snu. Spokój, a nawet ulga w obliczu śmierci we śnie, częściej wskazują na gotowość do zamknięcia jakiegoś etapu i pogodzenie się ze zmianą. Silny lęk i rozpacz mogą natomiast sygnalizować opór przed nieuniknioną zmianą, której się obawiamy, albo niedokończoną sprawę emocjonalną, do której podświadomość wciąż wraca.

## Powtarzające się sny o śmierci

Jeśli sny o śmierci lub umieraniu powracają bardzo często i towarzyszy im silny lęk, warto delikatnie zapytać siebie, czy nie są one odzwierciedleniem głębszego niepokoju, z którym trudno sobie poradzić samodzielnie. W takiej sytuacji rozmowa z psychologiem lub terapeutą może pomóc nazwać to, co sen sygnalizuje w bardziej bezpośredni sposób.

## Jak interpretować taki sen

Zamiast pytać „kogo dotyczy ta śmierć”, warto zapytać: co w moim życiu właśnie się kończy albo powinno się skończyć, żebym mógł/mogła pójść dalej? To pytanie znacznie częściej prowadzi do trafnej interpretacji niż dosłowne odczytanie symbolu.

## Własny pogrzeb we śnie

Sen o uczestniczeniu we własnym pogrzebie, choć brzmi niepokojąco, bywa jednym z bardziej pojednawczych snów z tej kategorii. Obserwowanie żałobników, słuchanie mów pożegnalnych — to często symboliczne podsumowanie zamykanego etapu, niemal jak świadome pożegnanie się z częścią siebie, zanim ruszymy dalej. Emocje, jakie temu towarzyszą, zwykle mówią więcej niż sama scena pogrzebu. Warto też zwrócić uwagę, kto pojawia się na takim pogrzebie — obecność konkretnych osób bywa wskazówką, kogo najbardziej wiążemy z etapem, który właśnie się kończy.$content$,
  $json$[
    {"label": "Własna śmierć we śnie", "content": "Często symbolizuje głęboką wewnętrzną przemianę i porzucanie starej wersji siebie na rzecz nowej."},
    {"label": "Śmierć bliskiej osoby", "content": "Zwykle odzwierciedla zmianę w relacji lub koniec pewnego etapu, a nie realne zagrożenie dla tej osoby."},
    {"label": "Spokojna śmierć, bez lęku", "content": "Bywa oznaką gotowości do zamknięcia rozdziału i pogodzenia się ze zmianą, która nadchodzi."},
    {"label": "Śmierć pełna lęku i rozpaczy", "content": "Może wskazywać na opór przed nieuniknioną zmianą lub niedokończoną sprawę emocjonalną."}
  ]$json$::jsonb,
  $json$[
    {"question": "Czy sen o śmierci zapowiada czyjąś śmierć?", "answer": "Nie ma na to potwierdzonych dowodów — w psychologii snu taki sen niemal zawsze symbolizuje zakończenie pewnego etapu, a nie realne wydarzenie."},
    {"question": "Dlaczego śni mi się własna śmierć?", "answer": "Najczęściej oznacza to głęboką przemianę wewnętrzną — kończysz pewien etap swojego życia lub porzucasz starą wersję siebie."},
    {"question": "Co zrobić, jeśli sny o śmierci bardzo mnie niepokoją i się powtarzają?", "answer": "Jeśli towarzyszy im silny, uporczywy lęk, warto porozmawiać z psychologiem lub terapeutą, który pomoże zrozumieć, co dokładnie sygnalizują."}
  ]$json$::jsonb,
  ARRAY['waz','dom','spadanie']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'ciaza',
  'Ciąża',
  (select id from public.symbol_categories where slug = 'ludzie'),
  'published',
  $excerpt$Sen o ciąży — niezależnie od płci i sytuacji życiowej śniącego — najczęściej symbolizuje coś nowego, co dopiero się w nas rozwija: pomysł, projekt albo nową wersję siebie.$excerpt$,
  $content$Sen o ciąży pojawia się nie tylko u kobiet planujących powiększenie rodziny — śnią o nim równie często mężczyźni, osoby, które nie planują dzieci, a nawet nastolatkowie. To dobry punkt wyjścia do zrozumienia, że w większości przypadków sen ten nie dotyczy dosłownie macierzyństwa, lecz czegoś, co dopiero zaczyna się w naszym życiu rozwijać.

## Narodziny czegoś nowego

Ciąża to w naturalny sposób symbol czegoś, co jest w trakcie powstawania, ale jeszcze nie w pełni gotowe — nowego projektu, pomysłu, relacji, a nawet nowej wersji samego siebie, którą dopiero „nosimy w sobie”. Sen o ciąży często pojawia się na początku ważnego przedsięwzięcia, gdy mamy poczucie, że coś ważnego dopiero raczkuje i wymaga czasu, zanim będzie gotowe na świat.

## Lęk i niepewność

Ciąża we śnie bywa też źródłem niepokoju — zwłaszcza jeśli towarzyszy jej strach przed nieznanym. To odzwierciedla naturalny lęk związany z każdym nowym początkiem: nie wiemy jeszcze, jak potoczy się to, co zaczynamy, i czy podołamy odpowiedzialności, którą to za sobą niesie. Sen, w którym ciąża przebiega spokojnie, częściej wskazuje na gotowość do podjęcia tego wyzwania.

## Ciąża u mężczyzn i osób niebędących w ciąży

Sen o własnej ciąży u mężczyzny albo u kobiety, która nie planuje dziecka, nie powinien być odczytywany dosłownie. Znacznie trafniejsze jest pytanie: co ostatnio zaczęło się we mnie rozwijać? Może to być nowy pomysł biznesowy, zmiana w sposobie myślenia o sobie, a nawet rozwijające się uczucie do kogoś.

## Poród jako dopełnienie

Jeśli sen idzie dalej i pojawia się w nim poród, często symbolizuje on moment, w którym coś, nad czym długo pracowaliśmy, w końcu się urzeczywistnia — projekt zostaje ukończony, decyzja podjęta, a wysiłek przynosi efekt. Trudny, bolesny poród we śnie bywa odzwierciedleniem tego, jak wymagający był proces dochodzenia do tego momentu.

## Jak czytać ten sen

Zamiast pytać, czy sen o ciąży „coś zapowiada”, warto zapytać siebie: co we mnie właśnie się rodzi? Jaki pomysł, decyzja albo zmiana dojrzewa, choć jeszcze nie jest gotowa, by ujrzeć światło dzienne? To pytanie znacznie lepiej oddaje sens tego symbolu niż dosłowna interpretacja.

## Ciąża mnoga lub nietypowa

Sny, w których ciąża przebiega w nietypowy sposób — trwa wyjątkowo krótko, dotyczy bliźniąt albo istoty, która wydaje się nierealna — często wskazują na to, że rozwijamy jednocześnie kilka spraw naraz, albo że tempo zmian w naszym życiu jest szybsze, niż jesteśmy w stanie w pełni ogarnąć. Taki sen to zaproszenie, by dać sobie więcej przestrzeni i czasu na to, co się w nas rodzi.$content$,
  $json$[
    {"label": "Spokojna, szczęśliwa ciąża", "content": "Wskazuje na gotowość do podjęcia nowego wyzwania i pozytywne nastawienie do zmiany, która się rozwija."},
    {"label": "Ciąża pełna lęku i niepewności", "content": "Odzwierciedla naturalny strach przed nieznanym, towarzyszący każdemu nowemu początkowi."},
    {"label": "Ciąża u mężczyzny lub osoby niebędącej w ciąży", "content": "Nie powinna być odczytywana dosłownie — symbolizuje coś nowego, co dopiero rozwija się w Twoim życiu."},
    {"label": "Poród we śnie", "content": "Często oznacza dopełnienie długiego procesu — projekt, decyzja lub zmiana w końcu się urzeczywistnia."}
  ]$json$::jsonb,
  $json$[
    {"question": "Czy sen o ciąży oznacza, że naprawdę zajdę w ciążę?", "answer": "Nie ma na to dowodów naukowych — sen ten najczęściej symbolizuje coś nowego, co rozwija się w Twoim życiu, niekoniecznie związanego z macierzyństwem."},
    {"question": "Dlaczego mężczyźni śnią o własnej ciąży?", "answer": "To zaskakująco częsty sen, który zwykle symbolizuje nowy pomysł, projekt lub zmianę wewnętrzną, a nie dosłowne macierzyństwo."},
    {"question": "Co oznacza trudny, bolesny poród we śnie?", "answer": "Często odzwierciedla to, jak wymagający był proces dochodzenia do ważnego celu lub decyzji w Twoim życiu."}
  ]$json$::jsonb,
  ARRAY['dom','woda','smierc']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'ogien',
  'Ogień',
  (select id from public.symbol_categories where slug = 'zywioly'),
  'published',
  $excerpt$Ogień w snach to symbol o dwóch obliczach — może oznaczać niszczącą złość i zagrożenie, ale też pasję, oczyszczenie i siłę do zmiany.$excerpt$,
  $content$Ogień jest jednym z najbardziej ambiwalentnych symboli sennych — daje ciepło i światło, ale też potrafi niszczyć. Ta dwoistość sprawia, że sen o ogniu może oznaczać zarówno coś bardzo pozytywnego — pasję, energię, oczyszczenie — jak i coś niepokojącego: gniew, zagrożenie czy utratę kontroli.

## Pasja i energia życiowa

W swoim pozytywnym wymiarze ogień symbolizuje wewnętrzną energię, pasję i entuzjazm. Sen, w którym ogień płonie spokojnie, na przykład w kominku czy przy ognisku, i wywołuje poczucie ciepła, bezpieczeństwa oraz bliskości, często odzwierciedla dobrze skierowaną energię życiową — projekt, relację albo pasję, która nas napędza, zamiast wypalać.

## Gniew i niszcząca siła

Niekontrolowany, gwałtowny pożar niesie zupełnie inne znaczenie. Zwykle wiąże się z silnymi, tłumionymi emocjami — złością, frustracją albo konfliktem, który zbyt długo pozostawał niewyrażony i teraz domaga się ujścia. Sen o pożarze, który niszczy dom lub inne ważne miejsce, bywa obrazem sytuacji, w której czujemy, że coś fundamentalnego w naszym życiu jest zagrożone.

## Oczyszczenie i nowy początek

W wielu tradycjach ogień jest symbolem oczyszczenia — spala to, co stare, robiąc miejsce dla nowego. Sen, w którym coś spłonęło, ale my sami czujemy ulgę, a nie stratę, może odzwierciedlać gotowość do pozbycia się czegoś, co przestało nam służyć: starego przekonania, relacji, a nawet sposobu myślenia o sobie.

## Kontrolowany kontra niekontrolowany ogień

Kluczowe pytanie przy interpretacji tego snu brzmi: czy miałem/-am kontrolę nad ogniem? Palenie ogniska, które sami rozpaliliśmy i którym potrafimy zarządzać, wskazuje na świadome, dobrze skierowane wykorzystanie własnej energii. Ogień, który wymyka się spod kontroli i którego nie potrafimy ugasić, częściej sygnalizuje sytuację — emocjonalną, zawodową albo relacyjną — w której czujemy się bezradni.

## Co robić z takim snem

Warto zapytać siebie: gdzie w życiu płonę w dobrym sensie, pełen pasji i energii, a gdzie czuję, że coś we mnie płonie w sposób niekontrolowany i niszczący? Odpowiedź na to pytanie zwykle mówi więcej niż sam fakt, że w śnie pojawił się ogień.

## Ogień widziany z bezpiecznej odległości

Sen, w którym obserwujemy pożar z daleka, nie będąc bezpośrednio zagrożeni, bywa odczytywany nieco inaczej niż płomienie, które nas otaczają. Taki obraz może wskazywać, że jesteśmy świadkami czyjegoś kryzysu lub silnych emocji — w pracy, w rodzinie, w otoczeniu — nie będąc ich bezpośrednim źródłem, ale odczuwając mimo to ich ciepło albo zagrożenie.

## Rozpalanie ognia

Sen, w którym samodzielnie rozpalamy ogień — na przykład zapalając zapałkę albo układając ognisko — bywa symbolem inicjatywy i świadomego podjęcia działania. W odróżnieniu od pożaru, który nas zaskakuje, tutaj to my decydujemy, kiedy i gdzie pojawia się płomień, co często odzwierciedla poczucie sprawczości i gotowość do rozpoczęcia czegoś nowego na własnych warunkach.$content$,
  $json$[
    {"label": "Spokojny ogień, np. w kominku", "content": "Symbolizuje dobrze skierowaną energię, pasję i poczucie bezpieczeństwa."},
    {"label": "Gwałtowny, niekontrolowany pożar", "content": "Często odzwierciedla silne, tłumione emocje — złość lub frustrację, która domaga się ujścia."},
    {"label": "Pożar niszczący dom", "content": "Bywa obrazem poczucia zagrożenia w obszarze życia, który dawał nam dotąd bezpieczeństwo."},
    {"label": "Palenie czegoś z ulgą", "content": "Wskazuje na gotowość do pozbycia się czegoś, co przestało nam służyć — przekonania, nawyku lub relacji."}
  ]$json$::jsonb,
  $json$[
    {"question": "Co oznacza sen o pożarze domu?", "answer": "Często symbolizuje poczucie zagrożenia w obszarze życia, który do tej pory dawał nam bezpieczeństwo, np. w rodzinie lub relacji."},
    {"question": "Czy ogień we śnie zawsze oznacza coś złego?", "answer": "Nie — kontrolowany, spokojny ogień częściej symbolizuje pasję i dobrze skierowaną energię niż zagrożenie."},
    {"question": "Dlaczego śni mi się, że coś podpalam?", "answer": "Może to odzwierciedlać chęć uwolnienia się od czegoś, co przestało Ci służyć — starego przekonania, nawyku lub relacji."}
  ]$json$::jsonb,
  ARRAY['woda','dom','smierc']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'dom',
  'Dom',
  (select id from public.symbol_categories where slug = 'miejsca'),
  'published',
  $excerpt$Dom we śnie najczęściej symbolizuje nas samych — jego stan, pomieszczenia i to, co się w nim dzieje, mówią o naszym poczuciu bezpieczeństwa i tożsamości.$excerpt$,
  $content$Dom jest jednym z najbardziej osobistych symboli sennych — w tradycji psychologii głębi, zwłaszcza u Carla Gustava Junga, dom we śnie bywa odczytywany jako obraz samego śniącego: jego psychiki, tożsamości i poczucia bezpieczeństwa. To, co dzieje się z domem w śnie — czy jest zadbany, czy niszczeje, czy odkrywamy w nim nowe pomieszczenia — mówi wiele o tym, jak czujemy się we własnym życiu.

## Dom jako obraz samego siebie

Poszczególne pomieszczenia bywają łączone z różnymi aspektami naszej osobowości. Salon i inne przestrzenie wspólne to często to, co pokazujemy światu — nasza publiczna twarz. Sypialnia wiąże się z intymnością i sferą prywatną, a piwnica czy strych — z tym, co ukryte, zapomniane lub wyparte: starymi wspomnieniami, nieprzepracowanymi emocjami, częściami siebie, do których rzadko zaglądamy.

## Odkrywanie nowych pomieszczeń

Jednym z najczęstszych i najbardziej fascynujących wariantów tego snu jest odkrycie w znanym domu pokoju, o którego istnieniu nie wiedzieliśmy. Taki sen bywa odczytywany bardzo pozytywnie — jako sygnał, że w nas samych kryje się potencjał, zdolność albo część osobowości, z której jeszcze w pełni nie korzystamy.

## Stan domu jako odzwierciedlenie stanu wewnętrznego

Zaniedbany, brudny albo niszczejący dom często wskazuje na obszar życia, który wymaga naszej uwagi — może to być zdrowie, relacja albo projekt, który zostawiliśmy bez opieki. Remont lub sprzątanie domu we śnie bywa natomiast obrazem realnej pracy nad sobą, którą aktualnie wykonujemy — porządkowania myśli, emocji albo nawyków.

## Dom rodzinny a dom obecny

Warto też zwrócić uwagę, czy w śnie pojawia się dom, w którym mieszkamy obecnie, czy dom z dzieciństwa. Powrót do domu rodzinnego często wiąże się z tematami, które mają swoje korzenie we wczesnych latach życia — wzorcami wyniesionymi z rodziny, niedokończonymi sprawami z przeszłości albo tęsknotą za poczuciem bezpieczeństwa, które kojarzymy z dzieciństwem.

## Intruz lub obcy w domu

Sen, w którym w naszym domu pojawia się ktoś obcy, bywa odczytywany jako poczucie naruszenia granic — emocjonalnych, fizycznych albo psychicznych. Może to wskazywać na sytuację, w której czujemy się nie do końca bezpiecznie we własnej przestrzeni, dosłownie lub w przenośni.

## Jak podejść do tego snu

Sen o domu warto potraktować jako zaproszenie do zapytania siebie: które „pomieszczenie” mojego życia potrzebuje teraz uwagi? Co bym chciał/-a odnowić, a co odkryć na nowo?

## Budowa domu od podstaw

Sen, w którym budujemy dom od fundamentów, często pojawia się w okresach, gdy dosłownie lub symbolicznie zaczynamy coś od nowa — nowy etap życia, nową tożsamość, nowy sposób funkcjonowania po trudnym doświadczeniu. To, jak solidne wydają się fundamenty w takim śnie, bywa odzwierciedleniem naszego poczucia pewności co do tego nowego początku.$content$,
  $json$[
    {"label": "Odkrycie nowego pomieszczenia", "content": "Zwykle pozytywny sen wskazujący na nieodkryty jeszcze potencjał lub część siebie, z której nie korzystasz w pełni."},
    {"label": "Zaniedbany, niszczejący dom", "content": "Sygnalizuje obszar życia, który wymaga Twojej uwagi — zdrowie, relację lub projekt pozostawiony bez opieki."},
    {"label": "Powrót do domu z dzieciństwa", "content": "Często wiąże się z tematami sięgającymi wczesnych lat życia i wzorcami wyniesionymi z rodziny."},
    {"label": "Obcy w domu", "content": "Bywa obrazem poczucia naruszenia granic osobistych lub braku bezpieczeństwa we własnej przestrzeni."}
  ]$json$::jsonb,
  $json$[
    {"question": "Co oznacza sen o nowym pokoju w znanym domu?", "answer": "Zwykle jest to pozytywny symbol — wskazuje na nieodkryty potencjał lub część siebie, z której jeszcze nie korzystasz."},
    {"question": "Dlaczego śni mi się dom z dzieciństwa?", "answer": "Często oznacza to powrót do tematów lub wzorców mających swoje korzenie we wczesnych latach życia."},
    {"question": "Co symbolizuje sprzątanie lub remont domu we śnie?", "answer": "Najczęściej odzwierciedla realną pracę nad sobą — porządkowanie myśli, emocji lub nawyków."}
  ]$json$::jsonb,
  ARRAY['woda','ogien','smierc']::text[],
  now()
)
on conflict (slug) do nothing;

insert into public.symbols (slug, name, category_id, status, excerpt, content_md, variants, faq, related_slugs, published_at)
values (
  'pogon',
  'Pogoń',
  (select id from public.symbol_categories where slug = 'emocje'),
  'published',
  $excerpt$Sen o pogoni lub ucieczce to jeden z najbardziej stresujących motywów sennych — zwykle odzwierciedla unikanie problemu lub emocji, przed którą wolelibyśmy uciec na jawie.$excerpt$,
  $content$Sen, w którym ktoś lub coś nas goni, a my desperacko próbujemy uciec, należy do najbardziej stresujących doświadczeń sennych — pulsujące serce, uczucie duszności czy sparaliżowane nogi bywają tak intensywne, że budzimy się z prawdziwym poczuciem zagrożenia. Symbolicznie sen o pogoni rzadko dotyczy realnego niebezpieczeństwa — znacznie częściej mówi o czymś, przed czym uciekamy w życiu na jawie.

## Ucieczka przed problemem, nie osobą

Kluczem do zrozumienia tego snu jest pytanie nie „kto mnie gonił”, ale „przed czym uciekałem/-am”. Ścigający najczęściej symbolizuje problem, emocję albo obowiązek, którego unikamy — trudną rozmowę, decyzję, którą wciąż odkładamy, albo uczucie, z którym nie chcemy się zmierzyć. Im dłużej odkładamy konfrontację na jawie, tym intensywniejsza bywa pogoń we śnie.

## Kiedy nogi odmawiają posłuszeństwa

Bardzo częstym elementem tego snu jest poczucie, że nie możemy biec tak szybko, jak byśmy chcieli — nogi stają się ciężkie, ruchy spowolnione, jakbyśmy brnęli przez wodę. Ten obraz świetnie oddaje uczucie bezradności, które towarzyszy nam w sytuacjach, gdy mierzymy się z czymś, na co nie mamy pełnego wpływu, niezależnie od tego, jak bardzo się staramy.

## Tożsamość ścigającego

Jeśli ścigająca postać ma konkretną twarz — znajomej osoby, a nie anonimowego cienia — warto zastanowić się, czy nie reprezentuje ona jakiegoś aspektu relacji z tą osobą, którego unikamy: nierozwiązanego konfliktu, poczucia winy albo strachu przed konfrontacją. Bezimienny, niewidoczny prześladowca częściej symbolizuje bardziej ogólny, rozproszony lęk, który trudno przypisać jednej konkretnej sprawie.

## Odwrócenie się i stawienie czoła

Sny, w których w pewnym momencie odwracamy się i stajemy twarzą w twarz z tym, co nas goniło, bywają odczytywane jako ważny psychologiczny zwrot — gotowość do zmierzenia się z problemem, zamiast dalszej ucieczki. Nawet jeśli taki sen nadal jest naładowany strachem, sam akt odwrócenia się bywa dobrym znakiem.

## Co zrobić z takim snem

Zamiast analizować, kto lub co dokładnie nas gonił, warto zapytać siebie: jaką trudną rozmowę, decyzję albo emocję odkładam ostatnio na później? Sen o pogoni często ustępuje w naturalny sposób, gdy w końcu decydujemy się zmierzyć z tym, przed czym uciekaliśmy.

## Ukrywanie się zamiast ucieczki

Wariantem tego snu jest ukrywanie się — w szafie, pod łóżkiem, w ciemnym pomieszczeniu — zamiast biegu. Taki obraz bywa odczytywany jako bardziej bierna forma unikania problemu: zamiast otwarcie się z nim zmierzyć albo od niego uciec, wolimy udawać, że nie istnieje, licząc, że sam się rozwiąże. Zwykle jednak, podobnie jak w samym śnie, prześladowca prędzej czy później nas znajduje. Im dłużej trwa ukrywanie się we śnie, tym silniejsze bywa poczucie ulgi po przebudzeniu, gdy okazuje się, że problem, przed którym uciekaliśmy, wciąż czeka na rozwiązanie — ale w bezpiecznych warunkach jawy.$content$,
  $json$[
    {"label": "Ucieczka przed nieznanym prześladowcą", "content": "Zwykle symbolizuje ogólny, rozproszony lęk, którego jeszcze nie potrafimy nazwać."},
    {"label": "Ucieczka przed znaną osobą", "content": "Może wskazywać na nierozwiązany konflikt lub unikaną konfrontację w realnej relacji."},
    {"label": "Ciężkie nogi, niemożność ucieczki", "content": "Odzwierciedla poczucie bezradności wobec sytuacji, na którą nie mamy pełnego wpływu."},
    {"label": "Odwrócenie się twarzą do prześladowcy", "content": "Ważny sygnał gotowości do zmierzenia się z problemem zamiast dalszego unikania go."}
  ]$json$::jsonb,
  $json$[
    {"question": "Co oznacza sen, w którym ktoś mnie goni?", "answer": "Najczęściej symbolizuje problem, decyzję lub emocję, przed którą uciekamy na jawie, a nie realne zagrożenie."},
    {"question": "Dlaczego we śnie nie mogę biec, gdy ktoś mnie goni?", "answer": "To częsty obraz bezradności — poczucia, że mierzysz się z czymś, na co nie masz pełnego wpływu, mimo wysiłku."},
    {"question": "Co oznacza, gdy we śnie odwracam się twarzą do prześladowcy?", "answer": "Często jest to dobry znak — sygnał gotowości do zmierzenia się z problemem zamiast dalszej ucieczki."}
  ]$json$::jsonb,
  ARRAY['spadanie','latanie','waz']::text[],
  now()
)
on conflict (slug) do nothing;
