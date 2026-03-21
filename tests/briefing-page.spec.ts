import { test, expect } from "@playwright/test";

test.describe("Briefing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/briefing");
  });

  test("renderiza a página de briefing", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
  });

  test("mostra título correto", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("3 passos");
  });

  test("mostra ProgressBar com 3 etapas", async ({ page }) => {
    await expect(page.getByText("Etapa 1 de 3")).toBeVisible();
    await expect(page.getByText("Contato")).toBeVisible();
    await expect(page.getByText("Objetivo")).toBeVisible();
    await expect(page.getByText("Materiais")).toBeVisible();
  });

  test("mostra botões de navegação", async ({ page }) => {
    await expect(page.getByRole("button", { name: /anterior/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /próximo/i })).toBeVisible();
  });
});
