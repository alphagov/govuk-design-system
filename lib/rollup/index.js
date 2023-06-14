const { dirname, join, normalize } = require('path')

const { rollup } = require('rollup')

const config = require('../../rollup.config')

/**
 * Metalsmith Rollup plugin
 *
 * @param {import('rollup').InputOptions['input']} modulePath - File path to module
 * @param {import('rollup').OutputOptions['name']} moduleName - Module name (optional)
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (modulePath, moduleName) => async (files, metalsmith, done) => {
  modulePath = normalize(modulePath)

  // Remove Metalsmith file source
  delete files[modulePath]

  try {
    const input = join(metalsmith.source(), modulePath)

    // Create Rollup bundle(s)
    for (const options of config) {
      const bundle = await rollup({ ...options, input })

      // Compile Rollup bundle(s)
      const results = options.output.map((output) =>
        bundle.generate({ ...output, name: moduleName }))

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
    }

    done()
  } catch (error) {
    done(error)
  }
}

module.exports = plugin
