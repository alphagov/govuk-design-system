/**
 * Mocks requests to Google Tag Manager so our tests are not impacted by
 * possible errors in third party scripts
 *
 * @param {import('puppeteer').HTTPRequest} interceptedRequest
 * @returns
 */
function mockGoogleTagManagerScript(interceptedRequest) {
  if (interceptedRequest.isInterceptResolutionHandled()) return

  const requestURL = interceptedRequest.url()

  if (requestURL.startsWith('https://www.googletagmanager.com/')) {
    return interceptedRequest.respond({
      status: 200,
      contentType: 'text/javascript',
      body: 'window.GTMScriptIncluded=true;'
    })
  }

  return interceptedRequest.continue()
}

module.exports = { mockGoogleTagManagerScript }
