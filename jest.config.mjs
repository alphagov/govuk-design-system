export default {
  preset: 'jest-puppeteer',

  // Custom matchers
  setupFilesAfterEnv: ['./config/jest/matchers.js'],

  // Environment defaults for JSDOM
  testEnvironmentOptions: {
    url: 'https://design-system-hmlr.service.gov.uk'
  },

  // Enable GitHub Actions reporter UI
  reporters: ['default', 'github-actions'],

  // Test timeout increased (5s to 15s)
  testTimeout: 15000,

  // Ignore built fixtures during `--watch`
  watchPathIgnorePatterns: ['fixtures/build']
}
