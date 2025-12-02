import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Saucedemo Login Page
 * Encapsulates all elements and interactions for the login workflow.
 */
export class LoginPage {
	readonly page: Page;

	// Login Section
	readonly loginUsernameInput: Locator;
	readonly loginPasswordInput: Locator;
	readonly loginButton: Locator;
	readonly inventoryContainer: Locator;

	private readonly defaultUsername: string;
	private readonly defaultPassword: string;

	constructor(page: Page) {
		this.page = page;

		// Login Section
		this.loginUsernameInput = page.locator("[data-test='username']");
		this.loginPasswordInput = page.locator("[data-test='password']");
		this.loginButton = page.locator("[data-test='login-button']");
		this.inventoryContainer = page.locator(".inventory_list, [data-test='inventory-container']").first();

		this.defaultUsername = process.env["SAUCE_USERNAME"] ?? "standard_user";
		this.defaultPassword = process.env["SAUCE_PASSWORD"] ?? "secret_sauce";
	}

	/**
	 * Login with the provided credentials.
	 * @param username - The username to login with
	 * @param password - The password to login with
	 */
	async login(username: string, password: string): Promise<void> {
		await this.loginUsernameInput.fill(username);
		await this.loginPasswordInput.fill(password);
		await this.loginButton.click();
		await this.page.waitForURL("**/inventory.html", { timeout: 10_000 });
	}

	/**
	 * Login using the default Saucedemo test user.
	 * Credentials can be overridden through environment variables.
	 */
	async loginValidUser(): Promise<void> {
		await this.login(this.defaultUsername, this.defaultPassword);
	}

	/**
	 * Get the inventory container locator after login.
	 */
	getSuccessMessageLocator(): Locator {
		return this.inventoryContainer;
	}
}