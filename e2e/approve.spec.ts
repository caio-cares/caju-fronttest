import { test } from "./support/globals";

test.describe("Approve new admission", async () => {
  test("Approve User", async ({ dashboardPage }) => {
    await dashboardPage.approve();
  });
});
