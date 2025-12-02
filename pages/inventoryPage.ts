import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Saucedemo Inventory/Products Page
 * Encapsulates all elements and interactions for the products view
 */
export class InventoryPage {
	readonly page: Page;

	// Navigation
	readonly cartLink: Locator;
	readonly menuButton: Locator;
	readonly logoutLink: Locator;

	// Product Items
	readonly productItems: Locator;
	readonly productNames: Locator;
	readonly productPrices: Locator;

	// Sorting
	readonly sortDropdown: Locator;

	constructor(page: Page) {
		this.page = page;

		// Navigation
		this.cartLink = page.locator("[data-test='shopping-cart-link']");
		this.menuButton = page.locator("#react-burger-menu-btn");
		this.logoutLink = page.locator("#logout_sidebar_link, [data-test='logout-sidebar-link']");

		// Product Items
		this.productItems = page.locator(".inventory_item");
		this.productNames = page.locator(".inventory_item_name");
		this.productPrices = page.locator(".inventory_item_price");

		// Sorting
		this.sortDropdown = page.locator("[data-test='product-sort-container']");
	}

	/**
	 * Add a product to cart by product name
	 * @param productName - The name of the product to add
	 */
	async addProductToCart(productName: string): Promise<void> {
		const productItem = this.productItems.filter({
			has: this.page.locator(".inventory_item_name", { hasText: productName }),
		});
		const addToCartButton = productItem.locator("[data-test^='add-to-cart']");
		await addToCartButton.click();
	}

	/**
	 * Add multiple products to cart
	 * @param productNames - Array of product names to add
	 */
	async addProductsToCart(productNames: string[]): Promise<void> {
		for (const productName of productNames) {
			await this.addProductToCart(productName);
		}
	}

	/**
	 * Navigate to the cart page
	 */
	async navigateToCart(): Promise<void> {
		await this.cartLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Get the number of items in the cart badge
	 * @returns The cart badge count as a number, or 0 if badge doesn't exist
	 */
	async getCartBadgeCount(): Promise<number> {
		const cartBadge = this.page.locator("[data-test='shopping-cart-badge']");
		if (await cartBadge.isVisible().catch(() => false)) {
			const text = await cartBadge.textContent();
			return text ? parseInt(text, 10) : 0;
		}
		return 0;
	}

	/**
	 * Select a sort option by its value in the sort dropdown.
	 * @param value - value attribute of the option (e.g. 'lohi' for Price low to high)
	 */
	async sortByValue(value: string): Promise<void> {
		await this.sortDropdown.selectOption(value);
	}

	/**
	 * Convenience method to sort items by price low to high.
	 */
	async sortByPriceLowToHigh(): Promise<void> {
		await this.sortByValue("lohi");
	}

	/**
	 * Get all product prices currently visible as numbers.
	 */
	async getProductPrices(): Promise<number[]> {
		const prices: number[] = [];
		const count = await this.productPrices.count();
		for (let i = 0; i < count; i++) {
			const text = await this.productPrices.nth(i).textContent();
			if (!text) continue;
			const numeric = parseFloat(text.replace("$", "").trim());
			if (!Number.isNaN(numeric)) {
				prices.push(numeric);
			}
		}
		return prices;
	}

	/**
	 * Add a product to cart from its details view.
	 * Opens the item view, adds to cart, then navigates back to products.
	 * @param productName - The name of the product to add from details view
	 */
	async addProductToCartFromDetails(productName: string): Promise<void> {
		const productLink = this.productNames.filter({
			hasText: productName,
		});
		await productLink.first().click();

		const addToCartButton = this.page.locator("[data-test^='add-to-cart']").first();
		await addToCartButton.click();

		const backToProductsButton = this.page.locator("[data-test='back-to-products']");
		await backToProductsButton.click();
	}

	/**
	 * Open the side menu and log out.
	 */
	async logout(): Promise<void> {
		await this.menuButton.click();
		await this.logoutLink.click();
		await this.page.waitForURL("**/", { timeout: 10_000 });
	}
}

