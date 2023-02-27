export default {
  preset: 'jest-puppeteer',

  // Custom matchers
  setupFilesAfterEnv: ['./config/jest/matchers.js'],

  // Environment defaults for JSDOM
  testEnvironmentOptions: {
    url: 'https://design-system.service.gov.uk'
  },

  // Enable GitHub Actions reporter UI
  reporters: ['default', 'github-actions'],

  // Test timeout increased (5s to 15s)
  testTimeout: 15000,

  // Enable Babel transforms until Jest supports ESM
  // See: https://jestjs.io/docs/ecmascript-modules
  testMatch: ['**/*.test.{js,mjs}'],
  transform: { '^.+\\.m?js$': ['babel-jest'] },

  // Ignore built fixtures during `--watch`
  watchPathIgnorePatterns: ['fixtures/build']
}
