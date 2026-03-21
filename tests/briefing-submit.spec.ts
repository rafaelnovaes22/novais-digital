import { test, expect } from "@playwright/test";

test.describe("Briefing Submit", () => {
  test("envia briefing e mostra confirmação", async ({ page }) => {
    await page.goto("/briefing");

    // Step 1
    await page.getByLabel(/nome completo/i).fill("João Silva");
    await page.getByLabel(/nome da empresa/i).fill("Empresa Teste");
    await page.getByLabel(/e-mail/i).fill("joao@teste.com");
    await page.getByLabel(/whatsapp/i).fill("11999999999");
    await page.getByRole("button", { name: /próximo/i }).click();

    // Step 2
    await page.getByText("Vendas e conversão de leads").click();
    await page
      .getByLabel(/maior dor/i)
      .fill("Perdemos muitos leads por demora no atendimento via WhatsApp");
    await page.getByRole("button", { name: /próximo/i }).click();

    // Step 3 — envia
    await page.getByRole("button", { name: /enviar/i }).click();

    // Confirmação
    await expect(page.getByText("Recebemos seus dados!")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Falar no WhatsApp")).toBeVisible();
    await expect(page.getByText("Voltar ao início")).toBeVisible();
  });

  test("confirmação mostra próximos passos", async ({ page }) => {
    await page.goto("/briefing");

    await page.getByLabel(/nome completo/i).fill("Maria Santos");
    await page.getByLabel(/nome da empresa/i).fill("Loja Maria");
    await page.getByLabel(/e-mail/i).fill("maria@loja.com");
    await page.getByLabel(/whatsapp/i).fill("11988887777");
    await page.getByRole("button", { name: /próximo/i }).click();

    await page.getByText("Suporte e atendimento ao cliente").click();
    await page.getByLabel(/maior dor/i).fill("Clientes reclamam do tempo de espera no suporte");
    await page.getByRole("button", { name: /próximo/i }).click();

    await page.getByRole("button", { name: /enviar/i }).click();

    await expect(page.getByText("Recebemos seus dados!")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText(/analisar seu site/i)).toBeVisible();
    await expect(page.getByText(/reunião de alinhamento/i)).toBeVisible();
    await expect(page.getByText(/valida o que montamos/i)).toBeVisible();
  });
});
