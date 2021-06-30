const nunjucks = require('nunjucks')

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
