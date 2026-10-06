const { readFileSync } = require('fs')
const { dirname, join } = require('path')

const postcss = require('@metalsmith/postcss')
const sass = require('@metalsmith/sass') // convert Sass files to CSS using Dart Sass
const { glob } = require('glob') // match files using glob patterns
const { NodePackageImporter } = require('sass')

const { paths } = require('../../config')
const { hashAssets } = require('../fingerprints') // rename files with hash fingerprints
const rollup = require('../rollup') // used to build GOV.UK Frontend JavaScript

// Flag production mode (to skip plugins in development)
const isProduction = process.env.NODE_ENV !== 'development'

/**
 * Convert *.scss files to *.css
 *
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const compileSass = () =>
  sass({
    quietDeps: true,
    sourceMapIncludeSources: true,
    sourceMap: true,
    importers: [new NodePackageImporter()],
    loadPaths: [join(paths.source, 'stylesheets')]
  })

/**
 * Post-process CSS
 *
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const postCss = () =>
  postcss({
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

/**
 * Copy GOV.UK Frontend static assets
 *
 * @type {import('metalsmith').Plugin}
 */
const copyFrontendAssets = async (files, metalsmith, done) => {
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
    copyAssets('{fonts/*,images/*,manifest.json}', {
      cwd: join(dirname(require.resolve('govuk-frontend')), 'assets'),
      dest: 'assets'
    }),

    copyAssets('govuk-frontend.min.css?(.map)', {
      cwd: dirname(require.resolve('govuk-frontend')),
      dest: 'stylesheets'
    })
  ])

  done()
}

/**
 * Compile JavaScript entrypoint
 *
 * @param {string} path - JavaScript entry file
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const compileScript = (path) => rollup(path)

/**
 * Rename asset files with hash fingerprints
 *
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const fingerprintAssets = () => (files, metalsmith, done) => {
  if (!isProduction) {
    return done()
  }

  return hashAssets({
    pattern: [
      '**/*.css?(.map)',
      'javascripts/*.{cjs,js,mjs}?(.map)',
      'javascripts/vendor/*'
    ]
  })(files, metalsmith, done)
}

module.exports = {
  postCss,
  compileScript,
  compileSass,
  copyFrontendAssets,
  fingerprintAssets
}
