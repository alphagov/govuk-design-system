const { join, resolve } = require('path')

// Third party metalsmith plugins and utilities
const inPlace = require('@metalsmith/in-place') // render templating syntax in source files
const layouts = require('@metalsmith/layouts') // apply layouts to source files
const permalinks = require('@metalsmith/permalinks') // apply a permalink pattern to files
const Metalsmith = require('metalsmith') // static site generator
const canonical = require('metalsmith-canonical') // add a canonical url property to pages

// Helpers and config
const { paths, navigation: navConfig } = require('../config')
const colours = require('../data/colours.json') // get colours data
const nunjucksOptions = require('../lib/nunjucks/index.js') // nunjucks options

// Local metalsmith plugins
const {
  postCss,
  compileScript,
  compileSass,
  copyFrontendAssets,
  fingerprintAssets
} = require('./assets') // asset pipeline plugins
const { hashAssets } = require('./fingerprints') // rename files with hash fingerprints
const generateSitemap = require('./generate-sitemap.js') // generate sitemap
const nunjucksTransformer = require('./jstransformer-nunjucks')
const lunr = require('./metalsmith-lunr-index') // generate search index
const renderMarkdown = require('./metalsmith-render-markdown')
const titleChecker = require('./metalsmith-title-checker')
const navigation = require('./navigation.js') // navigation plugin
const redirects = require('./redirects')

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

  // convert *.scss files to *.css
  .use(compileSass())

  .use(postCss())

  .use(copyFrontendAssets)

  // build the entrypoints for application specific JavaScript
  .use(compileScript('javascripts/application.mjs'))
  .use(compileScript('javascripts/application-example.mjs'))

  // add hash to files in production
  .use(fingerprintAssets())

  // check titles are set
  .use(titleChecker())

  // render templating syntax in source files
  .use(
    inPlace({
      pattern: ['**/*.{md,njk}'],
      transform: nunjucksTransformer,
      engineOptions: nunjucksOptions
    })
  )

  // render markdown in source files and extract page headings
  .use(renderMarkdown())

  // apply a permalink pattern to files
  .use(permalinks())

  .use(redirects)

  // add a canonical url property to pages
  .use(
    canonical({
      hostname: 'https://design-system.service.gov.uk',
      omitIndex: true,
      omitTrailingSlashes: false
    })
  )

  // apply navigation
  .use(navigation(navConfig))

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
      transform: nunjucksTransformer
    })
  )

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
