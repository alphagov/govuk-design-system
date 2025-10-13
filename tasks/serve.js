const browserSync = require('browser-sync').create()

const { browsersync: browserSyncConfig, paths } = require('../config')

browserSync.init(
  {
    ...browserSyncConfig,

    // Disable BrowserStack UI
    ui: false,

    // Serve files from directory
    server: paths.public
  },
  (err, bs) => {
    if (err) {
      console.error('Encountered an error starting the local server:', err)
    } else {
      console.log(
        `Server started at http://localhost:${bs.options.get('port')}`
      )
    }
  }
)
