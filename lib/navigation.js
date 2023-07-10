const { dirname, join } = require('path')

const { navigation } = require('../config')

/**
 * Metalsmith navigation plugin
 *
 * Builds a navigation object based on config file and folder structure
 *
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
module.exports = function () {
  return function (files, metalsmith, done) {
    const paths = Object.keys(files)

    for (const item of navigation) {
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
        if (!frontmatter || frontmatter.status === 'Draft' || frontmatter.ignoreInSitemap) {
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
          headings: frontmatter.headings && frontmatter.showPageNav
            ? frontmatter.headings
            : undefined,

          // Additional search terms (optional)
          aliases: frontmatter.aliases?.split(',')
            .map(string => string.trim())
        })
      }

      // If 'order' is set, use it to sort the navigation
      if (item.items[0].order !== undefined) {
        item.items.sort((a, b) => a.order - b.order)
      }
    }

    // Add navigation to global variables
    metalsmith.metadata().navigation = navigation

    done()
  }
}
