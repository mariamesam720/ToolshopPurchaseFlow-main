const {expect , test} = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { RegisterPage } = require('../../pages/RegisterPage.js');
const registrationData = require('../../data/registration.json');
const {NavBar} = require('../../pages/NavBar.js');
const { AccountPage } = require('../../pages/AccountPage.js');

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
      const navbar = new NavBar(page);
    const user = registrationData.user;
    
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await loginPage.expectOnLoginPage();
    await navbar.expectUserName(user.firstName);

  })
})