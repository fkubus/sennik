import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/seo/slugify";

describe("slugify", () => {
  it("zamienia polskie znaki diakrytyczne na łacińskie", () => {
    expect(slugify("Ząb")).toBe("zab");
    expect(slugify("Łąka")).toBe("laka");
    expect(slugify("Źrebię")).toBe("zrebie");
  });

  it("zamienia spacje i znaki specjalne na myślniki", () => {
    expect(slugify("Zła woda")).toBe("zla-woda");
    expect(slugify("  Czysta   woda!  ")).toBe("czysta-woda");
  });

  it("usuwa myślniki na początku i końcu", () => {
    expect(slugify("-woda-")).toBe("woda");
  });
});
