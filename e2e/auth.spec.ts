import { test, expect } from "@playwright/test";

test("niezalogowany użytkownik jest przekierowany z /konto do /logowanie", async ({
  page,
}) => {
  await page.goto("/konto");
  await expect(page).toHaveURL(/\/logowanie$/);
});

test("strona logowania pokazuje formularz e-mail i przycisk Google", async ({
  page,
}) => {
  await page.goto("/logowanie");

  await expect(page.getByLabel("Adres e-mail")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Kontynuuj z Google" }),
  ).toBeVisible();

  // Bez zaakceptowania zgody przycisk wysyłki jest zablokowany.
  await expect(
    page.getByRole("button", { name: "Wyślij link logowania" }),
  ).toBeDisabled();
});
