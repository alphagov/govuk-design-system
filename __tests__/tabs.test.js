/* eslint-env jest */
const configPaths = require('../config/paths.json')
const PORT = configPaths.port

let browser
let page
let baseUrl = 'http://localhost:' + PORT

beforeAll(async (done) => {
  browser = global.browser
  page = await browser.newPage()
  done()
})

afterAll(async (done) => {
  await page.close()
  done()
})

describe('Component page', () => {
  describe('when JavaScript is unavailable or fails', () => {
    it('falls back to making the containers visible', async () => {
      await page.setJavaScriptEnabled(false)
      await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })
      const isContainerVisible = await page.waitForSelector('.js-tabs__container', { visible: true, timeout: 1000 })
      expect(isContainerVisible).toBeTruthy()
    })
  })

  describe('when JavaScript is available', () => {
    describe('when tab item is pressed', () => {
      it('should indicate the open state of the tab', async () => {
        await page.setJavaScriptEnabled(true)
        await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

        await page.click('.js-tabs__item a')

        const toggleButtonIsOpen = await page.evaluate(() => document.body.querySelector('.app-tabs__item').classList.contains('app-tabs__item--current'))
        expect(toggleButtonIsOpen).toBeTruthy()
      })

      it('should indicate the selected state of the tab using aria-selected', async () => {
        await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

        await page.click('.js-tabs__item a')

        const toggleButtonAriaExpanded = await page.evaluate(() => document.body.querySelector('.js-tabs__item a').getAttribute('aria-selected'))
        expect(toggleButtonAriaExpanded).toBe('true')
      })
    })

    describe('when tab is open and close button is pressed', () => {
      it('should not indicate the open state of the tab', async () => {
        await page.setJavaScriptEnabled(true)
        await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

        await page.click('.js-tabs__item a')
        await page.click('.js-link--close')

        const toggleButtonIsOpen = await page.evaluate(() => document.body.querySelector('.app-tabs__item').classList.contains('app-tabs__item--current'))
        expect(toggleButtonIsOpen).toBeFalsy()
      })

      it('should not indicate the selected state of the tab using aria-selected', async () => {
        await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

        await page.click('.js-tabs__item a')
        await page.click('.js-link--close')

        const toggleButtonAriaExpanded = await page.evaluate(() => document.body.querySelector('.js-tabs__item a').getAttribute('aria-selected'))
        expect(toggleButtonAriaExpanded).toBeFalsy()
      })
    })
  })
})
