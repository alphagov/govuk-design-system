const Metalsmith = require('metalsmith')

const plugin = require('./index.js')

describe('extract-page-headings plugin', () => {
  let pages
  beforeAll((done) => {
    Metalsmith('lib/extract-page-headings/fixtures')
      .use(plugin())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        pages = files

        done()
      })
  })
  it('generated heading metadata matches expected', () => {
    const metadataHeadings = pages['example.md'].headings
    const expectedHeadings = [
      {
        aliases: null,
        depth: 1,
        text: 'Heading level 1',
        url: 'heading-level-1'
      },
      {
        aliases: null,
        depth: 2,
        text: 'Heading level 2',
        url: 'heading-level-2'
      },
      {
        aliases: null,
        depth: 3,
        text: 'Heading level 3',
        url: 'heading-level-3'
      }
    ]
    expect(metadataHeadings).toEqual(expectedHeadings)
  })
  it('generates headings with aliases', () => {
    const metadataHeadings = pages['example-with-aliases.md'].headings
    const expectedHeadings = [
      {
        aliases: 'one',
        depth: 1,
        text: 'Heading level 1',
        url: 'heading-level-1'
      },
      {
        aliases: 'two',
        depth: 2,
        text: 'Heading level 2',
        url: 'heading-level-2'
      },
      {
        aliases: 'three',
        depth: 3,
        text: 'Heading level 3',
        url: 'heading-level-3'
      }
    ]
    expect(metadataHeadings).toEqual(expectedHeadings)
  })
})
