import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { NavBar } from '../../pages/NavBar';
import { uniqueEmail } from '../../utils/helpers';
import { user as _user } from '../../data/registration.json';
test.describe('Login', () => {
  let user;

  test.beforeEach(async ({ page }) => {
    user = { ..._user, email: uniqueEmail() };
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.register(user);
    await registerPage.expectRedirectedToLogin();
  });

  test('TC-02 login with valid credentials', async ({ page }) => {
    await new LoginPage(page).login(user.email, user.password);
    await new AccountPage(page).expectLoaded();
    await new NavBar(page).expectUserName(`${user.firstName} ${user.lastName}`);
  });
});