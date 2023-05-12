const configPaths = require('./lib/paths.js')

module.exports = {
  browserContext: 'incognito',
  server: {
    command: 'npm run serve',
    port: configPaths.port,

    // Skip when already running
    usedPortAction: 'ignore'
  }
}
