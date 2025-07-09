import { Locator } from "@playwright/test";

export class loginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
  errorMessage() {
    return this.page.locator("[data-test='error']");
  }
}
