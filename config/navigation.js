/**
 * Navigation menu items
 *
 * @type {NavigationItem[]}
 */
const config = [
  {
    text: 'Get started',
    href: 'get-started'
  },
  {
    text: 'Styles',
    href: 'styles'
  },
  {
    text: 'Components',
    href: 'components'
  },
  {
    text: 'Patterns',
    href: 'patterns'
  },
  {
    text: 'Community',
    href: 'community'
  },
  {
    text: 'Accessibility',
    href: 'accessibility'
  }
]

module.exports = config

/**
 * @typedef {object} NavigationItem
 * @property {string} label - Navigation item text
 * @property {string} url - URL path without leading slash
 * @property {boolean} [ignoreInSearch] - Ignore in search index
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
