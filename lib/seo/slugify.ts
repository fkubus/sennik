const POLISH_CHAR_MAP: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

/**
 * Zamienia polski tekst na slug URL: łacińskie znaki, małe litery,
 * separator "-". Np. "Ząb" -> "zab", "Zła woda" -> "zla-woda".
 */
export function slugify(input: string): string {
  const withLatinChars = input
    .toLowerCase()
    .split("")
    .map((char) => POLISH_CHAR_MAP[char] ?? char)
    .join("");

  return withLatinChars
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
