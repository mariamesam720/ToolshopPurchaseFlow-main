const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AccountPage } = require('../../pages/AccountPage');
const { HomePage } = require('../../pages/HomePage');
const { ProductPage } = require('../../pages/ProductPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { NavBar } = require('../../pages/NavBar');
const data = require('../../data/checkout.json');

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(data.user.email, data.user.password);
    await new AccountPage(page).expectLoaded();

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
    await checkout.expectSingleLine({ name: data.productName, quantity: data.quantity });   // 1
    await checkout.proceedFromCart();

    await checkout.expectSignInSkipped();                                                   // 2
    await checkout.proceedFromSignIn();

    /*await checkout.expectBillingPrefilled(data.billing);                                    // 3
    await checkout.expectBillingPrefilled(data.billing);                                  
    await checkout.proceedFromBilling();*/

    await checkout.pay(data.card);
    await checkout.expectPaymentSuccessful();                                               // 4
    await checkout.confirmOrder();
  const invoice = await checkout.expectOrderConfirmedWithInvoice();                       // 5

    await nav.openMyInvoices();
    await new InvoicesPage(page).expectInvoiceListed(invoice);          
  
  });
});
