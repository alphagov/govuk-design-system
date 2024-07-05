const { goTo, getProperty } = require('../lib/puppeteer-helpers.js')

// Regex that can be used to match on fingerprinted search index files
const isSearchIndex = /.*\/search-index(-[0-9a-f]{32})?.json$/

describe('Site search', () => {
  let $module

  let $wrapper
  let $searchInput

  async function setup(page) {
    $module = await page.$('[data-module="app-search"]')

    $wrapper = await $module.$('.app-site-search__wrapper')
    $searchInput = await $module.$('.app-site-search__input')
  }

  beforeEach(async () => {
    await page.setRequestInterception(false)

    // Remove page listeners
    page.removeAllListeners('dialog')
    page.removeAllListeners('request')

    await goTo(page, '/')
    await setup(page)
  })

  afterEach(async () => {
    // Reset 'onbeforeunload' to continue navigation
    await page.evaluate(() => {
      window.onbeforeunload = null
    })
  })

  it('does not return any results when searching for something that does not exist', async () => {
    await $searchInput.type('lorem ipsum')

    const $searchOptions = await $module.$$('.app-site-search__option')
    await expect(getProperty($searchOptions[0], 'textContent')).resolves.toBe(
      'No results found'
    )
  })

  it('returns results where a word in the title begins with the letter "d"', async () => {
    await $searchInput.type('d')

    // ignore any results where a match was found in the alias
    const resultsArray = await page.$$eval(
      '.app-site-search__option:not(:has(.app-site-search__aliases))',
      (results) =>
        results.map((result) => result.firstChild.textContent.toLowerCase())
    )

    // regex with word boundary, in our case words that begin with 'd'
    for (const result of resultsArray) {
      expect(result).toMatch(/\b[d]\w*/)
    }

    expect.assertions()
  })

  it('returns results that contain aliases that start with the letter "d"', async () => {
    await $searchInput.type('d')

    // only get results where a match was found in the alias
    const resultsArray = await page.$$eval(
      '.app-site-search__option:has(.app-site-search__aliases)',
      (results) =>
        results.map(
          (result) =>
            result.querySelector('.app-site-search__aliases').textContent
        )
    )

    // regex with word boundary, in our case words that begin with 'd'
    for (const result of resultsArray) {
      expect(result).toMatch(/\b[d]\w*/)
    }

    expect.assertions()
  })

  it("doesn't show any aliases if it finds any matches in the title", async () => {
    await $searchInput.type('det')

    const resultsArray = await page.$$('.app-site-search__aliases')
    expect(resultsArray).toHaveLength(0)
  })

  it('selecting "details" as the result takes you to the the "details" page', async () => {
    await $searchInput.click()
    await $searchInput.type('details')

    await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')])

    const url = new URL(await page.url())
    expect(url.pathname).toBe('/components/details/')
  })

  it('shows user a message that the index has failed to download', async () => {
    await page.setRequestInterception(true)

    // Abort requests to search index
    page.on('request', (request) =>
      isSearchIndex.test(request.url()) ? request.abort() : request.continue()
    )

    // Reload page again
    await page.reload()
    await setup(page)

    await $searchInput.click()
    await $searchInput.type('lorem')

    const $searchOptions = await $module.$$('.app-site-search__option')
    await expect(getProperty($searchOptions[0], 'textContent')).resolves.toBe(
      'Failed to load the search index'
    )
  })

  it('shows user a message that the search index is loading', async () => {
    await page.setRequestInterception(true)

    // Intentionally make the search-index request hang
    page.on(
      'request',
      (request) => isSearchIndex.test(request.url()) || request.continue()
    )

    // Reload page again
    await page.reload()
    await setup(page)

    await $searchInput.click()
    await $searchInput.type('d')

    const $searchOptions = await $module.$$('.app-site-search__option')
    await expect(getProperty($searchOptions[0], 'textContent')).resolves.toBe(
      'Loading search index'
    )
  })

  it('should focus the input when clicking the button', async () => {
    // The button is actually a background on the left most part of the wrapper element.
    const { top, left } = await $wrapper.evaluate(($element) =>
      $element.getBoundingClientRect().toJSON()
    )

    // Click the top left side of the element.
    await page.mouse.click(left, top)

    // Get the active focused element to compare with the actual expected input.
    const $activeElement = await page.evaluate(() => document.activeElement)
    const $searchInput = await page.evaluate(() =>
      document.querySelector('.app-site-search__input')
    )

    expect($activeElement).toEqual($searchInput)
  })

  describe('tracking', () => {
    it('should track if there are no results', async () => {
      await page.evaluate(() => {
        window.__SITE_SEARCH_TRACKING_TIMEOUT = 0
      })

      await $searchInput.focus()
      await $searchInput.type('lorem ipsum')

      const GoogleTagManagerDataLayer = await page.evaluate(
        () => window.dataLayer
      )

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            event: 'site_search',
            event_data: {
              action: 'no result',
              text: 'lorem ipsum'
            }
          }),
          expect.objectContaining({
            event: 'view_item_list',
            ecommerce: {
              items: []
            }
          })
        ])
      )
    })

    it('should track if there are results', async () => {
      await page.evaluate(() => {
        window.__SITE_SEARCH_TRACKING_TIMEOUT = 0
      })

      await $searchInput.focus()
      await $searchInput.type('g')

      const $searchOptions = await $module.$$('.app-site-search__option')
      const GoogleTagManagerDataLayer = await page.evaluate(
        () => window.dataLayer
      )

      // Find layer that has the impressions to test.
      const items = GoogleTagManagerDataLayer.filter(
        (layer) => layer.ecommerce
      ).map((layer) => layer.ecommerce.items)[0]

      expect(items.length).toEqual($searchOptions.length)
      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            event: 'site_search',
            event_data: {
              action: 'results',
              text: 'g'
            }
          }),
          expect.objectContaining({
            event: 'view_item_list',
            ecommerce: {
              items: expect.arrayContaining([
                expect.objectContaining({
                  name: expect.any(String),
                  category: expect.any(String),
                  list: 'g',
                  position: expect.any(Number)
                })
              ])
            }
          })
        ])
      )
    })

    it('should track if a result is clicked', async () => {
      // Prevent page from unloading so we can check what was tracked.
      // By setting onbeforeunload it forces a dialog to appear that allows a user
      // to cancel leaving the page, so we detect the dialog opening and dismiss it to stop the navigation.
      await page.evaluate(() => {
        window.onbeforeunload = () => true
      })
      page.on('dialog', async (dialog) => {
        await dialog.dismiss()
      })

      await $searchInput.focus()
      await $searchInput.type('g')

      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')

      const GoogleTagManagerDataLayer = await page.evaluate(
        () => window.dataLayer
      )

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            event: 'site_search',
            event_data: {
              action: 'click',
              text: expect.stringContaining('g'),
              section: expect.any(String)
            }
          }),
          expect.objectContaining({
            ecommerce: null
          }),
          expect.objectContaining({
            ecommerce: {
              items: expect.arrayContaining([
                expect.objectContaining({
                  name: expect.any(String),
                  category: expect.any(String),
                  list: 'g',
                  position: 2
                })
              ])
            },
            event: 'select_item'
          })
        ])
      )
    })

    it('should block personally identifable information emails', async () => {
      await page.evaluate(() => {
        window.__SITE_SEARCH_TRACKING_TIMEOUT = 0
      })

      await $searchInput.focus()
      await $searchInput.type('user@example.com')

      const GoogleTagManagerDataLayer = await page.evaluate(
        () => window.dataLayer
      )

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            event_data: expect.objectContaining({
              text: '[REDACTED EMAIL]'
            })
          })
        ])
      )
    })

    it('should block personally identifable information numbers', async () => {
      await page.evaluate(() => {
        window.__SITE_SEARCH_TRACKING_TIMEOUT = 0
      })

      await $searchInput.focus()
      await $searchInput.type('079460999')

      const GoogleTagManagerDataLayer = await page.evaluate(
        () => window.dataLayer
      )

      expect(GoogleTagManagerDataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            event_data: expect.objectContaining({
              text: '[REDACTED NUMBER]'
            })
          })
        ])
      )
    })
  })
})
