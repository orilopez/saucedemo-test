import { test, expect } from "../fixtures/fixturesSaucedemo.js";

test.describe("User Logout", () => {
	test("Scenario 3: Open Saucedemo and log out", async ({
		landingPage,
		loginPage,
		inventoryPage,
	}) => {
		// Step 1: Open Saucedemo
		await landingPage.goto();
		await expect(landingPage.page).toHaveURL(/saucedemo\.com/i);

		// Step 2: Once on the Inventory page, login and open the sidepanel
		await loginPage.loginValidUser();
		await expect(loginPage.page).toHaveURL(/.*inventory\.html/);

		// Step 3: Tap on Logout
		await inventoryPage.logout();

		// Verify user is back on the login page
		await expect(landingPage.page).toHaveURL(/saucedemo\.com\/?$/i);
		await expect(loginPage.loginUsernameInput).toBeVisible();
	});
});