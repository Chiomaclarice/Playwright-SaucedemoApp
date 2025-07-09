export class Cart {
  constructor(page) {
    this.page = page;
    this.addToCartButton1 = page.locator("#add-to-cart-sauce-labs-backpack");
    this.addToCartButton2 = page.locator("#add-to-cart-sauce-labs-bike-light");
    this.addToCartButton3 = page.locator(
      "#add-to-cart-sauce-labs-bolt-t-shirt"
    );
    this.cartIcon = page.locator(".shopping_cart_container");
    this.continueShoppingButton = page.locator("#continue-shopping");
    this.removeButton1 = page.locator("#remove-sauce-labs-backpack");
    this.removeButton2 = page.locator("#remove-sauce-labs-bike-light");
    this.removeButton3 = page.locator("#remove-sauce-labs-bolt-t-shirt");
  }

  async addToCart() {
    await this.addToCartButton1.click();
    await this.addToCartButton2.click();
    await this.addToCartButton3.click();
    await this.cartIcon.click();
    await this.continueShoppingButton.click();
  }
  async removeFromCart() {
    await this.removeButton1.click();
    await this.removeButton2.click();
    await this.removeButton3.click();
  }
}
