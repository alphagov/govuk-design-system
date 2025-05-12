// Navigation item sorting function
const { compare } = new Intl.Collator('en', {
  numeric: true
})

/**
 * Metalsmith navigation plugin
 *
 * Builds a navigation object based on config file and folder structure
 *
 * @param {object} config - Plugin config
 * @param {NavigationItem[]} config.items - Navigation menu items
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
module.exports = (config) => (files, metalsmith, done) => {
  const items = config.items
    .map((item) => new NavigationItem(item))
    .toSorted((a, b) => compare(a.order, b.order))

  // Metalsmith file paths
  const paths = Object.keys(files)

  for (const item of items) {
    // Match navigation item child directories
    // (for example, ['components/breadcrumbs/index.html', 'components/checkboxes/index.html', ...])
    const itemPaths = metalsmith.match(
      `${item.page.permalink}/*/index.html`,
      paths
    )

    // No sub items required for this path
    if (!itemPaths.length) {
      continue
    }

    // Convert directory into a navigation item adding url, label and theme
    for (const itemPath of itemPaths) {
      const frontmatter = files[itemPath]

      // Do not show drafts or ignored pages in navigation
      if (
        !frontmatter ||
        frontmatter.status === 'Draft' ||
        frontmatter.ignoreInSitemap
      ) {
        continue
      }

      item.items ??= []

      // Add subitem to navigation
      item.items.push(new NavigationItem(frontmatter))
    }

    // Sort navigation sub items using 'order' (optional)
    item.items?.sort((a, b) => compare(a.order, b.order))
  }

  // Add navigation to global variables
  metalsmith.metadata().navigation = items

  done()
}

class NavigationItem {
  constructor(page) {
    this.page = page
    // Nunjucks' `groupBy` operator doesn't seem to operate on getters
    this.theme = this.page.theme
  }

  get href() {
    return `/${this.page.permalink}/`
  }

  get text() {
    return this.page.title
  }

  get order() {
    return this.page.order
  }

  // Headings and aliases are used in the sitemap
  get headings() {
    return this.page.headings && this.page.showPageNav
      ? this.page.headings
      : undefined
  }

  get aliases() {
    return this.page.aliases?.split(',').map((string) => string.trim())
  }

  isCurrent(permalink) {
    return permalink && this.page.permalink === permalink
  }

  isActive(permalink) {
    return permalink && permalink.startsWith(this.page.permalink)
  }
}

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
