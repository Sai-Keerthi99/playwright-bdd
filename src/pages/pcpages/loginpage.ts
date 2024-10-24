import { Locator, Page } from "@playwright/test";

export class LoginPage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }
     
    username() : Locator {return this.page.locator('input[name="Login-LoginScreen-LoginDV-username"]');}
    password() : Locator{return this.page.locator('input[type="password"]');}
    gwLogo() : Locator{return this.page.locator('div[id="gw-customer--logo"]');}
    loginButton() : Locator{return this.page.getByText('LILog In');}
    errorMessage() : Locator{return this.page.locator('#Login-LoginScreen-LoginFormMessage div')}

    async userLogin(user: any) {
        await this.username().fill(user.username);
        await this.password().fill(user.password);
        await this.loginButton().click();
    }
}