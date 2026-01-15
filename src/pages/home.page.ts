import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    private page: Page;

    //Notification locator
    private _notiPopupLocator: Locator;
    private _notiCloseButtonLocator: Locator;

    //Cookie locator
    private _cookieNotice: Locator;
    private _cookieOkButton: Locator;

    //Header section locator
    private _phoneNumberTextLocator: Locator;
    private _addrsesTextLocator: Locator;
    private _loginSignupLinkLocator: Locator;
    private _socialMediaLinkLocator: Locator;
    private _mainNavigationLinkLocator: Locator;

    //Search locator
    private _searchBarDropdown: Locator;
    private _categoryDropdown: Locator;
    private _searchButton: Locator;

    //Department locator
    private _categoryDropdownLocator: Locator;
    private _mainCategoryLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        //Notification locator
        this._notiPopupLocator = page.locator('//div[@id = "sales-booster-popup"]');
        this, this._notiCloseButtonLocator = page.locator('//span[@class = "close pos-absolute right top"]');

        //Cookie locator
        this._cookieOkButton = page.locator('//a[@id = "cn-accept-cookie"]');
        this._cookieNotice = page.getByRole('dialog', { name: 'Cookie Notice' });

        //Header section locator
        this._phoneNumberTextLocator = page.getByText('Order online or call us');
        this._addrsesTextLocator = page.locator('//i[contains(@class, "et-internet")]/following-sibling::span');
        this._loginSignupLinkLocator = page.getByRole('link', { name: 'Log in / Sign up' });
        this._mainNavigationLinkLocator = page.locator('//ul[contains(@id, "menu-main-menu-1")]//a');
        this._socialMediaLinkLocator = page.locator('//div[@class = "header-wrapper"]//div[contains(@class, "et-socials")]/a');

        //Search locator
        this._searchBarDropdown = page.getByRole("textbox", { name: "Search input" });
        this._categoryDropdown = page.locator('//select[@name = "product_cat"]');
        this._searchButton = page.locator('//select[@name = "product_cat"]/ancestor::form//button[@type = "submit"]');
        
        //Department locator
        this._categoryDropdownLocator = page.getByText('All departments');
        this._mainCategoryLocator = page.locator('//ul[contains(@id, "menu-all-departments-1")]//a');
    }

    public get categoryDropdownLocator(){
        return this._categoryDropdownLocator;
    }

    async goto() {
        await this.page.goto('/');
    }

    async closeNotificationPopup() {
        if (await this._notiPopupLocator.isVisible()) {
            await this._notiCloseButtonLocator.click();
        }
    }

    async acceptCookie() {
        if (await this._cookieNotice.isVisible()) {
            await this._cookieOkButton.click();
        }
    }

    async checkHeaderSection(phoneNumber: string, address: string){
        await expect.soft(this._phoneNumberTextLocator).toContainText(phoneNumber);
        await expect.soft(this._phoneNumberTextLocator).toBeVisible();
        await expect.soft(this._addrsesTextLocator).toContainText(address);
        await expect.soft(this._phoneNumberTextLocator).toBeVisible();
    }

    async checkTopNavigationElements(socialMedias: string[]){
        await expect.soft(this._loginSignupLinkLocator).toBeVisible();
        await expect.soft(this._loginSignupLinkLocator).toBeEnabled();

        const socialMediaLocators = await this._socialMediaLinkLocator.allTextContents();
        expect.soft(new Set(socialMediaLocators)).toEqual(new Set(socialMedias));
    }

    async checkMainNavigationMenu(mainNavigations: string[]){
        const mainNavigationLocators = await this._mainNavigationLinkLocator.allTextContents();
        expect.soft(new Set(mainNavigationLocators)).toEqual(new Set(mainNavigations));
    }

    async searchProduct(category: string, keyword: string) {
        await this._categoryDropdown.selectOption(category);
        await this._searchBarDropdown.fill(keyword);
        await this._searchButton.click();
    }

    async checkMainCategoryVisible(categories: string[]){
        const mainCategoriesLocators = await this._mainCategoryLocator.allTextContents();
        expect.soft(new Set(mainCategoriesLocators)).toEqual(new Set(categories));
    }

    async checkNavigateMainCategories(){
        const mainCategoriesLocators = await this._mainCategoryLocator.all();

        for (const mainCategoryLocator of mainCategoriesLocators){
            const mainCategory = await mainCategoryLocator.textContent() ?? ""; 

            await this._categoryDropdownLocator.hover();
            await mainCategoryLocator.click();
            await expect.soft(this.page).toHaveTitle(new RegExp(mainCategory, "i"));
        }
    }
}