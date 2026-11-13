const {expect} = require('@playwright/test');
class AccountPage {
  constructor(page) {
    this.page = page;
    this.accountHeader = page.getByRole('heading', { name: 'My account' });
  }
  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/account$/);
    await expect(this.accountHeader).toBeVisible();
  }

}
module.exports = { AccountPage };