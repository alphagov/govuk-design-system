const { KnownDevices } = require('puppeteer')

const { goTo, getProperty, getAttribute } = require('./helpers/puppeteer.js')

describe('Homepage', () => {
  let $navigationToggler

  async function setup(page) {
    $navigationToggler = await page.$('.govuk-js-service-navigation-toggle')
  }

  beforeAll(async () => {
    await page.emulate(KnownDevices['iPhone 6'])
  })

  beforeEach(async () => {
    await page.setJavaScriptEnabled(true)
    await goTo(page, '/')
    await setup(page)
  })

  describe('when JavaScript is unavailable or fails', () => {
    it('the mobile subnav will not render', async () => {
      await page.setJavaScriptEnabled(false)

      // Reload page again
      await page.reload()

      // Menu open state (visually)
      await expect(
        page.$$('.govuk-service-navigation__link .app-mobile-navigation__list')
      ).resolves.toStrictEqual([])
    })
  })

  describe('when JavaScript is available', () => {
    it('the mobile subnav will render', async () => {
      // Menu open state (visually)
      await expect(
        page.$$('.govuk-service-navigation__link template')
      ).resolves.toStrictEqual([])
    })

    it('the mobile subnav will toggle hidden when open or closed', async () => {
      const $mobileNavButton = await page.$(
        '.govuk-service-navigation__link.app-mobile-navigation__toggle-button'
      )
      const $mobileNavMenu = await page.$('.app-mobile-navigation__list')

      // default state on homepage is hidden
      await expect(getProperty($mobileNavMenu, 'hidden')).resolves.toBeTruthy()

      await $navigationToggler.click()
      await $mobileNavButton.click()

      // default state on homepage is hidden
      await expect(getProperty($mobileNavMenu, 'hidden')).resolves.toBeFalsy()
    })

    it('the mobile subnav will toggle aria-expanded when open or closed', async () => {
      const $mobileNavButton = await page.$(
        '.govuk-service-navigation__link.app-mobile-navigation__toggle-button'
      )

      // default state on homepage is hidden
      await expect(
        getAttribute($mobileNavButton, 'aria-expanded')
      ).resolves.toBe('false')

      await $navigationToggler.click()
      await $mobileNavButton.click()

      // default state on homepage is hidden
      await expect(
        getAttribute($mobileNavButton, 'aria-expanded')
      ).resolves.toBe('true')
    })

    it('applies current link style and expands subnav if user on page in subnav', async () => {
      await goTo(page, '/get-started')
      await setup(page)

      await expect(
        page.$(
          '[aria-expanded="true"].app-mobile-navigation__toggle-button + ul [href="/get-started"].app-mobile-navigation__link--active'
        )
      ).resolves.not.toBeNull()
    })
  })
})
