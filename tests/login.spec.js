// @ts-check
import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/login";
import { time } from "console";

test.only("login with pom", async ({ page }) => {
  const login = new loginPage(page);
  await page.goto("/", { timeout: 10000 });
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.waitForTimeout(5000);
  await login.login("standard_user", "secret_sauce");
  await expect(page.locator(".inventory_list")).toBeVisible();
  await page.pause();
});

test("Login with valid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com", { timeout: 10000 });
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator(".inventory_list")).toBeVisible();

  await page.pause();
});

test("Login with invalid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com", { timeout: 10000 });
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill("invalid_sauce");
  await page.locator('[data-test="login-button"]').click();
  const errorMessage = page.locator("[data-test='error']");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Login with locked out user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator("#user-name").fill("locked_out_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  const errorMessage = page.locator("[data-test='error']");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});
