
const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.caption = page.getByRole('heading', {
      name: /^Searched for:/
    });

    this.productCards = page.locator('a.card');
  }

  // Actions
  async open() {
    await this.page.goto('/');
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  // Reusable product locator
  getProductCard(name) {
    return this.productCards.filter({
      has: this.page.getByRole('heading', {
        name,
        exact: true
      })
    });
  }

  // Assertions
  async expectCaption(term) {
    await expect(this.caption).toHaveText(`Searched for: ${term}`);
  }

  async expectSingleResultNamed(name) {
    await expect(this.productCards).toHaveCount(1);

    const product = this.getProductCard(name);
    await expect(product).toBeVisible();
  }

  // Open the search result
  async openSingleResult(name) {
    await expect(this.productCards).toHaveCount(1);

    const product = this.getProductCard(name);
    await expect(product).toBeVisible();

    await product.click(); 
  }
}

module.exports = { HomePage };
