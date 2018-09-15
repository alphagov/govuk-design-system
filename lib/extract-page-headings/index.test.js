/* eslint-env jest */

const metalsmith = require('metalsmith')
const plugin = require('./index.js')

describe('extract-page-headings plugin', () => {
  it('generated heading metadata matches expected', (done) => {
    metalsmith('lib/extract-page-headings/fixtures')
      .use(plugin())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        Object.keys(files).forEach((file) => {
          const metadataHeadings = files[file].headings
          const expectedHeadings = [
            { depth: 1, text: 'Heading level 1', url: 'heading-level-1' },
            { depth: 2, text: 'Heading level 2', url: 'heading-level-2' },
            { depth: 3, text: 'Heading level 3', url: 'heading-level-3' }
          ]
          expect(metadataHeadings).toEqual(expectedHeadings)
        })
        done()
      })
  })
})
