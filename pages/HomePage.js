import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

    }

    async goToHomePage(url) {
        await this.page.goto(url);
    }

}