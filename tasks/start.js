const { dirname, join } = require('path')

const browserSync = require('browser-sync')
const slash = require('slash')

const { paths } = require('../config') // specify paths to main working directories
const {
  clean,
  compileCSS,
  copyAssets,
  merge,
  metalsmith,
  compileJavaScript
} = require('../lib/metalsmith') // configured static site generator

let bs

const build = async function () {
  await clean()
  await compileCSS()
  await copyAssets()
  await compileJavaScript()

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
          // Configure output to watch for reloads
          files: [
            join(paths.public, '**/*.html'),
            join(paths.public, 'javascripts/**/*.js'),
            join(paths.public, 'stylesheets/**/*.css')
          ],

          // Prevent browser mirroring
          ghostMode: false,

          // Prevent browser opening
          open: false,

          // Serve files from directory
          server: paths.public
        })
      }
    })

  merge()
}

build()
