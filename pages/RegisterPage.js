const { expect } = require('@playwright/test');
class RegisterPage {
  // locators
  constructor(page) {
    this.page = page;
    this.firstName   = page.getByRole('textbox', { name: 'First name', exact: true });
    this.lastName    = page.getByRole('textbox', { name: 'Last name', exact: true });
    this.dateOfBirth = page.getByRole('textbox', { name: 'Date of Birth', exact: false });
    this.country     = page.getByRole('combobox', { name: 'Country' });
    this.postalCode  = page.getByRole('textbox', { name: 'Postal code' });
    this.houseNumber = page.getByRole('textbox', { name: 'House number' });
    this.street      = page.getByRole('textbox', { name: 'Street', exact: true });
    this.city        = page.getByRole('textbox', { name: 'City', exact: true });
    this.state       = page.getByRole('textbox', { name: 'State', exact: true });
    this.phone       = page.getByRole('textbox', { name: 'Phone' });
    this.email       = page.getByRole('textbox', { name: 'Email address' });
    this.password    = page.getByRole('textbox', { name: 'Password', exact: true });
    this.submit      = page.getByRole('button', { name: 'Register' });
  }
async open() { await this.page.goto('/auth/register'); }
// actions 
async register(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dateOfBirth.fill(user.dateOfBirth);
    await this.street.fill(user.street);
    await this.postalCode.fill(user.postalCode);
    await this.houseNumber.fill(user.houseNumber);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.country.selectOption(user.country);
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.submit.click();
}
// assertions
async expectRedirectedToLogin() { await expect(this.page).toHaveURL(/\/auth\/login/); }
}
module.exports = { RegisterPage };