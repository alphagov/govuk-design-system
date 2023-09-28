const { dirname, join } = require('path')

const { DesignSystemMarked } = require('../marked')
const { kebabCase, slugify } = require('../nunjucks/filters')

// Custom Marked instance
const marked = new DesignSystemMarked().use({
  extensions: [
    {
      name: 'paragraph',

      /**
       * Render paragraphs without `<p>` wrappers
       * for macro options in `<td>` table cells
       */
      renderer(token) {
        return this.parser.parseInline(token.tokens)
      }
    }
  ]
})

function getMacroOptionsJson(componentName) {
  const optionsFilePath = join(
    dirname(require.resolve('govuk-frontend')),
    `components/${componentName}/macro-options.json`
  )
  return structuredClone(require(optionsFilePath))
}

function addSlugs(option, parent) {
  option.slug = slugify(kebabCase(option.name))
  option.id = option.slug

  // Prefix nested option slugs with parent slug to avoid duplicates
  // such as summary list row `items` versus card action `items`
  if ((!option.isComponent || option.params) && parent?.slug) {
    option.slug = `${parent.slug}-${option.slug}`
  }

  if (option.params) {
    option.params = option.params.map((param) => addSlugs(param, option))
  }

  return option
}

function addParentPrefix(option, parent) {
  // Prefix nested option names with parent name to avoid duplicates
  // such as summary list row "items" versus card action "items"
  if ((!option.isComponent || option.params) && parent?.name) {
    option.name = `${parent.name} ${option.name}`
  }

  if (option.params) {
    option.params = option.params.map((param) => addParentPrefix(param, option))
  }

  return option
}

function renderNameWithBreaks(option) {
  if (option.params) {
    option.params = option.params.map(renderNameWithBreaks)
  }

  // Add suggested word breaks before capital letters to allow
  // browsers to break long option names in sensible places
  option.name = option.name.replace(/(?<!<wbr>)([A-Z])/g, '<wbr>$1')

  // Also add suggested word breaks after full stops for options
  // that are manually given parent prefixes like `summary.text`
  option.name = option.name.replace(/(\.)(?!<wbr>)/g, '$1<wbr>')

  return option
}

function renderDescriptionsAsMarkdown(option) {
  if (option.description) {
    option.description = marked.parse(option.description)
  }
  if (option.params) {
    option.params = option.params.map(renderDescriptionsAsMarkdown)
  }
  return option
}

// To display nested options that such as rows in a table, we need to make a separate group to be displayed.
function getNestedOptions(options, parent) {
  return options
    .filter((option) => option.params)
    .map((option) => {
      const output = [[option, parent]]

      if (option.params) {
        output.push(...getNestedOptions(option.params, option))
      }

      return output
    })
    .flat()
}

// Some which are only used in other components are intentionally not displayed in the GOV.UK Design System guidance.
// We want to add these as a separate group of options that can be linked to from the original options for the component.
function getAdditionalComponentOptions(options, parent) {
  const optionsFlattened = options
    .map((option) => {
      const output = []

      const hasComponentPage = !['hint', 'label'].includes(option.slug)
      if (option.isComponent && !option.params && !hasComponentPage) {
        output.push([option, parent])
      }

      if (option.params) {
        output.push(...getAdditionalComponentOptions(option.params, option))
      }

      return output
    })
    .flat()

  // Component names with duplicates
  const componentNames = optionsFlattened.map(([option]) => option.slug)

  // Macro options with duplicates removed
  // For example, Checkboxes have `hint` for fieldset and items
  return optionsFlattened.filter(
    ([option], index) => componentNames.indexOf(option.slug) === index
  )
}

/**
 * The data structure that options are defined as is a nested one.
 *
 * ```js
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
 * ```js
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
function getMacroOptions(componentName) {
  // The design system uses a different name for the input component.
  if (componentName === 'text-input') {
    componentName = 'input'
  }

  // Macro options
  const options = getMacroOptionsJson(componentName)
    .map((option) => addSlugs(option))
    .map((option) => addParentPrefix(option))

  // Macro options with formatting
  const optionsFormatted = structuredClone(options)
    .map(renderNameWithBreaks)
    .map(renderDescriptionsAsMarkdown)

  const nestedOptions = getNestedOptions(optionsFormatted)
  const additionalComponents = getAdditionalComponentOptions(options)

  const optionGroups = [
    {
      name: 'Primary options',
      slug: 'primary',
      id: 'primary',
      options: optionsFormatted
    }
  ]
    .concat(
      nestedOptions.map(([option]) => {
        const names = option.name.split(' ')

        // Wrap option name with `<code>` (excluding parents)
        names[names.length - 1] = `<code>${names.at(-1)}</code>`

        return {
          ...option,

          // Append "objects" to the table caption for arrays of nested objects
          // to clarify that the options are for arrays of objects, not arrays
          name:
            option.type === 'array' && option.params
              ? `Options for ${names.join(' ')} ${option.type} objects`
              : `Options for ${names.join(' ')} ${option.type}`,

          options: option.params
        }
      })
    )
    .concat(
      additionalComponents.map(([option, parent]) => ({
        ...option,

        name: `Options for <code>${option.name}</code> component`,
        options: getMacroOptionsJson(option.slug)
          .map((option) => addSlugs(option, parent))
          .map(renderNameWithBreaks)
          .map(renderDescriptionsAsMarkdown)
      }))
    )

  return optionGroups
}

module.exports = getMacroOptions
