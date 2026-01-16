import { expect, Page } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
import { ShopPageBusiness } from "../businesses/shoppage";

export class ShopPageVerification {
    private page: Page;
    private shopPage;
    private shopPageBusiness: ShopPageBusiness;

    constructor(page: Page) {
        this.page = page;
        this.shopPage = new ShopPage(this.page);
        this.shopPageBusiness = new ShopPageBusiness(page);
    }

    async checkSearchResultTitle(keyword: string) {
        await expect(this.shopPage.searchResultTitle)
            .toContainText(new RegExp(`${keyword}`, "i"));
    }

    async checkSearchProductByName(keyword: string) {
        const products = await this.shopPage._productListLocator.all();
        const matchProduct = products.map(product =>
            product.filter({ hasText: keyword })
        )
        expect.soft(matchProduct.length).toEqual(matchProduct.length);
    }
}