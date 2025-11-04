import { test, expect } from "../fixtures/fixturesParabank";

test.describe("User Registration", () => {
	test("Scenario 1: Open ParaBank and register a new user", async ({
		landingPage,
		registerPage,
	}) => {
		// Step 1: Open ParaBank
		await landingPage.goto();
		await expect(landingPage.page).toHaveURL(/parabank\/index\.htm/);

		// Step 2: Click Register link
		await landingPage.navigateToRegister();
		await expect(registerPage.page).toHaveURL(/parabank\/register\.htm/);

		// Step 3: Complete register form and create user with random data
		await registerPage.registerRandomCustomer();

		// Step 4: Verify user creation success message
		const successMessage = registerPage.getSuccessMessageLocator();
		await expect(successMessage.first()).toBeVisible({ timeout: 10000 });
	});
});

