const sm = require('sitemap')
const path = require('path')
const paths = require('./paths.js')
const fs = require('fs-extra')
const match = require('multimatch')

// Only include keys that have values
const removeEmptyKeys = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== '') {
      newObj[prop] = obj[prop]
    }
  })
  return newObj
}

/**
 * Plugin to generate a sitemap with sitemap.js
 *
 * @param {Object} options
 *  @property {String} hostname
 *  @property {String} changefreq (optional)
 *  @property {Date}   lastmod (optional)
 *  @property {String} priority (optional)
 *  @property {String} destination (optional)
 *  @property {String} filename (optional)
 *  @property {String} pattern (optional)
 * @return {Function}
 */

const plugin = (opts) => {
  opts = opts || {}

  if (!opts.hostname) {
    throw new Error('"hostname" is required')
  }

  // sitemap.js options
  const hostname = opts.hostname
  const changefreq = opts.changefreq
  const lastmod = opts.lastmod
  const priority = opts.priority

  // additional options
  const destination = opts.destination || paths.public
  const filename = opts.filename || 'sitemap.xml'
  const pattern = opts.pattern || '**/*.html'

  return function (files, metalsmith, done) {
    const sitemap = sm.createSitemap({
      hostname: hostname
    })

    // Checks whether files should be processed
    const checkPattern = (file, frontmatter) => {
      // Only include files that match the pattern
      if (!match(file, pattern)[0]) {
        return false
      }

      // Exclude examples from the sitemap
      if (frontmatter.layout && frontmatter.layout.startsWith('layout-example')) {
        return false
      }

      // Ignore files if set to true
      if (frontmatter.ignore_in_sitemap) {
        return false
      }
      return true
    }

    Object.keys(files).sort().forEach(function (file) {
      // Get the current file's frontmatter
      const frontmatter = files[file]

      // Only process files that pass the check
      if (!checkPattern(file, frontmatter)) {
        return
      }

      // Use canonical in frontmatter instead of the file's canonical data
      // set by metalsmith-canonical plugin
      let url = frontmatter.canonical ? frontmatter.canonical : files[file].canonical

      let sitemapEntry = {
        url: url,
        changefreq: frontmatter.changefreq || changefreq,
        lastmod: frontmatter.lastmod || lastmod,
        priority: frontmatter.priority || priority
      }

      // Add the files to the sitemap and remove empty keys
      sitemap.add(removeEmptyKeys(sitemapEntry))
    })

    // create a sitemap
    fs.writeFile(path.join(destination, filename), sitemap.toString(), done)
  }
}
module.exports = plugin
