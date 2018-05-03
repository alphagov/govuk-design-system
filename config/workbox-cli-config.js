const paths = require('./paths.json') // specify paths to main working directories

module.exports = {
  globDirectory: paths.public,
  globPatterns: [
    '**/*.{html,js,css,png,jpg}'
  ],
  swDest: paths.public + 'service-worker.js',
  importWorkboxFrom: 'local',
  skipWaiting: true,
  clientsClaim: true,
  directoryIndex: 'index.html',
  cacheId: 'govuk-ds',
  runtimeCaching: [{
    urlPattern: /.*/,
    handler: 'networkFirst'
  },
  {
    urlPattern: new RegExp('https://www.google-analytics.com/analytics.js'),
    handler: 'networkFirst',
    options: {
      expiration: {
        maxAgeSeconds: 60 * 60
      }
    }
  },
  {
    urlPattern: new RegExp('https://www.googletagmanager.com/gtm.js'),
    handler: 'networkFirst',
    options: {
      expiration: {
        maxAgeSeconds: 60 * 60
      }
    }
  }]
}
