# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\checkout.spec.js >> Checkout >> TC-06 complete checkout, asserting every step
- Location: tests\UI\checkout.spec.js:40:3

# Error details

```
TypeError: nav.openMyInvoices is not a function
```

# Page snapshot

```yaml
- generic [active] [ref=f5e1]:
  - generic [ref=f5e2]:
    - generic [ref=f5e3]:
      - text: View the
      - link "Documentation" [ref=f5e4] [cursor=pointer]:
        - /url: https://testsmith-io.github.io/practice-software-testing/#/
      - text: for this application.
    - generic [ref=f5e5]:
      - generic [ref=f5e7]:
        - generic [ref=f5e8]: Practice Black Box Testing & Bug Hunting
        - button "Testing Guide" [ref=f5e9] [cursor=pointer]
        - button "🐛 Bug Hunting" [ref=f5e10] [cursor=pointer]
      - navigation [ref=f5e11]:
        - generic [ref=f5e12]:
          - link "Practice Software Testing - Toolshop" [ref=f5e13] [cursor=pointer]:
            - /url: /
          - generic [ref=f5e32]:
            - menubar "Main menu" [ref=f5e33]:
              - menuitem [ref=f5e34]:
                - link "Home" [ref=f5e35] [cursor=pointer]:
                  - /url: /
              - menuitem [ref=f5e36]:
                - button "Categories" [ref=f5e37] [cursor=pointer]
              - menuitem [ref=f5e38]:
                - link "Contact" [ref=f5e39] [cursor=pointer]:
                  - /url: /contact
              - menuitem [ref=f5e40]:
                - button "Trainee Tester" [ref=f5e41] [cursor=pointer]
              - menuitem [ref=f5e42]:
                - link "cart" [ref=f5e43] [cursor=pointer]:
                  - /url: /checkout
                  - generic [ref=f5e47]: "1"
            - button "Select language" [ref=f5e49] [cursor=pointer]: EN
    - generic [ref=f5e55]:
      - list [ref=f5e57]:
        - listitem [ref=f5e58]:
          - generic [ref=f5e59] [cursor=pointer]:
            - generic [ref=f5e60]: Cart
            - generic [ref=f5e61]: "1"
        - listitem [ref=f5e62]:
          - generic [ref=f5e63] [cursor=pointer]:
            - generic [ref=f5e64]: Sign in
            - generic [ref=f5e65]: "2"
        - listitem [ref=f5e66]:
          - generic [ref=f5e67] [cursor=pointer]:
            - generic [ref=f5e68]: Billing Address
            - generic [ref=f5e69]: "3"
        - listitem:
          - generic:
            - generic: Payment
            - generic: "4"
      - generic [ref=f5e74]:
        - generic [ref=f5e75]: Thanks for your order! Your invoice number is INV-2026000007.
        - generic [ref=f5e76]:
          - text: Enjoyed testing this app? Level up with hands-on software testing courses.
          - link "Explore courses" [ref=f5e79] [cursor=pointer]:
            - /url: https://onlinecourses.testsmith.io/?utm_source=pst&utm_medium=checkout&utm_campaign=app_promo
    - contentinfo [ref=f5e81]:
      - generic [ref=f5e83]:
        - generic [ref=f5e84]: Learn & Explore
        - generic [ref=f5e85]:
          - link "Learn Test Automation Hands-on courses for Playwright, Robot Framework, APIs and more" [ref=f5e87] [cursor=pointer]:
            - /url: https://onlinecourses.testsmith.io
            - generic [ref=f5e90]:
              - generic [ref=f5e91]: Learn Test Automation
              - text: Hands-on courses for Playwright, Robot Framework, APIs and more
          - link "API Spector Open-source API testing, mocking and contract testing" [ref=f5e93] [cursor=pointer]:
            - /url: https://api-spector.dev
            - generic [ref=f5e96]:
              - generic [ref=f5e97]: API Spector
              - text: Open-source API testing, mocking and contract testing
          - link "GitHub Source code, issues and contributions" [ref=f5e99] [cursor=pointer]:
            - /url: https://github.com/testsmith-io/practice-software-testing
            - generic [ref=f5e102]:
              - generic [ref=f5e103]: GitHub
              - text: Source code, issues and contributions
      - generic [ref=f5e104]:
        - generic [ref=f5e105]:
          - text: This is a DEMO application, used for software testing training purpose. |
          - link "Privacy Policy" [ref=f5e106] [cursor=pointer]:
            - /url: /privacy
          - text: "| Banner photo by"
          - link "Barn Images" [ref=f5e107] [cursor=pointer]:
            - /url: https://unsplash.com/@barnimages
          - text: "on"
          - link "Unsplash" [ref=f5e108] [cursor=pointer]:
            - /url: https://unsplash.com/photos/t5YUoHW6zRo
          - text: .
        - generic [ref=f5e109]: v2.5 | Built 2026-10-11 | Angular 20.0.5
    - button "Open chat" [ref=f5e111] [cursor=pointer]
    - button "Show live shop activity" [ref=f5e115] [cursor=pointer]
  - alert "Product added to shopping cart." [ref=f5e121]
```

# Test source

```ts
  1  | const { test } = require('@playwright/test');
  2  | const { RegisterPage } = require('../../pages/RegisterPage');
  3  | const { LoginPage } = require('../../pages/LoginPage');
  4  | const { AccountPage } = require('../../pages/AccountPage');
  5  | const { HomePage } = require('../../pages/HomePage');
  6  | const { ProductPage } = require('../../pages/ProductPage');
  7  | const { CheckoutPage } = require('../../pages/CheckoutPage');
  8  | const { InvoicesPage } = require('../../pages/InvoicesPage');
  9  | const { NavBar } = require('../../pages/NavBar');
  10 | const { uniqueEmail } = require('../../utils/helpers');
  11 | const data = require('../../data/checkout.json');
  12 | 
  13 | test.describe('Checkout', () => {
  14 |   let user;
  15 |   let address;   // street + city the site filled in during registration
  16 | 
  17 |   test.beforeEach(async ({ page }) => {
  18 |     // register a fresh user (independent test, no shared account)
  19 |     user = { ...data.user, email: uniqueEmail() };
  20 |     const registerPage = new RegisterPage(page);
  21 |     await registerPage.open();
  22 |     address = await registerPage.register(user);
  23 |     await registerPage.expectRedirectedToLogin();
  24 | 
  25 |     // log in with the same user
  26 |     await new LoginPage(page).login(user.email, user.password);
  27 |     await new AccountPage(page).expectLoaded();
  28 | 
  29 |     // add the product to the cart
  30 |     const home = new HomePage(page);
  31 |     await home.open();
  32 |     await home.search(data.searchTerm);
  33 |     await home.expectSingleResultNamed(data.productName);
  34 |     await home.openSingleResult();
  35 |     const product = new ProductPage(page);
  36 |     await product.addToCart();
  37 |     await product.expectAddedToast();
  38 |   });
  39 | 
  40 |   test('TC-06 complete checkout, asserting every step', async ({ page }) => {
  41 |     const nav = new NavBar(page);
  42 |     const checkout = new CheckoutPage(page);
  43 | 
  44 |     await nav.openCart();
  45 |     await checkout.expectSingleLine({ name: data.productName, quantity: data.quantity });  // 1
  46 |     await checkout.proceedFromCart();
  47 | 
  48 |     await checkout.expectSignInSkipped();                                                  // 2
  49 |     await checkout.proceedFromSignIn();
  50 | 
  51 |     await checkout.expectBillingPrefilled(address);                                        // 3 (before typing)
  52 |     await checkout.fillBillingAddress(user);
  53 |     await checkout.proceedFromBilling();
  54 | 
  55 |     await checkout.pay(data.card);
  56 |     await checkout.expectPaymentSuccessful();                                              // 4
  57 |     await checkout.confirmOrder();
  58 | 
  59 |     const invoice = await checkout.expectOrderConfirmedWithInvoice();                      // 5
  60 | 
> 61 |     await nav.openMyInvoices();
     |               ^ TypeError: nav.openMyInvoices is not a function
  62 |     await new InvoicesPage(page).expectInvoiceListed(invoice);                             // 6
  63 |   });
  64 | });
```