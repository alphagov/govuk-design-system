import { test, expect } from '@playwright/test'
const { describe } = test

describe('Example page', () => {
  describe('that has a form', () => {
    test('does not submit the form / reload the page', async ({ page }) => {
      const pathname = '/patterns/question-pages/default/'

      await page.goto(pathname)

      await page.getByRole('button', { name: 'Continue' }).click()

      // Still on same page (form not submitted)
      const url = new URL(await page.url())
      expect(url.pathname).toBe(pathname)
    })
  })
})
