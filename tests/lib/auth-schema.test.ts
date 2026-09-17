import { describe, expect, it } from "vitest";
import { loginSchema } from "@/lib/validations/auth";

describe("loginSchema", () => {
  it("akceptuje poprawny adres e-mail", () => {
    expect(loginSchema.safeParse({ email: "test@przyklad.pl" }).success).toBe(
      true,
    );
  });

  it("odrzuca niepoprawny adres e-mail", () => {
    expect(loginSchema.safeParse({ email: "nie-email" }).success).toBe(false);
  });

  it("odrzuca pusty adres e-mail", () => {
    expect(loginSchema.safeParse({ email: "" }).success).toBe(false);
  });

  it("przycina białe znaki", () => {
    const result = loginSchema.safeParse({ email: "  test@przyklad.pl  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("test@przyklad.pl");
    }
  });
});
