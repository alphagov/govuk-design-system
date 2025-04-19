const { goTo, isVisible } = require('./helpers/puppeteer.js')

describe('Back to top', () => {
  let $module
  let $backToTopLink
  let pageHeight

  async function setup(page) {
    $module = await page.$('[data-module="app-back-to-top"]')
    $backToTopLink = await $module.$('a')

    // Scrollable height of body
    pageHeight =
      (await page.$eval('body', ($element) => $element.scrollHeight)) ?? 0
  }

  function scrollTo(page, scrollY) {
    return page.evaluate((y) => window.scroll(0, y), scrollY)
  }

  beforeEach(async () => {
    await page.setJavaScriptEnabled(true)

    await goTo(page, '/styles/colour/')
    await scrollTo(page, 0)
    await setup(page)
  })

  it('is always visible when JavaScript is disabled', async () => {
    await page.setJavaScriptEnabled(false)

    // Reload page again
    await page.reload()
    await setup(page)

    // Visible on page
    await expect(isVisible($backToTopLink)).resolves.toBe(true)
  })

  it('is hidden when at the top of the page', async () => {
    await scrollTo(page, 0)

    // Visible on page, hidden from viewport
    await expect(isVisible($backToTopLink)).resolves.toBe(true)
    await expect($backToTopLink.isIntersectingViewport()).resolves.toBe(false)
  })

  it('is visible when at the bottom of the page', async () => {
    await scrollTo(page, pageHeight)

    // Visible on page, shown in viewport
    await expect(isVisible($backToTopLink)).resolves.toBe(true)
    await expect($backToTopLink.isIntersectingViewport()).resolves.toBe(true)
  })

  it('goes back to the top of the page when interacted with', async () => {
    await scrollTo(page, pageHeight)
    await $backToTopLink.click()

    // Scrolled to top
    await expect(page.evaluate(() => window.scrollY)).resolves.toBe(0)
  })
})
