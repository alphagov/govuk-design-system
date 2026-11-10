const { readFileSync } = require('node:fs')
const { glob } = require('node:fs/promises')
const { dirname, join, resolve } = require('node:path')

// Third party metalsmith plugins and utilities
const inPlace = require('@metalsmith/in-place') // Render templating syntax in source files
const layouts = require('@metalsmith/layouts') // Apply layouts to source files
const permalinks = require('@metalsmith/permalinks') // Apply a permalink pattern to files
const postcss = require('@metalsmith/postcss')
const sass = require('@metalsmith/sass') // Convert Sass files to CSS using Dart Sass
const Metalsmith = require('metalsmith') // Static site generator
const canonical = require('metalsmith-canonical') // Add a canonical url property to pages
const { NodePackageImporter } = require('sass')

// Helpers and config
const { paths, navigation: navConfig } = require('../config')
const colours = require('../data/colours.json') // Get colours data
const nunjucksOptions = require('../lib/nunjucks/index.js') // Nunjucks options

// Local metalsmith plugins
const { hashAssets } = require('./fingerprints') // Rename files with hash fingerprints
const generateSitemap = require('./generate-sitemap.js') // Generate sitemap
const nunjucksTransformer = require('./jstransformer-nunjucks')
const lunr = require('./metalsmith-lunr-index') // Generate search index
const renderMarkdown = require('./metalsmith-render-markdown')
const titleChecker = require('./metalsmith-title-checker')
const navigation = require('./navigation.js') // Navigation plugin
const redirects = require('./redirects')
const rollup = require('./rollup') // Used to build GOV.UK Frontend JavaScript

// Static site generator
const metalsmith = Metalsmith(resolve(__dirname, '../'))

// Flag production mode (to skip plugins in development)
const isProduction = process.env.NODE_ENV !== 'development'

module.exports = metalsmith

  // Notify build starting
  .use(
    (files, metalsmith) =>
      metalsmith.watch() &&
      metalsmith.debug('build').info('Metalsmith build running')
  )

  // Source directory
  .source(paths.source)

  // Destination directory
  .destination(paths.public)

  // Clean destination for production builds
  .clean(isProduction)

  // Enable plugin optimisations in production etc
  .env({
    DEBUG: process.env.DEBUG,

    // Node.js build environment
    NODE_ENV: process.env.NODE_ENV ?? 'production',

    // Netlify deploy context
    // https://docs.netlify.com/site-deploys/overview/#deploy-contexts
    CONTEXT: process.env.CONTEXT ?? 'production',

    // Netlify variables for preview banner
    BRANCH: process.env.BRANCH,
    REVIEW_ID: process.env.REVIEW_ID,
    PULL_REQUEST: process.env.PULL_REQUEST
  })

  // global variables used in layout files
  .metadata({
    title: '[TITLE NOT SET]',
    colours,

    // Include access to metalsmith environment variables
    // used to e.g. detect when we're building in a preview environment
    env: (value) => metalsmith.env(value)
  })

  // ignore files from build
  .ignore(['.DS_Store', '.eslintrc.js', 'tsconfig.json'])

  // Convert *.scss files to *.css
  .use(
    sass({
      quietDeps: true,
      sourceMapIncludeSources: true,
      sourceMap: true,
      importers: [new NodePackageImporter()],
      loadPaths: [join(paths.source, 'stylesheets')]
    })
  )

  .use(
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
  )

  .use(async (files, metalsmith, done) => {
    async function copyAssets(pattern, options) {
      const assets = await glob(pattern, options)

      // Because glob returns an AsyncIterator rather than an array, await the
      // for loop so that we can still iterate assets as if it were an array
      for await (const asset of assets) {
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
  })

  // Build the entrypoints for application specific JavaScript
  .use(rollup('javascripts/application.mjs'))
  .use(rollup('javascripts/application-example.mjs'))

  // Add hash to files in production
  .use((files, metalsmith, done) => {
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
  })

  // Check titles are set
  .use(titleChecker())

  // Render templating syntax in source files
  .use(
    inPlace({
      pattern: ['**/*.{md,njk}'],
      transform: nunjucksTransformer,
      engineOptions: nunjucksOptions
    })
  )

  // Render markdown in source files and extract page headings
  .use(renderMarkdown())

  // Apply a permalink pattern to files
  .use(permalinks())

  .use(redirects)

  // Add a canonical url property to pages
  .use(
    canonical({
      hostname: 'https://design-system.service.gov.uk',
      omitIndex: true,
      omitTrailingSlashes: false
    })
  )

  // Apply navigation
  .use(navigation(navConfig))

  // Generate a search index
  .use(lunr())

  // Add hash to search index in production
  // we can't add it earlier with the rest
  // as we can only generate it just above
  .use((files, metalsmith, done) => {
    if (!isProduction) {
      return done()
    }

    return hashAssets({
      pattern: ['search-index.json']
    })(files, metalsmith, done)
  })

  // Apply layouts to source files
  .use(
    layouts({
      default: 'layout.njk',
      directory: join(paths.views, 'layouts'),
      pattern: ['**/*.html'],
      engineOptions: nunjucksOptions,
      transform: nunjucksTransformer
    })
  )

  // Generate a sitemap.xml in public/ folder
  .use(
    generateSitemap({
      hostname: 'https://design-system.service.gov.uk',
      pattern: ['**/*.html', '!**/default/*.html']
    })
  )

  // Notify build complete
  .use(
    (files, metalsmith) =>
      metalsmith.watch() &&
      metalsmith.debug('build').info('Metalsmith build complete')
  )
