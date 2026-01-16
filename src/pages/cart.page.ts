import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/product.model";
import { ProductHelper } from "../helpers/product.helper";

export class CartPage {
    static CARTPAGE_URL = "/cart";
    productHelper = new ProductHelper();
    private page: Page;

    readonly _quantityInputLocator: Locator;
    readonly _plusButtonLocator: Locator;
    readonly _productListLocator: Locator;
    readonly _updateCartButtonLocator: Locator;
    readonly _successMessageLocator: Locator;
    readonly _cartTotalLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this._quantityInputLocator = page.locator("//input[contains(@id, 'quantity')]");
        this._plusButtonLocator = page.locator("//span[@class = 'plus']");
        this._productListLocator = page.locator("//tr[contains(@class, 'woocommerce-cart-form__cart')]");
        this._updateCartButtonLocator = page.getByRole('button', { name: 'Update cart' });
        this._successMessageLocator = page.getByText('Cart updated.');
        this._cartTotalLocator = page.locator("//tr//strong");
    }

    async goto() {
        await this.page.goto(CartPage.CARTPAGE_URL);
        await this.page.waitForLoadState();
    }

    async fillProductQuantityTextbox(productTilte: string, quantity: string) {
        await this._productListLocator
            .filter({ hasText: productTilte })
            .locator(this._quantityInputLocator)
            .fill(quantity);
        await this.page.click('body');
    }

    
}