import { Locator, Page } from "@playwright/test";

export class PageUtils {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    dropdown(): Locator{return this.page.locator('div[class*="gw-subMenu gw-open"] div[class*="gw-action--inner"]');}
     
    async selectDropdown(value: string) {
        await this.dropdown().getByText(value).click();
    }

    async clickElement(element:Locator){
        await element.waitFor({state:"visible"})
        await element.click();
    }
 
    async enterText(element:Locator,value: string){
        await element.waitFor({state:"visible"})
        await element.fill(value);
    }
}