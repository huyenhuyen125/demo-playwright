import logger from '../utils/logger.js';
export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async isEnabled(locator) {
        return await locator.isEnabled();
    }
    async isEnabled(locator) {
        return await locator.isEnabled();
    }

    async inputToTextbox(locator, name) {
        await locator.fill(name);
    }

    async clickToElement(locator) {
        await locator.click();
    }
    async doubleClick(locator) {
        await locator.dblclick();
    }

    async waitForTimeout(locator, time) {
        await locator.waitForTimeout(time);
    }
    async waitForVisible(locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async waitForHidden(locator) {
        await locator.waitFor({ state: 'hidden' });
    }

    async getText(locator) {
        await locator.waitFor({ state: 'visible' });
        return await locator.textContent();
    }
    async getAttribute(locator, attrName) {
        return await locator.getAttribute(attrName);
    }

    async getValue(locator) {
        return await locator.inputValue();
    }

    async selectDropdown(dropdownLocator, optionText) {
        await dropdownLocator.click();
        const dynamicXPath = this.dropdownOptionXPath.replace('{{optionText}}', optionText);
        const optionLocator = this.registerTab.locator(dynamicXPath);
        await optionLocator.waitFor({ state: 'visible' });
        await optionLocator.click();
    }
    async selectDropdownByText(dropdownLocator, dynamicLocator, text) {
        await dropdownLocator.click();
        const locator = dynamicLocator.replace('{{optionText}}', text);
        const optionLocator = this.page.locator(locator);
        await optionLocator.waitFor({ state: 'visible' });
        await optionLocator.click();
    }

    async hover(locator) {
        await locator.hover();
    }
    async pressKey(locator, key) {
        await locator.press(key);
    }
    async clear(locator) {
        await locator.fill('');
    }

    async check(locator) {
        if (!(await locator.isChecked())) {
            await locator.check();
        }
    }

    async uncheck(locator) {
        if (await locator.isChecked()) {
            await locator.uncheck();
        }
    }

    async scrollToElement(locator) {
        await locator.scrollIntoViewIfNeeded();
    }


}