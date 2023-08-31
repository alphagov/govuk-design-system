const Metalsmith = require('metalsmith')

const extractPageHeadings = require('./index.js')

describe('extract-page-headings plugin', () => {
  const source = './fixtures/src'
  const destination = './fixtures/build'

  let output

  beforeAll((done) => {
    Metalsmith(__dirname)
      // Use test fixtures
      .source(source)
      .destination(destination)

      // Extract page headings
      .use(extractPageHeadings())

      // Build
      .build((err, files) => {
        if (err) {
          return done(err)
        }

        output = files
        done()
      })
  })

  it('generated heading metadata matches expected', () => {
    expect(output['example.md'].headings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          depth: 1,
          text: 'Heading level 1',
          url: 'heading-level-1',
          aliases: undefined,
          ignoreInPageNav: false,
          ignoreInSearch: false
        }),

        expect.objectContaining({
          depth: 2,
          text: 'Heading level 2',
          url: 'heading-level-2',
          aliases: undefined,
          ignoreInPageNav: false,
          ignoreInSearch: false
        }),

        expect.objectContaining({
          depth: 3,
          text: 'Heading level 3',
          url: 'heading-level-3',
          aliases: undefined,
          ignoreInPageNav: false,
          ignoreInSearch: false
        })
      ])
    )
  })

  it('generates headings with `aliases`', () => {
    expect(output['example-with-aliases.md'].headings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Heading level 1',
          aliases: 'one'
        }),

        expect.objectContaining({
          text: 'Heading level 2',
          aliases: 'two'
        }),

        expect.objectContaining({
          text: 'Heading level 3',
          aliases: 'three'
        })
      ])
    )
  })

  it('generates headings with `ignoreInPageNav', () => {
    expect(output['example-with-page-nav.md'].headings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Heading level 1',
          ignoreInPageNav: true
        }),

        expect.objectContaining({
          text: 'Heading level 2',
          ignoreInPageNav: false
        }),

        expect.objectContaining({
          text: 'Heading level 3',
          ignoreInPageNav: false
        })
      ])
    )
  })

  it('generates headings with `ignoreInSearch', () => {
    expect(output['example-with-search.md'].headings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Heading level 1',
          ignoreInSearch: false
        }),

        expect.objectContaining({
          text: 'Heading level 2',
          ignoreInSearch: false
        }),

        expect.objectContaining({
          text: 'Heading level 3',
          ignoreInSearch: true
        })
      ])
    )
  })
})
