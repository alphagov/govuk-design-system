const { dirname, join } = require('path')

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
 * @param {Navigation} config.items - Navigation menu items
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
module.exports = (config) => (files, metalsmith, done) => {
  const items = structuredClone(config.items)

  // Metalsmith file paths
  const paths = Object.keys(files)

  for (const item of items) {
    // Match navigation item child directories
    // (for example, ['components/breadcrumbs', 'components/checkboxes', ...])
    const itemPaths = metalsmith
      .match(`${item.url}/*/index.html`, paths)
      .map((itemPath) => dirname(itemPath))

    // No sub items required for this path
    if (!itemPaths.length) {
      continue
    }

    // Convert directory into a navigation item adding url, label and theme
    for (const itemPath of itemPaths) {
      const frontmatter = files[join(itemPath, 'index.html')]

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
      item.items.push({
        url: itemPath,
        label: frontmatter.title,
        order: frontmatter.order,
        theme: frontmatter.theme,

        // Override Markdown extracted headings plugin (optional)
        headings:
          frontmatter.headings && frontmatter.showPageNav
            ? frontmatter.headings
            : undefined,

        // Additional search terms (optional)
        aliases: frontmatter.aliases?.split(',').map((string) => string.trim())
      })
    }

    // Sort navigation sub items using 'order' (optional)
    item.items.sort((a, b) => compare(a.order, b.order))
  }

  // Add navigation to global variables
  metalsmith.metadata().navigation = items

  done()
}

/**
 * @typedef {import('../config/navigation.js')} Navigation
 */
