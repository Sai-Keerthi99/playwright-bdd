import { expect, Locator, Page } from "@playwright/test";

export class BillingPlan {
    readonly page : Page
    readonly expandButton : string;

    constructor(page: Page) {
        this.page = page;
        this.expandButton = 'div[class="gw-icon gw-icon--expand"]';
    }

    billingPlansTitle():Locator{
        return this.page.locator('div#BillingPlans-BillingPlansScreen-ttlBar')
    }
    beazleyBillingPlan():Locator{
        return this.page.locator('div[id$="Name_button"]').first();
    }
    name():Locator{
        return this.page.locator("div[id$='-Name_Input']>div").first()
    }
    description():Locator{
        return this.page.locator("div[id$='-Description_Input']>div").first()
    }
    fixInvoiceDueDateOn():Locator{
        return this.page.locator("div[id$='-PaymentDueDayLogic_Input']>div").first()
    }
    effectiveDate():Locator{
        return this.page.locator("div[id$='-EffectiveDate_Input']>div").first()
    }
    expirationDate():Locator{
        return this.page.locator("div[id$='-ExpirationDate_Input']>div").first()
    }
    currency():Locator{
        return this.page.locator("div[id$='-Currency_Input']>div").first()
    }
    responsiveLeadTime():Locator{
        return this.page.locator("div[id$='-PaymentDueInterval_Input']>div").first()
    }
    nonResponsiveLeadTime():Locator{
        return this.page.locator("div[id$='-NonResponsivePaymentDueInterval_Input']>div").first()
    }
    expressedIn():Locator{
        return this.page.locator("div[id$='-LeadTimeBusiness_Input']>div").first()
    }
    
    async verifyBillingPlanDetails(){
        await this.beazleyBillingPlan().click();
        await this.name().waitFor();
        await expect(this.name()).toBeVisible();
        await expect(this.description()).toBeVisible();
    }
}