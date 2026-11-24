const EleventyDevServer = require('@11ty/eleventy-dev-server')

const { devServer: devServerConfig, paths } = require('../config')

/**
 * Eleventy Dev Server, with support for binding to a specific host
 */
class DevServer extends EleventyDevServer {
  /**
   * @param {string} host - Host to bind to, or `undefined` for all hosts
   * @param {import('http').ServerOptions & Record<string, any>} [options] - Dev server options
   */
  constructor(host, options = {}) {
    super('govuk-design-system', paths.public, options)
    this.host = host
  }

  /**
   * @param {number} port - Port to listen on
   */
  _serverListen(port) {
    // This is a bit of a hack for 11ty-dev-server v2.
    // v3 tightens all this up and will more closely align with how we currently
    // use browser-sync.
    // See: https://github.com/11ty/dev-server/blob/main/README.md#changelog
    this.server.listen({ port, host: this.host })
  }
}

/**
 * Create a dev server for the build directory
 *
 * @param {Record<string, any>} [options] - Dev server options
 * @returns {{ server: DevServer, port: number }} Dev server and the port to serve on
 */
function createDevServer(options = {}) {
  const { host, port, ...serverOptions } = devServerConfig

  const server = new DevServer(host, { ...serverOptions, ...options })
  return { server, port }
}

module.exports = { createDevServer }
