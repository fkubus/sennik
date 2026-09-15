import { describe, expect, it } from "vitest";
import { containsCrisisSignal } from "@/lib/ai/crisis-detection";

describe("containsCrisisSignal", () => {
  it("wykrywa bezpośrednie sygnały kryzysowe", () => {
    expect(containsCrisisSignal("Chcę się zabić, nie widzę sensu dalej.")).toBe(
      true,
    );
    expect(containsCrisisSignal("Myślę o samobójstwie od kilku dni.")).toBe(
      true,
    );
    expect(containsCrisisSignal("Czasem chcę zrobić sobie krzywdę.")).toBe(
      true,
    );
  });

  it("nie wykrywa sygnału w zwykłym opisie snu", () => {
    expect(
      containsCrisisSignal(
        "Śniło mi się, że spadam z dużej wysokości i budzę się przerażona.",
      ),
    ).toBe(false);
  });

  it("sprawdza wszystkie podane teksty łącznie", () => {
    expect(containsCrisisSignal("Zwykły opis snu.", "Nie chcę już żyć.")).toBe(
      true,
    );
  });

  it("ignoruje puste lub brakujące wartości", () => {
    expect(containsCrisisSignal(undefined, "")).toBe(false);
  });
});
