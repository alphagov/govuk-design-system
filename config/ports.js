const { env } = require('node:process')

/**
 * Ports
 */
module.exports = {
  preview: env.PORT ? parseInt(env.PORT, 10) : 3000
}
