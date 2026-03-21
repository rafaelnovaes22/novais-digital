import { test, expect } from "@playwright/test";

async function navigateToStep(page: import("@playwright/test").Page, step: number) {
  for (let i = 0; i < step - 1; i++) {
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText(`Etapa ${i + 2} de 19`)).toBeVisible();
  }
}

test.describe("Briefing - Campos condicionais", () => {
  test.setTimeout(60000);

  test("Step 01: campo segmentoOutro aparece ao selecionar 'Outro'", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    // Campo extra não deve estar visível
    await expect(page.getByText("Qual segmento?")).not.toBeVisible();

    // Seleciona "Outro" no select de segmento
    await page.locator("select").first().selectOption("Outro");

    // Campo extra deve aparecer
    await expect(page.getByText("Qual segmento?")).toBeVisible();
  });

  test("Step 10: campos de promoção aparecem condicionalmente", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 10);
    await expect(
      page.getByRole("heading", { name: "Promoções e Ofertas" })
    ).toBeVisible();

    // Campos extras não devem estar visíveis inicialmente
    await expect(page.getByText("Tipos de Promoções")).not.toBeVisible();

    // Seleciona "Sim"
    await page.locator("label").filter({ hasText: /^Sim$/ }).click();

    // Campos extras devem aparecer
    await expect(page.getByText("Tipos de Promoções")).toBeVisible();

    // Seleciona "Não"
    await page.locator("label").filter({ hasText: /^Não$/ }).click();

    // Campos extras devem desaparecer
    await expect(page.getByText("Tipos de Promoções")).not.toBeVisible();
  });

  test("Step 12: campos de filiais aparecem ao selecionar 'Sim'", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 12);
    await expect(
      page.getByRole("heading", { name: "Localização e Filiais" })
    ).toBeVisible();

    // Campo de quantidade não visível
    await expect(page.getByText("Quantidade de filiais")).not.toBeVisible();

    // Seleciona "Sim" para possui filiais (primeiro RadioGroup)
    await page.locator("label").filter({ hasText: /^Sim$/ }).first().click();

    // Campos devem aparecer
    await expect(page.getByText("Quantidade de filiais")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Adicionar filial" })
    ).toBeVisible();
  });

  test("Step 12: DynamicTable deve adicionar e remover filiais", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 12);

    // Seleciona "Sim"
    await page.locator("label").filter({ hasText: /^Sim$/ }).first().click();

    // Adiciona uma filial
    await page.getByRole("button", { name: "Adicionar filial" }).click();

    // Deve aparecer uma linha com inputs
    const nomeInput = page.locator('input[placeholder="Ex: Filial SP"]');
    await expect(nomeInput).toBeVisible();
    await nomeInput.fill("Filial São Paulo");

    // Adiciona outra
    await page.getByRole("button", { name: "Adicionar filial" }).click();

    // Deve ter 2 linhas
    await expect(page.locator("table tbody tr")).toHaveCount(2);

    // Remove a primeira
    await page.locator("table tbody button").first().click();

    // Deve ter 1 linha
    await expect(page.locator("table tbody tr")).toHaveCount(1);
  });

  test("Step 19: campo de fidelidade aparece condicionalmente", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 19);
    await expect(
      page.getByRole("heading", { name: "Pós-Venda e Informações Adicionais" })
    ).toBeVisible();

    // Campo de descrição não visível
    await expect(
      page.getByText("Descrição do programa de fidelidade")
    ).not.toBeVisible();

    // Seleciona "Sim" no programa de fidelidade
    await page.locator("label").filter({ hasText: /^Sim$/ }).click();

    // Campo deve aparecer
    await expect(
      page.getByText("Descrição do programa de fidelidade")
    ).toBeVisible();
  });
});
