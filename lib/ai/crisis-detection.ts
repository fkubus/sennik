/**
 * Deterministyczny, szybki filtr bezpieczeństwa uruchamiany PRZED wywołaniem
 * modelu. Działa na surowym tekście od użytkownika, więc nie da się go
 * ominąć przez prompt injection skierowany do samego modelu — jeśli trafi,
 * żądanie do Anthropic w ogóle nie jest wysyłane (patrz app/api/interpret).
 * To jedna z dwóch warstw ochrony — druga to instrukcja w system-prompt.ts.
 */
const CRISIS_PATTERNS: RegExp[] = [
  /samob[oó]jstw/i,
  /samob[oó]jcz/i,
  /chc[eę]\s+(się\s+)?zabi[jć]/i,
  /nie\s+chc[eę]\s+ju[żz]\s+żyć/i,
  /nie\s+chc[eę]\s+żyć/i,
  /odebra[ćc]\s+sobie\s+życi/i,
  /zako[ńn]czy[ćc]\s+(swoje\s+)?życi/i,
  /zrobi[ćc]\s+sobie\s+krzywd/i,
  /skrzywdzi[ćc]\s+się/i,
  /okaleczy[ćc]\s+się/i,
  /pociąć\s+się/i,
  /nie\s+widz[eę]\s+sensu\s+życia/i,
];

export function containsCrisisSignal(
  ...texts: Array<string | undefined>
): boolean {
  const combined = texts.filter(Boolean).join(" \n ");
  if (!combined) return false;
  return CRISIS_PATTERNS.some((pattern) => pattern.test(combined));
}
