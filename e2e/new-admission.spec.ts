import { NewUserPage } from "./pages/new-admission";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3001");

  await page.getByTestId("new-admission-button").click();
});

test("Deve criar um novo usuário com sucesso", async ({ page }) => {
  // Intercepta a requisição POST para o endpoint da API
  await page.route("registrations", async (route) => {
    const request = route.request();
    if (request.method() === "POST") {
      // Simula uma resposta bem-sucedida
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ message: "Usuário criado com sucesso" }),
      });
    } else {
      await route.continue();
    }
  });

  const newUserPage = new NewUserPage(page);

  await newUserPage.fillForm(
    "Teste Frontend",
    "teste@example.com",
    "987.654.321-00",
    "2023-10-01"
  );

  await page.route("registrations", async (route) => {
    const request = route.request();
    if (request.method() === "GET") {
      // Simula uma resposta bem-sucedida
      await route.fulfill({
        status: 200,
        contentType: "application/json",
      });
    } else {
      await route.continue();
    }
  });

  await expect(page).toHaveURL("http://localhost:3001/dashboard");
});
