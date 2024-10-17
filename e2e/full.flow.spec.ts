import { test, expect, Page, Locator } from "@playwright/test";
import { NewUserPage } from "./pages/new-admission";

test("Fluxo completo de criação, aprovação, revisão, reprovação e exclusão de um usuário", async ({
  page,
}) => {
  // Dados do novo usuário
  const newUser = {
    employeeName: "Teste Frontend",
    email: "teste@example.com",
    cpf: "987.654.321-00",
    admissionDate: "2023-10-01",
  };

  // Navegar para a página inicial
  await page.goto("http://localhost:3001");

  // Navegar para a página de criação de novo usuário
  await page.getByTestId("new-admission-button").click();

  // Preencher o formulário e criar o novo usuário
  const newUserPage = new NewUserPage(page);
  await newUserPage.fillForm(
    newUser.employeeName,
    newUser.email,
    newUser.cpf,
    newUser.admissionDate
  );

  // Verificar se foi redirecionado para o dashboard
  await expect(page).toHaveURL("http://localhost:3001/dashboard");

  // Esperar que o usuário apareça na coluna "Pronto para revisar"
  const reviewColumn = page.locator("text=Pronto para revisar").locator("..");
  await expect(reviewColumn).toContainText(newUser.employeeName);

  // Selecionar o cartão do usuário usando 'data-testid'
  const userCard = page
    .locator(`[data-testid^="user-card-"]`, {
      hasText: newUser.employeeName,
    })
    .first();
  await expect(userCard).toBeVisible();

  // Aprovar o usuário
  await approveUser(page, userCard);

  // Verificar que o usuário está na coluna "Aprovado"
  const approvedColumn = page.locator("text=Aprovado").locator("..");
  await expect(approvedColumn).toContainText(newUser.employeeName);

  // Selecionar o cartão na coluna "Aprovado"
  const approvedUserCard = page
    .locator(`[data-testid^="user-card-"]`, {
      hasText: newUser.employeeName,
    })
    .first();
  await expect(approvedUserCard).toBeVisible();

  // Clicar em "Revisar novamente"
  await reviewAgainUser(page, approvedUserCard);

  // Esperar que o usuário volte para a coluna "Pronto para revisar"
  await expect(reviewColumn).toContainText(newUser.employeeName);
  await expect(approvedColumn).not.toContainText(newUser.employeeName);

  // Selecionar o cartão do usuário na coluna "Pronto para revisar"
  const userCardInReview = page
    .locator(`[data-testid^="user-card-"]`, {
      hasText: newUser.employeeName,
    })
    .first();
  await expect(userCardInReview).toBeVisible();

  // Reprovar o usuário
  await reproveUser(page, userCardInReview);

  // Verificar que o usuário está na coluna "Reprovado"
  const reprovedColumn = page.locator("text=Reprovado").locator("..");
  await expect(reprovedColumn).toContainText(newUser.employeeName);
  await expect(reviewColumn).not.toContainText(newUser.employeeName);

  // Selecionar o cartão na coluna "Reprovado"
  const reprovedUserCard = page
    .locator(`[data-testid^="user-card-"]`, {
      hasText: newUser.employeeName,
    })
    .first();
  await expect(reprovedUserCard).toBeVisible();

  // Deletar o usuário
  await deleteUser(page, reprovedUserCard);

  // Verificar que o usuário foi removido
  await expect(reprovedColumn).not.toContainText(newUser.employeeName);

  // (Opcional) Verificar se o usuário não está mais na lista
  await expect(
    page.getByTestId(`user-card-${newUser.employeeName}`)
  ).not.toBeVisible();
});

// Função auxiliar para aprovar o usuário
async function approveUser(page: Page, userCard: Locator) {
  const approveButton = userCard.getByTestId("approve-button");
  await expect(approveButton).toBeVisible();
  await approveButton.click();

  const confirmDialog = page.locator(".p-confirm-dialog");
  await expect(confirmDialog).toBeVisible();
  const yesButton = confirmDialog.getByText("Sim", { exact: true });
  await yesButton.click();

  // Esperar que o usuário seja movido para a coluna "Aprovado"
  await page.waitForTimeout(1000); // Ajuste o tempo conforme necessário
}

// Função auxiliar para revisar novamente o usuário
async function reviewAgainUser(page: Page, userCard: Locator) {
  const reviewButton = userCard.getByTestId("review-button");
  await expect(reviewButton).toBeVisible();
  await reviewButton.click();

  const confirmDialog = page.locator(".p-confirm-dialog");
  await expect(confirmDialog).toBeVisible();
  const yesButton = confirmDialog.getByText("Sim", { exact: true });
  await yesButton.click();

  // Esperar que o usuário seja movido para a coluna "Pronto para revisar"
  await page.waitForTimeout(1000); // Ajuste o tempo conforme necessário
}

// Função auxiliar para reprovar o usuário
async function reproveUser(page: Page, userCard: Locator) {
  const reproveButton = userCard.getByTestId("reprove-button");
  await expect(reproveButton).toBeVisible();
  await reproveButton.click();

  const confirmDialog = page.locator(".p-confirm-dialog");
  await expect(confirmDialog).toBeVisible();
  const yesButton = confirmDialog.getByText("Sim", { exact: true });
  await yesButton.click();

  // Esperar que o usuário seja movido para a coluna "Reprovado"
  await page.waitForTimeout(1000); // Ajuste o tempo conforme necessário
}

// Função auxiliar para deletar o usuário
async function deleteUser(page: Page, userCard: Locator) {
  const deleteButton = userCard.getByTestId("delete-button");
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  const confirmDialog = page.locator(".p-confirm-dialog");
  await expect(confirmDialog).toBeVisible();
  const yesButton = confirmDialog.getByText("Sim", { exact: true });
  await yesButton.click();

  // Esperar que o usuário seja removido da lista
  await page.waitForTimeout(1000); // Ajuste o tempo conforme necessário
}
