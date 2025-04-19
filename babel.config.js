/**
 * Babel config
 *
 * @type {import('@babel/core').ConfigFunction}
 */
module.exports = function (api) {
  const isBrowser = !api.env('test')

  const browserslistEnv = isBrowser ? 'javascripts' : 'node'

  const presets = [
    [
      '@babel/preset-env',
      {
        browserslistEnv,
        // Apply bug fixes to avoid transforms
        bugfixes: true,

        // Apply smaller "loose" transforms for browsers
        loose: isBrowser,

        // Skip ES module transforms for browsers
        modules: isBrowser ? false : 'auto'
      }
    ]
  ]

  return {
    presets
  }
}
