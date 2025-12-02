import { test, expect } from "../fixtures/fixturesSaucedemo.js";

test.describe("User Purchase", () => {
	test("Scenario 2: Open Saucedemo and purchase various items", async ({
		landingPage,
		loginPage,
		inventoryPage,
		cartPage,
		checkoutPage,
	}) => {
		// Step 1: Open Saucedemo
		await landingPage.goto();
		await expect(landingPage.page).toHaveURL(/saucedemo\.com/i);

		// Step 2: Navigate the products view (login first)
		await loginPage.loginValidUser();
		await expect(loginPage.page).toHaveURL(/.*inventory\.html/);

		// Step 3: Add different items from the products list
		const listProductsToAdd = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
		await inventoryPage.addProductsToCart(listProductsToAdd);

		// Step 3b: Add an item from the item view (details page)
		const detailsProduct = "Sauce Labs Bolt T-Shirt";
		await inventoryPage.addProductToCartFromDetails(detailsProduct);

		// Verify items were added to cart
		const cartBadgeCount = await inventoryPage.getCartBadgeCount();
		expect(cartBadgeCount).toBe(listProductsToAdd.length + 1);

		// Step 4: Check the cart
		await inventoryPage.navigateToCart();
		await expect(cartPage.page).toHaveURL(/.*cart\.html/);

		const cartItemCount = await cartPage.getCartItemCount();
		expect(cartItemCount).toBe(listProductsToAdd.length + 1);

		const cartItemNames = await cartPage.getCartItemNames();
		for (const productName of [...listProductsToAdd, detailsProduct]) {
			expect(cartItemNames).toContain(productName);
		}

		// Step 5: Complete the checkout information
		await cartPage.proceedToCheckout();
		await expect(checkoutPage.page).toHaveURL(/.*checkout-step-one\.html/);

		await checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
		await checkoutPage.continueToOverview();
		await expect(checkoutPage.page).toHaveURL(/.*checkout-step-two\.html/);

		// Step 6: Finish the purchase
		await checkoutPage.finishPurchase();
		const isComplete = await checkoutPage.isCheckoutComplete();
		expect(isComplete).toBe(true);

		const completionMessage = await checkoutPage.getCompletionMessage();
		expect(completionMessage).toContain(
			"Your order has been dispatched, and will arrive just as fast as the pony can get there",
		);
	});

	test("Scenario 4: Open Saucedemo and filter items by price", async ({
		landingPage,
		loginPage,
		inventoryPage,
	}) => {
		// Step 1: Open Saucedemo
		await landingPage.goto();
		await expect(landingPage.page).toHaveURL(/saucedemo\.com/i);

		// Step 2: Once on the Inventory page
		await loginPage.loginValidUser();
		await expect(loginPage.page).toHaveURL(/.*inventory\.html/);

		// Step 3: Filter the items by price (low to high)
		await inventoryPage.sortByPriceLowToHigh();

		// Verify items are sorted by price ascending
		const prices = await inventoryPage.getProductPrices();
		const sortedPrices = [...prices].sort((a, b) => a - b);
		expect(prices).toEqual(sortedPrices);
	});
});
