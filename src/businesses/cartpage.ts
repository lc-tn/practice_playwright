import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { CartPage } from "../pages/cart.page";

export class CartPageBusiness {
    private cartPage;

    constructor(page: Page) {
        this.cartPage = new CartPage(page);
    }

    async updateProductQuantity(productTitle: string, quantity: string){
        await this.cartPage.fillProductQuantityTextbox(productTitle, quantity);
        await this.cartPage._updateCartButtonLocator.click();
        // await this.shop._successMessageLocator.waitFor({state: 'visible'});
    }
}