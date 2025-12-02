import { test, expect } from '../fixtures/fixturesSaucedemo.js';

test.describe("User Login", () => {
	test("Scenario 1: Open Saucedemo and login with a valid user", async ({
		landingPage,
		loginPage,
	}) => {
		// Step 1: Open Saucedemo
		await landingPage.goto();
		await expect(landingPage.page).toHaveURL(/saucedemo\.com/i);

		// Step 2: Complete login form and login with a valid user
		await loginPage.loginValidUser();

		// Step 3: Verify user login by checking URL redirects to inventory page
		await expect(loginPage.page).toHaveURL(/.*inventory\.html/);
	});
});