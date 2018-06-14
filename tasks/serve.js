const browsersync = require('metalsmith-browser-sync') // setup synchronised browser testing
const metalsmith = require('../lib/metalsmith') // configured static site generator
const paths = require('../config/paths.json') // specify paths to main working directories
const generateServiceWorker = require('../lib/build-service-worker') // setup service worker generation

// setup synchronised browser testing
metalsmith.use(browsersync({
  ghostMode: false, // Ghost mode tries to check the same input across examples.
  open: false, // When making changes to the server, we don't want multiple windows opening.
  server: paths.public, // server directory
  port: 4000, // unique port for service worker on 'localhost'
  files: [
    paths.source + '**/*',
    paths.views + '**/*',
    'node_modules/govuk-frontend/**/*'
  ] // files to watch
}))

// build to destination directory
metalsmith.build(function (err, files) {
  if (err) { throw err }
  // after all files are built, generate the service worker and copy workbox assets
  generateServiceWorker.init()
})
