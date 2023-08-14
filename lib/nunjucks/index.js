const { dirname, join } = require('path')

const { paths } = require('../../config')

/**
 * Nunjucks options
 */
const filters = require('./filters')
const globals = require('./globals')

module.exports = {
  noCache: true, // never use a cache and recompile templates each time
  trimBlocks: true, // automatically remove trailing newlines from a block/tag
  lstripBlocks: true, // automatically remove leading whitespace from a block/tag

  // Store views paths for rendering nunjucks syntax
  path: [
    join(paths.views, 'layouts'),
    join(paths.views, 'partials'),
    join(paths.source, 'components'),

    // Path to `govuk-frontend` export without `govuk/` suffix
    join(dirname(require.resolve('govuk-frontend')), '../')
  ],

  globals,
  filters
}
