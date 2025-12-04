const { dirname, join } = require('path')

const postcss = require('@metalsmith/postcss')
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

function postProcessCSS() {
  return postcss({
    plugins: {
      // Add vendor prefixes
      autoprefixer: {
        env: 'stylesheets'
      }
    },
    map: {
      inline: false
    }
  })
}

module.exports = {
  compileSass,
  postProcessCSS
}
