import { test, expect } from "@playwright/test";

test("Reprovar um novo usuário com sucesso", async ({ page }) => {
  const newUser = {
    id: "12345",
    employeeName: "Teste Frontend",
    email: "teste@example.com",
    cpf: "987.654.321-00",
    admissionDate: "2023-10-01",
    status: "REVIEW",
  };

  // Intercepta as requisições para '/registrations'
  await page.route("**/registrations", async (route, request) => {
    if (request.method() === "GET") {
      // Retorna o usuário com o status atual (pode ser 'REVIEW' ou 'APPROVED')
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([newUser]),
      });
    } else {
      await route.continue();
    }
  });

  // Intercepta a requisição de aprovação do usuário
  await page.route(`**/registrations/${newUser.id}`, async (route, request) => {
    if (request.method() === "PUT") {
      // Atualiza o status do usuário para 'APPROVED' no objeto 'newUser'
      newUser.status = "REPROVED";

      // Simula a aprovação do usuário
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(newUser),
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

  // Selecionar o botão "Aprovar" dentro do cartão do usuário
  const approveButton = userCard.getByTestId("reprove-button");
  await expect(approveButton).toBeVisible();

  // Clicar no botão "Aprovar"
  await approveButton.click();

  // Lidar com o diálogo de confirmação
  const confirmDialog = page.locator(".p-confirm-dialog");
  await expect(confirmDialog).toBeVisible();
  const yesButton = confirmDialog.getByText("Sim", { exact: true });
  await yesButton.click();

  // Aguarde até que o cartão do usuário apareça na coluna "Reprovado"
  const approvedColumn = page.locator("text=Reprovado").locator("..");
  await expect(approvedColumn).toContainText(newUser.employeeName);

  // Verificar que o usuário não está mais na coluna "Pronto para Revisar"
  await expect(reviewColumn).not.toContainText(newUser.employeeName);
});
