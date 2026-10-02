import { getCurrentPageSlug, getCurrentSubpage } from './globals.js'

/**
 * Mocks the result of `this.lookup` in globals, which finds global variables
 * from the metalsmith context eg: permalink as we don't have access to the
 * Nunjucks context during tests.
 *
 * @param {object} lookups - global variables to mock of the format
 *   `{ variable: value }`
 * @returns {{lookup: Function}} - Nunjucks context object with the `lookup`
 *   function set
 */
function mockLookupContext(lookups) {
  return {
    lookup: (string) => {
      return lookups[string]
    }
  }
}

describe('Globals', () => {
  describe('getCurrentPageSlug', () => {
    it.each([
      {
        permalink: 'basename/dirname',
        output: 'dirname'
      },
      {
        permalink: 'basename/basemaneagain/dirname',
        output: 'dirname'
      },
      {
        permalink: 'basename/dirname/',
        output: 'dirname'
      },
      {
        permalink: null,
        output: null
      }
    ])(
      "Given a permalink of '$permalink', returns '$output'",
      ({ permalink, output }) => {
        const result = getCurrentPageSlug.call(mockLookupContext({ permalink }))

        expect(result).toEqual(output)
      }
    )
  })
  describe('getCurrentSubpage', () => {
    it.each([
      {
        permalink: 'basename/dirname/history',
        output: {
          label: 'History',
          url: 'history',
          pageTitle: 'Change history'
        }
      },
      {
        permalink: 'basename/dirname/mystery',
        output: false
      }
    ])(
      "Given a permalink of '$permalink', returns '$output'",
      ({ permalink, output }) => {
        const result = getCurrentSubpage.call(mockLookupContext({ permalink }))

        expect(result).toEqual(output)
      }
    )
  })
})
