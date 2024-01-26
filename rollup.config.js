const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const { defineConfig } = require('rollup')

/**
 * Rollup config
 */
module.exports = defineConfig({
  output: [
    {
      entryFileNames: '[name].js',
      sourcemap: true,

      // Self-executing function, suitable for <script> tags
      format: 'iife',

      // Output plugins
      plugins: [
        process.env.NODE_ENV !== 'development' &&
          terser({
            format: { comments: false },

            // Include sources content from source maps
            // to inspect GOV.UK Frontend code
            sourceMap: {
              includeSources: true
            },

            // Compatibility workarounds
            safari10: true
          })
      ]
    }
  ],

  // Input plugins
  plugins: [resolve(), commonjs()]
})
