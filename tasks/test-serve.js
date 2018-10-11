const http = require('http')
const connect = require('connect')
const serveStatic = require('serve-static')

const metalsmith = require('../lib/metalsmith')

const paths = require('../config/paths.json')

console.log("Building Design System...")
// build to destination directory
metalsmith.build(function (err, files) {
  if (err) {
    throw err
  }

  // Create a simple server for serving static files
  const app = connect().use(serveStatic(paths.public))
  http.createServer(app).listen(paths.port, () => {
    console.log(`Listening on port ${paths.port}...`)
  })
})
