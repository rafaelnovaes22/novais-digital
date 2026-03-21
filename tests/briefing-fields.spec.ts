import { test, expect } from "@playwright/test";

test.describe("Briefing - Campos e inputs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();
  });

  test("Step 01: deve renderizar todos os campos de Identidade", async ({
    page,
  }) => {
    // Labels dos campos (usando regex para ignorar o asterisco)
    await expect(page.getByText(/Razão Social/)).toBeVisible();
    await expect(page.getByText(/Nome Fantasia/)).toBeVisible();
    await expect(page.getByText("CNPJ")).toBeVisible();
    await expect(page.getByText(/^Segmento/)).toBeVisible();
    await expect(page.getByText(/Porte da Empresa/)).toBeVisible();
    await expect(page.getByText("Site")).toBeVisible();
    await expect(page.getByText(/Ano de Fundação/)).toBeVisible();
    await expect(page.getByText(/Descrição da Empresa/)).toBeVisible();
    await expect(page.getByText(/Diferenciais Competitivos/)).toBeVisible();
  });

  test("Step 01: deve preencher campos de texto", async ({ page }) => {
    // Preenche Razão Social — primeiro input type text na página
    const inputs = page.locator('input[type="text"]');
    const razaoInput = inputs.nth(0);
    await razaoInput.fill("Novais Digital Ltda");
    await expect(razaoInput).toHaveValue("Novais Digital Ltda");

    // Preenche Nome Fantasia — segundo input
    const fantasiaInput = inputs.nth(1);
    await fantasiaInput.fill("Novais Digital");
    await expect(fantasiaInput).toHaveValue("Novais Digital");
  });

  test("Step 01: select de segmento deve ter opções corretas", async ({
    page,
  }) => {
    const selects = page.locator("select");
    const segmentoSelect = selects.first();

    // Deve ter opções de segmento
    await expect(
      segmentoSelect.locator("option", { hasText: "E-commerce" })
    ).toHaveCount(1);
    await expect(
      segmentoSelect.locator("option", { hasText: "Tecnologia / SaaS" })
    ).toHaveCount(1);
    await expect(
      segmentoSelect.locator("option", { hasText: "Outro" })
    ).toHaveCount(1);
  });

  test("Step 01: campo 'segmentoOutro' aparece quando seleciona 'Outro'", async ({
    page,
  }) => {
    await expect(page.getByText("Qual segmento?")).not.toBeVisible();
    await page.locator("select").first().selectOption("Outro");
    await expect(page.getByText("Qual segmento?")).toBeVisible();
  });

  test("Step 02: deve renderizar campos de Produtos e Serviços", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText("Etapa 2 de 19")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Produtos e Serviços" })
    ).toBeVisible();
    await expect(page.getByText(/Principais Produtos/)).toBeVisible();
    await expect(page.getByText("Ticket Médio Mínimo")).toBeVisible();
    await expect(page.getByText("Ticket Médio Máximo")).toBeVisible();
    await expect(page.getByText(/Público-Alvo/)).toBeVisible();
    await expect(page.getByText(/Dores do Público/)).toBeVisible();
  });

  test("Step 03: CheckboxGroup deve selecionar canais", async ({ page }) => {
    // Navega até Step 03
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText("Etapa 2 de 19")).toBeVisible();
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText("Etapa 3 de 19")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Canais de Venda" })
    ).toBeVisible();

    // Seleciona WhatsApp
    const whatsappLabel = page
      .locator("label")
      .filter({ hasText: "WhatsApp" })
      .first();
    await whatsappLabel.click();
    await expect(
      whatsappLabel.locator('input[type="checkbox"]')
    ).toBeChecked();

    // Seleciona Instagram DM
    const igLabel = page
      .locator("label")
      .filter({ hasText: "Instagram DM" });
    await igLabel.click();
    await expect(igLabel.locator('input[type="checkbox"]')).toBeChecked();

    // Desseleciona WhatsApp
    await whatsappLabel.click();
    await expect(
      whatsappLabel.locator('input[type="checkbox"]')
    ).not.toBeChecked();
  });
});
