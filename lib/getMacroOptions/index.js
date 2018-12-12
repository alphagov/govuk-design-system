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

function addSlugs (option) {
  // camelCase into kebab-case
  option.slug = (option.name).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  if (option.params) {
    option.params = option.params.map(addSlugs)
  }
  return option
}

function renderDescriptionsAsMarkdown (option) {
  if (option.description) {
    try {
      option.description = markdownRenderer(option.description, { renderer: (renderer) })
    } catch (e) {
      console.error(e)
      process.exit(1) // Exit with a failure mode
    }
  }
  if (option.params) {
    option.params = option.params.map(renderDescriptionsAsMarkdown)
  }
  return option
}

function getNestedOptions (options) {
  return options
    // If option contains nested options, add those as a separate table and link to it
    .filter(option => option.params)
    .map(option => {
      let output = [option]
      if (option.params) {
        output = output.concat(getNestedOptions(option.params))
      }
      return output
    })
    // Flatten array
    .reduce((a, b) => {
      return a.concat(b)
    }, [])
}

function getAdditionalComponentOptions (options) {
  return options
    .map(option => {
      let output = []
      if (option.isComponent) {
        // Create separate table data for components that are hidden in the
        // Design System
        if (option.name === 'hint' || option.name === 'label') {
          output.push(option.name)
        }
      }
      if (option.params) {
        output = output.concat(getAdditionalComponentOptions(option.params))
      }
      return output
    })
    // Flatten array
    .reduce((a, b) => {
      return a.concat(b)
    }, [])
}

// This helper function takes a path of a macro options file and
// returns the options data grouped by tables to output in markup
function getMacroOptions (componentName) {
  // The design system uses a different name for the input component.
  if (componentName === 'text-input') {
    componentName = 'input'
  }

  const options =
    getMacroOptionsJson(componentName)
      .map(addSlugs)
      .map(renderDescriptionsAsMarkdown)

  const nestedOptions = getNestedOptions(options)
  const additionalComponents = getAdditionalComponentOptions(options)

  const processedOptions = [
    {
      'name': 'Primary options',
      'id': 'primary',
      'options': options
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

  return processedOptions
}

module.exports = getMacroOptions
