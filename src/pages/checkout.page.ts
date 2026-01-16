import { expect, Locator, Page } from "@playwright/test";
import { BillingDetail } from "../models/billing-details.model";

export class CheckoutPage {
    static CHECKOUTPAGE_URL = "/checkout";
    private page: Page;

    readonly _firstnameInput: Locator;
    readonly _lastnameInput: Locator;
    readonly _countryInput: Locator;
    readonly _addressInput: Locator;
    readonly _cityInput: Locator;
    readonly _stateInput: Locator;
    readonly _zipCodeInput: Locator;
    readonly _phoneInput: Locator;
    readonly _emailInput: Locator;
    readonly _placeOrderButton: Locator;
    readonly _errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this._firstnameInput = page.locator("//input[@id = 'billing_first_name']");
        this._lastnameInput = page.locator("//input[@id = 'billing_last_name']");
        this._countryInput = page.locator("//span[@arial-label = 'Country / Region']");
        this._addressInput = page.locator("//input[@id = 'billing_address_1']");
        this._cityInput = page.locator("//input[@id = 'billing_city']");
        this._stateInput = page.locator("//span[@arial-label = 'State']");
        this._zipCodeInput = page.locator("//input[@id = 'billing_postcode']");
        this._phoneInput = page.locator("//input[@id = 'billing_phone']");
        this._emailInput = page.locator("//input[@id = 'billing_email']");
        this._placeOrderButton = page.getByRole('button', { name: 'Place order' });
        this._errorMessage = page.locator("//ul[@role = 'alert']");
    }

    async goto() {
        await this.page.goto(CheckoutPage.CHECKOUTPAGE_URL);
    }

    async fillBillingDetail(billingDetail: BillingDetail) {
        // await Promise.all([
            await this._firstnameInput.fill(billingDetail.firstname),
            await this._lastnameInput.fill(billingDetail.lastname),
            // await this._countryInput.selectOption(billingDetail.country),
            await this._addressInput.fill(billingDetail.address),
            await this._cityInput.fill(billingDetail.city),
            // await this._stateInput.selectOption(billingDetail.state),
            await this._zipCodeInput.fill(billingDetail.zipCode),
            await this._phoneInput.fill(billingDetail.phone),
            await this._emailInput.fill(billingDetail.email)
        // ]);
    }

    async clickOrderButton() {
        await this._placeOrderButton.click();
    }

    async checkHighlightMissingField() {
        await expect.soft(this._firstnameInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this._lastnameInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        // await expect.soft(this._countryInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this._addressInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this._cityInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        // await expect.soft(this._stateInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this._zipCodeInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this._phoneInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this._emailInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");

    }
}