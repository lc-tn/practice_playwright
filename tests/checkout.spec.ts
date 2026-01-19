import { BillingDetail } from "../src/models/billing-details.model";
import { test, expect } from "./test-fixtures";

test.describe('Testcases involving CheckoutPage', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_06.Verify Error Handling for Mandatory Checkout Fields', async ({ 
        shopPageBusiness,
        cartPage,
        checkoutPage,
        checkoutPageVerification
    }) => {

        let productTitles = ['AirPods'];

        const billingDetail = new BillingDetail();

        //Pre-condition: Add product to cart and go to Checkout page
        await shopPageBusiness.addProductsToCart(productTitles);
        await cartPage.goto();
        await cartPage.clickCheckoutButton();

        //Main step

        //1. Leave mandatory fields (address, payment info) blank
        await checkoutPage.fillBillingDetail(billingDetail);

        //2. Click 'Confirm Order'
        await checkoutPage.placeOrderButton.click();

        //3. Verify error messages
        //Checkpoint: System should highlight missing fields and show an error message
        await checkoutPageVerification.checkHighlightMissingField();

    });

    test('TC_08.Verify Guest User Can Complete Checkout', async ({ 
        page,
        shopPageBusiness,
        cartPage,
        checkoutPage,
    }) => {

        let productTitles = ['AirPods'];

        const billingDetail = new BillingDetail({
            firstname: 'John',
            lastname: 'Henry',
            address: '123 Main Street',
            city: 'Helsinki',
            zipCode: '00100',
            phone: '+358401234567',
            email: 'john.henry@testmail.com',
        });

        //Pre-condition: Add product to cart
        await shopPageBusiness.addProductsToCart(productTitles);


        //Main step
        //1. Navigate to Cart
        await cartPage.goto();

        //2. Click "Proceed to Checkout"
        await cartPage.clickCheckoutButton();

        //3. Fill in billing details
        await checkoutPage.fillBillingDetail(billingDetail);

        //4. Select payment method
        await checkoutPage.choosePaymentMethod('cash on delivery');
        
        //5.Place order
        await checkoutPage.placeOrderButton.click();

        //Checkpoints:
        //- Order should be placed successfully
        await expect.soft(checkoutPage.checkoutSuccessMessage).toBeVisible({ timeout: 15000 });
        //- Order confirmation should be displayed
        await expect.soft(checkoutPage.orderInformation).toBeVisible();
        //- Order number should be generated
        await expect.soft(checkoutPage.orderNumber).toBeVisible();
    });
});
