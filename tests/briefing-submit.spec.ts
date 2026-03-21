import { test, expect } from "@playwright/test";

async function navigateToStep(page: import("@playwright/test").Page, step: number) {
  for (let i = 0; i < step - 1; i++) {
    await page.getByRole("button", { name: "Próximo" }).click();
    await expect(page.getByText(`Etapa ${i + 2} de 19`)).toBeVisible();
  }
}

test.describe("Briefing - Envio do formulário", () => {
  test.setTimeout(60000);

  test("deve mostrar tela de confirmação após envio", async ({ page }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 19);

    await expect(page.getByText("Etapa 19 de 19")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Enviar briefing" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Enviar briefing" }).click();

    // Deve mostrar loading
    await expect(page.getByText("Enviando...")).toBeVisible();

    // Após ~2s, deve mostrar confirmação
    await expect(
      page.getByText("Briefing enviado com sucesso!")
    ).toBeVisible({ timeout: 5000 });

    await expect(page.getByText("Falar no WhatsApp")).toBeVisible();
    await expect(page.getByText("Voltar ao início")).toBeVisible();
  });

  test("link 'Voltar ao início' deve apontar para /", async ({ page }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 19);
    await page.getByRole("button", { name: "Enviar briefing" }).click();

    await expect(
      page.getByText("Briefing enviado com sucesso!")
    ).toBeVisible({ timeout: 5000 });

    const voltarLink = page.getByRole("link", { name: "Voltar ao início" });
    await expect(voltarLink).toHaveAttribute("href", "/");
  });

  test("link WhatsApp deve apontar para o número correto", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    await navigateToStep(page, 19);
    await page.getByRole("button", { name: "Enviar briefing" }).click();

    await expect(
      page.getByText("Briefing enviado com sucesso!")
    ).toBeVisible({ timeout: 5000 });

    const whatsappLink = page.getByRole("link", {
      name: "Falar no WhatsApp",
    });
    await expect(whatsappLink).toHaveAttribute(
      "href",
      "https://wa.me/5511949105033"
    );
  });

  test("deve limpar localStorage após envio com sucesso", async ({
    page,
  }) => {
    await page.goto("/briefing");
    await expect(page.getByText("Etapa 1 de 19")).toBeVisible();

    // Salva rascunho
    await page.getByRole("button", { name: /Salvar rascunho/i }).click();
    let draft = await page.evaluate(() =>
      localStorage.getItem("novais-briefing-draft")
    );
    expect(draft).not.toBeNull();

    // Navega e envia
    await navigateToStep(page, 19);
    await page.getByRole("button", { name: "Enviar briefing" }).click();

    await expect(
      page.getByText("Briefing enviado com sucesso!")
    ).toBeVisible({ timeout: 5000 });

    // localStorage limpo
    draft = await page.evaluate(() =>
      localStorage.getItem("novais-briefing-draft")
    );
    expect(draft).toBeNull();
  });
});
