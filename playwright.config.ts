<<<<<<< HEAD
import { defineConfig, devices } from "@playwright/test";
=======
import { defineConfig, devices } from '@playwright/test';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
<<<<<<< HEAD
  testDir: "./e2e",
=======
  testDir: './e2e',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
<<<<<<< HEAD
  reporter: [["html"], ["list"], ["json", { outputFile: "test-results.json" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3001",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
=======
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3001',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  },

  /* Configure projects for major browsers */
  projects: [
    {
<<<<<<< HEAD
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
=======
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },

    /* Test against mobile viewports. */
    {
<<<<<<< HEAD
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
=======
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
<<<<<<< HEAD
    command: "npm run dev",
    url: "http://localhost:3001",
=======
    command: 'npm run dev',
    url: 'http://localhost:3001',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
