
const { AxePuppeteer } = require('@axe-core/puppeteer')

const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../lib/paths.js')
const PORT = configPaths.testPort

let page
const baseUrl = 'http://localhost:' + PORT

async function analyze (path) {
  const { href } = new URL(path, baseUrl)

  await page.goto(href, { waitUntil: 'load' })

  const axe = new AxePuppeteer(page)
    .include('body')
    // axe reports there is "no label associated with the text field", when there is one.
    .exclude('#app-site-search__input')
    // axe reports that the phase banner is not inside a landmark, which is intentional.
    .exclude('.app-phase-banner')
    // axe reports that the skip link is not inside a landmark, which is intentional.
    // https://design-system.service.gov.uk/components/skip-link/#when-to-use-this-component
    .exclude('.govuk-skip-link')
    // axe reports that the back to top button is not inside a landmark, which is intentional.
    .exclude('.app-back-to-top')

  return axe.analyze()
}

beforeAll(async () => {
  page = await setupPage()
})

afterAll(async () => {
  await page.close()
})

describe('Accessibility Audit', () => {
  describe('Home page - layout.njk', () => {
    it('validates', async () => {
      const results = await analyze('/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Component page - layout-pane.njk', () => {
    it('validates', async () => {
      const results = await analyze('/components/radios/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Patterns page - layout-pane.njk', () => {
    it('validates', async () => {
      const results = await analyze('/patterns/gender-or-sex/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Get in touch page - layout-single-page.njk', () => {
    it('validates', async () => {
      const results = await analyze('/get-in-touch/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Site Map page - layout-sitemap.njk', () => {
    it('validates', async () => {
      const results = await analyze('/sitemap/')
      expect(results).toHaveNoViolations()
    })
  })
})
