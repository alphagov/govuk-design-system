const configPaths = require('./lib/paths.js')

/**
 * @type {import('jest-environment-puppeteer').JestPuppeteerConfig}
 */
module.exports = {
  browserContext: 'incognito',

  /**
   * Puppeteer launch options
   */
  launch: {
    /**
     * Allow headless mode switching using `HEADLESS=false`
     * but default to `new` to skip deprecation warning
     *
     * {@link https://developer.chrome.com/articles/new-headless/}
     */
    headless: process.env.HEADLESS !== 'false'
      ? 'new'
      : false
  },

  /**
   * Development server options
   */
  server: {
    command: 'npm run serve',
    port: configPaths.port,

    // Skip when already running
    usedPortAction: 'ignore'
  }
}
