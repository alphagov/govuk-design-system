/* eslint-env jest */

const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../config/paths.json')
const PORT = configPaths.testPort

let page
const baseUrl = 'http://localhost:' + PORT

const cookiesPageSelector = '[data-module="app-cookies-page"]'

beforeEach(async () => {
  page = await setupPage()
  await page.setJavaScriptEnabled(true)
  await page.goto(`${baseUrl}/cookies`)
})

afterEach(async () => {
  await page.close()
})

describe('Cookies page', () => {
  it('without JavaScript it has no visible inputs', async () => {
    await page.setJavaScriptEnabled(false)
    await page.goto(`${baseUrl}/cookies`)

    const isAnalyticsFormGroupHidden = await page.waitForSelector(
      cookiesPageSelector + ' .govuk-form-group input[type="radio"][name="analytics"]', { hidden: true }
    )
    expect(isAnalyticsFormGroupHidden).toBeTruthy()

    const isSaveButtonHidden = await page.waitForSelector(
      cookiesPageSelector + ' button', { hidden: true }
    )
    expect(isSaveButtonHidden).toBeTruthy()
  })

  it('has radios for each cookie type', async () => {
    const isAnalyticsFormGroupVisible = await page.waitForSelector(
      cookiesPageSelector + ' .govuk-form-group input[type="radio"][name="analytics"]', { visible: true }
    )
    expect(isAnalyticsFormGroupVisible).toBeTruthy()
  })

  it('sets the default radio selection to "no"', async () => {
    expect(await page.cookies()).toEqual([])

    const isAnalyticsDisagreeSelected = await page.waitForSelector(cookiesPageSelector + ' input[name="analytics"][value="no"]:checked', { visible: true })
    expect(isAnalyticsDisagreeSelected).toBeTruthy()
  })

  it('has a save button', async () => {
    const isSaveButtonVisible = await page.waitForSelector(
      cookiesPageSelector + ' button', { visible: true }
    )
    expect(isSaveButtonVisible).toBeTruthy()
  })

  it('shows success notification banner after preferences are saved', async () => {
    const isSuccessNotificationHidden = await page.waitForSelector(
      cookiesPageSelector + ' .govuk-notification-banner--success', { hidden: true }
    )
    expect(isSuccessNotificationHidden).toBeTruthy()

    await page.click(cookiesPageSelector + ' input[name="analytics"]')
    await page.click(cookiesPageSelector + ' button')

    const isSuccessNotificationVisible = await page.waitForSelector(
      cookiesPageSelector + ' .govuk-notification-banner--success', { visible: true }
    )
    expect(isSuccessNotificationVisible).toBeTruthy()
  })

  it('saves user preferences to a cookie', async () => {
    await page.click(cookiesPageSelector + ' input[name="analytics"][value="yes"]')
    await page.click(cookiesPageSelector + ' button')

    expect(await page.cookies()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'design_system_cookies_policy',
          value: '{"analytics":true,"version":1}'
        })
      ])
    )

    await page.click(cookiesPageSelector + ' input[name="analytics"][value="no"]')
    await page.click(cookiesPageSelector + ' button')

    expect(await page.cookies()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'design_system_cookies_policy',
          value: '{"analytics":false,"version":1}'
        })
      ])
    )
  })

  it('shows the users existing preferences when the page is loaded', async () => {
    await page.click(cookiesPageSelector + ' input[name="analytics"][value="no"]')
    await page.click(cookiesPageSelector + ' button')

    await page.goto(`${baseUrl}/cookies`)

    const isAnalyticsDisagreeSelected = await page.waitForSelector(cookiesPageSelector + ' input[name="analytics"][value="no"]:checked', { visible: true })
    expect(isAnalyticsDisagreeSelected).toBeTruthy()

    await page.click(cookiesPageSelector + ' input[name="analytics"][value="yes"]')
    await page.click(cookiesPageSelector + ' button')

    await page.goto(`${baseUrl}/cookies`)

    const isAnalyticsAgreeSelected = await page.waitForSelector(
      cookiesPageSelector + ' input[name="analytics"][value="yes"]:checked', { visible: true }
    )
    expect(isAnalyticsAgreeSelected).toBeTruthy()
  })
})
