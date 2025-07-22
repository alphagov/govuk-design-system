import jestPuppeteerConfig from './jest-puppeteer.config.js'

// Detect when browser has been launched headless
const { headless } = jestPuppeteerConfig.launch

/**
 * Jest config
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  preset: 'jest-puppeteer',

  // Reduce CPU usage during project test runs
  maxWorkers: headless
    ? '50%' // Matches Jest default (50%) via `--watch`
    : 1, // Use only 1x browser window when headless

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
  transformIgnorePatterns: ['/node_modules/(?!(marked)/)'],

  // Ignore built fixtures during `--watch` and node_modules folders
  watchPathIgnorePatterns: ['fixtures/build', '/node_modules/']
}
