const { ports } = require('./config')

/**
 * @type {import('jest-environment-puppeteer').JestPuppeteerConfig}
 */
module.exports = {
  browserContext: 'incognito',

  /**
   * TEMPORARY: Disable puppeteer exiting when an error happens on the page,
   * making tests fail when GTM throws an error in its execution
   */
  exitOnPageError: false,

  /**
   * Puppeteer launch options
   */
  launch: {
    /**
     * Allow headless mode switching using `HEADLESS=false`
     *
     * {@link https://developer.chrome.com/articles/new-headless/}
     */
    headless: process.env.HEADLESS !== 'false'
  },

  /**
   * Development server options
   */
  server: {
    command: 'npm run serve',
    port: ports.preview,

    // Skip when already running
    usedPortAction: 'ignore'
  }
}
