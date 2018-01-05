// Navgation metalsmith plugin
// builds a navigation object based on config file and folder structure

// files: array containing information about every page
// metalsmith: object containing global information such as meta data
// done: function which must be called when the plugin has finished working

const paths = require('../config/paths.json')
const navigation = require('../config/navigation.json')

const fileHelper = require('../lib/file-helper.js')

module.exports = function () {
  return function (files, metalsmith, done) {
    // iterate main navigation item defined in navigation.json
    for (let item in navigation) {
      // if we have a navigation url and it is not homepage then look for subitems
      if (navigation[item].url && navigation[item].url !== '') {
        // define source path
        let itemPath = paths.source + navigation[item].url
        // get directories under main navigation item (e.g. ['breadcrumbs', 'checkboxes', ...])
        let directories = fileHelper.getDirectories(itemPath)
        // if we have directories convert them into menu items
        if (directories) {
          // initialise child navigation items as array
          navigation[item].items = []
          // convert directory into a navigation item adding url, label and theme
          for (let dir in directories) {
            let url = navigation[item].url + '/' + directories[dir]
            let frontmatter = files[url + '/index.html']
            // if we have frontmatter for that file, create subitem
            if (frontmatter) {
              let subitem = {
                'url': url,
                'label': frontmatter.title
              }
              // if frontmatter contains `theme` data, attach it to navigation item for grouping
              if (frontmatter.theme) {
                subitem.theme = frontmatter.theme
              }
              // add subitem to navigation
              navigation[item].items.push(subitem)
            }
          }
        }
      }
    }

    // add navigation to global variables
    metalsmith.metadata().navigation = navigation

    done()
  }
}
