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
  }  

  module.exports = { CheckoutPage };