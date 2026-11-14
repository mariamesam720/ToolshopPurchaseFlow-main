const {expect}= require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page = page;
    // locators of step 1
    this.cartLines = page.getByRole('row').filter({ has: page.locator('[data-test="product-title"]') });
    this.lineTitle = page.locator('[data-test="product-title"]');
    this.lineQuantity = page.locator('[data-test="product-quantity"]');
    this.lineUnitPrice = page.locator('[data-test="product-price"]');
    this.linePrice = page.locator('[data-test="line-price"]');
    this.cartTotal = page.locator('[data-test="cart-total"]');
    this.proceedToSignIn = page.locator('[data-test="proceed-1"]');
    // locators of step 2
    this.alreadyLoggedIn = page.getByText(/you are already logged in/i);
    this.proceedToCheckout = page.getByRole('button', { name: 'Proceed to checkout' });

    // locators of step 3
    this.country = page.getByRole('combobox', { name: 'Country' });
this.proceedToPayment = page.getByRole('button', { name: 'Proceed to checkout' });
    this.street = page.getByRole('textbox', { name: 'Street' });
    this.city = page.getByRole('textbox', { name: 'City' });
    this.state = page.getByRole('textbox', { name: 'State' });
    this.houseNumber = page.getByRole('textbox', { name: 'House number' });
    this.postalCode = page.getByRole('textbox', { name: 'Postal code' });
    
    //  locators for payment (step 4)
this.paymentMethod = page.getByRole('combobox', { name: 'Payment Method' });
    this.cardNumber = page.getByRole('textbox', { name: 'Credit card number' });
    this.expiry = page.getByRole('textbox', { name: 'Expiration date' });
    this.cvv = page.getByRole('textbox', { name: 'CVV' });
this.cardHolder = page.getByRole('textbox', { name: 'Card Holder Name' });
    this.checkPayment = page.getByRole('button', { name: 'Check payment' });
this.paymentSuccess = page.getByText('Payment was successful');
        this.confirmbutton = page.getByRole('button', { name: 'Confirm' });

this.orderConfirmation = page.getByText(/Your invoice number is INV-\d+/);
    }




async fillBillingAddress(billing) {
  await this.postalCode.fill(billing.postalCode);
  await this.houseNumber.fill(billing.houseNumber);
  await this.state.fill(billing.state);
  await expect(this.postalCode).toHaveValue(billing.postalCode);
  await expect(this.houseNumber).toHaveValue(billing.houseNumber);
  await expect(this.state).toHaveValue(billing.state);
}

// assert One line: Thor Hammer × 1; line price = unit price × quantity; total = line price 
  async expectSingleLine({ name, quantity }) {
  await expect(this.cartLines).toHaveCount(1);
  await expect(this.cartLines).toContainText(name);
  await expect(this.lineQuantity).toHaveValue(String(quantity));
}

async expectPricesConsistent() {
  const unitPriceText = await this.lineUnitPrice.textContent();
  const unitPrice = Number(unitPriceText.replace('$', '').trim());

  const quantity = Number(await this.lineQuantity.inputValue());

  const expectedPrice = (unitPrice * quantity).toFixed(2);

  await expect(this.linePrice).toContainText(expectedPrice);
  await expect(this.cartTotal).toContainText(expectedPrice);
}

async proceedFromCart() {
  await this.proceedToSignIn.click();
}

// assert sign-in skipped
async expectSignInSkipped() {
  await expect(this.alreadyLoggedIn).toBeVisible();
}
async proceedFromSignIn() {
  await this.proceedToCheckout.click();
}

// assert billing prefilled
async expectBillingPrefilled(b) {

    await expect(this.street).toHaveValue(b.street);
    await expect(this.city).toHaveValue(b.city);
    
  }
  async proceedFromBilling() { await this.proceedToPayment.click(); }

  //step 4: payment
    async pay(card) {
      await this.paymentMethod.selectOption(card.method);
      await this.cardNumber.fill(card.number);
      await this.expiry.fill(card.expiry);
      await this.cvv.fill(card.cvv);
      await this.cardHolder.fill(card.holder);
      await this.checkPayment.click();
    }
    async expectPaymentSuccessful() { await expect(this.paymentSuccess).toHaveText('Payment was successful'); }
// step 5: confirm 
  async confirmOrder() { await this.confirmbutton.click(); }

async expectOrderConfirmedWithInvoice() {
  await expect(this.orderConfirmation).toBeVisible();
  const text = await this.orderConfirmation.textContent();
  return text.match(/INV-\d+/)[0];
}
  }  

  module.exports = { CheckoutPage };