import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";

export class HomePageBusiness {
    private homePage;

    constructor(page: Page) {
        this.homePage = new HomePage(page);
    }

    async searchProduct(category: string, keyword: string) {
        await this.homePage.categoryDropdown.selectOption(category);
        await this.homePage.searchTextbox.fill(keyword);
        await this.homePage.searchButton.click();
    } 

    async goToCartPage(){
        await this.homePage._cartQuantityLocator.click();
    }

}