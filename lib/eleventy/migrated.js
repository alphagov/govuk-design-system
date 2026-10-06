const { readdirSync } = require('fs')
const { dirname, join } = require('path')

const { paths } = require('../../config')

/**
 * Pages within `src/` that 11ty should build
 *
 * @type {string[]}
 */
const migratedPaths = ['404.njk']

/**
 * Find all template files for 11ty to ignore during build
 *
 * @returns {string[]} Glob patterns to ignore
 */
function ignoredPaths() {
  const migrated = new Set(migratedPaths)

  // If a directory contains a migrated file, it needs to stay open
  const openDirs = new Set()
  for (const path of migratedPaths) {
    let dir = dirname(path)
    while (dir && dir !== '.') {
      openDirs.add(dir)
      dir = dirname(dir)
    }
  }

  /**
   * Recursively collect ignores under a directory.
   *
   * @param {string} dir - Directory relative to src/ ('' for the root)
   * @returns {string[]} Glob patterns to ignore under this directory
   */
  const collect = (dir) => {
    const ignores = []

    const entries = readdirSync(join(paths.source, dir), {
      withFileTypes: true
    })

    for (const entry of entries) {
      const rel = dir ? `${dir}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        // Recurse into directories that lead to a migrated page, ignore others
        ignores.push(...(openDirs.has(rel) ? collect(rel) : [`${rel}/**`]))
        continue
      }

      // Only templates need ignoring; other files are not built by 11ty
      if (/\.(md|njk|html)$/.test(rel) && !migrated.has(rel)) {
        ignores.push(rel)
      }
    }

    return ignores
  }

  return collect('')
}

module.exports = { ignoredPaths, migratedPaths }
