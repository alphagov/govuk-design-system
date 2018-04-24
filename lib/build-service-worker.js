'use strict'

const workbox = require('workbox-build')

module.exports = {
  generate: function () {
    return workbox.generateSW(
      require('../config/workbox-cli-config')
    ).then(() => {
      console.info('Service worker generation completed.')
    }).catch((error) => {
      console.warn('Service worker generation failed: ' + error)
    })
  },
  init: function () {
    this.generate()
  }
}
