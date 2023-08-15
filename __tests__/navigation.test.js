const { devices } = require('puppeteer')

const { goTo, getAttribute, isVisible } = require('../lib/puppeteer-helpers.js')

describe('Homepage', () => {
  let $navigation
  let $navigationToggler

  async function setup(page) {
    $navigation = await page.$('.js-app-navigation')
    $navigationToggler = await page.$('.js-app-navigation__toggler')
  }

  beforeAll(async () => {
    await page.emulate(devices['iPhone 6'])
  })

  beforeEach(async () => {
    await page.setJavaScriptEnabled(true)

    await goTo(page, '/')
    await setup(page)
  })

  describe('when JavaScript is unavailable or fails', () => {
    it('falls back to making the navigation visible', async () => {
      await page.setJavaScriptEnabled(false)

      // Reload page again
      await page.reload()
      await setup(page)

      // Menu open state (visually)
      await expect(isVisible($navigation)).resolves.toBe(true)
    })
  })

  describe('when JavaScript is available', () => {
    describe('when menu button is pressed', () => {
      it('should apply the corresponding open state class to the menu button', async () => {
        await expect(
          getAttribute($navigationToggler, 'class')
        ).resolves.not.toContain('govuk-header__menu-button--open')

        await $navigationToggler.click()

        // Menu button open state
        await expect(
          getAttribute($navigationToggler, 'class')
        ).resolves.toContain('govuk-header__menu-button--open')
      })

      it('should indicate the expanded state of the toggle button using aria-expanded', async () => {
        await expect(
          getAttribute($navigationToggler, 'aria-expanded')
        ).resolves.toBe('false')

        await $navigationToggler.click()

        // Menu button control expanded
        await expect(
          getAttribute($navigationToggler, 'aria-expanded')
        ).resolves.toBe('true')
      })

      it('should indicate the open state of the navigation', async () => {
        await expect(getAttribute($navigation, 'class')).resolves.not.toContain(
          'app-navigation--active'
        )

        await $navigationToggler.click()

        // Menu open state
        await expect(getAttribute($navigation, 'class')).resolves.toContain(
          'app-navigation--active'
        )
      })

      it('should indicate the visible state of the navigation using the hidden attribute', async () => {
        await expect(isVisible($navigation)).resolves.toBe(false)

        await $navigationToggler.click()

        // Menu open state (visually)
        await expect(isVisible($navigation)).resolves.toBe(true)
      })
    })
  })
})
