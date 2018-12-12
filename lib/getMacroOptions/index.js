const fs = require('fs')
const path = require('path')

const markdownRenderer = require('marked')

const paths = require('../../config/paths.json')

// Get reference to marked.js
let renderer = new markdownRenderer.Renderer()
// Override marking up paragraphs
renderer.paragraph = text => text

function getMacroOptionsJson (componentName) {
  try {
    let optionsFilePath = path.join(paths.govukfrontendcomponents, componentName, 'macro-options.json')
    return JSON.parse(fs.readFileSync(optionsFilePath, 'utf8'))
  } catch (err) {
    console.error(err)
    process.exit(1) // Exit with a failure mode
  }
}

function addSlugsToOptions (options) {
  return options.map(option => {
    // camelCase into kebab-case
    option.slug = (option.name).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    if (option.params) {
      option.params = addSlugsToOptions(option.params)
    }
    return option
  })
}

function getNestedOptions (options) {
  let outputOptions = []
  options
    // If option contains nested options, add those as a separate table and link to it
    .filter(option => option.params)
    .forEach(option => {
      outputOptions.push(option)

      outputOptions = outputOptions.concat(
        getNestedOptions(option.params)
      )
    })
  return outputOptions
}

function getAdditionalComponentOptions (options) {
  let outputComponents = []
  options
    .forEach(option => {
      if (option.isComponent) {
        // Create separate table data for components that are hidden in the
        // Design System
        if (option.name === 'hint' || option.name === 'label') {
          outputComponents.push(option.name)
        }
      }

      if (option.params) {
        outputComponents = outputComponents.concat(
          getAdditionalComponentOptions(option.params)
        )
      }
    })
  return outputComponents
}

// This will recursively loop through the options data and call itself when
// encountering a nested item. Any 'description' fields are marked up using
// marked.js
function markUpDescriptions (options) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      if (typeof options[key] === 'object') {
        markUpDescriptions(options[key])
      } else if (key === 'description') {
        try {
          options[key] = markdownRenderer(options[key], { renderer: (renderer) })
        } catch (e) {
          console.error(e)
          process.exit(1) // Exit with a failure mode
        }
      }
    }
  }
  return options
}

// This helper function takes a path of a macro options file and
// returns the options data grouped by tables to output in markup
function getMacroOptions (componentName) {
  // The design system uses a different name for the input component.
  if (componentName === 'text-input') {
    componentName = 'input'
  }

  const options = getMacroOptionsJson(componentName)

  const optionsWithSlugs = addSlugsToOptions(options)
  const nestedOptions = getNestedOptions(options)
  const additionalComponents = getAdditionalComponentOptions(options)

  const processedOptions = [
    {
      'name': 'Primary options',
      'id': 'primary',
      'options': optionsWithSlugs
    }
  ].concat(
    nestedOptions.map(option => {
      return {
        'name': 'Options for ' + option.name,
        'id': option.name,
        'options': option.params
      }
    })
  ).concat(
    additionalComponents.map(name => {
      const additionalComponentOptions = getMacroOptionsJson(name)
      return {
        'name': 'Options for ' + name,
        'id': name,
        'options': additionalComponentOptions
      }
    })
  )

  // Mark up 'description' values in options
  const markedUpOptions = processedOptions.map(markUpDescriptions)

  return markedUpOptions
}

module.exports = getMacroOptions
