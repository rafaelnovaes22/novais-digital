import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("deve carregar a home com Header e link para Briefing", async ({
    page,
  }) => {
    await page.goto("/");

    // Header — link para Briefing
    await expect(page.getByRole("link", { name: "Briefing" })).toBeVisible();

    // Nav links no header
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Sobre" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Serviços" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Portfólio" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contato" })).toBeVisible();
  });

  test("link Briefing no header deve apontar para /briefing", async ({
    page,
  }) => {
    await page.goto("/");
    const briefingLink = page.getByRole("link", { name: "Briefing" });
    await expect(briefingLink).toHaveAttribute("href", "/briefing");
  });

  test("deve navegar para /briefing ao clicar no link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Briefing" }).click();
    await expect(page).toHaveURL(/\/briefing/);
    await expect(
      page.getByRole("heading", { name: /Briefing do/ })
    ).toBeVisible();
  });
});
