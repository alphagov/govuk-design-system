/* eslint-env jest */

jest.mock('fs')

const fs = require('fs')

const getMacroOptions = require('../index.js')

const fixtures = {
  'radios': [
    {
      'description': 'Options for a component that exists in the Design System.',
      'isComponent': true,
      'name': 'componentWithCamelCaseName',
      'required': false,
      'type': 'object'
    },
    {
      'description': 'Options for a component that does not exist in the Design System (hint component).',
      'isComponent': true,
      'name': 'hint',
      'required': false,
      'type': 'object'
    },
    {
      'description': 'Options for a component that does not exist in the Design System (hint component).',
      'isComponent': true,
      'name': 'label',
      'required': false,
      'type': 'object'
    },
    {
      'description': 'Top level option',
      'name': 'classes',
      'required': false,
      'type': 'string'
    },
    {
      'description': 'Options for the form-group wrapper',
      'name': 'formGroup',
      'params': [
        {
          'description': 'Optional classes to add to the form group (e.g. to show error state forthe whole group)',
          'name': 'classes',
          'required': false,
          'type': 'string'
        }
      ]
    },
    {
      'description': 'Options for multiple nested options',
      'name': 'nested',
      'params': [
        {
          'description': 'items for nested',
          'name': 'items',
          'required': false,
          'params': [
            {
              'name': 'nested-1',
              'required': false
            }
          ]
        }
      ]
    }
  ]
}

describe('getMacroOptions', () => {
  let output
  beforeAll(() => {
    fs.__setMockData(fixtures['radios'])

    output = getMacroOptions('radios')
  })
  it('has primary options at the top level', () => {
    expect(output[0].id).toBe('primary')
    expect(output[0].name).toBe('Primary options')
  })
  it('appends slugs to options', () => {
    expect(output[0].options[0].slug).toBe('component-with-camel-case-name')
  })
  it('outputs nested options as a separate group', () => {
    expect(output[1].id).toBe('formGroup')
  })
  it('outputs multiple nesting groups', () => {
    expect(output[2].options[0].params[0].name).toBe('nested-1')
  })
  it('appends additional components that are not in the Design System', () => {
    expect(output[4].id).toBe('hint')
    expect(output[5].id).toBe('label')
  })
})
