import { test, expect } from "./test-fixtures";
import { generateUniqueEmail } from "../src/utils/generate-mail.util";

test.describe('Testcases involving Registering account', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_09.Verify New User Can Register Successfully', async ({ 
        page,
        homePage,
        myAccountPage,
        mailPage
    }) => {

        const email = generateUniqueEmail('test', 'grr.la');
        const username = email.split('@')[0];
        const password = '12345678';

        //1. Click "Log in / Sign up" link
        //2. Locate the registration form
        //3. Enter a valid email address
        //4. Click the "Register" button
        await myAccountPage.signup(email);

        //5. Verify that the account is created successfully
        //Checkpoint:
        //- Registration completes successfully
        //- User is automatically logged in after registration
        await expect.soft(homePage.loginSignupLink).toContainText(username);

        //- My Account dashboard is displayed
        await expect.soft(page).toHaveTitle(new RegExp('My Account', "i"));

        //6. Check the user’s email for a password set link
        //7. Use the link to set a password
        //Checkpoint:
        //- Password set email is received by the user
        await mailPage.goto();
        await mailPage.clickSetPasswordLink(email);
        await myAccountPage.setPassword(password);

        //8. Verify the user can log in with the newly created account
        await myAccountPage.login(email, password);
        //Checkpoint:
        //- User can log in using the newly set password
        await expect.soft(homePage.loginSignupLink).toContainText(username);
        
    });
});