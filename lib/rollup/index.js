const { normalize, resolve } = require('path')

const { rollup } = require('rollup')
const { minify } = require('terser')

/**
 * Metalsmith Rollup plugin
 *
 * @param {import('rollup').RollupFileOptions} config - Rollup file options
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (config) => async (files, metalsmith, done) => {
  const file = normalize(config.input)
  const map = `${file}.map`

  try {
    // Create Rollup bundle
    const bundle = await rollup({
      ...config, input: resolve(metalsmith.source(), file)
    })

    // Configure source maps
    if (config.output.sourcemap) {
      config.output.sourcemapFile = file
    }

    // Compile Rollup bundle
    const result = await bundle.generate(config.output)

    // Minify Rollup bundle
    const minified = await minify({ [file]: result.code }, {
      format: { comments: false },

      // Include source maps
      sourceMap: config.output.sourcemap && {
        content: result.map,
        filename: result.map.file,
        url: `${result.map.file}.map`,
        includeSources: true
      },

      // Compatibility workarounds
      ecma: 5,
      ie8: true,
      safari10: true
    })

    // Update Metalsmith file contents
    files[file] = {
      contents: Buffer.from(minified.code)
    }

    // Add Metalsmith source map file
    if (config.output.sourcemap) {
      files[map] = {
        contents: Buffer.from(minified.map)
      }
    }

    done()
  } catch (error) {
    done(error)
  }
}

module.exports = plugin
