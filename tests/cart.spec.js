//@ts-check
import { test, expect } from "@playwright/test";

test("Add to cart and verify cart count", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator(".inventory_list")).toBeVisible();
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  const cartIcon = page.locator(".shopping_cart_container");
  await expect(cartIcon).toHaveText("1");
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();
  await page.waitForTimeout(5000);

  await expect(page.locator(".cart_list")).toBeVisible();
  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );
  await page.locator("#continue-shopping").click();
  await page.locator("#add-to-cart-sauce-labs-bike-light").click();
  await expect(cartIcon).toHaveText("2");
  await page.pause();
});

test("Remove item from  cart and verify cart count", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator(".inventory_list")).toBeVisible();
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  const cartIcon = page.locator(".shopping_cart_container");
  await expect(cartIcon).toHaveText("1");
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();
  await expect(page.locator(".cart_list")).toBeVisible();
  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );
  await page.locator("#remove-sauce-labs-backpack").click();
  await expect(cartIcon).toBeEmpty();
  await page.pause();
});

test("Add items to cart using loop", async ({ page }) => {
  await page.goto("https://www.saucedemo.com", { timeout: 10000 });
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator(".inventory_list")).toBeVisible();

  const productsToAdd = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
  const allProducts = await page.locator(".inventory_item");
  const allProductsCount = await allProducts.count();
  console.log("total products found:", allProductsCount);

  for (let p = 0; p < allProductsCount; p++) {
    const product = allProducts.nth(p);
    const productName = await product
      .locator(".inventory_item_name")
      .textContent();
    const name = productName?.trim() || "";
    console.log("Checking product:", name);

    if (productsToAdd.includes(name)) {
      await product.locator("button:has-text('Add to cart')").click();
      console.log("Product added:", name);
    }
  }

  const cartIcon = page.locator(".shopping_cart_container");

  await expect(cartIcon).toHaveText("2");
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();
  await page.pause();
});
