const { readFileSync } = require('fs')
const { dirname, join, resolve } = require('path')

// Third party metalsmith plugins and utilities
const inplace = require('@metalsmith/in-place') // render templating syntax in source files
const layouts = require('@metalsmith/layouts') // apply layouts to source files
const markdown = require('@metalsmith/markdown') // render markdown in source files
const permalinks = require('@metalsmith/permalinks') // apply a permalink pattern to files
const postcss = require('@metalsmith/postcss')
const sass = require('@metalsmith/sass') // convert Sass files to CSS using Dart Sass
const { glob } = require('glob') // Match files using glob patterns
const Metalsmith = require('metalsmith') // static site generator
const canonical = require('metalsmith-canonical') // add a canonical url property to pages
const renamer = require('metalsmith-renamer') // rename files
const slugger = require('slugger') // generate slugs from titles

// Helpers and config
const { paths, navigation: menuItems } = require('../config')
const colours = require('../lib/colours.js') // get colours data
const extractPageHeadings = require('../lib/extract-page-headings/index.js') // extract page headings into file meta data
const fileHelper = require('../lib/file-helper.js') // helper function to operate on files

// Local metalsmith plugins
const { hashAssets } = require('./fingerprints') // rename files with hash fingerprints
const generateSitemap = require('./generate-sitemap.js') // generate sitemap
const getMacroOptions = require('./get-macro-options/index.js')
const highlighter = require('./highlighter.js')
const DesignSystemRenderer = require('./marked-renderer.js')
const lunr = require('./metalsmith-lunr-index') // generate search index
const titleChecker = require('./metalsmith-title-checker.js')
const navigation = require('./navigation.js') // navigation plugin
const rollup = require('./rollup') // used to build GOV.UK Frontend JavaScript

// Static site generator
const metalsmith = Metalsmith(resolve(__dirname, '../'))

// Flag production mode (to skip plugins in development)
const isProduction = process.env.NODE_ENV !== 'development'

// Nunjucks engine options
const nunjucksOptions = {
  noCache: true, // never use a cache and recompile templates each time
  trimBlocks: true, // automatically remove trailing newlines
  lstripBlocks: true, // automatically remove leading whitespace

  // store views paths for rendering nunjucks syntax
  path: [
    join(paths.views, 'layouts'),
    join(paths.views, 'partials'),
    join(paths.source, 'components'),

    // Path to `govuk-frontend` export without `govuk/` suffix
    join(dirname(require.resolve('govuk-frontend')), '../')
  ],

  globals: {
    getFrontmatter: fileHelper.getFrontmatter,
    getNunjucksCode: fileHelper.getNunjucksCode,
    getHTMLCode: fileHelper.getHTMLCode,
    getFingerprint: fileHelper.getFingerprint,
    getMacroOptions
  },

  filters: {
    slugger,
    kebabCase: (string) => {
      return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
    }
  }
}

module.exports = metalsmith

  // notify build starting
  .use((files, metalsmith) =>
    metalsmith.debug('build').info('Metalsmith build running')
  )

  // source directory
  .source(paths.source)

  // destination directory
  .destination(paths.public)

  // clean destination before build
  .clean(true)

  // enable plugin optimisations in production etc
  .env({
    DEBUG: process.env.DEBUG,
    NODE_ENV: process.env.NODE_ENV ?? 'production'
  })

  // global variables used in layout files
  .metadata({
    title: '[TITLE NOT SET]',
    colours,

    // include access to metalsmith environment variables
    // used to e.g. detect when we're building in a preview environment
    env: (value) => metalsmith.env(value)
  })

  // rename .md files to .md.njk, so they're passed through the Nunjucks parser
  .use(renamer({
    markdown: {
      pattern: '**/*.md',
      rename: (name) => {
        return `${name}.njk`
      }
    }
  }))

// extract page headings
  .use(extractPageHeadings())

  // ignore files from build
  .ignore([
    '.DS_Store',
    '.eslintrc.js'
  ])

  // convert *.scss files to *.css
  .use(sass({
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
  }))

  .use(postcss({
    plugins: {
      autoprefixer: {}
    },
    map: {
      inline: false
    }
  }))

  .use(async (files, metalsmith, done) => {
    async function copyAssets (pattern, options) {
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
      copyAssets('{fonts,images}/*', {
        cwd: join(dirname(require.resolve('govuk-frontend')), 'assets'),
        dest: 'assets'
      }),

      copyAssets('**/iframeResizer.contentWindow.@(map|min.js)', {
        cwd: join(dirname(require.resolve('iframe-resizer')), 'js'),
        dest: 'javascripts/vendor'
      })
    ])

    done()
  })

  // build the entrypoint for application specific JavaScript
  .use(rollup('javascripts/application.mjs'))

  // build GOV.UK Frontend JavaScript
  .use(rollup('javascripts/govuk-frontend.mjs'))

  // build the entrypoint for example specific JavaScript
  .use(rollup('javascripts/example.mjs'))

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
  .use(inplace({
    pattern: '**/*.njk',
    engineOptions: nunjucksOptions
  }))

  // render markdown in source files
  .use(markdown({
    engineOptions: {
      breaks: true, // Enable line breaks
      mangle: false, // Don't mangle emails
      smartypants: true, // use "smart" typographic punctuation
      highlight: highlighter,
      renderer: new DesignSystemRenderer() // Markdown renderer
    }
  }))

  // apply a permalink pattern to files
  .use(permalinks({
    relative: false
  }))

  // add a canonical url property to pages
  .use(canonical({
    hostname: 'https://design-system.service.gov.uk',
    omitIndex: true,
    omitTrailingSlashes: false
  }))

  // apply navigation
  .use(navigation({
    items: menuItems
  }))

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
      pattern: [
        'search-index.json'
      ]
    })(files, metalsmith, done)
  })

  // apply layouts to source files
  .use(layouts({
    default: 'layout.njk',
    directory: join(paths.views, 'layouts'),
    pattern: '**/*.html',
    engineOptions: nunjucksOptions
  }))

  // generate a sitemap.xml in public/ folder
  .use(generateSitemap({
    hostname: 'https://design-system.service.gov.uk',
    pattern: ['**/*.html', '!**/default/*.html']
  }))

  // notify build complete
  .use((files, metalsmith) =>
    metalsmith.debug('build').info('Metalsmith build complete')
  )
