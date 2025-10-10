const { dirname, join } = require('path')

const browserSync = require('browser-sync')
const slash = require('slash')

const { browsersync, paths } = require('../config') // specify paths to main working directories
const metalsmith = require('../lib/metalsmith') // configured static site generator

let bs

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

      // Setup synchronised browser testing
      bs = browserSync.create()

      bs.init({
        ...browsersync,

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
