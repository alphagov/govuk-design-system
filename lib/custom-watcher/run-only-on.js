// lib/custom-watcher/run-only-on.js
const { relative } = require('path')

const micromatch = require('micromatch')

const { paths } = require('../../config')

/**
 * Wrap a plugin to only run on changed files
 *
 * @param {string|string[]} patterns - Original glob pattern(s)
 * @param {Function} plugin - The plugin function
 * @param {object} [options] - Plugin options (will be modified if provided)
 * @returns {Function} Wrapped plugin
 */
function runOnlyOn(patterns, plugin, options = {}) {
  return (files, metalsmith, done) => {
    const changedFiles = metalsmith.metadata().changedFiles

    // On first build, run normally with original options
    if (!changedFiles) {
      return plugin(options)(files, metalsmith, done)
    }

    // Convert changed files to Metalsmith file keys (remove source directory prefix)
    const changedFileKeys = changedFiles.map((file) => {
      const rel = relative(paths.source, file)
      // If file is not in source directory, return as-is
      return rel.startsWith('..') ? file : rel
    })

    // Find changed files that match the pattern
    const changedMatching = micromatch(changedFileKeys, patterns)

    // If none match, skip
    if (changedMatching.length === 0) {
      metalsmith.debug('run-only-on')(`⏭️ Skipping - no changed files match`)
      return done()
    }

    metalsmith.debug('run-only-on')(
      `✓ Running on ${changedMatching.length} changed file(s): ${changedMatching.join(', ')}`
    )

    // Create modified options with filtered pattern
    const modifiedOptions = {
      ...options,
      pattern: changedMatching
    }

    metalsmith.debug('run-only-on')(
      `🔧 Modified options pattern: ${JSON.stringify(changedMatching)}`
    )

    // Run plugin with modified options
    return plugin(modifiedOptions)(files, metalsmith, done)
  }
}

module.exports = runOnlyOn
