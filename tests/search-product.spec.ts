import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ShopPage } from '../src/pages/shop.page';

test.skip('TC_02.Verify Product Search Functionality Works', async ({ page }) => {

    let keyword = "camera";
    let category = "All categories";

    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);

    await homePage.goto();
    await homePage.searchProduct(category, keyword);
    await shopPage.checkSearchResultTitle(keyword);
    await expect(page).toHaveURL(new RegExp(`s=${keyword}`));
    await shopPage.checkSearchProductByName(keyword);
});
