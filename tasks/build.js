const metalsmith = require('../lib/metalsmith') // configured static site generator
const generateServiceWorker = require('../lib/build-service-worker') // setup service worker generation

// build to destination directory
metalsmith.build(function (err, files) {
  if (err) { throw err }
  // after all files are built, generate the service worker
  generateServiceWorker.init()
})
