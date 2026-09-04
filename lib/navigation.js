const { dirname } = require('path')

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
 * @param {Navigation} config - Navigation menu items
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
module.exports = (config) => (files, metalsmith, done) => {
  const sections = structuredClone(config.sections)
  const subpages = structuredClone(config.subpages)

  // Metalsmith file paths
  const paths = Object.keys(files)

  for (const section of sections) {
    // Match navigation item child directories
    // (for example, ['components/breadcrumbs/index.html', 'components/checkboxes/index.html', ...])
    const itemPaths = metalsmith.match(`${section.url}/*/index.html`, paths)

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

      // Set subpage object if page has any of the possible subpages
      const subpagesOfItem = []

      for (const subpage of subpages) {
        if (
          metalsmith.match(
            `${dirname(itemPath)}/${subpage.url}/index.html`,
            paths
          ).length > 0
        ) {
          subpagesOfItem.push(subpage)
        }
      }

      // Setting subpages here bubbles back up to the page object itself,
      // meaning that subpages will be available at render time for us to
      // use per page
      frontmatter.subpages = subpagesOfItem

      section.items ??= []

      // Add subitem to navigation
      section.items.push({
        url: dirname(itemPath),
        label: frontmatter.title,
        order: frontmatter.order,
        theme: frontmatter.theme,
        subpages: frontmatter.subpages,

        // Override Markdown extracted headings plugin (optional)
        headings:
          frontmatter.headings && frontmatter.showPageNav
            ? frontmatter.headings
            : undefined,

        // Additional search terms (optional)
        aliases: frontmatter.aliases?.split(',').map((string) => string.trim())
      })
    }

    // Sort navigation sub items by order if available, then by title
    section.items?.sort((a, b) =>
      a.order || b.order ? compare(a.order, b.order) : compare(a.label, b.label)
    )
  }

  // Add navigation to global variables
  metalsmith.metadata().navigation = sections

  done()
}

/**
 * @typedef {import('../config/navigation.js')} Navigation
 */
