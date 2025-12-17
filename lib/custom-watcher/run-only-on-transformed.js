// lib/custom-watcher/run-only-on-transformed.js
const { parse } = require('path')

const micromatch = require('micromatch')

/**
 * Wrap a plugin to only run on changed files, accounting for file transformations
 *
 * This is for plugins that run AFTER files have been transformed (e.g., layouts runs after in-place/markdown)
 * It takes the original changed source files and transforms their paths to match the current pipeline state
 *
 * @param {string|string[]} patterns - Original glob pattern(s)
 * @param {Function} plugin - The plugin function
 * @param {object} [options] - Plugin options (will be modified if provided)
 * @param {Function} [transformPath] - Function to transform source paths to current paths
 * @returns {Function} Wrapped plugin
 */
function runOnlyOnTransformed(
  patterns,
  plugin,
  options = {},
  transformPath = null
) {
  return (files, metalsmith, done) => {
    const changedFiles = metalsmith.metadata().changedFiles

    // On first build, run normally with original options
    if (!changedFiles) {
      return plugin(options)(files, metalsmith, done)
    }

    // Transform the changed file paths to match their current state
    const transformedPaths = changedFiles.map((file) => {
      if (transformPath) {
        return transformPath(file)
      }

      // Default transformation: .md -> .html, .njk -> .html
      const parsed = parse(file)
      if (parsed.ext === '.md' || parsed.ext === '.njk') {
        return `${parsed.dir ? `${parsed.dir}/` : ''}${parsed.name}.html`
      }
      return file
    })

    // Find which transformed files match the pattern
    const changedMatching = micromatch(transformedPaths, patterns)

    // If none match, skip
    if (changedMatching.length === 0) {
      metalsmith.debug('run-only-on-transformed')(
        `⏭️ Skipping - no changed files match`
      )
      return done()
    }

    metalsmith.debug('run-only-on-transformed')(
      `✓ Running on ${changedMatching.length} transformed file(s): ${changedMatching.join(', ')}`
    )

    // Create modified options with filtered pattern
    const modifiedOptions = {
      ...options,
      pattern: changedMatching
    }

    // Run plugin with modified options
    return plugin(modifiedOptions)(files, metalsmith, done)
  }
}

module.exports = runOnlyOnTransformed
