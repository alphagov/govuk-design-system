const { createHash } = require('crypto')
const { watch } = require('fs')

const { paths } = require('../config')
const nunjucksTransformer = require('../lib/jstransformer-nunjucks')

// Flags tracking whether sass/script files have changed since the last build.
// Start as true so the first build always runs all plugins.
let sassChanged = true
let scriptsChanged = true

let nunjucksWatcher

/**
 * Set up the nunjucks file watcher.
 * Nunjucks templates are cached by the transformer, so the cache
 * must be cleared when they change.
 */
function setupWatchers() {
  if (nunjucksWatcher) {
    return
  }

  nunjucksWatcher = watch(
    paths.views,
    { recursive: true },
    (eventType, filename) => {
      if (!filename || !filename.endsWith('.njk')) {
        return
      }
      nunjucksTransformer.resetCache()
    }
  )
}

const sassPattern = /\.s[ac]ss$/
const scriptPattern = /\.[cm]?js$/

let lastSassDigest = ''
let lastScriptsDigest = ''

/**
 * Compute an MD5 hex digest of all files matching a pattern
 *
 * @param {import('metalsmith').Files} files - Metalsmith files object
 * @param {RegExp} pattern - Pattern to match filenames against
 * @returns {string} Hex digest
 */
function digest(files, pattern) {
  const hash = createHash('md5')

  for (const [filename, file] of Object.entries(files)) {
    if (pattern.test(filename)) {
      hash.update(filename)
      hash.update(file.contents)
    }
  }

  return hash.digest('hex')
}

/**
 * Metalsmith plugin that detects whether sass or script files have
 * changed since the last build by comparing content digests.
 *
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
function detectChanges() {
  return (files, metalsmith, done) => {
    const sassDigest = digest(files, sassPattern)
    const scriptsDigest = digest(files, scriptPattern)

    sassChanged = sassDigest !== lastSassDigest
    scriptsChanged = scriptsDigest !== lastScriptsDigest

    lastSassDigest = sassDigest
    lastScriptsDigest = scriptsDigest

    done()
  }
}

/**
 * Wrap a Metalsmith plugin so it only runs when a condition is met
 *
 * @param {() => boolean} condition - Function returning true when the plugin should run
 * @param {import('metalsmith').Plugin} plugin - Metalsmith plugin to conditionally run
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
function skipUnless(condition, plugin) {
  return (files, metalsmith, done) => {
    if (!condition()) {
      return done()
    }
    return plugin(files, metalsmith, done)
  }
}

module.exports = {
  setupWatchers,
  detectChanges,
  skipUnless,

  get sassChanged() {
    return sassChanged
  },

  get scriptsChanged() {
    return scriptsChanged
  }
}
