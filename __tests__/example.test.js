/* eslint-env jest */
const configPaths = require('../config/paths.json')
const PORT = configPaths.testPort

let browser
let page
let baseUrl = 'http://localhost:' + PORT

beforeAll(async (done) => {
  browser = global.browser
  page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    window.__TESTS_RUNNING = true
  })

  // Capture JavaScript errors.
  page.on('pageerror', error => {
    throw error
  })

  done()
})

afterAll(async (done) => {
  await page.close()
  done()
})

describe('Example page', () => {
  describe('that has a form', () => {
    it('does not submit the form / reload the page', async () => {
      const defaultExampleUrl = baseUrl + '/patterns/question-pages/default/'
      await page.goto(defaultExampleUrl, { waitUntil: 'load' })
      await page.waitForSelector('form[action="/form-handler"]')
      await page.click('.govuk-button')
      let url = await page.url()
      // url should stay the same as the form shouldn't submit
      expect(url).toBe(defaultExampleUrl)
    })
  })
})
