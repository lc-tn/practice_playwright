import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';
import { ShopPageBusiness } from '../src/businesses/shoppage';


test.describe('Testcases in HomePage', () => {
    let homePage: HomePage;
    // let homePageBusiness: HomePageBusiness;
    // let homePageVerification: HomePageVerification;

    let shopPage: ShopPage;
    let shopPageBusiness: ShopPageBusiness;
    // let shopPageVerification: ShopPageVerification;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        // homePageBusiness = new HomePageBusiness(page);
        // homePageVerification = new HomePageVerification(page);

        shopPage = new ShopPage(page);
        shopPageBusiness = new ShopPageBusiness(page);
        // shopPageVerification = new ShopPageVerification(page);

        await shopPage.goto();
    });

    test('TC_04.Verify Product Can Be Added to Shopping Cart', async ({ page }) => {

        let productTitles = ['AirPods'];
        let initialCartQuantity = await shopPage.getCartQuanity();
        let initialCartTotal = await shopPage.getCartTotal();

        await shopPage.goto();
        await shopPageBusiness.addProductsToCart(productTitles);
        const product = await shopPage.getProductByTitle(productTitles);
        const expectCartTotal = initialCartTotal + Number(product[0].price);
        await expect.soft(shopPage._cartQuantityLocator).toContainText((++initialCartQuantity).toString());
        await expect.soft(shopPage._cartTotalLocator).toContainText(expectCartTotal.toString());
    });
});

