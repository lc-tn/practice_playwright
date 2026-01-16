import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/product.model";
import { ProductHelper } from "../helpers/product.helper";

export class ShopPage {
    static SHOPPAGE_URL = "/shop";
    productHelper = new ProductHelper();

    private page: Page;
    readonly _searchResultTitle: Locator;

    //Product
    readonly _productListLocator: Locator;
    readonly _productTitleLocator: Locator;
    readonly _productPriceLocator: Locator;

    //Cart
    readonly _cartQuantityLocator: Locator;
    readonly _cartTotalLocator: Locator;
    readonly _successMessage: Locator;
    readonly _cartProductsLocator: Locator;
    readonly _checkoutButton: Locator;
    // private _cartProductQuantityLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this._searchResultTitle = page.getByRole('heading', { name: 'Search results for' })

        //Product
        this._productListLocator = page.locator("//div[contains(@class,'content-product')]");
        this._productPriceLocator = page.locator("//span[@class = 'price']");
        this._productTitleLocator = page.locator("//h2[@class = 'product-title']");

        //Cart
        this._cartQuantityLocator = page.locator("//div[@class = 'header-wrapper']//a//span[contains(@class, 'et-cart-quantity')]");
        this._cartTotalLocator = page.locator("//div[@class = 'header-wrapper']//a//span[@class = 'woocommerce-Price-amount amount']");
        this._successMessage = page.locator("//div[@data-type ='success']");
        this._cartProductsLocator = page.locator("//div[@class = 'header-wrapper']//h4[@class = 'product-title']");
        this._checkoutButton = page.locator("//div[@class = 'header-wrapper']//a[text() = 'Checkout']");
        // this._cartProductQuantityLocator = page.locator("//div[@class = 'header-wrapper']//span[@class = 'quantity']");
    }

    // private set productLocator(value: string) {
    //     this._productLocator = this.page
    //         .locator(`//a[normalize-space()='${value}']/ancestor::div[contains@class,'content-product')]`);
    // }

    async goto() {
        await this.page.goto(ShopPage.SHOPPAGE_URL);
    }

    async getProductList(): Promise<Product[]> {
        const productList: Product[] = [];

        const products = await this._productListLocator.all();

        for (const product of products) {
            const title = await product.locator(this._productTitleLocator).textContent() ?? "";
            const price = await product.locator(this._productPriceLocator).textContent() ?? "";
            productList.push(
                new Product({
                    title: title.trim(),
                    price: this.productHelper.formatPrice(price).toString()
                })
            )
        }
        return productList;
    }

    async getProductByName(productNames: string[]): Promise<Product[]> {
        const productList: Product[] = [];

        for (const productName of productNames) {
            const titleLocator = this.page.locator(
                `//a[normalize-space() = "${productName}"]`
            );
            if (titleLocator) {
                const priceLocator = this.page.locator(
                    `//a[normalize-space() = "${productName}"]/parent::h2/following-sibling::span`
                )
                const title = await titleLocator.textContent() ?? "";
                const price = await priceLocator.textContent() ?? "";
                productList.push(
                    new Product({
                        title: title.trim(),
                        price: this.productHelper.formatPrice(price).toString()
                    })
                )
            }
        }
        return productList;
    }

    async checkSearchResultTitle(keyword: string) {
        await expect(this._searchResultTitle)
            .toContainText(new RegExp(`SEARCH RESULTS FOR \\s*[“"]${keyword}[”"]`, "i"));
    }

    async checkSearchProductByName(keyword: string) {
        const products = await this.getProductList();
        products.forEach(product => {
            expect(product.title).toMatch(new RegExp(keyword, "i"));
        })
    }

    async getInitialCartQuanity(): Promise<number> {
        const initialQuantity = await this._cartQuantityLocator.textContent() ?? "";
        return Number(initialQuantity);
    }

    async getInitialCartTotal(): Promise<number> {
        const initialTotal = await this._cartTotalLocator.textContent() ?? "";
        const parsedInitialTotal = this.productHelper.formatPrice(initialTotal);
        return parsedInitialTotal;
    }

    async addProductToCart(products: Product[]) {
        for (const product of products) {
            const addToCartBtn = this.page
                .locator(`//a[normalize-space() = "${product.title}"]/parent::h2/following-sibling::a`)

            await addToCartBtn.click();
        }
    }

    async checkCartIcon(products: Product[], initialQuantity: number, initialTotal: number) {
        for (const product of products) {
            initialQuantity++;
            initialTotal += Number(product.price);
        }

        await expect.soft(this._cartQuantityLocator).toHaveText(initialQuantity.toString());
        await expect.soft(this._cartTotalLocator).toContainText(initialTotal.toString());
    }

    async checkSuccessMessage() {
        await expect.soft(this._successMessage).toBeVisible();
    }

    async checkProductAddedToCart(products: Product[]) {
        const expectedProducts = products.map(product => product.title);
        await expect(this._cartProductsLocator).toHaveText(expectedProducts);
    }

    async clickCheckoutButton() {
        await this._cartQuantityLocator.hover();
        await this._checkoutButton.click();
    }
}