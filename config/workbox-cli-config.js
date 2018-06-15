const paths = require('./paths.json') // specify paths to main working directories

module.exports = {
  swSrc: 'lib/service-worker-src.js',
  swDest: paths.public + 'service-worker.js',
  globDirectory: paths.public,
  globPatterns: ['**/*.html'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 100 // 500KB limit
}
