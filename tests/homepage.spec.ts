import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { HomePageVerification } from '../src/verifications/homepage';
import { HomePageBusiness } from '../src/businesses/homepage';
import { ShopPage } from '../src/pages/shop.page';
import { ShopPageVerification } from '../src/verifications/shoppage';

test.describe('Testcases in HomePage', () => {
    let homePage: HomePage;
    let homePageBusiness: HomePageBusiness;
    let homePageVerification: HomePageVerification;

    let shopPage: ShopPage;
    let shopPageVerification: ShopPageVerification;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePageBusiness = new HomePageBusiness(page);
        homePageVerification = new HomePageVerification(page);

        shopPage = new ShopPage(page);
        shopPageVerification = new ShopPageVerification(page);

        await homePage.goto();
    });

    test.skip('TC_01.Verify Homepage Elements Are Visible', async ({ page }) => {

        let phoneNumber = '(+1800) 000 8808';
        let address = '1730 S. Amphlett Blvd. Suite 200, San Mateo, CA';
        let socialMedias = ['Pinterest', 'Instagram', 'Twitter', 'Facebook'];
        let mainNavigation = ['About Us', 'Shop', 'Offers', 'Blog', 'Contact Us', 'Home'];

        await homePage.closeNotificationPopup();
        await homePage.clickAcceptCookie();
        await homePageVerification.checkHeaderSection(phoneNumber, address);
        await homePageVerification.checkLoginSignupLink();
        await homePageVerification.checkSocialMediaLinks(socialMedias);
        await homePageVerification.checkMainNavigationMenu(mainNavigation);
    });

    test.skip('TC_02.Verify Product Search Functionality Works', async ({ page }) => {

        let keyword = "camera";
        let category = "All categories";

        await homePageBusiness.searchProduct(category, keyword);
        await shopPageVerification.checkSearchResultTitle(keyword);
        await expect(page).toHaveURL(new RegExp(`s=${keyword}`));
        await shopPageVerification.checkSearchProductByName(keyword);
    });

    test('TC_03.Verify Main Menu Categories Navigate Correctly', async ({ page }) => {

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

        await homePage.mainCategoryDropdown.hover();
        await homePageVerification.checkMainCategoryVisible(mainCategories);

        for (const mainCategory of mainCategories) {            
            await homePage.clickMainCategoryLink(mainCategory);  
            await expect.soft(page).toHaveTitle(new RegExp(mainCategory, "i"));
        }
    });
});
