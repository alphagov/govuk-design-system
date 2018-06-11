const metalsmith = require('metalsmith')                     // static site generator
const assets = require('metalsmith-assets')                  // copy static assets
const brokenLinkChecker = require('metalsmith-broken-link-checker')
const titleChecker = require('./metalsmith-title-checker.js')
const concat = require('metalsmith-concat')                  // concatenate files
const env = require('metalsmith-env')                        // environment vars plugin
const hashAssets = require('metalsmith-fingerprint-ignore')  // add hash to specified files and ignores files that match a pattern
const inplace = require('metalsmith-in-place')               // render templating syntax in your source files
const layouts = require('metalsmith-layouts')                // apply layouts to source files
const markdown = require('metalsmith-markdown')              // convert markdown files to html
const metallic = require('metalsmith-metallic')              // highlight code in markdown files
const tagcleaner = require('metalsmith-tagcleaner')          // Use tag cleaner to remove <p> tags around images
const permalinks = require('metalsmith-permalinks')          // apply a permalink pattern to files
const sass = require('metalsmith-sass')                      // convert Sass files to CSS using LibSass

const rollup = require('metalsmith-rollup')                  // used to build GOV.UK Frontend JavaScript
const resolve = require('rollup-plugin-node-resolve')        // rollup plugin to resolve node_modules
const commonjs = require('rollup-plugin-commonjs')           // rollup plugin to convert CommonJS modules to ES2015

// const debug = require('./debug')                          // debug plugin
const navigation = require('./navigation.js')                // navigation plugin
const modernizrBuild = require('./modernizr-build.js')       // modernizr build plugin

const colours = require('../lib/colours.js')                 // get colours data
const fileHelper = require('../lib/file-helper.js')          // helper function to operate on files
const paths = require('../config/paths.json')                // specify paths to main working directories

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

  // global variables used in layout files
  .metadata({
    title: '[TITLE NOT SET]',
    colours: colours
  })

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

  // copy static minified assets from node_modules/clipboard/dist
  .use(assets({
    source: '../' + paths.clipboard,
    destination: 'javascripts/vendor'
  }))

  // copy static assets from node_modules/html5shiv/dist
  .use(assets({
    source: '../' + paths.html5shiv,
    destination: 'javascripts/vendor'
  }))

  // copy static assets from node_modules/jquery/dist
  .use(assets({
    source: '../' + paths.jquery,
    destination: 'javascripts/vendor'
  }))

  // concatenate javascript files
  .use(concat({
    files: [
      'javascripts/vendor/jquery.js',
      'javascripts/vendor/clipboard.min.js',
      'javascripts/vendor/iframeResizer.min.js',
      'javascripts/components/example.js',
      'javascripts/components/tabs.js',
      'javascripts/components/copy.js',
      'javascripts/components/mobile-navigation.js',
      'javascripts/components/cookie-banner.js',
      'javascripts/main.js'
    ],
    output: 'javascripts/application.js'
  }))

  // concatenate IE only javascript files
  .use(concat({
    files: [
      'javascripts/vendor/html5shiv-printshiv.js',
      'javascripts/vendor/ie8.polyfils.min.js',
      'javascripts/ie-only.js'
    ],
    output: 'javascripts/ie.js'
  }))

  // build custom modernizr.js file
  .use(modernizrBuild({
    config: '../config/modernizr.json',
    destination: 'javascripts/vendor/',
    filename: 'modernizr.js'
  }))

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

  // add hash to files
  .use(hashAssets({
    pattern: [
      'stylesheets/main.css',
      'stylesheets/main-ie8.css',
      'javascripts/application.js',
      'javascripts/ie.js',
      'javascripts/govuk-frontend.js'
    ]
  }))

  // check titles are set
  .use(titleChecker())

  // render templating syntax in source files
  .use(inplace({
    pattern: '**/*.njk',
    engineOptions: {
      path: views,
      autoescape: true, // escape all output by default
      noCache: true, // never use a cache and recompile templates each time
      trimBlocks: true, // automatically remove trailing newlines from a block/tag
      lstripBlocks: true, // automatically remove leading whitespace from a block/tag
      globals: {
        getFrontmatter: fileHelper.getFrontmatter,
        getNunjucksCode: fileHelper.getNunjucksCode,
        getHTMLCode: fileHelper.getHTMLCode
      }
    }
  }))

  // highlight code in *.md files, requires a highlight.js theme included in views
  .use(metallic())

  // transpile all *.md into html
  .use(markdown({
    smartypants: true, // use "smart" typograhic punctuation for things like quotes and dashes
    gfm: true, // enable GitHub flavored markdown
    tables: true, // enable GitHub flavored markdown tables; this option requires the gfm option to be true
    pedantic: {
      // conform to obscure parts of markdown.pl as much as possible; allows markdown inside block-level elements
      ignoreHtml: true,
      outdent: true,
      code: true,
      inline: true
    }
  }))

  // use tag cleaner to remove <p> tags around images
  .use(tagcleaner())

  // apply a permalink pattern to files
  .use(permalinks({
    relative: false
  }))

  // apply navigation
  .use(navigation())

  // apply layouts to source files
  .use(layouts({
    engine: 'nunjucks',
    default: 'layout.njk',
    directory: '../' + paths.layouts,
    pattern: '**/*.html'
  }))

  // check broken links
  .use(brokenLinkChecker({
    // links to directories are allowed with or without a trailing slash (e.g. dir1/ or dir1)
    allowRedirects: true
  }))

  // Debug
  // .use(debug())
