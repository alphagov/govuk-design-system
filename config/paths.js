const { join, resolve } = require('path')

// Repository root directory
const rootPath = resolve(__dirname, '../')

/**
 * Config paths
 */
module.exports = {
  root: rootPath,
  public: join(rootPath, 'deploy/public'),
  source: join(rootPath, 'src'),
  views: join(rootPath, 'views')
}
