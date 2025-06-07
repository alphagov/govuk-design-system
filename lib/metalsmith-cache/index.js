const { createHash } = require('crypto')
const { existsSync, rmSync, mkdirSync, writeFileSync } = require('fs')
const { join } = require('path')

const { root } = require('../../config/paths.js')

/**
 *
 * @param {string} name - The name for the cached process
 * @param {string | string[]} pattern - Minimatch pattern
 * @param {Function} plugin - A Metalsmith plugin to run with caching
 * @param {object} [options] - Plugin options
 * @param {boolean} [options.isProduction] - Whether the build is in production mode
 * @param {string} [options.cacheDir] - Directory to store cache files, defaults to '.cache'
 * @returns {Function} - The caching plugin function
 */
module.exports = function metalsmithCache(name, pattern, plugin, options = {}) {
  const cacheDir = options.cacheDir || '.cache'

  return function (files, metalsmith, done) {
    // never cache in production
    if (options.isProduction) {
      return plugin(files, metalsmith, done)
    }

    const cachePath = join(root, cacheDir, name)

    const hash = createHash('md5')
      .update(
        metalsmith
          .match(pattern)
          .sort()
          .map((filename) => filename + files[filename].contents)
          .join('')
      )
      .digest('hex')

    const marker = join(cachePath, `metalsmith-cache-${name}-${hash}`)

    if (!existsSync(marker)) {
      rmSync(cachePath, { recursive: true, force: true })
      mkdirSync(cachePath, { recursive: true })
      writeFileSync(marker, '')

      return plugin(files, metalsmith, done)
    }
    return done()
  }
}
