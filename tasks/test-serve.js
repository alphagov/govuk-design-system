const http = require('http')
const connect = require('connect')
const serveStatic = require('serve-static')

const metalsmith = require('../lib/metalsmith')

const paths = require('../config/paths.json')

const runServer = () => {
  // Create a simple server for serving static files
  const app = connect().use(serveStatic(paths.public))
  http.createServer(app).listen(paths.testPort, () => {
    console.log(`Listening on port ${paths.testPort}...`)
  })
}

if (process.env.CI === 'true') {
  console.log('Running in CI, using existing build...')
  runServer()
} else {
  console.log('Building Design System...')
  // build to destination directory
  metalsmith.build(function (err, files) {
    if (err) {
      throw err
    }

    runServer()
  })
}
