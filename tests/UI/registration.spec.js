const {test, expect} = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage.js');
const registrationData = require('../../data/registration.json');

test.describe('Registration Tests', () => {
  test('TC-01: Register a new user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = registrationData.user;

    await registerPage.open();
    await registerPage.register(user);
    await registerPage.expectRedirectedToLogin();
  });
}
)
