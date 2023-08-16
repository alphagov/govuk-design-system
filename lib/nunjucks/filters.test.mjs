import { kebabCase } from './filters.js'

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
})
