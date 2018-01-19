const marked = require('marked')
const nunjucks = require('nunjucks')
const path = require('path')

const getFileContents = require('./file-helper').getFileContents

const headingTemplate = getFileContents(path.join(__dirname, '../views/partials/heading/template.njk'))

let renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  return nunjucks.renderString(headingTemplate, {
    params: {
      level: level,
      text: text
    }
  })
}

module.exports = renderer
