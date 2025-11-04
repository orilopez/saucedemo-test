import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for ParaBank Register Page
 * Encapsulates all elements and interactions for the registration page
 */
export class RegisterPage {
	readonly page: Page;

	// Login Section (still present on register page)
	readonly loginUsernameInput: Locator;
	readonly loginPasswordInput: Locator;
	readonly loginButton: Locator;
	readonly forgotLoginInfoLink: Locator;
	readonly registerLink: Locator;

	// Customer Registration Form Fields
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly addressStreetInput: Locator;
	readonly addressCityInput: Locator;
	readonly addressStateInput: Locator;
	readonly addressZipCodeInput: Locator;
	readonly phoneNumberInput: Locator;
	readonly ssnInput: Locator;
	readonly customerUsernameInput: Locator;
	readonly customerPasswordInput: Locator;
	readonly repeatedPasswordInput: Locator;
	readonly registerButton: Locator;

	// Navigation Links (same as landing page)
	readonly homeLink: Locator;
	readonly aboutUsLink: Locator;
	readonly servicesLink: Locator;
	readonly productsLink: Locator;
	readonly locationsLink: Locator;
	readonly adminPageLink: Locator;
	readonly contactLink: Locator;

	constructor(page: Page) {
		this.page = page;

		// Login Section
		this.loginUsernameInput = page.locator("input[name='username']").first();
		this.loginPasswordInput = page.locator("input[name='password']").first();
		this.loginButton = page.locator("input[type='submit']").first();
		this.forgotLoginInfoLink = page.getByRole("link", { name: /forgot login info/i });
		this.registerLink = page.getByRole("link", { name: /^register$/i });

		// Customer Registration Form Fields
		this.firstNameInput = page.locator("input[name='customer.firstName']");
		this.lastNameInput = page.locator("input[name='customer.lastName']");
		this.addressStreetInput = page.locator("input[name='customer.address.street']");
		this.addressCityInput = page.locator("input[name='customer.address.city']");
		this.addressStateInput = page.locator("input[name='customer.address.state']");
		this.addressZipCodeInput = page.locator("input[name='customer.address.zipCode']");
		this.phoneNumberInput = page.locator("input[name='customer.phoneNumber']");
		this.ssnInput = page.locator("input[name='customer.ssn']");
		this.customerUsernameInput = page.locator("input[name='customer.username']");
		this.customerPasswordInput = page.locator("input[name='customer.password']");
		this.repeatedPasswordInput = page.locator("input[name='repeatedPassword']");
		this.registerButton = page.locator("input[type='submit']").last();

		// Navigation Links
		this.homeLink = page.getByRole("link", { name: /^home$/i });
		this.aboutUsLink = page.getByRole("link", { name: /^about us$/i });
		this.servicesLink = page.getByRole("link", { name: /^services$/i });
		this.productsLink = page.getByRole("link", { name: /^products$/i });
		this.locationsLink = page.getByRole("link", { name: /^locations$/i });
		this.adminPageLink = page.getByRole("link", { name: /^admin page$/i });
		this.contactLink = page.getByRole("link", { name: /^contact$/i });
	}

	/**
	 * Navigate to the register page
	 */
	async goto(): Promise<void> {
		await this.page.goto("/parabank/register.htm");
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Fill in the customer registration form
	 * @param customerData - Object containing customer registration data
	 */
	async fillRegistrationForm(customerData: {
		firstName: string;
		lastName: string;
		addressStreet: string;
		addressCity: string;
		addressState: string;
		addressZipCode: string;
		phoneNumber: string;
		ssn: string;
		username: string;
		password: string;
		repeatedPassword: string;
	}): Promise<void> {
		await this.firstNameInput.fill(customerData.firstName);
		await this.lastNameInput.fill(customerData.lastName);
		await this.addressStreetInput.fill(customerData.addressStreet);
		await this.addressCityInput.fill(customerData.addressCity);
		await this.addressStateInput.fill(customerData.addressState);
		await this.addressZipCodeInput.fill(customerData.addressZipCode);
		await this.phoneNumberInput.fill(customerData.phoneNumber);
		await this.ssnInput.fill(customerData.ssn);
		await this.customerUsernameInput.fill(customerData.username);
		await this.customerPasswordInput.fill(customerData.password);
		await this.repeatedPasswordInput.fill(customerData.repeatedPassword);
	}

	/**
	 * Submit the registration form
	 */
	async submitRegistration(): Promise<void> {
		await this.registerButton.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Register a new customer with all required information
	 * @param customerData - Object containing customer registration data
	 */
	async registerCustomer(customerData: {
		firstName: string;
		lastName: string;
		addressStreet: string;
		addressCity: string;
		addressState: string;
		addressZipCode: string;
		phoneNumber: string;
		ssn: string;
		username: string;
		password: string;
		repeatedPassword: string;
	}): Promise<void> {
		await this.fillRegistrationForm(customerData);
		await this.submitRegistration();
	}

	/**
	 * Login from the register page (if user already has an account)
	 * @param username - The username to login with
	 * @param password - The password to login with
	 */
	async login(username: string, password: string): Promise<void> {
		await this.loginUsernameInput.fill(username);
		await this.loginPasswordInput.fill(password);
		await this.loginButton.click();
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
	 * Navigate back to home/landing page
	 */
	async navigateToHome(): Promise<void> {
		await this.homeLink.click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Generate a random username
	 * @param maxLength - Maximum length of the username (default: 20)
	 * @returns A random username string
	 */
	generateRandomUsername(maxLength: number = 20): string {
		const prefix = "user";
		const randomSuffix = Math.random().toString(36).substring(2);
		const maxSuffixLength = maxLength - prefix.length;
		const suffix = randomSuffix.substring(
			0,
			Math.min(maxSuffixLength, randomSuffix.length),
		);
		return `${prefix}${suffix}`;
	}

	/**
	 * Generate random test data for user registration
	 * @returns Object containing random customer registration data
	 */
	generateRandomUserData(): {
		firstName: string;
		lastName: string;
		addressStreet: string;
		addressCity: string;
		addressState: string;
		addressZipCode: string;
		phoneNumber: string;
		ssn: string;
		username: string;
		password: string;
		repeatedPassword: string;
	} {
		const randomNum = Math.floor(Math.random() * 10000);

		return {
			firstName: `Test${randomNum}`,
			lastName: `User${randomNum}`,
			addressStreet: `${randomNum} Test Street`,
			addressCity: "Test City",
			addressState: "CA",
			addressZipCode: `123${randomNum.toString().slice(-2)}`,
			phoneNumber: `555${randomNum.toString().slice(-7)}`,
			ssn: `${randomNum.toString().slice(-9).padStart(9, "0")}`,
			username: this.generateRandomUsername(20),
			password: "Test123!@#",
			repeatedPassword: "Test123!@#",
		};
	}

	/**
	 * Register a new customer with randomly generated data
	 * This method generates random user data and registers the customer
	 * @returns The generated user data used for registration
	 */
	async registerRandomCustomer(): Promise<{
		firstName: string;
		lastName: string;
		addressStreet: string;
		addressCity: string;
		addressState: string;
		addressZipCode: string;
		phoneNumber: string;
		ssn: string;
		username: string;
		password: string;
		repeatedPassword: string;
	}> {
		const userData = this.generateRandomUserData();
		await this.registerCustomer(userData);
		return userData;
	}

	/**
	 * Get the success message locator after registration
	 * @returns Locator for the success message
	 */
	getSuccessMessageLocator() {
		return this.page.getByText(
			"Your account was created successfully. You are now logged in.",
		);
	}
}

