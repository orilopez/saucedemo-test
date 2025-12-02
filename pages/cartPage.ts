import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Saucedemo Cart Page
 * Encapsulates all elements and interactions for the cart view
 */
export class CartPage {
	readonly page: Page;

	// Cart Items
	readonly cartItems: Locator;
	readonly cartItemNames: Locator;
	readonly continueShoppingButton: Locator;
	readonly checkoutButton: Locator;

	constructor(page: Page) {
		this.page = page;

		// Cart Items
		this.cartItems = page.locator(".cart_item");
		this.cartItemNames = page.locator(".inventory_item_name");
		this.continueShoppingButton = page.locator("[data-test='continue-shopping']");
		this.checkoutButton = page.locator("[data-test='checkout']");
	}

	/**
	 * Get the number of items in the cart
	 * @returns The number of cart items
	 */
	async getCartItemCount(): Promise<number> {
		return await this.cartItems.count();
	}

	/**
	 * Get all product names in the cart
	 * @returns Array of product names
	 */
	async getCartItemNames(): Promise<string[]> {
		const names: string[] = [];
		const count = await this.cartItemNames.count();
		for (let i = 0; i < count; i++) {
			const name = await this.cartItemNames.nth(i).textContent();
			if (name) {
				names.push(name.trim());
			}
		}
		return names;
	}

	/**
	 * Navigate to checkout page
	 */
	async proceedToCheckout(): Promise<void> {
		await this.checkoutButton.click();
		await this.page.waitForLoadState("networkidle");
	}
}

