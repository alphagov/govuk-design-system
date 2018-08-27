/* eslint-env jest */
const configPaths = require('../config/paths.json')
const PORT = configPaths.port

// Regex that can be used to match on fingerprinted search index files
const isSearchIndex = /.*\/search-index-[0-9a-f]{32}.json$/

let browser
let page
let baseUrl = 'http://localhost:' + PORT

beforeEach(async (done) => {
  browser = global.browser
  page = await browser.newPage()
  done()
})

afterEach(async (done) => {
  await page.close()
  done()
})

describe('Site search', () => {
  it('does not return any results when searching for something that does not exist', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'lorem ipsum')
    const optionResult = await page.$eval('.app-site-search__option', option => option.textContent)

    expect(optionResult).toBe('No results found')
  })
  it('returns results that begin with a letter "d"', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'd')
    const resultsArray = await page.evaluate(
      () => [...document.querySelectorAll('.app-site-search__option')]
      .map(elem => elem.innerText.toLowerCase())
      .filter(elem => elem.startsWith('d'))
    )

    expect(resultsArray.every(item => item.startsWith('d'))).toBeTruthy()
  })
  it('returns results that contain aliases that start with the letter "d"', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.type('.app-site-search__input', 'd')

    const resultsArray = await page.evaluate(
      () => [...document.querySelectorAll('.app-site-search__option')]
      .filter(elem => !elem.textContent.toLowerCase().startsWith('d'))
      .map(elem => elem.querySelector('.app-site-search__aliases').textContent)
    )
    expect(resultsArray.every(item => item.startsWith('d'))).toBeTruthy()
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
  it('selecting "details" as the result takes you to the the "details" page', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })

    await page.waitForSelector('.app-site-search__input')
    await page.click('.app-site-search__input')
    await page.type('.app-site-search__input', 'details')
    await Promise.all([
      page.waitForNavigation(),
      page.keyboard.press('Enter')
    ])
    let url = await page.url()

    expect(url).toBe(baseUrl + '/components/details/')
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
})
