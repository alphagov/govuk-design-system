/* eslint-env jest */
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../lib/paths.js')
const PORT = configPaths.testPort

let page
let baseUrl = 'http://localhost:' + PORT

beforeAll(async () => {
  page = await setupPage(iPhone)
})

afterAll(async () => {
  await page.close()
})

describe('Homepage', () => {
  describe('when JavaScript is unavailable or fails', () => {
    it('falls back to making the navigation visible', async () => {
      await page.setJavaScriptEnabled(false)
      await page.goto(baseUrl, { waitUntil: 'load' })
      const isMobileNavigationVisible = await page.waitForSelector('.js-app-mobile-nav', { visible: true, timeout: 1000 })
      expect(isMobileNavigationVisible).toBeTruthy()
    })

    it('does not wrap the navigation links in a heading element', async () => {
      await page.setJavaScriptEnabled(false)
      await page.goto(baseUrl, { waitUntil: 'load' })
      const isMobileNavigationLinkVisible = await page.waitForSelector('.app-mobile-nav-subnav-toggler__link', { visible: true, timeout: 1000 })
      expect(isMobileNavigationLinkVisible).toBeTruthy()

      const mobileNavigationWrappingHeading = await page.evaluate(() => document.body.querySelector('.app-mobile-nav-subnav__link-heading'))
      expect(mobileNavigationWrappingHeading).toBeNull()
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

      it('should wrap the navigation links in a heading element', async () => {
        await page.goto(baseUrl, { waitUntil: 'load' })

        await page.click('.js-app-mobile-nav-toggler')

        const isMobileNavigationLinkVisible = await page.waitForSelector('.app-mobile-nav-subnav-toggler__link', { visible: true, timeout: 1000 })
        expect(isMobileNavigationLinkVisible).toBeTruthy()

        const isMobileNavigationWrappingHeading = await page.waitForSelector('.app-mobile-nav-subnav__link-heading', { visible: true, timeout: 1000 })
        expect(isMobileNavigationWrappingHeading).toBeTruthy()
      })
    })
  })
})
