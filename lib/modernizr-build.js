const modernizr = require('modernizr')
const { join } = require('path')

/**
 * Metalsmith plugin to create a custom modernizr build
 *
 * @param {object} opts - Sitemap options
 * @param {string} opts.config - Path to modernizr config
 * @param {string} opts.destination - Destination directory
 * @param {string} opts.filename - Destination filename
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (opts) => {
  opts = opts || {}
  const buildConfig = require(opts.config)
  return function (files, metalsmith, done) {
    modernizr.build(buildConfig, (content) => {
      const filePath = join(opts.destination, opts.filename)

      // Add Metalsmith file
      files[filePath] = {
        contents: Buffer.from(content)
      }

      done()
    })
  }
}
module.exports = plugin
