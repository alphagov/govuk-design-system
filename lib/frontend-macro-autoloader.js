// Frontend Macro Auto-loader
//
// This looks for any macro.njk files inside the govuk-frontend folder and
// grabs anything exported from within them, so that we can make them globally
// available without having to maintain a list of imports somewhere.

// path definitions
const paths = require('../config/paths.json')

// nunjucks engine options
const nunjucksConfig = require('../config/nunjucks.js')

const globby = require('globby')
const nunjucks = require('nunjucks')

// Create a nunjucks environment that we can use to parse the nunjucks files and
// grab exported macros
const nunjucks_env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(paths.govukfrontend),
  nunjucksConfig
)

// Glob the filesystem to find all macros within the GOV.UK Frontend directory
const macro_files = globby.sync([`${paths.govukfrontend}**/macro.njk`])

// Create an object in which we can store the macros we find
let frontend_macros = {}

// Iterate over each macro.njk in the GOV.UK Frontend directory, parsing the
// template and grabbing anything it exports
macro_files.forEach((filename) => {
  nunjucks_env
    .getTemplate(filename.replace(paths.govukfrontend, ''))
    .getExported((error, macros_exported_by_template) => {
      Object.assign(frontend_macros, macros_exported_by_template)
    })
})

module.exports = frontend_macros
