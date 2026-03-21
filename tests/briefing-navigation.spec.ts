import { test, expect } from "@playwright/test";

test.describe("Briefing - Navegação entre etapas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();
  });

  test("deve avançar para a etapa 2 ao clicar em Próximo", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Próximo" }).click();

    await expect(page.getByText("Etapa 2 de 19")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Produtos e Serviços" })
    ).toBeVisible();
  });

  test("deve voltar para etapa 1 ao clicar em Anterior", async ({ page }) => {
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText("Etapa 2 de 19")).toBeVisible();

    await page.getByRole("button", { name: "Anterior" }).click();
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Identidade da Empresa" })
    ).toBeVisible();
  });

  test("botão Anterior deve estar desabilitado na etapa 1", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Anterior" })).toBeDisabled();
  });

  test("deve navegar por todas as 19 etapas", async ({ page }) => {
    test.setTimeout(60000);

    const stepTitles = [
      "Identidade da Empresa",
      "Produtos e Serviços",
      "Canais de Venda",
      "Filosofia de Atendimento",
      "Tom de Voz e Personalidade",
      "Objetivo do Assistente",
      "Jornada do Cliente",
      "FAQ e Base de Conhecimento",
      "Mídia e Conteúdo",
      "Promoções e Ofertas",
      "Análise de Concorrência",
      "Localização e Filiais",
      "Escalação e Atendimento Humano",
      "Idiomas e Regionalização",
      "Métricas e Indicadores de Sucesso",
      "Catálogo de Produtos e Dados",
      "Compliance e Requisitos Legais",
      "Expectativas, Prazo e Investimento",
      "Pós-Venda e Informações Adicionais",
    ];

    for (let i = 0; i < stepTitles.length; i++) {
      await expect(page.getByText(`Etapa ${i + 1} de 19`)).toBeVisible();
      await expect(
        page.getByRole("heading", { name: stepTitles[i] })
      ).toBeVisible();

      if (i < stepTitles.length - 1) {
        await page.getByRole("button", { name: "Próximo" }).click();
        // Espera a animação de transição
        await expect(
          page.getByText(`Etapa ${i + 2} de 19`)
        ).toBeVisible();
      }
    }

    // Na última etapa, botão deve mostrar "Enviar briefing"
    await expect(
      page.getByRole("button", { name: "Enviar briefing" })
    ).toBeVisible();
  });

  test("barra de progresso deve atualizar ao navegar", async ({ page }) => {
    await expect(page.getByText("5% completo")).toBeVisible();

    // Avança até etapa 10
    for (let i = 0; i < 9; i++) {
      await page.getByRole("button", { name: "Próximo" }).click();
      await expect(
        page.getByText(`Etapa ${i + 2} de 19`)
      ).toBeVisible();
    }

    await expect(page.getByText("53% completo")).toBeVisible();
  });
});
