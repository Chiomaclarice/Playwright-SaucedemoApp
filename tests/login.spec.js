// @ts-check
import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/Login";

test.describe("Login Tests", () => {
  let login;
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 10000 });
    await expect(page).toHaveTitle(/Swag Labs/);
    login = new loginPage(page);
  });

  test("Login with valid credentials", async ({ page }) => {
    await login.login("standard_user", "secret_sauce");
    await expect(page.locator(".inventory_list")).toBeVisible();
    await page.pause();
  });

  test("Login with invalid credentials", async ({ page }) => {
    await login.login("invalid_user", "invalid_sauce");
    await expect(login.errorMessage()).toBeVisible();
    await expect(login.errorMessage()).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Login with locked out user", async ({ page }) => {
    await login.login("locked_out_user", "secret_sauce");
    await expect(login.errorMessage()).toBeVisible();
    await expect(login.errorMessage()).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
