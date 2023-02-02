// Based on metalsmith-browser-sync (Copyright (c) 2015 Mike Dvorscak)
// https://github.com/mdvorscak/metalsmith-browser-sync

const bs = require('browser-sync').create()

const PLUGIN_NAME = 'browser-sync'

const defaultOptions = {
  server: './app'
}

/**
 * Metalsmith Browsersync plugin
 */
function browserSyncPlugin (userOptions, callback) {
  function plugin (files, metalsmith, done) {
    // We only need one browser-sync server active, so on the first build, we
    // remove ourselves from the list of plugins, as we're going to be
    // rebuilding every time source files are edited
    metalsmith.plugins.forEach(function (plugin, index) {
      if (plugin._pluginName === PLUGIN_NAME) {
        metalsmith.plugins.splice(index, 1)
      }
    })

    const finalOptions = { ...defaultOptions, ...userOptions }

    function rebuild () {
      if (!bs.paused) {
        bs.pause()
        console.log('Re-running Metalsmith build.')
        metalsmith.build(function (err) {
          if (err) { console.error(err) }

          bs.resume()
          bs.reload()
        })
      }
    }

    const watched = finalOptions.files
    delete finalOptions.files

    bs.watch(watched, { ignored: '*.map', ignoreInitial: true }).on('all', rebuild)
    bs.init(finalOptions, callback || undefined)

    done()
  }
  plugin._pluginName = PLUGIN_NAME
  return plugin
}

module.exports = browserSyncPlugin
