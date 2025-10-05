import { chromium } from '@playwright/test';
import { test, expect } from '../utils/BaseTest.js';
import { allure } from 'allure-playwright';
import logger from '../utils/logger.js';
import { DataTest } from '../data/DataTest.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { HomePage } from '../pages/Homepage.js';
import { CreatedStorePage } from '../pages/CreatedStorePage.js';

test.describe('register Tests', () => {
    let homePage;
    let createdStorePage;
    let registerPage;
    let browser;
    let context;
    let page;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();

        registerPage = new RegisterPage(page);
        homePage = new HomePage(page);

        await homePage.goToHomePage(DataTest.url.Home);
        await registerPage.openRegisterTab();
    });

    test.afterAll(async () => {

    });

    test.beforeEach(async () => {

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

    // test('Register successful', async () => {
    //     logger.info('input to textbox');
    //     await registerPage.inputToTextboxFullname("NGUYEN THI HUYEN");
    //     // await registerPage.selectToDropdownTelephoneCountry("Laos");
    //     await registerPage.inputToTextboxPhone("0397706493");

    //     logger.info('select ToDropdown');
    //     await registerPage.selectToDropdownCountry("Laos");
    //     await registerPage.selectToDropdownArea("Bokeo");

    //     logger.info('check to checkbox');
    //     await registerPage.checkboxIsCheck();
    //     await registerPage.checkboxNotCheck();

    //     logger.info('skip capcha = manual');
    //     await registerPage.waitForTimeout(5000);

    //     logger.info('click button submit');
    //     await registerPage.clicktoButtonRegisterForm();

    //     logger.info('go to created Store Page');

    //     createdStorePage = new CreatedStorePage(page);

    //     await registerPage.waitForTimeout(15000);
    //     logger.info('click to Drop Choose Industry ');
    //     await page.pause();
    //     await createdStorePage.clickToDropChooseIndustry();

    //     await expect(createdStorePage.gettextTitleIndustry()).resolves.toContain("Hãy chọn ngành hàng kinh doanh của bạn");
    //     await page.pause();
    // });

    // test('Check registration failed', async () => {

    //     logger.info('not input data and click button submit ');
    //     await registerPage.clicktoButtonRegisterForm();
    //     await expect(registerPage.getErrorMessage(registerPage.errorMessage)).resolves.toContain(" Vui lòng nhập đầy đủ thông tin");

    //     logger.info('Invalid phone number entered');
    //     await registerPage.registerTab.reload();
    //     await registerPage.inputToTextboxPhone("123");
    //     await registerPage.clicktoButtonRegisterForm();
    //     await expect(registerPage.getErrorMessage(registerPage.errorMessagePhone)).resolves.toContain("Số điện thoại không đúng định dạng");

    //     logger.info('incorrect captcha entry');
    //     await registerPage.registerTab.reload();
    //     await registerPage.inputToTextboxFullname("NGUYEN THI HUYEN");
    //     await registerPage.inputToTextboxPhone("0397706493");
    //     await registerPage.selectToDropdownCountry("Laos");
    //     await registerPage.selectToDropdownArea("Bokeo");
    //     await registerPage.checkboxIsCheck();
    //     await registerPage.inputToCaptcha("123");
    //     await registerPage.clicktoButtonRegisterForm();
    //     await expect(registerPage.getErrorMessage(registerPage.errorMessage)).resolves.toContain(" Mã xác thực chưa chính xác");


    // });


});