const {expect} = require('@playwright/test');
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email=page.getByRole('textbox', { name: 'Email address' });
    this.password=page.getByRole('textbox', { name: 'Password'});
    this.submit=page.getByRole('button', { name: 'Login' });
  }
  async open() { await this.page.goto('/auth/login'); }
  // actions
  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
    
  }
  // assertions
    async expectOnLoginPage() { await expect(this.page).toHaveURL(/\/auth\/login/); }
  

}
module.exports = { LoginPage };