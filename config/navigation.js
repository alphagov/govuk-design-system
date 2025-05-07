/**
 * Navigation menu items
 *
 * @type {NavigationItem[]}
 */
const config = [
  {
    text: 'Get started',
    href: 'get-started',
    label: 'Get started',
    url: 'get-started'
  },
  {
    text: 'Styles',
    href: 'styles',
    label: 'Styles',
    url: 'styles'
  },
  {
    text: 'Components',
    href: 'components',
    label: 'Components',
    url: 'components'
  },
  {
    text: 'Patterns',
    href: 'patterns',
    label: 'Patterns',
    url: 'patterns'
  },
  {
    text: 'Community',
    href: 'community',
    label: 'Community',
    url: 'community'
  },
  {
    text: 'Accessibility',
    href: 'accessibility',
    label: 'Accessibility',
    url: 'accessibility'
  }
]

module.exports = config

/**
 * @typedef {object} NavigationItem
 * @property {string} text - Navigation item text
 * @property {string} href - URL path without leading slash
 * @property {string} label - Navigation item text
 * @property {string} url - URL path without leading slash
 * @property {boolean} [ignoreInSearch] - Ignore in search index
 * @property {NavigationSubItem[]} [items] - Navigation sub items
 */

/**
 * @typedef {object} NavigationSubItem
 * @property {string} text - Navigation item text
 * @property {string} href - URL path without leading slash
 * @property {string} label - Navigation item text
 * @property {string} url - URL path without leading slash
 * @property {string[]} [aliases] - Additional search terms (optional)
 * @property {string[]} [headings] - Markdown extracted headings (optional)
 * @property {string} [order] - Menu item sort order (optional)
 * @property {string} [theme] - Menu heading to group by (optional)
 */
