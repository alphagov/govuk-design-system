const { readFileSync } = require('fs')
const { dirname, join, resolve } = require('path')

// Third party metalsmith plugins and utilities
const inPlace = require('@metalsmith/in-place') // render templating syntax in source files
const layouts = require('@metalsmith/layouts') // apply layouts to source files
const permalinks = require('@metalsmith/permalinks') // apply a permalink pattern to files
const postcss = require('@metalsmith/postcss')
const sass = require('@metalsmith/sass') // convert Sass files to CSS using Dart Sass
const { glob } = require('glob') // Match files using glob patterns
const Metalsmith = require('metalsmith') // static site generator
const canonical = require('metalsmith-canonical') // add a canonical url property to pages
const tracer = require('metalsmith-tracer').default

// Helpers and config
const { paths, navigation: menuItems } = require('../config')
const colours = require('../data/colours.json') // get colours data
const nunjucksOptions = require('../lib/nunjucks/index.js') // nunjucks options

// Local metalsmith plugins
const tracker = require('./file-tracker')
const { hashAssets } = require('./fingerprints') // rename files with hash fingerprints
const generateSitemap = require('./generate-sitemap.js') // generate sitemap
const lunr = require('./metalsmith-lunr-index') // generate search index
const renderMarkdown = require('./metalsmith-render-markdown')
const titleChecker = require('./metalsmith-title-checker')
const navigation = require('./navigation.js') // navigation plugin
const rollup = require('./rollup') // used to build GOV.UK Frontend JavaScript

// Static site generator
const metalsmith = tracer(Metalsmith(resolve(__dirname, '../')))

// Flag production mode (to skip plugins in development)
const isProduction = process.env.NODE_ENV !== 'development'

module.exports = metalsmith

  // notify build starting
  .use(
    (files, metalsmith) =>
      metalsmith.watch() &&
      metalsmith.debug('build').info('Metalsmith build running')
  )

  // source directory
  .source(paths.source)

  // destination directory
  .destination(paths.public)

  // clean destination for production builds
  .clean(isProduction)

  // enable plugin optimisations in production etc
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

    // include access to metalsmith environment variables
    // used to e.g. detect when we're building in a preview environment
    env: (value) => metalsmith.env(value)
  })

  // ignore files from build
  .ignore(['.DS_Store', '.eslintrc.js', 'tsconfig.json'])

  .use(tracker.updateMetadata())

  // convert *.scss files to *.css
  .use(
    tracker.runIfPatternMatches(
      '**/*.scss',
      sass({
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
    )
  )

  .use(
    tracker.runIfPatternMatches(
      '**/*.scss',
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
  )

  .use(async (files, metalsmith, done) => {
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
  })

  // build the entrypoints for application specific JavaScript
  .use(
    tracker.runIfPatternMatches(
      '**/*.{mjs,js}',
      rollup('javascripts/application.mjs')
    )
  )
  .use(
    tracker.runIfPatternMatches(
      '**/*.{mjs,js}',
      rollup('javascripts/application-example.mjs')
    )
  )

  // add hash to files in production
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

  // check titles are set
  .use(titleChecker())

  // render templating syntax in source files
  .use(
    tracker.runOnMatchedFiles(['**/*.{md,njk}'], inPlace, {
      pattern: ['**/*.{md,njk}'],
      transform: 'jstransformer-nunjucks',
      engineOptions: nunjucksOptions
    })
  )

  // render markdown in source files and extract page headings
  .use(renderMarkdown())

  // apply a permalink pattern to files
  .use(permalinks())

  // add a canonical url property to pages
  .use(
    canonical({
      hostname: 'https://design-system.service.gov.uk',
      omitIndex: true,
      omitTrailingSlashes: false
    })
  )

  // apply navigation
  .use(
    navigation({
      items: menuItems
    })
  )

  // generate a search index
  .use(lunr())

  // add hash to search index in production
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

  // apply layouts to source files
  .use(
    layouts({
      default: 'layout.njk',
      directory: join(paths.views, 'layouts'),
      pattern: ['**/*.html'],
      engineOptions: nunjucksOptions,
      transform: 'nunjucks'
    })
  )

  // generate a sitemap.xml in public/ folder
  .use(
    generateSitemap({
      hostname: 'https://design-system.service.gov.uk',
      pattern: ['**/*.html', '!**/default/*.html']
    })
  )

  .use(tracker.filterOutputFiles())

  // notify build complete
  .use(
    (files, metalsmith) =>
      metalsmith.watch() &&
      metalsmith.debug('build').info('Metalsmith build complete')
  )
