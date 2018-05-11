const metalsmith = require('metalsmith')                     // static site generator
const assets = require('metalsmith-assets')                  // copy static assets
const concat = require('metalsmith-concat')                  // concatenate files
const env = require('metalsmith-env')                        // environment vars plugin
const inplace = require('metalsmith-in-place')               // render templating syntax in your source files
const layouts = require('metalsmith-layouts')                // apply layouts to source files
const markdown = require('metalsmith-markdown')              // convert markdown files to html
const metallic = require('metalsmith-metallic')              // highlight code in markdown files
const tagcleaner = require('metalsmith-tagcleaner')          // Use tag cleaner to remove <p> tags around images
const permalinks = require('metalsmith-permalinks')          // apply a permalink pattern to files
const sass = require('metalsmith-sass')                      // convert Sass files to CSS using LibSass
const hashAssets = require('metalsmith-fingerprint-ignore')  // add hash to specified files and ignores files that match a pattern

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
  paths.govukfrontend
]

// creating anchor links for headings
const marked = require('marked')
const renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  return `
    <h${level} class="app-content-heading">
      ${text}
      <a name="${escapedText}" class="app-content-heading__anchor" href="#${escapedText}">
        <svg viewBox="0 0 512 512" class="app-content-heading__icon">
          <path d="M220.118 317.883c-6.655 0-13.308-2.538-18.385-7.615-47.567-47.568-47.567-124.967 0-172.535l96-96c23.044-23.043 53.68-35.733 86.267-35.733s63.224 12.69 86.268 35.732c47.566 47.568 47.566 124.967 0 172.535l-43.883 43.883c-10.154 10.154-26.615 10.154-36.77 0-10.153-10.153-10.153-26.616 0-36.77l43.883-43.883c27.292-27.293 27.292-71.702 0-98.995-13.221-13.221-30.8-20.502-49.498-20.502s-36.276 7.281-49.498 20.503l-96 95.999c-27.293 27.293-27.293 71.703 0 98.996 10.154 10.153 10.153 26.616 0 36.77-5.075 5.076-11.731 7.615-18.384 7.615z"/>
          <path d="M128 506c-32.588 0-63.225-12.69-86.267-35.732-47.567-47.568-47.567-124.967 0-172.535l43.882-43.882c10.154-10.153 26.617-10.153 36.77 0 10.154 10.153 10.154 26.616 0 36.77l-43.882 43.882c-27.293 27.293-27.293 71.703 0 98.996 13.22 13.22 30.799 20.501 49.497 20.501s36.276-7.281 49.499-20.503l96-95.999c27.292-27.293 27.292-71.703 0-98.996-10.154-10.154-10.153-26.616 0-36.77 10.153-10.153 26.616-10.153 36.77 0.001 47.566 47.567 47.566 124.966 0.001 172.534l-96.001 96c-23.045 23.044-53.682 35.733-86.269 35.733z"/>
        </svg>
      </a>
    </h${level}>
  `
}

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

  // add hash to files
  .use(hashAssets({
    pattern: [
      'stylesheets/main.css',
      'javascripts/application.js',
      'javascripts/ie.js'
    ]
  }))

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
    },
    renderer: renderer
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
