// lib/custom-watcher/skip-unless.js
const micromatch = require('micromatch')

/**
 * Wrap a plugin to only run if files matching the pattern have changed
 *
 * @param {string|string[]} patterns - Glob pattern(s) to match against changed files
 * @param {Function} plugin - Metalsmith plugin to conditionally run
 * @returns {Function} Wrapped plugin
 */
function skipUnless(patterns, plugin) {
  return (files, metalsmith, done) => {
    const changedFiles = metalsmith.metadata().changedFiles

    // Always run on first build (changedFiles === null) or production
    if (changedFiles === null || changedFiles === undefined) {
      return plugin(files, metalsmith, done)
    }

    const matches = micromatch(changedFiles, patterns)

    if (matches.length === 0) {
      return done()
    }

    return plugin(files, metalsmith, done)
  }
}

module.exports = skipUnless
