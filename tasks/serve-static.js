const http = require('http')
const connect = require('connect')
const serveStatic = require('serve-static')

const paths = require('../config/paths.json')

if (process.argv.length != 4 || process.argv[2] != "--port") {
  console.error("--port <port> must be specified");
  process.exit(1);
}

const port = process.argv[3];

// Create a simple server for serving static files
const app = connect().use(serveStatic(paths.public))
console.log("Serving static site using existing build.")
http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
