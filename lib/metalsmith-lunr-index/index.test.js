const metalsmith = require('metalsmith')
const lunr = require('lunr')
const plugin = require('./index.js')

describe('metalsmith-lunr-index plugin', () => {
  it('generates an index', (done) => {
    metalsmith('lib/metalsmith-lunr-index/fixtures')
      .use(plugin())
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

  describe('the generated index', () => {
    let searchIndex
    let documentStore

    beforeAll((done) => {
      metalsmith('lib/metalsmith-lunr-index/fixtures')
        .use(plugin())
        .build((err, files) => {
          if (err) {
            return done(err)
          }
          const searchIndexContents = files["search-index.json"]["contents"]
          const { index, store } = JSON.parse(searchIndexContents)
          documentStore = store

          searchIndex = lunr.Index.load(index)

          done()
        })
    })

    it('can be used to search for files in the site', () => {
      const searchResults = searchIndex.search('radio buttons')
      const pathsFromSearchResults = searchResults.map(result => result.ref)

      expect(pathsFromSearchResults).toEqual(['radios.html'])
    })

    it('stores the title of the page in the metadata', () => {
      const searchResults = searchIndex.search('radio buttons')
      const resultRef = searchResults[0].ref

      expect(documentStore[resultRef].title).toEqual('Radios')
    })
  })
})
