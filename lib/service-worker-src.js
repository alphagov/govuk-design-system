/* global importScripts, workbox */
const workboxDirectory = '/javascripts/vendor/workbox/'
importScripts(`${workboxDirectory}/workbox-sw.js`)

// SETTINGS
workbox.setConfig({
  modulePathPrefix: workboxDirectory
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

// Caching strategies
// Resources are requested from both the cache and the network in parallel.
// The strategy will respond with the cached version if available, otherwise
// wait for the network response. The cache is updated with the network response
// with each successful request.
workbox.routing.registerRoute(/\.(?:gif|jpg|png)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'govuk-ds-cache-images',
    plugins: [
      new workbox.expiration.Plugin({
        // 7 days cache before expiration
        maxAgeSeconds: 24 * 60 * 60 * 7,
        // Opt-in to automatic cleanup whenever a quota errors occurs anywhere in Workbox
        purgeOnQuotaError: true
      })
    ]
  })
)

// Using cache first strategy since the JS / CSS files are fingerprinted and this
// filename will change once a new version is created
workbox.routing.registerRoute(/\.(?:css|js)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'govuk-ds-cache-css-js',
    plugins: [
      new workbox.expiration.Plugin({
        // 7 days cache before expiration
        maxAgeSeconds: 24 * 60 * 60 * 7,
        // Opt-in to automatic cleanup whenever a quota errors occurs anywhere in Workbox
        purgeOnQuotaError: true // Opt-in to automatic cleanup.
      })
    ]
  })
)

// Using cache first strategy since the font files are revisioned and won't
// change often
workbox.routing.registerRoute(/\.(?:woff2)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'govuk-ds-cache-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        // 7 days cache before expiration
        maxAgeSeconds: 24 * 60 * 60 * 7
      })
    ]
  })
)

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

// Modify SW update cycle
workbox.skipWaiting()
workbox.clientsClaim()
