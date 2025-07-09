//@ts-check
import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/Login";
import { Cart } from "../pages/Cart";

test.describe("Cart Tests", () => {
  let login;
  let cart;
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 10000 });
    await expect(page).toHaveTitle(/Swag Labs/);
    login = new loginPage(page);
    cart = new Cart(page);
  });

  test("Add to cart and verify cart count", async ({ page }) => {
    await login.login("standard_user", "secret_sauce");
    await expect(page.locator(".inventory_list")).toBeVisible();
    await cart.addToCartButton1.click();
    await expect(cart.cartIcon).toBeVisible();
    await expect(cart.cartIcon).toHaveText("1");
    await cart.cartIcon.click();

    await page.waitForTimeout(5000);
    await expect(page.locator(".cart_list")).toBeVisible();
    await expect(page.locator(".inventory_item_name")).toHaveText(
      "Sauce Labs Backpack"
    );
    await expect(cart.continueShoppingButton).toBeVisible();
    await cart.continueShoppingButton.click();
    await cart.addToCartButton2.click();
    await expect(cart.cartIcon).toHaveText("2");
    await page.pause();
  });

  test("Remove item from  cart and verify cart count", async ({ page }) => {
    await login.login("standard_user", "secret_sauce");
    await expect(page.locator(".inventory_list")).toBeVisible();
    await cart.addToCartButton1.click();
    await expect(cart.cartIcon).toBeVisible();
    await expect(cart.cartIcon).toHaveText("1");
    await cart.cartIcon.click();
    await expect(page.locator(".cart_list")).toBeVisible();
    await expect(page.locator(".inventory_item_name")).toHaveText(
      "Sauce Labs Backpack"
    );
    await cart.removeButton1.click();
    await expect(cart.cartIcon).toBeEmpty();
    await page.pause();
  });

  test("Add items to cart using loop", async ({ page }) => {
    await login.login("standard_user", "secret_sauce");
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
    await expect(cart.cartIcon).toBeVisible();
    await expect(cart.cartIcon).toHaveText("2");
    await cart.cartIcon.click();
    await page.pause();
  });
});
