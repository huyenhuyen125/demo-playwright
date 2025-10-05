import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,  // Chạy test ở chế độ không hiển thị trình duyệt
    launchOptions: {
      args: ['--start-maximized'], // Chỉ có tác dụng với Chromium
    },
    viewport: null // Giữ kích thước gốc của trình duyệt
    // viewport: { width: 1920, height: 1080  },
    //   launchOptions: {
    //     slowMo: 500 // Làm chậm thao tác để dễ quan sát (500ms mỗi thao tác)
    // }
  },
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }], // bắt buộc
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ],
});