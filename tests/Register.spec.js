import { chromium } from '@playwright/test';
import { test, expect } from '../utils/BaseTest.js';
import { allure } from 'allure-playwright';
import logger from '../utils/logger.js';
import { DataTest } from '../data/DataTest.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { HomePage } from '../pages/Homepage.js';

test.describe('register Tests', () => {
    let homePage;
    let registerPage;
    let browser;
    let context;
    let page;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true });
        context = await browser.newContext();
        page = await context.newPage();

        registerPage = new RegisterPage(page);
        homePage = new HomePage(page);

        await homePage.goToHomePage(DataTest.url.Home);
        await registerPage.openRegisterTab();
    });


    test("Verify kiotviet page", async () => {
        logger.info('Verify kiotviet page');
        await expect(page).toHaveURL(DataTest.url.Home);
        await expect(page).toHaveTitle(DataTest.titlePages.titleHome);

    });

    test('verify items on the register screen', async () => {
        logger.info('verify items on the register screen');
        await expect(registerPage.getTextTitle()).resolves.toContain(DataTest.registerPage.textTitle);
            await registerPage.verifyTextboxFullnameEnable();
            await registerPage.verifyTextboxPhoneEnable();


    });

    test('Register successful', async () => {
        logger.info('input to textbox');
        await registerPage.inputToTextboxFullname(DataTest.inputUser.name);
        await registerPage.inputToTextboxPhone(DataTest.inputUser.phone);

        logger.info('select ToDropdown');
        await registerPage.selectToDropdownCountry(DataTest.inputUser.country);
        await registerPage.selectToDropdownArea(DataTest.inputUser.area);

        logger.info('check to checkbox');
        await registerPage.checkboxIsCheck();
        await registerPage.checkboxNotCheck();

        logger.info('skip capcha = manual');
        await registerPage.waitForTimeout(5000);

        logger.info('click button submit');
        await registerPage.clicktoButtonRegisterForm();

        logger.info('go to created Store Page');
  
    });

    test('Check registration failed', async () => {

        logger.info('not input data and click button submit ');
        await registerPage.clicktoButtonRegisterForm();
        await expect(registerPage.getErrorMessage(registerPage.errorMessage)).resolves.toContain(DataTest.errorMessage.notInputData);

        logger.info('Invalid phone number entered');
        await registerPage.registerTab.reload();
        await registerPage.inputToTextboxPhone(DataTest.inputUser.incorrectPhone);
        await registerPage.clicktoButtonRegisterForm();
        await expect(registerPage.getErrorMessage(registerPage.errorMessagePhone)).resolves.toContain(DataTest.errorMessage.invalidPhone);

        logger.info('incorrect captcha entry');
        await registerPage.registerTab.reload();
        await registerPage.inputToTextboxFullname(DataTest.inputUser.name);
        await registerPage.inputToTextboxPhone(DataTest.inputUser.phone);
        await registerPage.selectToDropdownCountry(DataTest.inputUser.country);
        await registerPage.selectToDropdownArea(DataTest.inputUser.area);
        await registerPage.checkboxIsCheck();
        await registerPage.inputToCaptcha(DataTest.inputUser.incorrectCaptcha);
        await registerPage.clicktoButtonRegisterForm();
        await expect(registerPage.getErrorMessage(registerPage.errorMessage)).resolves.toContain(DataTest.errorMessage.incorrectCaptcha);


    });


});