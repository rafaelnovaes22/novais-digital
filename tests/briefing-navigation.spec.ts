import { test, expect } from "@playwright/test";

test.describe("Briefing Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/briefing");
  });

  test("navega entre os 3 passos", async ({ page }) => {
    await expect(page.getByText("Etapa 1 de 3")).toBeVisible();
    await expect(page.getByText("Vamos começar")).toBeVisible();

    await page.getByRole("button", { name: /próximo/i }).click();
    await expect(page.getByText("Etapa 2 de 3")).toBeVisible();
    await expect(page.getByText("O que você precisa?")).toBeVisible();

    await page.getByRole("button", { name: /próximo/i }).click();
    await expect(page.getByText("Etapa 3 de 3")).toBeVisible();
    await expect(page.getByText("Envie seus links")).toBeVisible();
  });

  test("volta para o passo anterior", async ({ page }) => {
    await page.getByRole("button", { name: /próximo/i }).click();
    await expect(page.getByText("Etapa 2 de 3")).toBeVisible();

    await page.getByRole("button", { name: /anterior/i }).click();
    await expect(page.getByText("Etapa 1 de 3")).toBeVisible();
  });

  test("botão anterior desabilitado no primeiro passo", async ({ page }) => {
    const prevButton = page.getByRole("button", { name: /anterior/i });
    await expect(prevButton).toBeDisabled();
  });

  test("mostra botão Enviar no último passo", async ({ page }) => {
    await page.getByRole("button", { name: /próximo/i }).click();
    await page.getByRole("button", { name: /próximo/i }).click();

    await expect(
      page.getByRole("button", { name: /enviar/i })
    ).toBeVisible();
  });

  test("barra de progresso atualiza", async ({ page }) => {
    await expect(page.getByText("33% completo")).toBeVisible();

    await page.getByRole("button", { name: /próximo/i }).click();
    await expect(page.getByText("67% completo")).toBeVisible();

    await page.getByRole("button", { name: /próximo/i }).click();
    await expect(page.getByText("100% completo")).toBeVisible();
  });
});
