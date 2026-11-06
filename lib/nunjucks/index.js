const process = require('process')

const { dirname, join } = process.getBuiltinModule('path')

const { paths } = require('../../config')

/**
 * Nunjucks options
 */
const filters = require('./filters')
const globals = require('./globals')
const tags = require('./tags')

module.exports = {
  trimBlocks: true, // Automatically remove trailing newlines from a block/tag
  lstripBlocks: true, // Automatically remove leading whitespace from a block/tag

  // Store views paths for rendering nunjucks syntax
  path: [
    join(paths.views, 'layouts'),
    join(paths.views, 'partials'),
    join(paths.views, 'macros'),
    join(paths.source, 'components'),

    // Path to `govuk-frontend` export without `govuk/` suffix
    join(dirname(require.resolve('govuk-frontend')), '../')
  ],

  globals,
  filters,
  tags
}
