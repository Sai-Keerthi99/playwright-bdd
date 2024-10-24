import { Locator, Page } from "@playwright/test";

export class HomePage {
    page : Page
    readonly expandButton : string;

    constructor(page: Page) {
        this.page = page;
        this.expandButton = 'div[class="gw-icon gw-icon--expand"]';
    }
    desktop(): Locator {
        return this.page.locator('div[id="TabBar-DesktopTab"]')
    }
    account(): Locator {
        return this.page.locator('div[id="TabBar-AccountTab"]')
    }
    accountSearch() : Locator {
        return this.page.locator('input[name*="AccountTab_AccountNumberSearchItem"]');
    }
    policy(): Locator {
        return this.page.locator('div[id="TabBar-PolicyTab"]')
    }
    pageTitle(): Locator {
        return this.page.locator('div[class="gw-TitleBar--title"]');
    }
    actions(): Locator {
        return this.page.getByRole('button', { name: 'Actions' })
    }

    moreOptionsButton(): Locator{
        return this.page.locator('div[aria-label="more options"]')
    }

    administrationTab():Locator{
        return this.page.locator('div[id="TabBar-AdministrationTab"]')
    }

    businessSettings():Locator{
        return this.page.locator('div#TabBar-AdministrationTab-Admin_BusinessSettings')
    }

    billingPlans():Locator{
        // return this.page.locator('div[aria-label="Billing Plans"]')
        return this.page.getByLabel('Billing Plans').last();
    }

    async navigateToHomePage() {
        await this.page.goto("https://pc-dev-bzlyusdev.beazleyus.dev-1.us-east-1.guidewire.net/PolicyCenter.do");//`${policyCenter}`);
    }

    async navigateToAdminstration(){

        await this.moreOptionsButton().waitFor({ state: "visible" });
        await this.moreOptionsButton().click();
        await this.administrationTab().hover();
    }

    async navigateToBillingPlans(){
        await this.navigateToAdminstration();
        await this.businessSettings().waitFor({timeout:5000, state: "visible" });
        await this.businessSettings().hover();
        await this.billingPlans().click();    
    }

}