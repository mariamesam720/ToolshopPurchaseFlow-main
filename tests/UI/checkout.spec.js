const { test } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');
const { LoginPage } = require('../../pages/LoginPage');
const { AccountPage } = require('../../pages/AccountPage');
const { HomePage } = require('../../pages/HomePage');
const { ProductPage } = require('../../pages/ProductPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { InvoicesPage } = require('../../pages/InvoicesPage');
const { NavBar } = require('../../pages/NavBar');
const { uniqueEmail } = require('../../utils/helpers');
const data = require('../../data/checkout.json');

test.describe('Checkout', () => {
  let user;
  let address;   // street + city the site filled in during registration

  test.beforeEach(async ({ page }) => {
    // register a fresh user (independent test, no shared account)
    user = { ...data.user, email: uniqueEmail() };
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    address = await registerPage.register(user);
    await registerPage.expectRedirectedToLogin();

    // log in with the same user
    await new LoginPage(page).login(user.email, user.password);
    await new AccountPage(page).expectLoaded();

    // add the product to the cart
    const home = new HomePage(page);
    await home.open();
    await home.search(data.searchTerm);
    await home.expectSingleResultNamed(data.productName);
    await home.openSingleResult();
    const product = new ProductPage(page);
    await product.addToCart();
    await product.expectAddedToast();
  });

  test('TC-06 complete checkout, asserting every step', async ({ page }) => {
    const nav = new NavBar(page);
    const checkout = new CheckoutPage(page);

    await nav.openCart();
    await checkout.expectSingleLine({ name: data.productName, quantity: data.quantity });  // 1
    await checkout.proceedFromCart();

    await checkout.expectSignInSkipped();                                                  // 2
    await checkout.proceedFromSignIn();

    await checkout.expectBillingPrefilled(address);                                        // 3 (before typing)
    await checkout.fillBillingAddress(user);
    await checkout.proceedFromBilling();

    await checkout.pay(data.card);
    await checkout.expectPaymentSuccessful();                                              // 4
    await checkout.confirmOrder();

    const invoice = await checkout.expectOrderConfirmedWithInvoice();                      // 5
   await nav.openMyInvoices(`${user.firstName} ${user.lastName}`);

    await new InvoicesPage(page).expectInvoiceListed(invoice);                             // 6
  });
});