const nunjucks = require('nunjucks')

const highlighter = require('./lib/highlighter.js')
const { getFingerprint, getFrontmatter, getHTMLCode } = require('./lib/file-helper.js') // helper functions to operate on files
const paths = require('./config/paths.json') // specify paths to main working directories

const templatePaths = [
  paths.layouts,
  paths.partials,
  paths.components,
  paths.govukfrontend
]

module.exports = eleventyConfig => {
  const nunjucksEnvironment = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(templatePaths)
  )

  nunjucksEnvironment.addFilter('highlight', highlighter)
  nunjucksEnvironment.addGlobal('getFingerprint', getFingerprint)
  nunjucksEnvironment.addGlobal('getFrontmatter', getFrontmatter)
  nunjucksEnvironment.addGlobal('getHTMLCode', getHTMLCode)

  eleventyConfig.setLibrary('njk', nunjucksEnvironment)

  return {
    dir: {
      input: 'src',
      includes: '../views/partials',
      layouts: '../views/layouts',
      output: 'deploy/public'
    }
  }
}
