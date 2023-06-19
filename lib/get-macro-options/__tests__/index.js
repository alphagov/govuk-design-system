/* eslint-env jest */

const fs = require('fs')
const { dirname, join } = require('path')

jest.mock('fs')

const getMacroOptions = require('../index.js')

const packagePath = dirname(require.resolve('govuk-frontend'))

const fixtures = {
  [join(packagePath, 'components/radios/macro-options.json')]: [
    {
      description: 'Options for a component that exists in the Design System.',
      isComponent: true,
      name: 'componentWithCamelCaseName',
      required: false,
      type: 'object'
    },
    {
      description: 'Options for a component that does not exist in the Design System (hint component).',
      isComponent: true,
      name: 'hint',
      required: false,
      type: 'object'
    },
    {
      description: 'Options for a component that does not exist in the Design System (label component).',
      isComponent: true,
      name: 'label',
      required: false,
      type: 'object'
    },
    {
      description: 'Top level option',
      name: 'classes',
      required: false,
      type: 'string'
    },
    {
      description: 'Options for the form-group wrapper',
      name: 'formGroup',
      params: [
        {
          description: 'Optional classes to add to the form group (e.g. to show error state forthe whole group)',
          name: 'classes',
          required: false,
          type: 'string'
        }
      ]
    },
    {
      description: 'Options for multiple nested options',
      name: 'nested',
      params: [
        {
          description: 'items for nested [link](href)',
          name: 'items',
          required: false,
          params: [
            {
              description: '[link](href)',
              name: 'nested-1',
              required: false
            },
            {
              description: 'Options for a nested component that does not exist in the Design System (label component).',
              isComponent: true,
              name: 'label',
              required: false,
              type: 'object'
            },
            {
              description: 'Options for a nested component that exists in the Design System.',
              isComponent: true,
              name: 'nestedComponentWithCamelCaseName',
              required: false,
              type: 'object'
            }
          ]
        }
      ]
    }
  ],
  [join(packagePath, 'components/input/macro-options.json')]: [
    {
      description: 'Option for a input component',
      isComponent: true,
      name: 'optionForInputComponent',
      required: false,
      type: 'object'
    }
  ]
}

describe('getMacroOptions', () => {
  let output
  beforeAll(() => {
    fs.__setMockData(fixtures)

    output = getMacroOptions('radios')
  })
  it('has primary options at the top level', () => {
    expect(output[0].id).toBe('primary')
    expect(output[0].name).toBe('Primary options')
  })
  describe('slugs', () => {
    it('appends slugs to options', () => {
      expect(output[0].options[0].slug).toBe('component-with-camel-case-name')
    })
    it('appends slugs to nested options', () => {
      expect(output[2].options[0].params[2].slug).toBe('nested-component-with-camel-case-name')
    })
  })
  describe('nested options', () => {
    it('outputs nested options as a separate group', () => {
      expect(output[1].id).toBe('formGroup')
    })
    it('outputs multiple nesting groups', () => {
      expect(output[2].options[0].params[0].name).toBe('nested-1')
    })
  })
  describe('additional components', () => {
    it('appends additional components that are not in the Design System', () => {
      expect(output[4].id).toBe('hint')
      expect(output[5].id).toBe('label')
    })
    it('should only output additional components once', () => {
      const optionsWithLabelInName =
        Object.entries(output)
          .map(entry => {
            const name = entry[1].name
            return name
          })
          .filter(name => {
            return name.endsWith('label')
          })

      expect(optionsWithLabelInName.length).toBe(1)
    })
  })
  it('gets input component when requested text-input', () => {
    const inputOutput = getMacroOptions('input')

    expect(inputOutput[0].options[0].name).toBe('optionForInputComponent')
  })
  describe('markdown rendering', () => {
    it('renders descriptions as markdown', () => {
      expect(output[2].options[0].description).toBe('items for nested <a href="href">link</a>')
    })
    it('renders nested options descriptions as markdown', () => {
      expect(output[2].options[0].params[0].description).toBe('<a href="href">link</a>')
    })
  })
})
