const { ports } = require('../config')

const {
  mockGoogleTagManagerScript
} = require('./helpers/google-tag-manager.js')
const { goTo, getAttribute, isVisible } = require('./helpers/puppeteer.js')

describe('Cookie banner', () => {
  let $module
  let $message

  let $buttonAccept
  let $buttonReject

  let $confirmationAccept
  let $confirmationReject

  let $cookieBanners

  const categories = ['analytics', 'campaign']

  // Default cookie
  const cookieParam = {
    name: 'design_system_cookies_policy',
    value: JSON.stringify({ analytics: true, campaign: null, version: 2 }),
    url: `http://localhost:${ports.preview}`
  }

  const cookieValue = {
    analytics: null,
    campaign: null,
    version: 2
  }

  async function setup(page, cookieCategory) {
    $module = await page.$(
      `div[data-cookie-category="${cookieCategory || 'analytics'}"]`
    )
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

  async function setupAll(page) {
    const $modules = await Promise.all(
      categories.map(async (category) => {
        const $module = await page.$(`div[data-cookie-category="${category}"]`)
        return $module
      })
    )

    const $cookieBannersElements = await Promise.all(
      $modules.map(async ($module) => {
        const [
          message,
          buttonAccept,
          buttonReject,
          confirmationAccept,
          confirmationReject
        ] = await Promise.all([
          $module.$('.js-cookie-banner-message'),
          $module.$('.js-cookie-banner-accept'),
          $module.$('.js-cookie-banner-reject'),
          $module.$('.js-cookie-banner-confirmation-accept'),
          $module.$('.js-cookie-banner-confirmation-reject')
        ])

        return {
          message,
          buttonAccept,
          buttonReject,
          confirmationAccept,
          confirmationReject
        }
      })
    )

    $cookieBanners = categories.reduce(
      (obj, category, index) => ({
        ...obj,
        [category]: {
          module: $modules[index],
          ...$cookieBannersElements[index]
        }
      }),
      {}
    )
  }

  beforeEach(async () => {
    await page.deleteCookie({
      name: cookieParam.name,
      url: cookieParam.url
    })

    await page.setJavaScriptEnabled(true)

    // Set up network interception
    // https://pptr.dev/guides/network-interception
    await page.setRequestInterception(true)
    page.on('request', mockGoogleTagManagerScript)

    await goTo(page, '/')
    await setup(page)
  })

  afterEach(async () => {
    page.off('request', mockGoogleTagManagerScript)
    await page.setRequestInterception(false)
  })

  it('is hidden on the cookies page', async () => {
    await page.setCookie(cookieParam)

    await goTo(page, '/cookies/')
    await setup(page)

    await expect(isVisible($module)).resolves.toBe(false)
  })

  it('is visible on campaign page if campaign not set', async () => {
    await page.setCookie(cookieParam)

    await goTo(page, '/community/design-system-day-2024-day-1/')
    await setup(page, 'campaign')

    await expect(isVisible($module)).resolves.toBe(true)
  })

  describe('when JavaScript is disabled', () => {
    it('is hidden', async () => {
      await page.setJavaScriptEnabled(false)

      // Reload page again
      await page.reload()
      await setup(page)

      await expect(isVisible($module)).resolves.toBe(false)
    })

    it('is hidden on campaign page', async () => {
      await page.setJavaScriptEnabled(false)

      // Reload page again
      await goTo(page, '/community/design-system-day-2024-day-1/')
      await setup(page, 'campaign')

      await expect(isVisible($module)).resolves.toBe(false)
    })
  })

  describe('if page has mulitple category of banners on one page', () => {
    categories.forEach((category) => {
      it(`accepts only the ${category} cookie from the ${category} banner`, async () => {
        const value = JSON.stringify({
          ...cookieValue,
          [category]: null
        })

        await page.setCookie({ ...cookieParam, value })

        await goTo(page, '/community/design-system-day-2024-day-1/')
        await setupAll(page)

        await $cookieBanners[category].buttonAccept.click()

        await expect(page.cookies()).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: cookieParam.name,
              value: JSON.stringify({
                ...cookieValue,
                [category]: true
              })
            })
          ])
        )
      })
    })

    categories.forEach((category) => {
      it(`rejects only the ${category} cookie from the ${category} banner`, async () => {
        const value = JSON.stringify({
          ...cookieValue,
          [category]: null
        })

        await goTo(page, '/community/design-system-day-2024-day-1/')
        await page.setCookie({ ...cookieParam, value })
        await setupAll(page)

        await $cookieBanners[category].buttonReject.click()

        await expect(page.cookies()).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: cookieParam.name,
              value: JSON.stringify({
                ...cookieValue,
                [category]: false
              })
            })
          ])
        )
      })
    })

    categories.forEach((category) => {
      it(`shows only the ${category} cookie banner if unaccepted ${category} cookie`, async () => {
        const value = JSON.stringify({
          ...cookieValue,
          ...categories.reduce(
            (obj, category) => ({
              ...obj,
              [category]: true
            }),
            {}
          ),
          [category]: null
        })

        await page.setCookie({ ...cookieParam, value })
        await goTo(page, '/community/design-system-day-2024-day-1/')
        await setupAll(page)

        const otherBanners = await Promise.all(
          categories
            .filter((cat) => category !== cat)
            .map((cat) => isVisible($cookieBanners[cat].module))
        )

        otherBanners.forEach((otherBanner) => {
          expect(otherBanner).toBe(false)
        })

        await expect(isVisible($cookieBanners[category].module)).resolves.toBe(
          true
        )
      })
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
      const value = JSON.stringify({ analytics: false, version: 2 })
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
            value: JSON.stringify({
              analytics: true,
              campaign: null,
              version: 2
            })
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

    it('injects the script for Google Tag Manager', async () => {
      await $buttonAccept.click()
      expect(
        page.$('script[src*="www.googletagmanager.com"]')
      ).resolves.toBeTruthy()
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
            value: JSON.stringify({
              analytics: false,
              campaign: null,
              version: 2
            })
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

    it('does not injects the script for Google Tag Manager', async () => {
      await $buttonReject.click()
      expect(
        page.$('script[src*="www.googletagmanager.com"]')
      ).resolves.toBeNull()
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
