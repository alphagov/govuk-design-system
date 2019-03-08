/* eslint-env jest */
const configPaths = require('../config/paths.json')
const PORT = configPaths.testPort

let browser
let page
let baseUrl = 'http://localhost:' + PORT

beforeAll(async (done) => {
  browser = global.browser
  page = await browser.newPage()

  // Capture JavaScript errors.
  page.on('pageerror', error => {
    throw error
  })

  done()
})

afterAll(async (done) => {
  await page.close()
  done()
})

describe('Component page', () => {
  it('should contain a "Nunjucks" tab heading', async () => {
    await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

    const nunjucksTabHeadings = await page.evaluate(() => Array.from(document.querySelectorAll('.js-tabs__item a'))
      .filter(element => element.textContent === 'Nunjucks'))

    expect(nunjucksTabHeadings[0]).toBeTruthy()
  })

  it('"Nunjucks" tab content should contain a details summary with "Nunjucks macro options" text', async () => {
    await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

    // Get "aria-controls" attributes from "Nunjucks" tab headings
    const nunjucksTabHeadingControls = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.js-tabs__item a'))
      .filter(element => element.textContent === 'Nunjucks')
      .map(element => element.getAttribute('aria-controls')))

    const tabContentIds = await nunjucksTabHeadingControls.jsonValue() // Returns Puppeteer JSONHandle

    const id = tabContentIds[0]

    // Get summary text of details element in "Nunjucks" tab
    const nunjucksTabHeadings = await page.evaluate(id => Array.from(document.getElementById(id).querySelectorAll('.govuk-details__summary-text'))
      .map(element => element.textContent.trim()), id)

    expect(nunjucksTabHeadings).toContain('Nunjucks macro options')
  })

  it('"Nunjucks" tab content should contain a details element that has a table with "Name", "Type" and "Description" column headings', async () => {
    await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

    // Get "aria-controls" attributes from "Nunjucks" tab headings
    const nunjucksTabHeadingControls = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.js-tabs__item a'))
      .filter(element => element.textContent === 'Nunjucks')
      .map(element => element.getAttribute('aria-controls')))

    const tabContentIds = await nunjucksTabHeadingControls.jsonValue() // Returns Puppeteer JSONHandle
    const id = tabContentIds[0]

    // Get table headings of table inside details element in "Nunjucks" tab
    const nunjucksTableHeadings = await page.evaluate(id => Array.from(document.getElementById(id).querySelector('.govuk-details__text .govuk-table .govuk-table__head').querySelectorAll('.govuk-table__header'))
      .map(element => element.textContent.trim()), id)

    expect(nunjucksTableHeadings.sort()).toEqual(['Name', 'Type', 'Description'].sort())
  })
})
