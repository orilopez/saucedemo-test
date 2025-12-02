import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Saucedemo Checkout Page
 * Encapsulates all elements and interactions for checkout information and completion
 */
export class CheckoutPage {
	readonly page: Page;

	// Checkout Information Step
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly postalCodeInput: Locator;
	readonly continueButton: Locator;
	readonly cancelButton: Locator;

	// Checkout Overview Step
	readonly paymentInformation: Locator;
	readonly shippingInformation: Locator;
	readonly totalPrice: Locator;
	readonly finishButton: Locator;

	// Checkout Complete Step
	readonly completeHeader: Locator;
	readonly completeMessage: Locator;
	readonly backHomeButton: Locator;

	constructor(page: Page) {
		this.page = page;

		// Checkout Information Step
		this.firstNameInput = page.locator("[data-test='firstName']");
		this.lastNameInput = page.locator("[data-test='lastName']");
		this.postalCodeInput = page.locator("[data-test='postalCode']");
		this.continueButton = page.locator("[data-test='continue']");
		this.cancelButton = page.locator("[data-test='cancel']");

		// Checkout Overview Step
		this.paymentInformation = page.locator(".summary_info_label", {
			hasText: "Payment Information",
		}).locator("..");
		this.shippingInformation = page.locator(".summary_info_label", {
			hasText: "Shipping Information",
		}).locator("..");
		this.totalPrice = page.locator(".summary_total_label");
		this.finishButton = page.locator("[data-test='finish']");

		// Checkout Complete Step
		this.completeHeader = page.locator(".complete-header");
		this.completeMessage = page.locator(".complete-text");
		this.backHomeButton = page.locator("[data-test='back-to-products']");
	}

	/**
	 * Fill checkout information form
	 * @param firstName - First name
	 * @param lastName - Last name
	 * @param postalCode - Postal/ZIP code
	 */
	async fillCheckoutInformation(
		firstName: string,
		lastName: string,
		postalCode: string,
	): Promise<void> {
		await this.firstNameInput.fill(firstName);
		await this.lastNameInput.fill(lastName);
		await this.postalCodeInput.fill(postalCode);
	}

	/**
	 * Continue to checkout overview
	 */
	async continueToOverview(): Promise<void> {
		await this.continueButton.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Complete the purchase
	 */
	async finishPurchase(): Promise<void> {
		await this.finishButton.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Verify checkout completion
	 * @returns True if checkout is complete
	 */
	async isCheckoutComplete(): Promise<boolean> {
		await this.page.waitForURL("**/checkout-complete.html", { timeout: 10_000 });
		return await this.completeHeader.isVisible();
	}

	/**
	 * Get the completion message text
	 * @returns The completion message
	 */
	async getCompletionMessage(): Promise<string | null> {
		return await this.completeMessage.textContent();
	}
}

