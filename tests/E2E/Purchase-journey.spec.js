import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NavBar } from '../../pages/NavBar';
import { user, searchTerm, productName, billing, card } from '../../data/purchase-journey.json';

test(' TC-07 full purchase journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const nav = new NavBar(page);
  const checkout = new CheckoutPage(page);

  await test.step('Log in', async () => {
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await new AccountPage(page).expectLoaded();
  });

  await test.step('Search for the product', async () => {
    await home.open();
    await home.search(searchTerm);
    await home.expectSingleResultNamed(productName);
    await home.openSingleResult();
  });

  await test.step('Add to cart', async () => {
    await product.addToCart();
    await product.expectAddedToast();
    await nav.expectCartCount(1);
  });

  await test.step('Walk through checkout', async () => {
    await nav.openCart();
    await checkout.expectSingleLine({ name: productName, quantity: 1 });
    await checkout.proceedFromCart();
    await checkout.expectSignInSkipped();
    await checkout.proceedFromSignIn();
await checkout.fillBillingAddress(billing);
await checkout.proceedFromBilling();
  });

  await test.step('Pay and confirm', async () => {
    await checkout.pay(card);
    await checkout.expectPaymentSuccessful();
    await checkout.confirmOrder();
    await checkout.expectOrderConfirmedWithInvoice();
  });
});
