/* eslint-env jest */

const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../config/paths.json')
const PORT = configPaths.testPort

let page
let baseUrl = 'http://localhost:' + PORT

beforeAll(async () => {
  page = await setupPage()
})

afterAll(async () => {
  await page.close()
})

const BACK_TO_TOP_LINK_SELECTOR = '[data-module="app-back-to-top"] a'

describe('Back to top', () => {
  it('is always visible when JavaScript is disabled', async () => {
    await page.setJavaScriptEnabled(false)
    await page.goto(`${baseUrl}/styles/typography/`, { waitUntil: 'load' })
    const isBackToTopVisible = await page.waitForSelector(BACK_TO_TOP_LINK_SELECTOR, { visible: true })
    expect(isBackToTopVisible).toBeTruthy()
  })
  it('is hidden when at the top of the page', async () => {
    await page.goto(`${baseUrl}/styles/typography/`, { waitUntil: 'load' })
    const isBackToTopHidden = await page.waitForSelector(BACK_TO_TOP_LINK_SELECTOR, { visible: false })
    expect(isBackToTopHidden).toBeTruthy()
  })
  it('is visible when at the bottom of the page', async () => {
    await page.goto(`${baseUrl}/styles/typography/`, { waitUntil: 'load' })
    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))
    const isBackToTopVisible = await page.waitForSelector(BACK_TO_TOP_LINK_SELECTOR, { visible: true })
    expect(isBackToTopVisible).toBeTruthy()
  })
  it('goes back to the top of the page when interacted with', async () => {
    await page.goto(`${baseUrl}/styles/typography/`, { waitUntil: 'load' })
    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))
    // Make sure the back to top component is available to click
    await page.waitForSelector(BACK_TO_TOP_LINK_SELECTOR, { visible: true })
    await page.click(BACK_TO_TOP_LINK_SELECTOR)
    const isAtTopOfPage = await page.evaluate(() => window.scrollY === 0)
    expect(isAtTopOfPage).toBeTruthy()
  })
})
