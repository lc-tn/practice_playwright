import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/product.model";
import { HomePage } from "./home.page";
import { formatPrice } from "../utils/data-format";

export class ShopPage extends HomePage {
    static SHOPPAGE_URL = "/shop";

    readonly searchResultTitle: Locator;

    //Product
    readonly productListLocator: Locator;
    readonly productTitleLocator: Locator;
    readonly productPriceLocator: Locator;

    //Cart
    readonly cartQuantityLocator: Locator;
    readonly cartTotalLocator: Locator;
    
    readonly cartProductsLocator: Locator;
    readonly checkoutButton: Locator;


    constructor(page: Page) {
        super(page);
        this.searchResultTitle = page.getByRole('heading', { name: 'Search results for' })

        //Product
        this.productListLocator = page.locator("//div[contains(@class,'content-product')]");
        this.productPriceLocator = page.locator("//span[@class = 'price']");
        this.productTitleLocator = page.locator("//h2[@class = 'product-title']");

        //Cart
        this.cartQuantityLocator = page.locator("//div[@class = 'header-wrapper']//a//span[contains(@class, 'et-cart-quantity')]");
        this.cartTotalLocator = page.locator("//div[@class = 'header-wrapper']//a//span[@class = 'woocommerce-Price-amount amount']");
        
        this.cartProductsLocator = page.locator("//div[@class = 'header-wrapper']//h4[@class = 'product-title']");
        this.checkoutButton = page.locator("//div[@class = 'header-wrapper']//a[text() = 'Checkout']");
    }

    async goto() {
        await this.page.goto(ShopPage.SHOPPAGE_URL);
        await this.page.waitForLoadState();
    }

    async getCartQuanity(): Promise<number> {
        const quantity = await this.cartQuantityLocator.textContent() ?? "";
        return Number(quantity);
    }

    async getCartTotal(): Promise<number> {
        const total = await this.cartTotalLocator.textContent() ?? "";
        const parsedTotal = formatPrice(total);
        return parsedTotal;
    }

    async clickAddToCartButton(productTitle: string) {
        const addToCartBtn = this.page
            .locator(`//a[normalize-space() = "${productTitle}"]/parent::h2/following-sibling::a`)

        await addToCartBtn.click();
    }

    async checkCartIcon(products: Product[], initialQuantity: number, initialTotal: number) {
        for (const product of products) {
            initialQuantity++;
            initialTotal += Number(product.price);
        }

        await expect.soft(this.cartQuantityLocator).toHaveText(initialQuantity.toString());
        await expect.soft(this.cartTotalLocator).toContainText(initialTotal.toString());
    }

    async clickCheckoutButton() {
        await this.cartQuantityLocator.hover();
        await this.checkoutButton.click();
    }
}