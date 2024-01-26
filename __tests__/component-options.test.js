const { goTo } = require('../lib/puppeteer-helpers.js')

describe('Component page', () => {
  it('should contain a "Nunjucks" tab heading', async () => {
    await goTo(page, '/components/back-link/')

    const nunjucksTabHeadings = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.js-tabs__item a')).filter(
        (element) => element.textContent === 'Nunjucks'
      )
    )

    expect(nunjucksTabHeadings[0]).toBeTruthy()
  })

  it('"Nunjucks" tab content should contain a details summary with "Nunjucks macro options" text', async () => {
    await goTo(page, '/components/back-link/')

    // Get "aria-controls" attributes from "Nunjucks" tab headings
    const nunjucksTabHeadingControls = await page.evaluateHandle(() =>
      Array.from(document.querySelectorAll('.js-tabs__item a'))
        .filter((element) => element.textContent === 'Nunjucks')
        .map((element) => element.getAttribute('aria-controls'))
    )

    const tabContentIds = await nunjucksTabHeadingControls.jsonValue() // Returns Puppeteer JSONHandle

    const id = tabContentIds[0]

    // Get summary text of details element in "Nunjucks" tab
    const nunjucksTabHeadings = await page.evaluate(
      (id) =>
        Array.from(
          document
            .getElementById(id)
            .querySelectorAll('.govuk-details__summary-text')
        ).map((element) => element.textContent.trim()),
      id
    )

    expect(nunjucksTabHeadings).toContain('Nunjucks macro options')
  })

  it('"Nunjucks" tab content should contain a details element that has a table with "Name", "Type" and "Description" column headings', async () => {
    await goTo(page, '/components/back-link/')

    // Get "aria-controls" attributes from "Nunjucks" tab headings
    const nunjucksTabHeadingControls = await page.evaluateHandle(() =>
      Array.from(document.querySelectorAll('.js-tabs__item a'))
        .filter((element) => element.textContent === 'Nunjucks')
        .map((element) => element.getAttribute('aria-controls'))
    )

    const tabContentIds = await nunjucksTabHeadingControls.jsonValue() // Returns Puppeteer JSONHandle
    const id = tabContentIds[0]

    // Get table headings of table inside details element in "Nunjucks" tab
    const nunjucksTableHeadings = await page.evaluate(
      (id) =>
        Array.from(
          document
            .getElementById(id)
            .querySelector(
              '.govuk-details__text .govuk-table .govuk-table__head'
            )
            .querySelectorAll('.govuk-table__header')
        ).map((element) => element.textContent.trim()),
      id
    )

    expect(nunjucksTableHeadings.sort()).toEqual(
      ['Name', 'Type', 'Description'].sort()
    )
  })

  it('macro options should be opened and in view when linked to', async () => {
    await goTo(page, '/components/back-link/#options-back-link-example')

    // Check if example's macro options details element is open
    await page.waitForSelector('#options-back-link-example-details[open]')

    // Check if the example has been scrolled into the viewport
    const $example = await page.$('#options-back-link-example-details')
    await expect($example.isIntersectingViewport()).resolves.toBe(true)
  })

  it('macro options subtable should be opened and in view when linked to', async () => {
    await goTo(
      page,
      '/components/text-input/#options-text-input-example--label'
    )

    // Check if example's macro options details element is open
    await page.waitForSelector('#options-text-input-example-details[open]')

    // Check if the example has been scrolled into the viewport
    const $example = await page.$('#options-text-input-example--label')
    await expect($example.isIntersectingViewport()).resolves.toBe(true)
  })
})
