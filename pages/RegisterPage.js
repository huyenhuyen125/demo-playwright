import logger from '../utils/logger.js';
export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.btnRegister = page.locator("//li[@class='nav-item header-login login']");


        this.registerTab = null;
        this.textTitle = null;
        this.inputFullname = null;
        this.inputPhone = null;
        this.inputEmail = null;
        this.btnSubmit = null;
        this.selectCountry = null;
        this.selectArea = null;
        this.dropdownOptionXPath = null;
        this.checkbox = null;
        this.selectTelephoneCountry = null;
        this.errorMessage = null;
        this.errorMessagePhone = null;
        this.captcha = null;
    }

    async openRegisterTab() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.btnRegister.click()
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


    // async selectToDropdownTelephoneCountry(telephoneCountry) {
    //       await this.selectTelephoneCountry.click();
    //     const optionLocator = this.registerTab.locator(this.selectTelephoneCountryName);
    //     await optionLocator.waitFor({ state: 'visible' });
    //     await optionLocator.click();



    // }

    async getTextTitle() {
        await this.textTitle.waitFor({ state: 'visible' });
        return await this.textTitle.textContent();
    }
    async verifyTextboxFullnameEnable() {
        await this.inputFullname.isEnabled();
    }
    async verifyTextboxPhoneEnable() {
        await this.inputPhone.isEnabled();
    }

    async inputToTextboxFullname(name) {
        await this.inputFullname.fill(name);
    }


    async inputToCaptcha(captcha) {
        await this.captcha.fill(captcha);
    }


    async inputToTextboxPhone(phone) {
        await this.inputPhone.fill(phone);
    }

    async clicktoButtonRegisterForm() {
        await this.btnRegisterForm.click();
    }

    async waitForTimeout(time) {
        await this.registerTab.waitForTimeout(time);
    }



    async selectToDropdownCountry(countryName) {
        await this.selectDropdown(this.selectCountry, countryName);

    }

    async selectToDropdownArea(areaName) {
        await this.selectDropdown(this.selectArea, areaName);

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


    async selectDropdown(dropdownLocator, optionText) {
        await dropdownLocator.click();
        const dynamicXPath = this.dropdownOptionXPath.replace('{{optionText}}', optionText);
        const optionLocator = this.registerTab.locator(dynamicXPath);
        await optionLocator.waitFor({ state: 'visible' });
        await optionLocator.click();
    }


    async getErrorMessage(locator) {
        await locator.waitFor({ state: 'visible' });
        return await locator.textContent();
    }



}