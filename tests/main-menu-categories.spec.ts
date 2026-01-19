import { test, expect } from "./test-fixtures";

test.describe('Testcases to check navigation of main menu categories', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_03.Verify Main Menu Categories Navigate Correctly', async ({
        page,
        homePage,
        homePageVerification
    }) => {

        let mainCategories = [
            'Automobiles & Motorcycles',
            'Car Electronics',
            'Mobile Phone Accessories',
            'Computer & Office',
            'Tablet Accessories',
            'Consumer Electronics',
            'Electronic Components & Supplies',
            'Phones & Telecommunications',
            'Watches'
        ];

        //1. Hover over "All departments" menu
        await homePage.mainCategoryDropdown.hover();

        //2. Verify all main categories are present
        await homePageVerification.checkMainCategoryVisible(mainCategories);

        //3. Click each category and verify navigation
        //Checkpoints:
        //- All categories should be visible in the menu
        //- Clicking each category should navigate to correct page
        for (const mainCategory of mainCategories) {
            await homePage.clickMainCategoryLink(mainCategory);
            await expect.soft(page).toHaveTitle(new RegExp(mainCategory, "i"));
        }
    });
});
