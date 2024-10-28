/**
 * Navigation menu items
 *
 * @type {NavigationItem[]}
 */
const config = [
  {
    label: 'Get started',
    url: 'get-started',
    text: 'Get started',
    href: '/get-started'
  },
  {
    label: 'Styles',
    url: 'styles',
    text: 'Styles',
    href: '/styles'
  },
  {
    label: 'Components',
    url: 'components',
    text: 'Components',
    href: '/components'
  },
  {
    label: 'Patterns',
    url: 'patterns',
    text: 'Patterns',
    href: '/patterns'
  },
  {
    label: 'Community',
    url: 'community',
    text: 'Community',
    href: '/community'
  },
  {
    label: 'Accessibility',
    url: 'accessibility',
    text: 'Accessibility',
    href: '/accessibility'
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
