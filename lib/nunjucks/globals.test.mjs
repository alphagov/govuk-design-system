import { getCurrentPageSlug } from './globals.js'

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
        // Mock the nunjucks context, which also means mocking the result of
        // `this.lookup('permalink')` to be what we pass to this test, and `call`
        // `getCurrentPageSlug` with that context. We do this as we don't have
        // access to the nunjucks context during tests so we need to mock any
        // outputs from in-built functionality.
        const result = getCurrentPageSlug.call({
          lookup: () => {
            return permalink
          }
        })

        expect(result).toEqual(output)
      }
    )
  })
})
