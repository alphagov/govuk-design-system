/* eslint-env jest */
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']
const configPaths = require('../config/paths.json')
const PORT = configPaths.port

let browser
let page
let baseUrl = 'http://localhost:' + PORT

beforeAll(async (done) => {
  browser = global.browser
  page = await browser.newPage()
  await page.emulate(iPhone)
  done()
})

afterAll(async (done) => {
  await page.close()
  done()
})

describe('Homepage', () => {
  describe('when JavaScript is unavailable or fails', () => {
    it('falls back to making the navigation visible', async () => {
      await page.setJavaScriptEnabled(false)
      await page.goto(baseUrl, { waitUntil: 'load' })
      const isMobileNavigationVisible = await page.waitForSelector('.js-app-mobile-nav', { visible: true, timeout: 1000 })
      expect(isMobileNavigationVisible).toBeTruthy()
    })
  })

  describe('when JavaScript is available', () => {
    describe('when menu button is pressed', () => {
      it('should indicate the open state of the toggle button', async () => {
        await page.setJavaScriptEnabled(true)
        await page.goto(baseUrl, { waitUntil: 'load' })

        await page.click('.js-app-mobile-nav-toggler')

        const toggleButtonIsOpen = await page.evaluate(() => document.body.querySelector('.app-header-mobile-nav-toggler').classList.contains('app-header-mobile-nav-toggler--active'))
        expect(toggleButtonIsOpen).toBeTruthy()
      })

      it('should indicate the expanded state of the toggle button using aria-expanded', async () => {
        await page.goto(baseUrl, { waitUntil: 'load' })

        await page.click('.js-app-mobile-nav-toggler')

        const toggleButtonAriaExpanded = await page.evaluate(() => document.body.querySelector('.app-header-mobile-nav-toggler').getAttribute('aria-expanded'))
        expect(toggleButtonAriaExpanded).toBe('true')
      })

      it('should indicate the open state of the navigation', async () => {
        await page.goto(baseUrl, { waitUntil: 'load' })

        await page.click('.js-app-mobile-nav-toggler')

        const navigationIsOpen = await page.evaluate(() => document.body.querySelector('.app-mobile-nav').classList.contains('app-mobile-nav--active'))
        expect(navigationIsOpen).toBeTruthy()
      })

      it('should indicate the visible state of the navigation using aria-hidden', async () => {
        await page.goto(baseUrl, { waitUntil: 'load' })

        await page.click('.js-app-mobile-nav-toggler')

        const navigationAriaHidden = await page.evaluate(() => document.body.querySelector('.app-mobile-nav').getAttribute('aria-hidden'))
        expect(navigationAriaHidden).toBe('false')
      })
    })
  })
})
