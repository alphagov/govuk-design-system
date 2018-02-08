const metalsmith = require('metalsmith')            // static site generator
const assets = require('metalsmith-assets')         // copy static assets
const concat = require('metalsmith-concat')         // concatenate files
const inplace = require('metalsmith-in-place')      // render templating syntax in your source files
const layouts = require('metalsmith-layouts')       // apply layouts to source files
const markdown = require('metalsmith-markdown')     // convert markdown files to html
const metallic = require('metalsmith-metallic')     // highlight code in markdown files
const tagcleaner = require('metalsmith-tagcleaner') // Use tag cleaner to remove <p> tags around images
const permalinks = require('metalsmith-permalinks') // apply a permalink pattern to files
const sass = require('metalsmith-sass')             // convert Sass files to CSS using LibSass

const debug = require('./debug')                    // debug plugin
const navigation = require('./navigation.js')       // navigation plugin
const env = require('metalsmith-env')               // environment vars plugin

const paths = require('../config/paths.json')       // specify paths to main working directories
const colours = require('../lib/colours.js')        // get colours data
const nunjucksConfig = require('../config/nunjucks.js') // nunjucks engine options
const frontendMacros = require('../lib/frontend-macro-autoloader.js') // auto-load frontend macros from installed npm packages
const fileHelper = require('../lib/file-helper.js') // helper function to operate on files

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
    title: 'GOV.UK Design System',
    colours: colours
  })

  // source directory
  .source('../' + paths.source)

  // destination directory
  .destination('../' + paths.public)

  // clean destination before build
  .clean(true)

  // Include environment variables as metalsmith metadata
  // Used to e.g. detect when we're building in a preview environment
  .use(env())

  // convert *.scss files to *.css
  .use(sass({
    includePaths: ['node_modules'] // an array of paths that sass can look in when attempt to resolve @import declarations
  }))

  // copy static assets from node_modules/@govukfrontend
  .use(assets({
    source: '../' + paths.govukfrontend + 'icons/',
    destination: 'icons'
  }))

  // copy static assets from node_modules/iframe-resizer
  .use(assets({
    source: '../' + paths.iframeresizer + 'js/',
    destination: 'javascripts/vendor'
  }))

  // concatenate javascript files
  .use(concat({
    files: [
      'javascripts/vendor/jquery.js',
      'javascripts/vendor/clipboard.js',
      'javascripts/vendor/iframeResizer.min.js',
      'javascripts/components/example.js',
      'javascripts/components/tabs.js',
      'javascripts/components/copy.js',
      'javascripts/components/mobile-navigation.js',
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

  // render templating syntax in source files
  .use(inplace({
    pattern: '**/*.njk',
    engineOptions: {
      path: views,
      globals: {
        getNunjucksCode: fileHelper.getNunjucksCode,
        getHTMLCode: fileHelper.getHTMLCode,
        ...frontendMacros
      },
      ...nunjucksConfig
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

  // Use tag cleaner to remove <p> tags around images
  .use(tagcleaner())

  // apply a permalink pattern to files
  .use(permalinks())

  // apply navigation
  .use(navigation())

  // apply layouts to source files
  .use(layouts({
    engine: 'nunjucks',
    default: 'layout.njk',
    directory: '../' + paths.layouts,
    pattern: '**/*.html'
  }))

  // Debug
  // .use(debug())
