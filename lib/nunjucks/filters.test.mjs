import { kebabCase, slugify } from './filters.js'

describe('Filters', () => {
  describe('kebabCase', () => {
    it.each([
      {
        input: 'exampleErrorSummary',
        output: 'example-error-summary'
      },
      {
        input: 'example.errorSummary',
        output: 'example-error-summary'
      },
      {
        input: 'exampleERRORSummary',
        output: 'example-error-summary'
      },
      {
        input: 'not camel case example',
        output: 'not-camel-case-example'
      }
    ])("Formats '$input' to '$output'", ({ input, output }) => {
      expect(kebabCase(input)).toEqual(output)
    })
  })

  describe('slugify', () => {
    it.each([
      {
        input: 'Example heading',
        output: 'example-heading'
      },
      {
        input: 'Example   heading',
        output: 'example-heading'
      },
      {
        input: 'Example: Heading',
        output: 'example-heading'
      },
      {
        input: 'Example - Heading',
        output: 'example-heading'
      },
      {
        input: 'Example -- Heading',
        output: 'example-heading'
      },
      {
        input: "Example's Heading",
        output: 'examples-heading'
      }
    ])("Formats '$input' to '$output'", ({ input, output }) => {
      expect(slugify(input)).toEqual(output)
    })
  })
})
