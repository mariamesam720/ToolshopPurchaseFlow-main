const {expect} = require('@playwright/test');
class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.caption = page.getByRole('heading', { name: /^Searched for:/ });
    this.productLinks = page.locator('a[href^="/product/"]');

  }

  async open() { await this.page.goto('/'); }
  //actions 
  async search(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  //assertions
  async expectCaption(term) { await expect(this.caption).toHaveText(`Searched for: ${term}`); }
  // assert on the number of results returned is only one and that the name of the product is as expected
 async expectSingleResultNamed(name) {
    const matchingProduct = this.productLinks.filter({
      has: this.page.getByRole('heading', {
        name,
        exact: true
      })
    });

    await expect(matchingProduct).toHaveCount(1);
    await expect(matchingProduct).toBeVisible();
  }
}
module.exports = { HomePage };