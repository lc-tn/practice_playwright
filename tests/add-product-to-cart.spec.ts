import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';

test('TC_04.Verify Product Can Be Added to Shopping Cart', async ({ page }) => {

    let productDatas = ['AirPods'];

    const shopPage = new ShopPage(page);

    await shopPage.goto();
    const initialCartQuantity = await shopPage.getInitialCartQuanity();
    const initialCartTotal = await shopPage.getInitialCartTotal();
    const products = await shopPage.getProductList(productDatas);
    await shopPage.addProductToCart(products);
    await shopPage.checkSuccessMessage();
    await shopPage.checkCartIcon(products, initialCartQuantity, initialCartTotal);
    await shopPage.checkProductAddedToCart(products);
});
