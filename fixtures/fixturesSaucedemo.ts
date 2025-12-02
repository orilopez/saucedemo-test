import { test as base } from "@playwright/test";
import { LandingPage } from "../pages/landingPage.js";
import { LoginPage } from "../pages/loginPage.js";
import { InventoryPage } from "../pages/inventoryPage.js";
import { CartPage } from "../pages/cartPage.js";
import { CheckoutPage } from "../pages/checkoutPage.js";

/**
 * Custom fixtures extending Playwright's base test
 * Provides page objects for all tests
 */
type PageObjectsFixture = {
	landingPage: LandingPage;
	loginPage: LoginPage;
	inventoryPage: InventoryPage;
	cartPage: CartPage;
	checkoutPage: CheckoutPage;
};

export const test = base.extend<PageObjectsFixture>({
	landingPage: async ({ page }, use) => {
		const landingPage = new LandingPage(page);
		await use(landingPage);
	},

	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},

	inventoryPage: async ({ page }, use) => {
		const inventoryPage = new InventoryPage(page);
		await use(inventoryPage);
	},

	cartPage: async ({ page }, use) => {
		const cartPage = new CartPage(page);
		await use(cartPage);
	},

	checkoutPage: async ({ page }, use) => {
		const checkoutPage = new CheckoutPage(page);
		await use(checkoutPage);
	},
});

export { expect } from "@playwright/test";

