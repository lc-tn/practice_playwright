import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';
import { CartPage } from '../src/pages/cart.page';
import { CheckoutPage } from '../src/pages/checkout.page';
import { BillingDetail } from '../src/models/billing-details.model';

test('TC_06.Verify Product Quantity Can Be Updated in Cart', async ({ page }) => {

    let productDatas = ['AirPods'];

    const billingDetail = new BillingDetail();

    //Pre-condition: Add product to cart
    const shopPage = new ShopPage(page);
    await shopPage.goto();
    const products = await shopPage.getProductByName(productDatas);
    await shopPage.addProductToCart(products);
    await shopPage.clickCheckoutButton();
    //Main step
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillBillingDetail(billingDetail);
    await checkoutPage.clickOrderButton();
    await checkoutPage.checkHighlightMissingField();

});