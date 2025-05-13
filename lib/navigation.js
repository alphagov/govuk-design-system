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
  const filesBySection = Object.groupBy(
    Object.values(files),
    (file) => file.section
  )

  const topLevelItems = config.items
    .map((item) => new NavigationItem(item))
    .toSorted((a, b) => compare(a.order, b.order))

  for (const topLevelItem of topLevelItems) {
    const subNavFiles = filesBySection[topLevelItem.text] ?? []

    const items = subNavFiles
      // TODO: Rename `ignoreInSitemap` as it also ignores in subnav
      // TODO: Introduce a proper concept of 'Draft' that doesn't render the page in prod
      .filter(
        (subNavFile) =>
          !(subNavFile.status === 'Draft' || subNavFile.ignoreInSitemap)
      )
      .toSorted((a, b) => compare(a.order, b.order))
      .map((subNavFile) => new NavigationItem(subNavFile))

    topLevelItem.items = items.length
      ? Object.groupBy(items, (item) => item.page.theme)
      : null
  }

  // Add navigation to global variables
  metalsmith.metadata().navigation = topLevelItems

  done()
}

class NavigationItem {
  constructor(page) {
    this.page = page
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
