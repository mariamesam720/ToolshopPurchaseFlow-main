const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AccountPage } = require('../../pages/AccountPage');
const { HomePage } = require('../../pages/HomePage');
const { searchTerm } = require('../../data/search.json');
const { user } = require('../../data/login.json');

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await new AccountPage(page).expectLoaded();
  });

  test('search for Thor Hammer', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.search(searchTerm);
    await home.expectCaption(searchTerm);
    await home.expectSingleResultNamed(searchTerm);
    await home.openSingleResult();
  });
});
