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
const metalsmith = require('metalsmith') // static site generator
const canonical = require('metalsmith-canonical') // add a canonical url property to pages
const renamer = require('metalsmith-renamer') // rename files
const slugger = require('slugger') // generate slugs from titles

// Helpers and config
const { paths } = require('../config')
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

// static site generator
module.exports = metalsmith(resolve(__dirname, '../'))

  // notify build starting
  .use((files, metalsmith) => metalsmith.watch() &&
    console.log('Metalsmith build running')
  )

  // source directory
  .source(paths.source)

  // destination directory
  .destination(paths.public)

  // clean destination for production builds
  .clean(isProduction)

  // global variables used in layout files
  .metadata({
    title: '[TITLE NOT SET]',
    colours,

    // include safe environment variables as metalsmith metadata
    // used to e.g. detect when we're building in a preview environment
    env: {
      NODE_ENV: process.env.NODE_ENV ?? 'production'
    }
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

  // Ignore internal config
  .ignore('.eslintrc.js')

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

  // add hash to files
  .use(hashAssets({
    pattern: [
      '**/*.css?(.map)',
      'javascripts/*.{cjs,js,mjs}?(.map)',
      'javascripts/vendor/*'
    ]
  }))

  // check titles are set
  .use(titleChecker())

  // render templating syntax in source files
  .use(inplace({
    pattern: '**/*.njk',
    engineOptions: nunjucksOptions
  }))

  // render markdown in source files
  .use(markdown({
    breaks: true, // Enable line breaks
    mangle: false, // Don't mangle emails
    smartypants: true, // use "smart" typographic punctuation
    highlight: highlighter,

    // Markdown renderer
    renderer: new DesignSystemRenderer()
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
    directory: join(paths.views, 'layouts'),
    pattern: '**/*.html',
    engineOptions: nunjucksOptions
  }))

  // generate a sitemap.xml in public/ folder
  .use(generateSitemap({
    hostname: 'https://design-system.service.gov.uk',
    pattern: ['**/*.html', '!**/default/*.html']
  }))

  // notify build starting
  .use((files, metalsmith) => metalsmith.watch() &&
    console.log('Metalsmith build complete')
  )

// Debug
// .use(debug())
