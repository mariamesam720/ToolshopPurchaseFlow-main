# ToolshopPurchaseFlow

## Get the project

**Option 1: clone with Git**
```bash
git clone https://github.com/mariamesam720/ToolshopPurchaseFlow-main
cd ToolshopPurchaseFlow
```
`

**Option 2: download as a ZIP (no Git needed)**
1. Open the repository page on GitHub.
2. Click the green **Code** button.
3. Click **Download ZIP**.
4. Unzip the file, then open a terminal inside the unzipped folder (the one that contains `package.json`).

## Run
| Command | What it does |
|---|---|
| `npm test` | All tests (headless) |
| `npm run test:headed` | All tests in a visible browser |
| `npm run test:e2e` | TC-07 only |
| `npx playwright test -g "TC-05"` | One test by ID |
| `npx playwright test --workers=4` | Parallel run |
| `npx playwright show-report` | Playwright HTML report |
| `npm run test:allure` | Run + auto-open Allure report (bonus) |
| `npm run report` | Open the last Allure report |

## Structure
- `pages/` – page objects (locators, actions, `expect...` checks)
- `tests/UI/` – TC-01 … TC-06, one spec per feature
- `tests/E2E/` – TC-07 purchase journey
- `data/` – one JSON per spec
- `utils/` – pure helpers (unique email, price parsing)
