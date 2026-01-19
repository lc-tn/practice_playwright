import { test, expect } from "./test-fixtures";

test.describe('Testcases for CartPage', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_05.Verify Product Quantity Can Be Updated in Cart', async ({
        shopPageBusiness,
        productPage,
        cartPage,
        cartPageVerification
    }) => {

        let productTitles = ['AirPods'];

        //Pre-condition: Add product to cart
        await shopPageBusiness.addProductsToCart(productTitles);
        const product = await productPage.getProduct();

        //Main step

        //1. Navigate to Cart page
        await cartPage.goto();

        //2. Locate quantity field
        //3. Change quantity to 2
        //4. Click "Update Cart" button
        await cartPage.updateProductQuantity(product.title, '2');

        //5. Verify cart updates
        //Checkpoints:
        //- Success message should appear
        await expect.soft(cartPage.successMessageLocator).toBeVisible({ timeout: 10000 });

        //- Quantity should update
        // - Cart total should recalculate
        await cartPageVerification.checkCartUpdate(product);
    });

    test('TC_07.Verify Users Can Clear the Shopping Cart', async ({
        page,
        shopPageBusiness,
        cartPage,
        myAccountPage
    }) => {

        let productTitles = ['AirPods'];

        //2. Login with valid credentials
        await myAccountPage.login('congabietbay@grr.la', '12345678');

        //Pre-condition: Add product to cart
        await shopPageBusiness.addProductsToCart(productTitles);

        //Main step
        //3. Go to Shopping cart page
        await cartPage.goto();

        //4. Verify items show in table
        await expect.soft(cartPage.productListLocator.nth(0)).toContainText(productTitles[0]);

        //5. Click on Clear shopping cart
        await cartPage.clearCartButton.click();
        page.on('dialog', dialog => dialog.accept());

        //6. Verify empty cart page displays
        //YOUR SHOPPING CART IS EMPTY displays
        await expect(page.getByText('YOUR SHOPPING CART IS EMPTY', { exact: false })).toBeVisible();
    });
});
