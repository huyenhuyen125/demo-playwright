import logger from '../utils/logger.js';
import { BasePage } from './BasePage.js';
export class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        this.btnRegister = page.locator("//li[@class='nav-item header-login login']");
    }

    async openRegisterTab() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.clickToElement(this.btnRegister)
        ]);
        this.registerTab = newPage;
        await this.registerTab.waitForLoadState();

        logger.info('create new page');
        this.textTitle = this.registerTab.locator("//div[@class='new-register-top']/a");
        this.inputFullname = this.registerTab.locator("//input[@id='fullname']");
        this.inputPhone = this.registerTab.locator("#phone");
        this.selectTelephoneCountry = this.registerTab.locator("//div[@role='combobox']");
        this.selectCountry = this.registerTab.locator("//span[@id='wrap-input-country']");
        this.selectArea = this.registerTab.locator("//span[@id='wrap-input-address']");
        this.dropdownOptionXPath = `//li[contains(text(),'{{optionText}}')]`;
        this.checkbox = this.registerTab.locator('.terms-policies-checkbox');
        this.btnRegisterForm = this.registerTab.locator("//button[text()=' Tiếp tục ']");
        this.errorMessage = this.registerTab.locator("//span[@class='front-register-error']");
        this.errorMessagePhone = this.registerTab.locator("//label[@id='phone-error']");
        this.captcha = this.registerTab.locator("//input[@id='authentication_code']");
    }


    async getTextTitle() {
        return await this.getText(this.textTitle);
    }

    async getErrorMessage(locator) {
        return await this.getText(locator);
    }

    async verifyTextboxFullnameEnable() {
        return await this.isEnabled(this.inputFullname);
    }

    async verifyTextboxPhoneEnable() {
        return await this.isEnabled(this.inputPhone);
    }

    async inputToTextboxFullname(name) {
        await this.inputToTextbox(this.inputFullname, name);
    }

    async inputToCaptcha(captcha) {
        await this.inputToTextbox(this.captcha, captcha);
    }

    async inputToTextboxPhone(phone) {
        await this.inputToTextbox(this.inputPhone, phone);
    }

    async clicktoButtonRegisterForm() {
        await this.clickToElement(this.btnRegisterForm);
    }

    async selectToDropdownCountry(countryName) {
        await this.selectDropdownNewPage(this.selectCountry, countryName);
    }

    async selectToDropdownArea(areaName) {
         await this.selectDropdownNewPage(this.selectArea,areaName);
    }

    async checkboxIsCheck() {
        const status = await this.checkStatusCheckbox();
        if (!status) {
            await this.checkbox.check({ force: true });
            logger.debug('checkbox Is Check');
        }
    }
    
    async checkboxNotCheck() {
        const status = await this.checkStatusCheckbox();
        if (status) {
            await this.checkbox.check({ force: true });
            logger.debug('checkbox Not Check');
        }
    }

    async checkStatusCheckbox() {
        const isChecked = await this.checkbox.isChecked();
        return isChecked;
    }

    async selectDropdownNewPage(dropdownLocator, optionText) {
        await dropdownLocator.click();
        const dynamicXPath = this.dropdownOptionXPath.replace('{{optionText}}', optionText);
        const optionLocator = this.registerTab.locator(dynamicXPath);
        await optionLocator.waitFor({ state: 'visible' });
        await optionLocator.click();
    }






}