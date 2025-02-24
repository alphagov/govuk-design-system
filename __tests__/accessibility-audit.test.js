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
    .exclude(
      // Axe reports that the phase banner is not inside a landmark, which is intentional.
      '.app-phase-banner'
    )
    .exclude(
      // Axe reports that the skip link is not inside a landmark, which is intentional.
      // https://design-system.service.gov.uk/components/skip-link/#when-to-use-this-component
      '.govuk-skip-link'
    )
    .exclude(
      // Axe reports that the back to top button is not inside a landmark, which is intentional.
      '.app-back-to-top'
    )
    .exclude(
      // Axe reports that the Browsersync banner is not inside a landmark, which is intentional.
      '#__bs_notify__'
    )
    .exclude(
      // Axe reports that the frame "does not have a main landmark" and example <h1> headings
      // violate "Heading levels should only increase by one", which is intentional.
      // https://github.com/alphagov/govuk-design-system/pull/2442#issuecomment-1326600528
      // Additionally, we are relying on accessibility testing in govuk-frontend to cover these.
      '.app-example__frame'
    )

    // TODO: govuk-breadcrumbs sets off the "must be contained in landmarks" rule. Needs investigation.
    .exclude('.govuk-breadcrumbs')

    // TODO: figure out how and whether to re-enable these rules, or target them better
    .disableRules([
      'region',
      'color-contrast-enhanced',
      'aria-allowed-attr',
      'target-size',
      'aria-allowed-role'
    ])

    .withTags([
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
  const report = await reporter.analyze()

  // Add preview URL to report violations
  report.violations.forEach((violation) => {
    violation.helpUrl = `${violation.helpUrl}\n${page.url()}`
  })

  return report
}

// TODO: Didn't feel like spending ages working out the perfect glob, so have split these out.
//
// The idea here is to reduce the time taken by only checking the main index of the component pages,
// rather than checking each example as well, since they're present on the main index in iframes.
//
// This assumes that the examples are well checked for accessibility since they're basically just
// govuk-frontend components.
//
// Even then, though, some of them feature custom html and such from the site itself, so we might
// decide to suck it up and audit EVERYTHING, and have to decide how to fix the issues that come up
// here.
//
// Possibly the ideal solution is to split the components and "other" pages, and set up a
// few different checks (with different rules due to the different nature of the content):
// - Check everything
// - Check component pages
// - Check content pages
// - Github script that only checks files that have been edited and flags 'em in a comment
//
// So you can choose to run the full, lengthy check, but it wouldn't run on Github, so our
// deploy times wouldn't be seriously affected.
function getFilesToCheck() {
  const componentIndexes = globSync('components/*{,/*}.html', {
    cwd: paths.public
  })
  const patternIndexes = globSync('patterns/*{,/*}.html', {
    cwd: paths.public
  })
  const pageIndexes = globSync('**/index.html', {
    cwd: paths.public,
    ignore: ['components/**/index.html', 'patterns/*{,/*}.html']
  })

  return [...componentIndexes, ...patternIndexes, ...pageIndexes]
}

describe('Accessibility audit', () => {
  it.each(getFilesToCheck())(
    'validates %s',
    async (path) => {
      const page = await browser.newPage()

      await goTo(page, `/${slash(path)}`)
      await expect(axe(page)).resolves.toHaveNoViolations()

      await page.close()
    },
    10000
  )
})
