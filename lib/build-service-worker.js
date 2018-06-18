'use strict'
const { injectManifest } = require('workbox-build')
const PrecacheChecks = require('./precache-checks')
// allow node to copy directories recursively
const ncp = require('ncp').ncp

module.exports = {
  copyWorkboxLibs: function () {
    // recursively copy workbox folder into deployment
    ncp('./lib/workbox/workbox-v3.2.0/', './deploy/public/design-system/javascripts/vendor/workbox/', function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('Successfully copied Workbox files to public folder!')
    })
  },
  generate: function () {
    injectManifest(
      require('../config/workbox-cli-config')
    )
    // notify console of generation data
      .then(({ count, size }) => {
        console.info(`Service worker generation complete which will precache ${count} files, totaling ${(size / 1024 / 1024).toFixed(2)} megabytes.`)

        return { count, size }
      })
    // basic check to see if there has been a large number of file additions since last generation
      .then(({ count, size }) => {
      // Run basic checks to see difference between previous version then log to terminal
        PrecacheChecks.runChecks(count, size)
      })
      .catch((error) => {
        console.error('Service worker generation failed: ' + error)
      })
  },
  init: function () {
    // generate the service worker
    this.generate()
    // copy workbox files into deployment folder
    this.copyWorkboxLibs()
  }
}
