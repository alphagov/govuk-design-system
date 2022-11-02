// Based on metalsmith-beautify (https://github.com/boushley/metalsmith-beautify)

const debug = require('debug')('metalsmith-html-beautify')
const jsBeautify = require('js-beautify')
const extname = require('path').extname

/**
 * Check if a `file` is the specified type
 *
 * @param {String} file
 * @return {Boolean}
 */
function isHtml (file) {
  return /\.html|\.htm/.test(extname(file))
}

/**
 * Metalsmith plugin to beautify HTML
 *
 * @param {Object} [options]
 * @return {Function}
 */
function beautifyHTML (userOptions = {}) {
  const defaults = {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    wrap_line_length: 0
  }

  const options = { ...defaults, ...userOptions }

  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      debug('checking file: %s', file)
      let data = files[file]
      let formatted

      if (isHtml(file)) {
        debug('processing file as html: %s', file)
        formatted = jsBeautify.html(data.contents.toString(), options)
      }

      if (formatted) {
        data.contents = Buffer.from(formatted)
      }
    })
    done()
  }
}

// Expose `plugin`
module.exports = beautifyHTML
