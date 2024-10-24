import { defineConfig, devices } from '@playwright/test';
import integConfig from './projects/integration/integration.config';
import bcConfig from './projects/billingcenter/billingcenter.config';
import pcConfig from './projects/policycenter/policycenter.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // viewport: { width: 1920, height: 900 },
    headless: true,
    channel: 'chrome',
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'off',
    acceptDownloads: true
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './projects', 
      testMatch: /auth\.setup\.ts/,
    },

    bcConfig,
    integConfig,
    pcConfig,
    
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
// 
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

  ]
});
