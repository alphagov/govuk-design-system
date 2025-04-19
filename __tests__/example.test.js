const { goTo } = require('./helpers/puppeteer.js')

describe('Example page', () => {
  describe('that has a form', () => {
    it('does not submit the form / reload the page', async () => {
      const pathname = '/patterns/question-pages/default/'

      await goTo(page, pathname)
      await page.waitForSelector('form[action="/form-handler"]')
      await page.click('.govuk-button')

      // Still on same page (form not submitted)
      const url = new URL(await page.url())
      expect(url.pathname).toBe(pathname)
    })
  })
})
