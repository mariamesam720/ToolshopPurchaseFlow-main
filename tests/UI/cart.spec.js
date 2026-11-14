import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NavBar } from '../../pages/NavBar';
import { user, searchTerm, productName, quantity, productPrice } from '../../data/cart.json';

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