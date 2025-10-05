import { test as base, expect } from '@playwright/test';
import logger from './logger.js';
import { allure } from 'allure-playwright'; // ❌ Không export ra nữa

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if (testInfo.status !== testInfo.expectedStatus) {
      const fileName = testInfo.title.replace(/\s+/g, '_') + '.png';
      const path = `screenshots/${fileName}`;
      await page.screenshot({ path, fullPage: true });
      logger.error(`❌ Test failed: ${testInfo.title}`);
      // Thêm ảnh vào allure trực tiếp
      allure.attachment('Screenshot', path, 'image/png');
    } else {
      logger.info(`✅ Test passed: ${testInfo.title}`);
    }
  },
});

export { expect }; // chỉ export expect