import { test, expect } from "@playwright/test";

test("formularz interpretacji pokazuje blok wsparcia przy sygnale kryzysowym", async ({
  page,
}) => {
  await page.goto("/interpretacja");

  await page
    .getByLabel("Opisz swój sen")
    .fill(
      "Śniło mi się, że nie chcę już żyć i chcę się zabić, to mnie przeraża.",
    );
  await page.getByRole("button", { name: "Zinterpretuj mój sen" }).click();

  await expect(
    page.getByText("Ważne — nie jesteś sam/-a z tym, co czujesz"),
  ).toBeVisible();
  await expect(page.getByText("116 123")).toBeVisible();
});

test("strona symbolu renderuje treść, warianty i FAQ", async ({ page }) => {
  await page.goto("/sennik/woda");

  await expect(
    page.getByRole("heading", { name: "Woda", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Warianty tego snu")).toBeVisible();
  await expect(page.getByText("Najczęstsze pytania")).toBeVisible();
});
