const { expect } = require('@playwright/test');

class NavBar{
  constructor(page){
    this.page = page;
    this.mainMenu = page.getByRole('menubar', { name: 'Main menu' });
  }
  async expectUserName(fullName){
    await expect(this.mainMenu.getByRole('button', {name : fullName})).toBeVisible();
  }

}
module.exports = {NavBar};