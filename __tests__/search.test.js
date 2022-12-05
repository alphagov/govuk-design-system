
const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../lib/paths.js')
const PORT = configPaths.testPort

// Regex that can be used to match on fingerprinted search index files
const isSearchIndex = /.*\/search-index-[0-9a-f]{32}.json$/

let page
const baseUrl = 'http://localhost:' + PORT

beforeEach(async () => {
  page = await setupPage()
})

afterEach(async () => {
  await page.close()
})

describe('Site search', () => {
  it('does not return any results when searching for something that does not exist', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'lorem ipsum')
    const optionResult = await page.$eval('.app-site-search__option', option => option.textContent)

    expect(optionResult).toBe('No results found')
  })
  it('returns results where a word in the title begins with the letter "d"', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'd')
    const resultsArray = await page.evaluate(
      () => [...document.querySelectorAll('.app-site-search__option')]
      // ignore any results where a match was found in the alias
        .filter(elem => !elem.querySelector('.app-site-search__aliases'))
      // only get text, ignore child nodes
        .map(elem => elem.firstChild.textContent.toLowerCase())
    )
    // regex with word boundary, in our case words that begin with 'd'
    expect(resultsArray.every(item => (/\b[d]\w*/).test(item))).toBeTruthy()
  })
  it('returns results that contain aliases that start with the letter "d"', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'd')

    const resultsArray = await page.evaluate(
      () => [...document.querySelectorAll('.app-site-search__option')]
      // only get results where a match was found in the alias
        .filter(elem => elem.querySelector('.app-site-search__aliases'))
        .map(elem => elem.querySelector('.app-site-search__aliases').textContent)
    )
    // regex with word boundary, in our case words that begin with 'd'
    expect(resultsArray.every(item => (/\b[d]\w*/).test(item))).toBeTruthy()
  })
  it('doesn\'t show any aliases if it finds any matches in the title', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'det')
    const resultsArray = await page.evaluate(
      () => [...document.querySelectorAll('.app-site-search__aliases')]
        .map(elem => elem.querySelector('.app-site-search__aliases'))
    )
    expect(resultsArray).toHaveLength(0)
  })
  it('selecting "prototyping" as the result takes you to the the "prototyping" page', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.click('.app-site-search__input')
    await page.type('.app-site-search__input', 'prototyping')
    await Promise.all([
      page.waitForNavigation(),
      page.keyboard.press('Enter')
    ])
    const url = await page.url()

    expect(url).toBe(baseUrl + '/get-started/prototyping/')
  })
  it('shows user a message that the index has failed to download', async () => {
    await page.setRequestInterception(true)
    page.on('request', interceptedRequest => {
      if (isSearchIndex.test(interceptedRequest.url())) {
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })
    await page.goto(baseUrl, { waitUntil: 'load' })
    await page.waitForSelector('.app-site-search__input')
    await page.click('.app-site-search__input')
    await page.type('.app-site-search__input', 'lorem')

    const optionResult = await page.$eval('.app-site-search__option', option => option.textContent)
    expect(optionResult).toBe('Failed to load the search index')
  })

  it('shows user a message that the search index is loading', async () => {
    await page.setRequestInterception(true)
    page.on('request', interceptedRequest => {
      // Intentionally make the search-index request hang
      if (!isSearchIndex.test(interceptedRequest.url())) {
        interceptedRequest.continue()
      }
    })
    await page.goto(baseUrl, { waitUntil: 'load' })
    await page.waitForSelector('.app-site-search__input')
    await page.click('.app-site-search__input')
    await page.type('.app-site-search__input', 'd')

    const optionResult = await page.$eval('.app-site-search__option', option => option.textContent)
    expect(optionResult).toBe('Loading search index')
  })

  it('should focus the input when clicking the button', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')

    // The button is actually a background on the left most part of the wrapper element.
    const wrapperCoordinates = await page.$eval('.app-site-search__wrapper', $wrapper => {
      const { top, left } = $wrapper.getBoundingClientRect()
      return { top, left }
    })
    // Click the top left side of the element.
    await page.mouse.click(wrapperCoordinates.left, wrapperCoordinates.top)

    // Get the active focused element to compare with the actual expected input.
    const $activeElement = await page.evaluate(() => document.activeElement)
    const $input = await page.evaluate(() => document.querySelector('.app-site-search__input'))

    expect($activeElement).toEqual($input)
  })

  // describe('tracking', () => {
  //   it('should track if there are no results', async () => {
  //     await page.goto(baseUrl, { waitUntil: 'load' })

  //     await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

  //     await page.waitForSelector('.app-site-search__input')
  //     await page.focus('.app-site-search__input')
  //     await page.type('.app-site-search__input', 'lorem ipsum')
  //     const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

  //     expect(GoogleTagManagerDataLayer).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           ecommerce: {
  //             impressions: []
  //           },
  //           event: 'site-search',
  //           eventDetails: {
  //             action: 'no result',
  //             category: 'site search',
  //             label: 'lorem ipsum'
  //           }
  //         })
  //       ])
  //     )
  //   })
  //   it('should track if there are results', async () => {
  //     await page.goto(baseUrl, { waitUntil: 'load' })

  //     await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

  //     await page.waitForSelector('.app-site-search__input')
  //     await page.focus('.app-site-search__input')
  //     await page.type('.app-site-search__input', 'g')
  //     const optionResults = await page.$$('.app-site-search__option')
  //     const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

  //     // Find layer that has the impressions to test.
  //     const impressions =
  //       GoogleTagManagerDataLayer
  //         .filter(layer => layer.ecommerce)
  //         .map(layer => layer.ecommerce.impressions)[0]

  //     expect(impressions.length).toEqual(optionResults.length)
  //     expect(GoogleTagManagerDataLayer).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           ecommerce: {
  //             impressions: expect.arrayContaining([
  //               expect.objectContaining({
  //                 name: expect.any(String),
  //                 category: expect.any(String),
  //                 list: 'g',
  //                 position: expect.any(Number)
  //               })
  //             ])
  //           },
  //           event: 'site-search',
  //           eventDetails: {
  //             action: 'results',
  //             category: 'site search',
  //             label: 'g'
  //           }
  //         })
  //       ])
  //     )
  //   })
  //   it('should track if a result is clicked', async () => {
  //     await page.goto(baseUrl, { waitUntil: 'load' })

  //     // Prevent page from unloading so we can check what was tracked.
  //     // By setting onbeforeunload it forces a dialog to appear that allows a user
  //     // to cancel leaving the page, so we detect the dialog opening and dismiss it to stop the navigation.
  //     await page.evaluate(() => {
  //       window.onbeforeunload = () => true
  //     })
  //     page.on('dialog', async dialog => {
  //       await dialog.dismiss()
  //     })

  //     await page.waitForSelector('.app-site-search__input')
  //     await page.focus('.app-site-search__input')
  //     await page.type('.app-site-search__input', 'g')
  //     await page.keyboard.press('ArrowDown')
  //     await page.keyboard.press('Enter')

  //     const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

  //     expect(GoogleTagManagerDataLayer).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           ecommerce: {
  //             click: {
  //               actionField: {
  //                 list: 'g'
  //               },
  //               products: expect.arrayContaining([
  //                 expect.objectContaining({
  //                   name: expect.any(String),
  //                   category: expect.any(String),
  //                   list: 'g',
  //                   position: 2
  //                 })
  //               ])
  //             }
  //           },
  //           event: 'site-search',
  //           eventDetails: {
  //             action: 'click',
  //             category: 'site search',
  //             label: expect.stringContaining('g |')
  //           }
  //         })
  //       ])
  //     )
  //   })
  //   it('should block personally identifable information emails', async () => {
  //     await page.goto(baseUrl, { waitUntil: 'load' })

  //     await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

  //     await page.waitForSelector('.app-site-search__input')
  //     await page.focus('.app-site-search__input')
  //     await page.type('.app-site-search__input', 'user@example.com')
  //     const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

  //     expect(GoogleTagManagerDataLayer).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           eventDetails: expect.objectContaining({
  //             label: '[REDACTED EMAIL]'
  //           })
  //         })
  //       ])
  //     )
  //   })
  //   it('should block personally identifable information numbers', async () => {
  //     await page.goto(baseUrl, { waitUntil: 'load' })

  //     await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

  //     await page.waitForSelector('.app-site-search__input')
  //     await page.focus('.app-site-search__input')
  //     await page.type('.app-site-search__input', '079460999')
  //     const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

  //     expect(GoogleTagManagerDataLayer).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           eventDetails: expect.objectContaining({
  //             label: '[REDACTED NUMBER]'
  //           })
  //         })
  //       ])
  //     )
  //   })
  // })
})
