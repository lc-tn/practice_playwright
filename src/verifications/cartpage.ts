import { expect, Page } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { Product } from "../models/product.model";
import { ShopPage } from "../pages/shop.page";
import { ShopPageBusiness } from "../businesses/shoppage";

export class CartPageVerification {
    private cartPage: CartPage;
    private shopPage: ShopPage;
    private shopPageBusiness: ShopPageBusiness;

    constructor(page: Page) {
        this.cartPage = new CartPage(page);
        this.shopPage = new ShopPage(page);
        this.shopPageBusiness = new ShopPageBusiness(page);
    }

    async checkCartUpdate(product: Product) {
        await expect.soft(this.cartPage._quantityInputLocator.nth(0)).toHaveValue("2");
        
        const expectedTotal = Number(product.price) * 2;
        await expect.soft(this.cartPage._cartTotalLocator).toContainText(expectedTotal.toString());
    }
}