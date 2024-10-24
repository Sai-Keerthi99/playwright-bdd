import { test as base, createBdd } from 'playwright-bdd';
import { PageUtils } from '../helper/componentLibrary/pageUtils';
import { BillingPlan } from '../pages/bcpages/billingplanspage';
import { AccountPage } from '../pages/pcpages/accountpage';
import { HomePage } from '../pages/pcpages/homepage';
import { LoginPage } from '../pages/pcpages/loginpage';
import { SubmissionPage } from '../pages/pcpages/submissionpage';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    pageUtils: PageUtils;
    submissionPage: SubmissionPage;
    billingPlan: BillingPlan;
};

export const test = base.extend<MyFixtures>({
  storageState: async ({ $tags, storageState }, use) => {
    // reset storage state for features/scenarios with @noauth tag
    if ($tags.includes('@noauth')) {
      storageState = { cookies: [], origins: [] };
    }
    await use(storageState);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  submissionPage: async ({ page }, use) => {
    await use(new SubmissionPage(page));
  },
  billingPlan: async ({ page }, use) => {
    await use(new BillingPlan(page));
  }
});

export const { Given, When, Then } = createBdd(test);