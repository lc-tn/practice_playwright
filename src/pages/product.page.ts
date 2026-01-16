import { Locator, Page } from "@playwright/test";
import { Product } from "../models/product.model";
import { ProductHelper } from "../helpers/product.helper";

export class ProductPage {
    private page: Page;
    private productHelper;

    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productHelper = new ProductHelper();

        this.addToCartButton = page.locator("//form[@class = 'cart']//button");
        this.productTitle = page.locator("(//h1)[1]");
        this.productPrice = page.locator("(//p[@class = 'price'])[1]");
    }

    async getProduct(): Promise<Product> {
        const title = await this.productTitle.textContent() ?? "";
        const price = await this.productPrice.textContent() ?? "";

        const product = new Product({
            title: title.trim(),
            price: this.productHelper.formatPrice(price).toString()
        })
        return product;
    }
}