const configPaths = require('./lib/paths.js')

const PORT = configPaths.testPort

module.exports = {
  browserContext: 'incognito',
  server: {
    command: 'node tasks/test-serve.js',
    launchTimeout: 30000,
    port: PORT
  }
}
