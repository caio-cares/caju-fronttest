import { DashboardPage } from "../pages/dashboard";
import { NewUserPage } from "../pages/new-admission";
import { test as base } from "@playwright/test";

type PageObject = {
  dashboardPage: DashboardPage;
  newUserPage: NewUserPage;
};

export const test = base.extend<PageObject>({
  dashboardPage: async ({ page }, use: (arg0: DashboardPage) => void) => {
    const dashboardPage = new DashboardPage(page);
    use(dashboardPage);
  },
  newUserPage: async ({ page }, use: (arg0: NewUserPage) => void) => {
    const newUserPage = new NewUserPage(page);
    use(newUserPage);
  },
});

export const expect = test.expect;
