const { test } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');
const { LoginPage } = require('../../pages/LoginPage');
const { AccountPage } = require('../../pages/AccountPage');
const { NavBar } = require('../../pages/NavBar');
const { uniqueEmail } = require('../../utils/helpers');
const data = require('../../data/registration.json');

test.describe('Registration Tests', () => {
  test('TC-01 register a new customer and log in with it', async ({ page }) => {
    const user = { ...data.user, email: uniqueEmail() };

    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.register(user);
    await registerPage.expectRedirectedToLogin();

    await new LoginPage(page).login(user.email, user.password);
    await new AccountPage(page).expectLoaded();
    await new NavBar(page).expectUserName(`${user.firstName} ${user.lastName}`);
  });
});
