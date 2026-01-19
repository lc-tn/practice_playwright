import { test as base } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';
import { CartPage } from '../src/pages/cart.page';
import { ShopPageVerification } from '../src/verifications/shoppage';
import { ShopPageBusiness } from '../src/businesses/shoppage';
import { ProductPage } from '../src/pages/product.page';
import { CartPageVerification } from '../src/verifications/cartpage';
import { CheckoutPage } from '../src/pages/checkout.page';
import { CheckoutPageVerification } from '../src/verifications/checkout-page';
import { MyAccountPage } from '../src/pages/my-accaount.page';
import { HomePageVerification } from '../src/verifications/homepage';
import { MailPage } from '../src/pages/mail.page';
import { WishlistPage } from '../src/pages/wishlist.page';

type TestFixtures = {
    homePage: HomePage;
    homePageVerification: HomePageVerification;

    shopPage: ShopPage;
    shopPageVerification: ShopPageVerification;
    shopPageBusiness: ShopPageBusiness;

    cartPage: CartPage;
    cartPageVerification: CartPageVerification;

    productPage: ProductPage;

    checkoutPage: CheckoutPage;
    checkoutPageVerification: CheckoutPageVerification;

    myAccountPage: MyAccountPage;

    mailPage: MailPage;

    wishlistPage: WishlistPage;
};


export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        test.setTimeout(120000);
        const homePage = new HomePage(page);
        await use(homePage);
    },

    homePageVerification: async ({ page }, use) => {
        const homePageVerification = new HomePageVerification(page);
        await use(homePageVerification);
    },

    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },

    shopPageVerification: async ({ page }, use) => {
        const shopPageVerification = new ShopPageVerification(page);
        await use(shopPageVerification);
    },

    shopPageBusiness: async ({ page }, use) => {
        const shopPageBusiness = new ShopPageBusiness(page);
        await use(shopPageBusiness);
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    cartPageVerification: async ({ page }, use) => {
        await use(new CartPageVerification(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    checkoutPageVerification: async ({ page }, use) => {
        await use(new CheckoutPageVerification(page));
    },

    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },

    mailPage: async ({ page }, use) => {
        await use(new MailPage(page));
    },

    wishlistPage: async ({ page }, use) => {
        await use(new WishlistPage(page));
    }
});

export { expect } from '@playwright/test';