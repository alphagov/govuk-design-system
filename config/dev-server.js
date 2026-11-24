const ports = require('./ports')

const allowExternalConnections =
  process.env.ALLOW_EXTERNAL_CONNECTIONS === 'true'

/**
 * Eleventy Dev Server config
 */
module.exports = {
  // Bind to localhost only by default
  host: allowExternalConnections ? undefined : 'localhost',

  // Show network addresses on start when external connections are allowed
  showAllHosts: allowExternalConnections,

  // Configure port
  port: ports.preview
}
