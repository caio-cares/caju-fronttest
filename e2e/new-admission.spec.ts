// test("new admission", async ({ page }) => {
//   await page.goto("http://localhost:3001");

//   await page.getByTestId("new-admission-button").click();

//   await expect(page.getByText("Nome")).toBeVisible();

//   await page.fill('input[name="employeeName"]', "Teste Frontend");
//   await page.fill('input[name="email"]', "e2e@e2e.com");
//   await page.fill('input[name="cpf"]', "28692098000");
//   await page.fill('input[name="admissionDate"]', "2024-10-31");

//   await page.getByTestId("create-new-admission").click();
// });

import { test } from "./support/globals";

test.describe("Create new admission", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3001");

    await page.getByTestId("new-admission-button").click();
  });
  test("Creating new user", async ({ newUserPage }) => {
    await newUserPage.fillForm(
      "Teste Frontend",
      "teste@e2e.com",
      "28692098000",
      "2024-10-31"
    );
  });
});
