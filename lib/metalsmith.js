const { resolve } = require('path')

// Third party metalsmith plugins and utilities
const permalinks = require('@metalsmith/permalinks') // apply a permalink pattern to files
const Metalsmith = require('metalsmith') // static site generator
const canonical = require('metalsmith-canonical') // add a canonical url property to pages

// Helpers and config
const { paths, navigation: menuItems } = require('../config')
const colours = require('../data/colours.json') // get colours data

// Local metalsmith plugins
const generateSitemap = require('./generate-sitemap.js') // generate sitemap
const lunr = require('./metalsmith-lunr-index') // generate search index
const renderMarkdown = require('./metalsmith-render-markdown')
const navigation = require('./navigation.js') // navigation plugin
// used to build GOV.UK Frontend JavaScript
const assets = require('./tasks/assets')
const content = require('./tasks/content')

// Static site generator
const metalsmith = Metalsmith(resolve(__dirname, '../'))

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

  .use(assets.compileSass())

  .use(assets.postProcessCSS())

  .use(assets.copyStaticAssets())

  .use(assets.buildScripts())

  .use(
    assets.fingerprintAssets(
      [
        '**/*.css?(.map)',
        'javascripts/*.{cjs,js,mjs}?(.map)',
        'javascripts/vendor/*'
      ],
      { enabled: isProduction }
    )
  )

  .use(content.checkTitles())

  .use(content.renderTemplates())

  .use(renderMarkdown())

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

  // Hash search index for cache busting in production builds
  .use(
    assets.fingerprintAssets(['search-index.json'], { enabled: isProduction })
  )

  // apply layouts to source files
  .use(content.applyLayouts())

  // generate a sitemap.xml in public/ folder
  .use(
    generateSitemap({
      hostname: 'https://design-system.service.gov.uk',
      pattern: ['**/*.html', '!**/default/*.html']
    })
  )

  // notify build complete
  .use(
    (files, metalsmith) =>
      metalsmith.watch() &&
      metalsmith.debug('build').info('Metalsmith build complete')
  )
