import { test, expect } from "@playwright/test";

test.describe("Briefing - Carregamento da página", () => {
  test("deve renderizar a página /briefing com título e wizard", async ({
    page,
  }) => {
    await page.goto("/briefing");

    // Título da página
    await expect(page.locator("h1")).toContainText("Briefing do");
    await expect(page.locator("h1")).toContainText("Assistente IA");

    // Subtítulo explicativo
    await expect(
      page.getByText("Responda as perguntas abaixo")
    ).toBeVisible();

    // ProgressBar visível
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();
    await expect(page.getByText("5% completo")).toBeVisible();

    // Primeiro step visível
    await expect(
      page.getByRole("heading", { name: "Identidade da Empresa" })
    ).toBeVisible();
  });

  test("deve ter os grupos de progresso visíveis", async ({ page }) => {
    await page.goto("/briefing");

    for (const grupo of [
      "Empresa",
      "Atendimento",
      "Assistente",
      "Conteúdo",
      "Operação",
      "Dados",
      "Fechamento",
    ]) {
      await expect(page.getByText(grupo, { exact: true })).toBeVisible();
    }
  });

  test("deve ter botões de navegação", async ({ page }) => {
    await page.goto("/briefing");

    await expect(page.getByRole("button", { name: "Anterior" })).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Próximo" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Salvar rascunho/i })
    ).toBeVisible();
  });

  test("meta title deve conter 'Briefing'", async ({ page }) => {
    await page.goto("/briefing");
    await expect(page).toHaveTitle(/Briefing/);
  });
});
