import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';
import { CartPage } from '../src/pages/cart.page';
import { CheckoutPage } from '../src/pages/checkout.page';
import { BillingDetail } from '../src/models/billing-details.model';
import { HomePageBusiness } from '../src/businesses/homepage';
import { ShopPageBusiness } from '../src/businesses/shoppage';

test.describe('Testcases involving CartPage', () => {
    let homePage: HomePage;
    let homePageBusiness: HomePageBusiness;
    // let homePageVerification: HomePageVerification;

    let shopPage: ShopPage;
    let shopPageBusiness: ShopPageBusiness;
    // let shopPageVerification: ShopPageVerification;

    let cartPage: CartPage;
    // let cartPageBusiness: CartPageBusiness;
    // let cartPageVerification: CartPageVerification;

    // let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePageBusiness = new HomePageBusiness(page);
        // homePageVerification = new HomePageVerification(page);

        shopPage = new ShopPage(page);
        shopPageBusiness = new ShopPageBusiness(page);
        // shopPageVerification = new ShopPageVerification(page);

        cartPage = new CartPage(page);
        // cartPageBusiness = new CartPageBusiness(page);
        // cartPageVerification = new CartPageVerification(page);

        // productPage = new ProductPage(page);

        await homePage.goto();
    });

    test('TC_06.Verify Product Quantity Can Be Updated in Cart', async ({ page }) => {

        let productTitles = ['AirPods'];

        const billingDetail = new BillingDetail();

        //Pre-condition: Add product to cart
        await shopPageBusiness.addProductsToCart(productTitles);
        await shopPage._cartQuantityLocator.hover();
        await shopPage._checkoutButton.click();
        //Main step
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillBillingDetail(billingDetail);
        await checkoutPage.clickOrderButton();
        await checkoutPage.checkHighlightMissingField();

    });
});
