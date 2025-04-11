const { ports } = require('../config')

const { goTo } = require('./helpers/puppeteer.js')

const cookieParam = {
  name: 'design_system_cookies_policy',
  value: JSON.stringify({ analytics: null, campaign: null, version: 2 }),
  url: `http://localhost:${ports.preview}`
}

describe('Embed Card', () => {
  beforeEach(async () => {
    await page.deleteCookie({
      name: cookieParam.name,
      url: cookieParam.url
    })

    await page.setJavaScriptEnabled(true)

    await goTo(page, '/embed-test/')
  })

  it('will render placeholder if cookies not accepted', async () => {
    await expect(page.$('.app-embed-card__placeholder')).resolves.not.toBe(null)
  })

  it('will render placeholder if cookies rejected', async () => {
    const buttonReject = await page.$(
      'div[data-cookie-category="campaign"] .js-cookie-banner-reject'
    )
    await buttonReject.click()
    await expect(page.$('.app-embed-card__placeholder')).resolves.not.toBe(null)
  })

  it('will not render placeholder if cookies accepted', async () => {
    const buttonAccept = await page.$(
      'div[data-cookie-category="campaign"] .js-cookie-banner-accept'
    )
    await buttonAccept.click()

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const firstEmbed = await page.$('[data-module="app-embed-card"]')

    await firstEmbed.scrollIntoView()

    await expect(firstEmbed.$('.app-embed-card__placeholder')).resolves.toBe(
      null
    )
  })

  it('will not render author image if not specified', async () => {
    const embeds = await page.$$('[data-module="app-embed-card"]')

    await expect(embeds[0].$('app-embed-card__author-img')).resolves.toBe(null)
  })

  it('will render author image if specified', async () => {
    const embeds = await page.$$('[data-module="app-embed-card"]')

    await expect(embeds[1].$('app-embed-card__author-img')).resolves.toBe(null)
  })
})
