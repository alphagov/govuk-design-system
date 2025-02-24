const fs = require('fs')
const path = require('path')

const { AxePuppeteer } = require('@axe-core/puppeteer')

const { goTo } = require('./helpers/puppeteer.js')

async function analyze(page, path) {
  await goTo(page, path)

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
    // axe reports that the Browsersync banner is not inside a landmark, which is intentional.
    .exclude('#__bs_notify__')
    // axe reports that the frame "does not have a main landmark" and example <h1> headings
    // violate "Heading levels should only increase by one", which is intentional.
    // https://github.com/alphagov/govuk-design-system/pull/2442#issuecomment-1326600528
    .exclude('.app-example__frame')

  return axe.analyze()
}

function getDirectoriesWithIndexHTML (directory) {
  const result = []

  function traverse (currentDir, depth) {
    if (depth === 0) {
      return
    }

    const files = fs.readdirSync(currentDir)

    if (files.includes('index.html')) {
      result.push(currentDir)
    }

    for (const file of files) {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        traverse(filePath, depth - 1)
      }
    }
  }

  traverse(directory, 3)

  return result.map((dir) => path.relative(directory, dir))
}

// Usage example
const directory = 'deploy/public'
const relativeDirectories = getDirectoriesWithIndexHTML(directory)

describe('Accessibility Audit', () => {
  it.each(relativeDirectories)('validates %s', async (path) => {
    const results = await analyze(page, path)
    expect(results).toHaveNoViolations()
  }, 10000)
})
