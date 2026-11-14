const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // step 1: cart
    this.cartLines = page.getByRole('row').filter({ has: page.locator('[data-test="product-title"]') });
    this.lineTitle = page.locator('[data-test="product-title"]');
    this.lineQuantity = page.locator('[data-test="product-quantity"]');
    this.lineUnitPrice = page.locator('[data-test="product-price"]');
    this.linePrice = page.locator('[data-test="line-price"]');
    this.cartTotal = page.locator('[data-test="cart-total"]');
    this.proceedToSignIn = page.locator('[data-test="proceed-1"]');

    // step 2: sign in (skipped when already logged in)
    this.alreadyLoggedIn = page.getByText(/you are already logged in/i);
    this.proceedToCheckout = page.getByRole('button', { name: 'Proceed to checkout' });

    // step 3: billing address
    this.country = page.getByRole('combobox', { name: 'Country' });
    this.postalCode = page.getByRole('textbox', { name: 'Postal code' });
    this.houseNumber = page.getByRole('textbox', { name: 'House number' });
    this.street = page.getByRole('textbox', { name: 'Street' });
    this.city = page.getByRole('textbox', { name: 'City' });
    this.state = page.getByRole('textbox', { name: 'State' });
    this.proceedToPayment = page.getByRole('button', { name: 'Proceed to checkout' });

    // step 4: payment
    this.paymentMethod = page.getByRole('combobox', { name: 'Payment Method' });
    this.cardNumber = page.getByRole('textbox', { name: 'Credit Card Number' });
    this.expiry = page.getByRole('textbox', { name: 'Expiration Date' });
    this.cvv = page.getByRole('textbox', { name: 'CVV' });
    this.cardHolder = page.getByRole('textbox', { name: 'Card Holder Name' });
    this.checkPayment = page.getByRole('button', { name: 'Check payment' });
    this.paymentSuccess = page.getByText('Payment was successful');

    // step 5: confirmation
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.orderConfirmation = page.getByText(/Your invoice number is INV-\d+/);
  }

  // ---------- step 1: cart ----------
  async expectSingleLine({ name, quantity }) {
    await expect(this.cartLines).toHaveCount(1);
    await expect(this.cartLines).toContainText(name);
    await expect(this.lineQuantity).toHaveValue(String(quantity));
  }

  async expectPricesConsistent() {
    const unitPrice = parseFloat((await this.lineUnitPrice.textContent()).replace(/[^0-9.]/g, ''));
    const quantity = Number(await this.lineQuantity.inputValue());
    const expected = (unitPrice * quantity).toFixed(2);

    await expect(this.linePrice).toContainText(expected);
    await expect(this.cartTotal).toContainText(expected);
  }

  async proceedFromCart() {
    await this.proceedToSignIn.click();
  }

  // ---------- step 2: sign in skipped ----------
  async expectSignInSkipped() {
    await expect(this.alreadyLoggedIn).toBeVisible();
  }

  async proceedFromSignIn() {
    await this.proceedToCheckout.click();
  }

  // ---------- step 3: billing address ----------
  // Check this BEFORE typing anything: the site changes the address afterwards.
  async expectBillingPrefilled(address) {
    await expect(this.street).toHaveValue(address.street);
    await expect(this.city).toHaveValue(address.city);
  }

  // The site fills street, city and state itself once country, postal code
  // and house number are entered, so we do not assert those three here.
  async fillBillingAddress(billing) {
    await this.country.selectOption({ label: billing.country });
    await this.postalCode.fill(billing.postalCode);
    await this.houseNumber.fill(billing.houseNumber);
    await expect(this.state).toHaveValue(/.+/);
    await expect(this.proceedToPayment).toBeEnabled();
  }

  async proceedFromBilling() {
    await this.proceedToPayment.click();
  }

  // ---------- step 4: payment ----------
  async pay(card) {
    await this.paymentMethod.selectOption(card.method);
    await this.cardNumber.fill(card.number);
    await this.expiry.fill(card.expiry);
    await this.cvv.fill(card.cvv);
    await this.cardHolder.fill(card.holder);
    await this.checkPayment.click();
  }

  async expectPaymentSuccessful() {
    await expect(this.paymentSuccess).toBeVisible();
  }

  // ---------- step 5: confirm ----------
  async confirmOrder() {
    await this.confirmButton.click();
  }

  async expectOrderConfirmedWithInvoice() {
    await expect(this.orderConfirmation).toBeVisible();
    const text = await this.orderConfirmation.textContent();
    return text.match(/INV-\d+/)[0];
  }
}

module.exports = { CheckoutPage };