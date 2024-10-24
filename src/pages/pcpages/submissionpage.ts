import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../helper/componentLibrary/pageUtils";
import { AccountPage } from "./accountpage";
import { HomePage } from "./homepage";

export class SubmissionPage {
    readonly page : Page;
    readonly homePage: HomePage;
    readonly accountPage: AccountPage;
    readonly pageUtils: PageUtils;

    readonly selectButton: string;
    readonly idNumberFormat: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.accountPage = new AccountPage(page);
        this.pageUtils = new PageUtils(page);
        this.homePage = new HomePage(page);
        
        this.selectButton = 'td[id*="Select"] div[role="button"]';
        this.idNumberFormat = /^\d{10}$/;
    }

    visualisedProductsTab(): Locator {return this.page.locator('div[aria-label="Visualized Products"]')}
    tableRows(): Locator{return this.page.locator('table tbody tr')}
    productNames(): Locator{return this.page.locator('td[id*="Name_Cell"] div[class="gw-value-readonly-wrapper"]')}
    selectProduct(value: string): Locator {
        let selectButton: Locator =  this.tableRows().filter({ has: this.productNames().getByText(value)}).locator(this.selectButton);
        return selectButton;
    }
    nextButton(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Next')}
    quoteButton(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Quote')}
    bindOptions(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Bind Options')}
    closeOptions(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Close Options')}
    submissionId(): Locator{return this.page.locator('div[class="gw-Wizard--Title"]')}
    submStatus(): Locator{return this.page.locator('div[class="gw-Wizard--SubTitle"]')}

    viewPolicy(): Locator{return this.page.locator('div[data-gw-click*="ViewPolicy"]')}
    sourceDrpdwn(): Locator{return this.page.locator('select[name*="CancelPolicyDV-Source"]')}
    reasonDrpdwn(): Locator{return this.page.locator('select[name*="CancelPolicyDV-Reason"]')}
    startCancellationBtn(): Locator{return this.page.locator('div[role="button"] div[aria-label="Start Cancellation"]')}

    async createSubmission(accNumber: string): Promise<string> {
        await this.page.pause();
        await this.homePage.account().locator(this.homePage.expandButton).click();
        await this.accountPage.accountSearch().fill(accNumber);
        await this.accountPage.accountSearch().press("Enter");

        await this.homePage.actions().click();
        await this.pageUtils.selectDropdown("New Submission");

        await this.visualisedProductsTab().click();
        await this.selectProduct("Directors and Officers Liability")
            .click();

        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Policy Info" })
            .waitFor({ state: "visible" });
        await this.nextButton().click(); //Policy Info'

        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Risk Details" })
            .waitFor({ state: "visible" });
        await this.nextButton().click(); //Risk Details

        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Pricing" })
            .waitFor({ state: "visible" });
        await this.nextButton().click(); //Pricing

        return (await this.submissionId().innerText()).split(
            " "
        )[1];
    }

    async quoteSubmission() {
        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Risk Analysis" })
            .waitFor({ state: "visible" });
        await this.nextButton().click(); //Risk Analysis

        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Policy Review" })
            .waitFor({ state: "visible" });
        await this.quoteButton().click(); //Policy Review

        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Quote" })
            .waitFor({ state: "visible" });
    }

    async issuePolicy() {
        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Quote" })
            .waitFor({ state: "visible" });
        await this.nextButton().click(); //Quote

        await this.page.waitForLoadState("networkidle");
        await this.page
            .getByRole("heading", { name: "Forms" })
            .waitFor({ state: "visible" });
        await this.nextButton().click(); //Forms

        await this.page.waitForLoadState("networkidle");
        await this.homePage.pageTitle().getByText("Payment").waitFor({ state: "visible" });
        await this.bindOptions().click(); //Payment

        await this.page.on("dialog", async (dialog) => dialog.accept());
        await this.pageUtils.selectDropdown("Issue Policy");
    }

    async cancelPolicy() {
        await this.viewPolicy().click();
        await expect(this.homePage.pageTitle()).toContainText("Policy Summary");

        await this.homePage.actions().click();
        await this.pageUtils.selectDropdown("Cancel Policy");
        await expect(this.homePage.pageTitle()).toContainText("Start Cancellation");

        await this.sourceDrpdwn().selectOption({ index: 1 });
        await this.page.waitForTimeout(500)
        await this.reasonDrpdwn().selectOption({ index: 4 });
        await this.startCancellationBtn().click();

        await this.page.waitForLoadState("load");
        await expect(this.homePage.pageTitle()).toHaveText("Confirmation");

        await this.bindOptions().click();
        await this.pageUtils.selectDropdown("Cancel Now");
    }
}