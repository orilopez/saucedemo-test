import { test as base } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { RegisterPage } from "../pages/registerPage";

/**
 * Custom fixtures extending Playwright's base test
 * Provides page objects for all tests
 */
type PageObjectsFixture = {
	landingPage: LandingPage;
	registerPage: RegisterPage;
};

export const test = base.extend<PageObjectsFixture>({
	landingPage: async ({ page }, use) => {
		const landingPage = new LandingPage(page);
		await use(landingPage);
	},

	registerPage: async ({ page }, use) => {
		const registerPage = new RegisterPage(page);
		await use(registerPage);
	},
});

export { expect } from "@playwright/test";

