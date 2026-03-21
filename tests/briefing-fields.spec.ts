import { test, expect } from "@playwright/test";

test.describe("Briefing Fields", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/briefing");
  });

  test("Step 1 — campos de contato", async ({ page }) => {
    await expect(page.getByLabel(/nome completo/i)).toBeVisible();
    await expect(page.getByLabel(/nome da empresa/i)).toBeVisible();
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/whatsapp/i)).toBeVisible();
    await expect(page.getByLabel(/cargo/i)).toBeVisible();
  });

  test("Step 2 — campos de objetivo", async ({ page }) => {
    await page.getByRole("button", { name: /próximo/i }).click();

    await expect(page.getByText("Vendas e conversão de leads")).toBeVisible();
    await expect(page.getByText("Agendamento de serviços ou consultas")).toBeVisible();
    await expect(page.getByText("Suporte e atendimento ao cliente")).toBeVisible();
    await expect(page.getByLabel(/maior dor/i)).toBeVisible();
  });

  test("Step 2 — mostra campo condicional quando seleciona Outro", async ({ page }) => {
    await page.getByRole("button", { name: /próximo/i }).click();

    await page.getByText("Outro").click();
    await expect(page.getByLabel(/qual objetivo/i)).toBeVisible();
  });

  test("Step 3 — campos de links e materiais", async ({ page }) => {
    await page.getByRole("button", { name: /próximo/i }).click();
    await page.getByRole("button", { name: /próximo/i }).click();

    await expect(page.getByLabel(/site da empresa/i)).toBeVisible();
    await expect(page.getByLabel(/instagram/i)).toBeVisible();
    await expect(page.getByLabel(/facebook/i)).toBeVisible();
    await expect(page.getByLabel(/linkedin/i)).toBeVisible();
    await expect(page.getByText("Por que pedimos links?")).toBeVisible();
  });
});
