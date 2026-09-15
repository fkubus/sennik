import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("łączy klasy i rozwiązuje konflikty Tailwind", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toContain("px-4");
    expect(result).toContain("py-1");
    expect(result).not.toContain("px-2");
  });

  it("ignoruje wartości falsy", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
});
