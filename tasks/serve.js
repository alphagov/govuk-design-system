const { createDevServer } = require('../lib/dev-server')

const { server, port } = createDevServer({
  // Serve static files only, without injecting the live reload script
  liveReload: false
})

server.serve(port)
