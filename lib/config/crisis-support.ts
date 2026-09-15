/**
 * Numery wsparcia w kryzysie psychicznym (Polska).
 * WAŻNE: zweryfikuj te dane przed wdrożeniem produkcyjnym — numery i godziny
 * pracy telefonów zaufania mogą się zmieniać.
 */
export const crisisSupportLines = [
  {
    name: "Telefon alarmowy",
    phone: "112",
    description: "Bezpośrednie zagrożenie życia lub zdrowia — całodobowo.",
  },
  {
    name: "Telefon Zaufania dla Dorosłych w Kryzysie Emocjonalnym",
    phone: "116 123",
    description: "Bezpłatnie, całodobowo, także z telefonów komórkowych.",
  },
  {
    name: "Centrum Wsparcia dla Osób w Stanie Kryzysu Psychicznego",
    phone: "800 70 2222",
    description: "Bezpłatna, całodobowa infolinia i czat wsparcia.",
  },
  {
    name: "Telefon Zaufania dla Dzieci i Młodzieży",
    phone: "116 111",
    description:
      "Bezpłatnie, całodobowo — dla dzieci, nastolatków i młodych dorosłych.",
  },
] as const;
