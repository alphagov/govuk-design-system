const { markedSmartypants } = require('marked-smartypants')
const filters = require('nunjucks/src/filters')
const slug = require('slug')

// Marked extension for "smart" typographic punctuation
const smartypants = markedSmartypants()

/**
 * Format strings into kebab case but also
 * handles `errorMessage` → `error-message`
 *
 * @param {string} string - String to format
 * @returns {string} Kebab case string
 */
exports.kebabCase = function (string) {
  return string
    .replace(/\W+/g, '-')
    .replace(/\B([A-Z])(?=[a-z])/g, '-$1')
    .replace(/\B([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Format strings into URL friendly "slug"
 *
 * @param {string} string - String to format
 * @returns {string} URL friendly "slug"
 */
exports.slugify = function (string) {
  return slug(string, { lower: true })
}

/**
 * Format strings with "smart" typographic punctuation
 *
 * @param {string} string - String to format
 * @returns {string} Formatted string
 */
exports.smartypants = function (string) {
  return filters.safe(smartypants.hooks.postprocess(string))
}
