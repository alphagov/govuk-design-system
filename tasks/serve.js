const { createServer } = require('http')

const connect = require('connect')
const serveStatic = require('serve-static')

const paths = require('../lib/paths.js')

// Create a simple server for serving static files
const app = connect().use(serveStatic(paths.public))
const server = createServer(app)

server.listen(paths.testPort, () => {
  console.log(`Server started at http://localhost:${paths.testPort}`)
})
