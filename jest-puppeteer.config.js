const configPaths = require('./config/paths.json')
const PORT = configPaths.testPort

module.exports = {
  server: {
    command: `eleventy --serve --port ${PORT}`,
    launchTimeout: 30000,
    port: PORT
  }
}
