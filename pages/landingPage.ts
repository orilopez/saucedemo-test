import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for ParaBank Landing Page
 * Encapsulates all elements and interactions for the landing/index page
 */
export class LandingPage {
	readonly page: Page;

	// Navigation Links
	readonly homeLink: Locator;
	readonly aboutUsLink: Locator;
	readonly servicesLink: Locator;
	readonly productsLink: Locator;
	readonly locationsLink: Locator;
	readonly adminPageLink: Locator;
	readonly contactLink: Locator;
	readonly forumLink: Locator;
	readonly siteMapLink: Locator;

	// Customer Login Section
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly forgotLoginInfoLink: Locator;
	readonly registerLink: Locator;

	// Services Section Links
	readonly withdrawFundsLink: Locator;
	readonly transferFundsLink: Locator;
	readonly checkBalancesLink: Locator;
	readonly makeDepositsLink: Locator;
	readonly billPayLink: Locator;
	readonly accountHistoryLink: Locator;

	// News Section
	readonly newsReadMoreLink: Locator;
	readonly parabankReopenedLink: Locator;
	readonly onlineBillPayLink: Locator;
	readonly onlineAccountTransfersLink: Locator;

	// Footer Links
	readonly footerHomeLink: Locator;
	readonly footerAboutUsLink: Locator;
	readonly footerServicesLink: Locator;
	readonly footerProductsLink: Locator;
	readonly footerLocationsLink: Locator;
	readonly footerForumLink: Locator;
	readonly footerSiteMapLink: Locator;
	readonly footerContactUsLink: Locator;
	readonly parasoftWebsiteLink: Locator;

	// Services Read More
	readonly servicesReadMoreLink: Locator;

	constructor(page: Page) {
		this.page = page;

		// Navigation Links
		this.homeLink = page.getByRole("link", { name: /^home$/i });
		this.aboutUsLink = page.getByRole("link", { name: /^about us$/i });
		this.servicesLink = page.getByRole("link", { name: /^services$/i });
		this.productsLink = page.getByRole("link", { name: /^products$/i });
		this.locationsLink = page.getByRole("link", { name: /^locations$/i });
		this.adminPageLink = page.getByRole("link", { name: /^admin page$/i });
		this.contactLink = page.getByRole("link", { name: /^contact$/i });
		this.forumLink = page.getByRole("link", { name: /^forum$/i });
		this.siteMapLink = page.getByRole("link", { name: /^site map$/i });

		// Customer Login Section
		this.usernameInput = page.getByRole("textbox", { name: /username/i }).or(page.locator("input[name='username']"));
		this.passwordInput = page.getByRole("textbox", { name: /password/i }).or(page.locator("input[name='password']"));
		this.loginButton = page.getByRole("button", { name: /log in/i }).or(page.locator("input[type='submit']"));
		this.forgotLoginInfoLink = page.getByRole("link", { name: /forgot login info/i });
		this.registerLink = page.getByRole("link", { name: /^register$/i });

		// Services Section Links
		this.withdrawFundsLink = page.getByRole("link", { name: /withdraw funds/i });
		this.transferFundsLink = page.getByRole("link", { name: /transfer funds/i }).first();
		this.checkBalancesLink = page.getByRole("link", { name: /check balances/i });
		this.makeDepositsLink = page.getByRole("link", { name: /make deposits/i });
		this.billPayLink = page.getByRole("link", { name: /bill pay/i });
		this.accountHistoryLink = page.getByRole("link", { name: /account history/i });

		// News Section
		this.newsReadMoreLink = page.getByRole("link", { name: /read more/i }).last();
		this.parabankReopenedLink = page.getByRole("link", { name: /parabank is now re-opened/i });
		this.onlineBillPayLink = page.getByRole("link", { name: /new! online bill pay/i });
		this.onlineAccountTransfersLink = page.getByRole("link", { name: /new! online account transfers/i });

		// Footer Links
		this.footerHomeLink = page.getByRole("link", { name: /^home$/i });
		this.footerAboutUsLink = page.getByRole("link", { name: /^about us$/i });
		this.footerServicesLink = page.getByRole("link", { name: /^services$/i });
		this.footerProductsLink = page.getByRole("link", { name: /^products$/i });
		this.footerLocationsLink = page.getByRole("link", { name: /^locations$/i });
		this.footerForumLink = page.getByRole("link", { name: /^forum$/i });
		this.footerSiteMapLink = page.getByRole("link", { name: /^site map$/i });
		this.footerContactUsLink = page.getByRole("link", { name: /^contact us$/i });
		this.parasoftWebsiteLink = page.getByRole("link", { name: /www\.parasoft\.com/i });

		// Services Read More
		this.servicesReadMoreLink = page.getByRole("link", { name: /read more/i }).first();
	}

	/**
	 * Navigate to the landing page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/parabank/index.htm");
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Login with username and password
	 * @param username - The username to login with
	 * @param password - The password to login with
	 */
	async login(username: string, password: string): Promise<void> {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}

	/**
	 * Navigate to the register page
	 */
	async navigateToRegister(): Promise<void> {
		await this.registerLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigate to the forgot login info page
	 */
	async navigateToForgotLoginInfo(): Promise<void> {
		await this.forgotLoginInfoLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigate to About Us page
	 */
	async navigateToAboutUs(): Promise<void> {
		await this.aboutUsLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigate to Services page
	 */
	async navigateToServices(): Promise<void> {
		await this.servicesLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigate to Admin Page
	 */
	async navigateToAdminPage(): Promise<void> {
		await this.adminPageLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigate to Contact page
	 */
	async navigateToContact(): Promise<void> {
		await this.contactLink.click();
		await this.page.waitForLoadState("networkidle");
	}
}

