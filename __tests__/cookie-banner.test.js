const { ports } = require('../config')
const { goTo, getAttribute, isVisible } = require('../lib/puppeteer-helpers.js')

describe('Cookie banner', () => {
  let $module
  let $message

  let $buttonAccept
  let $buttonReject

  let $confirmationAccept
  let $confirmationReject

  // Default cookie
  const cookieParam = {
    name: 'design_system_cookies_policy',
    value: JSON.stringify({ analytics: true, version: 1 }),
    url: `http://localhost:${ports.preview}`
  }

  async function setup(page) {
    $module = await page.$('[data-module="govuk-cookie-banner"]')
    $message = await $module.$('.js-cookie-banner-message')

    // Accept or reject buttons
    $buttonAccept = await $module.$('.js-cookie-banner-accept')
    $buttonReject = await $module.$('.js-cookie-banner-reject')

    // Accept or reject confirmation messages
    $confirmationAccept = await $module.$(
      '.js-cookie-banner-confirmation-accept'
    )
    $confirmationReject = await $module.$(
      '.js-cookie-banner-confirmation-reject'
    )
  }

  beforeEach(async () => {
    await page.deleteCookie({
      name: cookieParam.name,
      url: cookieParam.url
    })

    await page.setJavaScriptEnabled(true)

    await goTo(page, '/')
    await setup(page)
  })

  it('is hidden on the cookies page', async () => {
    await page.setCookie(cookieParam)

    await goTo(page, '/cookies/')
    await setup(page)

    await expect(isVisible($module)).resolves.toBe(false)
  })

  describe('when JavaScript is disabled', () => {
    it('is hidden', async () => {
      await page.setJavaScriptEnabled(false)

      // Reload page again
      await page.reload()
      await setup(page)

      await expect(isVisible($module)).resolves.toBe(false)
    })
  })

  describe('when JavaScript is enabled', () => {
    it('is visible if there is no consent cookie', async () => {
      await expect(isVisible($module)).resolves.toBe(true)
    })

    it('is visible if the consent cookie version is outdated', async () => {
      const value = JSON.stringify({ analytics: true, version: 0 })
      await page.setCookie({ ...cookieParam, value })

      // Reload page again
      await page.reload()
      await setup(page)

      await expect(isVisible($module)).resolves.toBe(true)
    })

    it('is hidden if the consent cookie version is valid', async () => {
      const value = JSON.stringify({ analytics: false, version: 1 })
      await page.setCookie({ ...cookieParam, value })

      // Reload page again
      await page.reload()
      await setup(page)

      await expect(isVisible($module)).resolves.toBe(false)
    })
  })

  describe('accept button', () => {
    it('sets the consent cookie', async () => {
      await expect(page.cookies()).resolves.toEqual([])
      await $buttonAccept.click()

      await expect(page.cookies()).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: cookieParam.name,
            value: JSON.stringify({ analytics: true, version: 1 })
          })
        ])
      )
    })

    it('hides the cookie message', async () => {
      await $buttonAccept.click()
      await expect(isVisible($module)).resolves.toBe(true)
    })

    it('shows the confirmation message', async () => {
      await $buttonAccept.click()
      await expect(isVisible($confirmationAccept)).resolves.toBe(true)
    })

    it('moves user focus to the confirmation message', async () => {
      await $buttonAccept.click()
      await expect(
        getAttribute($confirmationAccept, 'tabindex')
      ).resolves.toEqual('-1')
    })
  })

  describe('reject button', () => {
    it('sets the consent cookie', async () => {
      await expect(page.cookies()).resolves.toEqual([])
      await $buttonReject.click()

      await expect(page.cookies()).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: cookieParam.name,
            value: JSON.stringify({ analytics: false, version: 1 })
          })
        ])
      )
    })

    it('hides the cookie message', async () => {
      await $buttonReject.click()
      await expect(isVisible($message)).resolves.toBe(false)
    })

    it('shows the confirmation message', async () => {
      await $buttonReject.click()
      await expect(isVisible($confirmationReject)).resolves.toBe(true)
    })

    it('moves user focus to the confirmation message', async () => {
      await $buttonReject.click()
      await expect(
        getAttribute($confirmationReject, 'tabindex')
      ).resolves.toEqual('-1')
    })
  })

  describe('hide button', () => {
    it('hides the accept confirmation message', async () => {
      const $buttonAcceptHide = await $module.$(
        '.js-cookie-banner-hide--accept'
      )

      // Accept cookies
      await $buttonAccept.click()

      await expect(isVisible($message)).resolves.toBe(false)
      await expect(isVisible($confirmationAccept)).resolves.toBe(true)
      await expect(isVisible($module)).resolves.toBe(true)

      // Click the hide button
      await $buttonAcceptHide.click()

      await expect(isVisible($message)).resolves.toBe(false)
      await expect(isVisible($confirmationAccept)).resolves.toBe(false)
      await expect(isVisible($module)).resolves.toBe(false)
    })

    it('hides the reject confirmation message', async () => {
      const $buttonRejectHide = await $module.$(
        '.js-cookie-banner-hide--reject'
      )

      // Reject cookies
      await $buttonReject.click()

      await expect(isVisible($message)).resolves.toBe(false)
      await expect(isVisible($confirmationReject)).resolves.toBe(true)
      await expect(isVisible($module)).resolves.toBe(true)

      // Click the hide button
      await $buttonRejectHide.click()

      await expect(isVisible($message)).resolves.toBe(false)
      await expect(isVisible($confirmationReject)).resolves.toBe(false)
      await expect(isVisible($module)).resolves.toBe(false)
    })
  })
})
