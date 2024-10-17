import type { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly buttonApprove: Locator;
  readonly buttonReprove: Locator;
  readonly buttonReview: Locator;
  readonly buttonTrash: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonApprove = page
      .getByText("Teste Frontendteste@e2e.")
      .nth(2)
      .getByRole("button", { name: "Aprovar" });
    this.buttonReprove = page.getByRole("button", { name: "Reprovar" });
    this.buttonReview = page.getByRole("button", { name: "Revisar novamente" });
    this.buttonTrash = page.getByTestId("delete-button");
  }
}
