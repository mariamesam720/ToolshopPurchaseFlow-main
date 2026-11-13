const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AccountPage } = require('../../pages/AccountPage');
const { HomePage } = require('../../pages/HomePage');
const { ProductPage } = require('../../pages/ProductPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { NavBar } = require('../../pages/NavBar');
const { user, searchTerm, productName, quantity , productPrice } = require('../../data/cart.json');

async function login(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await new AccountPage(page).expectLoaded();
}

test.describe('Cart', () => {
  test('TC-04 add Thor Hammer to the cart from its product page', async ({ page }) => {
    await login(page);
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const nav = new NavBar(page);

    await home.open();
    await home.search(searchTerm);
    const card = await home.expectSingleResultNamed(productName);
    await home.openSingleResult();

    await product.expectDetailsMatch({ name: productName, price: productPrice });
    await product.addToCart();
    await product.expectAddedToast();
    await nav.expectCartCount(1);
  });
})