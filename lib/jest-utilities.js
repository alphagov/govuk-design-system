async function setupPage (emulate) {
  let page = await global.browser.newPage()

  // Inject a global flag to avoid running analytics code while the tests are running.
  await page.evaluateOnNewDocument(() => {
    window.__TESTS_RUNNING = true
  })

  if (emulate) {
    await page.emulate(emulate)
  }

  // Capture JavaScript errors.
  page.on('pageerror', error => {
    throw error
  })

  return page
}

module.exports = {
  setupPage
}
