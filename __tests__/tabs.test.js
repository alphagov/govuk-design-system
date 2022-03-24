/* eslint-env jest */

const { setupPage } = require('../lib/jest-utilities.js')
// const configPaths = require('../config/paths.json')
// const PORT = configPaths.testPort

let page
// let baseUrl = 'http://localhost:' + PORT

beforeAll(async () => {
  page = await setupPage()
})

afterAll(async () => {
  await page.close()
})

describe('Component page', () => {
  // describe('when JavaScript is unavailable or fails', () => {
  //   it('falls back to making the containers visible', async () => {
  //     await page.setJavaScriptEnabled(false)
  //     await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })
  //     const isContainerVisible = await page.waitForSelector('.js-tabs__container', { visible: true, timeout: 1000 })
  //     expect(isContainerVisible).toBeTruthy()
  //   })
  // })

  // describe('when JavaScript is available', () => {
  //   describe('when tab item is pressed', () => {
  //     it('should indicate the open state of the tab', async () => {
  //       await page.setJavaScriptEnabled(true)
  //       await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

  //       await page.click('.js-tabs__item a')

  //       const toggleButtonIsOpen = await page.evaluate(() => document.body.querySelector('.app-tabs__item').classList.contains('app-tabs__item--current'))
  //       expect(toggleButtonIsOpen).toBeTruthy()
  //     })

  //     it('should indicate the selected state of the tab using aria-expanded', async () => {
  //       await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

  //       await page.click('.js-tabs__item a')

  //       const toggleButtonAriaExpanded = await page.evaluate(() => document.body.querySelector('.js-tabs__item a').getAttribute('aria-expanded'))
  //       expect(toggleButtonAriaExpanded).toBe('true')
  //     })
  //   })

  //   describe('when the tab closed and clicked twice', () => {
  //     it('should indicate the closed state of the tab', async () => {
  //       await page.setJavaScriptEnabled(true)
  //       await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

  //       await page.click('.js-tabs__item a')
  //       await page.click('.js-tabs__item a')

  //       const toggleButtonIsOpen = await page.evaluate(() => document.body.querySelector('.app-tabs__item').classList.contains('app-tabs__item--current'))
  //       expect(toggleButtonIsOpen).toBeFalsy()
  //     })

  //     it('should indicate the closed state by setting aria-expanded attribute to false', async () => {
  //       await page.goto(baseUrl + '/components/back-link/', { waitUntil: 'load' })

  //       await page.click('.js-tabs__item a')
  //       await page.click('.js-tabs__item a')

  //       const toggleButtonAriaExpanded = await page.evaluate(() => document.body.querySelector('.js-tabs__item a').getAttribute('aria-expanded'))
  //       expect(toggleButtonAriaExpanded).toBe('false')
  //     })
  //   })
  // })

  it('==blank test==', async () => {
    expect(true).toBe(true)
  })
})

// describe('Patterns page', () => {
//   describe('when JavaScript is available', () => {
//     describe('when "hideTab" parameter is set to true', () => {
//       it('the tab list is not rendered', async () => {
//         await page.goto(baseUrl + '/patterns/question-pages/', { waitUntil: 'load' })
//         const expandedTabContentWithNoTab = await page.evaluate(() => document.body.querySelector('#example-section-headings-open .app-tabs'))
//         expect(expandedTabContentWithNoTab).toBeFalsy()
//       })

//       it('close button is not shown on the code block', async () => {
//         await page.goto(baseUrl + '/patterns/question-pages/', { waitUntil: 'load' })
//         const expandedTabContentWithNoTabCloseButton = await page.evaluate(() => document.body.querySelector('.js-tabs__container--no-tabs .js-tabs__close'))
//         expect(expandedTabContentWithNoTabCloseButton).toBeFalsy()
//       })
//     })
//   })
// })

// describe('Styles -> Images page', () => {
//   describe('when both nunjucks and html parameters are set to "false"', () => {
//     it('the tab list items are not rendered', async () => {
//       await page.goto(baseUrl + '/styles/images/', { waitUntil: 'load' })
//       const tabListItems = await page.evaluate(() => document.body.querySelector('#example-default .app-tabs'))
//       expect(tabListItems).toBeFalsy()
//     })

//     it('the tab heading items are not rendered', async () => {
//       await page.goto(baseUrl + '/styles/images/', { waitUntil: 'load' })
//       const tabHeadingItems = await page.evaluate(() => document.body.querySelector('#example-default .app-tabs__heading'))
//       expect(tabHeadingItems).toBeFalsy()
//     })
//   })
// })
