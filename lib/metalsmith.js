const metalsmith = require('metalsmith') // static site generator
const assets = require('metalsmith-assets') // copy static assets
const brokenLinkChecker = require('metalsmith-broken-link-checker')
const titleChecker = require('./metalsmith-title-checker.js')
const env = require('metalsmith-env') // environment vars plugin
const hashAssets = require('metalsmith-fingerprint-ignore') // add hash to specified files and ignores files that match a pattern
const inplace = require('metalsmith-in-place') // render templating syntax in your source files
const layouts = require('metalsmith-layouts') // apply layouts to source files
const tagcleaner = require('metalsmith-tagcleaner') // Use tag cleaner to remove <p> tags around images
const permalinks = require('metalsmith-permalinks') // apply a permalink pattern to files
const canonical = require('metalsmith-canonical') // add a canonical url property to pages
const timer = require('metalsmith-timer')

const sass = require('metalsmith-sass') // convert Sass files to CSS using LibSass
const postcss = require('metalsmith-postcss')

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
const paths = require('../config/paths.json') // specify paths to main working directories
const highlighter = require('./highlighter.js')
const getMacroOptions = require('./get-macro-options/index.js')

// check task, so we don't waste time running build steps in development
const checkTask = function(task){
  if (process.task == "build"){
    return task
  } else {
    return function (){}
  }
}

// store views paths for rendering nunjucks syntax
const views = [
  paths.layouts,
  paths.partials,
  paths.components,
  paths.govukfrontend,
  paths.govukfrontendcomponents
]

// static site generator
module.exports = metalsmith(__dirname) // __dirname defined by node.js: name of current working

  .use(timer("Start"))

  // global variables used in layout files
  .metadata({
    title: '[TITLE NOT SET]',
    colours: colours
  })

// extract page headings
  .use(extractPageHeadings())

  .use(timer("extractPageHeadings"))

  // source directory
  .source('../' + paths.source)

  // destination directory
  .destination('../' + paths.public)

  // clean destination before build
  .clean(true)

  // include environment variables as metalsmith metadata
  // used to e.g. detect when we're building in a preview environment
  .use(env())

  // convert *.scss files to *.css
  .use(sass({
    includePaths: ['node_modules'] // an array of paths that sass can look in when attempt to resolve @import declarations
  }))

  .use(timer("sass"))

  .use(postcss({
    plugins: {
      'autoprefixer': {}
    }
  }))

  .use(timer("postcss"))

  // copy static assets from node_modules/@govukfrontend
  .use(assets({
    source: '../' + paths.govukfrontend + 'assets/',
    destination: 'assets'
  }))

  // copy static assets from node_modules/iframe-resizer
  .use(assets({
    source: '../' + paths.iframeresizer + 'js/',
    destination: 'javascripts/vendor'
  }))

  .use(timer("assets"))

  // build custom modernizr.js file
  .use(modernizrBuild({
    config: '../config/modernizr.json',
    destination: 'javascripts/vendor/',
    filename: 'modernizr.js'
  }))

  .use(timer("modernizrBuild"))

  // build the entrypoint for the IE8 JavaScript that goes in the <head>
  .use(rollup({
    input: 'src/javascripts/head-ie8.js',
    output: {
      legacy: true,
      format: 'iife',
      file: 'javascripts/head-ie8.js'
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  .use(timer("rollup 1"))

  // build the entrypoint for application specific JavaScript
  .use(rollup({
    input: 'src/javascripts/application.js',
    output: {
      legacy: true,
      format: 'iife',
      file: 'javascripts/application.js'
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  .use(timer("rollup 2"))

  // build the entrypoint for application IE8 specific JavaScript
  .use(rollup({
    input: 'src/javascripts/application-ie8.js',
    output: {
      legacy: true,
      format: 'iife',
      file: 'javascripts/application-ie8.js'
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  .use(timer("rollup 3"))

  // build GOV.UK Frontend JavaScript
  .use(rollup({
    input: 'src/javascripts/govuk-frontend.js',
    output: {
      legacy: true,
      format: 'iife',
      file: 'javascripts/govuk-frontend.js'
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  .use(timer("rollup 4"))

  // build the entrypoint for example specific JavaScript
  .use(rollup({
    input: 'src/javascripts/example.js',
    output: {
      legacy: true,
      format: 'iife',
      file: 'javascripts/example.js'
    },
    plugins: [
      // TODO: Since we're not exporting ES6 Modules to NPM we need to import these as commonjs
      resolve(),
      commonjs()
    ]
  }))

  .use(timer("rollup 5"))

  // minify the JavaScript assets to reduce time it takes to download
  .use(checkTask(uglify({
    uglify: {
      ie8: true
    },
    sameName: true, // overwrite the original files, with the minified ones.
    files: [
      'javascripts/application-ie8.js',
      'javascripts/application.js',
      'javascripts/head-ie8.js',
      'javascripts/govuk-frontend.js',
      'javascripts/example.js'
    ]
  })))

  .use(timer("uglify"))

  // add hash to files
  .use(hashAssets({
    pattern: [
      '**/*.css',
      'javascripts/application-ie8.js',
      'javascripts/application.js',
      'javascripts/head-ie8.js',
      'javascripts/govuk-frontend.js',
      'javascripts/example.js'
    ]
  }))

  .use(timer("hashAssets"))

  // check titles are set
  .use(titleChecker())

  .use(timer("titleChecker"))

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
        getMacroOptions: getMacroOptions
      },
      filters: {
        highlight: highlighter,
        slugger
      },

      // Markdown engine options
      smartypants: true, // use "smart" typographic punctuation
      gfm: true,
      tables: true,
      pedantic: true,
      highlight: highlighter
    }
  }))

  .use(timer("inplace"))

  // use tag cleaner to remove <p> tags around images
  .use(tagcleaner())

  .use(timer("tagcleaner"))

  // apply a permalink pattern to files
  .use(permalinks({
    relative: false
  }))

  .use(timer("permalinks"))

  // add a canonical url property to pages
  .use(canonical({
    hostname: 'https://design-system.service.gov.uk',
    omitIndex: true,
    omitTrailingSlashes: false
  }))

  .use(timer("canonical"))

  // apply navigation
  .use(navigation())

  .use(timer("navigation"))

  // generate a search index
  .use(lunr())

  .use(timer("lunr"))

  // add hash to search index
  // we can't add it earlier with the rest
  // as we can only generate it just above
  .use(hashAssets({
    pattern: [
      'search-index.json'
    ]
  }))

  .use(timer("hashAssets"))

  // apply layouts to source files
  .use(layouts({
    default: 'layout.njk',
    directory: '../' + paths.layouts,
    pattern: '**/*.html',
    engineOptions: {
      path: views,
      globals: {
        joinPaths: fileHelper.joinPaths,
        getFingerprint: fileHelper.getFingerprint
      }
    }
  }))

  .use(timer("layouts"))

  // generate a sitemap.xml in public/ folder
  .use(generateSitemap({
    hostname: 'https://design-system.service.gov.uk',
    pattern: ['**/*.html', '!**/default/*.html']
  }))

  .use(timer("generateSitemap"))

  // check broken links
  .use(checkTask(brokenLinkChecker({
    // links to directories are allowed with or without a trailing slash (e.g. dir1/ or dir1)
    allowRedirects: true
  })))

  .use(timer("brokenLinkChecker"))

// Debug
// .use(debug())
