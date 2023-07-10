// Navigation metalsmith plugin
// builds a navigation object based on config file and folder structure

// files: array containing information about every page
// metalsmith: object containing global information such as meta data
// done: function which must be called when the plugin has finished working

const { join, dirname } = require('path')

const { navigation } = require('../config')

module.exports = function () {
  return function (files, metalsmith, done) {
    const paths = Object.keys(files)

    // iterate main navigation item defined in navigation.json
    for (const item in navigation) {
      // if we have a navigation url and it is not homepage then look for subitems
      if (navigation[item].url && navigation[item].url !== '') {
        // get directories under main navigation item (e.g. ['breadcrumbs', 'checkboxes', ...])
        const directories = metalsmith
          .match(`${navigation[item].url}/*/index.html`, paths)
          .map((itemPath) => dirname(itemPath))

        // if we have directories convert them into menu items
        if (directories) {
          // initialise child navigation items as array
          navigation[item].items = []
          // convert directory into a navigation item adding url, label and theme
          for (const dir in directories) {
            const frontmatter = files[join(directories[dir], 'index.html')]
            // if we have frontmatter for that file, create subitem
            if (frontmatter) {
              if (frontmatter.status && frontmatter.status === 'Draft') {
                // If the page is labelled as a draft, do not show in the navigation.
                continue
              }

              // If the page has been archived, do not show in the navigation.
              if (frontmatter.ignore_in_sitemap) {
                continue
              }

              const subitem = {
                url: directories[dir],
                label: frontmatter.title
              }

              if (frontmatter.headings && frontmatter.show_page_nav) {
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
              navigation[item].items.push(subitem)
            }
          }

          // if 'order' is set, use it to sort the navigation
          if (navigation[item].items[0].order !== undefined) {
            navigation[item].items.sort((a, b) => a.order - b.order)
          }
        }
      }
    }

    // add navigation to global variables
    metalsmith.metadata().navigation = navigation

    done()
  }
}
