const nunjucks = require('nunjucks')

const highlighter = require('./lib/highlighter.js')
const { getFingerprint, getFrontmatter, getHTMLCode, getNunjucksCode } = require('./lib/file-helper.js') // helper functions to operate on files
const paths = require('./config/paths.json') // specify paths to main working directories
const getMacroOptions = require('./lib/get-macro-options/index.js')

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
  nunjucksEnvironment.addFilter('kebabCase', string => {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  })
  nunjucksEnvironment.addGlobal('getFingerprint', getFingerprint)
  nunjucksEnvironment.addGlobal('getFrontmatter', getFrontmatter)
  nunjucksEnvironment.addGlobal('getHTMLCode', getHTMLCode)
  nunjucksEnvironment.addGlobal('getMacroOptions', getMacroOptions)
  nunjucksEnvironment.addGlobal('getNunjucksCode', getNunjucksCode)

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
