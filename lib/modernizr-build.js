const modernizr = require('modernizr')
const { mkdir, writeFile } = require('fs')
const { dirname, join } = require('path')
const paths = require('./paths.js')

/**
 * Metalsmith plugin to create a custom modernizr build
 *
 * @return {Function}
 */

const plugin = (opts) => {
  opts = opts || {}
  const buildConfig = require(opts.config)
  return function (files, metalsmith, done) {
    modernizr.build(buildConfig, (content) => {
      const filePath = join(paths.public, opts.destination, opts.filename)

      // Ensures that the directory exists. If the directory structure does not exist, it is created. Like mkdir -p.
      mkdir(dirname(filePath), { recursive: true }, err => {
        if (err) {
          return console.log('Failed to create directories for modernizr build', err)
        }
        writeFile(filePath, content, done)
      })
    })
  }
}
module.exports = plugin
