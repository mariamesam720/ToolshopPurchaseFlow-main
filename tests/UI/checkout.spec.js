import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NavBar } from '../../pages/NavBar';
import { user, searchTerm, productName, quantity as _quantity, billing, card } from '../../data/checkout.json';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await new AccountPage(page).expectLoaded();

    const home = new HomePage(page);
    await home.open();
    await home.search(searchTerm);
    await home.expectSingleResultNamed(productName);
    await home.openSingleResult();
    const product = new ProductPage(page);
    await product.addToCart();
    await product.expectAddedToast();
  });

  test('TC-06 complete checkout, asserting every step', async ({ page }) => {
    const nav = new NavBar(page);
    const checkout = new CheckoutPage(page);

    await nav.openCart();
    await checkout.expectSingleLine({ name: productName, quantity: _quantity });   // 1
    await checkout.proceedFromCart();

    await checkout.expectSignInSkipped();                                                   // 2
    await checkout.proceedFromSignIn();

  await checkout.proceedFromSignIn();
await checkout.expectBillingPrefilled(billing);   // before filling
await checkout.fillBillingAddress(billing);
await checkout.proceedFromBilling();

    await checkout.pay(card);
    await checkout.expectPaymentSuccessful();                                               // 4
    await checkout.confirmOrder();
  const invoice = await checkout.expectOrderConfirmedWithInvoice();                       // 5

    await nav.openMyInvoices();
    await new InvoicesPage(page).expectInvoiceListed(invoice);          
  
  });
});
