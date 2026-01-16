import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";

export class HomePageVerification {
    private page;
    private homePage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
    }

    async checkHeaderSection(phoneNumber: string, address: string) {
        await expect.soft(this.homePage.phoneNumberSpan).toContainText(phoneNumber);
        await expect.soft(this.homePage.phoneNumberSpan).toBeVisible();
        await expect.soft(this.homePage.addressSpan).toContainText(address);
        await expect.soft(this.homePage.phoneNumberSpan).toBeVisible();
    }

    async checkLoginSignupLink() {
        await expect.soft(this.homePage.loginSignupLink).toBeVisible();
        await expect.soft(this.homePage.loginSignupLink).toBeEnabled();
    }

    async checkSocialMediaLinks(socialMedias: string[]) {
        const socialMediaLinks = await this.homePage.socialMediaLinks.allTextContents();
        const actualSocialMediaLinks = socialMediaLinks.map(socialMdeiaLink => socialMdeiaLink.trim());
        expect.soft(new Set(actualSocialMediaLinks)).toEqual(new Set(socialMedias));
    }

    async checkMainNavigationMenu(mainNavigations: string[]) {
        const mainNavigationLocators = await this.homePage.mainNavigationLinks.allTextContents();
        const actualMainNavigations = mainNavigationLocators.map(navigation => navigation.trim())
        expect.soft(new Set(actualMainNavigations)).toEqual(new Set(mainNavigations));
    }

    async checkMainCategoryVisible(categories: string[]) {
        const mainCategoriesLocators = await this.homePage.mainCategoryLinks.allTextContents();
        expect.soft(new Set(mainCategoriesLocators)).toEqual(new Set(categories));
    }
}