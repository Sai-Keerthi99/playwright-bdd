import { expect } from '@playwright/test';
import { Given, Then, When } from '../../../src/fixtures/base';
import { user } from '../../../src/helper/componentLibrary/urls';


Given('super-user navigates to landing-page', async ({homePage}) => {
   await homePage.navigateToHomePage();
});

Given('invalid-user navigates to landing-page', async ({homePage}) => {
  user.username = 'invalid';
  user.password = 'invalid';
  await homePage.navigateToHomePage();
});

Given('the user logs in', async ({loginPage}) => {
  await loginPage.userLogin(user);
});

Then('the page should display in logged in state', async ({page}) => {
  await page.waitForLoadState('load');
  await expect(page.locator('div.gw-TitleBar--title')).toBeVisible();
});

When('the page should display an error message', async ({page}) => {
  await expect(page.locator('div#Login-LoginScreen-LoginFormMessage div')).toContainText('Your username or password may be incorrect');
 });

 Given('User navigates to landing-page', async ({homePage}) => {
  await homePage.navigateToHomePage();
});


