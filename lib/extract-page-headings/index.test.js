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
          aliases: null
        }),

        expect.objectContaining({
          depth: 2,
          text: 'Heading level 2',
          url: 'heading-level-2',
          aliases: null
        }),

        expect.objectContaining({
          depth: 3,
          text: 'Heading level 3',
          url: 'heading-level-3',
          aliases: null
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
})
