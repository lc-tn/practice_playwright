import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    private page: Page;

    //Notification locator
    readonly notiPopup: Locator;
    readonly notiCloseButton: Locator;

    //Cookie locator
    readonly cookieNotice: Locator;
    readonly cookieOkButton: Locator;

    //Header section locator
    readonly phoneNumberSpan: Locator;
    readonly addressSpan: Locator;
    readonly loginSignupLink: Locator;
    readonly socialMediaLinks: Locator;
    readonly mainNavigationLinks: Locator;

    //Search locator
    readonly searchTextbox: Locator;
    readonly categoryDropdown: Locator;
    readonly searchButton: Locator;

    //Department locator
    readonly mainCategoryDropdown: Locator;
    readonly mainCategoryLinks: Locator;

    readonly _cartQuantityLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        //Notification locator
        this.notiPopup = page.locator('//div[@id = "sales-booster-popup"]');
        this, this.notiCloseButton = page.locator('//span[@class = "close pos-absolute right top"]');

        //Cookie locator
        this.cookieOkButton = page.locator('//a[@id = "cn-accept-cookie"]');
        this.cookieNotice = page.getByRole('dialog', { name: 'Cookie Notice' });

        //Header section locator
        this.phoneNumberSpan = page.getByText('Order online or call us');
        this.addressSpan = page.locator('//i[contains(@class, "et-internet")]/following-sibling::span');
        this.loginSignupLink = page.getByRole('link', { name: 'Log in / Sign up' });
        this.mainNavigationLinks = page.locator('//ul[contains(@id, "menu-main-menu-1")]//a');
        this.socialMediaLinks = page.locator('//div[@class = "header-wrapper"]//div[contains(@class, "et-socials")]/a');

        //Search locator
        this.searchTextbox = page.getByRole("textbox", { name: "Search input" });
        this.categoryDropdown = page.locator('//select[@name = "product_cat"]');
        this.searchButton = page.locator('//select[@name = "product_cat"]/ancestor::form//button[@type = "submit"]');

        //Department locator
        this.mainCategoryDropdown = page.getByText('All departments');
        this.mainCategoryLinks = page.locator('//ul[contains(@id, "menu-all-departments-1")]//a');

        this._cartQuantityLocator = page.locator("//div[@class = 'header-wrapper']//a//span[contains(@class, 'et-cart-quantity')]");
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState();
    }

    async closeNotificationPopup() {
        if (await this.notiPopup.isVisible()) {
            await this.notiCloseButton.click();
        }
    }

    async clickAcceptCookie() {
        if (await this.cookieNotice.isVisible()) {
            await this.cookieOkButton.click();
        }
    }

    async clickMainCategoryLink(mainCategoryName: string) {
        await this.mainCategoryDropdown.hover();
        await this.mainCategoryLinks
            .filter({ hasText: mainCategoryName })
            .click();
        await this.page.waitForLoadState();
    }
}