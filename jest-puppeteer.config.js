const { ports } = require('./config')

/**
 * @type {import('jest-environment-puppeteer').JestPuppeteerConfig}
 */
module.exports = {
  browserContext: 'incognito',

  /**
   * Puppeteer launch options
   */
  launch: {
    args: [
      /**
       * Prevent empty Chrome startup window
       * Tests use their own `browser.newPage()` instead
       */
      '--no-startup-window'
    ],

    /**
     * Allow headless mode switching using `HEADLESS=false`
     *
     * {@link https://developer.chrome.com/articles/new-headless/}
     */
    headless: process.env.HEADLESS !== 'false',

    // See launch arg '--no-startup-window'
    waitForInitialPage: false
  },

  /**
   * Development server options
   */
  server: {
    command: 'npm run serve',
    port: ports.preview,

    // Allow 30 seconds to start server
    launchTimeout: 30000,

    // Skip when already running
    usedPortAction: 'ignore'
  }
}
