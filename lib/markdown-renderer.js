const marked = require('marked')
const nunjucks = require('nunjucks')

let renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  const params = {
    text,
    level
  }

  const macroName = 'headingAnchor'
  const macroParams = JSON.stringify(params, null, 2)

  let macroString = `{%- from "_heading-anchor.njk" import ${macroName} -%}`

  macroString += `{{- ${macroName}(${macroParams}) -}}`

  return nunjucks.renderString(macroString)
}

module.exports = renderer
