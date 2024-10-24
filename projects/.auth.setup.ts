import { expect, test as setup } from '@playwright/test';
import { LoginPage } from '../src/pages/pcpages/loginpage';
import { policyCenter, user } from '../src/helper/componentLibrary/urls';

const authFile = 'cookies.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto(`${policyCenter}`);
    await loginPage.username().fill(`${user.username}`);
    await loginPage.password().fill(`${user.password}`);
    await loginPage.loginButton().click();
    
    await expect(loginPage.gwLogo()).toBeVisible({timeout: 5000});
    
    await page.context().storageState({ path: authFile });
});