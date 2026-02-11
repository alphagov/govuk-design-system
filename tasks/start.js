const { watch } = require('fs')
const { dirname, join } = require('path')

const browserSync = require('browser-sync')
const slash = require('slash')

const { browsersync: browserSyncConfig, paths } = require('../config') // specify paths to main working directories
const nunjucksTransformer = require('../lib/jstransformer-nunjucks')
const metalsmith = require('../lib/metalsmith') // configured static site generator

let bs
let nunjucksWatcher

// Watch for changes to the views directory. These templates are cached by the
// nunjucks transformer, so the cache must be cleared when they change.
function setupNunjucksWatcher() {
  if (nunjucksWatcher) {
    return
  }

  nunjucksWatcher = watch(
    paths.views,
    { recursive: true },
    (eventType, filename) => {
      if (!filename || !filename.endsWith('.njk')) {
        return
      }
      nunjucksTransformer.resetCache()
    }
  )
}

metalsmith

  // Configure sources to watch for rebuilds
  .watch([
    slash(paths.source),
    slash(paths.views),
    slash(dirname(require.resolve('govuk-frontend/package.json')))
  ])

  // Build to destination directory
  .build((err, files) => {
    if (err) {
      throw err
    }

    if (metalsmith.watch()) {
      if (bs) {
        return
      }

      setupNunjucksWatcher()

      // Setup synchronised browser testing
      bs = browserSync.create()

      bs.init({
        ...browserSyncConfig,

        // Configure output to watch for reloads
        files: [
          join(paths.public, '**/*.html'),
          join(paths.public, 'javascripts/**/*.js'),
          join(paths.public, 'stylesheets/**/*.css')
        ],

        // Serve files from directory
        server: paths.public
      })
    }
  })
