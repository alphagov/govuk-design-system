const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')

/**
 * @type {import('rollup').MergedRollupOptions[]}
 */
module.exports = [{
  output: [
    {
      entryFileNames: '[name].js',
      sourcemap: true,

      // Self-executing function, suitable for <script> tags
      format: 'iife',

      // Output plugins
      plugins: [
        terser({
          format: { comments: false },

          // Include sources content from source maps
          // to inspect GOV.UK Frontend code
          sourceMap: {
            includeSources: true
          },

          // Compatibility workarounds
          ecma: 5,
          safari10: true
        })
      ]
    }
  ],

  // Input plugins
  plugins: [
    resolve(),
    commonjs()
  ]
}]
