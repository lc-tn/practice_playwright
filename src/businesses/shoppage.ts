import { Page } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
import { HomePageBusiness } from "./homepage";
import { ProductPage } from "../pages/product.page";

export class ShopPageBusiness {
    private shopPage;
    private productPage;
    private homePageBusiness;

    constructor(page: Page) {
        this.shopPage = new ShopPage(page);
        this.productPage = new ProductPage(page);
        this.homePageBusiness = new HomePageBusiness(page);
    }

    async addProductsToCart(productNames: string[]){
        for (const productName of productNames){
            await this.homePageBusiness.searchProduct('All categories', productName);
            await this.productPage.addToCartButton.click();
        }       
    }
}