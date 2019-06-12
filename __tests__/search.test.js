/* eslint-env jest */

const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../config/paths.json')
const PORT = configPaths.testPort

// Regex that can be used to match on fingerprinted search index files
const isSearchIndex = /.*\/search-index-[0-9a-f]{32}.json$/

let page
let baseUrl = 'http://localhost:' + PORT

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

  describe('tracking', () => {
    it('should track if there are no results', async () => {
      await page.goto(baseUrl, { waitUntil: 'load' })

      await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

      await page.waitForSelector('.app-site-search__input')
      await page.focus('.app-site-search__input')
      await page.type('.app-site-search__input', 'lorem ipsum')
      const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ecommerce: {
              impressions: []
            },
            event: 'site-search',
            eventDetails: {
              action: 'no result',
              category: 'site search',
              label: 'lorem ipsum'
            }
          })
        ])
      )
    })
    it('should block personally identifable information emails', async () => {
      await page.goto(baseUrl, { waitUntil: 'load' })

      await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

      await page.waitForSelector('.app-site-search__input')
      await page.focus('.app-site-search__input')
      await page.type('.app-site-search__input', 'user@example.com')
      const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            eventDetails: expect.objectContaining({
              label: '[blocked]'
            })
          })
        ])
      )
    })
    it('should block personally identifable information numbers', async () => {
      await page.goto(baseUrl, { waitUntil: 'load' })

      await page.evaluate(() => { window.__SITE_SEARCH_TRACKING_TIMEOUT = 0 })

      await page.waitForSelector('.app-site-search__input')
      await page.focus('.app-site-search__input')
      await page.type('.app-site-search__input', '079460999')
      const GoogleTagManagerDataLayer = await page.evaluate(() => window.dataLayer)

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            eventDetails: expect.objectContaining({
              label: '[blocked][blocked][blocked][blocked][blocked][blocked][blocked][blocked][blocked]'
            })
          })
        ])
      )
    })
  })
})
