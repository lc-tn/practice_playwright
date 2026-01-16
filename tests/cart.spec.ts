import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';
import { CartPage } from '../src/pages/cart.page';
import { ShopPageBusiness } from '../src/businesses/shoppage';
import { CartPageBusiness } from '../src/businesses/cartpage';
import { CartPageVerification } from '../src/verifications/cartpage';
import { ProductPage } from '../src/pages/product.page';
import { HomePageBusiness } from '../src/businesses/homepage';

test.describe('Testcases involving CartPage', () => {
    let homePage: HomePage;
    let homePageBusiness: HomePageBusiness;
    // let homePageVerification: HomePageVerification;

    let shopPage: ShopPage;
    let shopPageBusiness: ShopPageBusiness;
    // let shopPageVerification: ShopPageVerification;

    let cartPage: CartPage;
    let cartPageBusiness: CartPageBusiness;
    let cartPageVerification: CartPageVerification;

    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePageBusiness = new HomePageBusiness(page);
        // homePageVerification = new HomePageVerification(page);

        shopPage = new ShopPage(page);
        shopPageBusiness = new ShopPageBusiness(page);
        // shopPageVerification = new ShopPageVerification(page);

        cartPage = new CartPage(page);
        cartPageBusiness = new CartPageBusiness(page);
        cartPageVerification = new CartPageVerification(page);

        productPage = new ProductPage(page);

        await homePage.goto();
    });

    test('TC_05.Verify Product Quantity Can Be Updated in Cart', async ({ page }) => {

        let productTitles = ['AirPods'];

        //Pre-condition: Add product to cart
        await shopPageBusiness.addProductsToCart(productTitles);
        await shopPage._successMessage.waitFor({state: 'visible'});
        const product = await productPage.getProduct();

        //Main step
        await homePageBusiness.goToCartPage();
        await cartPageBusiness.updateProductQuantity(product.title, '2');
        await expect.soft(cartPage._successMessageLocator).toBeVisible();
        await cartPageVerification.checkCartUpdate(product);
    });
});
