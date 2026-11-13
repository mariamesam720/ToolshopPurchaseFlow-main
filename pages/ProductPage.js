const {expect} = require('@playwright/test');
class ProductPage {
    constructor(page) {
        this.page = page;
        this.card=page.locator('a.card');
        this.addtoCartButton = page.getByRole('button', { name: 'Add to cart' });
this.price = page.locator('[aria-label="unit-price"]');
        this.toast = page.getByRole('alert');

    }

    async addToCart() {
        await this.addtoCartButton.click();
    }
    // assertions
    async expectDetailsMatch({name,price}) {
        const title = this.page.getByRole('heading', { name, exact: true });
          await expect(this.price).toBeVisible();
        await expect(title).toBeVisible();
    }
    async expectAddedToast() {
        await expect(this.toast).toContainText('Product added to shopping cart.');
    }
    
  }
  module.exports = { ProductPage };