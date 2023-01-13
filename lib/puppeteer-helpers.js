const configPaths = require('../lib/paths.js')

const PORT = configPaths.testPort

/**
 * Navigate to path
 *
 * @param {import('puppeteer').Page} page - Puppeteer page object
 * @param {URL['pathname']} path - URL path
 * @returns {Promise<import('puppeteer').Page>} Puppeteer page object
 */
async function goTo (page, path) {
  const { href } = new URL(path, `http://localhost:${PORT}`)

  // Navigate to blank page first to fix same page
  // hash fragment changes (window.location.hash)
  await page.goto('about:blank')

  // Navigate to page
  await page.goto(href)
  await page.bringToFront()

  return page
}

/**
 * Get attribute value for element
 *
 * @param {import('puppeteer').ElementHandle} $element - Puppeteer element handle
 * @param {string} attributeName - Attribute name to return value for
 * @returns {Promise<string | null>} Attribute value
 */
function getAttribute ($element, attributeName) {
  return $element.evaluate((el, name) => el.getAttribute(name), attributeName)
}

/**
 * Get property value for element
 *
 * @param {import('puppeteer').ElementHandle} $element - Puppeteer element handle
 * @param {string} propertyName - Property name to return value for
 * @returns {Promise<unknown>} Property value
 */
async function getProperty ($element, propertyName) {
  const handle = await $element.getProperty(propertyName)
  return handle.jsonValue()
}

/**
 * Check if element is visible
 *
 * @param {import('puppeteer').ElementHandle} $element - Puppeteer element handle
 * @returns {Promise<boolean>} Element visibility
 */
async function isVisible ($element) {
  return !!await $element.boundingBox()
}

module.exports = {
  goTo,
  getAttribute,
  getProperty,
  isVisible
}
