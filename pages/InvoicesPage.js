const { expect } = require('@playwright/test');

class InvoicesPage {
  constructor(page) {
    this.page = page;
  }

  async expectInvoiceListed(invoiceNumber) {
    await expect(this.page).toHaveURL(/\/account\/invoices/);
    await expect(this.page.getByRole('cell', { name: invoiceNumber })).toBeVisible();
  }
}

module.exports = { InvoicesPage };