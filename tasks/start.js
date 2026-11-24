const { watch } = require('fs')
const { dirname, join } = require('path')

const slash = require('slash')

const { paths } = require('../config') // specify paths to main working directories
const { createDevServer } = require('../lib/dev-server')
const nunjucksTransformer = require('../lib/jstransformer-nunjucks')
const metalsmith = require('../lib/metalsmith') // configured static site generator

let server
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
      if (server) {
        return
      }

      setupNunjucksWatcher()

      // Setup live reloading local server
      const devServer = createDevServer({
        // Configure output to watch for reloads
        watch: [
          join(paths.public, '**/*.html'),
          join(paths.public, 'javascripts/**/*.js'),
          join(paths.public, 'stylesheets/**/*.css')
        ].map(slash)
      })

      server = devServer.server
      server.serve(devServer.port)
    }
  })
