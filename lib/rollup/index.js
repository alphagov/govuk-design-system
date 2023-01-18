const { normalize, resolve } = require('path')

const { rollup } = require('rollup')

/**
 * Metalsmith Rollup plugin
 *
 * @param {import('rollup').RollupFileOptions} config - Rollup file options
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (config) => async (files, metalsmith, done) => {
  const file = normalize(config.input)

  // Resolve paths from Metalsmith source
  config.input = resolve(metalsmith.source(), file)
  config.output.file = resolve(metalsmith.destination(), file)

  try {
    // Create Rollup bundle
    const bundle = await rollup(config)

    // Compile Rollup bundle
    const result = await bundle.generate(config.output)

    // Update Metalsmith file contents
    files[file] = {
      contents: Buffer.from(result.code)
    }

    done()
  } catch (error) {
    done(error)
  }
}

module.exports = plugin
