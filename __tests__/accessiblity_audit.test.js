/* eslint-env jest */
const configPaths = require('../config/paths.json')
const PORT = configPaths.testPort
const { AxePuppeteer } = require('axe-puppeteer')

let browser
let page
let baseUrl = 'http://localhost:' + PORT
const thingsToExclude = [
  // axe reports there is "no label associated with the text field", when there is one.
  ['#app-site-search__input'],
  // axe reports that the phase banner is not inside a landmark, which is intentional.
  ['.app-phase-banner__wrapper']
]
beforeAll(async (done) => {
  browser = global.browser
  page = await browser.newPage()
  done()
})

afterAll(async (done) => {
  await page.close()
  done()
})

describe('Accessibility Audit', () => {
  describe('Home page - layout.njk', () => {
    it('validates', async () => {
      await page.goto(baseUrl + '/', { waitUntil: 'load' })
      const results =
        await new AxePuppeteer(page)
          .include(['body'])
          .exclude(...thingsToExclude)
          .analyze()
      expect(results.violations).toEqual([])
    })
  })

  describe('Component page - layout-pane.njk', () => {
    it('validates', async () => {
      await page.goto(baseUrl + '/components/radios/', { waitUntil: 'load' })
      const results =
        await new AxePuppeteer(page)
          .include(['body'])
          .exclude(...thingsToExclude)
          .analyze()

      expect(results.violations).toEqual([])
    })
  })

  describe('Patterns page - layout-pane.njk', () => {
    it('validates', async () => {
      await page.goto(baseUrl + '/patterns/gender-or-sex/', { waitUntil: 'load' })
      const results =
        await new AxePuppeteer(page)
          .include(['body'])
          .exclude(...thingsToExclude)
          .analyze()

      expect(results.violations).toEqual([])
    })
  })

  describe('Cookies page - layout-single-page-prose.njk', () => {
    it('validates', async () => {
      await page.goto(baseUrl + '/cookies/', { waitUntil: 'load' })
      const results =
        await new AxePuppeteer(page)
          .include(['body'])
          .exclude(...thingsToExclude)
          .analyze()

      expect(results.violations).toEqual([])
    })
  })

  describe('Get in touch page - layout-single-page.njk', () => {
    it('validates', async () => {
      await page.goto(baseUrl + '/get-in-touch/', { waitUntil: 'load' })
      const results =
        await new AxePuppeteer(page)
          .include(['body'])
          .exclude(...thingsToExclude)
          .analyze()

      expect(results.violations).toEqual([])
    })
  })

  describe('Site Map page - layout-sitemap.njk', () => {
    it('validates', async () => {
      await page.goto(baseUrl + '/sitemap/', { waitUntil: 'load' })
      const results =
        await new AxePuppeteer(page)
          .include(['body'])
          .exclude(...thingsToExclude)
          .analyze()

      expect(results.violations).toEqual([])
    })
  })
})
