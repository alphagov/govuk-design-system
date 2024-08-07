const { ports } = require('../config')

const {
  mockGoogleTagManagerScript
} = require('./helpers/google-tag-manager.js')
const { goTo, getProperty, isVisible } = require('./helpers/puppeteer.js')

describe('Cookies page', () => {
  let $module

  let $radioYesAnalytics
  let $radioNoAnalytics
  let $radioYesCampaign
  let $radioNoCampaign
  let $buttonSave

  async function setup(page) {
    $module = await page.$('[data-module="app-cookies-page"]')
    $radioYesAnalytics = await $module.$(
      'input[name="cookies[analytics]"][value="yes"]'
    )
    $radioNoAnalytics = await $module.$(
      'input[name="cookies[analytics]"][value="no"]'
    )
    $radioYesCampaign = await $module.$(
      'input[name="cookies[campaign]"][value="yes"]'
    )
    $radioNoCampaign = await $module.$(
      'input[name="cookies[campaign]"][value="no"]'
    )
    $buttonSave = await $module.$('button')
  }

  beforeEach(async () => {
    await page.deleteCookie({
      name: 'design_system_cookies_policy',
      url: `http://localhost:${ports.preview}`
    })

    await page.setJavaScriptEnabled(true)
    // Set up network interception
    // https://pptr.dev/guides/network-interception
    await page.setRequestInterception(true)
    page.on('request', mockGoogleTagManagerScript)

    await goTo(page, '/cookies')
    await setup(page)
  })

  afterEach(async () => {
    page.off('request', mockGoogleTagManagerScript)
    await page.setRequestInterception(false)
  })

  it('without JavaScript it has no visible inputs', async () => {
    await page.setJavaScriptEnabled(false)

    // Reload page again
    await page.reload()
    await setup(page)

    await expect(isVisible($radioYesAnalytics)).resolves.toBe(false)
    await expect(isVisible($radioNoAnalytics)).resolves.toBe(false)
    await expect(isVisible($buttonSave)).resolves.toBe(false)
  })

  it('has radios for each cookie type', async () => {
    await expect(isVisible($radioYesAnalytics)).resolves.toBe(true)
    await expect(isVisible($radioNoAnalytics)).resolves.toBe(true)
    await expect(isVisible($radioYesCampaign)).resolves.toBe(true)
    await expect(isVisible($radioNoCampaign)).resolves.toBe(true)
  })

  it('sets the default radio selection to "no"', async () => {
    await expect(page.cookies()).resolves.toEqual([])

    await expect(getProperty($radioYesAnalytics, 'checked')).resolves.toBe(
      false
    )
    await expect(getProperty($radioNoAnalytics, 'checked')).resolves.toBe(true)
    await expect(getProperty($radioYesCampaign, 'checked')).resolves.toBe(false)
    await expect(getProperty($radioNoCampaign, 'checked')).resolves.toBe(true)
  })

  it('has a save button', async () => {
    await expect(isVisible($buttonSave)).resolves.toBe(true)
  })

  it('shows success notification banner after preferences are saved', async () => {
    const $notification = await $module.$('.govuk-notification-banner--success')

    // Notification hidden
    await expect(isVisible($notification)).resolves.toBe(false)

    // Click 'Yes' and submit
    await $radioYesAnalytics.click()
    await $buttonSave.click()

    // Notification visible
    await expect(isVisible($notification)).resolves.toBe(true)
  })

  it('saves user preferences to a cookie', async () => {
    // Click 'Yes' and submit
    await $radioYesAnalytics.click()
    await $radioYesCampaign.click()
    await $buttonSave.click()

    await expect(page.cookies()).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'design_system_cookies_policy',
          value: '{"analytics":true,"campaign":true,"version":2}'
        })
      ])
    )

    // Click 'No' and submit
    await $radioNoAnalytics.click()
    await $radioNoCampaign.click()
    await $buttonSave.click()

    await expect(page.cookies()).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'design_system_cookies_policy',
          value: '{"analytics":false,"campaign":false,"version":2}'
        })
      ])
    )
  })

  it('injects Google Tag Manager script if user accepts cookies', async () => {
    // Click 'Yes' and submit
    await $radioYesAnalytics.click()
    await $buttonSave.click()

    expect(
      page.$('script[src*="www.googletagmanager.com"]')
    ).resolves.toBeTruthy()
  })

  it('does not inject Google Tag Manager script if user rejects cookies', async () => {
    await $radioNoAnalytics.click()
    await $buttonSave.click()

    expect(
      page.$('script[src*="www.googletagmanager.com"]')
    ).resolves.toBeNull()
  })

  it('immediately disables analytics if user rejects cookies', async () => {
    await $radioNoAnalytics.click()
    await $buttonSave.click()

    expect(
      page.evaluate(() => window['ga-disable-G-8F2EMQL51V'])
    ).resolves.toEqual(true)
    expect(
      page.evaluate(() => window['ga-disable-G-GHT8W0QGD9'])
    ).resolves.toEqual(true)
  })

  it('shows the users existing preferences when the page is loaded', async () => {
    // Click 'No' and submit
    await $radioNoAnalytics.click()
    await $radioNoCampaign.click()
    await $buttonSave.click()

    // Reload page again
    await page.reload()
    await setup(page)

    await expect(getProperty($radioYesAnalytics, 'checked')).resolves.toBe(
      false
    )
    await expect(getProperty($radioNoAnalytics, 'checked')).resolves.toBe(true)
    await expect(getProperty($radioYesCampaign, 'checked')).resolves.toBe(false)
    await expect(getProperty($radioNoCampaign, 'checked')).resolves.toBe(true)

    // Click 'Yes', submit form
    await $radioYesAnalytics.click()
    await $radioYesCampaign.click()
    await $buttonSave.click()

    // Reload page again
    await page.reload()
    await setup(page)

    await expect(getProperty($radioYesAnalytics, 'checked')).resolves.toBe(true)
    await expect(getProperty($radioNoAnalytics, 'checked')).resolves.toBe(false)
    await expect(getProperty($radioYesCampaign, 'checked')).resolves.toBe(true)
    await expect(getProperty($radioNoCampaign, 'checked')).resolves.toBe(false)
  })
})
