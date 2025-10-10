const ports = require('./ports')

/**
 * Browsersync config
 *
 * @type {import('browser-sync').Options}
 */

module.exports = {
  // Configure port
  port: ports.preview,

  // Prevent browser mirroring
  ghostMode: false,

  // Prevent browser opening
  open: false
}
