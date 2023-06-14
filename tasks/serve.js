const { createServer } = require('http')

const connect = require('connect')
const serveStatic = require('serve-static')

const { paths, ports } = require('../config')

// Create a simple server for serving static files
const app = connect().use(serveStatic(paths.public))
const server = createServer(app)

server.listen(ports.preview, () => {
  console.log(`Server started at http://localhost:${ports.preview}`)
})
