const configPaths = require('./config/paths.json')
const PORT = configPaths.port

module.exports = {
  server: {
    command: 'node tasks/serve.js',
    launchTimeout: 20000,
    port: PORT
  }
}
