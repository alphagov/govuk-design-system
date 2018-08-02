const metalsmith = require('metalsmith')
const lunr = require('./index.js')

describe('metalsmith-lunr-index plugin', () => {
  it('generates an index', (done) => {
    metalsmith('lib/metalsmith-lunr-index/fixtures')
      .use(lunr())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        expect(files).toMatchObject({
          "search-index.json": {
            "contents": expect.any(String)
          }
        })
        done()
      })
  })
})
