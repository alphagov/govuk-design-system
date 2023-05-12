const { AxePuppeteer } = require('@axe-core/puppeteer')

const { goTo } = require('../lib/puppeteer-helpers.js')

async function analyze (page, path) {
  await goTo(page, path)

  const axe = new AxePuppeteer(page)
    .setLegacyMode(true) // Share single page via iframe
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
    // axe reports that the Browsersync banner is not inside a landmark, which is intentional.
    .exclude('#__bs_notify__')
    // axe reports that the frame "does not have a main landmark" and example <h1> headings
    // violate "Heading levels should only increase by one", which is intentional.
    // https://github.com/alphagov/govuk-design-system/pull/2442#issuecomment-1326600528
    .exclude('.app-example__frame')

  return axe.analyze()
}

describe('Accessibility Audit', () => {
  describe('Home page - layout.njk', () => {
    it('validates', async () => {
      const results = await analyze(page, '/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Component page - layout-pane.njk', () => {
    it('validates', async () => {
      const results = await analyze(page, '/components/radios/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Patterns page - layout-pane.njk', () => {
    it('validates', async () => {
      const results = await analyze(page, '/patterns/gender-or-sex/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Get in touch page - layout-single-page.njk', () => {
    it('validates', async () => {
      const results = await analyze(page, '/get-in-touch/')
      expect(results).toHaveNoViolations()
    })
  })

  describe('Site Map page - layout-sitemap.njk', () => {
    it('validates', async () => {
      const results = await analyze(page, '/sitemap/')
      expect(results).toHaveNoViolations()
    })
  })
})
