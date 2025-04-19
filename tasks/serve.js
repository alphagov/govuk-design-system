const browserSync = require('browser-sync').create()

const { paths, ports } = require('../config')

browserSync.init(
  {
    // Prevent browser mirroring
    ghostMode: false,

    // Prevent browser opening
    open: false,

    // Disable BrowserStack UI
    ui: false,

    // Configure port
    port: ports.preview,

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
