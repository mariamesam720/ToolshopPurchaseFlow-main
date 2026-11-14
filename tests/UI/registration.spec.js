const {test, expect} = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage.js');
const registrationData = require('../../data/registration.json');
const { uniqueEmail } = require('../../utils/helpers.js');


test.describe('Registration Tests', () => {
  test('TC-01: Register a new user', async ({ page }) => {
    const user = { ...registrationData.user, email: uniqueEmail() };

    const registerPage = new RegisterPage(page);

    await registerPage.open();
    await registerPage.register(user);
    await registerPage.expectRedirectedToLogin();
  });
}
)
