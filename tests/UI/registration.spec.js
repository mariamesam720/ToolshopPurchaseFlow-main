import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { user as _user } from '../../data/registration.json';
import { uniqueEmail } from '../../utils/helpers.js';


test.describe('Registration Tests', () => {
  test('TC-01: Register a new user', async ({ page }) => {
    const user = { ..._user, email: uniqueEmail() };

    const registerPage = new RegisterPage(page);

    await registerPage.open();
    await registerPage.register(user);
    await registerPage.expectRedirectedToLogin();
  });
}
)
