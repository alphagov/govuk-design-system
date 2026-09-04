const { markedSmartypants } = require('marked-smartypants')
const filters = require('nunjucks/src/filters')
const slug = require('slug')

const { DesignSystemMarked } = require('../marked')

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

/**
 * Returns whether the given navigation item is active
 * for the given permalink
 *
 * @param {{url: string}} navigationItem - The navigation item
 * @param {string} permalink - The permalink of the page being rendered
 * @returns {boolean} `true` if the navigationItem is the `active` page, false otherwise
 */
exports.isActive = function (navigationItem, permalink) {
  return (
    permalink === navigationItem.url ||
    permalink.startsWith(`${navigationItem.url}/`)
  )
}

/**
 * Returns whether the given navigation item has subpages and if any of those
 * subpages are active for the given permalink
 *
 * @param {{url: string}} navigationItem - The navigation item
 * @param {string} permalink - The permalink of the page being rendered
 * @returns {boolean} `true` if the navigationItem has a subpage that is the
 *   `active` page, false otherwise
 */
exports.isActiveSubpage = function (navigationItem, permalink) {
  return navigationItem.subpages
    ? !!navigationItem.subpages.find(
        (subpage) => permalink === `${navigationItem.url}/${subpage.url}`
      )
    : false
}

const marked = new DesignSystemMarked()

/**
 * Render a markdown string to HTML
 *
 * @param {string} - - The string of markdown to render
 * @param string
 * @returns {string} - The HTML of the rendered markdown
 */
exports.markdown = function (string) {
  return marked.parse(string)
}

/**
 * Format a date to a short prosaic format (e.g. 9 Feb 2026)
 * for display in changelog tables, where space is limited.
 *
 * @param {string} - - The date in ISO 8601 format (YYYY-MM-DD)
 * @param isoDate
 * @returns {string} - The date in D MMM YYYY format
 */
exports.formatChangelogDate = function (isoDate) {
  const date = Date.parse(isoDate)
  return new Intl.DateTimeFormat('en-gb', {
    month: 'short',
    year: 'numeric'
  }).format(date)
}
