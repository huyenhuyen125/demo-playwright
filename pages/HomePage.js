export class HomePage {
   constructor(page) {
        this.page = page;
        this.btnRegister = page.locator("//li[@class='nav-item header-login login']");

    }

    
    async goToHomePage(url) {
        await this.page.goto(url);
    }

}