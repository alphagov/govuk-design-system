const { join } = require('path')

const inPlace = require('@metalsmith/in-place')
const layouts = require('@metalsmith/layouts')

const { paths } = require('../../config')
const titleChecker = require('../metalsmith-title-checker')
const nunjucksOptions = require('../nunjucks')

function checkTitles() {
  return titleChecker()
}

function renderTemplates() {
  return inPlace({
    pattern: ['**/*.{md,njk}'],
    transform: 'jstransformer-nunjucks',
    engineOptions: nunjucksOptions
  })
}

function applyLayouts() {
  return layouts({
    default: 'layout.njk',
    directory: join(paths.views, 'layouts'),
    pattern: ['**/*.html'],
    engineOptions: nunjucksOptions,
    transform: 'nunjucks'
  })
}

module.exports = {
  checkTitles,
  renderTemplates,
  applyLayouts
}
