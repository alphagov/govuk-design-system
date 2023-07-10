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

    // iterate main navigation item defined in navigation.json
    for (const item of navigation) {
      // if we have a navigation url and it is not homepage then look for subitems
      if (item.url && item.url !== '') {
        // get directories under main navigation item (e.g. ['breadcrumbs', 'checkboxes', ...])
        const itemPaths = metalsmith
          .match(`${item.url}/*/index.html`, paths)
          .map((itemPath) => dirname(itemPath))

        // if we have directories convert them into menu items
        if (itemPaths.length) {
          // initialise child navigation items as array
          item.items = []
          // convert directory into a navigation item adding url, label and theme
          for (const itemPath of itemPaths) {
            const frontmatter = files[join(itemPath, 'index.html')]
            // if we have frontmatter for that file, create subitem
            if (frontmatter) {
              if (frontmatter.status && frontmatter.status === 'Draft') {
                // If the page is labelled as a draft, do not show in the navigation.
                continue
              }

              // If the page has been archived, do not show in the navigation.
              if (frontmatter.ignoreInSitemap) {
                continue
              }

              /** @type {NavigationSubItem} */
              const subitem = {
                url: itemPath,
                label: frontmatter.title
              }

              if (frontmatter.headings && frontmatter.showPageNav) {
                subitem.headings = frontmatter.headings
              }

              // if frontmatter contains `theme` data, attach it to navigation item for grouping
              if (frontmatter.theme) {
                subitem.theme = frontmatter.theme
              }
              // if frontmatter contains 'order' data, use it for ordering the navigation
              if (frontmatter.order) {
                subitem.order = frontmatter.order
              }
              if (frontmatter.aliases) {
                subitem.aliases = frontmatter.aliases.split(',').map(string => string.trim())
              }

              // add subitem to navigation
              item.items.push(subitem)
            }
          }

          // if 'order' is set, use it to sort the navigation
          if (item.items[0].order !== undefined) {
            item.items.sort((a, b) => a.order - b.order)
          }
        }
      }
    }

    // add navigation to global variables
    metalsmith.metadata().navigation = navigation

    done()
  }
}

/**
 * @typedef {import('../config/navigation.js').NavigationSubItem} NavigationSubItem
 */
