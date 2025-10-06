import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120000, 
   expect: {
    timeout: 10000,
  },
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', 
    viewport: null,
    
    launchOptions: {
      args: [    
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--ignore-certificate-errors',
        '--start-maximized',
      ], 
    },

  },
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ],
});