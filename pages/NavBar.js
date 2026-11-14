const { expect } = require('@playwright/test');

class NavBar {
  constructor(page) {
    this.page = page;
    this.mainMenu = page.getByRole('menubar', { name: 'Main menu' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.myInvoicesLink = page.getByRole('link', { name: 'My invoices' });
  }

  async expectUserName(fullName) {
    await expect(this.mainMenu.getByRole('button', { name: fullName })).toBeVisible();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count) {
    await expect(this.cartQuantity).toHaveText(String(count));
  }

  // the user's name in the menu opens a dropdown that contains "My invoices"
  async openMyInvoices(fullName) {
    await this.mainMenu.getByRole('button', { name: fullName }).click();
    await this.myInvoicesLink.click();
  }
}

module.exports = { NavBar };