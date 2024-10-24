import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../helper/componentLibrary/pageUtils";
import { policyCenter } from "../../helper/componentLibrary/urls";

export class AccountPage extends PageUtils{
    page: Page;
 
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    account(): Locator{return this.page.locator('div[id="TabBar-AccountTab"]');}
    accountSubMenu(): Locator{
        return this.page.locator('div[id="TabBar-AccountTab"] div[data-gw-click="toggleSubMenu"]')
    }
    accountSearch() : Locator {
        return this.page.locator('input[name*="AccountTab_AccountNumberSearchItem"]');
    }
    errorMessage(): Locator{return this.page.locator('div[class*="gw-MessagesWidget--group-error"] div[class="gw-message"]');}
    missingFieldErrorMessage(): Locator{return this.page.locator('div .gw-message');}
    messagesWidget(): Locator{return this.page.locator('div[class*="gw-MessagesWidget--subGroup-header"]')}
    dropdown(): Locator{return this.page.locator('div[class*="gw-subMenu gw-open"] div[class*="gw-action--inner"]');}
    pageTitle(): Locator {
        return this.page.locator('div[class="gw-TitleBar--title"]');
    }

    company(): Locator{return this.page.locator('div[id*="GlobalContactNameInputSet"] input');}
    firstName():Locator {return this.page.locator('.gw-vw--value input[name*="FirstName"][type="text"]');}
    lastName():Locator {return this.page.locator('input[name*="LastName"][type="text"]');}
    country():Locator {return this.page.locator('select[name*="GlobalAddressInputSet-Country"]');}
    city():Locator {return this.page.locator('input[name*="City"][type="text"]');}
    state(): Locator {return this.page.locator('select[name*="State"]')}
    postalCode():Locator {return this.page.locator('input[name*="PostalCode"][type="text"]');}
    searchButton():Locator {return this.page.getByRole('button', { name: 'Search' });}
    searchResults(): Locator {
        return this.page.locator('div[id*="NewAccountSearchResultsLV"][role="group"]')
    }
    searchResultAccNum(): Locator {
        return this.page.locator('div[role="button"][id*="AccountNumber_button"]')
    }
    createAccountButton():Locator {return this.page.getByRole('button', { name: 'Create New Account' });}
    createAccountOptionMenu():Locator {return this.page.getByRole('button', { name: 'Create New Account' });}
    homePhone():Locator{return this.page.locator('input[name*="HomePhone"]');}
    workPhone(): Locator{return this.page.locator('input[name*="CreateAccountContactInputSet-Phone-GlobalPhoneInputSet"]');}
    mobilePhone():Locator{return this.page.locator('input[name*="CellPhone"]');}
    primaryPhone(): Locator{return this.page.locator('select[name*="PrimaryPhone"]')}
    primaryEmail(): Locator{return this.page.locator('input[name*="EmailAddress1"]')}
    addressLine1():Locator {return this.page.locator('input[name*="AddressLine1"]');}
    addressType():Locator {return this.page.locator('select[name="CreateAccount-CreateAccountScreen-CreateAccountDV-AddressType"]');}
    organization():Locator {return this.page.locator('input[name*="GlobalContactNameInputSet-Name"]');}
    orgSearch():Locator {return this.page.locator('#CreateAccount-CreateAccountScreen-CreateAccountDV-ProducerSelectionInputSet-Producer-SelectOrganization');}
    updateButton():Locator {return this.page.getByText('Update');}
    
    producerCode(): Locator {return this.page.locator('select[name="CreateAccount-CreateAccountScreen-CreateAccountDV-ProducerSelectionInputSet-ProducerCode"]');}
    orgPageTitle(): Locator {
        return this.page.locator('div[class="gw-TitleBar--title"]').getByText("Organizations");
    }
    orgNameSearch() : Locator {return this.page.locator('div[id*="SearchLinksInputSet-Search"][role="button"]');}
    orgSelect() : Locator {return this.page.getByText('Select');}
    accountHolderPostCreation() : Locator {return this.page.locator('#AccountFile_Summary-AccountSummaryDashboard-AccountDetailsDetailViewTile-AccountDetailsDetailViewTile_DV-AccountHolder_button')}
    detailsTitle(): Locator {return this.page.locator('div[aria-label="Details"] span[class="gw-TitleText"]')}
    accountHolder(): Locator {return this.page.locator('div[id*="AccountHolder_Input"] div[class*="gw-ActionValueWidget"]')}
    createdAccountName() : Locator {return this.page.locator('#NewAccount-NewAccountScreen-NewAccountSearchResultsLV-0-Name div .gw-value-readonly-wrapper')}
    accountNumber(): Locator {return this.page.locator('div[id*="AccountNumber"][class*="gw-TextValueWidget"]')}

    officePhone() : Locator {return this.page.locator('input[name*="CreateAccountContactInputSet-Phone"]')}
    serviceTier() : Locator {return this.page.locator('select[name*="ServiceTier"]');}
    orgType() : Locator {return this.page.locator('select[name*="OrgType"]')}

    async createAccount(account : any) {
        await this.accountSubMenu().waitFor({ state: "visible" });
        await this.accountSubMenu().click();
       
        await this.dropdown().getByText("New Account").click({ delay: 500 });
        await this.clickElement(this.accountSubMenu());
 
        await expect(
            this.pageTitle().getByText("Enter Account Information")
        ).toBeVisible();
        let companyName = account.companyAccountUS.companyName;
        await this.company().fill(companyName);
        await this.page.pause();
        await this.searchButton().click();
        
        await this.createAccountButton().waitFor({ state: "visible" });
        if (await this.searchResults().isVisible()) {
            return await this.searchResultAccNum().first().innerText();
        }
        await this.createAccountButton().hover();
        await this.createAccountButton().click();
        await this
            .dropdown()
            .getByText(account.companyAccountUS.account)
            .click();

        await this.officePhone().fill(account.companyAccountUS.officePhone);
        await this.primaryEmail().fill(account.companyAccountUS.primaryEmail);

        await this.page.waitForLoadState("load");
        const apiResPromise = this.page.waitForResponse(
            (response) =>
            response.url() === `${policyCenter}` &&
            response.status() === 200 &&
            response.request().resourceType() === "fetch"
        );
        await this.country().selectOption(account.companyAccountUS.country);
        await apiResPromise;

        await this.addressLine1().fill(account.companyAccountUS.address1);
        await this.city().fill(account.companyAccountUS.city);
        if (companyName.includes("US")) {
            await this.state().selectOption(account.companyAccountUS.state);
        }
        await this.postalCode().fill(account.companyAccountUS.postalCode);

        await this
            .addressType()
            .selectOption(account.companyAccountUS.addressType);
        await this.orgType().selectOption(account.companyAccountUS.orgType);

        await this.page.waitForLoadState("load");
        await this.orgSearch().click();

        await this.orgPageTitle().waitFor({ state: "visible" });
        await this.organization().fill(account.companyAccountUS.organization);
        await this.orgNameSearch().click();
        await this.orgSelect().click();
        await this.page.waitForLoadState("networkidle");
        await this
            .producerCode()
            .selectOption(account.companyAccountUS.producerCode);

        await this.updateButton().click();
        await this.page.waitForLoadState("networkidle");

        await this.accountHolder().waitFor({ state: "visible" });
        return  await this.accountNumber().innerText();
    }
}