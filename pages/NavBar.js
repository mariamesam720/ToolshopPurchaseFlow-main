const { expect } = require('@playwright/test');

class NavBar{
  constructor(page){
    this.page = page;
    this.mainMenu = page.getByRole('menubar', { name: 'Main menu' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');  }
  async expectUserName(fullName){
    await expect(this.mainMenu.getByRole('button', {name : fullName})).toBeVisible();
  }

    async openCart() { await this.cartLink.click(); }
  async expectCartCount(count) { await expect(this.cartQuantity).toHaveText(String(count)); }


}
module.exports = {NavBar};