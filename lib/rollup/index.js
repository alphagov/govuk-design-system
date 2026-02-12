const { statSync } = require('fs')
const { dirname, join, normalize } = require('path')

const { globSync } = require('glob')
const { rollup } = require('rollup')

const config = require('../../rollup.config')

let lastJsMtime = 0

// Get the last time any file in the javascripts folder was modified
function jsFolderLastModified(sourceDir) {
  const files = globSync('javascripts/**/*.{js,mjs}', {
    cwd: sourceDir,
    nodir: true
  })
  return files.reduce((max, file) => {
    const mtime = statSync(join(sourceDir, file)).mtimeMs
    return Math.max(max, mtime)
  }, 0)
}

// Rollup cache shared between builds
let cache

/**
 * Metalsmith Rollup plugin
 *
 * @param {import('rollup').InputOptions['input']} modulePath - File path to module
 * @param {import('rollup').OutputOptions['name']} moduleName - Module name (optional)
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (modulePath, moduleName) => async (files, metalsmith, done) => {
  // If no JS files have changed, skip the Rollup build
  if (metalsmith.watch()) {
    const mtime = jsFolderLastModified(metalsmith.source())
    if (mtime <= lastJsMtime) {
      return done()
    }
    lastJsMtime = mtime
  }
  modulePath = normalize(modulePath)

  // Remove Metalsmith file source
  delete files[modulePath]

  try {
    const input = join(metalsmith.source(), modulePath)

    // Create Rollup bundle(s)
    const bundle = await rollup({ ...config, cache, input })

    // Compile Rollup bundle(s)
    const results = [config.output]
      .flat()
      .map((output) => bundle.generate({ ...output, name: moduleName }))

    // Update Rollup cache
    cache = bundle.cache

    // Update Metalsmith file contents
    for await (const result of results) {
      for (const chunk of result.output) {
        const file = join(dirname(modulePath), chunk.fileName)
        const contents = chunk.code || chunk.source

        files[file] = {
          contents: Buffer.from(contents)
        }
      }
    }

    done()
  } catch (error) {
    done(error)
  }
}

module.exports = plugin
