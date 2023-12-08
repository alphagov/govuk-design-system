const { streamToPromise, SitemapStream } = require('sitemap')

// Only include keys that have values
const removeEmptyKeys = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== '') {
      newObj[prop] = obj[prop]
    }
  })
  return newObj
}

/**
 * Plugin to generate a sitemap
 *
 * See Sitemaps XML format for more information
 * {@link https://www.sitemaps.org/protocol.html}
 *
 * @param {object} opts - Sitemap options
 * @param {string} opts.hostname - Parent URL for each entry
 * @param {'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'} [opts.changefreq] - Default change frequency for each entry
 * @param {string} [opts.lastmod] - Default last modified date in ISO format
 * @param {string} [opts.priority] - Default priority for each entry between 0-1
 * @param {string} [opts.filename] - Sitemap filename, e.g. sitemap.xml
 * @param {string | string[]} [opts.pattern] - Minimatch pattern
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (opts) => {
  if (!opts.hostname) {
    throw new Error('"hostname" is required')
  }

  // sitemap.js options
  const hostname = opts.hostname
  const changefreq = opts.changefreq
  const lastmod = opts.lastmod
  const priority = opts.priority

  // additional options
  const filename = opts.filename || 'sitemap.xml'
  const pattern = opts.pattern || '**/*.html'

  return async function (files, metalsmith, done) {
    const { default: match } = await import('multimatch')

    const sitemap = new SitemapStream({
      hostname,
      xmlns: {
        image: false,
        news: false,
        video: false,

        // Turn on HTML namespace
        // https://www.w3.org/1999/xhtml/
        xhtml: true
      }
    })

    // Checks whether files should be processed
    const checkPattern = (file, frontmatter) => {
      // Only include files that match the pattern
      if (!match(file, pattern)[0]) {
        return false
      }

      // Exclude examples from the sitemap
      if (
        frontmatter.layout &&
        frontmatter.layout.startsWith('layout-example')
      ) {
        return false
      }

      // Ignore files if set to true
      if (frontmatter.ignoreInSitemap) {
        return false
      }
      return true
    }

    Object.keys(files)
      .sort()
      .forEach(function (file) {
        // Get the current file's frontmatter
        const frontmatter = files[file]

        // Only process files that pass the check
        if (!checkPattern(file, frontmatter)) {
          return
        }

        // Use canonical in frontmatter instead of the file's canonical data
        // set by metalsmith-canonical plugin
        const url = frontmatter.canonical
          ? frontmatter.canonical
          : files[file].canonical

        const sitemapEntry = {
          url,
          changefreq: frontmatter.changefreq || changefreq,
          lastmod: frontmatter.lastmod || lastmod,
          priority: frontmatter.priority || priority
        }

        // Add the files to the sitemap and remove empty keys
        sitemap.write(removeEmptyKeys(sitemapEntry))
      })

    sitemap.end()

    // Add Metalsmith file
    files[filename] = {
      contents: await streamToPromise(sitemap)
    }

    done()
  }
}
module.exports = plugin
