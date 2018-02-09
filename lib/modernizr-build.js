const modernizr = require('modernizr')
const fs = require('fs-extra')
const path = require('path')
const paths = require('../config/paths.json')

/**
 * Metalsmith plugin to create a custom modernizr build
 *
 * @return {Function}
 */

const plugin = (opts) => {
  opts = opts || {}
  let buildConfig = require(opts.config)
  return function (files, metalsmith, done) {
    modernizr.build(buildConfig, (content) => {
      // Ensures that the directory exists. If the directory structure does not exist, it is created. Like mkdir -p.
      fs.ensureDir(path.join(paths.public, opts.destination), err => {
        if (err) {
          return console.log('Failed to create directories for modernizr build', err)
        }
        fs.writeFile(path.join(paths.public, opts.destination, opts.filename), content, done)
      })
    })
  }
}
module.exports = plugin
