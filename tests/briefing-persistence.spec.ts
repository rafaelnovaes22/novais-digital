import { test, expect } from "@playwright/test";

test.describe("Briefing - Persistência (localStorage)", () => {
  test("deve salvar rascunho e restaurar ao recarregar", async ({ page }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    // Preenche Razão Social (primeiro input de texto)
    const razaoInput = page.locator('input[type="text"]').first();
    await razaoInput.fill("Empresa Teste Ltda");

    // Avança para etapa 2
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText("Etapa 2 de 19")).toBeVisible();

    // Salva rascunho
    await page.getByRole("button", { name: /Salvar rascunho/i }).click();

    // Verifica que "Salvo" aparece
    await expect(page.getByText(/Salvo/)).toBeVisible({ timeout: 3000 });

    // Recarrega
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Deve restaurar na etapa 2
    await expect(page.getByText("Etapa 2 de 19")).toBeVisible();

    // Volta para etapa 1
    await page.getByRole("button", { name: "Anterior" }).click();
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    // Verifica que campo foi restaurado
    await expect(razaoInput).toHaveValue("Empresa Teste Ltda");
  });

  test("deve salvar draft no localStorage", async ({ page }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    // Preenche Nome Fantasia (segundo input de texto)
    const fantasiaInput = page.locator('input[type="text"]').nth(1);
    await fantasiaInput.fill("Teste Fantasia");

    // Clica em salvar rascunho
    await page.getByRole("button", { name: /Salvar rascunho/i }).click();

    // Verifica no localStorage
    const draft = await page.evaluate(() =>
      localStorage.getItem("novais-briefing-draft")
    );
    expect(draft).not.toBeNull();
    const parsed = JSON.parse(draft!);
    expect(parsed.data.nomeFantasia).toBe("Teste Fantasia");
    expect(parsed.currentStep).toBe(1);
    expect(parsed.lastSaved).toBeTruthy();
  });
});
