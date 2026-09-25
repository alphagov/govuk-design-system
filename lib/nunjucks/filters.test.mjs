import { kebabCase, slugify, isActive, getActiveSubpage } from './filters.js'

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

  describe('isActive', () => {
    it.each([
      {
        navigationItemUrl: 'path',
        permalink: 'path/page',
        expected: true
      },
      {
        navigationItemUrl: 'page',
        permalink: 'page',
        expected: true
      },
      {
        navigationItemUrl: 'path',
        permalink: 'path/sub-path/page',
        expected: true
      },
      {
        navigationItemUrl: 'path/sub-path',
        permalink: 'path/sub-path/page',
        expected: true
      },
      {
        navigationItemUrl: 'path/sub-path',
        permalink: 'path/sub-path/deeper-path/page',
        expected: true
      },
      {
        navigationItemUrl: 'path',
        permalink: 'other-path/page',
        expected: false
      },
      {
        navigationItemUrl: 'page',
        permalink: 'other-page',
        expected: false
      },
      {
        navigationItemUrl: 'path',
        permalink: 'path-with-something-else/page',
        expected: false
      },
      {
        navigationItemUrl: 'path/sub-path',
        permalink: 'path/page',
        expected: false
      },
      {
        navigationItemUrl: 'path/sub-path',
        permalink: 'path/sub-path-with-something-else/page',
        expected: false
      }
    ])(
      'On `$permalink`, for the `$navigationItemUrl` navigation item, `isActive` is `$expected`',
      ({ permalink, navigationItemUrl, expected }) => {
        expect(
          isActive(
            {
              url: navigationItemUrl
            },
            permalink
          )
        ).toEqual(expected)
      }
    )
  })

  describe('getActiveSubpage', () => {
    it.each([
      {
        caseName: 'navigation item with an active subpage',
        navigationItem: {
          url: 'basename',
          subpages: [
            {
              url: 'dirname'
            },
            {
              url: 'dirname2'
            }
          ]
        },
        permalink: 'basename/dirname',
        expected: {
          url: 'dirname'
        }
      },
      {
        caseName: 'navigation item with no active subpages',
        navigationItem: {
          url: 'basename',
          subpages: [
            {
              url: 'dirname2'
            },
            {
              url: 'dirname3'
            }
          ]
        },
        permalink: 'basename/dirname',
        expected: undefined
      },
      {
        caseName: 'navigation item with no subpages',
        navigationItem: {
          url: 'basename'
        },
        permalink: 'basename/dirname',
        expected: false
      }
    ])(
      'given $caseName with a permalink of `$permalink`, `getActiveSubpage` should return `$expected`',
      ({ navigationItem, permalink, expected }) => {
        expect(getActiveSubpage(navigationItem, permalink)).toEqual(expected)
      }
    )
  })
})
