const { AxePuppeteer } = require('@axe-core/puppeteer')
const { globSync } = require('glob')
const slash = require('slash')

const { paths } = require('../config')

const { goTo } = require('./helpers/puppeteer.js')

async function analyze(page, path) {
  await goTo(page, path)

  const axe = new AxePuppeteer(page)
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

  return axe.analyze()
}

describe('Accessibility audit', () => {
  it.each(globSync('**/index.html', { cwd: paths.public }))(
    'validates %s',
    async (path) => {
      const results = await analyze(page, `/${slash(path)}`)
      expect(results).toHaveNoViolations()
    },
    10000
  )
})
