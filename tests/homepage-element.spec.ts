import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';

test.skip('TC_01.Verify Homepage Elements Are Visible', async ({ page }) => {

    let phoneNumber = '(+1800) 000 8808';
    let address = '1730 S. Amphlett Blvd. Suite 200, San Mateo, CA';
    let socialMedias = ['Pinterest', 'Instagram', 'Twitter', 'Facebook'];
    let mainNavigation = ['Home', 'About Us', 'Shop', 'Offers', 'Blog', 'Contact Us'];

    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.closeNotificationPopup();
    await homePage.acceptCookie();
    await homePage.checkHeaderSection(phoneNumber, address);
    await homePage.checkTopNavigationElements(socialMedias);
    await homePage.checkMainNavigationMenu(mainNavigation);
});

test.skip('TC_03.Verify Main Menu Categories Navigate Correctly', async ({ page }) => {

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

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.categoryDropdownLocator.hover();
    await homePage.checkMainCategoryVisible(mainCategories);
    await homePage.checkNavigateMainCategories();
});

