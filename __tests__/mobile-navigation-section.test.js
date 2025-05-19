const { goTo, getAttribute } = require('./helpers/puppeteer.js')

describe('MobileNavigationSection', () => {
  beforeEach(async () => {
    await page.setViewport({ width: 375, height: 667 })
  })

  describe('when JavaScript is unavailable or fails', () => {
    beforeEach(async () => {
      await page.setJavaScriptEnabled(false)

      await goTo(page, '/')
    })

    it('does not render the `<button>`s that toggle sections', async () => {
      await goTo(page, '/')

      await expect(
        page.$$('.govuk-service-navigation__link button')
      ).resolves.toStrictEqual([])
    })

    it('does not render the sub navigation items', async () => {
      await expect(
        page.$$('.govuk-service-navigation__link ul')
      ).resolves.toStrictEqual([])
    })
  })

  describe('when JavaScript is available', () => {
    beforeEach(async () => {
      await page.setJavaScriptEnabled(true)

      await goTo(page, '/')
    })

    describe('Initial state', () => {
      it('adds a `<button>` to each Service Navigation items with the same label as its link', async () => {
        const $serviceNavigationItems = await page.$$(
          '.govuk-service-navigation__item'
        )

        for (const $serviceNavigationItem of $serviceNavigationItems) {
          const [linkLabel, buttonLabel] =
            await $serviceNavigationItem.evaluate((el) => {
              return [
                el.querySelector('a').textContent,
                el.querySelector('button')?.textContent
              ]
            })

          expect(buttonLabel.trim()).toBe(linkLabel.trim())
        }
      })

      it('adds the sub navigation to each Service Navigation items', async () => {
        const $serviceNavigationItems = await page.$$(
          '.govuk-service-navigation__item'
        )

        for (const $serviceNavigationItem of $serviceNavigationItems) {
          await expect($serviceNavigationItem.$('ul')).resolves.not.toBeNull()
        }
      })
    })

    describe('User interactions', () => {
      it("toggles the sub navigation when clicking on an item's button", async () => {
        // Open the service navigation so Puppeteer can click on elements inside it
        const $navigationToggler = await page.$(
          '.govuk-js-service-navigation-toggle'
        )
        await $navigationToggler.click()

        const $serviceNavigationItem = await page.$(
          '.govuk-service-navigation__item'
        )

        const $subNavigation = await $serviceNavigationItem.$('ul')
        const $button = await $serviceNavigationItem.$('button')

        await $button.click()

        await expect(getAttribute($button, 'aria-expanded')).resolves.toBe(
          'true'
        )
        await expect(getAttribute($subNavigation, 'hidden')).resolves.toBeNull()

        await $button.click()

        await expect(getAttribute($button, 'aria-expanded')).resolves.toBe(
          'false'
        )
        await expect(getAttribute($subNavigation, 'hidden')).resolves.toBe('')
      })
    })

    describe('Responsiveness', () => {
      it('hides the link from the service navigation when the viewport is narrow', async () => {
        const $serviceNavigationItems = await page.$$(
          '.govuk-service-navigation__item'
        )

        // await jestPuppeteer.debug();

        for (const $serviceNavigationItem of $serviceNavigationItems) {
          const [
            linkHiddenAttribute,
            buttonHiddenAttribute,
            subnavHiddenAttribute
          ] = await $serviceNavigationItem.evaluate((el) => [
            el
              .querySelector('.govuk-service-navigation__link')
              .getAttribute('hidden'),
            el.querySelector('button').getAttribute('hidden'),
            el.querySelector('ul').getAttribute('hidden')
          ])

          expect(linkHiddenAttribute).toBe('')
          expect(buttonHiddenAttribute).toBeNull()
          expect(subnavHiddenAttribute).toBe('')
        }
      })

      it('hides the sub navigation and its toggle when the viewport becomes large enough', async () => {
        await page.setViewport({ width: 1024, height: 768 })
        // Wait a little bit that the Media Query List reacting to the change of viewport
        // has triggered its 'change' event before we look at the page
        await page.waitForSelector(
          '.govuk-service-navigation__link:not([hidden])'
        )

        const $serviceNavigationItems = await page.$$(
          '.govuk-service-navigation__item'
        )

        for (const $serviceNavigationItem of $serviceNavigationItems) {
          const [
            linkHiddenAttribute,
            buttonHiddenAttribute,
            subnavHiddenAttribute
          ] = await $serviceNavigationItem.evaluate((el) => [
            el
              .querySelector('.govuk-service-navigation__link')
              .getAttribute('hidden'),
            el.querySelector('button').getAttribute('hidden'),
            el.querySelector('ul').getAttribute('hidden')
          ])

          expect(linkHiddenAttribute).toBeNull()
          expect(buttonHiddenAttribute).toBe('')
          expect(subnavHiddenAttribute).toBe('')
        }

        await page.setViewport({ width: 375, height: 667 })
        // Wait a little bit that the Media Query List reacting to the change of viewport
        // has triggered its 'change' event before we look at the page
        await page.waitForSelector('.govuk-service-navigation__link[hidden]')

        for (const $serviceNavigationItem of $serviceNavigationItems) {
          const [
            linkHiddenAttribute,
            buttonHiddenAttribute,
            subnavHiddenAttribute
          ] = await $serviceNavigationItem.evaluate((el) => [
            el
              .querySelector('.govuk-service-navigation__link')
              .getAttribute('hidden'),
            el.querySelector('button').getAttribute('hidden'),
            el.querySelector('ul').getAttribute('hidden')
          ])

          expect(linkHiddenAttribute).toBe('')
          expect(buttonHiddenAttribute).toBeNull()
          expect(subnavHiddenAttribute).toBe('')
        }
      })

      it('keeps the open sections open when the viewport is resized', async () => {
        // Navigate to a page where a section will be open
        await goTo(page, '/components/')

        const $buttonOfOpenSection = await page.$(
          '.govuk-service-navigation__item--active button'
        )
        const $subnavOfOpenSection = await page.$(
          '.govuk-service-navigation__item--active ul'
        )

        await expect(
          getAttribute($subnavOfOpenSection, 'hidden')
        ).resolves.toBeNull()
        await expect(
          getAttribute($buttonOfOpenSection, 'aria-expanded')
        ).resolves.toBe('true')

        await page.setViewport({ width: 1024, height: 768 })
        // Wait a little bit that the Media Query List reacting to the change of viewport
        // has triggered its 'change' event before we look at the page
        await page.waitForSelector(
          '[data-module="app-mobile-navigation-section"]:not([hidden])'
        )

        await expect(
          getAttribute($subnavOfOpenSection, 'hidden')
        ).resolves.toBe('')
        // Button remains expanded as it's hidden anyways
        await expect(
          getAttribute($buttonOfOpenSection, 'aria-expanded')
        ).resolves.toBe('true')

        await page.setViewport({ width: 375, height: 667 })
        // Wait a little bit that the Media Query List reacting to the change of viewport
        // has triggered its 'change' event before we look at the page
        await page.waitForSelector(
          '[data-module="app-mobile-navigation-section"][hidden]'
        )

        // When viewport is narrow again, the subnav is visible like it was before the viewport got larger
        await expect(
          getAttribute($subnavOfOpenSection, 'hidden')
        ).resolves.toBeNull()
        await expect(
          getAttribute($buttonOfOpenSection, 'aria-expanded')
        ).resolves.toBe('true')
      })
    })

    describe('On a section root', () => {
      beforeEach(async () => {
        await goTo(page, '/components/')
      })

      it('keeps sub-navigation in the active section open', async () => {
        const $serviceNavigationItem = await page.$(
          '.govuk-service-navigation__item--active'
        )

        const $button = await $serviceNavigationItem.$('button')
        const $subNavigation = await $serviceNavigationItem.$('ul')

        await expect(getAttribute($button, 'aria-expanded')).resolves.toBe(
          'true'
        )
        await expect(getAttribute($subNavigation, 'hidden')).resolves.toBeNull()
      })

      it('marks the overview as the current link', async () => {
        const $serviceNavigationItem = await page.$(
          '.govuk-service-navigation__item--active'
        )

        const $subNavigationOverviewLink = await $serviceNavigationItem.$(
          'ul a[href="/components/"]'
        )

        await expect(
          getAttribute($subNavigationOverviewLink, 'aria-current')
        ).resolves.toBe('page')
      })
    })

    describe('In a page within a section', () => {
      beforeEach(async () => {
        await goTo(page, '/components/button/')
      })

      it('keeps the active section open', async () => {
        const $serviceNavigationItem = await page.$(
          '.govuk-service-navigation__item--active'
        )

        const $button = await $serviceNavigationItem.$('button')
        const $subNavigation = await $serviceNavigationItem.$('ul')

        await expect(getAttribute($button, 'aria-expanded')).resolves.toBe(
          'true'
        )
        await expect(getAttribute($subNavigation, 'hidden')).resolves.toBeNull()
      })

      it('marks the overview as the current link', async () => {
        const $serviceNavigationItem = await page.$(
          '.govuk-service-navigation__item--active'
        )

        const $subNavigationLink = await $serviceNavigationItem.$(
          'ul a[href="/components/button/"]'
        )

        await expect(
          getAttribute($subNavigationLink, 'aria-current')
        ).resolves.toBe('page')
      })
    })
  })
})
