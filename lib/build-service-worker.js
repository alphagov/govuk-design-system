'use strict'

const { injectManifest } = require('workbox-build')
const PrecacheChecks = require('./precache-checks')

module.exports = {
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
    this.generate()
  }
}
