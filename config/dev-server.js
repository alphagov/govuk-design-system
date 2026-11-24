const ports = require('./ports')

/**
 * Browsersync config
 *
 * @type {import('browser-sync').Options}
 */

module.exports = {
  // Bind to localhost only by default
  ...(process.env.ALLOW_EXTERNAL_CONNECTIONS === 'true'
    ? {}
    : { listen: 'localhost' }),

  // Configure port
  port: ports.preview,

  // Prevent browser mirroring
  ghostMode: false,

  // Prevent browser opening
  open: false
}
