import type { Locator, Page } from "@playwright/test";

export class NewUserPage {
  readonly page: Page;
  readonly name: Locator;
  readonly email: Locator;
  readonly cpf: Locator;
  readonly admission: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.getByPlaceholder("Nome");
    this.email = page.getByPlaceholder("Email");
    this.cpf = page.getByPlaceholder("CPF");
    this.admission = page.locator('input[type="date"]');
    this.button = page.getByTestId("create-new-admission");
  }

  async fillForm(name: string, email: string, cpf: string, date: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.cpf.fill(cpf);
    await this.admission.fill(date);
    await this.button.click();
  }
}
