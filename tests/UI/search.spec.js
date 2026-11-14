import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { HomePage } from '../../pages/HomePage';
import { searchTerm } from '../../data/search.json';
import { user } from '../../data/login.json';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await new AccountPage(page).expectLoaded();
  });

  test('TC -03 search for Thor Hammer', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.search(searchTerm);
    await home.expectCaption(searchTerm);
    await home.expectSingleResultNamed(searchTerm);
    await home.openSingleResult();
  });
});
