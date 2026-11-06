const process = require('process')

const { join, resolve } = process.getBuiltinModule('path')

// Repository root directory
const rootPath = resolve(__dirname, '../')

/**
 * Config paths
 */
module.exports = {
  root: rootPath,
  public: join(rootPath, 'build'),
  source: join(rootPath, 'src'),
  views: join(rootPath, 'views')
}
