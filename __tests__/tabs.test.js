const { goTo, getAttribute, isVisible } = require('../lib/puppeteer-helpers.js')

describe('Component page', () => {
  let $module

  let $tabsItems
  let $tabsLinks
  let $tabsContainers

  async function setup (page) {
    $module = await page.$('[data-module="app-tabs"]')

    $tabsItems = await $module.$$('.app-tabs__item')
    $tabsLinks = await $module.$$('.app-tabs__item a')
    $tabsContainers = await $module.$$('.js-tabs__container')
  }

  beforeEach(async () => {
    await page.setJavaScriptEnabled(true)

    await goTo(page, '/components/back-link/')
    await setup(page)
  })

  describe('when JavaScript is unavailable or fails', () => {
    it('falls back to making the containers visible', async () => {
      await page.setJavaScriptEnabled(false)

      // Reload page again
      await page.reload()
      await setup(page)

      for await (const isTabVisible of $tabsContainers.map(isVisible)) {
        expect(isTabVisible).toBe(true)
      }
    })
  })

  describe('when JavaScript is available', () => {
    describe('when tab item is pressed', () => {
      it('should indicate the open state of the tab', async () => {
        await $tabsLinks[0].click()

        // Tab item marked current
        await expect(getAttribute($tabsItems[0], 'class')).resolves
          .toContain('app-tabs__item--current')
      })

      it('should indicate the selected state of the tab using aria-expanded', async () => {
        await $tabsLinks[0].click()

        // Tab link control expanded
        await expect(getAttribute($tabsLinks[0], 'aria-expanded')).resolves
          .toBe('true')
      })
    })

    describe('when the tab closed and clicked twice', () => {
      it('should indicate the closed state of the tab', async () => {
        await $tabsLinks[0].click()
        await $tabsLinks[0].click()

        // Tab item not marked current
        await expect(getAttribute($tabsItems[0], 'class')).resolves
          .not.toContain('app-tabs__item--current')
      })

      it('should indicate the closed state by setting aria-expanded attribute to false', async () => {
        await $tabsLinks[0].click()
        await $tabsLinks[0].click()

        // Tab link control expanded
        await expect(getAttribute($tabsLinks[0], 'aria-expanded')).resolves
          .toBe('false')
      })
    })
  })
})

describe('Patterns page', () => {
  beforeEach(async () => {
    await goTo(page, '/patterns/question-pages/')
  })

  describe('when JavaScript is available', () => {
    describe('when "hideTab" parameter is set to true', () => {
      it('the tab list is not rendered', async () => {
        const $expandedTabContentWithNoTab = await page.$('#section-headings-question-pages-example-open .app-tabs')
        expect($expandedTabContentWithNoTab).toBeNull()
      })

      it('close button is not shown on the code block', async () => {
        const $expandedTabContentWithNoTabCloseButton = await page.$('.js-tabs__container--no-tabs .js-tabs__close')
        expect($expandedTabContentWithNoTabCloseButton).toBeNull()
      })
    })
  })
})

describe('Styles -> Images page', () => {
  beforeEach(async () => {
    await goTo(page, '/styles/images/')
  })

  describe('when both nunjucks and html parameters are set to "false"', () => {
    it('the tab list items are not rendered', async () => {
      const $tabListItems = await page.$('#example-default .app-tabs')
      expect($tabListItems).toBeNull()
    })

    it('the tab heading items are not rendered', async () => {
      const $tabHeadingItems = await page.$('#example-default .app-tabs__heading')
      expect($tabHeadingItems).toBeNull()
    })
  })
})
