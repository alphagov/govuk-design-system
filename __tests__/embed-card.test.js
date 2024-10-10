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

    await goTo(page, '/community/design-system-day-2024-day-1/')

    await page.reload()
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

  it.skip('will not render placeholder if cookies accepted', async () => {
    const buttonAccept = await page.$(
      'div[data-cookie-category="campaign"] .js-cookie-banner-accept'
    )
    await buttonAccept.click()

    await new Promise((resolve) => setTimeout(resolve, 5000))

    await expect(page.$('.app-embed-card__placeholder')).resolves.toBe(null)
  })
})
