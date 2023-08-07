const fs = require('fs')
const { dirname, join } = require('path')

const { marked } = require('marked')

// Get reference to marked.js
const renderer = new marked.Renderer()
// Override marking up paragraphs
renderer.paragraph = text => text

function getMacroOptionsJson (componentName) {
  const optionsFilePath = join(dirname(require.resolve('govuk-frontend')), `components/${componentName}/macro-options.json`)
  return JSON.parse(fs.readFileSync(optionsFilePath, 'utf8'))
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
    option.description = marked(option.description, { renderer })
  }
  if (option.params) {
    option.params = option.params.map(renderDescriptionsAsMarkdown)
  }
  return option
}

// To display nested options that such as rows in a table, we need to make a separate group to be displayed.
function getNestedOptions (options) {
  return options
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

// Some which are only used in other components are intentionally not displayed in the GOV.UK Design System guidance.
// We want to add these as a separate group of options that can be linked to from the original options for the component.
function getAdditionalComponentOptions (options) {
  const names = options
    .map(option => {
      let output = []
      if (option.isComponent) {
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

  const namesWithoutDuplicates = names.filter((optionName, index) => {
    return names.indexOf(optionName) === index
  })

  return namesWithoutDuplicates
}

/**
 * The data structure that options are defined as is a nested one.
 *
 * ```javascript
 * [
 *   {
 *     name: 'top level item without params'
 *   },
 *   {
 *    name: 'top level item with params'
 *    params: [
 *        {
 *          name: 'second level',
 *          params: [
 *            {
 *              name: 'third level'
 *            }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 *
 * ```
 *
 * In order to display it on the website we want to flatten it into groups,
 * which allows them to be displayed as individual tables that can link to each other.
 *
 * ```javascript
 * [
 *   {
 *     name: 'Primary options',
 *     options: [
 *       {
 *        name: 'top level item without params'
 *       },
 *       {
 *        name: 'top level item with params' // When rendered this option links to second level
 *       }
 *     ]
 *   {
 *    name: 'Options for second level',
 *    options: [
 *      {
 *        name: 'second level' // When rendered this option links to third level
 *      }
 *    ]
 *   },
 *   {
 *    name: 'Options for third level',
 *    options: [
 *      {
 *        name: 'third level'
 *      }
 *    ]
 *   }
 * ```
 *
 * */
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

  const optionGroups = [
    {
      name: 'Primary options',
      id: 'primary',
      options
    }
  ].concat(
    nestedOptions.map(option => {
      return {
        name: 'Options for ' + option.name,
        id: option.name,
        options: option.params
      }
    })
  ).concat(
    additionalComponents.map(name => {
      const additionalComponentOptions = getMacroOptionsJson(name).map(renderDescriptionsAsMarkdown)
      return {
        name: 'Options for ' + name,
        id: name,
        options: additionalComponentOptions
      }
    })
  )

  return optionGroups
}

module.exports = getMacroOptions
