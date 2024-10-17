import { test, expect } from "@playwright/test";

test("Excluir um usuário com sucesso", async ({ page }) => {
  const newUser = {
    id: "12345",
    employeeName: "Teste Frontend",
    email: "teste@example.com",
    cpf: "987.654.321-00",
    admissionDate: "2023-10-01",
    status: "REVIEW",
  };

  // Array que representa a lista de usuários
  let users = [newUser];

  // Intercepta as requisições para '/registrations'
  await page.route("**/registrations", async (route, request) => {
    if (request.method() === "GET") {
      // Retorna a lista atual de usuários
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(users),
      });
    } else {
      await route.continue();
    }
  });

  // Intercepta a requisição de exclusão do usuário
  await page.route(`**/registrations/${newUser.id}`, async (route, request) => {
    if (request.method() === "DELETE") {
      // Remove o usuário da lista
      users = users.filter((user) => user.id !== newUser.id);

      // Simula a exclusão bem-sucedida
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Usuário excluído com sucesso" }),
      });
    } else {
      await route.continue();
    }
  });

  // Navegar para a página inicial
  await page.goto("http://localhost:3001");

  // Verificar se o usuário aparece na coluna "Pronto para Revisar"
  const reviewColumn = page.locator("text=Pronto para revisar").locator("..");
  await expect(reviewColumn).toContainText(newUser.employeeName);

  // Selecionar o cartão do usuário usando 'data-testid'
  const userCard = page.getByTestId(`user-card-${newUser.id}`);
  await expect(userCard).toBeVisible();

  // Selecionar o botão de exclusão dentro do cartão do usuário
  const deleteButton = userCard.getByTestId("delete-button");
  await expect(deleteButton).toBeVisible();

  // Clicar no botão de exclusão
  await deleteButton.click();

  // Lidar com o diálogo de confirmação
  const confirmDialog = page.locator(".p-confirm-dialog");
  await expect(confirmDialog).toBeVisible();
  const yesButton = confirmDialog.getByText("Sim", { exact: true });
  await yesButton.click();

  // Verificar que o usuário não está mais na coluna "Pronto para Revisar"
  await expect(reviewColumn).not.toContainText(newUser.employeeName);

  // Opcionalmente, verificar que o usuário não está em nenhuma coluna
  await expect(page.getByTestId(`user-card-${newUser.id}`)).not.toBeVisible();
});
