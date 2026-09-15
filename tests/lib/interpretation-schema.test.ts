import { describe, expect, it } from "vitest";
import { interpretationRequestSchema } from "@/lib/validations/interpretation";

describe("interpretationRequestSchema", () => {
  it("akceptuje poprawne dane", () => {
    const result = interpretationRequestSchema.safeParse({
      dreamText: "Śniło mi się, że latam nad miastem.",
      emotions: ["Radość", "Zdziwienie"],
      lifeContext: "Niedawno awansowałam w pracy.",
    });
    expect(result.success).toBe(true);
  });

  it("odrzuca zbyt krótki opis snu", () => {
    const result = interpretationRequestSchema.safeParse({
      dreamText: "Sen.",
    });
    expect(result.success).toBe(false);
  });

  it("odrzuca opis snu dłuższy niż 2000 znaków", () => {
    const result = interpretationRequestSchema.safeParse({
      dreamText: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("pozwala pominąć pola opcjonalne", () => {
    const result = interpretationRequestSchema.safeParse({
      dreamText: "Śniło mi się coś dziwnego, ale nie pamiętam szczegółów.",
    });
    expect(result.success).toBe(true);
  });
});
