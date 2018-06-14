/* global importScripts, workbox */
importScripts('/javascripts/vendor/workbox/workbox-sw.js')

// SETTINGS
workbox.setConfig({
  modulePathPrefix: '/javascripts/vendor/workbox/',
  // By default, workbox-sw will use the debug build for sites on localhost,
  // but for any other origin it’ll use the production build. Force by setting to true.
  // debug: true
})
// Verbose logging even for the production
// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// Cache settings
workbox.core.setCacheNameDetails({
  prefix: 'govuk-ds-cache'
})

// Modify SW update cycle
workbox.skipWaiting()
workbox.clientsClaim()

// PRECACHING
// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([], {
  cleanUrls: false,
  urlManipulation: ({ url }) => {
    // check for pathname that doesn't end in a '/' doesn't have a '.' (an extension)
    if (url.pathname && !url.pathname.endsWith('/') && !url.pathname.includes('.')) {
      console.warn('Rewriting!', url.pathname)
      // if so rewrite the path to include slash
      url['pathname'] = url['pathname'] + '/index.html'
      return [url]
    }
    return []
  }
})
