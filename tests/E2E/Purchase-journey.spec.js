const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AccountPage } = require('../../pages/AccountPage');
const { HomePage } = require('../../pages/HomePage');
const { ProductPage } = require('../../pages/ProductPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { NavBar } = require('../../pages/NavBar');
const data = require('../../data/purchase-journey.json');

test(' full purchase journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const nav = new NavBar(page);
  const checkout = new CheckoutPage(page);

  await test.step('Log in', async () => {
    await loginPage.open();
    await loginPage.login(data.user.email, data.user.password);
    await new AccountPage(page).expectLoaded();
  });

  await test.step('Search for the product', async () => {
    await home.open();
    await home.search(data.searchTerm);
    await home.expectSingleResultNamed(data.productName);
    await home.openSingleResult();
  });

  await test.step('Add to cart', async () => {
    await product.addToCart();
    await product.expectAddedToast();
    await nav.expectCartCount(1);
  });

  await test.step('Walk through checkout', async () => {
    await nav.openCart();
    await checkout.expectSingleLine({ name: data.productName, quantity: 1 });
    await checkout.proceedFromCart();
    await checkout.expectSignInSkipped();
    await checkout.proceedFromSignIn();
await checkout.fillBillingAddress(data.billing);
await checkout.proceedFromBilling();
  });

  await test.step('Pay and confirm', async () => {
    await checkout.pay(data.card);
    await checkout.expectPaymentSuccessful();
    await checkout.confirmOrder();
    await checkout.expectOrderConfirmedWithInvoice();
  });
});
