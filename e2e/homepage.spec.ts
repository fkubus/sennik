import { test, expect } from "@playwright/test";

test("strona główna wyświetla nagłówek i CTA", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Odkryj, co naprawdę mówią Twoje sny" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Przeglądaj sennik" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Zinterpretuj swój sen z AI" }),
  ).toBeVisible();
});
