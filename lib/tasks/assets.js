const { readFileSync } = require('fs')
const { dirname, join } = require('path')

const postcss = require('@metalsmith/postcss')
const sass = require('@metalsmith/sass')
const { glob } = require('glob')

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

function copyStaticAssets() {
  return async (files, metalsmith, done) => {
    async function copyAssets(pattern, options) {
      const assets = await glob(pattern, options)

      for (const asset of assets) {
        const input = join(options.cwd, asset)
        const output = join(options.dest, asset)

        files[output] = {
          contents: readFileSync(input)
        }
      }
    }

    await Promise.all([
      copyAssets(
        '{rebrand/images/*,rebrand/manifest.json,fonts/*,images/*,manifest.json}',
        {
          cwd: join(dirname(require.resolve('govuk-frontend')), 'assets'),
          dest: 'assets'
        }
      ),

      copyAssets('govuk-frontend.min.css?(.map)', {
        cwd: dirname(require.resolve('govuk-frontend')),
        dest: 'stylesheets'
      })
    ])

    done()
  }
}

module.exports = {
  compileSass,
  copyStaticAssets,
  postProcessCSS
}
