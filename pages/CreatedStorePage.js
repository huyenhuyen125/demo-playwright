export class CreatedStorePage {
  constructor(page) {
    this.page = page;

    this.textTitle = page.locator("//p[@class='register-finalweb-title']");
    this.dropChooseIndustry = page.locator("//button[@class='register-choose-industry']");
    this.textTitleIndustry = page.locator("//div[@class='popup-register-title']");
  }

  async getTextTitle() {
    await this.textTitle.waitFor({ state: 'visible' });
    return await this.textTitle.textContent();
  }

  async clickToDropChooseIndustry() {
    await this.dropChooseIndustry.waitFor({ state: 'visible' });
    this.dropChooseIndustry.click();
  }

  async gettextTitleIndustry() {
    await this.textTitleIndustry.waitFor({ state: 'visible' });
    return await this.textTitleIndustry.textContent();
  }

}