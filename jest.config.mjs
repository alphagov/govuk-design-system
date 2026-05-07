import os from 'node:os'

import jestPuppeteerConfig from './jest-puppeteer.config.js'

// Detect when browser has been launched headless
const { headless } = jestPuppeteerConfig.launch
const cpuCount = os.availableParallelism?.() ?? os.cpus().length
const defaultA11yAuditConcurrency = process.env.CI
  ? Math.min(4, cpuCount)
  : Math.min(8, Math.max(2, Math.floor(cpuCount / 2)))

const configuredA11yAuditConcurrency = Number(
  process.env.A11Y_AUDIT_CONCURRENCY
)
const maxConcurrency = Number.isFinite(configuredA11yAuditConcurrency)
  ? Math.max(1, configuredA11yAuditConcurrency)
  : defaultA11yAuditConcurrency

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

  // Limit concurrent tests in the same file to avoid overloading Puppeteer.
  maxConcurrency,

  // Enable Babel transforms until Jest supports ESM
  // See: https://jestjs.io/docs/ecmascript-modules
  testMatch: ['**/*.test.{js,mjs}'],
  transform: { '^.+\\.m?js$': ['babel-jest'] },
  transformIgnorePatterns: ['/node_modules/(?!(marked)/)'],

  // Ignore built fixtures during `--watch` and node_modules folders
  watchPathIgnorePatterns: ['fixtures/build', '/node_modules/']
}
