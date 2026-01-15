import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';
import { CartPage } from '../src/pages/cart.page';

test('TC_05.Verify Product Quantity Can Be Updated in Cart', async ({ page }) => {

    let productDatas = ['AirPods'];

    //Pre-condition: Add product to cart
    const shopPage = new ShopPage(page);
    await shopPage.goto();
    const products = await shopPage.getProductList(productDatas);
    await shopPage.addProductToCart(products);

    //Main step
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.increaseProductQuantity();
    await cartPage.checkCartUpdate(products[0]);

});