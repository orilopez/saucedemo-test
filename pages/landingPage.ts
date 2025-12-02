import { Page } from "@playwright/test";

/**
 * Minimal landing page object for Saucedemo.
 * Keeps navigation logic separate so tests remain intent-driven.
 */
export class LandingPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Navigate to the Saucedemo landing page.
	 */
	async goto(): Promise<void> {
		await this.page.goto("/");
		await this.page.waitForLoadState("networkidle");
	}
}

