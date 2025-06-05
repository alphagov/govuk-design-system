const { readFileSync, existsSync, cpSync } = require('fs')
const { dirname, join, resolve } = require('path')

// Third party metalsmith plugins and utilities
const inPlace = require('@metalsmith/in-place') // render templating syntax in source files
const layouts = require('@metalsmith/layouts') // apply layouts to source files
const permalinks = require('@metalsmith/permalinks') // apply a permalink pattern to files
const postcss = require('@metalsmith/postcss')
const sass = require('@metalsmith/sass') // convert Sass files to CSS using Dart Sass
const { glob } = require('glob') // Match files using glob patterns
const Metalsmith = require('metalsmith') // static site generator
const { default: cache } = require('metalsmith-build-cache')
const canonical = require('metalsmith-canonical') // add a canonical url property to pages
const { default: tracer } = require('metalsmith-tracer')

// Helpers and config
const { paths, navigation: menuItems } = require('../config')
const colours = require('../lib/colours.js') // get colours data
const nunjucksOptions = require('../lib/nunjucks/index.js') // nunjucks options
const rebrandedNunjucksOptions = {
  ...nunjucksOptions,
  globals: {
    ...nunjucksOptions.globals,
    govukRebrand: true
  }
}

// Local metalsmith plugins
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

const env = {
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
}

const metadata = {
  title: '[TITLE NOT SET]',
  colours,

  // include access to metalsmith environment variables
  // used to e.g. detect when we're building in a preview environment
  env: (value) => env(value)
}

module.exports.merge = function () {
  const buildDir = resolve(__dirname, '../build')
  const stagingCss = resolve(__dirname, '../.staging/css')
  const stagingAssets = resolve(__dirname, '../.staging/assets')

  // Copy CSS
  if (existsSync(stagingCss)) {
    cpSync(stagingCss, buildDir, { recursive: true })
  }
  // Copy Assets
  if (existsSync(stagingAssets)) {
    cpSync(stagingAssets, buildDir, { recursive: true })
  }
}

// Clean
module.exports.clean = async function () {
  tracer(Metalsmith(resolve(__dirname, '../')))
    .source(paths.source)
    .destination(paths.public)
    .clean(isProduction)
}

// Compile CSS
module.exports.compileCSS = async function () {
  await cache
    .metalsmith(tracer(Metalsmith(resolve(__dirname, '../'))))
    .source(paths.source)
    .destination(join(paths.staging, 'css'))
    .env(env)
    .metadata(metadata)
    .ignore([
      '**/*.md',
      '**/*.html',
      '**/*.svg',
      '**/*.njk',
      '**/*.jpg',
      '**/*.png',
      '**/*.gif',
      '**/*.mp4',
      '**/*.mjs',
      '**/*.DS_Store',
      '**/*.ts',
      '.eslintrc.js',
      'tsconfig.json',
      'global.d.ts'
    ])
    .use(
      sass({
        quietDeps: true,
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
    .build()
}

// Copy assets
module.exports.copyAssets = async function () {
  await cache
    .metalsmith(tracer(Metalsmith(resolve(__dirname, '../'))))
    .source(paths.source)
    .destination(join(paths.staging, 'assets'))
    .env(env)
    .metadata(metadata)
    .ignore([
      '**/*.md',
      '**/*.html',
      '**/*.svg',
      '**/*.njk',
      '**/*.jpg',
      '**/*.png',
      '**/*.gif',
      '**/*.mp4',
      '**/*.mjs',
      '**/*.DS_Store',
      '**/*.ts',
      '**/*.scss',
      '.eslintrc.js',
      'tsconfig.json',
      'global.d.ts'
    ])
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
    })
    .build()
}

module.exports.metalsmith = metalsmith

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

  // build the entrypoints for application specific JavaScript
  .use(rollup('javascripts/application.mjs'))
  .use(rollup('javascripts/application-example.mjs'))

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

  // Duplicate files which should have branded examples
  .use(async (files, metalsmith, done) => {
    Object.keys(files).forEach((file) => {
      if (files[file].rebrand) {
        const newFile = file.replace('index.njk', 'branded.njk')
        files[newFile] = { ...files[file] }
      }
    })
    done()
  })

  // render legacy templating syntax in source files
  .use(
    inPlace({
      pattern: ['**/*.{md,njk}', '!**/branded.njk'],
      transform: 'jstransformer-nunjucks',
      engineOptions: nunjucksOptions
    })
  )

  // render rebranded templating syntax in source files
  .use(
    inPlace({
      pattern: '**/branded.njk',
      transform: 'jstransformer-nunjucks',
      engineOptions: rebrandedNunjucksOptions
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
      pattern: ['**/*.html', '!**/branded/**/*.html'],
      engineOptions: nunjucksOptions,
      transform: 'nunjucks'
    })
  )

  // apply layouts to source files
  .use(
    layouts({
      default: 'layout.njk',
      directory: join(paths.views, 'layouts'),
      pattern: '**/branded/**/*.html',
      engineOptions: rebrandedNunjucksOptions,
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

  // notify build complete
  .use(
    (files, metalsmith) =>
      metalsmith.watch() &&
      metalsmith.debug('build').info('Metalsmith build complete')
  )
