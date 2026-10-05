import { test, expect } from '@playwright/test'
const { beforeEach, describe, use } = test

describe('MobileNavigationSection', () => {
  beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  describe('when JavaScript is unavailable or fails', () => {
    use({ javaScriptEnabled: false })

    beforeEach(async ({ page }) => {
      await page.goto('/')
    })

    test('does not render the `<button>`s that toggle sections', async ({
      page
    }) => {
      const $menu = page.getByRole('navigation', { name: 'Menu' })

      await expect(
        $menu.getByRole('button', { name: 'Menu' })
      ).not.toBeAttached()
    })

    test('does not render the sub navigation items', async ({ page }) => {
      const $menu = page.getByRole('navigation', { name: 'Menu' })

      const $topLevelList = $menu.getByRole('list')
      await expect($topLevelList).toBeVisible()

      const $secondLevelList = $topLevelList.getByRole('list')
      await expect($secondLevelList).not.toBeAttached()
    })
  })

  describe('when JavaScript is available', () => {
    use({ javaScriptEnabled: true })

    beforeEach(async ({ page }) => {
      await page.goto('/')
    })

    describe('Initial state', () => {
      test('adds a `<button>` to each Service Navigation items with the same label as its link', async ({
        page
      }) => {
        const $serviceNavigationItems = page.locator(
          '.govuk-service-navigation__item'
        )

        const textContents = await $serviceNavigationItems.evaluateAll(
          ($serviceNavigationItem) => {
            return $serviceNavigationItem.map((element) => {
              return [
                element.querySelector('a').textContent,
                element.querySelector('button')?.textContent
              ]
            })
          }
        )

        for (const text of textContents) {
          expect(text[0].trim()).toBe(text[1].trim())
        }
      })

      test('adds the sub navigation to each Service Navigation items', async ({
        page
      }) => {
        const $menu = page.getByRole('navigation', { name: 'Menu' })

        const $serviceNavigationItems = await $menu
          .locator('.govuk-service-navigation__item')
          .all()

        for (const $serviceNavigationItem of $serviceNavigationItems) {
          await expect($serviceNavigationItem.locator('> ul')).toBeAttached()
        }
      })
    })

    describe('User interactions', () => {
      test("toggles the sub navigation when clicking on an item's button", async ({
        page
      }) => {
        const $menu = page.getByRole('navigation', { name: 'Menu' })

        const $topLevelButton = $menu.getByRole('button', { name: 'Menu' })

        await page
          .getByRole('button', { name: 'Accept analytics cookies' })
          .click()
        await page.getByRole('button', { name: 'Hide cookie message' }).click()

        // Open the service navigation
        await $topLevelButton.click()

        const $secondLevelButton = $menu.getByRole('button', {
          name: 'Get started'
        })

        await $secondLevelButton.click()

        // The button should be shown as expanded
        await expect($secondLevelButton).toHaveAttribute(
          'aria-expanded',
          'true'
        )

        // And the subnavigation section should be visible now
        const $secondLevelSubMenu = $secondLevelButton
          .locator('..')
          .getByRole('list')
          .first()
        await expect($secondLevelSubMenu).toBeVisible()

        await $secondLevelButton.click()

        // Then the button should be shown as not expanded
        await expect($secondLevelButton).toHaveAttribute(
          'aria-expanded',
          'false'
        )

        // // And the subnavigation section should be hidden again now
        await expect($secondLevelSubMenu).toBeHidden()
      })
    })

    //   describe('Responsiveness', () => {
    //     test('hides the link from the service navigation when the viewport is narrow', async ({ page }) => {
    //       const $serviceNavigationItems = await page.$$(
    //         '.govuk-service-navigation__item'
    //       )

    //       // await jestPuppeteer.debug();

    //       for (const $serviceNavigationItem of $serviceNavigationItems) {
    //         const [
    //           linkHiddenAttribute,
    //           buttonHiddenAttribute,
    //           subnavHiddenAttribute
    //         ] = await $serviceNavigationItem.evaluate((el) => [
    //           el
    //             .querySelector('.govuk-service-navigation__link')
    //             .getAttribute('hidden'),
    //           el.querySelector('button').getAttribute('hidden'),
    //           el.querySelector('ul').getAttribute('hidden')
    //         ])

    //         expect(linkHiddenAttribute).toBe('')
    //         expect(buttonHiddenAttribute).toBeNull()
    //         expect(subnavHiddenAttribute).toBe('')
    //       }
    //     })

    //     test('hides the sub navigation and its toggle when the viewport becomes large enough', async ({ page }) => {
    //       await page.setViewport({ width: 1024, height: 768 })
    //       // Wait a little bit that the Media Query List reacting to the change of viewport
    //       // has triggered its 'change' event before we look at the page
    //       await page.waitForSelector(
    //         '.govuk-service-navigation__link:not([hidden])'
    //       )

    //       const $serviceNavigationItems = await page.$$(
    //         '.govuk-service-navigation__item'
    //       )

    //       for (const $serviceNavigationItem of $serviceNavigationItems) {
    //         const [
    //           linkHiddenAttribute,
    //           buttonHiddenAttribute,
    //           subnavHiddenAttribute
    //         ] = await $serviceNavigationItem.evaluate((el) => [
    //           el
    //             .querySelector('.govuk-service-navigation__link')
    //             .getAttribute('hidden'),
    //           el.querySelector('button').getAttribute('hidden'),
    //           el.querySelector('ul').getAttribute('hidden')
    //         ])

    //         expect(linkHiddenAttribute).toBeNull()
    //         expect(buttonHiddenAttribute).toBe('')
    //         expect(subnavHiddenAttribute).toBe('')
    //       }

    //       await page.setViewport({ width: 375, height: 667 })
    //       // Wait a little bit that the Media Query List reacting to the change of viewport
    //       // has triggered its 'change' event before we look at the page
    //       await page.waitForSelector('.govuk-service-navigation__link[hidden]')

    //       for (const $serviceNavigationItem of $serviceNavigationItems) {
    //         const [
    //           linkHiddenAttribute,
    //           buttonHiddenAttribute,
    //           subnavHiddenAttribute
    //         ] = await $serviceNavigationItem.evaluate((el) => [
    //           el
    //             .querySelector('.govuk-service-navigation__link')
    //             .getAttribute('hidden'),
    //           el.querySelector('button').getAttribute('hidden'),
    //           el.querySelector('ul').getAttribute('hidden')
    //         ])

    //         expect(linkHiddenAttribute).toBe('')
    //         expect(buttonHiddenAttribute).toBeNull()
    //         expect(subnavHiddenAttribute).toBe('')
    //       }
    //     })

    //     test('keeps the open sections open when the viewport is resized', async ({ page }) => {
    //       // Navigate to a page where a section will be open
    //       await goTo(page, '/components/')

    //       const $buttonOfOpenSection = await page.$(
    //         '.govuk-service-navigation__item--active button'
    //       )
    //       const $subnavOfOpenSection = await page.$(
    //         '.govuk-service-navigation__item--active ul'
    //       )

    //       await expect(
    //         getAttribute($subnavOfOpenSection, 'hidden')
    //       ).resolves.toBeNull()
    //       await expect(
    //         getAttribute($buttonOfOpenSection, 'aria-expanded')
    //       ).resolves.toBe('true')

    //       await page.setViewport({ width: 1024, height: 768 })
    //       // Wait a little bit that the Media Query List reacting to the change of viewport
    //       // has triggered its 'change' event before we look at the page
    //       await page.waitForSelector(
    //         '[data-module="app-mobile-navigation-section"]:not([hidden])'
    //       )

    //       await expect(
    //         getAttribute($subnavOfOpenSection, 'hidden')
    //       ).resolves.toBe('')
    //       // Button remains expanded as it's hidden anyways
    //       await expect(
    //         getAttribute($buttonOfOpenSection, 'aria-expanded')
    //       ).resolves.toBe('true')

    //       await page.setViewport({ width: 375, height: 667 })
    //       // Wait a little bit that the Media Query List reacting to the change of viewport
    //       // has triggered its 'change' event before we look at the page
    //       await page.waitForSelector(
    //         '[data-module="app-mobile-navigation-section"][hidden]'
    //       )

    //       // When viewport is narrow again, the subnav is visible like it was before the viewport got larger
    //       await expect(
    //         getAttribute($subnavOfOpenSection, 'hidden')
    //       ).resolves.toBeNull()
    //       await expect(
    //         getAttribute($buttonOfOpenSection, 'aria-expanded')
    //       ).resolves.toBe('true')
    //     })
    //   })

    //   describe('On a section root', () => {
    //     beforeEach(async ({ page }) => {
    //       await goTo(page, '/components/')
    //     })

    //     test('keeps sub-navigation in the active section open', async ({ page }) => {
    //       const $serviceNavigationItem = await page.$(
    //         '.govuk-service-navigation__item--active'
    //       )

    //       const $button = await $serviceNavigationItem.$('button')
    //       const $subNavigation = await $serviceNavigationItem.$('ul')

    //       await expect(getAttribute($button, 'aria-expanded')).resolves.toBe(
    //         'true'
    //       )
    //       await expect(getAttribute($subNavigation, 'hidden')).resolves.toBeNull()
    //     })

    //     test('marks the overview as the current link', async ({ page }) => {
    //       const $serviceNavigationItem = await page.$(
    //         '.govuk-service-navigation__item--active'
    //       )

    //       const $subNavigationOverviewLink = await $serviceNavigationItem.$(
    //         'ul a[href="/components/"]'
    //       )

    //       await expect(
    //         getAttribute($subNavigationOverviewLink, 'aria-current')
    //       ).resolves.toBe('page')
    //     })
    //   })

    //   describe('In a page within a section', () => {
    //     beforeEach(async ({ page }) => {
    //       await goTo(page, '/components/button/')
    //     })

    //     test('keeps the active section open', async ({ page }) => {
    //       const $serviceNavigationItem = await page.$(
    //         '.govuk-service-navigation__item--active'
    //       )

    //       const $button = await $serviceNavigationItem.$('button')
    //       const $subNavigation = await $serviceNavigationItem.$('ul')

    //       await expect(getAttribute($button, 'aria-expanded')).resolves.toBe(
    //         'true'
    //       )
    //       await expect(getAttribute($subNavigation, 'hidden')).resolves.toBeNull()
    //     })

    //     test('marks the overview as the current link', async ({ page }) => {
    //       const $serviceNavigationItem = await page.$(
    //         '.govuk-service-navigation__item--active'
    //       )

    //       const $subNavigationLink = await $serviceNavigationItem.$(
    //         'ul a[href="/components/button/"]'
    //       )

    //       await expect(
    //         getAttribute($subNavigationLink, 'aria-current')
    //       ).resolves.toBe('page')
    //     })
    //   })
  })
})
