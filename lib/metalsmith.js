const path = require('path')

const metalsmith = require('metalsmith') // static site generator
const include = require('metalsmith-include-files') // include static assets
const brokenLinkChecker = require('metalsmith-broken-link-checker')
const titleChecker = require('./metalsmith-title-checker.js')
const env = require('metalsmith-env') // environment vars plugin
const hashAssets = require('metalsmith-fingerprint-ignore') // add hash to specified files and ignores files that match a pattern
const inplace = require('@metalsmith/in-place') // render templating syntax in your source files
const layouts = require('@metalsmith/layouts') // apply layouts to source files
const tagcleaner = require('metalsmith-tagcleaner') // Use tag cleaner to remove <p> tags around images
const permalinks = require('@metalsmith/permalinks') // apply a permalink pattern to files
const canonical = require('metalsmith-canonical') // add a canonical url property to pages

const sass = require('@metalsmith/sass') // convert Sass files to CSS using Dart Sass
const postcss = require('@metalsmith/postcss')

const rollup = require('metalsmith-rollup') // used to build GOV.UK Frontend JavaScript
const resolve = require('rollup-plugin-node-resolve') // rollup plugin to resolve node_modules
const commonjs = require('rollup-plugin-commonjs') // rollup plugin to convert CommonJS modules to ES2015
const uglify = require('metalsmith-uglify') // minify the JavaScript assets to reduce time it takes to download

// const debug = require('./debug')                          // debug plugin
const navigation = require('./navigation.js') // navigation plugin
const modernizrBuild = require('./modernizr-build.js') // modernizr build plugin
const generateSitemap = require('./generate-sitemap.js') // generate sitemap
const lunr = require('./metalsmith-lunr-index') // generate search index
const extractPageHeadings = require('../lib/extract-page-headings/index.js') // extract page headings into file meta data
const slugger = require('slugger') // generate slugs from titles

const colours = require('../lib/colours.js') // get colours data
const fileHelper = require('../lib/file-helper.js') // helper function to operate on files
const paths = require('./paths.js') // specify paths to main working directories
const highlighter = require('./highlighter.js')
const getMacroOptions = require('./get-macro-options/index.js')

// store views paths for rendering nunjucks syntax
const views = [
  paths.layouts,
  paths.partials,
  paths.components,
  paths.govukfrontend
]

// static site generator
module.exports = metalsmith(__dirname) // __dirname defined by node.js: name of current working

  // global variables used in layout files
  .metadata({
    title: '[TITLE NOT SET]',
    colours
  })

// extract page headings
  .use(extractPageHeadings())

  // source directory
  .source(path.join('../', paths.source))

  // Ignore internal config
  .ignore('.eslintrc.js')

  // destination directory
  .destination(path.join('../', paths.public))

  // clean destination before build
  .clean(true)

  // include environment variables as metalsmith metadata
  // used to e.g. detect when we're building in a preview environment
  .use(env())

  // convert *.scss files to *.css
  .use(sass({
    quietDeps: true,
    loadPaths: ['node_modules', 'src/stylesheets'] // an array of paths that sass can look in when attempt to resolve @import declarations
  }))

  .use(postcss({
    plugins: {
      autoprefixer: {}
    }
  }))

  .use(include({
    assets: [
      path.join('**/', paths.govukfrontend, 'govuk/assets/*')
    ],
    'assets/fonts': [
      path.join('**/', paths.govukfrontend, 'govuk/assets/fonts/*')
    ],
    'assets/images': [
      path.join('**/', paths.govukfrontend, 'govuk/assets/images/*')
    ],
    'javascripts/vendor': [
      path.join('**/', paths.iframeresizer, 'js/*')
    ]
  }))

  // build custom modernizr.js file
  .use(modernizrBuild({
    config: path.normalize('../config/modernizr.json'),
    destination: path.normalize('javascripts/vendor/'),
    filename: 'modernizr.js'
  }))

  // build the entrypoint for the IE8 JavaScript that goes in the <head>
  .use(rollup({
    input: path.normalize('src/javascripts/head-ie8.js'),
    output: {
      legacy: true,
      format: 'iife',
      file: path.normalize('javascripts/head-ie8.js')
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  // build the entrypoint for application specific JavaScript
  .use(rollup({
    input: path.normalize('src/javascripts/application.js'),
    output: {
      legacy: true,
      format: 'iife',
      file: path.normalize('javascripts/application.js')
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  // build the entrypoint for application IE8 specific JavaScript
  .use(rollup({
    input: path.normalize('src/javascripts/application-ie8.js'),
    output: {
      legacy: true,
      format: 'iife',
      file: path.normalize('javascripts/application-ie8.js')
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  // build GOV.UK Frontend JavaScript
  .use(rollup({
    input: path.normalize('src/javascripts/govuk-frontend.js'),
    output: {
      legacy: true,
      format: 'iife',
      file: path.normalize('javascripts/govuk-frontend.js')
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  // build the entrypoint for example specific JavaScript
  .use(rollup({
    input: path.normalize('src/javascripts/example.js'),
    output: {
      legacy: true,
      format: 'iife',
      file: path.normalize('javascripts/example.js')
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  // minify the JavaScript assets to reduce time it takes to download
  .use(uglify({
    uglify: {
      ie8: true
    },
    sameName: true, // overwrite the original files, with the minified ones.
    files: [
      path.normalize('javascripts/application-ie8.js'),
      path.normalize('javascripts/application.js'),
      path.normalize('javascripts/head-ie8.js'),
      path.normalize('javascripts/govuk-frontend.js'),
      path.normalize('javascripts/example.js')
    ]
  }))

  // add hash to files
  .use(hashAssets({
    pattern: [
      '**\\*.css',
      '**/*.css',
      path.normalize('javascripts/application-ie8.js'),
      path.normalize('javascripts/application.js'),
      path.normalize('javascripts/head-ie8.js'),
      path.normalize('javascripts/govuk-frontend.js'),
      path.normalize('javascripts/example.js')
    ]
  }))

  // check titles are set
  .use(titleChecker())

  // render templating syntax in source files
  .use(inplace({
    pattern: '**/*.njk',
    engineOptions: {
      // Nunjucks engine options
      path: views,
      noCache: true, // never use a cache and recompile templates each time
      trimBlocks: true, // automatically remove trailing newlines
      lstripBlocks: true, // automatically remove leading whitespace
      globals: {
        getFrontmatter: fileHelper.getFrontmatter,
        getNunjucksCode: fileHelper.getNunjucksCode,
        getHTMLCode: fileHelper.getHTMLCode,
        getFingerprint: fileHelper.getFingerprint,
        getMacroOptions
      },
      filters: {
        highlight: highlighter,
        slugger,
        kebabCase: (string) => {
          return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
        }
      },

      // Markdown engine options
      mangle: false, // Don't mangle emails
      smartypants: true, // use "smart" typographic punctuation
      highlight: highlighter
    }
  }))

  // use tag cleaner to remove <p> tags around images
  .use(tagcleaner())

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
  .use(navigation())

  // generate a search index
  .use(lunr())

  // add hash to search index
  // we can't add it earlier with the rest
  // as we can only generate it just above
  .use(hashAssets({
    pattern: [
      'search-index.json'
    ]
  }))

  // apply layouts to source files
  .use(layouts({
    default: 'layout.njk',
    directory: path.join('../', paths.layouts),
    pattern: '**/*.html',
    engineOptions: {
      path: views,
      globals: {
        joinPaths: fileHelper.joinPaths,
        getFingerprint: fileHelper.getFingerprint
      }
    }
  }))

  // generate a sitemap.xml in public/ folder
  .use(generateSitemap({
    hostname: 'https://design-system.service.gov.uk',
    pattern: ['**/*.html', '!**/default/*.html']
  }))

  // check broken links
  .use(brokenLinkChecker())

// Debug
// .use(debug())
