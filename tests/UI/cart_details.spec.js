import { expect, test } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NavBar } from '../../pages/NavBar';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { HomePage } from '../../pages/HomePage';
import { user, searchTerm, productName, quantity, productPrice } from '../../data/cart.json';

async function login(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await new AccountPage(page).expectLoaded();
}
  
test.describe('with Thor Hammer already in the cart', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      const home = new HomePage(page);
      await home.open();
      await home.search(searchTerm);
      await home.expectSingleResultNamed(productName);
      await home.openSingleResult();
      const product = new ProductPage(page);
      await product.addToCart();
      await product.expectAddedToast();
    });

    test('TC-05 cart shows one correct line', async ({ page }) => {
      await new NavBar(page).openCart();
      const cart = new CheckoutPage(page);
      await cart.expectSingleLine({ name: productName, quantity });
      await cart.expectPricesConsistent();
    });
  });