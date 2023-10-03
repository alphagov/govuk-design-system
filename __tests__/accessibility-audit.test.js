const { AxePuppeteer } = require('@axe-core/puppeteer')
const { globSync } = require('glob')
const slash = require('slash')

const { paths } = require('../config')

const { goTo } = require('./helpers/puppeteer.js')

/**
 * Axe Puppeteer reporter
 *
 * @param {import('puppeteer').Page} page - Puppeteer page object
 * @returns {Promise<import('axe-core').AxeResults>} Axe Puppeteer instance
 */
async function axe(page) {
  const reporter = new AxePuppeteer(page)
    .include('body')
    .exclude([
      // Axe reports there is "no label associated with the text field", when there is one.
      '#app-site-search__input',

      // Axe reports that the phase banner is not inside a landmark, which is intentional.
      '.app-phase-banner',

      // Axe reports that the skip link is not inside a landmark, which is intentional.
      // https://design-system.service.gov.uk/components/skip-link/#when-to-use-this-component
      '.govuk-skip-link',

      // Axe reports that the back to top button is not inside a landmark, which is intentional.
      '.app-back-to-top',

      // Axe reports that the Browsersync banner is not inside a landmark, which is intentional.
      '#__bs_notify__',

      // Axe reports that the frame "does not have a main landmark" and example <h1> headings
      // violate "Heading levels should only increase by one", which is intentional.
      // https://github.com/alphagov/govuk-design-system/pull/2442#issuecomment-1326600528
      '.app-example__frame'
    ])

    .withRules([
      'best-practice',

      // WCAG 2.x
      'wcag2a',
      'wcag2aa',
      'wcag2aaa',

      // WCAG 2.1
      'wcag21a',
      'wcag21aa',

      // WCAG 2.2
      'wcag22aa'
    ])

  // Create report
  const report = await reporter.options({}).analyze()

  // Add preview URL to report violations
  report.violations.forEach((violation) => {
    violation.helpUrl = `${violation.helpUrl}\n${page.url()}`
  })

  return report
}

describe('Accessibility audit', () => {
  it.each(globSync('**/index.html', { cwd: paths.public }))(
    'validates %s',
    async (path) => {
      await goTo(page, `/${slash(path)}`)
      await expect(axe(page)).resolves.toHaveNoViolations()
    },
    10000
  )
})
