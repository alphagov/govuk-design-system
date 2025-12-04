const { dirname, join } = require('path')

const sass = require('@metalsmith/sass')

const { paths } = require('../../config')

function compileSass() {
  return sass({
    quietDeps: true,
    silenceDeprecations: [
      'color-functions',
      'global-builtin',
      'import',
      'mixed-decls'
    ],
    sourceMapIncludeSources: true,
    sourceMap: true,

    // Resolve @imports via
    loadPaths: [
      join(paths.root, 'node_modules'),
      join(paths.source, 'stylesheets'),

      // Path to `govuk-frontend` export without `govuk/` suffix
      join(dirname(require.resolve('govuk-frontend')), '../')
    ]
  })
}

module.exports = {
  compileSass
}
