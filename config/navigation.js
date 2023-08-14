/**
 * Navigation menu items
 *
 * @type {NavigationItem[]}
 */
module.exports = [
  {
    label: 'Get started',
    url: 'get-started',
    includeInSearch: true
  },
  {
    label: 'Styles',
    url: 'styles',
    includeInSearch: true
  },
  {
    label: 'Components',
    url: 'components',
    includeInSearch: true
  },
  {
    label: 'Patterns',
    url: 'patterns',
    includeInSearch: true
  },
  {
    label: 'Community',
    url: 'community',
    includeInSearch: true
  }
]

/**
 * @typedef {object} NavigationItem
 * @property {string} label - Navigation item text
 * @property {string} url - URL path without leading slash
 * @property {boolean} includeInSearch - Include in search index
 * @property {NavigationSubItem[]} [items] - Navigation sub items
 */

/**
 * @typedef {object} NavigationSubItem
 * @property {string} label - Navigation item text
 * @property {string} url - URL path without leading slash
 * @property {string[]} [aliases] - Additional search terms (optional)
 * @property {string[]} [headings] - Markdown extracted headings (optional)
 * @property {string} [order] - Menu item sort order (optional)
 * @property {string} [theme] - Menu heading to group by (optional)
 */
